//Survey New shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm }  from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  //traditional way of setting state
  // constructor(props) {
  //   super(props);

  //   this.state = { new: true };
  // }

  state = { showFormReview: false }; //short cut you can do with create-react-app

  renderContent() {
    if (this.state.showFormReview) {
      return ( 
        <SurveyFormReview 
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm 
        onSurveySubmit={() => this.setState({showFormReview: true})}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  };
}

export default reduxForm({form: 'surveyForm'})(SurveyNew);