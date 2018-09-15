class Pagination {
  constructor(options={numberOfItems: 10}) {
    this._parent   = document.querySelector('.page');
    this._students = document.querySelectorAll('.student-item');

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
