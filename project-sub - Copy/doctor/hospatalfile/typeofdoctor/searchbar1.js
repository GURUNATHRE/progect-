import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
    collection, getFirestore, getDocs,
    addDoc, deleteDoc, doc, onSnapshot,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
  
  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';
  
const firebaseConfig = {
    apiKey: "AIzaSyCzIQa-lD0qweBlPm6XftdbBH_YyBIUntk",
    authDomain: "h-project-122cb.firebaseapp.com",
    databaseURL: "https://h-project-122cb-default-rtdb.firebaseio.com",
    projectId: "h-project-122cb",
    storageBucket: "h-project-122cb.appspot.com",
    messagingSenderId: "331751963639",
    appId: "1:331751963639:web:6fd323f3f0356df9e2ccf2"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  


const search = () =>{
    const searchbox = document.getElementById("search-item").value.toUpperCase()
    const storeitems =document.getElementById("product-list")
    const product = document.querySelectorAll(".product")
    const pname =storeitems.getElementsByTagName("h2")  
      for(var i=0 ; i< pname.length ;i++){
        let match = product[i].getElementsByTagName('h2')[0];

        if(match){
            let textvalue= match.textContent || match.innerHTML

            if(textvalue.toUpperCase().indexOf(searchbox) > -1){
                product[i].style.display ="";
            }else{
                product[i].style.display ="none";
            }
        }
    }


}
const name =localStorage.getItem('Hname');
console.log(name);