const fs = require("fs");
const path = require("path");
var $ = require("jquery");
var bootstrap = require('bootstrap');
var bootbox = require("bootbox");
const DatabaseName = "DB";
let pathName = path.join(__dirname, 'data');
let file = path.join(pathName, DatabaseName);

//utility function
function checkValue(value){
  if(value===undefined || value===null || value.trim()==="") return false;
  return true;
}

fs.readFile(file, function(err, data){
  if(err){
    //Register user
    bootbox.alert("No Admin User added, Please register.",function(){
      location.replace("./register.html");
    });
  }else{
    $('#loginButton').click(function(){
      var name = $("#name").val();
      var password = $("#password").val();
    
        //check if the values are valid
        if(!checkValue(name) || !checkValue(password)){
          bootbox.alert("Please enter valid values in all the fields");
          return;
      }
    
      //auth
      var mainObj = JSON.parse(data);
      var adminDetails = mainObj.AdminDetails;
      if(name===adminDetails.name && password===adminDetails.password){
        //go to dashboard
        location.replace("./adminDash.html");
      }else{
        bootbox.alert("Login Failed, please check the entered details");
        $('#name').val('');
        $('#password').val('');
        return;
      }
    });
  }
});

