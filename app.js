// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFlv0kRzeliw0RfipsXIc7506LGE-XT4U",
  authDomain: "list-9b04d.firebaseapp.com",
  projectId: "list-9b04d",
  storageBucket: "list-9b04d.appspot.com",
  messagingSenderId: "72499460897",
  appId: "1:72499460897:web:c6fe8c55302effae8b5c60",
  measurementId: "G-CLPEY75ENH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();


var email = document.getElementById('email')
var password = document.getElementById('password')

window.login = function (e) {
    e.preventDefault()
    var obj = {
        email: email.value,
        password: password.value,
    }

    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (success) {
            console.log(success.user.uid);
            window.location.replace('home.html')
        })
        .catch(function (err) {
            // console.log(err);
            alert("Enter correct email address or password")
        });

    console.log(model)
    email.value = ''
    password.value = ''
}

