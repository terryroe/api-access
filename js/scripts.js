let bookRepository = (function () {
  let books = [];
  let apiUrl = 'https://gutendex.com/books';

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
    loadCover(book).then(function () {
      console.log(book);
    });
  }

  // Fetch a list of books.  By default, only 32 books are fetched and then
  // the next 'page' would have to be fetched separately.
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let book = {
            id: item.id,
            title: item.title,
            authors: item.authors,
          };
          add(book);
        });
      })
      .catch(function (e) {
        console.error(e);
      })
      .finally(function () {
        hideLoadingMessage();
      });
  }

  // The cover url could've been used from the first fetch, but I implemented a
  // second fetch to get just the single book to fulfill the requirements of the
  // exercise.
  function loadCover(item) {
    showLoadingMessage();
    // The individual book is accessed at the same apiUrl, but with the 'id' of
    // the book appended after a slash.
    let url = `${apiUrl}/${item.id}`;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (book) {
        // The cover url is in an embedded object called 'formats'. Use bracket
        // notation to access the key that holds the url property.
        item.coverUrl = book.formats['image/jpeg'];
      })
      .catch(function (e) {
        console.error(e);
      })
      .finally(function () {
        hideLoadingMessage();
      });
  }

  // Show a loading message. (Needs to be formatted better and not push down
  // the list of books when loadCover is called.)
  function showLoadingMessage() {
    let loading = document.createElement('div');
    loading.setAttribute('id', 'loading');
    loading.innerText = 'Loading data...';
    let body = document.querySelector('body');
    body.insertBefore(loading, body.firstChild);
  }

  // Hide the loading message.
  function hideLoadingMessage() {
    let loading = document.querySelector('#loading');
    loading.parentElement.removeChild(loading);
  }

  return {
    getAll,
    add,
    findBooks,
    addListItem,
    loadList,
    loadCover,
  };
})();

// Load the payload of books...
bookRepository.loadList().then(function () {
  // Then get all the books in the payload...
  bookRepository.getAll().forEach(function (book) {
    // And add each one to the list of books
    bookRepository.addListItem(book);
  });
});
