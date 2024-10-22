console.log("loaded script.js");

const aboutButton = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');
const closeAboutModal = document.getElementById('close-about-modal');

closeAboutModal.addEventListener('click', function() {
    $('.about-modal').removeClass('visible'); 
    $('.about-modal').addClass('hidden');
    console.log("close about modal");
});


window.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
        $('.about-modal').removeClass('visible'); 
        $('.about-modal').addClass('hidden');
        console.log("window close about modal");
    }
});



aboutButton.addEventListener('click', function() {
    $('.about-modal').removeClass('hidden');
    $('.about-modal').addClass('visible');
    console.log("open about button");
});

