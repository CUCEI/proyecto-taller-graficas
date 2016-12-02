export default () => {
    let platforms;
    let player;
    let cursors;
    let numero = 1;
    const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload() {
            game.load.image('sky', '/dist/sky.png');
            game.load.image('ground', '/dist/platform.png');
            game.load.image('star', '/dist/star.png');
            game.load.spritesheet('dude', '/dist/dude.png', 32, 48);
        },
        create() {
            //  We're going to be using physics, so enable the Arcade Physics system
            game.physics.startSystem(Phaser.Physics.ARCADE);
            cursors = game.input.keyboard.createCursorKeys();


            //  A simple background for our game
            game.add.sprite(0, 0, 'sky');

            //  The platforms group contains the ground and the 2 ledges we can jump on
            platforms = game.add.group();

            //  We will enable physics for any object that is created in this group
            platforms.enableBody = true;

            // Here we create the ground.
            const ground = platforms.create(0, game.world.height - 64, 'ground');

            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            ground.scale.setTo(2, 2);

            //  This stops it from falling away when you jump on it
            ground.body.immovable = true;

            //  Now let's create two ledges
            const backGround = platforms.create(0, game.world.height - 256, 'ground');
            backGround.scale.setTo(2, 6);

            backGround.body.immovable = true;
            backGround.tint = 0x999999;

            // The player and its settings
            player = game.add.sprite(32, game.world.height - 150, 'dude');

            //  We need to enable physics on the player
            game.physics.arcade.enable(player);

            //  Player physics properties. Give the little guy a slight bounce.
            player.body.bounce.y = 0.1;
            player.body.gravity.y = 1000;
            player.body.collideWorldBounds = true;

            //  Our two animations, walking left and right.
            player.animations.add('left', [0, 1, 2, 3], 10, true);
            player.animations.add('right', [5, 6, 7, 8], 10, true);
        },
        update() {
            //  Collide the player and the stars with the platforms
            let hitPlatform = game.physics.arcade.collide(player, platforms);
            player.body.velocity.x = 0;

            if (cursors.left.isDown)
            {
                //  Move to the left
                player.body.velocity.x = -150;

                player.animations.play('left');
            }
            else if (cursors.right.isDown)
            {
                //  Move to the right
                player.body.velocity.x = 150;

                player.animations.play('right');
            }
            else
            {
                //  Stand still
                player.animations.stop();

                player.frame = 4;
            }
        },
    });
}
