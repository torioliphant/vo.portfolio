document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('hero-track');
  if (!track) return;
  
  // IMPORTANT: Only select direct children of hero-track
  const images = Array.from(track.querySelectorAll(':scope > img')).slice(0, 3);
  
  // Shuffle images using Fisher-Yates
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  shuffle(images);
  
  // Clear track completely
  track.innerHTML = '';
  
  // Append shuffled images + duplicates for smooth loop
  images.forEach(img => track.appendChild(img));
  images.forEach(img => track.appendChild(img.cloneNode(true)));
});

// New menu slider with navigation buttons
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.menu-slider');
  const track = document.querySelector('.menu-track');
  
  if (!slider || !track) return;
  
  let currentSlide = 0;
  const slides = track.querySelectorAll('.slide-link');
  const totalSlides = slides.length;
  
  function updateSlidePosition() {
  // Calculate the exact width needed to move one full slide
  const slideLink = slides[0];
  const slideWidth = slideLink.offsetWidth;
  
  // Get all buttons to calculate their total width
  const buttons = track.querySelectorAll('.nav-button');
  let buttonsTotalWidth = 0;
  buttons.forEach(btn => {
    buttonsTotalWidth += btn.offsetWidth;
  });
  
  // Each slide unit = one image + the buttons after it (until next image)
  // Slide 1 has 1 button after (>)
  // Slide 2 has 2 buttons around it (<>)
  // Slide 3 has 1 button before (<)
  
  let offset = 0;
  if (currentSlide === 1) {
    // Move past first image + first button
    offset = slideWidth + buttons[0].offsetWidth;
  } else if (currentSlide === 2) {
    // Move past first image + button + second image + button
    offset = (slideWidth * 2) + buttons[0].offsetWidth + buttons[1].offsetWidth + buttons[2].offsetWidth;
  }
  
  track.style.transform = `translateX(-${offset}px)`;
}

// Navigation button clicks
track.querySelectorAll('.nav-button').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const direction = button.dataset.direction;
    
    if (direction === 'next' && currentSlide < totalSlides - 1) {
      currentSlide++;
    } else if (direction === 'prev' && currentSlide > 0) {
      currentSlide--;
    }
    
    updateSlidePosition();
    updateButtonVisibility(); // ADD THIS LINE - was missing!
  });
});

function updateButtonVisibility() {
  const buttons = Array.from(track.querySelectorAll('.nav-button'));
  
  // Hide all buttons first
  buttons.forEach(btn => btn.classList.remove('visible'));
  
  // Show only the appropriate buttons based on current slide
  if (currentSlide === 0) {
    if (buttons[0]) buttons[0].classList.add('visible');
  } else if (currentSlide === 1) {
    if (buttons[1]) buttons[1].classList.add('visible');
    if (buttons[2]) buttons[2].classList.add('visible');
  } else if (currentSlide === 2) {
    if (buttons[3]) buttons[3].classList.add('visible');
  }
}

// Initialize position
updateSlidePosition();
updateButtonVisibility(); // This line must be there

// Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0 && currentSlide < totalSlides - 1) {
      currentSlide++;
    } else if (diff < 0 && currentSlide > 0) {
      currentSlide--;
    }
    updateSlidePosition();
    updateButtonVisibility(); // ADD THIS LINE TOO!
  }
}
  
  // Initialize position
  updateSlidePosition();

});
// Sidebar hover highlight effect with color changes
document.addEventListener('DOMContentLoaded', () => {
  const sidebarContent = document.querySelector('.sidebar-content');
  const body = document.body;
  const menuItems = document.querySelectorAll('.menu-item');
  const footerItems = document.querySelectorAll('.sidebar-footer h4');
  
  if (!sidebarContent) return;
  
  // Define colors for each menu item (rainbow order)
  const colors = {
    'Home': { highlight: '#FFFFFF', bg: '#C9B2B4' },
    'Explore': { highlight: '#fcf9ef', bg: '#C9B2B4' },
    'Digital': { highlight: '#C9B2B4', bg: '#ede4e5' },
    'Physical': { highlight: '#E5BBC1', bg: '#fee5e8' },
    'Sound': { highlight: '#8C8484', bg: '#b9aeae' },
    'about me': { highlight: '#FAEBD7', bg: '#C9B2B4' },
    'featured work': { highlight: '#FAEBD7', bg: '#C9B2B4' }
  };



  const defaultBodyBg = '#C9B2B4';
  const allItems = [...menuItems, ...footerItems];
  
  allItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const rect = this.getBoundingClientRect();
      const sidebarRect = sidebarContent.getBoundingClientRect();
      
      const itemText = this.querySelector('h2, h3, a')?.textContent.trim() || '';
      const colorScheme = colors[itemText];
      
      if (colorScheme) {
        body.style.backgroundColor = colorScheme.bg;
      }
      
      const top = rect.top - sidebarRect.top;
      const height = rect.height;
      
      // Use CSS variables instead of injecting styles!
      sidebarContent.style.setProperty('--highlight-top', `${top}px`);
      sidebarContent.style.setProperty('--highlight-height', `${height}px`);
      sidebarContent.style.setProperty('--highlight-color', colorScheme ? colorScheme.highlight : 'yellow');
      
      sidebarContent.classList.add('highlight-active');
    });
    
    item.addEventListener('mouseleave', () => {
      sidebarContent.classList.remove('highlight-active');
      body.style.backgroundColor = defaultBodyBg;
    });
  });
  
  sidebarContent.addEventListener('mouseleave', () => {
    sidebarContent.classList.remove('highlight-active');
    body.style.backgroundColor = defaultBodyBg;
  });
});