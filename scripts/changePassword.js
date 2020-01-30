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

$("#changePassword").click(function(){
  //Read the local db data
  fs.readFile(file, function(err, data){
    if(err){
      console.log('Something went wrong, DB file missing');
    }else{
      //all is well"
      var oldPassword = $("#oldPassword").val();
      var newPassword = $("#newPassword").val();

              //check if the values are valid
              if(!checkValue(oldPassword) || !checkValue(newPassword)){
                bootbox.alert("Please enter valid values in all the fields");
                return;
            }

  //check password length
  if(newPassword.length<7){
    bootbox.alert("The password must be atleast 7 characters long.");
    return;
  }

  //validation to be put on password
  if(!/\d+/.test(newPassword)){
    bootbox.alert("Please ensure atleast one digit is entered in the password");
    return;
  }

      //reset the password     
      var mainObj = JSON.parse(data);

      //check if the old password matches
      if(mainObj.AdminDetails.password!==oldPassword){
        bootbox.alert("The old password is incorrect, please enter the correct old password");
        return;
      }

      //Change the password
      mainObj.AdminDetails.password = newPassword;

      //save the data
        var finalData = JSON.stringify(mainObj);
        fs.writeFile(file, finalData, function(err){
          if(err){
            console.log("err has occured");
          } else{
            bootbox.alert("Password Changed Successfully!",function(){
              location.replace("./adminDash.html");
            });
          }
          return;
        })
    }
  })
});