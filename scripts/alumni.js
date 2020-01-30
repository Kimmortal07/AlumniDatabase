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
    var mainObj = JSON.parse(data);
    var data = '';
    if(checkObj(mainObj.alumniDetails)){
      mainObj.alumniDetails.map(function(item,index){
        data+='<div class="col-md-4 mt-4"> <div class="card profile-card-5"> <div class="card-img-block"> <img class="card-img-top" src="https://images.unsplash.com/photo-1517832207067-4db24a2ae47c" alt="Card image cap"> </div> <div class="card-body pt-0"> <h5 class="card-title studentName">'+item.studentName+'</h5> <p class="card-text university">'+item.university+'</p> <p class="card-text">'+item.batch+'</p> <a id="'+item.studentName+'#'+item.university+'" href="profile.html" class="btn btn-primary checkDetails">Check Details</a> </div> </div> </div>';
      })
    }

    $('.row').append(data);
    $('.checkDetails').click(function(){
      localStorage.setItem('alumniData',$(this).attr("id"));
    });
  }
})
