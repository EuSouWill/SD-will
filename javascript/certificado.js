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
  
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
  
    startForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const tipoProva = document.getElementById('tipoProva').value;
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const cpf = document.getElementById('cpf').value;
      const tipoAcesso = document.getElementById('tipoAcesso').value;
  
      if (!tipoProva || !nome || !email || !cpf || !tipoAcesso) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
  
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
        default:
          alert('Tipo de prova inválido.');
          return;
      }
  
      startContainer.classList.add('hidden');
      loadQuestion();
      questionContainer.classList.remove('hidden');
    });
  
    function loadQuestion() {
      questionContainer.innerHTML = '';
      if (currentQuestionIndex < questions.length) {
        const questionObj = questions[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `<p>${questionObj.question}</p>`;
        questionObj.answers.forEach((answer, index) => {
          questionElement.innerHTML += `
            <label>
              <input type="radio" name="question${currentQuestionIndex}" value="${index}">
              ${answer}
            </label>
          `;
        });
        questionElement.innerHTML += '<button onclick="submitAnswer()">Responder</button>';
        questionContainer.appendChild(questionElement);
      } else {
        showResults();
      }
    }
  
    function submitAnswer() {
      const selectedAnswer = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
      if (selectedAnswer) {
        const answerValue = parseInt(selectedAnswer.value, 10);
        userAnswers.push(answerValue);
        if (answerValue === questions[currentQuestionIndex].correct) {
          score++;
        }
        currentQuestionIndex++;
        loadQuestion();
      } else {
        alert('Por favor, selecione uma resposta.');
      }
    }
  
    function showResults() {
      questionContainer.classList.add('hidden');
      resultContainer.classList.remove('hidden');
  
      const percentage = (score / questions.length) * 100;
      scoreElement.textContent = `Você acertou ${score} de ${questions.length} perguntas (${percentage.toFixed(2)}%).`;
  
      reviewContainer.innerHTML = '<h3>Respostas:</h3>';
      questions.forEach((question, index) => {
        const userAnswerIndex = userAnswers[index];
        const correctAnswerIndex = question.correct;
        const isCorrect = userAnswerIndex === correctAnswerIndex;
        reviewContainer.innerHTML += `
          <p>${question.question}</p>
          <p>Sua resposta: ${question.answers[userAnswerIndex]}</p>
          <p>Resposta correta: ${question.answers[correctAnswerIndex]}</p>
          <p style="color: ${isCorrect ? 'green' : 'red'};">${isCorrect ? 'Correto' : 'Incorreto'}</p>
        `;
      });
  
      if (percentage >= 70) {
        generateCertificateButton.classList.remove('hidden');
      }
    }
  
    function generateCertificate() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.text('Certificado de Conclusão', 20, 20);
      doc.text('Parabéns! Você concluiu o curso com sucesso.', 20, 40);
      doc.text(`Pontuação: ${score} de ${questions.length}`, 20, 60);
      doc.save('certificado.pdf');
    }
  
    window.submitAnswer = submitAnswer;
    generateCertificateButton.addEventListener('click', generateCertificate);
  });
  