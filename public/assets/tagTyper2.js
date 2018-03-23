var arr = [];

var tagTyper2 = document.getElementById('tag-typer-update');
var currentRow = 0;
tagTyper2.addEventListener('keyup',function(event) {
  // cancel any default actions there may be
  event.preventDefault();
  // if comma (188) is pressed, and the last character in the input field is ','
  if (event.keyCode === 188 && tagTyper2.value.slice(-1) == ",") {
    console.log('comma pressed');
    // only if the value is contains more than a comma should the addTags2 function run
    if (tagTyper2.value != ",") {
      //pass the value of the field to the addTags2 function
      addTags2(tagTyper2.value);
    }
    //reset the value
    tagTyper2.value = "";
  }

  // declare variables
  var ul = document.getElementById('suggested-tags-update');
  var filter = tagTyper2.value.toUpperCase();
  var li = ul.getElementsByTagName('li');


  // add a list of all tags to a dropdown
  if (ul.children.length == 0) {
    for (var j = 0; j < allTagsArr.length; j++) {
      // allTagsArr contains all existing tags in use
      var value = allTagsArr[j];
      var liNew = document.createElement('li');
      liNew.textContent = value;
      liNew.setAttribute("onclick","addThisTag2('" + value + "')");
      //liNew.style.display = "none";
      liNew.classList.add('display-none');
      ul.appendChild(liNew);
    }
  }


  // search for tags
  if (tagTyper2.value != "") {
    for (var i = 0; i < li.length; i++) {
      if (li[i].textContent.toUpperCase().indexOf(filter) > -1) {
        //li[i].style.display = "";
        li[i].classList.remove('display-none');
        li[i].classList.add('display-block');
      } else {
        //li[i].style.display = "none";
        li[i].classList.add('display-none');
        li[i].classList.remove('display-block');
      }
    }
  } else {
    // if tagTyper2.value is empty, hide all li elements
    for (var i = 0; i < li.length; i++) {
      //li[i].style.display = "none";
      li[i].classList.add('display-none');
      li[i].classList.remove('display-block');
    }
  }


  // down arrow
  var displayBlocks = ul.getElementsByClassName('display-block');
  var current = document.getElementsByClassName('yoyo');

  // if an li has the yoyo class, and if the keyCode is anything else than down(40), up(38) or enter(13),
  // remove the yoyo class and reset currentRow, to clear any highlighted state on li element
  if (current[0]) {
    if (event.keyCode == 40 || event.keyCode == 38 || event.keyCode == 13) {
      console.log('pressed up, down or enter');
    } else {
      current[0].classList.remove('yoyo');
      currentRow = 0;
      console.log('removed yoyo class');
    }
  }

  // if pressed down(40), and there are visible li elements
  if (event.keyCode === 40 && ul.getElementsByClassName('display-block').length > 0) {
    // if there is no li with the yoyo class, add it to the first li
    if (!current[0]) {
      displayBlocks[0].classList.add('yoyo');
    } else {
      //remove yoyo from the currently highlighted li
      current[0].classList.remove('yoyo');
      // loop back to the first li. else move down one li
      if (currentRow == (displayBlocks.length -1) ) {
        currentRow = 0;
      } else {
        currentRow++;
      }
      displayBlocks[currentRow].classList.add('yoyo');
    }
    current[0].scrollIntoView();
    console.log('pressed down');
  }

  // if pressed up(38) and there is a li with the yoyo class
  if (event.keyCode === 38 && current[0]) {
    current[0].classList.remove('yoyo');
    //prevent currentRow from going below 0
    if (currentRow != 0) {
      currentRow--;
    }
    displayBlocks[currentRow].classList.add('yoyo');
    current[0].scrollIntoView();
    console.log('pressed up');
  }

  // if enter (13) is pressed while an element has the yoyo class
  if (event.keyCode === 13 && current[0]) {
    console.log('codeblock fired');
    addThisTag2(current[0].textContent);
    currentRow = 0;
    //current[0].classList.remove('yoyo');
  }

});




// backspace to target last added tag, backspace again to delete this tag
tagTyper2.addEventListener('keydown',function(event) {
  var tagContainer = document.getElementById('tag-typer-container-update');

  // when enter is pressed while a li has yoyo class, prevent form submit to allow addThisTag2() to run
  if (event.keyCode === 13 && document.getElementsByClassName('yoyo')[0]) {
    event.preventDefault();
  }
  // prevent the up arrow from jumping to the beginning of the tagTyper2 input field
  if (event.keyCode === 38) {
    event.preventDefault();
  }

  // if the input is empty and backspace (8) is pressed
  if (tagTyper2.value == "" && event.keyCode === 8) {
    // if there are more than 0 span elements in tagContainer
    if (tagContainer.children.length > 0) {
      // if the last span child has 'tag-focus' class, then run clickDelete2 function and remove last span child
      if (tagContainer.lastChild.classList.contains('tag-focus')) {
        clickDelete2(tagContainer.lastChild.textContent.slice(0, -1));
        // delete the last tag added
        tagContainer.removeChild(tagContainer.lastChild);
      } else {
        tagContainer.lastChild.classList.add('tag-focus');
      }
    }
  }

  if (tagContainer.children.length > 0) {
    // if anything else than backspace is pressed while the last child has tag-focus class
    if(event.keyCode !== 8 && tagContainer.lastChild.classList.contains('tag-focus')) {
      tagContainer.lastChild.classList.remove('tag-focus');
    }
  }
});




function addTags2(tag) {
  //Remove the last char of the value (a comma)
  tag = tag.slice(0, -1);
  var tagContainer = document.getElementById('tag-typer-container-update');
  //var arr = [];


  // if arr already includes the value of this tag, then ignore it. Else create a new span with the tag
  if (arr.includes(tag)) {
    console.log('already in arr');
  } else {
    console.log('not in arr');
    var newTag = document.createElement('span');
    newTag.classList.add('tag', tag);
    newTag.textContent = tag;

    var close = document.createElement('span');
    close.classList.add('close');
    //onclick run the clickDelete2 function and then remove then span parentElement
    close.setAttribute('onclick','clickDelete2("' + tag + '");this.parentElement.remove();');
    close.innerHTML = '&times;';

    newTag.appendChild(close);
    tagContainer.appendChild(newTag);
    console.log('span added');

    // if the tag was found through the dropdown generated with data from allTagsArr, then remove that value from allTagsArr
    if(allTagsArr.includes(tag)) {
      var index = allTagsArr.indexOf(tag);
      allTagsArr.splice(index, 1);
      console.log('removed from allTagsArr: ' + tag);


      //update the dropdown of suggested tags by removing all li elements, so a new one is ready to be generated with the new allTagsArr values
      var ul = document.getElementById('suggested-tags-update');
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
    }

  }


  // first create an array of all the current tags in tagContainer
  for (var i = 0; i < tagContainer.children.length; i++) {
    // ignore the last char (the X to close the span)
    var currentTags = tagContainer.children[i].textContent.slice(0, -1);
    // if arr doesn't contain the value of any of the currentTags, then push that value to arr
    if (arr.indexOf(currentTags) === -1) {
      arr.push(currentTags);
      console.log('added to arr: ' + currentTags);
    }
  }

  console.log(arr);
}



// function addTags2(tag) {
//   //Remove the last char of the value (a comma)
//   tag = tag.slice(0, -1);
//   var tagContainer = document.getElementById('tag-typer-container-update');
//   //var arr = [];
//
//
//   // if arr already includes the value of this tag, then ignore it. Else create a new span with the tag
//   if (arr.includes(tag)) {
//     console.log('already in arr');
//   } else {
//     console.log('not in arr');
//     var newTag = document.createElement('span');
//     newTag.classList.add('tag', tag);
//     newTag.textContent = tag;
//
//     var close = document.createElement('span');
//     close.classList.add('close');
//     //onclick run the clickDelete2 function and then remove then span parentElement
//     close.setAttribute('onclick','clickDelete2("' + tag + '");this.parentElement.remove();');
//     close.innerHTML = '&times;';
//
//     newTag.appendChild(close);
//     tagContainer.appendChild(newTag);
//     console.log('span added');
//   }
//
//
//   // first create an array of all the current tags in tagContainer
//   for (var i = 0; i < tagContainer.children.length; i++) {
//     // ignore the last char (the X to close the span)
//     var currentTags = tagContainer.children[i].textContent.slice(0, -1);
//     // if arr doesn't contain the value of any of the currentTags, then push that value to arr
//     if (arr.indexOf(currentTags) === -1) {
//       arr.push(currentTags);
//       console.log('added to arr: ' + currentTags);
//     }
//   }
//
//   console.log(arr);
// }











// re-add this tag to allTagsArr and then sort allTagsArr alphabetically
function clickDelete2(tag) {
  console.log('clicked close on: ' + tag);
  console.log('added to allTagsArr: ' + tag);
  allTagsArr.push(tag);
  allTagsArr.sort(function(a,b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });


  var index = arr.indexOf(tag);
  arr.splice(index, 1);

  //update the dropdown of suggested tags by removing all li elements, so a new one is ready to be generated with the new allTagsArr values
  var ul = document.getElementById('suggested-tags-update');
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

// when clicking on a suggested tag from the dropdown, run addTags2, reset the input field and focus it again
function addThisTag2(val) {
  // add an extra char that addTags2 then removes
  addTags2(val + "s");
  tagTyper2.value = "";
  tagTyper2.focus();
  currentRow = 0;
}

tagTyper2.addEventListener('blur',function() {
  setTimeout(function(){
    var ul = document.getElementById('suggested-tags-update');
    if(ul.getElementsByClassName('display-block').length > 0) {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      currentRow = 0;
      console.log('removed all suggested li elements on blur');
    }
  },100);

});
