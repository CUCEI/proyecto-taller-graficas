export default class TrashCan extends Phaser.Sprite {
    constructor(game, key) {
        super(game, game.world.width / 2 - 100, game.world.height - 150, key);

        game.add.existing(this);

        game.physics.arcade.enable(this);

        this.scale.setTo(.15, .15);
        this.tint = 0x0000ff;
        this.body.bounce.y = 0.5;
        this.body.gravity.y = 1200;
        this.body.collideWorldBounds = true;
    }
}
