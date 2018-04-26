//SurveyField contains logic render a single 
//label and text input
import React from 'react';

export default ({input, label, meta: {error, touched}}) => {
  return (
    <div>
      <label>{label}</label>
      <input style={{marginBottom: '5px'}} {...input} />
      <div className="red-text" style={{marginBottom: '20px', fontSize: '12px'}}>{touched && error}</div>
    </div>
  )
};