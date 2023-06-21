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

  // Find books by title.
  // Returns an array of books that were found.
  function findBooks(title) {
    return books.filter(function (book) {
      return book.title.toLowerCase() === title.toLowerCase();
    });
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

  // For now, just log out the book to the console.  More to come.
  function showDetails(book) {
    loadCover(book).then(function () {
      showModal(book);
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

  // Show a loading message. (Needs to be formatted better and not push down
  // the list of books when loadCover is called.)
  function showLoadingMessage() {
    $('#loading').text('Loading books...');
  }

  // Hide the loading message.
  function hideLoadingMessage() {
    $('#loading').text('');
  }

  // Define the modal container element here so it can be used in multiple
  // functions below.
  const modalContainer = document.querySelector('#modal-container');

  function showModal(book) {
    modalContainer.innerHTML = '';

    // Create and set up the modal element.
    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Set up the close button, it will be added to the modal a little later.
    const closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    // Set up the title element, to be added later.
    const titleElement = document.createElement('h1');
    titleElement.innerText = book.title;

    // Set up the author element, to be added later.
    const authorElement = document.createElement('p');
    authorElement.innerText = book.authors[0]?.name;

    // Set up the cover image element, to be added later.
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', book.coverUrl);

    // Add all the elements to the modal.
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(authorElement);
    modal.appendChild(imgElement);

    // Add the modal to the container so it will show when the container shows.
    modalContainer.appendChild(modal);

    // Actually show the dialog.
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  // Close the modal when Esc is pressed and the modal is showing.
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    const target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
