// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const videos = [
        "/video/inteligencia/v1.mp4",
        "/video/inteligencia/v2.mp4",
        "/video/inteligencia/v3.mp4",
        "/video/inteligencia/v4.mp4"
    ];
    let currentVideoIndex = 0;

    const videoElement = document.getElementById("course-video");
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = document.getElementById("progress-percentage");
    const nextButton = document.getElementById("next-button");
    const playlistItems = document.querySelectorAll("#playlist li");

    videoElement.addEventListener("ended", () => {
        markVideoAsCompleted(currentVideoIndex);
        updateProgress();
    });

    nextButton.addEventListener("click", () => {
        if (currentVideoIndex < videos.length - 1) {
            currentVideoIndex++;
            loadVideo(currentVideoIndex);
            updateProgress();
        }
    });

    playlistItems.forEach(item => {
        item.addEventListener("click", () => {
            const index = parseInt(item.getAttribute("data-index"));
            currentVideoIndex = index;
            loadVideo(currentVideoIndex);
            updateProgress();
        });
    });

    function loadVideo(index) {
        videoElement.src = videos[index];
        videoElement.load();
        videoElement.play();
    }

    function updateProgress() {
        const progress = ((currentVideoIndex + 1) / videos.length) * 100;
        progressBar.value = progress;
        progressPercentage.textContent = `${progress.toFixed(0)}%`;
    }

    function markVideoAsCompleted(index) {
        const item = playlistItems[index];
        item.classList.add('completed');
        const status = item.querySelector('.status');
        status.innerHTML = '&#10004;'; // Checkmark symbol
    }

    // Load the first video initially
    loadVideo(currentVideoIndex);
});
