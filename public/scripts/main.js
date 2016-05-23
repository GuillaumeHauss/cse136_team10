document.addEventListener("DOMContentLoaded", function() {
  loadBookmark();

});

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

  $('.edit-bookmark').on('click', function(){
    console.log('edit clicked');
    var template = document.getElementById('edit-modal');
    var bookmark = getBookmarkEl(this);
    var compiled = ejs.compile(template.innerHTML);
    document.getElementById('crud-modal').innerHTML = compiled({bookmark:bookmark});
    var id = bookmark.title;
    $('.edit-btn').on('click', function(){
      editBookmark(id);
    });
  });

  $('.bookmark-button').on('click', function(){
    var bookmark = getBookmarkEl(this);
    incrementBookmark(bookmark.title, this);
  });

  $('.star-btn').on('click',function(){
    console.log('star btn clicked: ' + this.children[0].getAttribute('class'));
    var bookmark = getBookmarkEl(this);
    console.log(bookmark.star);
    starBookmark(bookmark.title, bookmark.star);
    /*if(this.children[0].getAttribute('class') === 'fa fa-star filled'){
      this.children[0].setAttribute('class', 'fa fa-star-o filled');
    }
    else if (this.children[0].getAttribute('class') === 'fa fa-star-o filled') {
      this.children[0].setAttribute('class', 'fa fa-star filled');
    }*/

  });

  $('#sort-title').on('click', function(){
    sortByTitle();
  });

  $('#sort-last-visit').on('click', function(){
    sortByLastVisit()();
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


  $('.add-btn').on('click',addBookmark);
  //$('.edit-btn').on('click', editBookmark);
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

function deleteBookmark(id){
  console.log('deleted: '+ id);
  makeRequest("DELETE","/api/bookmarks/delete/" + id, deleteCard);
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
  makeRequest("GET","/api/counter", populateList);
}

function sortSearch(){
  makeRequest("GET","/api/search", populateList);
}


function addBookmark(){
  makeRequest("POST","/api/bookmarks/insert",populateList, grabFormElements());
}

function editBookmark(id){
  console.log('Editing bookmark');
  makeRequest("PUT", "/api/bookmarks/update/" + id, populateList, grabFormElements());
}

function incrementBookmark(id){
  console.log("Incrementing Bookmark Counter :" + id);
  makeRequest("GET", "/api/bookmarks/counter/" + id, incrementValue);
}

function starBookmark(id,starValue){
  console.log(starValue);
  makeRequest("GET", "/api/bookmarks/star/" + id + '/' + starValue, toggleStar);

}
/*
function updateBookmark(){
  console.log("updating bookmark");
  makeRequest("POST","/api/bookmarks/insert",populateList, grabFormElements());
}*/

function grabFormElements(){
  var title = document.getElementById('add-title').value;
  var url = document.getElementById('add-url').value;
  var tag1 = document.getElementById('add-tag1').value;
  var tag2 = document.getElementById('add-tag2').value;
  var tag3 = document.getElementById('add-tag3').value;
  var tag4 = document.getElementById('add-tag4').value;
  var description = document.getElementById('add-description').value;
  var star = document.getElementById('add-star').value;

  var payload = 'title=' + title + '&url=' + url + '&tag1=' + tag1  + '&tag2=' + tag2  + '&tag3=' + tag3  + '&tag4=' + tag4  + '&description=' + description  + '&star=' + star;

  console.log(payload);

  document.getElementById('add-title').setAttribute("value","");
  document.getElementById('add-url').setAttribute("value","");
  document.getElementById('add-tag1').setAttribute("value","");
  document.getElementById('add-tag2').setAttribute("value","");
  document.getElementById('add-tag3').setAttribute("value","");
  document.getElementById('add-tag4').setAttribute("value","");
  document.getElementById('add-description').setAttribute("value","");
  document.getElementById('add-star').setAttribute("value","");
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
//function editCard
//Call Back Functions
function deleteCard(data){
  console.log(data);
  var card = document.getElementById(data.bookmark);
  console.log(card.parentNode.parentNode);
  var cardToRemove = card.parentNode;
  cardToRemove.parentNode.removeChild(cardToRemove);
}

function populateList(data){
  console.log("populate List" + data);
  var template = document.getElementById('list');
  console.log(template.innerHTML);
  var compiled = ejs.compile(template.innerHTML);
  document.getElementById('bookmark-card').innerHTML = compiled({bookmarks: data});
  loadListeners();
}

//Get Bookmark Elements from the DOM Tree
function getBookmarkEl(bookmark){

  var bookmarkCard = bookmark.parentNode.parentNode;
  var starValue = bookmarkCard.children[4].children[3].value;
  var tags = [];
  for(var i = 0, len = bookmarkCard.children[3].children.length; i < len; i++){
    tags.push(bookmarkCard.children[3].children[i]);
  }
  //console.log("value of star: " + starValue);
  return {
    "title" : bookmarkCard.children[0].innerHTML,
    "description" : bookmarkCard.children[1].innerHTML,
    "url" : bookmarkCard.children[2].getAttribute("href"),
    "star" : starValue,
    "tag1" : tags[0].innerHTML,
    "tag2" : tags[1].innerHTML,
    "tag3" : tags[2].innerHTML,
    "tag4" : tags[3].innerHTML
  };
}

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

