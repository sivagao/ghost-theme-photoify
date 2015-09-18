/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });


        // Todo test post page
        function buildHtml() {
            $imagesWrap.find('img').each(function($img){
                $img = $(this); // add data-src to lazy load?!
                $img.wrap('<div class="grid-item"></div>');
            });
        }
        function initMasonry() {
            var containerW = $imagesWrap.width();
            console.log(containerW);
            var columnNum = 3;
            if(containerW < 640) {
                columnNum = 2;
            }
            if(containerW < 320) {
                columnNum = 1;
            }
            console.log(columnNum);
            $imagesWrap.find('.grid-item').css('width',
                Math.floor(100/columnNum) + '%'
            );
            // 3, 640 -> 2, 320 -> 1
            $imagesWrap.masonry({
                itemSelector: '.grid-item',
                // "gutter": 10,
                // percentPosition: true,
                columnWidth: containerW*Math.floor(100/columnNum)/100
            });
        }
        var $imagesWrap = $('.images-wrap');
        if ($imagesWrap.length) {
            // build html
            buildHtml();
            // init masonry
            initMasonry();
        }

    });


    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);
