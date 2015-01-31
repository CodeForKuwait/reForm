/*global $, console */

$.ajax({
    url: "img",
    success: function (data) {
        "use strict";

        var images = $(data).find("a:contains(.png)");
        images.each(function () {

            var $imageAnchor = $(this),
                imageLink = "img/" + $imageAnchor.attr("href"),
                $image = $("<img>").attr('src', imageLink),
                $caption = $("<p></p>").text(imageLink),
                $li = $("<li></li>");

            $imageAnchor.text("");
            $imageAnchor.append($image).append($caption);
            $li.append($imageAnchor);
            $("#gallery").append($li);
            
            var $overlay = $('<div id="overlay"></div>'),
                $image = $("<img>");

            //Add an image to overlay
            $overlay.append($image);

            //Add overlay
            $("body").append($overlay);

            //Capture the click event on a link to an image
            $("#gallery a").click(function (event) {
                "use strict";

                event.preventDefault();

                var imageLocation = "img/" + $(this).attr("href");

                //Update overlay with the image from the link
                $image.attr("src", imageLocation);

                //Show the overlay
                $overlay.show();
            }); // end click

            //When overlay is clicked
            $overlay.click(function () {
                "use strict";
                //Hide the overlay
                $overlay.hide();
            }); //end click
            
        }); //end success 
    }
}); //end .ajax