export default class cart extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);

        game.add.existing(this);

        game.physics.arcade.enable(this);

        this.body.bounce.y = 0.1;
        this.body.gravity.y = 1000;
        this.body.collideWorldBounds = true;
    }

    moveRight() {
        //  Move to the right
        this.body.velocity.x = 50;

        this.animations.play('right');
    }

    moveLeft() {
        //  Move to the left
        this.body.velocity.x = -150;

        this.animations.play('left');
    }

}
