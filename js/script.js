console.log("its magic Note ");
showNote();


//selecting button ----
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    //selecting textarea------
    let addTxt = document.getElementById("addTxt");
    //collecting notes from localstorage--
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addTxt.value);
    //putting value at local storage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = " "; // for blank teaxt area.
    showNote();  // showNote()  function called here.

})

// for showing value of add note in the card. or function to show elemnt from local storage
function showNote() {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }


    let html = "";
    //iterating element and index from notesObj array---
    notesObj.forEach(function (element, index) {
        html += `

            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text"> ${element} </p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
            `
    });

    //selecting id=notes from HTML page for append .
    let noteElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        noteElem.innerHTML = html;
    }
    else {
        noteElem.innerHTML = `Nothing to show! Use "Add a note" section above  Created By Mukhtadul`
    }
}


//function to deleting Note----
function deleteNote(index) {
    // console.log("i am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    //splice() removes index---
    notesObj.splice(index, 1);
    // again update local storage--
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNote();

}


//selected id = searchTxt from navigation bar
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {

    // value of seacrh box stored in here
    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    //whole note card selected here then
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardTxt);
        //logic for this
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";

        }
        else {
            element.style.display = "none";
        }

    })

})


