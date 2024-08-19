//----variables of 1st filed------//
const dname = localStorage.getItem('d-name');
const demail = localStorage.getItem('d-email');
const Dtype = document.getElementById('D-type');
const DAbout = document.getElementById('D-About');
//----variable of 3rd fileds------//
const address = document.getElementById('D-address');
const DBirthday = document.getElementById('D-Birthday');
const DCountry = document.getElementById('D-Country');
const DContacts =document.getElementById('D-Contacts');
//-----the buttons------//
const savebtn =document.getElementById('save-btn');
const cancelbtn = document.getElementById('cancel-btn');

document.getElementById('Dname').value = dname;
document.getElementById('Demail').value =demail;

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    collection, getFirestore, getDocs,
    addDoc, doc, onSnapshot,
    query, where,setDoc,updateDoc,deleteDoc,deleteField,
    orderBy, serverTimestamp, getDoc

} from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';
import { getDatabase, set, ref, child, get,update } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";




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
const db = getFirestore();
const storage = getStorage();


savebtn.addEventListener('click', (e) => {
    addDocumentCustomID();
    savebtn.disabled = true;
});



    async function addDocumentCustomID(){
        var docRef = doc(db, "Doctors", dname); // Get the document reference
        
        const data = { // Define the data object
            name: dname,
            email: demail,
            Specialization: Dtype.value, // Get the value of the DOM element
            information: DAbout.value, // Get the value of the DOM element
            Address: address.value, // Get the value of the DOM element
            Birthday: DBirthday.value, // Get the value of the DOM element
            Country: DCountry.value, // Get the value of the DOM element
            Contacts: DContacts.value // Get the value of the DOM element
        };
        
        try {
            await setDoc(docRef, data); // Pass the document reference and data object to setDoc
            alert("Data added successfully");
        } catch (error) {
            alert("Unsuccessful operation, error: " + error);
        }
    }
    
    
var files =[];
var reader = new FileReader();
//---/img-var---//
var namebox = document.getElementById('namebox');
var extlab = document.getElementById('extlab');
var myimg = document.getElementById('myimg');
var proglab = document.getElementById('upprogress');
var SelBtn = document.getElementById('selbtn');
console.log(SelBtn);
var Upbtn = document.getElementById('upbtn');

var input =document.createElement('input');
input.type ='file';

input.onchange = e =>{
    files = e.target.files;

    var extention =GetFileExt( files[0]);
    var name =GetFileName(files[0])

    namebox.value=name;
    extlab.innerHTML =extention;

    reader.readAsDataURL(files[0]);
}

reader.onload =function() {
    myimg.src =reader.result ;
} 


//--------------------selection-----------------------//
SelBtn.onclick = function(){
    input.click();
}

function GetFileExt(file){
    var temp = file.name.split('.');
    var ext =temp.slice((temp.length-1),(temp.length));
    return '.' +ext[0];
}

function GetFileName(file){
    var temp = file.name.split('.');
    var fname =temp.slice(0,-1).join('.');
    return fname;
}

//--------------------upload  process-----------------//

async function uploadProcess(){
var ImaToUpload = files[0];

var ImgName = namebox.value + extlab.innerHTML;

if(!ValidateName()){
    alert('name cannot contain ".","#","$","[","]" ')
    return;
}

const mataData={
    contentType:ImaToUpload.type
}



const stroageRef =sRef(storage,"Images/"+ImgName);

const UploadTask = uploadBytesResumable(stroageRef,ImaToUpload,mataData);

UploadTask.on('state-changed',(snapshot) =>{
    var progess =(snapshot.bytesTransferred/ snapshot.totalBytes) *100;
    proglab.innerHTML ="Upload"+progess+"%";
},
(error)=>{
    alert("error: image not uploaded: !");
},
()=>{
    getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
        SaveURLtoRealtimeDB(downloadURL); 
    });
});

}

//--------------------function for realtiem database---------------------//
function SaveURLtoRealtimeDB(URL){
var name = dname;
var imgname=namebox.value;
var ext = extlab.innerHTML;

update(ref(database, 'Dusers/' + name),{
    ImageName:(imgname+ext),
    ImgUrl:URL
});
}
// error contain about {,},$,.,;//
function ValidateName(){
var regex = /[\.\#\ $\[\]]/
return !(regex.test(namebox.value));
}
Upbtn.onclick =uploadProcess;




