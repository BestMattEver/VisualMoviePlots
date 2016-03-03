
var ajaxData;
var filmPlot;
var movieInput;
var orderedPlot;
var subStringArray;
//var gifArray;
var plotArray;
//var temp;

$("#go").on("click", function(){

  $("CARO").removeClass("off");
  movieInput = $("#movieInput").val();
  console.log("pass: " + movieInput);

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

    var gifArray = getGifs();

    console.log(orderedPlot);

    //sets up the title slide
    $("#titleSlide").attr('src', ajaxData[0].source.url);
    $("#titleCaption").text(movieInput);

    for(var k=0 ;k < 10;k++)
    {
        $(".carousel-inner").append("<div class='item'><img src='" + gifArray[k] + "'><div class='carousel-caption'>" + orderedPlot[k] + "</div></div>");
        // gifArray[k]
    }//end append for loop.


    //console.log(ajaxData);

  });//end ajax call for initial Moviestuff


function getGifs()
{
  var myarray;
  for(var i = 0;i < 10;i++)//gets 10 images, and sets up the strings for use
  {
        $.ajax({
          dataType: 'json',
          url: 'https://api.popkey.co/v2/media/search?q=' + orderedPlot[i] ,
          method: 'GET',
          beforeSend: function (xhr) {
          var base64Credentials =   "ZGVtbzplYTdiNjZmYjVlNjZjNjJkNmNmYTQ5ZmJlMGYyN2UwMDJjMjUxNGVlZDljNzVlYTlmNjVlOWQ3NTk4 Y2I5YTkw";
          xhr.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
        }

      }).done(function(data2){

          console.log(data2[0].source.url);
          // myarray.push(temp);
          
           //pushes the gif url into an array.
        });//end ajax call for ordered array loop
    }//end the gif for loop. gifs captured.
    return myArray;
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
  interval: 1500
})
