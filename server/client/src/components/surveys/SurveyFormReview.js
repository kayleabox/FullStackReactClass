//SurveyReview shows review form
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom'; //let's us access history object
import * as actions from '../../actions';


const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({name, label}) => {
    return(
      <div key={ name }>
        <label>{ label }</label>
        <div>{ formValues[name] }</div>
      </div>
    );
  });

  return (
    <div>
      <h5>please confirm your entries</h5>
      { reviewFields }
      <button className="yellow white-text darken-3 btn-flat left" onClick={ onCancel }>
        Back
      </button>
      <button className="green white-text btn-flat right" onClick={ () => submitSurvey(formValues, history) } type="submit">
        Send<i className="material-icons right">email</i>
      </button>
    </div>
  );
}

function mapStateToProps (state) {
  return{ formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));