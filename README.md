# Projeto de Vídeo Curso com Quiz

Este projeto implementa um player de vídeo com uma playlist e um quiz interativo que aparece ao final de cada vídeo. O progresso é salvo no localStorage para que o usuário possa continuar de onde parou.

## Funcionalidades

- **Player de Vídeo**: Reproduz uma série de vídeos em sequência.
- **Descrição dos Vídeos**: Exibe uma descrição para cada vídeo.
- **Quiz Interativo**: Ao final de cada vídeo, um quiz é exibido. O usuário deve responder corretamente para desbloquear o próximo vídeo.
- **Progresso Salvo**: O progresso do usuário (vídeo atual e vídeos concluídos) é salvo no localStorage.
- **Certificado de Conclusão**: Após completar todos os vídeos, o usuário pode gerar um certificado.

## Estrutura do Código

### Arrays de Dados

- `videos`: URLs dos vídeos.
- `descriptions`: Descrições dos vídeos.
- `questions`: Questões do quiz para cada vídeo.
- `answers`: Opções de respostas para cada questão.
- `correctAnswers`: Índices das respostas corretas (base 0).
- `explanations`: Explicações das respostas corretas.

### Elementos do DOM

- `videoElement`: Elemento de vídeo (`<video>`).
- `progressBar`: Barra de progresso (`<progress>`).
- `progressPercentage`: Texto da porcentagem de progresso.
- `nextButton`: Botão "Próximo" para ir ao próximo vídeo.
- `generateCertificateButton`: Botão para gerar o certificado.
- `playlistItems`: Itens da playlist (`<li>`).
- `descriptionElement`: Elemento para exibir a descrição do vídeo.
- `quizContainer`: Contêiner do quiz.
- `quizQuestion`: Elemento da questão do quiz.
- `quizForm`: Formulário do quiz.
- `submitAnswerButton`: Botão para enviar a resposta do quiz.
- `resultContainer`: Contêiner para exibir o resultado do quiz.
- `userAnswerElement`: Elemento para exibir a resposta do usuário.
- `correctAnswerElement`: Elemento para exibir a resposta correta.
- `explanationElement`: Elemento para exibir a explicação.
- `certificateElement`: Elemento para exibir o certificado.

### Eventos

- `DOMContentLoaded`: Inicializa o carregamento do progresso e do vídeo atual.
- `videoElement.ended`: Exibe o quiz ao final do vídeo.
- `nextButton.click`: Carrega o próximo vídeo.
- `playlistItems.click`: Carrega um vídeo específico da playlist, se acessível.
- `submitAnswerButton.click`: Verifica a resposta do quiz e exibe o resultado.
- `generateCertificateButton.click`: Gera e exibe o certificado.

### Funções

- `loadVideo(index)`: Carrega o vídeo e a descrição, atualiza o quiz.
- `updateProgress()`: Atualiza a barra e a porcentagem de progresso.
- `markVideoAsCompleted(index)`: Marca um vídeo como concluído.
- `showQuiz()`: Exibe o quiz.
- `hideQuiz()`: Oculta o quiz.
- `resetQuiz()`: Reseta o formulário do quiz.
- `saveProgress(index)`: Salva o progresso atual no localStorage.
- `saveCompletedVideo(index)`: Salva os vídeos concluídos no localStorage.
- `isVideoAccessible(index)`: Verifica se um vídeo é acessível (próximo na sequência ou já concluído).

## Como Usar

1. **Iniciar o Projeto**: Abra o arquivo HTML principal no seu navegador.
2. **Reproduzir Vídeos**: Assista aos vídeos em sequência.
3. **Responder Quiz**: Responda corretamente ao quiz para desbloquear o próximo vídeo.
4. **Acompanhar Progresso**: O progresso é salvo automaticamente.
5. **Gerar Certificado**: Após completar todos os vídeos, clique no botão para gerar o certificado.

## Tecnologias Utilizadas

- **HTML5**: Para a estrutura da página.
- **CSS3**: Para a estilização.
- **JavaScript**: Para a interatividade e lógica do aplicativo.

## Estrutura de Arquivos

Criado por: William Régis
