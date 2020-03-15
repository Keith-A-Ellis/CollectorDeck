const Pack = require('./models/Pack');
const Card = require('./models/Card');
const Score = require('./models/Score');
const renderScoreView = require('./views/scoreView');
const renderSectionView = require('./views/sectionView');
const renderCardView = require('./views/cardView');

let state = {
    packPoints: 0,
    collectedCards: [],
};

const currentPack = new Pack('birdPack');
const score = new Score(currentPack.getPackData(), state.collectedCards);

const collectCard = (id) => {
    if (state.collectedCards.includes(id)){
        renderCardView.changeCollectedState(id, 'remove');
        state.collectedCards.splice(state.collectedCards.indexOf(id), 1);
    } 
    else {
        renderCardView.changeCollectedState(id, 'add');
        state.collectedCards.push(id);
    };

    state.packPoints = score.getScore();
    renderScoreView.updatePoints(state.packPoints, currentPack.getCardAmount(), state.collectedCards.length);
};

const addCardsToSection = () => {
    currentPack.getSections().forEach(section => {
        const cards = currentPack.getCardsForSection(section);

        cards.forEach(cardData => {
            renderCardView.renderCard(section.sectionID, new Card(cardData), collectCard);
        });
    });
};

const renderPage = () => {
    renderScoreView.initialScoreRender(state.packPoints, currentPack.getCardAmount(), state.collectedCards.length);
    renderSectionView(currentPack.getSections());
    addCardsToSection();
};

renderPage();
