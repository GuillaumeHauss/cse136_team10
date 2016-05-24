document.addEventListener("DOMContentLoaded", function() {
  loadBookmark();
  loadFolder();
  console.log(static_folders);
});
var static_folders;

//LOAD ONCLICK LISTENERS
function loadListeners(){

  //CRUD EVENT LISTENERS
  $('.delete-bookmark').on('click', function(){
    console.log('delete clicked');
    var template = document.getElementById('delete-modal');
    var bookmark = getBookmarkEl(this);
    bookmark.crudType = "Delete";
    var compiled = ejs.compile(template.innerHTML);
    document.getElementById('crud-modal').innerHTML = compiled({bookmark:bookmark});
    console.log(bookmark.title);
    $('.delete-btn').on('click',function(){
      deleteBookmark(bookmark.title);
    });
  });

  $('.add-folder-btn').on('click', function(){
    addFolder();
  });

  $('.add-btn').on('click', function(){
    //event.preventDefault();
    console.log("add button clicked");
    addBookmark();
  });

  $('.edit-bookmark').on('click', function(){
    console.log('edit clicked');
    var template = document.getElementById('edit-modal');
    var bookmark = getBookmarkEl(this);

    var compiled = ejs.compile(template.innerHTML);
    document.getElementById('crud-modal').innerHTML = compiled({bookmark:bookmark, folders: static_folders});
    var id = bookmark.title;
    for(var i = 0, len = static_folders.length; i< len; i++){
      console.log(bookmark.folder);
      console.log(static_folders[i].name);
      if(static_folders[i].name === bookmark.folder){
        console.log('hi');
        console.log(  document.getElementsByClassName("folder-options[value='" + bookmark.folder + "']"));
        var folderOptions = document.getElementsByClassName("folder-options");
        for(i=0, len= folderOptions.length; i < len; i++){
          if(folderOptions[i]. value === bookmark.folder){
            folderOptions[i].setAttribute("selected","selected");
          }
        }
      }
    }

    $('.edit-btn').on('click', function(){
      editBookmark(id);
    });
  });

  $('.bookmark-button').on('click', function(){
    var bookmark = getBookmarkEl(this);
    incrementBookmark(bookmark.title, this);
  });

  $('.add-bookmark-folder').on('click', function(){

  });

  $('.star-btn').on('click',function(){
    console.log('star btn clicked: ' + this.children[0].getAttribute('class'));
    var bookmark = getBookmarkEl(this);
    console.log(bookmark.star);
    starBookmark(bookmark.title, bookmark.star);
  });

  $('#sort-title').on('click', function(){
    sortByTitle();
  });

  $('#sort-last-visit').on('click', function(){
    sortByLastVisit();
  });

  $('#sort-url').on('click', function(){
    sortByUrl();
  });

  $('#sort-date').on('click', function(){
    sortByDate();
  });

  $('#sort-starred').on('click', function(){
    //sortStarred();
  });

  $('#sort-visit').on('click', function(){
    sortByViews();
  });

}

//Function WRAPPER  for AJAX Calls
function makeRequest(request,url, operation, payload) {
  var httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    console.log("Could not create an XMLHttp Instance :(");
    return false;
  }
  httpRequest.open(request, url,true);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  httpRequest.onreadystatechange = function(){
    console.log("getting request");
    if (httpRequest.readyState == XMLHttpRequest.DONE) {
      if (httpRequest.status == 200) {
        console.log("request successful:" + httpRequest.responseText);
        var response = JSON.parse(httpRequest.responseText);
        operation(response);
      }
      else{
        console.log("There was a problem with the request");
        return false;
      }
    }
  };
  console.log("sending request: "+ payload);
  httpRequest.send(encodeURI(payload));
}

//Wrapper Functions to make Ajax Requests
function loadBookmark(){
  makeRequest("GET","/api/bookmarks", populateList);
}

function loadFolder(){
  makeRequest("GET", "/api/folders", populateFolders);
}
function deleteBookmark(id){
  console.log('deleted: '+ id);
  makeRequest("DELETE","/api/bookmarks/delete/" + id, deleteCard);
}

function addFolder(){
  makeRequest("POST","/api/folders/insert", populateFolders, grabFolderElements());
}

function sortByTitle(){
  makeRequest("GET","/api/sortTitle", populateList);
}

function sortByUrl(){
  makeRequest("GET","/api/sortURL", populateList);
}

function sortByDate(){
  makeRequest("GET","/api/sortCreateDate", populateList);
}

function sortByLastVisit(){
  makeRequest("GET","/api/sortLastVisit", populateList);
}

function sortByViews(){
  makeRequest("GET","/api/sortCounter", populateList);
}

function sortSearch(){
  makeRequest("GET","/api/search", populateList);
}

function addBookmark(){
  makeRequest("POST","/api/bookmarks/insert",populateList, grabAddFormElements());
}

function editBookmark(id){
  console.log('Editing bookmark');
  makeRequest("PUT", "/api/bookmarks/update/" + id, populateList, grabEditFormElements());
}

function incrementBookmark(id){
  console.log("Incrementing Bookmark Counter :" + id);
  makeRequest("GET", "/api/bookmarks/counter/" + id, incrementValue);
}

function starBookmark(id,starValue){
  console.log(starValue);
  makeRequest("GET", "/api/bookmarks/star/" + id + '/' + starValue, toggleStar);

}

function retrieveBookmark(id){

}

/***
 * Grabs user input when adding a new bookmark
 * @returns {string}
 */
function grabAddFormElements(){
  var title = document.getElementById('add-title').value;
  var url = document.getElementById('add-url').value;
  var tag1 = document.getElementById('add-tag1').value;
  var tag2 = document.getElementById('add-tag2').value;
  var tag3 = document.getElementById('add-tag3').value;
  var tag4 = document.getElementById('add-tag4').value;
  var description = document.getElementById('add-description').value;
  var star = document.getElementById('add-star').value;
  var folder = document.getElementById('list-of-folders').value;
  var payload = 'title=' + title + '&url=' + url + '&tag1=' + tag1  + '&tag2=' + tag2  + '&tag3=' + tag3  + '&tag4=' + tag4  + '&description=' + description  + '&star=' + star + '&folder=' + folder;

  document.getElementById('add-title').setAttribute("value","");
  document.getElementById('add-url').setAttribute("value","");
  document.getElementById('add-tag1').setAttribute("value","");
  document.getElementById('add-tag2').setAttribute("value","");
  document.getElementById('add-tag3').setAttribute("value","");
  document.getElementById('add-tag4').setAttribute("value","");
  document.getElementById('add-description').setAttribute("value","");
  document.getElementById('add-star').setAttribute("value","");
  document.getElementById('list-of-folders').setAttribute ("value","");

  document.getElementById('list-of-folders').value ="";
  document.getElementById('add-title').value = "";
  document.getElementById('add-url').value= "";
  document.getElementById('add-tag1').value= "";
  document.getElementById('add-tag2').value= "";
  document.getElementById('add-tag3').value= "";
  document.getElementById('add-tag4').value= "";
  document.getElementById('add-description').value= "";
  document.getElementById('add-star').value= "";

  return payload;
}


/***
 * Grabs user input when editing a bookmark
 * @returns {string}
 */
function grabEditFormElements(){
  var title = document.getElementById('edit-title').value;
  var url = document.getElementById('edit-url').value;
  var tag1 = document.getElementById('edit-tag1').value;
  var tag2 = document.getElementById('edit-tag2').value;
  var tag3 = document.getElementById('edit-tag3').value;
  var tag4 = document.getElementById('edit-tag4').value;
  var description = document.getElementById('edit-description').value;
  var star = document.getElementById('edit-star').value;
  var folder = document.getElementById('list-of-folders').value;

  var payload = 'title=' + title + '&url=' + url + '&tag1=' + tag1  + '&tag2=' + tag2  + '&tag3=' + tag3  + '&tag4=' + tag4  + '&description=' + description  + '&star=' + star + '&folder=' + folder;

  document.getElementById('edit-title').setAttribute("value","");
  document.getElementById('edit-url').setAttribute("value","");
  document.getElementById('edit-tag1').setAttribute("value","");
  document.getElementById('edit-tag2').setAttribute("value","");
  document.getElementById('edit-tag3').setAttribute("value","");
  document.getElementById('edit-tag4').setAttribute("value","");
  document.getElementById('edit-description').setAttribute("value","");
  document.getElementById('edit-star').setAttribute("value","");
  document.getElementById('list-of-folders').setAttribute("value","");
  document.getElementById('edit-title').value = "";
  document.getElementById('edit-url').value= "";
  document.getElementById('edit-tag1').value= "";
  document.getElementById('edit-tag2').value= "";
  document.getElementById('edit-tag3').value= "";
  document.getElementById('edit-tag4').value= "";
  document.getElementById('edit-description').value= "";
  document.getElementById('edit-star').value= "";
  document.getElementById('list-of-folders').value="";

  return payload;
}

/***
 * Grabs user input for creating a new folder
 * @returns {string}
 */
function grabFolderElements() {
  var folderName = document.getElementById('add-folder-name').value;
  var payload = "title=" + folderName;
  document.getElementById('add-folder-name').value = "";
  document.getElementById('add-folder-name').setAttribute("value", "");
  return payload;
}

/**
 * Function to remove the card from the View
 * @param data
 */
function deleteCard(data){
  console.log(data);
  var card = document.getElementById(data.bookmark);
  console.log(card.parentNode.parentNode);
  var cardToRemove = card.parentNode;
  cardToRemove.parentNode.removeChild(cardToRemove);
}

/**
 * Function to populate the view with bookmarks
 * @param data
 */
function populateList(data){
  console.log("populate List" + data);
  var template = document.getElementById('list');
  var compiled = ejs.compile(template.innerHTML);
  document.getElementById('bookmark-card').innerHTML = compiled({bookmarks: data});

  loadListeners();
}

/**
 * Function to populate the view with folders
 * @param data
 */
function populateFolders(data){
  console.log("populating Folders" + data);
  var template = document.getElementById('folder-list');
  var compiled = ejs.compile(template.innerHTML);
  console.log(data[0] + ' ' + data[1]);
  document.getElementById('folders').innerHTML = compiled({folders: data});

  var template2 = document.getElementById('folder-list-form');
  var compiled2 = ejs.compile(template2.innerHTML);
  document.getElementById('list-of-folders').innerHTML = compiled2({folders: data});

  static_folders = data;

}


/***
 * This function get's the bookmark element from clicking the crud functions
 * @param bookmark
 *
 */
function getBookmarkEl(bookmark){
  var bookmarkCard = bookmark.parentNode.parentNode;
  var starValue = bookmarkCard.children[4].children[3].value;
  var tags = [];
  for(var i = 0, len = bookmarkCard.children[3].children.length; i < len; i++){
    tags.push(bookmarkCard.children[3].children[i]);
  }

  var folderType = bookmarkCard.getAttribute("data-folder-type");
  /*return makeRequest('GET', '/api/bookmarks/retrieve/' + title, getBookmark);*/

  return {
    "title" : bookmarkCard.children[0].innerHTML,
    "description" : bookmarkCard.children[1].innerHTML,
    "url" : bookmarkCard.children[2].getAttribute("href"),
    "star" : starValue,
    "tag1" : tags[0].innerHTML,
    "tag2" : tags[1].innerHTML,
    "tag3" : tags[2].innerHTML,
    "tag4" : tags[3].innerHTML,
    "folder": folderType
  };
}

/***
 * Function to increment the counter in the view
 * @param
 */
function incrementValue(data){
  console.log(data);
  var bookmarkObj = document.getElementById(data.title);
  var child = bookmarkObj.children;
  for (var i = 0; i < child.length; i++) {
    if (child[i].getAttribute("class") === 'crud-btns') {
      console.log(child[i]);
      var counter = child[i].children[0].children[0];
      counter.innerHTML = data.counter;
    }
  }
}

/***
 * Function to toggle the status of the star in the view
 * @param data
 */
function toggleStar(data){
  var bookmarkObj = document.getElementById(data.title);
  var child = bookmarkObj.children;

  for (var i = 0; i < child.length; i++) {
    if (child[i].getAttribute("class") === 'crud-btns') {
      var star = child[i].children[3];
      star.value = data.star;
    }
  }
  if(star.value === '1'){
    star.children[0].className = 'fa fa-star filled';
  }
  else if(star.value === '0'){
    star.children[0].className = 'fa fa-star-o filled';
  }
}

