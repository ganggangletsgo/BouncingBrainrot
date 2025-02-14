let notes
let soundCounter = 0

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

