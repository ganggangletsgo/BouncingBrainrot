import Phaser from "phaser";
import * as simpleSongs from "../songs/simplesongs";
import MusicPlayer from "./music";
import { createBall, createRing } from "./create";

// fix size to window size
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300, x: 0 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
const musicPlayer = new MusicPlayer();
let balls;
let ring;
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
  musicPlayer.loadNotes(this);
  console.log("hello");
}

function create() {
  musicPlayer.initializeNotes(this);
  musicPlayer.initializeSong(simpleSongs.furElise);

  // Set game size
  window.addEventListener("resize", () => resizeGame(this));

  // Create initial red ball
  balls = createBall(this, 0xff0000, 20, 1);
  ring = createRing(this, 300);

  // Set up ball collisions using Phaser's physics system
  this.physics.add.collider(balls, ring, onCollideWithRing);

  // Ball to Ring collision
  function onCollideWithRing(ball, ring) {
    musicPlayer.playSongNote();
  }

  // Function to enable world bounds detection for a given ball
  function enableWorldBounds(ball) {
    ball.setCollideWorldBounds(true);
    ball.setBounce(1);
    ball.body.onWorldBounds = true;
  }

  // Enable world bounds for the initially created balls
  balls.children.iterate((ball) => {
    enableWorldBounds(ball);
  });

  // Add world bounds collision event
  this.physics.world.on("worldbounds", (body) => {
    if (body.gameObject) {
      const ball = body.gameObject;

      //   // Create a new ball at a random position
      //   let newBall = balls.create(
      //     Phaser.Math.Between(100, 700),
      //     300,
      //     ball.texture.key
      //   );
      //   newBall.setVelocity(Phaser.Math.Between(-200, 200), -300);
      musicPlayer.playSongNote();

      // Apply physics properties to new ball
      //   enableWorldBounds(newBall);
    }
  });

  // Add keyboard controls
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    balls.setVelocityX(-300);
  } else if (cursors.right.isDown) {
    balls.setVelocityX(300);
  }
}
