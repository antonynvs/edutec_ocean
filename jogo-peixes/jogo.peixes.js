const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');

const characters = [
  'anjo',
  'cirurgiao',
  'leao',
  'mandarim',
  'palhaco',
  'salmao',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';


async function salvarTempo(tempo) {
  const token = localStorage.getItem('token'); // Recupera o token de autenticação do localStorage

  if (!token) {
    console.error('Token não encontrado!');
    return;
  }

  try {
    const response = await fetch('https://backend-ocean.vercel.app/salvar-tempo', { // Substitua pela URL correta
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token // Envia o token no cabeçalho da requisição
      },
      body: JSON.stringify({
        score: tempo // Envia o tempo de jogo como score
      })
    });

    const data = await response.json();
    if (data.message === 'Tempo salvo com sucesso') {
      console.log('Tempo salvo com sucesso!');
    } else {
      console.error('Erro ao salvar o tempo:', data.message);
    }
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
  }
}

// Função que verifica se o jogo foi concluído
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 12) {
    clearInterval(this.loop); // Para o timer
    const tempoFinal = parseInt(timer.innerHTML); // Obtém o tempo do jogo
    alert(`Parabéns! Seu tempo foi de: ${tempoFinal} segundos`);

    // Chama a função para salvar o tempo no banco de dados
    salvarTempo(tempoFinal);
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../imagens/${character}.jpeg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  startTimer();
  loadGame();
}
