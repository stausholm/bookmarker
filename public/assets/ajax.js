// create new bookmark
document.getElementById('post-new-bm').onsubmit = function() {
  var form = document.getElementById('post-new-bm');
  var title = document.getElementById('title').value;
  var link = document.getElementById('link').value;

  postBookmark(title, link);

  return false;
}

function postBookmark(title, link) {
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "/", true);
  //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.setRequestHeader("Content-type", "application/json");
  //xhttp.send(encodeURI('title=' + title + '&link=' + link + '&tags=' + arr));
  xhttp.send(JSON.stringify({
    title: title,
    link: link,
    tags: arr // this arr comes from tagTyper
  }));

  xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(xhttp.responseText);
      arr = [];
      //location.reload();
      //console.log(data);
      insertBookmark(data);
      showToast('Bookmark added','success');
      toggleBookmarkMaker();
      document.getElementById('title').value = '';
      document.getElementById('link').value = '';
      document.getElementById('errors-container').innerHTML = '';
      var counter = parseInt(document.getElementById('search-count').textContent);
      counter++;
      document.getElementById('search-count').textContent = counter;
    }

    if (this.readyState == 4 && this.status == 422) {
      var err = JSON.parse(xhttp.responseText);
      console.log(err);
      err = err.error.substring(28);
      var errorArr = err.split(',');
      var div = document.getElementById('errors-container');
      div.innerHTML = "";
      errorArr.forEach(function(e) {
        var p = document.createElement('p');
        p.textContent = e;
        div.appendChild(p);
      });
    }
  };
}











// delete clicked bookmark based on their data-id attribute
document.querySelectorAll('.btn-delete').forEach(function(e) {
  e.onclick = function() {
    deleteItem(e);
    return false;
  };
});

function deleteItem(e) {
  // first hide the list-li element until the 5 second timeout deletes the record from the db
  e.parentNode.parentNode.parentNode.style.display = 'none';
  var counter = parseInt(document.getElementById('search-count').textContent);
  counter--;
  document.getElementById('search-count').textContent = counter;

  // show a toast prompting you to undo the deletion (not actually deleted yet, just hidden)
  var x = document.getElementById('toast');
  //x.style.visibility = 'visible';
  x.className = 'show-toast-long';
  x.textContent = 'Bookmark removed. Undo?';
  x.onclick = function() {
    clearTimeout(deleteTimeout);
    x.className = '';
    // redisplay the list item
    e.parentNode.parentNode.parentNode.style.display = 'flex';
    var counter = parseInt(document.getElementById('search-count').textContent);
    counter++;
    document.getElementById('search-count').textContent = counter;
  }
  // remove the toast again
  setTimeout(function() {
    x.className = x.className.replace("show-toast-long","");
  }, 5000);

  // run the ajax DELETE request if the 5 second timeout finishes
  var deleteTimeout = setTimeout(function() {
    var item = e.getAttribute('data-id');

    var xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "/" + item, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

    xhttp.onload = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(xhttp.responseText);
        //location.reload();
        // remove the corresponding list-li element from the DOM
        e.parentNode.parentNode.parentNode.remove();

        //showToastUndo(data);
        console.log(data);
      }
    };
  },5000);

  return false;
}








// change favorite status
document.querySelectorAll('.btn-fav input').forEach(function(e) {
  e.onclick = function() {
    editFav(e);
  };
});

function editFav(e) {
  var item = e.getAttribute('data-id');
  console.log(item);
  var fav;

  if(e.checked) {
    console.log('is checked');
    // add the tag-favorite class to the first span in the row of spans
    e.parentNode.parentNode.parentNode.parentNode.children[0].children[0].classList.add('tag-favorite');
    fav = true;
  } else {
    console.log('is not checked');
    e.parentNode.parentNode.parentNode.parentNode.children[0].children[0].classList.remove('tag-favorite');
    fav = false;
  }

  var xhttp = new XMLHttpRequest();

  xhttp.open("PUT", "/" + item, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({
    favorite: fav
  }));

  xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log('favorite status updated successfully');
      showToast('favorite status updated successfully', 'success');
    }
  };
  xhttp.onerror = function() {
    // There was a connection error of some sort
    showToast('Failed to update favorite status', 'error');
  };
}











// populate edit form
document.querySelectorAll('.btn-edit').forEach(function(e) {
  e.onclick = function() {
    e.parentNode.parentNode.parentNode.classList.add('editing-now');
    getSingleBookmarkData(e);
    return false;
  };
});

function getSingleBookmarkData(e) {
  var item = e.getAttribute('data-id');

  var xhttp = new XMLHttpRequest();

  xhttp.open("GET", "/" + item, true);
  //xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();

  xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(xhttp.response);
      console.log(data);
      populateForm(data); // function to populate edit form with data
    }
  };

  return false;
}








// update the bookmark document from the edit form
document.getElementById('put-update-bm').onsubmit = function() {
  var form = document.getElementById('put-update-bm');
  var title = document.getElementById('title-update').value;
  var link = document.getElementById('link-update').value;
  var item = document.getElementById('btn-update').getAttribute('data-id');

  var xhttp = new XMLHttpRequest();

  xhttp.open("PUT", "/" + item, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({
    title: title,
    link: link,
    tags: arr // this arr comes from tagTyper
  }));

  xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
      //var data = JSON.parse(xhttp.responseText);
      document.getElementById('edit-modal').style.display = 'none';
      showToast( title + ' updated successfully','success');
      var listItem = document.getElementsByClassName('editing-now')[0];
      listItem.querySelectorAll('p')[0].textContent = title;
      listItem.querySelectorAll('p')[1].textContent = link;

      var listItemTags = listItem.querySelectorAll('div')[0];
      listItemTags.innerHTML = "";
      for (var i = 0; i < arr.length; i++) {
        var tag = document.createElement('span');
        tag.textContent = arr[i];
        tag.classList.add('current-tag');
        tag.classList.add(arr[i]);
        listItemTags.appendChild(tag);
      }
      if (arr.length == 0) {
          var tag = document.createElement('span');
          tag.textContent = "#";
          tag.classList.add('current-tag');
          tag.classList.add('no-tags');
          listItemTags.appendChild(tag);
      }

      listItem.classList.remove('editing-now');
      arr = [];
      //location.reload();
      //console.log(data);
    }

    if (this.readyState == 4 && this.status == 422) {
      var err = JSON.parse(xhttp.responseText);
      console.log(err);
      err = err.error.substring(19);
      var errorArr = err.split(',');
      var div = document.getElementById('errors-container-update');
      div.innerHTML = "";
      errorArr.forEach(function(e) {
        var p = document.createElement('p');
        p.textContent = e;
        div.appendChild(p);
      });
    }
  };

  return false;
}
