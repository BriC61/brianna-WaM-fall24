const menuButton = document.getElementById('menu-button');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const menuItems = document.getElementById('menu-items');
const clearTable = document.getElementById('clear-table');
const foodItem = document.getElementsByClassName('food-item')

console.log("loaded constants");

menuButton.addEventListener('click', function() {
    $('.modal').addClass('visible');
    $('.modal').removeClass('hidden');

});

menuItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('food-item')) {
        const imageName = e.target.getAttribute('data-image');
        let existingImg = e.target.querySelector('img');

        if(!existingImg){
            const imgElement = document.createElement('img');
            imgElement.src = `../assets/${imageName}`;
            imgElement.style.position = 'absolute'; 
            imgElement.style.top = Math.floor(Math.random() * 100) + 'vh'; 
            imgElement.style.left = Math.floor(Math.random() * 100) + 'vw';
            imgElement.style.width = '300px';
            imgElement.style.height = '300px';

            e.target.innerHTML = '';
            document.body.appendChild(imgElement);
        }
        
    }
});
closeModal.addEventListener('click', function() {
    $('.modal').removeClass('visible'); 
    $('.modal').addClass('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        $('.modal').removeClass('visible'); 
        $('.modal').addClass('hidden');
    }
});
console.log("menu");

// function onMouseDrag({movementX, movementY}) {
//     let getFoodItemStyle = window.getComputedStyle(foodItem);
//     let leftValue = parseInt(getFoodItemStyle .left);
//     let topValue = parseInt(getFoodItemStyle .top);
//     foodItem.style.left = `${leftValue + movementX}px`;
//     foodItem.style.top = `${topValue + movementY}px`;

// };
// foodItem.addEventListener("mousedown", function() {
//     foodItem.addEventListener("mousemove", onMouseDrag);
// });
// foodItem.addEventListener("mouseup", function() {
//     foodItem.removeEventListener("mousemove", onMouseDrag);
// });

console.log("draggable")

clearTable.addEventListener('click', () => {
    const allImages = document.querySelectorAll('body > img');
    allImages.forEach(img => img.remove());
});

console.log("ready");
