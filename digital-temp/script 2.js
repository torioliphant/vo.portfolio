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

// Sidebar slider interactions
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.menu-slider');
  const track = document.querySelector('.menu-track');
  
  if (!slider || !track) return;
  
  let isDown = false;
  let startX;
  let scrollLeft;
  let autoScrollInterval;
  
  
  // Drag to scroll
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    clearInterval(autoScrollInterval); // Stop auto-scroll when dragging
  });
  
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.style.cursor = 'grab';
  });
  
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.cursor = 'grab';
  });
  
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed multiplier
    slider.scrollLeft = scrollLeft - walk;
  });
  
  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchScrollLeft = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = slider.scrollLeft;
  });
  
  slider.addEventListener('touchmove', (e) => {
    const touchX = e.touches[0].pageX;
    const walk = (touchStartX - touchX) * 1.5; // Adjust sensitivity
    slider.scrollLeft = touchScrollLeft + walk;
  });
  
  // Click on image to scroll to next
  track.querySelectorAll('img').forEach((img) => {
    img.addEventListener('click', () => {
      const imgWidth = img.offsetWidth;
      slider.scrollLeft += imgWidth + 16; // 16px for gap
      
      // Loop back to start
      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        slider.scrollLeft = 0;
      }
    });
  });
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
    'Home': { highlight: '#FFFFFF', bg: '#ede4e5' },
    'Explore': { highlight: '#fcf9ef', bg: '#ede4e5' },
    'Digital': { highlight: '#C9B2B4', bg: '#ede4e5' },
    'Physical': { highlight: '#E5BBC1', bg: '#ede4e5' },
    'Sound': { highlight: '#8C8484', bg: '#ede4e5' },
    'about me': { highlight: '#FAEBD7', bg: '#ede4e5' },
    'featured work': { highlight: '#FAEBD7', bg: '#ede4e5' }
  };



  const defaultBodyBg = '#ede4e5';
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

// Add this code to your script.js file, at the end

// Set persistent highlight on Digital menu item
document.addEventListener('DOMContentLoaded', () => {
  const sidebarContent = document.querySelector('.sidebar-content');
  const body = document.body;
  
  // Add class to body to identify this as the Digital page
  body.classList.add('digital-page');
  
  // Find the Digital menu item
  const digitalItem = Array.from(document.querySelectorAll('.menu-item')).find(item => {
    const text = item.querySelector('h2')?.textContent.trim();
    return text === 'Digital';
  });
  
  if (digitalItem && sidebarContent) {
    // Calculate position of Digital item
    const rect = digitalItem.getBoundingClientRect();
    const sidebarRect = sidebarContent.getBoundingClientRect();
    
    const top = rect.top - sidebarRect.top;
    const height = rect.height;
    
    // Set CSS variables for the persistent highlight
    sidebarContent.style.setProperty('--digital-highlight-top', `${top}px`);
    sidebarContent.style.setProperty('--digital-highlight-height', `${height}px`);
  }
});


});