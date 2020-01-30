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

function checkObj(value){
  if(value===undefined || value===null) return false;
  return true;
}

$('#addAlumni').click(function(){
  var studentName = $("#studentName").val();
  var university = $("#university").val();
  var batch = $("#batch").val();
  var board = $("#board").val();
  var house = $('#house').val();
  var email = $('#email').val();

  if(!checkValue(studentName) || !checkValue(university) || !checkValue(batch) || !checkValue(board) || !checkValue(house) || !checkValue(email)){
    bootbox.alert("Please enter all the fields before saving.");
    return;
  }

  fs.readFile(file, function(err, data){
    if(!err){
      var mainObj = JSON.parse(data);
      var alumniObj = {};
      alumniObj['studentName'] = studentName;
      alumniObj['university'] = university;
      alumniObj['batch'] = batch;
      alumniObj['board'] = board;
      alumniObj['house'] = house;
      alumniObj['email'] = email;
      
      if(checkObj(mainObj.alumniDetails)){
        mainObj.alumniDetails.push(alumniObj);
      }else{
        mainObj['alumniDetails'] = [];
        mainObj.alumniDetails.push(alumniObj);
      }

              //Finally store the data
              var finalData = JSON.stringify(mainObj);
              fs.writeFile(file, finalData, function(err){
                if(err){
                  console.log("err has occured");
                } else{
                  bootbox.alert("Alumni Details Added Successfully!",function(){
                    location.replace("./adminDash.html");
                  });
                }
                return;
              })
    }
  })
})