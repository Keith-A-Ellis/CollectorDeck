const getData = require('../data/birdData');

class Pack {
    constructor(packName){
        this.pack = packName;
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

    getCardAmount() {
        let totalCards = 0;

        this.getSections().forEach(section => {
            totalCards += section.items.length;
        })

        return totalCards;
    };
};

module.exports = Pack;
