/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
const itemsPerPage = 9;


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage( list, page ) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   let studentList = document.querySelector('.student-list');

   studentList.innerHTML = '';

   for(let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
         studentList.insertAdjacentHTML("beforeend",
            `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
            `
         )
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function paginateList( list ) {
   let numOfPages = Math.ceil(list.length / itemsPerPage);
   
   console.log('We will need ' + numOfPages + ' pages');

   let paginationHTML = document.querySelector('ul.link-list');
   paginationHTML.innerHTML = '';

   for(let i = 1; i <= numOfPages; i++) {
      paginationHTML.insertAdjacentHTML('beforeend',
      `
      <li>
         <button type="button">${i}</button>
      </li>
      `
      )
   }

   const firstPageButton = paginationHTML.firstElementChild.firstElementChild;
   let currentPageButton = firstPageButton;
   currentPageButton.className = 'active';

   paginationHTML.addEventListener('click',(e) => {
      const clickedPageButton = e.target;

      if( e.target.tagName === 'BUTTON') {
         const clickedPageNum = e.target.innerHTML;
         showPage( list, clickedPageNum );
         
         currentPageButton.className = '';
         clickedPageButton.className = 'active';
         currentPageButton = clickedPageButton;
      }
   })
}


function searchAndFilterNames( studentList, searchString ) {
   
   if( (searchString !== '') && (studentList.length !== 0) ) {
      searchString = searchString.toLowerCase();
      let filteredNameList = [];

      for (let i = 0; i < studentList.length; i++) {
        const firstName = studentList[i].name.first.toLowerCase();
        const lastName = studentList[i].name.last.toLowerCase();
        
         if( firstName.includes(searchString) || lastName.includes(searchString) )
            filteredNameList.push( studentList[i] );   
      }
      return filteredNameList;
   }

   else {
      return studentList;
   }
}


// Call functions
showPage(data, 1);
paginateList(data);

// Add search bar
const headerTitle = document.querySelector('h2');
headerTitle.insertAdjacentHTML("afterend",
   `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button" id="search-button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `
);

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search');

searchButton.addEventListener('click', () => {
   const searchResults = searchAndFilterNames(data, searchInput.value.toLowerCase() );

   showPage(searchResults, 1);
   paginateList(searchResults);
})