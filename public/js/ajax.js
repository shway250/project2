$(document).ready(function() {
 
  $('.deleteLink').on('click', function(e){
    e.preventDefault();

    var searchLink = $(this);
    var searchURL = searchLink.attr('href');
    ///////console.log("GOT AT LEAST HERE!!!");

    $.ajax({
      method: 'DELETE',
      url:  searchURL
    }).done(function(data){
      console.log("DONE WITH CALLBACK")
      window.location = "/profile";
    });
  });

  $('.put-form').on('click', function(e){
    e.preventDefault();

    var updateSearch = $(this);
    var updateId = updateSearch.attr('id');
    console.log(updateId);
    var input = $(this).siblings();
  
    var inputData = input[0].value;
    var dataObj = {
      searchTerm: inputData
    };
    console.log(inputData);
    $.ajax({
      method: 'PUT',
      url: '/profile/form/' + inputData,
      data: dataObj //pass in data from post here
    }).done(function(data){
      window.location = "/profile";
    });
  });
});