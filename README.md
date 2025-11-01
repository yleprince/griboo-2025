# Daily Drawings - 30 Day Showcase

A static website that displays a new drawing each day for 30 days, with the ability to view previous drawings.

## Features

- **Daily Drawing Display**: Shows the drawing for the current day of the month (1-30)
- **Navigation**: Browse previous and next drawings
- **Gallery View**: See all 30 drawings in a grid layout
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth transitions

## Setup Instructions

### 1. Prepare Your Images

Create a folder named `images` in the root directory and add your drawings:

```
images/
  day-01.jpg
  day-02.jpg
  day-03.jpg
  ...
  day-30.jpg
```

**Image Requirements:**
- Format: JPG (or you can modify to use PNG - update the extensions in `script.js` and `gallery.js`)
- Naming: Must be named exactly as `day-XX.jpg` where XX is 01-30 (with zero padding)
- Recommended size: Square images (e.g., 1000x1000px) work best for the display

### 2. Serve the Website

Since this is a static website, you can:

**Option A: Simple HTTP Server (Python)**
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option B: Node.js HTTP Server**
```bash
npx http-server
```

**Option C: Deploy to GitHub Pages, Netlify, Vercel, etc.**
Just upload all the files and configure the static site hosting.

## File Structure

```
griboo/
├── index.html          # Main page with daily drawing
├── gallery.html        # Gallery view of all drawings
├── script.js           # Main JavaScript logic
├── gallery.js          # Gallery JavaScript logic
├── styles.css          # All styling
├── images/             # Your drawing images (create this folder)
│   ├── day-01.jpg
│   ├── day-02.jpg
│   └── ...
└── README.md           # This file
```

## How It Works

- The website displays the drawing corresponding to the current day of the month (1-30)
- If today is the 1st, it shows day-01.jpg; if it's the 15th, it shows day-15.jpg, etc.
- Days 31 (if applicable) will show day 30 since we only have 30 drawings
- Each day corresponds to a specific image file
- Users can navigate between days using the Previous/Next buttons
- The "Today" button takes you back to the current day's drawing
- The gallery page shows all 30 drawings in a grid layout
- Clicking a drawing in the gallery takes you to that specific day

## Customization

- **Colors**: Edit the gradient colors in `styles.css` (search for `#667eea` and `#764ba2`)
- **Total Days**: Currently set to 30 days. To change, update all instances of `30` in the JavaScript files
- **Image Format**: Change `.jpg` to `.png` or other formats in `script.js` and `gallery.js`

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).
