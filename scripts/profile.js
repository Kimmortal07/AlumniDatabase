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

fs.readFile(file, function(err, data){
  if(!err){
    var localStorageData = localStorage.getItem("alumniData");
    var name = localStorageData.split("#")[0];
    var university = localStorageData.split("#")[1];

    var mainObj = JSON.parse(data);
    if(checkObj(mainObj.alumniDetails)){
      mainObj.alumniDetails.map(function(item,index){
        if(item.studentName===name && item.university === university){
          $("#name").text(item.studentName);
          $("#university").text(item.university);
          $("#board").text(item.board);
          $("#house").text(item.house);
          $("#email").text(item.email);
          $("#batch").text(item.batch);
        }
      })
    }
  }
})