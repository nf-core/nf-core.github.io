/*
 * Custom JavaScript for nf-core.github.io
*/

$(function() {
    // Table of contents styling
    if ( $("#markdown-toc").length ) {
        $(".main-content").addClass('has-toc');
        // Fix the nav position when we scroll
        $(window).scroll(function () {
            if ($(window).scrollTop() >= $('.site-logo').innerHeight() + $('.page-header').innerHeight()) {
                $('#markdown-toc').addClass('fixed');
            } else {
                $('#markdown-toc').removeClass('fixed');
            }
        });
    }
});
