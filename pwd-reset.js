function goHome() {
    window.location.href = "index.html"
}

// Splash screen functionality
document.addEventListener("DOMContentLoaded", function () {
    // Show the splash screen
    const splashScreen = document.getElementById("splashScreen");

    // Ensure fonts are loaded before hiding the splash screen
    if (document.fonts) {
        document.fonts.ready.then(function () {
            window.dispatchEvent(new Event('load'));
        });
    }

    // Hide the splash screen after everything is loaded
    window.addEventListener("load", function () {
        setTimeout(() => {
            splashScreen.style.opacity = '0';
            splashScreen.style.transition = 'opacity 0.5s ease';
            splashScreen.addEventListener('transitionend', () => {
                splashScreen.style.display = 'none';
            });
        }, 1000); // Adjust delay as needed
    });
});