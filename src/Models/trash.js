export default class Trash extends Phaser.Sprite {
    constructor(game, key) {
        super(game, game.rnd.integerInRange(32, game.world.width - 32), game.world.height - 300, key);

        game.add.existing(this);

        game.physics.arcade.enable(this);

        this.exists = false;
        this.body.bounce.y = 0.1;
        this.body.gravity.y = 1600;
        this.body.collideWorldBounds = true;
    }
    throw() {
        this.body.position.x = this.game.rnd.integerInRange(100, this.game.world.width - 100);
        this.body.position.y = this.game.world.height - 300;
        this.body.velocity.x = this.game.rnd.integerInRange(-50, 50);
        this.body.velocity.y = -800;
    }
}
