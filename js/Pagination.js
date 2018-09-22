// Pagination takes optional arguments as a JavaScript Object with key, values to alter behavior of the functionality,
// If no arguments are provided they will default to values in constructor.
class Pagination {
  constructor(options = {
    numberOfItems: 10,
    parentSelector: '.page',
    itemSelector: '.student-item',
    parentSearchSelector: '.page-header'
  }) {
    this._parent = document.querySelector(options.parentSelector);
    this._items = document.querySelectorAll(options.itemSelector);
    this._searchContainer = document.querySelector(options.parentSearchSelector);
    // Bind instance to #filterPage method
    this.filterResults = this.filterResults.bind(this);
    // Set instance state to keep track of the currently viewed page and number of students to filter by
    this.state = {
      currentPage: 1,
      resultsPerPage: options.numberOfItems
    }

    this.init();
  }

  // Initialize Pagination into DOM
  init() {
    // Adds class 'active' to all elements, className is used for filtering.
    this.activateAllItems();
    // Append search input element and button with attached event listener
    const searchField = this.appendSearchField();
    searchField.addEventListener('click', this.filterResults);
    searchField.addEventListener('keyup', this.filterResults);
    // Append pagination numbered page list at bottom of DOM with attached event listener
    this.appendPagination().addEventListener('click', this.filterResults);
    // Filter results
    this.filterResults();
  }

  getParent() {
    return this._parent;
  }

  getSearchContainer() {
    return this._searchContainer;
  }

  getItems() {
    return this._items;
  }

  getActiveItems() {
    // converts nodelist to array for calling .filter array method on
    const arrayItems = Array.prototype.slice.call(this.getItems());
    const activeItems = arrayItems.filter(item => item.classList.contains('active'));
    return activeItems;
  }

  numberOfItems() {
    return this.getItems().length;
  }

  numberOfPages() {
    return Math.ceil(this.getActiveItems().length / this.state.resultsPerPage);
  }

  appendPagination() {
    const pagination = this.createPaginationNode();
    pagination.innerHTML = this.createPaginationNumbers();

    this.getParent().appendChild(pagination);
    return pagination;
  }

  updatePagination() {
    document.querySelector('.pagination').innerHTML = this.createPaginationNumbers();
  }

  createPaginationNode() {
    // create element node
    const paginationNode = document.createElement('div');
    // add class 'pagination' to node
    paginationNode.className = 'pagination';

    return paginationNode;
  }

  createPaginationNumbers() {
    let paginationNumbers = '';
    // append page numbers to pagaintion
    for (let i = 1; i <= this.numberOfPages(); i++) {
      paginationNumbers += `<li><a href="" data-pgnum="${i}">${i}</a></li>`;
    }

    return paginationNumbers;
  }

  appendSearchField() {
    const searchDiv = this.createSearchDivNode();
    const searchFields = this.createSearchField();
    const searchInput = searchFields.input;
    const searchButton = searchFields.button;
    searchDiv.innerHTML = searchInput;
    searchDiv.innerHTML += searchButton;

    document.querySelector('.page-header').appendChild(searchDiv);
    return searchDiv;
  }

  createSearchDivNode() {
    const studentSearchDiv = document.createElement('form');
    studentSearchDiv.className = 'student-search';

    return studentSearchDiv;
  }

  createSearchField() {
    const input = `<input class="search-student" placeholder="Search for students..." />`;
    const button = `<button type="submit">Search</button>`;

    return {input: input, button: button};
  }

  filterItemsOnText(text) {
    this.getItems().forEach((item, index) => {
      const name = item.querySelector('h3').textContent;
      const email = item.querySelector('.email').textContent;

      if ((name.indexOf(text) !== -1 || email.indexOf(text) !== -1)) {
        !item.classList.contains('active')
          ? item.className += ' active'
          : null;
      } else {
        item.classList.remove('active');
      }
    });
  }

  hideNoneActiveItems() {
    this.getItems().forEach(item => {
      if (!item.classList.contains('active')) {
        $(item).fadeOut();
      }
    })
  }

  activateAllItems() {
    this.getItems().forEach(item => item.className += ' active');
  }

  eventHandlerReducer(evt) {
    // filterResults() handles filtering items for several types of events,
    // input on typing, input value on 'search' button click, and
    // using pagination page numbers. This method introspects on that evt action
    // determining the type of event and handling particular tasks for that evt type.
    if (!evt) {
      return null;
    } else {
      evt.preventDefault();
      let inputText;
      if (evt.srcElement.getAttribute('type') === 'submit') {
        inputText = evt.target.previousSibling.value.toLowerCase();
        this.updateState({ currentPage: 1})
        this.filterItemsOnText(inputText);
      } else if(evt.srcElement.getAttribute('class') === 'search-student'){
        inputText = evt.srcElement.value.toLowerCase();
        this.updateState({currentPage: 1});
        this.filterItemsOnText(inputText);
      } else if (evt.target.getAttribute('data-pgnum')) {
        this.updateState({
          currentPage: parseInt(evt.target.getAttribute('data-pgnum'))
        })
      }
    }
    return evt;
  }

  filterResults(evt) {
    this.eventHandlerReducer(evt);
    this.updatePagination();
    this.hideNoneActiveItems();
    const activeItemsArray = this.getActiveItems();
    if (activeItemsArray.length > 0) {
      activeItemsArray.forEach((item, index) => {
        // calculate range of items that will display, if index of items fall outside of this range hide elements from view.
        const rangeEnd = this.state.currentPage * this.state.resultsPerPage;
        const rangeStart = rangeEnd - this.state.resultsPerPage;
        if ((index >= rangeStart && index < rangeEnd)) {
          $(item).fadeIn();
        } else {
          $(item).fadeOut();
        }
      });
      $('.page-header h2').text(`${activeItemsArray.length} Students`);
    } else {
      $('.page-header h2').text('No Matches');
    }
  }

  updateState(state) {
    this.state = {
      ...this.state,
      ...state
    }
  }
}

export default Pagination;
