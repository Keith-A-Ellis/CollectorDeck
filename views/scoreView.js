const initialScoreRender = (score, cardAmount, collectedAmount) => {
    document.querySelector('#root').insertAdjacentHTML('beforeEnd', `
    <h1 id='collected-score'>Cards Collected: ${collectedAmount}/${cardAmount}</h1>
    <h1 id="points-score">Score: ${score}</h1>
    `);
};

const updatePoints = (newScore, cardAmount, collectedAmount) => {
    document.getElementById('collected-score').innerHTML = `Cards Collected: ${collectedAmount}/${cardAmount}`;
    document.getElementById('points-score').innerHTML = `Score: ${newScore}`;
}

module.exports = {initialScoreRender,updatePoints};