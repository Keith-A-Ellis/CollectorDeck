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
