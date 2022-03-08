/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Set number of student profiles to display per page
const itemsPerPage = 9;

// Creates and displays page with a list of students with profile picture, full name, email, and join date.
function showPage( list, page ) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   let studentList = document.querySelector('.student-list');

   studentList.innerHTML = '';

   // Looping to add each student and their info to HTML
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


// Creates and displays interactive page buttons based on size of given list. 
function paginateList( list ) {
   let numOfPages = Math.ceil( list.length / itemsPerPage );
   
   let paginationHTML = document.querySelector('ul.link-list');
   paginationHTML.innerHTML = '';

   if( numOfPages !== 0 ) {
      for( let i = 1; i <= numOfPages; i++ ) {
         paginationHTML.insertAdjacentHTML('beforeend',
         `
         <li>
            <button type="button">${i}</button>
         </li>
         `
         )
      }

      // Default to page 1 until other page clicked on
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
}

// Search through given student list based on name. Returns list of students
// matching search query
function searchAndFilterNames( listToSearch, searchString ) {
   
   if( (searchString !== '') && (listToSearch.length !== 0) ) {
      searchString = searchString.toLowerCase();
      let filteredNameList = [];

      for (let i = 0; i < listToSearch.length; i++) {
        const firstName = listToSearch[i].name.first.toLowerCase();
        const lastName = listToSearch[i].name.last.toLowerCase();
        
         if( firstName.includes(searchString) || lastName.includes(searchString) )
            filteredNameList.push( listToSearch[i] );   
      }
      return filteredNameList;
   }

   else {
      return listToSearch;
   }
}

// Print search results to page. Print 'no results found' if search comes back empty
function displaySearchResultsList ( searchResults ) {
   showPage( searchResults, 1 );
   paginateList( searchResults );

   if( searchResults.length === 0 ) {
      const listHTML = document.querySelector('.student-list');
      listHTML.innerHTML= `<h1>No Results Found</h1>`;
   }
}



// Calls functions to display page and page buttons
showPage( data, 1 );
paginateList( data );

// Adds search bar to search students by name
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

// Search by clicking on search icon
searchButton.addEventListener('click', () => {
   const searchResults = searchAndFilterNames(data, searchInput.value.toLowerCase() );
   displaySearchResultsList( searchResults );
})

// Search student list at keyup in search bar
searchInput.addEventListener('keyup', ()=> {
   const searchResults = searchAndFilterNames(data, searchInput.value.toLowerCase() );
   displaySearchResultsList( searchResults );
})