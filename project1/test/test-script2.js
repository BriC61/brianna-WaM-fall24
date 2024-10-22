const menuButton = document.getElementById('menu-button');
const menuModal = document.getElementById('menu-modal');
const closeMenuModal = document.getElementById('close-menu-modal');
const clearTable = document.getElementById('clear-table');

console.log("loaded constants");

menuButton.addEventListener('click', function() {
    $('.menu-modal').addClass('visible');
    $('.menu-modal').removeClass('hidden');

});
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


clearTable.addEventListener('click', () => {
    const allImages = document.querySelectorAll('body > img');
    allImages.forEach(img => img.remove());
});

console.log('working code ready');
/////
//WORKING draggable elements
let newX=0, newY=0, startX=0, startY=0;

//why doesn't querySelector work?
const foodContainer = document.getElementById('food-container');
// const foodContainer = document.querySelectorAll('.food-container');

foodContainer.addEventListener('mousedown', mouseDown)

function mouseDown(e){
    startX= e.clientX;
    startY= e.clientY;

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)

}

function mouseMove(e){
    newX = startX - e.clientX;
    newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    foodContainer.style.top = (foodContainer.offsetTop - newY) + 'px';
    foodContainer.style.left = (foodContainer.offsetLeft - newX) + 'px';

    console.log({newX, newY});
    console.log({startX, startY});
}

function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove)

}

//////

foodContainer.addEventListener('click', toggle)
function toggle(e){
    $('.food-img').toggleClass('hidden');
    $('.memory').toggleClass('visible');
}


//////
//pre-place a single element (generate multpile instances of div container?), display = visible, 
//needs to be draggable, currently on hover it displays UNSTYLED text
const menuContent = document.getElementById('menu-content');

menuContent.addEventListener('click', (e) =>{
    if (e.target.classList.contains('food-item' && 'xi-fan')) {
        $('.xi-fan').css('display','visible');

    }
});