InboxSDK.load('1', 'sdk_NameCheck_3598f01e7b').then(function(sdk){
	console.log(sdk);
	// the SDK has been loaded, now do something with it!
	sdk.Compose.registerComposeViewHandler(function(composeView){
		// creating Status Bar
		var statusBar = composeView.addStatusBar("newStatusBar");

		// create a dom element in js and use that in el

		var moleView = sdk.Widgets.showMoleView({
			el: 1,
			title: "Fuck off",
			minimizedTitleEl: "something new"
		});

		console.log(moleView);





		// a compose view has come into existence, do something with it!
		composeView.addButton({
			title: "My Nifty Button!",
			iconUrl: 'http://orig12.deviantart.net/10b1/f/2011/248/c/1/mtg__dotp_2012_by_mickroz-d48xvu3.png',
			onClick: function(event) {
				// event.composeView.insertTextIntoBodyAtCursor('Hello World!');
			},
			hasDropdown: false
		});

	});

});



