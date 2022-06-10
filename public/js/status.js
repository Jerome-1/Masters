var reservedBook = document.getElementsByClassName('btn')
console.log(reservedBook);
for (var i = 0; i < reservedBook.length; i++) {
    var button = reservedBook[i]
    button.addEventListener('click', function() {
        console.log('clicked')
    })
}
document.addEventListener('DOMContentLoaded', init, false);

function init() {
    if (!navigator.onLine) {
        const statusElem = document.querySelector('.page-status')
        statusElem.innerHTML = 'Offline';
        statusElem.style.color = 'red';
    };
};
//SEARCH BAR FOR THE TABLE
function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput"); //Assigning the search bar
    filter = input.value.toUpperCase(); //Telling the search bar to filter from input
    table = document.getElementsByClassName("table"); //calling the table in library.pug
    tr = table[0].getElementsByTagName("tr"); //calling the table rows in library.pug 0 is calling the first row which is book name.
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) { //set i to 0. When I is less than tr length, increase the variable of i by one.
      td = tr[i].getElementsByTagName("td")[0]; //Variable of i is being passed through the table data for the first row which is book name. in python we would do [0:2]
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

//SEARCHBAR FOR THE TEST PAGE 
function search() {
    var searchBox, filter, bookItems, book, bookName, textValue, match;
    searchBox = document.getElementById("input-bar");
    filter = searchBox.value.toUpperCase();
    bookItems = document.getElementsByClassName("row");
    book = document.getElementsByClassName("column");
    bookName = bookItems[0].getElementsByTagName("h1");

    for (var i = 0; i < bookName.length; i++) {
      match = book[i].getElementsByTagName("h1")[0];
      if(match) {
        textValue = match.textContent || match.innerText
        if(textValue.toUpperCase().indexOf(filter) > -1){
          book[i].style.display = "";
        } else {
          book[i].style.display = "none";
        }
      }
    }
  }

  const ratingStars = [...document.getElementsByClassName("rating__star")];

  function executeRating(stars) {
    const starClassActive = "rating__star fas fa-star";
    const starClassInactive = "rating__star far fa-star";
    const starsLength = stars.length;
    let i;
    stars.map((star) => {
      star.onclick = () => {
        i = stars.indexOf(star);
  
        if (star.className===starClassInactive) {
          for (i; i >= 0; --i) stars[i].className = starClassActive;
        } else {
          for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
        }
      };
    });
  }
  executeRating(ratingStars);