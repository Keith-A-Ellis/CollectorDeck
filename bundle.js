(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
  birdPack: {
    id: "GB-Birds-1",
    sections: [
      {
        title: "City Ponds and Town Gardens",
        sectionID: "birds-section-1",
        items: [
          {
            id: "bird-1",
            name: "Canada Goose",
            description:
              "As their name suggests, these well-known geese originally came from North America, but they were introduced into Europe more than 200 years ago. You can see them on lakes and ponds or in fields",
            rarity: "Common",
            img:""
          },
          {
            id: "bird-2",
            name: "Mallard",
            description:
              "Everyone knows the mallard. It is the bird that you always think of as a typical wild duck",
            rarity: "Common",
            img:""          
          },
          {
            id: "bird-3",
            name: "Mandarin Duck",
            description:
              "Originally from China, this beautiful bird has thankfully escaped from private collections of ornamental wildfowl and now adorns our lakes and slower rivers. It is unusual for a duck as it nests in holes in trees",
            rarity: "Rare",
            img:""
          },
          {
            id: "bird-4",
            name: "Pochard",
            description:
              "The Pochard is a striking bird that regularly visits ponds and lakes in London's royal parks, however, its preferred home is flooded gravel pits and other large lakes",
            rarity: "V.Rare",
            img:""
          },
          {
            id: "bird-5",
            name: "Dunnock",
            description:
              "Often seen around hedges and wrongly called the 'Hedge Sparrow' it is not related to sparrows, the two birds have different beak shapes and different food requirements. They are often seen quietly and efficiently picking up scraps under the bird table",
            rarity: "V.Rare",
            img:""},
          {
            id: "bird-6",
            name: "Wren",
            description:
              "This is a tiny bird and, although it is very common, its habits of hiding in hedges and holes in banks makes it hard to see. Its Latin name of Troglodytes means 'cave dweller'. For such a small bird it has a very loud song",
            rarity: "Uncommon",
            img:""          
          },
          {
            id: "bird-7",
            name: "Starling",
            description:
              "One of the Starlings most noticeable charateristics is that in winter, in special places, roosting flocks of millions are a daily spectacle! Also, it's an excellent mimic - phones and alarms are a speciality!",
            rarity: "Common",
            img:""          
          },
        ]
      }
      ]
    }
};

},{}],2:[function(require,module,exports){
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

},{"./models/Card":3,"./models/Pack":4,"./models/Score":5,"./pageContent/cardView":6,"./pageContent/sectionView":7}],3:[function(require,module,exports){
class Card {
    constructor(item) {
        this.id = item.id;
        this.img = item.img;
        this.name = item.name;
        this.description = item.description;
        this.rarity = item.rarity;
    }

    returnCardDetails() {
        return {
            id: this.id,
            img: this.img,
            name: this.name,
            description: this.description,
            rarity: this.rarity
        }
    }
};

module.exports = Card;

},{}],4:[function(require,module,exports){
const getData = require('../data/birdData');

class Pack {
    constructor(pack){
        this.pack = pack;
    }

    getPackData() {
        return getData[this.pack];
    };

    getSections() {
        return this.getPackData().sections;
    };

    getCardsForSection(section){
        return section.items;
    };
};

module.exports = Pack;

},{"../data/birdData":1}],5:[function(require,module,exports){
const rarityScale = {
    'V.Rare': 25,
    'Rare': 20,
    'Uncommon': 15,
    'Common': 10
}

class Score {
    constructor(pack, collectedItems) {
        this.collectedItems = collectedItems;
        this.pack = pack;
        this.score = 0;
    };

    getScore() {
        this.score = 0;
        const data = this.pack.sections;

        this.collectedItems.forEach(collectedItem => {
           data.forEach(section => {
               section.items.forEach(item => {
                   if(collectedItem === item.id){
                       this.score = this.score + rarityScale[item.rarity];
                   }
               })
            })
        });

        return this.score;
    };
};

module.exports = Score;

},{}],6:[function(require,module,exports){
const renderCard = (section, cardData, addCardFunction) => {
        document.querySelector(`#${section}`).insertAdjacentHTML('beforeEnd', makeCard(cardData));
        document.querySelector(`#checkbox-${cardData.id}`).addEventListener("click", () => {
            addCardFunction(cardData.id);
    });
};

const changeCollectedState = (id, addOrRemove) => {
    if(addOrRemove === 'add'){
        document.getElementById(id).classList.add('collected');
    } else {
        document.getElementById(id).classList.remove('collected');
    }
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


},{}],7:[function(require,module,exports){
const renderSections = (data) => {
  data.forEach(section => {
    document.querySelector('#root').insertAdjacentHTML('beforeEnd', addSection(section.title, section.sectionID));
  }); 
};

const addSection = (sectionTitle, sectionID) => {
  return `
    <section>
      <h1>${sectionTitle}</h1>
      <div  class="card-group"  id='${sectionID}'>
      </div>
    </section>`;
};

module.exports = renderSections;

},{}]},{},[2]);
