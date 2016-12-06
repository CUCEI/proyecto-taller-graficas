import Player from './Models/player';
import Trash from './Models/trash';
import TrashCan from './Models/trashCan';

export default () => {
    let platforms;
    let ground;
    let player;
    let trashCan;
    let trashGroup;
    let trashElements = {
        banana: null,
        bottle: null,
        paper: null,
    };
    let cursors;
    let score = 0;

    let spaceKey;
    let scoreBoard;
    let gameoverTile;
    let gameover = false;

    const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload(game) {
            game.load.image('sky', '/dist/sky.png');
            game.load.image('ground', '/dist/platform.png');
            game.load.image('banana', '/dist/banana.png');
            game.load.image('paper', '/dist/paper.png');
            game.load.image('bottle', '/dist/bottle.png');
            game.load.image('trash-can', '/dist/trash-can.png');
            game.load.spritesheet('dude', '/dist/dude.png', 32, 42);
        },
        create(game) {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            cursors = game.input.keyboard.createCursorKeys();

            game.add.sprite(0, 0, 'sky');

            platforms = game.add.group();
            platforms.enableBody = true;

            ground = platforms.create(0, game.world.height - 64, 'ground');
            ground.scale.setTo(2, 2);
            ground.body.immovable = true;

            const backGround = platforms.create(0, game.world.height - 256, 'ground');
            backGround.scale.setTo(2, 6);
            backGround.body.immovable = true;
            backGround.tint = 0x999999;

            player = new Player(game, 'dude');
            trashGroup = game.add.group();

            trashCan = new TrashCan(game, 'trash-can');

            Object.keys(trashElements).forEach((trashElementsKey) => {
                trashElements[trashElementsKey] = new Trash(game, trashElementsKey);
                trashGroup.add(trashElements[trashElementsKey]);
            });

            trashElements.banana.scale.setTo(.2, .2);
            trashElements.paper.scale.setTo(.2, .2);
            trashElements.bottle.scale.setTo(.4, .4);

            scoreBoard = game.add.text(20, 20, 'Score: ' + score, {
                font: '20px',
                fill: "#ffffff",
                align: "center",
            });
            gameoverTile = game.add.text(game.world.width / 2, game.world.height / 2, 'Game Over', {
                font: '40px',
                fill: "#ffffff",
                align: "center",
            });
            gameoverTile.anchor.setTo(.5, .5);
            gameoverTile.visible = false;

            throwRandomTrash();
            player.enableTrashCanOverlapGrab(trashCan);
        },
        update(game) {
            if (gameover) {
                gameoverTile.visible = true;
                return;
            }
            //  Collide the player and the stars with the platforms
            game.physics.arcade.collide(player, platforms);
            game.physics.arcade.collide(trashCan, platforms);

            game.physics.arcade.collide(trashGroup, ground, (ground, trash) => {
                throwNextTrash(trash);
            });

            game.physics.arcade.overlap(trashGroup, trashCan, (trashCan, trash) => {
                if (player.grabbedTrashCan && trash.key != 'banana') {
                    score++;
                    scoreBoard.text = 'Score: ' + score;
                    throwNextTrash(trash);
                } else if (trash.key == 'banana') {
                    gameover = true;
                }

            });
            player.body.velocity.x = 0;

            player.listenForKeysToMove(cursors);
        },
    });
    function getVisibleElement() {
        let trashKey = Object.keys(trashElements)
            .filter((elementKey) => trashElements[elementKey].exists)

        return trashElements[trashKey];
    }

    function throwNextTrash(trash) {
        trash.exists = false;
        throwRandomTrash();
    }

    function throwRandomTrash() {
        let trashIndex = Math.floor(Math.random() * 3);
        let trashKey = Object.keys(trashElements)[trashIndex];

        trashElements[trashKey].exists = true;
        trashElements[trashKey].throw();
    }

    function isAnyTrashVisible() {
        return !!Object.keys(trashElements)
            .filter((elementKey) => trashElements[elementKey].exists)
            .length;
    }
}
