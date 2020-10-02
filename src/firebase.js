const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyBMsi8ktzyWZhrILNqQOkP_PHbExXM2lQc",
  authDomain: "quotes-app-7ec2a.firebaseapp.com",
  databaseURL: "https://quotes-app-7ec2a.firebaseio.com",
  projectId: "quotes-app-7ec2a",
  storageBucket: "quotes-app-7ec2a.appspot.com",
  messagingSenderId: "54970712986",
  appId: "1:54970712986:web:36d8a723b9b763dc18b023",
  measurementId: "G-H09DKVB5RX",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

module.exports = db;
