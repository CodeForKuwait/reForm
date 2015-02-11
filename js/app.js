/*global $, console */

//Problem: User when clicking on image, goes to a dead end
//Solution: Create an overlay with the large image - Lightbox

var $overlay = $('<div id="overlay"></div>');
//var $image = $("<img>");
var $canvas = $('<canvas id="formCanvas" width="2480" height="3508"></canvas>')
var $caption = $("<p></p>");
var $closeButton = $('<a href="#" id="close" class="myButton">close</a>')
var $saveButton = $('<a href="#" id="save" class="myButton">save</a>')

var ctx = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;


////Add an hidden image to overlay
//$overlay.append($image);

//Add canvas to overlay
$overlay.append($canvas);

//Add a caption to overlay
$overlay.append($caption);

//Add close button to overlay
$overlay.append($closeButton);

//Add save button to overlay
$overlay.append($saveButton);

//Add overlay
$("body").append($overlay);

//Capture the click event on a link to an image
$("#gallery a").click(function (event) {
    "use strict";
    
    event.preventDefault();
    
    var imageLocation = $(this).attr("href"),
        captionText = $(this).children("img").attr("alt");
    
    //Update overlay with the image from the link
//    $image.attr("src", imageLocation);
    var image = new Image();
    image.src = imageLocation;
    
    //Set caption
    $caption.text(captionText);
    
    //Draw the image on the canvas
    ctx.drawImage(image, 0, 0);
  
    //Show the overlay
    $overlay.show();
});

//When close button is clicked
$closeButton.click(function () {
    "use strict";
    //Hide the overlay
    $overlay.hide();
});

//On mouse events on the canvas
$canvas.mousedown(function (e) {
    "use strict";
    lastEvent = e;
    mouseDown = true;
}).mousemove(function (e) {
    "use strict";
    //draw lines
    if (mouseDown) {
        ctx.beginPath();
        ctx.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = "black";
        ctx.stroke();
        lastEvent = e;
    }
}).mouseup(function () {
    "use strict";
    mouseDown = false;
}).mouseleave(function () {
    $canvas.mouseup();
});