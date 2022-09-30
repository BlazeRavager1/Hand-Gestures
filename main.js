Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 90,
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img src = "' + data_uri + '" id = "captured_image">';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/H2YrRlqk5/model.json", modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "You are showing the hand sign for" + prediction_1;
    speak_data_2 = "You are showing the hand sign for" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (results[0].label == "Hi") {
            document.getElementById("update_emoji").innerHTML = "🖐";
        }
        if (results[0].label == "Peace") {
            document.getElementById("update_emoji").innerHTML = "✌";
        }
        if (results[0].label == "Thumbs up") {
            document.getElementById("update_emoji").innerHTML = "👍";
        }
        if (results[1].label == "Hi") {
            document.getElementById("update_emoji2").innerHTML = "🖐";
        }
        if (results[1].label == "Peace") {
            document.getElementById("update_emoji2").innerHTML = "✌";
        }
        if (results[1].label == "Thumbs up") {
            document.getElementById("update_emoji2").innerHTML = "👍";
        }
    }
}

