let numButtonClicks = 0;
function buttonClicked() {
    numButtonClicks = numButtonClicks + 1;
    document.getElementById("mainDiv").textContent =
        "Button Clicked times: " + numButtonClicks;
}

const locomotiveScroll = new LocomotiveScroll();

document.addEventListener("DOMContentLoaded", function() {
            setTimeout(() => {
                document.querySelector(".loading-screen").style.display = "none";
            }, 6000); // Ensures element is removed after fadeOut completes
        });

document.addEventListener('DOMContentLoaded', function() {
    // Get the next project button
    const nextButton = document.getElementById('nextProjectBtn');
    
    if (nextButton) {
        nextButton.addEventListener('click', navigateToNextProject);
    }
    
    function navigateToNextProject(e) {
        e.preventDefault();
        
        // Array of all project pages
        const projectPages = [
            'projectone.html',
            'projecttwo.html',
            'projectthree.html',
            'projectfour.html',
            'projectfive.html',
            'projectsix.html',
            'projectseven.html',
            'projecteight.html',
            'projectnine.html'
        ];
        
        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop();
        
        // Find current page index
        const currentIndex = projectPages.indexOf(currentPage);
        
        // Calculate next page index (loop back to first if on last page)
        const nextIndex = currentIndex >= 0 && currentIndex < projectPages.length - 1 ? 
                           currentIndex + 1 : 0;
        
        // Navigate to next project
        window.location.href = projectPages[nextIndex];
    }
});
