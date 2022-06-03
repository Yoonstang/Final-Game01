class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    preload(){
        //preload menu assets and sound effects here
        this.load.audio('damage', './assets/damagenoise.wav');
        this.load.audio('backmusic', './assets/horrorambience.wav');
        this.load.audio('movement', './assets/movmentnoise.wav');
        this.load.image('background', './assets/underwater.png');

    }

    create(){

        //text config if applicable 
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#38939d',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
    
        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Press ENTER to Start Tutorial', menuConfig).setOrigin(0.5);

        //define keys;
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    }

    update(){
        if(this.keyEnter.isDown) {  
        //play enter sound
            //skips intro
        this.scene.start("tutorialScene");
        this.sound.play('movement');
        }
    }
}

