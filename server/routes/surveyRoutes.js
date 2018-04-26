const _ = require('lodash');
const Path = require('path-parser'); //switched to route-parser because path-parser was not recognized
const Route = require('route-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  // app.get('/api/surveys/:id/yes', (req, res) => {
  //   console.log(req.params.id);
  //   console.log('clicked yes');
  //   res.send('Thanks for voting!');
  // });

  // app.get('/api/surveys/:id/no', (req, res) => {
  //   console.log(req.params.id);
  //   console.log('clicked no');
  //   res.send('Thanks for voting!');
  // });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients, redirectURL } = req.body;

    const survey = new Survey({ 
      title, 
      body, 
      subject, 
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
      redirectURL 
    });
    try {
      //send an email
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      
      res.send(user);
    }
    catch(err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const r = new Route('/api/surveys/:surveyId/:choice');    

    //without using lodash chain 
    // const events = _.map(req.body, ({email, url}) => {
    //   const match = r.match(new URL(url).pathname);
    //   if (match) {
    //     return { email, surveyId: match.surveyId, choice: match.choice };
    //   }
    // });

    // const compactEvents = _.compact(events);
    // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId'); //this checks to see that both email and surveyId are duplicated
    // console.log(uniqueEvents);
    
    //with lodash chain
    _.chain(req.body)
      .map(({email, url}) => {
        const match = r.match(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1},
          $set: { 'recipients.$.responded': true }
        }).exec();
      })
      .value();
    
    res.send({});
  });
};
