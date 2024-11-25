var nameInput = document.getElementById("name");
var linkInput = document.getElementById("link");


var bookList = [];
if(localStorage.getItem("books") == null){
    bookList = [];
}
else{
    bookList = JSON.parse(localStorage.getItem("books"));
    display(bookList);
}


function addBook() {
    if(nameInput.classList.contains("is-valid") && linkInput.classList.contains("is-valid")){
        var book = {
            name: nameInput.value,
            link: linkInput.value
        };
            bookList.push(book);
            localStorage.setItem("books",JSON.stringify(bookList));
            display(bookList);
            clear();
    }
    else {
        document.getElementById("card").style.display = "flex";
    }
}

function display(theList){
    var output = "";
    for (var i=0 ; i < theList.length ; i++){
        output += `<div class="content bg-white w-80 m-auto d-flex justify-content-center align-items-center border-bottom">
            <p class="p-2 m-0 w-25 text-center">${i+1}</p>
            <p class="p-2 m-0 w-25 text-center">${theList[i].name}</p>
            <div class="p-2 m-0 w-25 text-center"><a class="btn btn-success text-white text-decoration-none" href="${theList[i].link}" target="_blank"><i class="fa-regular fa-eye me-2"></i>Visit</a></div>
            <div class="p-2 m-0 w-25 text-center"><button onclick="deleteBook(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></div>
        </div>`;
    }
    document.getElementById("content").innerHTML = output;
}

function deleteBook(indexx){
    bookList.splice(indexx, 1);
    localStorage.setItem("books",JSON.stringify(bookList));
    display(bookList);
}

function validateInput(element) {
    var regax = {
        name: /^[a-zA-Z0-9_][a-zA-Z0-9\s_]+[a-zA-Z0-9_]$/,
        link: /^(https?:\/\/)(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/,
    };

    var test = true;
        for(var i=0 ; i<bookList.length ; i++){
            if(bookList[i].name == element.value && element.id == "name"){
                test = false;
            }
        }
        
    if (regax[element.id].test(element.value) && test){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.add("d-none");
    }
    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.remove("d-none");
    }
    
}

function closeCard(){
    document.getElementById("card").style.display = "none";
}

function clear() {
    nameInput.value = null;
    linkInput.value = null;
    nameInput.classList.remove("is-valid");
    linkInput.classList.remove("is-valid");
}