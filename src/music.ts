export default class MusicPlayer {
    private notes: { [key: string]: Phaser.Sound.BaseSound };
    private soundCounter: number;
    private songNotes: string[];

    constructor() {
        this.notes = {};
        this.soundCounter = 0;
        this.songNotes = []
    }

    public loadNotes(gameObject: Phaser.Scene): void {
        gameObject.load.audio('C3', '../notes/c3.mp3');
        gameObject.load.audio('C-3', '../notes/c-3.mp3');
        gameObject.load.audio('D3', '../notes/d3.mp3');
        gameObject.load.audio('D-3', '../notes/d-3.mp3');
        gameObject.load.audio('E3', '../notes/e3.mp3');
        gameObject.load.audio('F3', '../notes/f3.mp3');
        gameObject.load.audio('F-3', '../notes/f-3.mp3');
        gameObject.load.audio('G3', '../notes/g3.mp3');
        gameObject.load.audio('G-3', '../notes/g-3.mp3');
        gameObject.load.audio('A3', '../notes/a3.mp3');
        gameObject.load.audio('A-3', '../notes/a-3.mp3');
        gameObject.load.audio('B3', '../notes/b3.mp3');

        gameObject.load.audio('C4', '../notes/c4.mp3');
        gameObject.load.audio('C-4', '../notes/c-4.mp3');
        gameObject.load.audio('D4', '../notes/d4.mp3');
        gameObject.load.audio('D-4', '../notes/d-4.mp3');
        gameObject.load.audio('E4', '../notes/e4.mp3');
        gameObject.load.audio('F4', '../notes/f4.mp3');
        gameObject.load.audio('F-4', '../notes/f-4.mp3');
        gameObject.load.audio('G4', '../notes/g4.mp3');
        gameObject.load.audio('G-4', '../notes/g-4.mp3');
        gameObject.load.audio('A4', '../notes/a4.mp3');
        gameObject.load.audio('A-4', '../notes/a-4.mp3');
        gameObject.load.audio('B4', '../notes/b4.mp3');

        gameObject.load.audio('C5', '../notes/c5.mp3');
        gameObject.load.audio('C-5', '../notes/c-5.mp3');
        gameObject.load.audio('D5', '../notes/d5.mp3');
        gameObject.load.audio('D-5', '../notes/d-5.mp3');
        gameObject.load.audio('E5', '../notes/e5.mp3');
        gameObject.load.audio('F5', '../notes/f5.mp3');
        gameObject.load.audio('F-5', '../notes/f-5.mp3');
        gameObject.load.audio('G5', '../notes/g5.mp3');
        gameObject.load.audio('G-5', '../notes/g-5.mp3');
        gameObject.load.audio('A5', '../notes/a5.mp3');
        gameObject.load.audio('A-5', '../notes/a-5.mp3');
        gameObject.load.audio('B5', '../notes/b5.mp3');

        gameObject.load.audio('C6', '../notes/c5.mp3');

    }

    public initializeNotes(gameObject: Phaser.Scene): void {
        this.notes = {
            'C3': gameObject.sound.add('C3'),
            'C-3': gameObject.sound.add('C-3'),
            'D3': gameObject.sound.add('D3'),
            'D-3': gameObject.sound.add('D-3'),
            'E3': gameObject.sound.add('E3'),
            'F3': gameObject.sound.add('F3'),
            'F-3': gameObject.sound.add('F-3'),
            'G3': gameObject.sound.add('G3'),
            'G-3': gameObject.sound.add('G-3'),
            'A3': gameObject.sound.add('A3'),
            'A-3': gameObject.sound.add('A-3'),
            'B3': gameObject.sound.add('B3'),
            'C4': gameObject.sound.add('C4'),
            'C-4': gameObject.sound.add('C-4'),
            'D4': gameObject.sound.add('D4'),
            'D-4': gameObject.sound.add('D-4'),
            'E4': gameObject.sound.add('E4'),
            'F4': gameObject.sound.add('F4'),
            'F-4': gameObject.sound.add('F-4'),
            'G4': gameObject.sound.add('G4'),
            'G-4': gameObject.sound.add('G-4'),
            'A4': gameObject.sound.add('A4'),
            'A-4': gameObject.sound.add('A-4'),
            'B4': gameObject.sound.add('B4'),
            'C5': gameObject.sound.add('C5'),
            'C-5': gameObject.sound.add('C-5'),
            'D5': gameObject.sound.add('D5'),
            'D-5': gameObject.sound.add('D-5'),
            'E5': gameObject.sound.add('E5'),
            'F5': gameObject.sound.add('F5'),
            'F-5': gameObject.sound.add('F-5'),
            'G5': gameObject.sound.add('G5'),
            'G-5': gameObject.sound.add('G-5'),
            'A5': gameObject.sound.add('A5'),
            'A-5': gameObject.sound.add('A-5'),
            'B5': gameObject.sound.add('B5'),
            'C6': gameObject.sound.add('C6'),
        };
    }

    private playNote(note: string): void {
        if (this.notes[note]) {
            this.notes[note].play();
        } else {
            console.warn(`Note "${note}" not found.`);
        }
    }

    public playSongNote(): void {
        if (this.songNotes.length === 0) {
            console.warn("uninitialized song notes. Call initializeSong first");
        }

        this.playNote(this.songNotes[this.soundCounter % this.songNotes.length]);
        this.soundCounter++
    }

    public initializeSong(songNotes: string[]): void {
        this.songNotes = songNotes
    }
}
