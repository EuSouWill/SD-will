document.addEventListener('DOMContentLoaded', () => {
    const questionsAgenda = [
        { question: "1- Como você avalia o módulo Agenda?", answers: ["a) Muito Ruim", "b) Ruim", "c) Bom", "d) Muito Bom"], correct: 3 },
        // Adicione mais perguntas conforme necessário
    ];

    const questionsGestao = [
        { question: "1- Como você avalia o módulo Gestão?", answers: ["a) Muito Ruim", "b) Ruim", "c) Bom", "d) Muito Bom"], correct: 3 },
        // Adicione mais perguntas conforme necessário
    ];

    const questionsVendas = [
        { question: "1- Como você avalia o módulo Vendas?", answers: ["a) Muito Ruim", "b) Ruim", "c) Bom", "d) Muito Bom"], correct: 3 },
        // Adicione mais perguntas conforme necessário
    ];

    let questions = [];

    const startContainer = document.getElementById('start-container');
    const startForm = document.getElementById('start-form');
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    const scoreElement = document.getElementById('score');
    const generateCertificateButton = document.getElementById('generate-certificate');
    const reviewContainer = document.getElementById('review-container');
    const retryButton = document.getElementById('retry-button');

    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    let userData = {};

    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf == '') return false;
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            return false;
        let add = 0;
        for (let i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;
        add = 0;
        for (let i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;
        return true;
    }

    function salvarLocalStorage(chave, valor) {
        localStorage.setItem(chave, JSON.stringify(valor));
    }

    function carregarLocalStorage(chave) {
        const item = localStorage.getItem(chave);
        return item ? JSON.parse(item) : null;
    }

    startForm.addEventListener('submit', (e) => {
        e.preventDefault();
        iniciarProva();
    });

    function iniciarProva() {
        const tipoProva = document.getElementById('tipoProva').value;
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const cpf = document.getElementById('cpf').value;
        const tipoAcesso = document.getElementById('tipoAcesso').value;

        if (!tipoProva || !nome || !email || !cpf || !tipoAcesso) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!validarCPF(cpf)) {
            alert('CPF inválido.');
            return;
        }

        // Verificar se o CPF já realizou a prova 3 vezes
        const attemptsKey = `attempts_${cpf}`;
        let attempts = carregarLocalStorage(attemptsKey);
        if (!attempts) {
            attempts = 0;
        }

        if (attempts >= 3) {
            alert('Você já realizou a prova 3 vezes. Entre em contato com o suporte.');
            return;
        }

        userData = { tipoProva, nome, email, cpf, tipoAcesso };

        switch (tipoProva) {
            case 'agenda':
                questions = questionsAgenda;
                break;
            case 'gestao':
                questions = questionsGestao;
                break;
            case 'vendas':
                questions = questionsVendas;
                break;
        }

        startContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endQuiz();
            return;
        }
        const questionData = questions[currentQuestionIndex];
        questionContainer.innerHTML = `
        <div class="question">
            <p>${questionData.question}</p>
            ${questionData.answers.map((answer, index) => `
            <label>
                <input type="radio" name="answer" value="${index}">
                ${answer}
            </label>
            `).join('')}
        </div>
        <button onclick="submitAnswer()">Responder</button>
        `;
    }

    window.submitAnswer = function () {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) {
            alert('Por favor, selecione uma resposta.');
            return;
        }

        const answerIndex = parseInt(selectedAnswer.value);
        userAnswers.push(answerIndex);

        if (answerIndex === questions[currentQuestionIndex].correct) {
            score++;
        }

        currentQuestionIndex++;
        displayQuestion();
    }

    function endQuiz() {
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        const percentage = (score / questions.length) * 100;
        scoreElement.textContent = `Você acertou ${score} de ${questions.length} perguntas (${percentage.toFixed(2)}%)`;

        reviewContainer.innerHTML = questions.map((q, index) => `
        <div>
            <p>${q.question}</p>
            <p>Sua resposta: ${q.answers[userAnswers[index]]}</p>
            <p>Resposta correta: ${q.answers[q.correct]}</p>
        </div>
        `).join('');

        const cpf = userData.cpf;
        const attemptsKey = `attempts_${cpf}`;
        let attempts = carregarLocalStorage(attemptsKey);
        if (!attempts) {
            attempts = 0;
        }

        if (percentage < 70) {
            attempts++;
            salvarLocalStorage(attemptsKey, attempts);

            if (attempts < 3) {
                retryButton.textContent = `Tentar Novamente (Tentativa ${attempts} de 3)`;
                retryButton.classList.remove('hidden');
                retryButton.disabled = false;
                retryButton.style.backgroundColor = ''; // Reset button color
            } else {
                retryButton.textContent = 'Você atingiu o limite de tentativas. Entre em contato com o suporte.';
                retryButton.classList.remove('hidden');
                retryButton.disabled = true;
                retryButton.style.backgroundColor = 'red'; // Change button color to red
            }
        } else {
            generateCertificateButton.classList.remove('hidden');
            retryButton.classList.add('hidden');
        }
    }

    retryButton.addEventListener('click', () => {
        if (!retryButton.disabled) {
            currentQuestionIndex = 0;
            score = 0;
            userAnswers = [];
            resultContainer.classList.add('hidden');
            questionContainer.classList.remove('hidden');
            displayQuestion();
        } else {
            alert('Você atingiu o limite de tentativas. Entre em contato com o suporte.');
        }
    });

    generateCertificateButton.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const nome = userData.nome;
        const email = userData.email;
        const cpf = userData.cpf;
        const tipoAcesso = userData.tipoAcesso;
        const uniqueId = `ID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        doc.text('Certificado de Conclusão', 20, 20);
        doc.text(`Nome: ${nome}`, 20, 40);
        doc.text(`Email: ${email}`, 20, 60);
        doc.text(`CPF: ${cpf}`, 20, 80);
        doc.text(`Tipo de Acesso: ${tipoAcesso}`, 20, 100);
        doc.text(`ID Único: ${uniqueId}`, 20, 120);
        doc.save('certificado.pdf');
    });
});
