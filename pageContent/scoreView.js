const initialScoreRender = (score, cardAmount, collectedAmount) => {
    document.querySelector('#root').insertAdjacentHTML('beforeEnd', `<h1>Cards Collected: ${collectedAmount}/${cardAmount}</h1>`);
    document.querySelector('#root').insertAdjacentHTML('beforeEnd', `<h1>Score: ${score}</h1>`);
};

module.exports = initialScoreRender;