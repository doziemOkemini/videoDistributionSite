//The URIs of the REST endpoint
UIA = "https://prod-09.eastus.logic.azure.com:443/workflows/3eb6645bcbd448bbb8864a9fb670e535/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZSo0wANFXwt73uwZbBiFU_5buqhJ4mTBx0LWlu87Wtw";
RAA = "https://prod-87.eastus.logic.azure.com:443/workflows/584085caf2e94c429d900d93a0fa6a33/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Oln3FSy-TQ3pzUWSqRA8uW1SoWu76C_J95MiOT7h-n4";

BLOB_ACCOUNT = "https://blobstoragecom769jr.blob.core.windows.net";


//Handlers for button clicks
$(document).ready(function() {
    //Handler for the new asset submission button
  $("#signupcomplete").click(function(){

    //Execute the submit new asset function
    console.log('Clicked')
    submitNewAsset();
    //window.location.href = "/consumer.html"
  }); 

  
  $("#loginCheck").click(function(){

    //Run the get asset list function
    loginAuth();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
    //Create a form data object
  submitUserData = new FormData();

  //Get form variables and apend them to the form data object
  submitUserData.append('UserName', $('#userName').val());
  submitUserData.append('Password', $('#Password').val());
  if ($('.chk').prop("checked")){
    submitUserData.append('isCreator', true);
  }else{
    submitUserData.append('isCreator', false);
  }

   //Post the form data to the endpoint
   $.ajax({
    url: UIA,
    data: submitUserData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data){ alert("Account Made!! Go to LOGIN Form") }
  })
}


//function to authenticate
function loginAuth(){
    let name = $('#loginUserName').val();
    let pass = $('#loginPassword').val();
    console.log(name, pass)
    $.getJSON(RAA, function(data){
        //console.log('Clicked')
        console.log(name, pass)
        $.each(data, function(key, val){
            console.log(val)
            if( val["userName"] === name && val["password"] === pass  && val["isCreator"] === "true" ){
                console.log('Clickedt')
                window.location.href = "/creator.html"
            }else if( val["userName"] === name && val["password"] === pass  && val["isCreator"] === "false" ){
                console.log('Clickedf')
                window.location.href = "/consumer.html"
            }
        });
    });
}