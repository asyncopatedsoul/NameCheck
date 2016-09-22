


// ContactListManager

var ContactListManager = function() {

  var contacts = [];
  var contactsLoaded = false;

  function loadContacts() {

    contacts = [];
    contactsLoaded = false;

    var newContact = {"firstName":"Eric","lastName":"Gallegos","email":"Gallegos.eric@gmail.com"};
    contacts.push(newContact);

    contactsLoaded = true;
  }

  function getContactByEmail (email) {
    var matchedContact = _.find(users, ['email', email]) || null;

    return matchedContact;
  }

  return {
    loadContacts: loadContacts,
    getContactByEmail: getContactByEmail
  }

}

// ComposeViewManager
var ComposeViewManager = function() {

  var _subject = "", _recipients=[], _body = "";

  function addRecipient (name, email) {

    // split name into first and last
    var re = "([\wa-zA-Z\-]+)[\.]{0,1}";
    var names = new Report(name,re);

    console.log(names);

    if (names.found) {
      //take first and last name
      var firstName = names.matches[0], lastName = names.matches[names.matches.length-1];

      _recipients.push({firstName:firstName,lastName:lastName,email:email});
    }

    console.log(_recipients);
  }

  function setRecipients (recipients) {

    _recipients = _.union(_recipients, recipients)
  }

  function setSubject() {

  }

  function setBody (text) {
    _body = text;

    console.log(_body);
  }

  return {
    recipients: function() {return _recipients;},
    subject: function() {return _subject;},
    body: function() {return _body;},
    addRecipient: addRecipient,
    setRecipients: setRecipients,
    setSubject: setSubject,
    setBody: setBody
  }
}


// EvaluationManager

var Report = function (source, target) {

	var matchedIndices = [];
  var matches = [];

  var re = new RegExp(target,'g');
  while ((_matches = re.exec(source)) !== null) {
  	matchedIndices.push(_matches.index);
    matches.push( _matches[1] ? _matches[1] : _matches[0] );
  }

  return {
    found: matchedIndices.length > 0,
    matches: matches,
    sourceIndices: matchedIndices,
    source: source,
    target: target
  }
}



var EvaluationManager = function() {

  var status = {
    areRecipientsValid: false,
    isSubjectValid: false,
    isBodyValid: false
  };

  function evaluateEmailContent (recipients, body) {

    var reports = [];

    if (recipients.length>0) {

      _.forEach(recipients, function(recipient) {
        reports.push(checkForRecipient(recipient,body));
      });

    }

    console.log(reports);
  }

  function checkForRecipient (recipient,body) {
    // check for first name
    var firstNameReport = new Report(body,recipient.firstName);

    // check for last name
    var lastNameReport = new Report(body,recipient.lastName);

    return {
      firstName: firstNameReport,
      lastName: lastNameReport
    }
  }

  return {
    status: function(){return status;},
    evaluateEmailContent: evaluateEmailContent
  }
}
