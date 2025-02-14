export function createBall(scene: Phaser.Scene, colour: number, radius: number, number: number) {
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
        collideWorldBounds: true
    });

    // Create multiple balls
    for (let i = 0; i < number; i++) {
        let ball = balls.create(200 + i * 100, 300, textureKey);
        ball.setBounce(1);
        ball.setCollideWorldBounds(true);
        ball.setVelocity(Phaser.Math.Between(-200, 200), -300);
    }

    return balls;
}