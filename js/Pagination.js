class Pagination {
  constructor(options={
    numberOfItems: 10,
    parentSelector: '.page',
    itemSelector:   '.student-item'
  }) {
    this._parent   = document.querySelector(options.parentSelector);
    this._students = document.querySelectorAll(options.itemSelector);

    // Set instance state to keep track of the currently viewed page and number of students to filter by
    this.state = {
      currentPage: 1,
      resultsPerPage: options.numberOfItems
    }
  }

  getParent() {
    return this._parent;
  }

  getStudents() {
    return this._students;
  }
}

export default Pagination;
