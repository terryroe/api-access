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

// Loop over all the books beginning at the first (0) element and ending with
// the last (books.length) element.
books.forEach(function (book) {
  // `document.write()` is a "violation" according to the developer console, but
  // it's ok for the purposes of this demonstration.
  document.write('<h1>' + book.title + '</h1>');
  document.write('<div>');
  document.write('downloads: ' + book.download_count);

  // Check to see if the number of downloads is big. Out put a message if it is.
  if (book.download_count > 10000) {
    document.write(", <strong>Wow, that's a lot of downloads!</strong>");
  }
  document.write('</div>');
});
