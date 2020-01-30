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

$('#register').click(function(){
  var name = $("#name").val();
  var password = $("#password").val();
  
  //check if the values are valid
  if(!checkValue(name) || !checkValue(password)){
     bootbox.alert("Please enter valid values in all the fields");
     return;
  }

  //check password length
  if(password.length<7){
    bootbox.alert("The password must be atleast 7 characters long.");
    return;
  }

  //validation to be put on password
  if(!/\d+/.test(password)){
    bootbox.alert("Please ensure atleast one digit is entered in the password");
    return;
  }

  var mainObj = {};
  var adminObj = {};
  adminObj['name'] = name;
  adminObj['password'] = password;
  mainObj['AdminDetails'] = adminObj;
        //Finally store the data
        var finalData = JSON.stringify(mainObj);
        fs.writeFile(file, finalData, function(err){
          if(err){
            console.log("err has occured");
          } else{
            bootbox.alert("Data Saved Successfully!",function(){
              location.replace("./admin.html");
            });
          }
          return;
        })
});

