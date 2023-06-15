let bookRepository = (function () {
  let books = [
    {
      title: 'Great Expectations',
      authors: [
        {
          name: 'Dickens, Charles',
          birth_year: 1812,
          death_year: 1870,
        },
      ],
      languages: ['en'],
      copyright: false,
      download_count: 15223,
    },
    {
      title: 'The Jungle',
      authors: [
        {
          name: 'Sinclair, Upton',
          birth_year: 1878,
          death_year: 1968,
        },
      ],
      languages: ['en'],
      copyright: false,
      download_count: 2974,
    },
    {
      title: 'Adventures of Huckleberry Finn',
      authors: [
        {
          name: 'Twain, Mark',
          birth_year: 1835,
          death_year: 1910,
        },
      ],
      languages: ['en'],
      copyright: false,
      download_count: 12764,
    },
  ];

  // Return the full list of books currently in the list.
  function getAll() {
    return books;
  }

  // Add a book to the list of books.
  function add(book) {
    if (typeof book === 'object') {
      books.push(book);
    }
  }

  // Find books by title.
  // Returns an array of books that were found.
  function findBooks(title) {
    return books.filter(function (book) {
      return book.title.toLowerCase() === title.toLowerCase();
    });
  }

  // Adds a listItem (<li>) to the list (<ul.book-list>)
  function addListItem(book) {
    let list = document.querySelector('.book-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    // Set the button text to the title of the book
    button.innerText = book.title;

    listItem.appendChild(button);
    list.appendChild(listItem);

    button.classList.add('book-title-btn');
    // Add a click listener to the existing button created above
    button.addEventListener('click', function (event) {
      showDetails(book);
    });
  }

  // For now, just log out the book to the console.  More to come.
  function showDetails(book) {
    console.log(book);
  }

  return {
    getAll,
    add,
    findBooks,
    addListItem,
  };
})();

// Test adding a book to the list. This is just to see if the add() method works
bookRepository.add({
  title: 'The Keep',
  authors: [
    {
      name: 'Wilson, F. Paul',
      birth_year: 1946,
      death_year: null,
    },
  ],
  languages: ['en'],
  copyright: true,
  download_count: 19000,
});

// Loop over all the books beginning at the first (0) element and ending with
// the last (books.length) element.
bookRepository.getAll().forEach(function (book) {
  bookRepository.addListItem(book);
});

console.log(bookRepository.findBooks('The Jungle'));
