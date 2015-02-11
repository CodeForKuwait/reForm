/*global $, console */

//Problem: User when clicking on image, goes to a dead end
//Solution: Create an overlay with the large image - Lightbox

var CANVAS_WIDTH = 2480;
var CANVAS_HEIGHT = 3508;
var CANVAS_LINE_WIDTH = 5;

var $overlay = $('<div id="overlay"></div>');
//var $image = $("<img>");
var $canvas = $('<canvas id="formCanvas" width="' + CANVAS_WIDTH + '" height="' + CANVAS_HEIGHT + '"></canvas>');
var $caption = $("<p></p>");
var $closeButton = $('<a href="#" id="close" class="myButton">close</a>');
var $saveButton = $('<a href="#" id="save" class="myButton">save</a>');

var ctx = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
var canvasScaleWidth;
var canvasScaleHeight;

var canvasRescale = function(){
  canvasScaleWidth = CANVAS_WIDTH/$canvas.width();
  canvasScaleHeight = CANVAS_HEIGHT/$canvas.height();
  
  console.log(canvasScaleHeight, canvasScaleWidth);
}

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
    var image = new Image();
    image.addEventListener("load", function() {
      //Draw the image on the canvas
      ctx.drawImage(image, 0, 0);
    }, false);//end addEventListener
    image.src = imageLocation;
    
    //Set caption
    $caption.text(captionText);
    
  
    //Show the overlay
    $overlay.show();
  
    canvasRescale();
});

//Rescale the canvas coordinates if the window is resized
$(window).resize(canvasRescale);//end resize

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
      ctx.save();
      ctx.scale(canvasScaleWidth, canvasScaleHeight)
      ctx.beginPath();
      ctx.moveTo(lastEvent.offsetX, lastEvent.offsetY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.lineWidth = CANVAS_LINE_WIDTH/canvasScaleWidth;
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.restore();
      lastEvent = e;
    }
}).mouseup(function () {
    "use strict";
    mouseDown = false;
}).mouseleave(function () {
    $canvas.mouseup();
});