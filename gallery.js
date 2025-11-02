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

function getPlaceholderPath() {
    return 'images/day00.jpeg';
}

function createGalleryItem(day) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    const link = document.createElement('a');
    link.href = `index.html?day=${day}`;
    
    const img = document.createElement('img');
    const currentDay = getDayNumber();
    
    // Use placeholder for future days to prevent spoilers
    if (day > currentDay) {
        img.src = getPlaceholderPath();
    } else {
        img.src = getImagePath(day);
        // Use placeholder if actual image fails to load
        img.onerror = function() {
            this.src = getPlaceholderPath();
            this.onerror = null; // Prevent infinite loop if placeholder also fails
        };
    }
    
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
    
    // Create gallery items for all 30 days
    // All days are visible, placeholder will be used if image doesn't exist
    for (let day = 1; day <= 30; day++) {
        const item = createGalleryItem(day);
        galleryGrid.appendChild(item);
    }
}

// Load gallery on page load
loadGallery();
