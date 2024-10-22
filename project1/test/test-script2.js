/////
//WORKING draggable elements

//disable img drag
console.log("loaded constants");
var food_img = document.getElementsByClassName('food-img visible');
for(var i = 0; i< food_img.length; i++){
    food_img[i].ondragstart = function(){return false;}
}

//dragging code
let newX=0, newY=0, startX=0, startY=0;

const foodContainer = document.getElementById('food-container');

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
    console.log(document.getElementsByClassName(".memory"));
}


//////
//pre-place a single element (generate multpile instances of div container?), display = visible, 
//needs to be draggable, currently on hover it displays UNSTYLED text

