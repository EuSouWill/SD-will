document.addEventListener('DOMContentLoaded', () => {
    const etapasContainer = document.getElementById('etapas-container');
    const cards = etapasContainer.querySelectorAll('.card');
    const userProgress = carregarProgresso();
  
    function atualizarProgresso() {
      localStorage.setItem('userProgress', JSON.stringify(userProgress));
    }
  
    function carregarProgresso() {
      const progresso = localStorage.getItem('userProgress');
      if (progresso) {
        return JSON.parse(progresso);
      }
      return Array(cards.length).fill(false); // Simulação do progresso do usuário
    }
  
    function atualizarStatus() {
      cards.forEach((card, index) => {
        const statusElement = card.querySelector('.status');
        const button = card.querySelector('.action-button');
        const etapa = card.dataset.etapa;
  
        if (userProgress[index]) {
          card.classList.add('completed');
          statusElement.innerText = 'Concluído';
          button.innerText = 'Revisar';
          button.disabled = false;
        } else {
          card.classList.remove('completed');
          statusElement.innerText = 'Não Concluído';
          button.innerText = 'Assistir';
          button.disabled = index > 0 && !userProgress[index - 1];
        }
  
        if (etapa === 'final') {
          const todasEtapasConcluidas = userProgress.slice(0, -1).every(status => status);
          statusElement.innerText = todasEtapasConcluidas ? 'Liberada' : 'Bloqueada';
          button.disabled = !todasEtapasConcluidas;
        }
      });
    }
  
    cards.forEach((card, index) => {
      const button = card.querySelector('.action-button');
      const etapa = card.dataset.etapa;
      const caminho = card.dataset.caminho;
  
      button.addEventListener('click', () => {
        if (etapa !== 'final') {
          userProgress[index] = true;
          atualizarProgresso();
          window.location.href = caminho;
        } else {
          const todasEtapasConcluidas = userProgress.slice(0, -1).every(status => status);
          if (todasEtapasConcluidas) {
            window.location.href = caminho;
          }
        }
      });
    });
  
    atualizarStatus();
  });
  