JS Pagination and Search Project
================================
## About
  Project 3 from TeamTreehouse's JavaScript Techdegree. Create a pagination for limiting the number of displayed student elements on the index view page with a numbered page navigation element at the bottom of the page.

  Solution to challenge is implemented with ES6 Class Syntax located in ./js/Pagination.js, ./js/App.js

  Specific Requirements below

## Usage
  To work on Project or to view locally, `fork` or `git clone https://github.com/Nick-Damico/JavaScript-Techdegree-Project-3-Pagination`

  `cd into ./JavaScript-Techdegree-Project-3-Pagination` directory. Due to ES6 import statements being used in
  ./js/App.js you will need to start a web server to view working example of the project.

  This avoids the error `Access to Script at './Pagination/pagination-filter/js/App.js' from origin 'null' has been blocked by CORS policy: Invalid response. Origin 'null' is therefore not allowed access.`

  Start Server with: `python -m SimpleHTTPServer 8000`

## Requirements

- [X] Use the filters-example.html file to guide your decision making. Using progressive enhancement, your work should affect the index.html file.

- [X] Since only 10 students should be shown at a time, your programming needs to calculate the number of pages needed and add the appropriate number of links to the bottom of the page.

- [X] Hide all but the first 10 students when the page loads.

- [X] When a user clicks on “2” in the pagination, students 11 through 20 are shown. When a user clicks “3”, students 21 through 30 are shown. And so on. When “6” is clicked 51 through 55 should be shown.

- [X] Using progressive enhancement, add the student search markup as presented in the filters-example.html file to the index.html file.

- [] Add an event listener to the search button. When the user clicks on the button it should use the text in the search input to filter the results. Searching should be case insensitive. e.g. a search for “Susan” should return results for “susan” and “Susan".

- [] Users should be able to search by name or e-mail address. And partial matches, like just a first name, should be displayed in the results.

- [] Search results should also be paginated. For example, if the search returns more than 10 results, those results should be paginated too.

- [] Before you submit your project for review, make sure you can check off all of the items on the Student Project Submission Checklist. The checklist is designed to help you make sure you’ve met the grading requirements and that your project is complete and ready to be submitted!


## Extra Credit

- [] Include simple animations when transitioning between pages.

- [] As the user types in the search box, dynamically filter the student listings. In other words, after each letter is typed into the search box, display any listings that match .

- [] If no matches are found, include a message in the HTML to tell the user there are no matches.

# View Project
[Live Demo]() of this project for peer review.
