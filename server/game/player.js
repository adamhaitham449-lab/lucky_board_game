class Player {

    constructor(id, name) {

        this.id = id;

        this.name = name;

        this.money = 1500;

        this.position = 0;

        this.properties = [];

        this.inJail = false;

        this.jailTurns = 0;

        this.color = this.randomColor();

    }

    randomColor() {

        const colors = [
            "#ff4757",
            "#1e90ff",
            "#2ed573",
            "#ffa502",
            "#e84393",
            "#00cec9"
        ];

        return colors[Math.floor(Math.random() * colors.length)];

    }

}

module.exports = Player;