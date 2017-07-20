// Initialize Firebase
var config = {
	apiKey: "AIzaSyA9EYUXVL5WAh6Aam1qXlWyvi3b7HLcZ1U",
	authDomain: "esigamma.firebaseapp.com",
	databaseURL: "https://esigamma.firebaseio.com",
	projectId: "esigamma",
	storageBucket: "esigamma.appspot.com",
	messagingSenderId: "734163636039"
};
var FirebaseInstance = firebase.initializeApp(config, "Davy Jones' Locker");

var db = FirebaseInstance.database();

let dataInput = document.getElementById('input-data');

dataInput.addEventListener('keypress', (e) => {
	let keyCode = e.keyCode || e.which;
	if (keyCode == '13'){
		let dataStr = dataInput.value;
		vex.dialog.prompt({
			message: "Choose a Code",
			callback: (code) => {
				if (code && dataStr) {
					let data = JSON.parse(dataStr);
					let dataRef = db.ref('davy-jones-locker/' + code);
					dataRef.once('value', (snapshot) => {
						if (!snapshot.exists()) {
							dataRef.set(data).then((done) => {
								vex.dialog.alert("Data saved with code: " + code);
							}).catch((err) => {
								vex.dialog.alert("Something went wrong.");
								console.log(err);
							});
						} else {
							vex.dialog.confirm({
								message: "Code already in use. Overwrite existing data?",
								callback: (yes) => {
									if (yes) {
										dataRef.set(data).then((done) => {
											vex.dialog.alert("Data saved, overwriting code: " + code);
										}).catch((err) => {
											vex.dialog.alert("Something went wrong.");
											console.log(err);
										});
									} else {
										vex.dialog.alert("Data was not overwritten.");
									}
								}
							});
						}
					}).catch((err) => {
						vex.dialog.alert("Something went wrong.");
						console.error(err);
					});
				}
			}
		});
	}
});