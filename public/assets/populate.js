function insertBookmark(jsonObj) {
  var data = jsonObj;
  var linksList = document.getElementById('list-ul');

  var listItem = document.createElement('li');
  listItem.classList.add("list-li");

  var link = document.createElement('a');
  link.setAttribute('href', data.link);
  link.setAttribute('target','_blank');

  var linkWrapper = document.createElement('div');
  linkWrapper.classList.add('link-wrapper');

  var thumbnail = document.createElement('div');
  thumbnail.classList.add('thumbnail');
  // use the value for the 'link' key with Google favicon API
  thumbnail.style.backgroundImage = "url('https://www.google.com/s2/favicons?domain="+ data.link +"')";

  var linkText = document.createElement('div');
  linkText.classList.add('link-text');

  var title = document.createElement('p');
  title.textContent = data.title;

  var linkPreview = document.createElement('p');
  linkPreview.textContent = data.link;

  var actions = document.createElement('div');
  actions.classList.add('actions');

  var fav = document.createElement('label');
  fav.classList.add('btn-fav');
  fav.classList.add('tooltip');
  //fav.innerHTML = '';

  //https://stackoverflow.com/questions/24079659/loading-svg-using-innerhtml
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="heart-full" d="M12,21.35,10.55,20C5.4,15.36,2,12.28,2,8.5A5.45,5.45,0,0,1,7.5,3,6,6,0,0,1,12,5.09,6,6,0,0,1,16.5,3,5.45,5.45,0,0,1,22,8.5c0,3.78-3.4,6.86-8.55,11.54Z"/><path class="heart-box" d="M0,0H24V24H0Z"/><path class="heart-border" d="M16.5,3A6,6,0,0,0,12,5.09,6,6,0,0,0,7.5,3,5.45,5.45,0,0,0,2,8.5C2,12.28,5.4,15.36,10.55,20L12,21.35,13.45,20C18.6,15.36,22,12.28,22,8.5A5.45,5.45,0,0,0,16.5,3ZM12.1,18.55l-.1.1-.1-.1C7.14,14.24,4,11.39,4,8.5A3.42,3.42,0,0,1,7.5,5a3.91,3.91,0,0,1,3.57,2.36h1.87A3.88,3.88,0,0,1,16.5,5,3.42,3.42,0,0,1,20,8.5C20,11.39,16.86,14.24,12.1,18.55Z"/></svg>';
  var xmlDoc = new DOMParser().parseFromString(svg, 'text/xml');

  // var svg = document.createElement('svg');
  // svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
  // svg.setAttribute('viewBox','0 0 24 24');
  // svg.innerHTML = '<path class="heart-full" d="M12,21.35,10.55,20C5.4,15.36,2,12.28,2,8.5A5.45,5.45,0,0,1,7.5,3,6,6,0,0,1,12,5.09,6,6,0,0,1,16.5,3,5.45,5.45,0,0,1,22,8.5c0,3.78-3.4,6.86-8.55,11.54Z"></path><path class="heart-box" d="M0,0H24V24H0Z"></path><path class="heart-border" d="M16.5,3A6,6,0,0,0,12,5.09,6,6,0,0,0,7.5,3,5.45,5.45,0,0,0,2,8.5C2,12.28,5.4,15.36,10.55,20L12,21.35,13.45,20C18.6,15.36,22,12.28,22,8.5A5.45,5.45,0,0,0,16.5,3ZM12.1,18.55l-.1.1-.1-.1C7.14,14.24,4,11.39,4,8.5A3.42,3.42,0,0,1,7.5,5a3.91,3.91,0,0,1,3.57,2.36h1.87A3.88,3.88,0,0,1,16.5,5,3.42,3.42,0,0,1,20,8.5C20,11.39,16.86,14.24,12.1,18.55Z"></path>';

  var input = document.createElement('input');
  input.setAttribute('type','checkbox');
  input.setAttribute('data-id', data._id);

  var span = document.createElement('span');
  span.classList.add('tooltip-text');
  span.textContent = 'Favorite';

  var btnDelete = document.createElement('button');
  btnDelete.setAttribute('data-id', data._id);
  btnDelete.classList.add('btn-delete');
  btnDelete.classList.add('tooltip');
  btnDelete.innerHTML = '<img src="/images/delete.svg" alt="Delete bookmark"><span class="tooltip-text>Delete bookmark</span>"';

  var btnEdit = document.createElement('button');
  btnEdit.setAttribute('data-id', data._id);
  btnEdit.classList.add('btn-edit');
  btnEdit.classList.add('tooltip');
  btnEdit.innerHTML = '<img src="/images/edit.svg" alt="Edit bookmark"><span class="tooltip-text>Edit bookmark</span>"';

  var tagsList = document.createElement('div');
  for (var i = 0; i < data.tags.length; i++) {
    var tag = document.createElement('span');
    tag.textContent = data.tags[i];
    tag.classList.add('current-tag');
    tag.classList.add(data.tags[i]);
    tagsList.appendChild(tag);
  }
  if (data.tags.length == 0) {
      var tag = document.createElement('span');
      tag.textContent = "#";
      tag.classList.add('current-tag');
      tag.classList.add('no-tags');
      tagsList.appendChild(tag);
  }

  var item = btnDelete.getAttribute('data-id');
  console.log('new item id: ' + item);
  // fav.addEventListener('click', function() {
  //   editFav(item);
  // });
  fav.appendChild(input);
  fav.appendChild(xmlDoc.documentElement);
  fav.appendChild(span);
  actions.appendChild(fav);
  actions.appendChild(btnDelete);
  actions.appendChild(btnEdit);
  linkText.appendChild(title);
  linkText.appendChild(linkPreview);
  linkWrapper.appendChild(thumbnail);
  linkWrapper.appendChild(linkText);
  link.appendChild(linkWrapper);
  link.appendChild(actions);
  listItem.appendChild(tagsList);
  listItem.appendChild(link);
  linksList.appendChild(listItem);
  input.onclick = function() {
    editFav(input);
  };
  btnDelete.onclick = function() {
    deleteItem(btnDelete);
    return false;
  };
  btnEdit.onclick = function() {
    getSingleBookmarkData(btnEdit);
    return false;
  };
}
