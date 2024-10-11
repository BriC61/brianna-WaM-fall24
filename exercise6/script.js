console.log('dark mode');

$(document).ready(function(){
    $('.toggle').click(function(){
        $('.toggle').toggleClass('dark-toggle');
        $('p').toggleClass('dark-text');
        $('body').toggleClass('dark-bg');
    });
});