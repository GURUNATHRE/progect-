//----variables of 1st filed------//
const Dname = localStorage.getItem('dname');
const Demail = localStorage.getItem('demail');
const DAbout = document.getElementById('DAbout');

//----variable of 3rd fileds------//
const address = document.getElementById('address');
const DBirthday = document.getElementById('DBirthday');
const DCountry = document.getElementById('DCountry');
const DContacts = document.getElementById('DContacts');
const form = document.getElementById('account-specialist');
//-----the buttons------//
const savebtn = document.getElementById('save-btn');

document.getElementById('dname').value = Dname;
document.getElementById('demail').value = Demail;

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    collection, getFirestore, getDocs,
    addDoc, doc, onSnapshot,
    query, where, setDoc, updateDoc, deleteDoc, deleteField,
    orderBy, serverTimestamp, getDoc

} from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';
import { getDatabase, set, ref, child, get, update } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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
    let skills = [];
    form.querySelectorAll('[type="checkbox"]').forEach(item => {
        if (item.checked) {
            skills.push(item.value);
        }
    });
   
    addDocumentCustomID(skills);
    savebtn.disabled = true;

});



async function addDocumentCustomID(skills) {
    var CollRef = collection(db, "Hospatal", Dname, "Hinfo"); // Get the document reference
    try {
        const docRef = await addDoc(CollRef, {
            name: Dname,
            email: Demail,
            information: DAbout.value, // Get the value of the DOM element
            Address: address.value, // Get the value of the DOM element
            Birthday: DBirthday.value, // Get the value of the DOM element
            Country: DCountry.value, // Get the value of the DOM element
            Contacts: DContacts.value, // Get the value of the DOM element
            skill: skills,
        });
        alert("user added")
      

    }
    catch (error) {
        alert("the error message", + error);
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
var name = Dname;
var imgname=namebox.value;
var ext = extlab.innerHTML;

update(ref(database, 'Husers/' + name),{
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



