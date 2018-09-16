class Pagination {
  constructor(options={
    numberOfItems: 10,
    parentSelector: '.page',
    itemSelector:   '.student-item'
  }) {
    this._parent   = document.querySelector(options.parentSelector);
    this._items = document.querySelectorAll(options.itemSelector);
    // Bind (instance) to this on method calls
    this.filterPage = this.filterPage.bind(this);
    // Set instance state to keep track of the currently viewed page and number of students to filter by
    this.state = {
      currentPage: 1,
      resultsPerPage: options.numberOfItems
    }
    // invoke filterPage() method on initialization of Pagination
    this.filterPage();
  }

  getParent() {
    return this._parent;
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

  filterPage(evt) {
    
  }
}

export default Pagination;
