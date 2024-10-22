//open menu, generate image from menu, clear images
console.log("loaded food.js");

const menuButton = document.getElementById('menu-button');
const menuModal = document.getElementById('menu-modal');
const closeMenuModal = document.getElementById('close-menu-modal');
const menuItems = document.getElementById('menu-items');
const clearTable = document.getElementById('clear-table');
const foodItem = document.getElementsByClassName('food-item');

console.log("loaded constants");

menuButton.addEventListener('click', function() {
    $('.menu-modal').addClass('visible');
    $('.menu-modal').removeClass('hidden');

});

menuItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('food-item')) {
        const imageName = e.target.getAttribute('data-image');
        let existingImg = e.target.querySelector('img');
        const imageNameWithoutExtension = imageName.split('.').slice(0, -1);

        if(!existingImg){
            const imgElement = document.createElement('img');
            // const txtElement = 
            imgElement.src = `../assets/${imageName}`;
            imgElement.className = `${imageNameWithoutExtension}`;
            imgElement.style.position = 'absolute'; 
            imgElement.style.top = Math.floor(Math.random() * 100) + 'vh'; 
            imgElement.style.left = Math.floor(Math.random() * 100) + 'vw';
            imgElement.style.width = '300px';
            imgElement.style.height = '300px';
            imgElement.style.objectFit = 'contain';

            document.body.appendChild(imgElement);
        }
        
    }
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
console.log("menu");

clearTable.addEventListener('click', () => {
    const allImages = document.querySelectorAll('body > img');
    allImages.forEach(img => img.remove());
});

console.log("ready");

// on click, create an innerhtml overlay with text, on second click delete it?



