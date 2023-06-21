let bookRepository = (function () {
  const books = [];
  const apiUrl = 'https://gutendex.com/books';

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

  // Adds a button.list-group-item to the .book-list
  function addListItem(book) {
    const detailsBtn = $('<button>')
      .attr('type', 'button')
      .addClass('list-group-item list-group-item-action')
      .text(book.title)
      .click(() => showDetails(book));

    $('.book-list').append(detailsBtn);
  }

  function showDetails(book) {
    loadCover(book).then(function () {
      showModal(book);
    });
  }

  // Fetch a list of books.  By default, only 32 books are fetched and then
  // the next 'page' would have to be fetched separately.
  function loadList() {
    showLoadingMessage('Loading books...');

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
    showLoadingMessage('Loading details...');

    // The individual book is accessed at the same apiUrl, but with the 'id' of
    // the book appended after a slash.
    const url = `${apiUrl}/${item.id}`;
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

  // Show a loading message.
  // Can be customized via the parameter passed in.
  function showLoadingMessage(message) {
    $('#loading').text(message);
  }

  // Hide the loading message.
  function hideLoadingMessage() {
    $('#loading').text('');
  }

  function showModal(book) {
    $('#book-modal-title').text(book.title);
    $('.modal-body')
      // clear out previous contents
      .text('')
      // repopulate with this book's details
      .append($('<p>').text(`By: ${book.authors[0].name}`))
      .append($('<img>').attr('src', book.coverUrl).attr('alt', book.title));

    $('#book-modal').modal();
  }

  return {
    getAll,
    addListItem,
    loadList,
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
