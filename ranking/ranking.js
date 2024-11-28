async function exibirRanking() {
    try {
      const response = await fetch('https://backend-ocean.vercel.app/ranking'); 
      const data = await response.json();
  
      const rankingContainer = document.querySelector('.ranking');
  
      
      rankingContainer.innerHTML = '';
  
      // Exibe os rankings
      data.forEach((player, index) => {
        const rankItem = document.createElement('div');
        rankItem.classList.add('rank-item'); 
  
        // Cria os elementos para nome e tempo
        const nameElement = document.createElement('span');
        nameElement.classList.add('player-name');
        nameElement.innerHTML = `${index + 1}º - <strong>${player.name}</strong>`;
  
        const scoreElement = document.createElement('span');
        scoreElement.classList.add('player-score');
        scoreElement.innerHTML = `<strong>Tempo:<strong> ${player.score} segundos`;
  
        
        rankItem.appendChild(nameElement);
        rankItem.appendChild(scoreElement);
  
        
        rankingContainer.appendChild(rankItem);
      });
    } catch (error) {
      console.error('Erro ao carregar o ranking:', error);
    }
  }
  
window.onload = () => {
    exibirRanking(); 
}