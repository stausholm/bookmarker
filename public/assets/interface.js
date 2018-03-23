// Filter/search list of bookmarks based on all text in .link-text class
//////////////////////////////////////////////////////
document.getElementById('search-input').onkeyup = function() {
  // Declare variables
    var input, filter, ul, li, div, i, count, counter;
    input = this;
    filter = input.value.toUpperCase();
    ul = document.getElementById("list-ul");
    li = ul.getElementsByClassName('list-li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        div = li[i].getElementsByClassName("link-text")[0];
        if (div.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].classList.remove("search-hide");
            //li[i].classList.add("search-show");
        } else {
            li[i].classList.add("search-hide");
            //li[i].classList.remove("search-show");
        }
    }

    // Update the count to show the amount of bookmarks match the search query
    count = li.length - ul.getElementsByClassName('search-hide').length - ul.querySelectorAll('.tag-hide:not(.search-hide)').length;
    counter = document.getElementById('search-count');
    counter.textContent = count;

    // check if there is no bookmarks that match the search query and then display a graphic
    var noBookmarks = document.getElementById('no-bookmarks');
    if (counter.textContent == 0 && input.value != "") {
      noBookmarks.classList.add('display-block');
    } else {
      if (noBookmarks.classList.contains('display-block')) {
        noBookmarks.classList.remove('display-block');
      }
    }
}






//populate edit-modal for the clicked bookmark
//////////////////////////////////////////////////////
function populateForm(jsonObj) {
  var form = document.getElementById('put-update-bm');
  var title = document.getElementById('title-update');
  var link = document.getElementById('link-update');
  var btn = document.getElementById('btn-update');
  var div = document.getElementById('errors-container-update');
  div.innerHTML = "";

  arr = jsonObj.tags;

  var tagContainer = document.getElementById('tag-typer-container-update');
  tagContainer.innerHTML = "";
  for (var i=0; i < arr.length; i++) {
    var newTag = document.createElement('span');
    newTag.classList.add('tag', arr[i]);
    newTag.textContent = arr[i];

    var close = document.createElement('span');
    close.classList.add('close');
    //onclick run the clickDelete function and then remove then span parentElement
    close.setAttribute('onclick','clickDelete("' + arr[i] + '");this.parentElement.remove();');
    close.innerHTML = '&times;';

    newTag.appendChild(close);
    tagContainer.appendChild(newTag);
    console.log('span added');
  }

  title.value = jsonObj.title;
  link.value = jsonObj.link;
  btn.setAttribute('data-id', jsonObj._id);
  editModal(); // open the edit modal with the populated data
}






//Open edit-modal for the clicked bookmark
//////////////////////////////////////////////////////
function editModal() {
  var editModal = document.getElementById('edit-modal');
  editModal.style.display = "block";

  document.getElementById('title-update').focus();

  var closeEdit = document.getElementsByClassName('modal-close')[0];
  closeEdit.onclick = function() {
    document.getElementsByClassName('editing-now')[0].classList.remove('editing-now');
    editModal.style.display = "none";
    arr = []; // if the user closes the edit form without updating a bookmark, then reset the tags arr to prevent tags from carrying over
  }
  var cancelEdit = document.getElementById('btn-cancel');
  cancelEdit.onclick = function() {
    document.getElementsByClassName('editing-now')[0].classList.remove('editing-now');
    editModal.style.display = "none";
    arr = []; // if the user closes the edit form without updating a bookmark, then reset the tags arr to prevent tags from carrying over
  }

  console.log('edit-modal opened');
}







// new bookmark toggle dropdown
//////////////////////////////////////////////////////
function toggleBookmarkMaker() {
  var tagContainer = document.getElementById('tag-typer-container');
  tagContainer.innerHTML = "";
  var e = document.getElementById("bookmark-createOrUpdate");
  if (!e.classList.contains('box-active')) {
    document.getElementById('title').focus();
  }
  e.classList.toggle("box-active");
  arr = []; //reset arr to empty when cancelling adding a new bookmark
}







// Toggle settings dropdown
//////////////////////////////////////////////////////
function toggleSettings() {
  var e = document.getElementById("dropdown");
  e.classList.toggle("dropdown-active");
}


window.onclick = function(event) {
  // if (event.target == modal) {
  //     modal.style.display = "none";
  // }
  // prevent settings dropdown from closing when clicking inside certain parts of it
  if (!event.target.matches('.drop')) {
    var dropdown = document.getElementById("dropdown");
      if (dropdown.classList.contains('dropdown-active')) {
        dropdown.classList.remove('dropdown-active');
      }
  }
}






// Toggle help overlay
//////////////////////////////////////////////////////
function helpOn() {
    document.getElementById("overlay").style.display = "block";
}

function helpOff() {
    document.getElementById("overlay").style.display = "none";
}










// remove any existing theme class on body, and add a new class based on the value of localStorage item 'desiredTheme'.
//////////////////////////////////////////////////////
function changeTheme(e) {
  localStorage.setItem('desiredTheme',e);

  if (document.body.classList.contains('theme-blue')) {
    document.body.classList.remove('theme-blue');
  }
  if (document.body.classList.contains('theme-green')) {
    document.body.classList.remove('theme-green');
  }
  if (document.body.classList.contains('theme-yellow')) {
    document.body.classList.remove('theme-yellow');
  }
  document.body.classList.add('theme-' + e);
  console.log(e);
}
// check the value of localStorage item 'desiredTheme', and add css class to body depending on desiredTheme value
var currentTheme = localStorage.getItem('desiredTheme');
if (currentTheme == 'blue') {
  document.body.classList.add('theme-blue');
  document.getElementById('r1').checked = true;
}
if(currentTheme == 'green') {
  document.body.classList.add('theme-green');
  document.getElementById('r2').checked = true;
}
if (currentTheme == 'yellow') {
  document.body.classList.add('theme-yellow');
  document.getElementById('r3').checked = true;
}












// change between list/grid/list-condensed views by cykling through each viewmode
//////////////////////////////////////////////////////
document.getElementById('change-display-btn').addEventListener('click', function() {
  var ul = document.getElementById('list-ul');
  var img = document.getElementById('change-display-img');
  if (ul.classList.length == 0) {
    // if ul doesn't have any class when we click on it, turn it into grid view
    ul.classList.add('display-grid');
    img.setAttribute('src','/images/grid-cubes.svg');
    localStorage.setItem('desiredLayout','grid');
  } else if (ul.classList.contains('display-grid')) {
    // if ul has display-grid class, turn it into list-condensed view
    ul.classList.remove('display-grid');
    ul.classList.add('display-condensed');
    img.setAttribute('src','/images/grid-small.svg');
    localStorage.setItem('desiredLayout','condensed');
  } else {
    // if ul has a class, and that class isn't display-grid, remove the class and turn it back into normal list view
    img.setAttribute('src','/images/grid-big.svg');
    ul.classList.remove('display-condensed');
    localStorage.setItem('desiredLayout','default');
  }
});
// check the value of localStorage item 'desiredLayout'
var currentLayout = localStorage.getItem('desiredLayout');
if (currentLayout == 'default') {
  document.getElementById('list-ul').className = "";
}
if(currentLayout == 'grid') {
  document.getElementById('list-ul').className = "display-grid";
}
if (currentLayout == 'condensed') {
  document.getElementById('list-ul').className = "display-condensed";
}













// filter between li elements shown by using tags
//////////////////////////////////////////////////////
// onclick=filterTags(value) is applied when populating the tag buttons
function filterTags(c) {
  // current-tag is applied to all tags in each li when populating bookmarks
  var x = document.getElementsByClassName('current-tag');

  //remove any existing tag-highlighted classes and apply them to tags that match c
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove('tag-highlighted');
    if (x[i].classList.contains(c) ) {
      x[i].classList.add('tag-highlighted');
    }
  }

  // all of this is necessary because parentElement.parentElement doesn't work for some reason
  var y = document.getElementsByClassName('list-li');
  for (var j = 0; j < y.length; j++) {
    // childNodes[0].childNodes targets all span elements inside the first div child of each li
    var children = y[j].children[0].children;
    // add the tag-hide class to all li
    y[j].classList.add('tag-hide');
    // if any of the tags in each li contains the value of c, then remove the tag-hide again
    for (var g = 0; g < children.length; g++) {
      if (children[g].classList.contains(c)) {
        console.log('show');
        y[j].classList.remove('tag-hide');
      }
    }
  }

  var input = document.getElementById('search-input');
  var ul = document.getElementById("list-ul");
  var li = ul.getElementsByClassName('list-li');
  // Update the count to show the amount of bookmarks match the search query
  count = li.length - ul.getElementsByClassName('tag-hide').length - ul.querySelectorAll('.search-hide:not(.tag-hide)').length;
  counter = document.getElementById('search-count');
  counter.textContent = count;

  // check if there is no bookmarks that match the search query and then display a graphic
  var noBookmarks = document.getElementById('no-bookmarks');
  if (counter.textContent == 0 && input.value != "") {
    noBookmarks.classList.add('display-block');
  } else {
    if (noBookmarks.classList.contains('display-block')) {
      noBookmarks.classList.remove('display-block');
    }
  }
}


// run filterTags on initial load, to correspond with the 'Show All' button
filterTags('current-tag');








// Add tag-active css class to the clicked tag button, and remove the class from the previous button
  //////////////////////////////////////////////////////
  var tagBtnContainer = document.getElementById("tags-container");
  var tagBtns = tagBtnContainer.getElementsByClassName("tag-btn");
  for (var i = 0; i < tagBtns.length; i++) {
    tagBtns[i].addEventListener("click", function(){
      var current = document.getElementsByClassName("tag-active");
      current[0].className = current[0].className.replace(" tag-active", "");
      this.className += " tag-active";
      console.log('tag-active class added to: ' + this.textContent);
    });
  }









  // Show a toast
  //////////////////////////////////////////////////////
  function showToast(e, c) {
    var x = document.getElementById('toast');
    x.className = 'show-toast ' + c;
    if (e != null) {
      x.textContent = e;
    }
    setTimeout(function() {
      x.className = x.className.replace("show-toast","");
    }, 1600);
  }
