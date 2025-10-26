const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORE = 5;

finalScore.innerText = mostRecentScore;

// Enable the Save button when user types something
username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value.trim();
});

function saveHighScore(event) {
  event.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };

  highScores.push(score);

  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORE);

  localStorage.setItem('highScores', JSON.stringify(highScores));

  window.location.assign('/');
}
