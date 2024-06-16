document.addEventListener("DOMContentLoaded", () => {
    const videos = [
        "/video/inteligencia/v1.mp4",
        "/video/inteligencia/v2.mp4",
        "/video/inteligencia/v3.mp4",
        "/video/inteligencia/v4.mp4"
    ];

    const descriptions = [
        "Descrição do Vídeo 1",
        "Descrição do Vídeo 2",
        "Descrição do Vídeo 3",
        "Descrição do Vídeo 4"
    ];

    const questions = [
        "Qual é a resposta correta para o vídeo 1?",
        "Qual é a resposta correta para o vídeo 2?",
        "Qual é a resposta correta para o vídeo 3?",
        "Qual é a resposta correta para o vídeo 4?"
    ];

    const answers = [
        ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        ["Opção 1", "Opção 2", "Opção 3", "Opção 4"]
    ];

    const correctAnswers = [0, 1, 2, 3]; // Índices das respostas corretas (0-based)
    const explanations = [
        "Explicação para o vídeo 1.",
        "Explicação para o vídeo 2.",
        "Explicação para o vídeo 3.",
        "Explicação para o vídeo 4."
    ];

    let currentVideoIndex = 0;

    const videoElement = document.getElementById("course-video");
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = document.getElementById("progress-percentage");
    const nextButton = document.getElementById("next-button");
    const playlistItems = document.querySelectorAll("#playlist li");
    const descriptionElement = document.getElementById("video-description");
    const quizContainer = document.getElementById("quiz-container");
    const quizQuestion = document.getElementById("quiz-question");
    const quizForm = document.getElementById("quiz-form");
    const submitAnswerButton = document.getElementById("submit-answer");
    const resultContainer = document.getElementById("result-container");
    const userAnswerElement = document.getElementById("user-answer");
    const correctAnswerElement = document.getElementById("correct-answer");
    const explanationElement = document.getElementById("explanation");

    videoElement.addEventListener("ended", () => {
        markVideoAsCompleted(currentVideoIndex);
        showQuiz();
    });

    nextButton.addEventListener("click", () => {
        if (currentVideoIndex < videos.length - 1) {
            currentVideoIndex++;
            loadVideo(currentVideoIndex);
            updateProgress();
            nextButton.disabled = true; // Desabilita o botão de próximo vídeo
            resultContainer.style.display = 'none';
        }
    });

    playlistItems.forEach(item => {
        item.addEventListener("click", () => {
            const index = parseInt(item.getAttribute("data-index"));
            currentVideoIndex = index;
            loadVideo(currentVideoIndex);
            updateProgress();
            nextButton.disabled = true; // Desabilita o botão de próximo vídeo
            resultContainer.style.display = 'none';
        });
    });

    submitAnswerButton.addEventListener("click", () => {
        const selectedOption = document.querySelector('input[name="quiz"]:checked');
        if (selectedOption) {
            const answer = parseInt(selectedOption.value);
            const correctAnswer = correctAnswers[currentVideoIndex];
            const correctAnswerText = answers[currentVideoIndex][correctAnswer];
            const userAnswerText = answers[currentVideoIndex][answer];
            userAnswerElement.textContent = `Sua resposta: ${userAnswerText}`;
            correctAnswerElement.textContent = `Resposta correta: ${correctAnswerText}`;
            explanationElement.textContent = `Explicação: ${explanations[currentVideoIndex]}`;
            resultContainer.style.display = 'block';
            if (answer === correctAnswer) {
                nextButton.disabled = false; // Habilita o botão de próximo vídeo
                hideQuiz();
            } else {
                alert("Resposta incorreta. Tente novamente.");
            }
        } else {
            alert("Por favor, selecione uma resposta.");
        }
    });

    function loadVideo(index) {
        videoElement.src = videos[index];
        videoElement.load();
        descriptionElement.textContent = descriptions[index];
        quizQuestion.textContent = questions[index];
        document.getElementById("option-0").textContent = answers[index][0];
        document.getElementById("option-1").textContent = answers[index][1];
        document.getElementById("option-2").textContent = answers[index][2];
        document.getElementById("option-3").textContent = answers[index][3];
        resetQuiz();
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
        status.innerHTML = '&#10004;'; // Símbolo de checkmark
    }

    function showQuiz() {
        quizContainer.style.display = 'block';
    }

    function hideQuiz() {
        quizContainer.style.display = 'none';
    }

    function resetQuiz() {
        const options = document.querySelectorAll('input[name="quiz"]');
        options.forEach(option => option.checked = false);
    }

    // Carrega o primeiro vídeo inicialmente
    loadVideo(currentVideoIndex);
});
