let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

function computerPickmove(){
  const randomNumber = Math.random();

  let computerMove = '';
  if(randomNumber > 0 && randomNumber <= 1/3){
    computerMove = 'rock';
  } else if(randomNumber > 1/3 && randomNumber <= 2/3){
    computerMove = 'paper';
  } else if(randomNumber > 2/3 && randomNumber <= 1){
    computerMove = 'scissors';
  }
  return computerMove;
};

function stopAutoPlay () {
  const buttonElement = document.querySelector('.auto-stop-button');
  
  if (buttonElement.innerText === 'Auto Play') {
    buttonElement.innerText = 'Stop Play';
    buttonElement.classList.add('is-activated');
  } else {
    buttonElement.innerText = 'Auto Play';
    buttonElement.classList.remove('is-activated');
  }
};

let isAutoplaying = false;
let intervalId;

function autoPlay () {
  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      const playerMove = computerPickmove();
      playGame(playerMove);
    }, 1000);
    isAutoplaying = true;
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
  }
};

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });
document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r' || event.key === 'R') {
    playGame('rock');
  } else if(event.key === 'p' || event.key === 'P') {
    playGame('paper');
  } else if(event.key === 's' || event.key === 'S') {
    playGame('scissors');
  }
});


function playGame(playerMove){
  const computerMove = computerPickmove();

  let result = '';
  if (playerMove === 'rock'){
    if(computerMove === 'rock'){
      result = 'Tie.';
    } else if(computerMove === 'paper'){
      result = 'You Lose.';
    } else if(computerMove === 'scissors'){
      result = 'You Win.';
    }
  }
  else if (playerMove === 'paper'){
    if(computerMove === 'rock'){
      result = 'You Win.';
    } else if(computerMove === 'paper'){
      result = 'Tie.';
    } else if(computerMove === 'scissors'){
      result = 'You Lose.';
    }
  }
  else if (playerMove === 'scissors'){
    if(computerMove === 'rock'){
      result = 'You Lose.';
    } else if(computerMove === 'paper'){
      result = 'You Win.';
    } else if(computerMove === 'scissors'){
      result = 'Tie.';
    }
  }
  if (result === 'You Win.'){
    score.wins += 1;
  } else if (result === 'You Lose.'){
    score.losses += 1;
  } else if (result === 'Tie.'){
    score.ties += 1;
  }
  
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
<img src="game image/${playerMove}-emoji.png" class="move-icon">   <img src="game image/${computerMove}-emoji.png" class="move-icon">
Computer`;
        
};

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function resetScore(){
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
  
  localStorage.setItem('score', JSON.stringify(score));
  
  updateScoreElement();
  
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
}