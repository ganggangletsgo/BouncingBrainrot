import Phaser from 'phaser';
import * as simpleSongs from '../songs/simplesongs';

// fix size to window size
let notes
let soundCounter = 0

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300, x: 0 },
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
let balls;
let cursors;

function resizeGame(gameObject) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    game.scale.resize(w, h);
    gameObject.physics.world.setBounds(0, 0, w, h);
}

function onCollideWithBall(b1, b2) {
    b1.destroy();
    b2.destroy();
}

function onCollideWithWall(ball) {
    console.log("hello")
    let note = simpleSongs.twinkleTwinkle[soundCounter % simpleSongs.twinkleTwinkle.length]
    if (note) {
        notes[note].play();
    }
    soundCounter++


}

// Note to self: this part onwards (below this comment) are functions that sits in a Phaser.scene module and is connected via 
// scene: {
//     preload: preload,
//     create: create,
//     update: update
// }
// Part of the config. So "this" refers to shit created in Phaser.scene object that is with Phaser.io library.
function loadNotes(gameObject: Phaser.Scene) {
    gameObject.load.audio('C', '../notes/c4.mp3');
    gameObject.load.audio('C-', '../notes/c-4.mp3');
    gameObject.load.audio('D', '../notes/d4.mp3');
    gameObject.load.audio('D-', '../notes/d-4.mp3');
    gameObject.load.audio('E', '../notes/e4.mp3');
    gameObject.load.audio('F', '../notes/f4.mp3');
    gameObject.load.audio('F-', '../notes/f-4.mp3');
    gameObject.load.audio('G', '../notes/g4.mp3');
    gameObject.load.audio('G-', '../notes/g-4.mp3');
    gameObject.load.audio('A', '../notes/a4.mp3');
    gameObject.load.audio('A-', '../notes/a-4.mp3');
    gameObject.load.audio('B', '../notes/b4.mp3');
}

function preload() {
    loadNotes(this)
    console.log("hello")

}



function create() {
    notes = {
        'C': this.sound.add('C'),
        'C-': this.sound.add('C-'),
        'D': this.sound.add('D'),
        'D-': this.sound.add('D-'),
        'E': this.sound.add('E'),
        'F': this.sound.add('F'),
        'F-': this.sound.add('F-'),
        'G': this.sound.add('G'),
        'G-': this.sound.add('G-'),
        'A': this.sound.add('A'),
        'A-': this.sound.add('A-'),
        'B': this.sound.add('B')
    };


    soundCounter = 0
    this.input.keyboard.on('keydown-SPACE', () => {
        let note = simpleSongs.twinkleTwinkle[soundCounter % (simpleSongs.twinkleTwinkle.length)]
        if (note) {
            notes[note].play();
        }
        soundCounter++
    });

    // Set game size
    window.addEventListener('resize', () => resizeGame(this));

    // Create red ball graphics
    const ballGraphics = this.add.graphics();
    ballGraphics.fillStyle(0xff0000, 1);
    ballGraphics.fillCircle(20, 20, 20);
    ballGraphics.generateTexture('ball', 40, 40);
    ballGraphics.destroy();

    // Create ball
    balls = this.physics.add.group({
        allowGravity: true,
        bounceX: 1,
        bounceY: 1,
        collideWorldBounds: true,
        velocityY: -300,
        velocityX: Phaser.Math.Between(-200, 200),
    })
    // ball = this.physics.add.sprite(400, 300, 'ball');
    balls.createMultiple([
        { key: 'ball', quantity: 1, setXY: { x: 200, y: 300, stepX: 100 } },
    ])

    this.physics.add.collider(balls, balls, onCollideWithBall);

    // Add keyboard controls
    cursors = this.input.keyboard.createCursorKeys();

    // Add world bound collision event
    this.physics.world.on('worldbounds', ball => {
        console.log('kasjdh');
        balls.createMultiple([
            { key: 'ball', quantity: 1, setXY: { x: 200, y: 300, stepX: 100 } },
        ])
    });

    // this.physics.world.on('collide', (gameObject1, gameObject2) => {
    //     console.log('collision');
    //     gameObject1.destroy();
    //     gameObject2.destroy();
    //     // gameObject1.emit('collide', gameObject2);
    //     // gameObject2.emit('collide', gameObject1);
    // });
}

function update() {
    // Add simple paddle control with arrow keys
    // if (cursors.left.isDown) {
    //     ball.setVelocityX(-300);
    // } else if (cursors.right.isDown) {
    //     ball.setVelocityX(300);
    // }
}
