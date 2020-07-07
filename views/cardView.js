const renderCard = (section, cardData, addCardFunction) => {
        document.querySelector(`#${section}`).insertAdjacentHTML('beforeEnd', makeCard(cardData));
        document.querySelector(`#checkbox-${cardData.id}`).addEventListener("click", () => {
            addCardFunction(cardData.id);
    });
};

const changeCollectedState = (id) => {
    document.getElementById(id).classList.toggle('collected');
};

const makeCard = ({id, img, name, description, rarity}) => {
    const card = 
    `<div class="card" id='${id}'>
        <span id="rarity-box" class="${rarity}-card">${rarity}</span>
        <img id="image1" src="./images/a.png" height="300" width="400" />
        <h2 class="card-title">${name}</h2>
        <p>${description}</p>
        <input class="collect-button" type='checkbox' id='checkbox-${id}'>
    </div>`;
        
    return card;
}

module.exports = {renderCard, changeCollectedState};

