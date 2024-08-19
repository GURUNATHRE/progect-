import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    collection, getFirestore, getDocs,
    addDoc, deleteDoc, doc, onSnapshot,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc

} from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';
import { getDatabase, set, ref, child, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";



const firebaseConfig = {
    apiKey: "AIzaSyCzIQa-lD0qweBlPm6XftdbBH_YyBIUntk",
    authDomain: "h-project-122cb.firebaseapp.com",
    databaseURL: "https://h-project-122cb-default-rtdb.firebaseio.com",
    projectId: "h-project-122cb",
    storageBucket: "h-project-122cb.appspot.com",
    messagingSenderId: "331751963639",
    appId: "1:331751963639:web:6fd323f3f0356df9e2ccf2"
  };

const apps = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();
//const db = getFirestore();


document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector(".Dsignup-from");
    const newname = document.getElementById("dname");
    console.log(newname);
    const newemail = document.getElementById("demail");
    const pass = document.getElementById("dpass-id");
    const addnew = document.getElementById("base");

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
                set(ref(database, 'Dusers/' + name), {
                    username: name,
                    email: email
                });

                alert('User created successfully!');
                localStorage.setItem('d-name',name);
                localStorage.setItem('d-email',email);
                signupForm.reset();
                window.location.href = "doctorfile/index.html";
                DBofindex();
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });

        // Call newdiv function to add new div
       

    });
    function newdiv() {
        const name = newname.value;
        const itemsRef = ref(database);
        get(child(itemsRef, 'Dusers/' + name)).then((snapshot) => {
            addnew.innerHTML = ''; // Clear existing content
            snapshot.forEach((childSnapshot) => {
                const itemData = childSnapshot.val();
                const itemName = itemData.username;
                const newDiv = document.createElement("div");
                newDiv.className = "product";

                // Create an img element
                const img = document.createElement("img");
                // Set src and alt attributes for the img element
                img.src = itemData.ImgUrl;
                img.alt = "";

                // Create a div for product details
                const pDetailsDiv = document.createElement("div");
                pDetailsDiv.className = "product";
                pDetailsDiv.id="product";

                // Create h2 element for name
                const h2 = document.createElement("h2");
                h2.textContent = itemName;

                // Create h3 element for description
                const h3 = document.createElement("h3");
                h3.textContent = "description of doctor";

                // Append img, h2, and h3 elements to the pDetailsDiv
                pDetailsDiv.appendChild(h2);
                pDetailsDiv.appendChild(h3);

                // Append img and pDetailsDiv to the newDiv
                newDiv.appendChild(img);
                newDiv.appendChild(pDetailsDiv);

                addnew.appendChild(newDiv);
            });
        });
    }


    
})

