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

function getPlaceholderPath() {
    return 'images/day00.jpeg';
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
    
    // Remove previous error handlers
    img.onerror = null;
    img.onload = null;
    
    // Set up error handler to fallback to placeholder
    img.onerror = function() {
        // Try placeholder image
        const placeholderPath = getPlaceholderPath();
        this.src = placeholderPath;
        
        // Set up new error handler (if placeholder also fails, show loading)
        this.onerror = function() {
            loading.textContent = 'Image not found';
            loading.style.display = 'block';
            this.style.display = 'none';
        };
        
        // If placeholder loads successfully
        this.onload = function() {
            loading.style.display = 'none';
            this.style.display = 'block';
        };
    };
    
    // Set up success handler
    img.onload = function() {
        loading.style.display = 'none';
        this.style.display = 'block';
    };
    
    // Load the image
    img.src = imagePath;
    
    // Update navigation buttons
    updateNavigation(day);
}

function updateNavigation(day) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const todayBtn = document.getElementById('todayBtn');
    
    const todayDay = getDayNumber();
    
    prevBtn.disabled = (day === 1);
    // Disable Next button if viewing today's drawing or if day is 30
    nextBtn.disabled = (day === todayDay || day === 30);
    
    // Check if current day matches today
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
    const todayDay = getDayNumber();
    if (currentDay < 30 && currentDay < todayDay) {
        currentDay++;
        loadDrawing(currentDay);
    }
});

document.getElementById('todayBtn').addEventListener('click', () => {
    currentDay = getDayNumber();
    loadDrawing(currentDay);
});
