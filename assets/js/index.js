$(function() {

'use strict';

var ajaxData;
var ajaxData2;
var filmPlot;
var movieInput;
var orderedPlot =[];
var subStringArray;
var gifArray =[];
var plotArray;
//var temp;

$("#go").on("click", function(){

  $("CARO").removeClass("off");
  movieInput = $("#movieInput").val();
  // console.log("pass: " + movieInput);

  $.getJSON("http://www.omdbapi.com/?t=" + movieInput).done( function(movieData){

    filmPlot = movieData.Plot;
    console.log(filmPlot);
    $("#plotContainer").text(filmPlot);

    parsePlot(filmPlot);

  });//end json call to omdb

//get the title info.
  $.ajax({
    dataType: 'json',
    url: 'https://api.popkey.co/v2/media/search?q=' + movieInput ,
    method: 'GET',
    beforeSend: function (xhr) {
    var base64Credentials = "ZGVtbzplYTdiNjZmYjVlNjZjNjJkNmNmYTQ5ZmJlMGYyN2UwMDJjMjUxNGVlZDljNzVlYTlmNjVlOWQ3NTk4Y2I5YTkw";
    xhr.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
  }

}).done(function(data1){
    ajaxData = data1;

    //sets up the title slide
    $("#titleSlide").attr('src', ajaxData[0].source.url);
    $("#titleCaption").text(movieInput);

    console.log(orderedPlot);


    for(var k=0 ;k < 10;k++)//thid should get gifs and add them to the carosel.
    {


              $.ajax({
                dataType: 'json',
                url: 'https://api.popkey.co/v2/media/search?q=' + orderedPlot[k] ,
                method: 'GET',
                beforeSend: function (xhr) {
                var base64Credentials =   "ZGVtbzplYTdiNjZmYjVlNjZjNjJkNmNmYTQ5ZmJlMGYyN2UwMDJjMjUxNGVlZDljNzVlYTlmNjVlOWQ3NTk4 Y2I5YTkw";
                xhr.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
              }

            }).done(function(data2){
                ajaxData2 = data2;

                if(ajaxData2[0] != undefined)
                {
                  gifArray.push(ajaxData2[0].source.url);
                  console.log("gifArray is: " + gifArray[gifArray.length-1]);//these are also gifs?!
                  //console.log(ajaxData2[0].source.url);//this is a url for a gif.

                  $(".carousel-inner").append("<div class='item'><img src= '" + gifArray[k] + "' alt='" + gifArray[k] + "'><div class='carousel-caption'>" + orderedPlot[k] + "</div></div>");

                  return ajaxData2[0].source.url;
                }//end if

              });//end ajax call for ordered array loop

        //console.log(getGifs(orderedPlot[k]));

    }//end append for loop.

});//end ajax call for initial Moviestuff


function getGifs(word)
{
  var myarray;
      //
      //   $.ajax({
      //     dataType: 'json',
      //     url: 'https://api.popkey.co/v2/media/search?q=' + word ,
      //     method: 'GET',
      //     beforeSend: function (xhr) {
      //     var base64Credentials =   "ZGVtbzplYTdiNjZmYjVlNjZjNjJkNmNmYTQ5ZmJlMGYyN2UwMDJjMjUxNGVlZDljNzVlYTlmNjVlOWQ3NTk4 Y2I5YTkw";
      //     xhr.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
      //   }
      //
      // }).done(function(data2){
      //     ajaxData2 = data2;
      //
      //     if(ajaxData2[0] != undefined)
      //     {
      //       gifArray.push(ajaxData2[0].source.url);
      //       console.log("gifArray is: " + gifArray[gifArray.length-1]);//these are also gifs?!
      //       //console.log(ajaxData2[0].source.url);//this is a url for a gif.
      //       return ajaxData2[0].source.url;
      //     }
      //
      //
      //   });//end ajax call for ordered array loop
}//end getgifs

function parsePlot(plot)
{
  plotArray = plot.split(" ");
  console.log(plotArray);

  orderedPlot = plotArray.sort(function(a, b){
    return b.length - a.length; // ASC -> a - b; DESC -> b - a
  });//this should return an array sorted by length of string.
  //also I got this sort function from: http://stackoverflow.com/questions/10630766/sort-an-array-based-on-the-length-of-each-element
  //console.log(orderedPlot);

}//end parsePlot

});//end go click

$('.carousel').carousel({
  interval: 3000
})

});//end top function/file
