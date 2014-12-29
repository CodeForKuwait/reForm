/*global $, console */

$.ajax({
    url: "img",
    success: function (data) {
        "use strict";
        
        var images = $(data).find("a:contains(.png)");
        images.each(function () {
            
            var $imageAnchor = $(this),
                imageLink = $imageAnchor.attr("href"),
                $image = $("<img>").attr('src', imageLink),
                $caption = $("<p></p>").text(imageLink),
                $li = $("<li></li>");
            
            $imageAnchor.text("");
            $imageAnchor.append($image).append($caption);
            $li.append($imageAnchor);
            $("#gallery").append($li);
        });
    }
});
