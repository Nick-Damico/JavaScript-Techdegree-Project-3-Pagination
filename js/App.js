import Pagination from './Pagination.js';

const pagination = new Pagination({
  // Sets number of items displayed per page
  numberOfItems: 10,
  // Provide a selector of #id or .class for the pagination parent container
  parentSelector: '.page',
  // The class selector for the pagination items, each item needs to have the same class.
  itemSelector:  '.student-item',
  // Custom placeholder text for the search input.
  inputPlaceHolderText: 'Search for students...'
});
