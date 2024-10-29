//TABLE OF CONTENTS
//7. ABOUT MODAL
//35. AUDIO
//57. FOOD


//ABOUT MODAL
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

//AUDIO
console.log("loaded audio.js");

const audioSrc = document.getElementById('audio-src');
const audioBtn = document.getElementById('audio-btn');
let isPlaying = false;

function togglePlayPause(){
    if (isPlaying == false){
        isPlaying = true;
        audioSrc.play();
        audioBtn.innerText = 'Pause';
        
    } else if (isPlaying == true) {
        audioSrc.pause();
        audioBtn.innerText = 'Play';
        isPlaying = false;
    }
}
audioBtn.addEventListener('click', togglePlayPause);
console.log(isPlaying);

//FOOD
//open menu, generate image from menu, clear images
const menuButton = document.getElementById('menu-button');
const menuModal = document.getElementById('menu-modal');
const closeMenuModal = document.getElementById('close-menu-modal');
const menuContainer = document.getElementById('menu-container');
const clearTable = document.getElementById('clear-table');
const menuItems = document.getElementsByClassName('menu-items')

//open menu
menuButton.addEventListener('click', function() {
    $('.menu-modal').addClass('visible');
    $('.menu-modal').removeClass('hidden');

});

//click menu to open images
const foodBtns = {
    "gua_bao_btn":"gua-bao",
    "chow_mein_sandwich_btn":"chow-mein-sandwich",

    "xi_fan_btn":"xi-fan",
    "yangzhou_fried_rice_btn":"yangzhou-fried-rice",

    "beef_chow_fun_btn":"beef-chow-fun",
    "chow_mein_btn":"chow-mein",

    "wings_btn":"wings",
    "egg_rolls_btn":"egg-rolls",
    "siu_mai_btn":"siu-mai",
    "lobster_cantonese_btn":"lobster-cantonese",
    "sweet_and_sour_pork_btn":"sweet-and-sour-pork",

    "broccoli_with_garlic_btn":"broccoli-with-garlic"
    

}

//testing if mapping works
// const testId = "xi_fan_btn";
// const mappedId = foodBtns[testId];

// console.log("mapped id = ");
// console.log(mappedId);


//open images when clicking on menu
Object.keys(foodBtns).forEach(buttonId =>{
    const button = document.getElementById(buttonId);
    const foodContainerId = foodBtns[buttonId];
    const foodContainerDiv = document.getElementById(foodContainerId);
    // console.log(button);
    // console.log(foodContainerId);
    // console.log(foodContainerDiv);

    button.addEventListener('click', () =>{
        foodContainerDiv.classList.remove("hidden");
        foodContainerDiv.style.top = Math.floor(Math.random() * 50) + 'vh'; 
        foodContainerDiv.style.left = Math.floor(Math.random() * 50) + 'vw'; 
    })
});

//Close Menu
closeMenuModal.addEventListener('click', function() {
    $('.menu-modal').removeClass('visible'); 
    $('.menu-modal').addClass('hidden');
   

});
window.addEventListener('click', (e) => {
    if (e.target === menuModal) {
        $('.menu-modal').removeClass('visible'); 
        $('.menu-modal').addClass('hidden');
      
    }
});

//disable img drag
const foodImg = document.getElementsByClassName('food-img');

for(var i = 0; i< foodImg.length; i++){
    foodImg[i].ondragstart = function(){return false;}
}

//dragging function - DOESN'T WORK
// let newX=0, newY=0, startX=0, startY=0;

// for(var i; i< foodContainer.length; i++ ){
//     console.log(foodContainer);
//     foodContainer.addEventListener('mousedown', mouseDown);
// }

// function mouseDown(e){
    
//     startX= e.clientX;
//     startY= e.clientY;

//     document.addEventListener('mousemove', mouseMove)
//     document.addEventListener('mouseup', mouseUp)

// }

// function mouseMove(e){
//     console.log("mouse move");
//     newX = startX - e.clientX;
//     newY = startY - e.clientY;

//     startX = e.clientX;
//     startY = e.clientY;

//     foodContainer.style.top = (foodContainer.offsetTop - newY) + 'px';
//     foodContainer.style.left = (foodContainer.offsetLeft - newX) + 'px';

//     console.log({newX, newY});
//     console.log({startX, startY});
// }

// function mouseUp(e){
//     console.log("mouse up");
//     document.removeEventListener('mousemove', mouseMove)

// }

// clear table - NEEDS EDITING SO IT TOGGLES VISIBILITY NOT DELETE
// clearTable.addEventListener('click', () => {
//     console.log("pass cleartable click)");
//     foodContainer.forEach((element) => {
//         console.log('pass hide element');
//         element.classList.add("hidden");
//     });
// });





