// Object Literal

const book1 = {
  title: "1984",
  author: "George Orwell",
  isRead: false,

  toggleReadStatus: function () {
    this.isRead = !this.isRead;
  },

  describe: function () {
    return `📖 "${this.title}" by ${this.author} [${this.isRead ? "Read" : "Unread"}]`;
  },
};

console.log(book1.describe());
book1.toggleReadStatus();
console.log(book1.describe());

//---------------------------------------------//

// Constructor Function

// function Book(title, author, isRead) {
//   this.title = title;
//   this.author = author;
//   this.isRead = isRead;

//   this.toggleReadStatus = function () {
//     this.isRead = !this.isRead;
//   };

//   this.describe = function () {
//     return `📖 "${this.title}" by ${this.author} [${this.isRead ? "Read" : "Unread"}]`;
//   };
// }

// const book2 = new Book("Animal Farm", "George Orwell", true);

// console.log(book2.describe());
// book2.toggleReadStatus();
// console.log(book2.describe());

//---------------------------------------------//

//  Prototype Pattern

// function BookProto(title, author, isRead) {
//   this.title = title;
//   this.author = author;
//   this.isRead = isRead;
// }

// BookProto.prototype.toggleReadStatus = function () {
//   this.isRead = !this.isRead;
// };

// BookProto.prototype.describe = function () {
//   return `📖 "${this.title}" by ${this.author} [${this.isRead ? "Read" : "Unread"}]`;
// };

// const book3 = new BookProto("Brave New World", "Aldous Huxley", false);

// console.log(book3.describe());
// book3.toggleReadStatus();
// console.log(book3.describe());

//---------------------------------------------//

// ES6 Class

// class BookClass {
//   constructor(title, author, isRead) {
//     this.title = title;
//     this.author = author;
//     this.isRead = isRead;
//   }

//   toggleReadStatus() {
//     this.isRead = !this.isRead;
//   }

//   describe() {
//     return `📖 "${this.title}" by ${this.author} [${this.isRead ? "Read" : "Unread"}]`;
//   }
// }

// const book4 = new BookClass("Fahrenheit 451", "Ray Bradbury", true);

// console.log(book4.describe());
// book4.toggleReadStatus();
// console.log(book4.describe());
