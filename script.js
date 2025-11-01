// Get the current day of the month (1-30)
// If the day is 31, we'll show day 30 since we only have 30 drawings
function getDayNumber() {
    const today = new Date();
    const dayOfMonth = today.getDate();
    
    // Return day number 1-30 (cap at 30 if day is 31)
    return Math.min(dayOfMonth, 30);
}

function getImagePath(day) {
    // Images should be named: day-01.jpg, day-02.jpg, ..., day-30.jpg
    const dayPadded = String(day).padStart(2, '0');
    return `images/day${dayPadded}.jpeg`;
}

function loadDrawing(day) {
    const img = document.getElementById('dailyDrawing');
    const loading = document.getElementById('loading');
    const dayNumber = document.getElementById('currentDay');
    
    // Ensure day is between 1 and 30
    day = Math.max(1, Math.min(30, day));
    
    dayNumber.textContent = day;
    
    // Show loading
    loading.style.display = 'block';
    img.style.display = 'none';
    
    const imagePath = getImagePath(day);
    img.src = imagePath;
    
    img.onload = function() {
        loading.style.display = 'none';
        img.style.display = 'block';
    };
    
    img.onerror = function() {
        loading.textContent = 'Image not found';
        loading.style.display = 'block';
        img.style.display = 'none';
    };
    
    // Update navigation buttons
    updateNavigation(day);
}

function updateNavigation(day) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const todayBtn = document.getElementById('todayBtn');
    
    prevBtn.disabled = (day === 1);
    nextBtn.disabled = (day === 30);
    
    // Check if current day matches today
    const todayDay = getDayNumber();
    todayBtn.style.opacity = (day === todayDay) ? '0.5' : '1';
    todayBtn.disabled = (day === todayDay);
}

// Check for day parameter in URL (from gallery click)
const urlParams = new URLSearchParams(window.location.search);
const dayParam = urlParams.get('day');

// Initialize with today's drawing or URL parameter
let currentDay = dayParam ? parseInt(dayParam) : getDayNumber();

// Ensure day is valid (1-30)
currentDay = Math.max(1, Math.min(30, currentDay));

// Load today's drawing on page load
loadDrawing(currentDay);

// Navigation event listeners
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentDay > 1) {
        currentDay--;
        loadDrawing(currentDay);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentDay < 30) {
        currentDay++;
        loadDrawing(currentDay);
    }
});

document.getElementById('todayBtn').addEventListener('click', () => {
    currentDay = getDayNumber();
    loadDrawing(currentDay);
});
