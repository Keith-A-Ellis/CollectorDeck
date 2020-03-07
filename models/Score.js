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
