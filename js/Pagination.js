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
    evt ? evt.preventDefault() : null;
    // calculate range of items that will display, if index of items fall outside of this range hide elements from view.
    const rangeEnd = this.state.currentPage * this.state.resultsPerPage;
    const rangeStart = rangeEnd - this.state.resultsPerPage;

    this.getItems().forEach((item,index) => {
      if (index >= rangeStart && index < rangeEnd) {
        item.className += ' active';
        $(item).show();
      } else {
        item.className === 'active' ? item.classList.remove('active') : null;
        $(item).hide();
      }
    });

    return this.getItems();
  }
}

export default Pagination;
