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

$('#findAlumni').click(function(){
  var name = $('#studentName').val();
  var university = $('#university').val();
  fs.readFile(file, function(err, data){
    if(!err){
      var mainObj = JSON.parse(data);
      var alumniArr = mainObj.alumniDetails;
      var found = false;
      alumniArr.map(function(item, index){
         if(item.studentName===name && item.university===university){
          //render the details
          $('#studentName').val(item.studentName).attr('readonly',true);
          $('#university').val(item.university).attr('readonly',true);
          $('#batch').val(item.batch);
          $('#house').val(item.house);
          $('#email').val(item.email);
          $('#board').val(item.board);
          found = true;
         }
      });

               //data not found
               if(!found){
                $('#studentName').val('').removeAttr('readonly');
                $('#university').val('').removeAttr('readonly');
                $('#batch').val('');
                $('#house').val('');
                $('#email').val('');
                $('#board').val('');
                bootbox.alert("No record found with this name and university combination. Please try again");
                return;
               }
    }
  })
});

$('#modifyAlumni').click(function(){
  $('input').removeAttr('readonly');
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
      var alumniArr = mainObj.alumniDetails;

      alumniArr.map(function(item, index){
        if(item.studentName===studentName && item.university===university){
         item.batch = batch;
         item.house = house;
         item.board = board;
         item.email = email;
        }
     });

              //Finally store the data
              var finalData = JSON.stringify(mainObj);
              fs.writeFile(file, finalData, function(err){
                if(err){
                  console.log("err has occured");
                } else{
                  bootbox.alert("Alumni Details Modified Successfully!",function(){
                    location.replace("./adminDash.html");
                  });
                }
                return;
              })
    }
  })
});