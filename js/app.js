let dropMenu = document.querySelector("#dropMenu"); //in modal
let dropdownMenuButton = document.getElementById("dropdownMenuButton"); //in modal 
let addStudentForm = document.getElementById("addStudentForm"); //in main
let add = document.getElementById("add"); //in modal
let stdName = document.getElementById("stdName"); //in main
let markStd = document.getElementById("markStd"); //in modal
let tableMain = document.querySelector("#tableMain"); //in main
let btnOkModal = document.querySelector("#btnOkModal"); //in modal
let countOfSubj = document.querySelector("#countOfSubj"); //in modal


let tbodyMain = document.getElementById("tbodyMain");
let indexOfLink = 0;

let arrayMark = [];
events();

function events() {
    dropMenu.addEventListener("click", chngBtnTxt);
    add.addEventListener("click", writeToTable);
    addStudentForm.addEventListener("submit", writeTableMain);
    tableMain.addEventListener("click", dtctIndxLink);
    btnOkModal.addEventListener("click", btnOkModalFunc);
}

function chngBtnTxt(element) {
    if (element.target.tagName.toLowerCase() === "a") { //if we click item in dropdown then change its text
        dropdownMenuButton.innerHTML = element.target.textContent;
        dropdownMenuButton.value = element.target.textContent;
    }
}

function dtctIndxLink(e) {
    if (e.target.tagName.toLowerCase() === "a") {
        indexOfLink = e.target.parentElement.parentElement.rowIndex;
    }
    e.preventDefault();
}

function writeTableMain(e) {
    let textOfInput = stdName.value.trim();
    if (textOfInput !== "") {
        createTableMain(textOfInput);
    }
    e.preventDefault();
}

function createTableMain(name) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.scope = "row";
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    td1.appendChild(document.createTextNode(name));
    td2.innerHTML = `<a class="linkSimple" id="examLink" title="imtahan" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
    Imtahan
  </a>`;
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbodyMain.appendChild(tr);

    th.textContent = th.parentElement.rowIndex;
    stdName.value = "";
}

//write table in modal
function writeToTable(e) {
    let subject = dropdownMenuButton.textContent.trim();
    let mark = markStd.value.trim();
    if (dropdownMenuButton.value !== "choice" && mark !== "" && !isNaN(mark)) {
        createTable(subject, mark);
        arrayMark.push(Number(mark));
        countOfSubj.innerHTML = arrayMark.length
        dropdownMenuButton.value = "choice";
        dropdownMenuButton.textContent = "Fənn";
        markStd.value = "";
    } else {
        alert("Enter valid value");
    }
    e.preventDefault();
}

function createTable(subject, mark) {
    let tbodyModal = document.getElementById("tbodyModal");
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.scope = "row";
    let td = document.createElement("td");
    td.appendChild(document.createTextNode(subject));
    let td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(mark));
    tr.appendChild(th);
    tr.appendChild(td);
    tr.appendChild(td2);
    tbodyModal.appendChild(tr);

    th.textContent = th.parentElement.rowIndex;
}

function btnOkModalFunc(e) {
    arrayMark.sort((a, b) => a - b);
    const sum = arrayMark.reduce((partial_sum, a) => partial_sum + a, 0);
    tbodyMain.children[indexOfLink - 1].children[3].textContent = arrayMark[0];
    tbodyMain.children[indexOfLink - 1].children[4].textContent = arrayMark[arrayMark.length - 1];
    tbodyMain.children[indexOfLink - 1].children[5].textContent = (sum / arrayMark.length).toFixed(2);
    e.preventDefault();
    resetModal();
}

function resetModal() {
    dropdownMenuButton.value = "choice";
    dropdownMenuButton.textContent = "Fənn";
    markStd.value = "";
    tbodyModal.innerHTML = "";
    arrayMark = [];
}
