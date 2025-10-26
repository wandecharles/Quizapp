const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML = highScores.map(score => {
    return `<li style="font-size: 2rem" class="high-score">${score.name} - ${score.score}</li>`
}).join('')