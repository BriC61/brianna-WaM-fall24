// Get DOM elements
const menuButton = document.getElementById('menuButton');
const menuModal = document.getElementById('menuModal');
const closeModal = document.getElementById('closeModal');
const menuItems = document.getElementById('menuItems');
const selectedItems = document.getElementById('selectedItems'); // Section where images will be shown outside the modal
const deleteAllButton = document.getElementById('deleteAllButton');

// Function to open modal
menuButton.addEventListener('click', () => {
    menuModal.style.display = 'flex';
});

// Function to close modal
closeModal.addEventListener('click', () => {
    menuModal.style.display = 'none';
});

// Function to add food item to selected items list in the background
menuItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('food-item')) {
        const imageName = e.target.getAttribute('data-image'); // Get image name from data attribute
        const imgElement = document.createElement('img');
        
        // Set the source to the corresponding image in the assets folder using template literals (backticks)
        imgElement.src = `../assets/${imageName}`; // Correct use of backticks for imageName interpolation
        
        // Append the image to the body (in the background, outside modal)
        document.body.appendChild(imgElement);

        // Optional: Add styles for positioning images in the background
        imgElement.style.position = 'absolute'; // Example: Place images dynamically
        imgElement.style.top = Math.floor(Math.random() * 500) + 'px'; // Random top position
        imgElement.style.left = Math.floor(Math.random() * 500) + 'px'; // Random left position
        imgElement.style.width = '100px';
        imgElement.style.height = '100px';



        // const imageName = e.target.getAttribute('data-image');
        // let existingImg = e.target.querySelector('img');
        // const imageNameWithoutExtension = imageName.split('.').slice(0, -1);
        // console.log(this);

        // if(!existingImg){
        //     const imgElement = document.createElement('img');
        //     // const txtElement = 
        //     imgElement.src = `../assets/${imageName}`;
        //     imgElement.className = `${imageNameWithoutExtension}`;
        //     imgElement.style.position = 'absolute'; 
        //     imgElement.style.top = Math.floor(Math.random() * 100) + 'vh'; 
        //     imgElement.style.left = Math.floor(Math.random() * 100) + 'vw';
        //     imgElement.style.width = '300px';
        //     imgElement.style.height = '300px';
        //     imgElement.style.objectFit = 'contain';

        //     document.body.appendChild(imgElement);
        // }
        
    }
});

// Function to delete all food items in the background
deleteAllButton.addEventListener('click', () => {
    const allImages = document.querySelectorAll('body > img'); // Select all food images
    allImages.forEach(img => img.remove()); // Remove all images
});

// Optional: Close modal when clicking outside the content area
window.addEventListener('click', (e) => {
    if (e.target === menuModal) {
        menuModal.style.display = 'none';
    }
});
