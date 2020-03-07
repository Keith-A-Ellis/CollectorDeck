const Pack = require('./models/Pack');
const Card = require('./models/Card');
const Score = require('./models/Score');
const renderSections = require('./pageContent/sectionView');
const cardView = require('./pageContent/cardView');

const currentPack = new Pack('birdPack');

let state = {
    packPoints: 0,
    collectedCards: []
};

const score = new Score(currentPack.getPackData(), state.collectedCards);

const collectCard = (id) => {
    if (state.collectedCards.includes(id)){
        cardView.changeCollectedState(id, 'remove');
        state.collectedCards.splice(state.collectedCards.indexOf(id), 1);
    } 
    else {
        cardView.changeCollectedState(id, 'add');
        state.collectedCards.push(id);
    };

    state.packPoints = score.getScore();

    console.log(state.packPoints);
};

const addCardsToSection = () => {
    currentPack.getSections().forEach(section => {
        const cards = currentPack.getCardsForSection(section);

        cards.forEach(cardData => {
            cardView.renderCard(section.sectionID, new Card(cardData), collectCard);
        });
    });
};

const renderPack = () => {
    renderSections(currentPack.getSections());
    addCardsToSection();
};

renderPack();
