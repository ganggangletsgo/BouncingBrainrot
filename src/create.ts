import * as Matter from "matter-js";

export function createBall(
  scene: Phaser.Scene,
  colour: number,
  radius: number,
  number: number
) {
  // Create a unique texture key
  const textureKey = `ball_${colour}_${radius}`;

  if (!scene.textures.exists(textureKey)) {
    // Create ball graphics
    const ballGraphics = scene.add.graphics();
    ballGraphics.fillStyle(colour, 1);
    ballGraphics.fillCircle(radius, radius, radius);
    ballGraphics.generateTexture(textureKey, radius * 2, radius * 2);
    ballGraphics.destroy();
  }

  // Create physics group
  let balls = scene.physics.add.group({
    allowGravity: true,
    bounceX: 1,
    bounceY: 1,
    collideWorldBounds: true,
  });

  // Create multiple balls
  // Center coordinates
  const centerX = scene.cameras.main.width / 2;
  const centerY = scene.cameras.main.height / 2;
  for (let i = 0; i < number; i++) {
    let ball = balls.create(centerX, centerY, textureKey);
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);
    ball.setVelocity(Phaser.Math.Between(-200, 200), -300);
  }

  return balls;
}

// Creates a hollow ring using multiple physics bodies that balls can pass through the center
export function createRing(scene: Phaser.Scene, radius: number) {
  // Center of the scene
  const centerX = scene.cameras.main.width / 2;
  const centerY = scene.cameras.main.height / 2;

  // Create physics group for ring segments
  const ringPhysics = scene.physics.add.staticGroup();

  const circum = 2 * Math.PI * radius;
  // Create multiple rectangular physics bodies around the circle to form a hollow ring
  const rectWidth = 20; // Width of each rectangle (radial direction)
  const numSegments = circum / rectWidth; // Number of segments to create the ring
  const rectHeight = 2; // Height of each rectangle (tangential direction)

  // Create a texture for the rectangles
  const rectTextureKey = "ringRect";
  if (!scene.textures.exists(rectTextureKey)) {
    const rectGraphics = scene.add.graphics();
    rectGraphics.fillStyle(0xffffff, 1); // White rectangles
    rectGraphics.fillRect(0, 0, rectWidth, rectHeight);
    rectGraphics.generateTexture(rectTextureKey, rectWidth, rectHeight);
    rectGraphics.destroy();
  }

  for (let i = 0; i < numSegments; i++) {
    const angle = (i / numSegments) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    // Create visible physics body using the rectangle texture
    const segment = ringPhysics.create(x, y, rectTextureKey);

    // Rotate the rectangle to face the center
    // Add 90 degrees (π/2) so the rectangle's width faces radially
    segment.setRotation(angle + Math.PI / 2);

    // Set rectangular physics body and ensure it's rotated to match the visual
    segment.body.setSize(rectWidth, rectHeight);
    // Rotate the physics body to match the visual rotation
    segment.body.rotation = angle + Math.PI / 2;
  }

  return ringPhysics;
}
