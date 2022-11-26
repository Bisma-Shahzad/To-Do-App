// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase, ref, set, push, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";


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
const database = getDatabase()


var task = document.getElementById('task')
var parent = document.getElementById('parent')


var arr = []
var editId =0;

window.addTask = function (e) {
    e.preventDefault()
    var obj = {
        task: task.value,
        time: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
        user: "Bisma",
    }

    arr.push(obj)
    task.value = ''
    
}

function renderUl() {
    
    parent.innerHTML = ''
    for (var i = 0; i < arr.length; i++) {
        parent.innerHTML += `<li class='li'>${arr[i+1].task}<p>${arr[i].dateTime}</p> <button class="sub" onclick="delTask('${arr[i+1].id}')">Delete</button> <button class="sub" onclick="editTask('${arr[i+1].id}', '${arr[i+1].task}')">Edit</button></li>`
    }
}

window.editTask = function(){

}

window.logout = function () {
    signOut(auth)
        .then(function () {
            console.log("Logout Successfully");
            window.location.href = "index.html";
        })
        .catch(function (err) {
            console.log(err);
        });
}

function checkAuthentication() {
    onAuthStateChanged(auth, function (user) {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
            window.location.href = 'index.html'
        }
    });
}

checkAuthentication()

window.sendData = function () {
    var obj;
    let taskReference;
    if(editId){
        obj = {
            task: task.value,
            updatedAt: JSON.stringify(new Date()),
            dateTime: JSON.stringify(new Date()),
            id: editId,
        }
        taskReference = ref(database, `tasks/${editId}/`)
        editId = ''
    } else{
    var obj1 = {
        task: task.value,
        dateTime: JSON.stringify(new Date())
        

    }
    console.log(obj1)
    const keyRef = ref(database, 'tasks/')
    obj1.id = push(keyRef).key
    console.log(obj1.id)
    taskReference = ref(database, `tasks/${obj1.id}/`)
}
    

    set(taskReference, obj1)
}

window.getData = function () {
    arr = []
    const taskReference = ref(database, 'tasks/')
    onChildAdded(taskReference, function (data) {
        arr.push(data.val())
        console.log(arr)
    renderUl()
    })
} 

// function delTaskdb (){
//     var obj1 = {
//         task: task.value,
//         datetime: JSON.stringify(new Date())
//     }
//     const keyRef = ref(database, 'task/')
//     remove(keyRef)
//     // obj1.id = push(keyRef).key
//     // console.log(obj1.id)
//     // const taskReference = ref(database, `tasks/`)
//     // console.log(taskReference)
//     // remove(taskReference, `tasks/${obj1.id}/`)

// } 

window.delTask = function(id){  
    const keyRef = ref(database, `tasks/${id}`)
    remove(keyRef).then(function(e){
        console.log(e)
        getData()
    }).catch(function(er){
        console.log(er)
}
    )
}

window.editTodo = function(task,id){
    console.log(task,id)
    editId = id
    task.value = task
}