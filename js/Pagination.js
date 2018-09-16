// Pagination takes optional arguments as a JavaScript Object with key, values to alter behavior of the functionality,
// If no arguments are provided they will default to values in constructor.
class Pagination {
  constructor(options={
    numberOfItems: 10,
    parentSelector: '.page',
    itemSelector:   '.student-item',
    parentSearchSelector: '.page-header'
  }) {
    this._parent   = document.querySelector(options.parentSelector);
    this._items = document.querySelectorAll(options.itemSelector);
    this._searchContainer = document.querySelector(options.parentSearchSelector);
    // Bind instance to #filterPage method
    this.filterPage = this.filterPage.bind(this);
    this.filterOnSubmit = this.filterOnSubmit.bind(this);
    // Set instance state to keep track of the currently viewed page and number of students to filter by
    this.state = {
      currentPage: 1,
      resultsPerPage: options.numberOfItems
    }

    this.init();
  }

  init() {
    // invoke filterPage(), appendPagination, attach event listener to pagination
    this.appendPagination().addEventListener('click', this.filterPage);
    // Append dynamic search filter into DOM '.page-header'
    this.appendSearchField().addEventListener('click', this.filterOnSubmit);
    this.filterPage();
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

  numberOfItems() {
    return this.getItems().length;
  }

  numberOfPages() {
    return Math.ceil( this.numberOfItems() / this.state.resultsPerPage );
  }

  appendPagination() {
    const pagination = this.createPaginationNode();
    pagination.innerHTML = this.createPaginationNumbers();

    this.getParent().appendChild(pagination);
    return pagination;
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

    return { input: input, button: button };
  }

  filterPage(evt) {
    if (evt) {
      evt.preventDefault();
      // update state with new current page number using element attr data-pgnum
      this.updateState({ currentPage: parseInt(evt.target.getAttribute('data-pgnum')) })
    }
    // calculate range of items that will display, if index of items fall outside of this range hide elements from view.
    const rangeEnd = this.state.currentPage * this.state.resultsPerPage;
    const rangeStart = rangeEnd - this.state.resultsPerPage;

    this.getItems().forEach((item,index) => {
      if (index >= rangeStart && index < rangeEnd) {
        $(item).fadeIn();
      } else {
        $(item).fadeOut();
      }
    });

    return this.getItems();
  }

  updateState(state) {
    this.state = {
      ...this.state,
      ...state
    }
    console.log(this.state);
  }
}

export default Pagination;
