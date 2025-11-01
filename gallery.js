// Get the current day of the month (1-30)
function getDayNumber() {
    const today = new Date();
    const dayOfMonth = today.getDate();
    
    // Return day number 1-30 (cap at 30 if day is 31)
    return Math.min(dayOfMonth, 30);
}

function getImagePath(day) {
    const dayPadded = String(day).padStart(2, '0');
    return `images/day${dayPadded}.jpeg`;
}

function createGalleryItem(day, isAvailable) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    // Add hidden class for unavailable days
    if (!isAvailable) {
        item.classList.add('gallery-item-hidden');
    }
    
    const link = document.createElement('a');
    if (isAvailable) {
        link.href = `index.html?day=${day}`;
    } else {
        link.href = '#';
        link.addEventListener('click', (e) => e.preventDefault());
    }
    
    const img = document.createElement('img');
    img.src = getImagePath(day);
    img.alt = `Drawing Day ${day}`;
    img.loading = 'lazy';
    
    const label = document.createElement('div');
    label.className = 'gallery-label';
    label.textContent = `Day ${day}`;
    
    link.appendChild(img);
    link.appendChild(label);
    item.appendChild(link);
    
    return item;
}

function loadGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const currentDay = getDayNumber();
    
    // Create gallery items for all 30 days
    // Hide items for days that haven't occurred yet
    for (let day = 1; day <= 30; day++) {
        const isAvailable = day <= currentDay;
        const item = createGalleryItem(day, isAvailable);
        galleryGrid.appendChild(item);
    }
}

// Load gallery on page load
loadGallery();
