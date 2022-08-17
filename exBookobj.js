


let library = []
function Book(name, age, pages, read) {
    this.title = name;
    this.author = age;
    this.pages = pages;
    read ? this.read = 'has been read' : this.read = 'has not been read';
    this.info = function () {
        return `Book name:${this.title}\n Author:${this.author}\n Pages:${this.pages}\n ${this.read}`
    }
}

Book.prototype.addToLibrary = function () {
    library.push(this);

}

const book1 = new Book('Harry Potter', 'JK Rowling', 400, true);
book1.addToLibrary();
const book2 = new Book('Lord of the rings', 'JRR Tolkien', 700, false);
book2.addToLibrary();

// library.forEach((book, index) => { console.table(book) })
console.table(library, ['title', 'author', 'pages', 'read']);
let table = document.createElement('table');

let c, r;
r = table.insertRow(0);
c = r.insertCell(0);

document.querySelector('.container').appendChild(table);



t = document.createElement('table');
r = t.insertRow(0);
c = r.insertCell(0);
c.innerHTML = 123;
c = r.insertCell(1);
c.innerHTML = 456;
document.getElementById("addtable").appendChild(t);