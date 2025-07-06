class LibraryItem {
  // Private field
  #id;

  constructor(title, year) {
    this.title = title;
    this.year = year;
    this.#id = LibraryItem.generateId();
  }

  describe() {
    return `📚 "${this.title}" (${this.year})`;
  }

  getId() {
    return this.#id;
  }

  // Static helper
  static isValidYear(year) {
    return year > 0 && year <= new Date().getFullYear();
  }

  // Static private field (simulated via closure)
  static generateId() {
    return Math.floor(Math.random() * 10000);
  }
}

class Book extends LibraryItem {
  #isRead;

  constructor(title, year, author, isRead = false) {
    super(title, year);
    this.author = author;
    this.#isRead = isRead;
  }

  toggleReadStatus() {
    this.#isRead = !this.#isRead;
  }

  describe() {
    return `📖 "${this.title}" by ${this.author} (${this.year}) [${this.#isRead ? "Read" : "Unread"}]`;
  }
}



const book1 = new Book("Atomic Habits", 2018, "James Clear");
console.log(book1.describe());
console.log("ID:", book1.getId());

book1.toggleReadStatus();
console.log(book1.describe());

console.log("Is valid year?", LibraryItem.isValidYear(2020)); 
console.log("Is valid year?", LibraryItem.isValidYear(3020)); 


