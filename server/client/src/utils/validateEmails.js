const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
  const invalidEmails = emails
  .replace(/(^[,\s]+)|([,\s]+$)/g, '')
  .split(',')
  .map(email => email.trim())
  //if you reutrn true in filter then the value is kept in the list
  //if you return false it is removed. 
  .filter(email => re.test(email) === false );
  
  if(invalidEmails.length) {
    return `these emails are invalid: ${invalidEmails}`;
  }

  return;
}