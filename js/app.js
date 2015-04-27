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
var $textInput = $('<input id="form-adder" type="text" autofocus>');

var $closeButton = $('<a href="#" id="close" class="myButton">close</a>');
var $saveButton = $('<a href="#" id="save" class="myButton">save</a>');

//var lastEvent;
//var mouseDown = false;
var textLocationX;
var textLocationY;

var ctx = $canvas[0].getContext("2d");
var canvasScaleWidth;
var canvasScaleHeight;

/**
 * Function to "Draw" text on form
 * Picks up form element id, returns drawing context of the canvas and fills the text
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text
 * 
 * Usage: drawText("Test", 10, 90)
 * 
 * Enable fonts by, for example, adding to function: ctx.font = "30px Verdana";
 * 
 * @param {Object} $textInput
 * @param {Object} textLocationX
 * @param {Object} textLocationY
 */

var drawText = function($textInput, textLocationX, textLocationY) 
{
	c = document.getElementById("formCanvas");
	var ctx = c.getContext("2d");
	ctx.fillText($textInput, textLocationX, textLocationY);
};


var canvasRescale = function () {
  "use strict";
  
  canvasScaleWidth = CANVAS_WIDTH / $canvas.width();
  canvasScaleHeight = CANVAS_HEIGHT / $canvas.height();
};

var setImageURL = function () {
  var dataURL = $canvas[0].toDataURL("image/jpeg", 0.1);
  $saveButton.attr("download", $caption.text() + ".jpeg");
  $saveButton.attr("href", dataURL);
};



//Add canvas to overlay
$overlay.append($canvas);

//Add text input
$overlay.append($textInput);

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
  image.addEventListener("load", function () {
    //Draw the image on the canvas
    ctx.drawImage(image, 0, 0);
    setImageURL();
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

$textInput.keypress(function (e) {
  "use strict";
  
  var key = e.which;
  
  //If the enter key is pressed
  if (key === 13) {
    
    //Add the text from the text box to the canvas
    ctx.save();
    ctx.scale(canvasScaleWidth, canvasScaleHeight);
    ctx.fillText($textInput.val(), textLocationX, textLocationY + $textInput.height() / 2);
    ctx.restore();
    
    //Update the image data URI
    setImageURL();
    
    //Reset and hide the text box
    $textInput.val('');
    $textInput.hide();
  }
});//end keypress

//When save button is clicked
$saveButton.click(function () {
  "use strict";
  
  //The image will be automatically downloaded
  //so just trigger the close button
  $closeButton.click();
});

//When close button is clicked
$closeButton.click(function () {
  "use strict";
  //Hide the overlay
  $overlay.hide();
});

//On click events on the canvas
$canvas.click(function (e) {
  "use strict";
  
  textLocationX = e.offsetX - $textInput.width() / 2;
  textLocationY = e.offsetY - $textInput.height() / 2;
  
  //Overlay the text input on the click location
  $textInput.show();
  $textInput.offset({"top": $canvas.offset().left + textLocationY,
                     "left": $canvas.offset().top + textLocationX});
  $textInput.val('').focus();
});