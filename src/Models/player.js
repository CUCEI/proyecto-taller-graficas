export default class Player extends Phaser.Sprite {
    constructor(game, key) {
        super(game, (game.world.width / 2) - 16, game.world.height - 150, key);

        game.add.existing(this);

        game.physics.arcade.enable(this);
        this.scale.setTo(1.5, 1.5);

        this.health = 3;
        this.body.bounce.y = 0.1;
        this.body.gravity.y = 1000;
        this.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        this.animations.add('left', [0, 1, 2, 3], 10, true);
        this.animations.add('right', [5, 6, 7, 8], 10, true);

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    moveRight() {
        //  Move to the right
        this.body.velocity.x = 500;

        this.animations.play('right');
    }

    moveLeft() {
        //  Move to the left
        this.body.velocity.x = -500;

        this.animations.play('left');
    }

    stopMovement() {
        //  Stand still
        this.animations.stop();

        this.frame = 4;
    }

    listenForKeysToMove(cursors) {
        if (cursors.left.isDown)
        {
            this.moveLeft();
            this.holdTrashCanIfGrabbing('left');
        }
        else if (cursors.right.isDown)
        {
            this.moveRight();
            this.holdTrashCanIfGrabbing('right');
        }
        else
        {
            this.stopMovement();
            this.holdTrashCanIfGrabbing();
        }
    }

    revive() {
        this.reset((game.world.width / 2) - 16, game.world.height - 150, 3);
    }

    grabTrashCan(trashCan) {
        this.grabbedTrashCan = trashCan;
    }

    leaveTrashCan() {
        this.grabbedTrashCan = null;
    }

    toggleTrashCanGrab(trashCan) {
        if (this.grabbedTrashCan && this.grabbedTrashCan == trashCan) {
            this.leaveTrashCan();
            return false;
        } else if (! this.grabbedTrashCan) {
            this.grabTrashCan(trashCan);
            return true;
        }
    }

    holdTrashCanIfGrabbing(position) {
        if (! this.grabbedTrashCan) {
            return false;
        }

        switch (position) {
            case 'left':
                this.grabbedTrashCan.body.position.x = this.body.position.x;
                break;
            case 'right':
                this.grabbedTrashCan.body.position.x = this.body.position.x + ((this.body.width) - (this.grabbedTrashCan.body.width));
                break;
            default:
                this.grabbedTrashCan.body.position.x = this.body.position.x + ((this.body.width / 2) - (this.grabbedTrashCan.body.width / 2));
        }

        this.grabbedTrashCan.body.position.y = this.body.position.y + ((this.body.height / 2) - (this.grabbedTrashCan.body.height / 2)) + 10;
    }

    enableTrashCanOverlapGrab(trashCans) {
        this.spaceKey.onDown.add(() => {
            this.game.physics.arcade.overlap(this, trashCans, (player, trashCan) => {
                this.toggleTrashCanGrab(trashCan);
            });
        });
    }
}
