import Phaser from 'phaser';

// fix size to window size

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let ball;
let cursors;

function resizeGame(gameObject) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    game.scale.resize(w, h);
    gameObject.physics.world.setBounds(0, 0, w, h);
}

// Note to self: this part onwards (below this comment) are functions that sits in a Phaser.scene module and is connected via 
// scene: {
//     preload: preload,
//     create: create,
//     update: update
// }
// Part of the config. So "this" refers to shit created in Phaser.scene object that is with Phaser.io library.

function preload() {
    // Load assets (none needed for basic shape)
}

function create() {
    // Set game size
    window.addEventListener('resize', () => resizeGame(this));

    // Create red ball graphics
    const ballGraphics = this.add.graphics();
    ballGraphics.fillStyle(0xff0000, 1);
    ballGraphics.fillCircle(20, 20, 20);
    ballGraphics.generateTexture('ball', 40, 40);
    ballGraphics.destroy();

    // Create ball
    ball = this.physics.add.sprite(400, 300, 'ball');

    // Set ball physics properties
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);
    ball.setVelocity(Phaser.Math.Between(-200, 200), -300);

    // Add keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Add simple paddle control with arrow keys
    if (cursors.left.isDown) {
        ball.setVelocityX(-300);
    } else if (cursors.right.isDown) {
        ball.setVelocityX(300);
    }
}