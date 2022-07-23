console.log("EverNote");
DisplayNotes();

// if user add a note, add it to the localstorage.
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById("addTxt");
    let addtitle = document.getElementById("addTitle")
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes);
    }
    let myobj = {
        title: addtitle.value,
        text: addtxt.value
    }
    noteobj.push(myobj);
    localStorage.setItem('notes', JSON.stringify(noteobj));
    addtxt.value = "";
    addtitle.value = "";
    // console.log(noteobj);

    // Displaying the Notes
    DisplayNotes();
});

// Function to show elements from localStorage
function DisplayNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes);
    }

    let html = "";
    noteobj.forEach(function (element, index) {
        html = html + `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${index + 1}. ${element.title}</h5>
        <p class="card-text"> ${element.text}</p>
        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>`;
    });
    let element = document.getElementById("notes");
    if (noteobj != 0) {
        element.innerHTML = html;
    }
    else {
        element.innerHTML = `Nothing to show! Use "Add a note" section above to add notes.`
    }
}

// Function to delete the notes
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes);
    }

    noteobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(noteobj));
    DisplayNotes();
}

// Function for search the notes
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})