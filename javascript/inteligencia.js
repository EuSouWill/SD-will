document.addEventListener("DOMContentLoaded", () => {
    const videos = [
        "/video/inteligencia/v1.mp4",
        "/video/inteligencia/v2.mp4",
        "/video/inteligencia/v3.mp4",
        "/video/inteligencia/v4.mp4",
        "/video/inteligencia/v5.mp4",
        "/video/inteligencia/v6.mp4",
        "/video/inteligencia/v7.mp4",
        "/video/inteligencia/v8.mp4",
        "/video/inteligencia/v9.mp4",
        "/video/inteligencia/v10.mp4",
    ];

    const descriptions = [
        "Para ver o que você tem previsto para receber você vai acessar o MENU INTELIGENCIA, clicar em ORTODONTIA e depois rolar a página até o final, onde você encontra este gráfico, igual na imagem abaixo.Este gráfico vai te mostrar as previsões de tudo que você tem para receber das suas manutenções de ortodontia, você pode ver ele por ano e por mês.",
        "Descrição do Vídeo 2",
        "Descrição do Vídeo 3",
        "Descrição do Vídeo 4",
        "Descrição do Vídeo 5",
        "Descrição do Vídeo 6",
        "Descrição do Vídeo 7",
        "Descrição do Vídeo 8",
        "Descrição do Vídeo 9",
        "Descrição do Vídeo 10",
    ];

    const questions = [
        "Em qual aba do menu inteligência está localizado as consultas canceladas?",
        "Qual é a resposta correta para o vídeo 2?",
        "Qual é a resposta correta para o vídeo 3?",
        "Qual é a resposta correta para o vídeo 4?",
        "Qual é a resposta correta para o vídeo 5?",
        "Qual é a resposta correta para o vídeo 6?",
        "Qual é a resposta correta para o vídeo 7?",
        "Qual é a resposta correta para o vídeo 8?",
        "Qual é a resposta correta para o vídeo 9?",
        "Qual é a resposta correta para o vídeo 10?",
    ];

    const answers = [
        ["Tarefas", "Performance", "Ortodontia", "Nenhuma"],
        ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
    ];

    const correctAnswers = [0, 1, 2, 3, 0, 1, 2, 3, 1, 2]; // Índices das respostas corretas (0-based)
    const explanations = [
        "No menu inteligência, na aba de Tarefas, você consegue um relatório das consultas canceladas.",
        "Explicação para o vídeo 2.",
        "Explicação para o vídeo 3.",
        "Explicação para o vídeo 4.",
        "Explicação para o vídeo 5.",
        "Explicação para o vídeo 6.",
        "Explicação para o vídeo 7.",
        "Explicação para o vídeo 8.",
        "Explicação para o vídeo 9.",
        "Explicação para o vídeo 10.",
    ];

    let currentVideoIndex = 0;

    const videoElement = document.getElementById("course-video");
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = document.getElementById("progress-percentage");
    const nextButton = document.getElementById("next-button");
    const generateCertificateButton = document.getElementById("generate-certificate");
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
    const certificateElement = document.getElementById("certificate");

    // Array para armazenar vídeos concluídos
    let completedVideos = [];

    // Carregar progresso do localStorage
    const savedProgress = localStorage.getItem("currentVideoIndex");
    if (savedProgress !== null) {
        currentVideoIndex = parseInt(savedProgress);
    }

    // Carregar vídeos concluídos do localStorage
    const savedCompletedVideos = localStorage.getItem("completedVideos");
    if (savedCompletedVideos !== null) {
        completedVideos = JSON.parse(savedCompletedVideos);
        completedVideos.forEach(index => markVideoAsCompleted(index));
    }

    videoElement.addEventListener("ended", () => {
        showQuiz();
    });

    nextButton.addEventListener("click", () => {
        if (currentVideoIndex < videos.length - 1) {
            currentVideoIndex++;
            loadVideo(currentVideoIndex);
            nextButton.disabled = true; // Desabilita o botão de próximo vídeo
            resultContainer.style.display = 'none';
            saveProgress(currentVideoIndex);
        }
    });

    playlistItems.forEach(item => {
        item.addEventListener("click", () => {
            const index = parseInt(item.getAttribute("data-index"));
            if (isVideoAccessible(index)) {
                currentVideoIndex = index;
                loadVideo(currentVideoIndex);
                nextButton.disabled = true; // Desabilita o botão de próximo vídeo
                resultContainer.style.display = 'none';
                saveProgress(currentVideoIndex);
            } else {
                alert("Você precisa completar os vídeos anteriores primeiro.");
            }
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
                markVideoAsCompleted(currentVideoIndex);
                nextButton.disabled = false; // Habilita o botão de próximo vídeo
                hideQuiz();
                saveProgress(currentVideoIndex); // Salva o progresso
                saveCompletedVideo(currentVideoIndex); // Salva vídeo concluído
                if (currentVideoIndex === videos.length - 1) {
                    generateCertificateButton.style.display = 'block'; // Exibe o botão de gerar certificado
                }
            } else {
                alert("Resposta incorreta. Tente novamente.");
            }
        } else {
            alert("Por favor, selecione uma resposta.");
        }
    });

    generateCertificateButton.addEventListener("click", () => {
        certificateElement.style.display = 'block'; // Exibe o certificado
        generateCertificateButton.style.display = 'none'; // Esconde o botão de gerar certificado
        updateProgress(); // Atualiza a barra de progresso após exibir o certificado
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
        let progress = (completedVideos.length / videos.length) * 100; // Ajusta a fórmula de progresso
        if (progress > 100) {
            progress = 100; // Limita o progresso a 100%
        }
        progressBar.value = progress;
        progressPercentage.textContent = `${progress.toFixed(0)}%`;
    }

    function markVideoAsCompleted(index) {
        const item = playlistItems[index];
        item.classList.add('completed');
        const status = item.querySelector('.status');
        status.innerHTML = '&#10004;'; // Símbolo de checkmark
        updateProgress();
    }

    function showQuiz() {
        quizContainer.style.display = 'block';
    
        // Atualize o conteúdo do quiz com base no vídeo atual
        quizQuestion.textContent = questions[currentVideoIndex];
        document.getElementById("option-0").textContent = answers[currentVideoIndex][0];
        document.getElementById("option-1").textContent = answers[currentVideoIndex][1];
        document.getElementById("option-2").textContent = answers[currentVideoIndex][2];
        document.getElementById("option-3").textContent = answers[currentVideoIndex][3];
    }

    function hideQuiz() {
        quizContainer.style.display = 'none';
    }

    function resetQuiz() {
        quizForm.reset();
        resultContainer.style.display = 'none';
    }

    function saveProgress(index) {
        localStorage.setItem("currentVideoIndex", index);
    }

    function saveCompletedVideo(index) {
        if (!completedVideos.includes(index)) {
            completedVideos.push(index);
            localStorage.setItem("completedVideos", JSON.stringify(completedVideos));
        }
    }

    function isVideoAccessible(index) {
        // Um vídeo é acessível se for o próximo na sequência ou já tiver sido concluído
        return completedVideos.includes(index - 1) || completedVideos.includes(index);
    }

    // Inicializa o vídeo atual
    loadVideo(currentVideoIndex);
    updateProgress();
});
