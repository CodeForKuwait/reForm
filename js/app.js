/*global $, console */

//Problem: User when clicking on image, goes to a dead end
//Solution: Create an overlay with the large image - Lightbox

var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");

//Add an image to overlay
$overlay.append($image);

//Add a caption to overlay
$overlay.append($caption);

//Add overlay
$("body").append($overlay);

//Capture the click event on a link to an image
$("#gallery a").click(function (event) {
    "use strict";
    
    event.preventDefault();
    
    var imageLocation = $(this).attr("href"),
        captionText = $(this).children("img").attr("alt");
    
    //Update overlay with the image from the link
    $image.attr("src", imageLocation);
    
    //Set caption
    $caption.text(captionText);
    
    //Show the overlay
    $overlay.show();
});

//When overlay is clicked
$overlay.click(function () {
    "use strict";
    //Hide the overlay
    $overlay.hide();
});