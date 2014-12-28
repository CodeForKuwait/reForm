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
                $li = $("<li></li>");
            
            $imageAnchor.text("");
            $imageAnchor.append($image).append("<p>hi</p>");
            $li.append($imageAnchor);
            $("#gallery").append($li);
        });
    }
});