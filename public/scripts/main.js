

  document.addEventListener("DOMContentLoaded", function() {
    loadBookmark();

  });

  //LOAD ONCLICK LISTENERS
  function loadListeners(){
    $('.delete-bookmark').on('click', function(){
      console.log('clicked');
      var template = document.getElementById('delete-modal');
      console.log(template);
      var bookmark = getBookmarkEl(this);
      /*bookmark.crudType = "Delete";
      var compiled = ejs.compile(template.innerHTML);
      document.getElementById('crud-modal').innerHTML = compiled({bookmark:bookmark});
      console.log(bookmark.title);*/
      deleteBookmark(bookmark.title);
    });

    $('.add-btn').on('click',addBookmark);

  }

  /*function loadCrud(id){
    $('.delete-btn').on('click', deleteBookmark(id));
  }*/

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

  //Functions to make Ajax Requests
  function loadBookmark(){
    makeRequest("GET","/api/bookmarks", populateList);
  }

  function deleteBookmark(id){
    console.log('deleted: '+ id);
    makeRequest("DELETE","/api/bookmarks/delete/" + id, deleteCard);
  }

  function addBookmark(){
    var title = document.getElementById('add-title').value;
    var url = document.getElementById('add-url').value;
    var tag1 = document.getElementById('add-tag1').value;
    var tag2 = document.getElementById('add-tag2').value;
    var tag3 = document.getElementById('add-tag3').value;
    var tag4 = document.getElementById('add-tag4').value;
    var description = document.getElementById('add-description').value;
    var star = document.getElementById('add-star').value;

   /* var payload = {
      "title" : title,
      "description" : description,
      "url" : url,
      "tag1" : tag1,
      "tag2" : tag2,
      "tag3" : tag3,
      "tag4" : tag4,
      "star" : star
    };*/
    var payload = 'title=' + title + '&url=' + url + '&tag1=' + tag1  + '&tag2=' + tag2  + '&tag3=' + tag3  + '&tag4=' + tag4  + '&description=' + description  + '&star=' + star;

    console.log(payload);
    makeRequest("POST","/api/bookmarks/insert",populateList, payload);
  }

  //Call Back Functions
  function deleteCard(data){
    console.log(data);
    var card = document.getElementById(data.bookmark);
    console.log(card);
    card.parentNode.removeChild(card);
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
    var tags = [];
    for(var i = 0, len = bookmarkCard.children[3].children.length; i < len; i++){
      tags.push(bookmarkCard.children[3].children[i]);
    }
    return {
      "title" : bookmarkCard.children[0].innerHTML,
      "description" : bookmarkCard.children[1].innerHTML,
      "url" : bookmarkCard.children[2].getAttribute("href"),
      "tag1" : tags[0].innerHTML,
      "tag2" : tags[1].innerHTML,
      "tag3" : tags[2].innerHTML,
      "tag4" : tags[3].innerHTML
    };

  }
