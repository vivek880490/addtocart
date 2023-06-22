import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-53def-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")




addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    clearInputFieldEl()
    //appendToShoppingListEl(inputValue)
    //console.log(inputValue)
})

onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        clearshoppingListEl()
    let data = Object.entries(snapshot.val())
    for(const x  of data){
        appendToShoppingListEl(x)
    }
    }
    else{
        shoppingListEl.innerHTML = "No item exists in shopping list"
    }
    
})

function clearInputFieldEl(){
    inputFieldEl.value = "";
}
function appendToShoppingListEl(inputValue){
    let dataid = inputValue[0];
    let datavalue = inputValue[1];
    let newel = document.createElement("li")
    newel.textContent = datavalue;

    newel.addEventListener("click",function(){
        let exactlocationindb = ref(database,`shoppingList/${dataid}`)
        remove(exactlocationindb)
    });

    shoppingListEl.append(newel)
}
function clearshoppingListEl(){
    shoppingListEl.innerHTML = "";
}