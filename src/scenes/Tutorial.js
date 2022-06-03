class Tutorial extends Phaser.Scene {
    constructor(){
        super("tutorialScene");
    }

    preload(){
        this.load.image('submarine', './assets/submarine.png');
        this.load.image('shark', './assets/shark.png');
        this.load.image('rocket','./assets/rocket.png');
        this.load.image('background', './assets/underwater.png');
        //key images
        //warning images
    }

    create(){
        //place tile sprite
        this.underwater = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0);
        //create player and obstacles

        //create submarine
        this.submarine = new Submarine(this, 0, game.config.height/2, 'submarine').setOrigin(0.5, 0.5)
        //create shark
        this.rocket01 = new Rocket(this, game.config.width, game.config.height/2, 'rocket').setOrigin(0.5, 0.5);
        //create any ui that goes on top 
        controls = this.add.sprite(game.config.width/3, game.config.height/2, 'controls');
        controls.alpha = 0.0;

        this.clock = this.time.delayedCall(2000, () => {
            controls.alpha = 1.0;
            this.input.keyboard.enabled = true;
        }, null, this);
        //define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //config animations

        this.p1Score = 0;

        //tutorial length
        this.clock = this.time.delayedCall(8000, () => {
            this.scene.start("playScene");
        }, null, this);
    }
    update(){
        this.underwater.tilePositionX += 4;
        if(this.submarine.x <= game.config.width/3)
        {
            this.input.keyboard.enabled = false;
            this.submarine.x += 2;
        } else
        {
            this.input.keyboard.enabled = true;
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP) || Phaser.Input.Keyboard.JustDown(keyDOWN))
        {
            controls.alpha = 0,0;
        }
        this.submarine.update();
        this.rocket01.update();

        if(this.checkCollision(this.submarine, this.rocket01)){

            this.submarine.recoil();
            this.rocket01.reset();
        }
    }

    checkCollision(player, enemy){
        if(player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.height + player.y > enemy. y) {
                return true;
            } else {
                return false;
            }
    }
}