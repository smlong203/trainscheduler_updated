// Initialize Firebase
var config = {
    apiKey: "AIzaSyBePLmdG5iL7PPAlOg5pzcYQ3x_snLinDM",
    authDomain: "train-b67b0.firebaseapp.com",
    databaseURL: "https://train-b67b0.firebaseio.com",
    projectId: "train-b67b0",
    storageBucket: "train-b67b0.appspot.com",
    messagingSenderId: "314573245375"
};

firebase.initializeApp(config);

var database = firebase.database();

//Button for adding Trains
$("#target").submit(function (event) {

    // Grabs user input
    var trainName = $("#train-input").val().trim();
    var destinationName = $("#destination-input").val().trim();
    var timeStart = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var frequencyRate = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: destinationName,
        start: timeStart,
        frequency: frequencyRate
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Clears all of the text-boxes
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    // Determine when the next train arrives.
    return false;
});

//Firebase event for adding train to the database and a row in the html
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store train info into a variable.
    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var timeStart = childSnapshot.val().start;
    var frequencyRate = childSnapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(destinationName);
    console.log(timeStart);
    console.log(frequencyRate);


});