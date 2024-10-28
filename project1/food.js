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
    "xi_fan_btn": "xi-fan",
    "gua_bao_btn": "gua-bao"
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

//clear table - NEEDS EDITING SO IT TOGGLES VISIBILITY NOT DELETE
// clearTable.addEventListener('click', () => {
//     console.log("pass cleartable click)");
//     foodContainer.forEach((element) => {
//         console.log('pass hide element');
//         element.classList.add("hidden");
//     });
// });





