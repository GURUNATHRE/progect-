// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
  collection, getFirestore, getDocs,
  addDoc, deleteDoc, doc, onSnapshot,
  query, where,
  orderBy, serverTimestamp,
  getDoc, updateDoc

} from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';
import { getDatabase, set, ref, child, get  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";




const firebaseConfig = {
  apiKey: "AIzaSyCzIQa-lD0qweBlPm6XftdbBH_YyBIUntk",
  authDomain: "h-project-122cb.firebaseapp.com",
  databaseURL: "https://h-project-122cb-default-rtdb.firebaseio.com",
  projectId: "h-project-122cb",
  storageBucket: "h-project-122cb.appspot.com",
  messagingSenderId: "331751963639",
  appId: "1:331751963639:web:6fd323f3f0356df9e2ccf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();
const db = getFirestore();



document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.querySelector(".signup-from");
  const newname = document.getElementById("name");
  const newemail = document.getElementById("email");
  const pass = document.getElementById("pass-id");
  const addnew = document.getElementById("add-div");


  //-----------inserting the data in hospatalfile/index.html-----------//
 

  newdiv();
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    var name = newname.value;
    var email = newemail.value;
    var password = pass.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Add user data to Firestore
        set(ref(database, 'Husers/' + name), {
          username: name,
          email: email
        });

        alert('User created successfully!');
        localStorage.setItem('dname',name);
        localStorage.setItem('demail',email);
        signupForm.reset();
        window.location.href = "hospatalfile/index.html";
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });

    // Call newdiv function to add new div
   
  });
  function  newdiv() {
    const name =newname.value
    const itemsRef = ref(database);
    get(child(itemsRef, 'Husers/' + name)).then((snapshot) => {
      addnew.innerHTML = ''; // Clear existing content
      snapshot.forEach((childSnapshot) => {
        const itemData = childSnapshot.val();
        const itemName = itemData.username;
        const newDiv = document.createElement("div");
        newDiv.className = "item";
        newDiv.id="item";
        const newImg = document.createElement("img");
        newImg.src=itemData.ImgUrl;
        newDiv.appendChild(newImg);
        addnew.appendChild(newDiv);
        const h1 = document.createElement("h2");
        h1.innerHTML=itemName;
        localStorage.setItem('Hname',itemData);
        newDiv.appendChild(h1);
        newDiv.addEventListener('click',function(){
          window.location.href="hospatalfile/typeofdoctor/typeofdoctor.html";
        })
      });
    });
  }

})

