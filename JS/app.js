//The URIs of the REST endpoint
VUPS = "https://prod-00.eastus.logic.azure.com:443/workflows/90088bebf83b4920bd7208aee80f3c84/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JA_kY8fI50I9QkAMR8tdCyhz3M2OXezwfohwpADmtyU";
RAI = "https://prod-72.eastus.logic.azure.com:443/workflows/4983341193c546a1938fa6be1613e0d9/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=15LxYZ_-OdPvhagNcDLwKz4T5QbkXUt1FptJzGn40HI";

BLOB_ACCOUNT = "https://blobstoragecom769jr.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
  //Create a form data object
  submitData = new FormData();

  //Get form variables and apend them to the form data object
  submitData.append('Age', $('#Age').val());
  submitData.append('Genre', $('#Genre').val());
  submitData.append('Producer', $('#Producer').val());
  submitData.append('Publisher', $('#Publisher').val());  
  submitData.append('Rating', $('#Rating').val());
  submitData.append('Title', $('#Title').val());
  submitData.append('File', $('#UpFile')[0].files[0]);

  //Post the form data to the endpoint
  $.ajax({
    url: VUPS,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data){ alert("Video Successfully Uploaded!!") }
  })

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){

  //Replace the current HTML in div with a loading message
  $('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(RAI, function(data){

    //Create an array to hold all assets
    var items = [];

    //iterate through the returned records and build HTML
    $.each(data, function(key, val){
      items.push("<hr />");
      items.push("<video src='"+ BLOB_ACCOUNT + val["filePath"] +"' width='400' controls> </video> <br />");
      items.push( "Title : " + val["title"] + "<br />"); 
      items.push( "Genre : " + val["genre"] + "<br />");
      items.push("<hr />");
    })

    //Clear the asset list 
    $('#VideoList').empty();

    //Append the contents of the items array to the video list
    $('<ul/>', {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("#VideoList");
  });
}

