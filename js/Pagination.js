class Pagination {
  constructor(resultsPerPage) {
    this._parent   = document.querySelector('.page');
    this._students = document.querySelectorAll('.student-item');


  }

  getParent() {
    return this._parent;
  }

  getStudents() {
    return this._students;
  }
}

export default Pagination;
