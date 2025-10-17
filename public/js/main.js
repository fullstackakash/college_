// main.js
// Auto-populate gallery images and notices, and set notice animation speed dynamically.

// === CONFIG: Put your image filenames here (files in /images/) ===
const studentImages = [
  'student-life.jpg',   // primary student life image shown in banner area if exists
  'gallery1.jpg',
  'gallery2.jpg',
  'gallery3.jpg'
];

// Notices (you can edit these strings or load them from an API later)
const notices = [
  'Admissions open for 2026 — Apply before Nov 30, 2025',
  'Placement drive on Dec 10, 2025 — Registration required',
  'Inter-college fest: Call for volunteers',
  'New research lab inaugurated — Applications invited'
];

// Helper to safely create an image element
function createImg(src, alt = '') {
  const img = document.createElement('img');
  img.src = `images/${src}`;
  img.alt = alt || src;
  img.loading = 'lazy';
  img.onerror = () => {
    // If image missing, show a simple placeholder SVG data URL
    img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
         <rect width="100%" height="100%" fill="#d1fae5"/>
         <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#065f46" font-size="28">Image not found</text>
       </svg>`
    );
  };
  return img;
}

// Populate student-gallery area
function populateStudentGallery() {
  const gallery = document.getElementById('student-gallery');
  if (!gallery) return;

  studentImages.forEach((filename, idx) => {
    const img = createImg(filename, `Student life image ${idx+1}`);
    gallery.appendChild(img);
  });
}

// If a banner image exists in list, replace the banner image src
function setBannerImage() {
  const bannerImg = document.getElementById('banner-img');
  if (!bannerImg) return;
  if (studentImages.length > 0) {
    // prefer the first name (campus.jpg or student-life.jpg). If it's not present in array, keep current.
    const first = studentImages[0];
    if (first) bannerImg.src = `images/${first}`;
  }
}

// Populate notices and set animation duration based on text length
function populateNotices() {
  const track = document.getElementById('notice-track');
  if (!track) return;

  // create repeated notice items to make continuous flow
  // duplicate twice so animation never sees an empty gap
  const totalRepeats = 3;
  for (let r = 0; r < totalRepeats; r++) {
    notices.forEach(text => {
      const item = document.createElement('div');
      item.className = 'notice-item';
      item.textContent = text;
      track.appendChild(item);
    });
  }

  // set animation duration proportional to total content width
  // perform after layout so widths are available
  requestAnimationFrame(() => {
    const trackWidth = track.scrollWidth;
    // base speed: 100px per 8s -> duration = (trackWidth / 100) * 8
    const duration = Math.max(10, Math.round((trackWidth / 150) * 8)); // seconds, min 10s
    track.style.animationDuration = duration + 's';
    track.style.animationTimingFunction = 'linear';
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  populateStudentGallery();
  setBannerImage();
  populateNotices();
});

