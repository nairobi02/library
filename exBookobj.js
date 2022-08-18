let winDoc = document.querySelector('.window');
let addBook = document.querySelector('.add_book')
let modal = document.querySelector('.modal');
let closeModalbtn = document.querySelector('.modal .cross');
let library = []
let accepting = false;
class Book {
    constructor(name, author, pages, read) {
        this.title = name;
        this.author = author;
        this.pages = pages;
        if (read) {
            this.read = true;
        }
        else {
            this.read = false;
        }
        // this.info = function () {
        //     return `Book name:${this.title}\n Author:${this.author}\n Pages:${this.pages}\n ${this.read}`
        // }
    }

    addToLibrary() {

        let card = document.createElement('div');
        card.classList.add('card');
        let title = document.createElement('div'); title.classList.add('title')
        let author = document.createElement('div'); author.classList.add('author')
        let pages = document.createElement('div'); pages.classList.add('pages')
        let readStatus = document.createElement('div'); readStatus.classList.add('read__status', 'button');
        let deletee = document.createElement('div'); deletee.classList.add('delete', 'button')

        if (this.read) {
            readStatus.innerHTML = 'Read';
            readStatus.classList.add('read');
        }
        else {
            readStatus.innerHTML = 'Not Read';
            readStatus.classList.add('unread');
        }
        title.innerHTML = this.title;
        author.innerHTML = this.author;
        pages.innerHTML = this.pages;
        deletee.innerHTML = 'Remove';
        card.append(title, author, pages, readStatus, deletee);
        document.querySelector('.container').appendChild(card);
        library.push(this);
        console.table(library);
        readStatus.addEventListener('click', changeReadStatus);
        deletee.addEventListener('click', deleteBook);

    }
}
addBook.addEventListener('click', openModal);
function openModal(e) {
    e.stopPropagation();
    clearInputs();
    winDoc.classList.add('blur');
    modal.classList.add('scaleUp');
    addBook.removeEventListener('click', openModal);
    document.addEventListener('click', closeModal);
    takeInput();
}
function closeModal(e) {
    if ((!e.target.closest('.modal')) || (e.target.closest('.cross'))) {
        closing();
    }
    addBook.addEventListener('click', openModal);
}
function takeInput() {
    accepting = true;
    function pushData(e) {

        e.preventDefault();
        let form = document.querySelector('.modal')
        let formData = new FormData(form);
        e.stopImmediatePropagation();

        if (form.checkValidity()) {


            newBook = new Book(formData.get('title1'), formData.get('author1'), formData.get('pages1'), formData.get('readbool'));
            newBook.addToLibrary();


            closing();
        }
        else {
            form.reportValidity();
        }
    }
    let submitbtn = document.querySelector('#submitbtn');
    submitbtn.addEventListener('click', pushData);
}


function clearInputs() {
    let inputs = document.querySelectorAll('.modal input');
    inputs.forEach(input => {

        if ((input.type == 'text') || input.type == 'number') {
            input.value = null;
        }
        else if (input.type == 'checkbox') {
            input.checked = false;
        }
    })
}

function closing() {

    winDoc.classList.remove('blur');
    modal.classList.remove('scaleUp');
    addBook.addEventListener('click', openModal);
}
function changeReadStatus(e) {
    let index;
    let buttons = document.querySelectorAll('.read__status');

    let readStatus = e.target;
    let thisCard = readStatus.closest('.card');

    document.querySelectorAll('.card').forEach((card, i) => {
        console.log(card);
        console.log(thisCard);
        if (card == thisCard) {
            console.log('true');
            index = i;
        }

    })
    console.log(index);
    if (readStatus.classList.contains('read')) {
        readStatus.classList.remove('read');
        readStatus.classList.add('unread');
        readStatus.innerHTML = 'Not Read';

        library[index].read = false;
    }
    else {
        readStatus.classList.remove('unread');
        readStatus.classList.add('read');
        readStatus.innerHTML = 'Read';
        library[index].read = true;
    }
}
function deleteBook(e) {
    let deletee = e.target;
    let card = deletee.closest('.card');
    card.remove();
    let index = library.findIndex(book => book.title == card.querySelector('.title').innerHTML);
    library.splice(index, 1);
    console.table(library);
}