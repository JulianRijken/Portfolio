(function ($) {
    "use strict"; 

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#sideNav",
    });

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      }
})(jQuery); // End of use strict


(function () {
    var parallax = document.querySelectorAll("body"),
        speed = 0.5;

    // Create the overlay element
    var overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.zIndex = "-1";

    // Append the overlay to the body
    document.body.appendChild(overlay);

    // Function to handle scroll event
    function handleScroll() {
        [].slice.call(parallax).forEach(function (el, i) {
            var windowYOffset = window.pageYOffset,
                elBackgroundPos = "40% " + (windowYOffset * speed) + "px";

            el.style.backgroundPosition = elBackgroundPos;

            // Calculate background color based on scroll position
            var color = calculateBackgroundColor(windowYOffset);
            overlay.style.backgroundColor = color;
        });
    }

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Function to handle DOMContentLoaded event
    function handleDOMContentLoaded() {
        handleScroll(); // Call handleScroll initially on page load
    }

    // Attach DOMContentLoaded event listener
    document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

    function calculateBackgroundColor(scrollPos) {
        // Calculate the alpha channel based on scroll position
        var alpha = scrollPos / (document.documentElement.scrollHeight - window.innerHeight);

        // Return the RGBA value with increasing alpha channel
        return "rgba(255, 255, 255, " + mapValueInRange(alpha, 0, 1, 0.3, 0.1) + ")";
    }

    function mapValueInRange(value, inRangeMin, inRangeMax, outRangeMin, outRangeMax) {
        return (
            (value - inRangeMin) * (outRangeMax - outRangeMin) / (inRangeMax - inRangeMin) +
            outRangeMin
        );
    }
})();



function CopyText() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
}



$(document).ready(function () {
    // When the modal is hidden, pause the video and reset its time
    $('.modal').on('hidden.bs.modal', function () {
        var videos = $(this).find('video');
        videos.each(function () {
            this.pause();
            this.currentTime = 0; // Optional: Reset the video to the beginning
        });

        // Unload Sketchfab embeds
        $(this).find('.sketchfab-embed').each(function () {
            $(this).empty().hide(); // Remove the iframe and hide the container
        });

        // Unload YouTube embeds
        $(this).find('.youtube-embed').each(function () {
            $(this).empty().hide(); // Remove the iframe and hide the container
        });
    });

    // When the modal is shown, autoplay the video
    $('.modal').on('shown.bs.modal', function () {
        var videos = $(this).find('video');
        videos.each(function () {
            this.play();
        });

        // Load Sketchfab embeds
        $(this).find('.sketchfab-embed').each(function () {
            var sketchfabContainer = $(this);
            if (!sketchfabContainer.children('iframe').length) {
                var src = sketchfabContainer.data('sketchfab-src');
                sketchfabContainer.html(`
                    <iframe class="youtube" title="A 3D model" width="100%" height="480"
                        src="${src}"
                        frameborder="0" allow="autoplay; fullscreen; vr"
                        mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                `);
                sketchfabContainer.show();
            }
        });

        // Load YouTube embeds
        $(this).find('.youtube-embed').each(function () {
            var youtubeContainer = $(this);
            if (!youtubeContainer.children('iframe').length) {
                var src = youtubeContainer.data('youtube-src');
                youtubeContainer.html(`
            <iframe class="youtube" width="100%" height="100%"
                                    src="${src}"
                                    frameborder="0" allowfullscreen></iframe>`);
                youtubeContainer.show();
            }
        });

    });
});

//For Firefox we have to handle it in JavaScript 
var vids = $("video");
$.each(vids, function () {
    this.volume = 0.2;
});