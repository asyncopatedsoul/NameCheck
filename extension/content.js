// https://www.inboxsdk.com/docs/#ViewsEvents

var contactListManager = new ContactListManager();
var composeViewManager = new ComposeViewManager();
var evaluationManager = new EvaluationManager();

var COMPOSE;

InboxSDK.load('1', 'sdk_NameCheck_3598f01e7b').then(function(sdk){

	// the SDK has been loaded, now do something with it!
	sdk.Compose.registerComposeViewHandler(function(composeView){

		var statusBar = composeView.addStatusBar("namecheckStatus");
		console.log('statusBar');
		console.log(statusBar.el);





		var bodyElement = composeView.getBodyElement();
		console.log("bodyElement");
		console.log(bodyElement);

		var bodyElementId = "#"+$(bodyElement).attr("id");

		$(bodyElement).on("focus blur keyup paste input", function(){
			onBodyChanged(composeView.getTextContent());
		});

		composeView.on('recipientsChanged', onRecipientsChanged);
    composeView.on('destroy', onComposeDestroy);

		// a compose view has come into existence, do something with it!
		composeView.addButton({
			title: "Check names",
			iconUrl: 'https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365',
			onClick: function(event) {
				//event.composeView.insertTextIntoBodyAtCursor('Hello World!');

				console.log(composeViewManager.body());
				console.log(composeViewManager.recipients());

				evaluationManager.evaluateEmailContent(composeViewManager.recipients(),composeViewManager.body());
			},
		});

	});

});



function onRecipientsChanged (event) {
	console.log('Recipients have changed to: ');
	console.log(event);

	_.forEach(event.to.added,addRecipient);
	_.forEach(event.cc.added,addRecipient);
	//_.forEach(event.bcc.added,addRecipient);

	function addRecipient(recipient) {
		composeViewManager.addRecipient(recipient.name,recipient.emailAddress);
	}

}

function onSubjectChanged (event) {
	composeView.getSubject();
}

function onBodyChanged (event) {
	console.log(event);

	composeViewManager.setBody(event);
}

function onComposeDestroy (event) {
	console.log('compose view going away, time to clean up');
}
