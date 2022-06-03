class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('submarine', './assets/submarine.png');
        this.load.image('shark', './assets/shark.png');
        this.load.image('rocket','./assets/rocket.png');
        this.load.image('background', './assets/underwater.png');

        this.load.audio('music', './assets/backmusic.wav');

        //spritesheets
        this.load.spritesheet('explosion','./assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9})
        this.load.spritesheet('damage', './assets/submarinehurt.png', {frameWidth: 59, frameHeight: 64, startFrame: 0, endFrame: 5});

    }
    
    create(){

        let scoreConfig = {
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

        // place tile sprite
        this.underwater = this.add.tileSprite(0, 0, 640, 480, 'background'). setOrigin(0,0);
        //create player and obstacles

        //create submarine
        this.submarine = new Submarine(this, game.config.width/3 + 25, game.config.height/2, 'submarine').setOrigin(0.5, 0.5)
        //create shark
        this.shark = new Shark(this, 10, game.config.height/2, 'shark').setOrigin(0, 0.5)
        //create rocket
        this.rocket01 = new Rocket(this, game.config.width, game.config.height/2, 'rocket').setOrigin(0.5, 0.5);
        this.rocket02 = new Rocket(this, game.config.width, game.config.height/2, 'rocket').setOrigin(0.5, 0.5);

        this.clock = this.time.delayedCall(15000, () => {
            this.rocket03 = new Rocket(this, game.config.width, game.config.height/2, 'rocket').setOrigin(0.5, 0.5);
            three = true;
        }, null, this);

        var music = this.sound.add('music');
        music.setLoop(true);
        music.play();

        //define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //config animations
        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('damage', {start: 0, end: 4, first: 0}),
            frameRate: 12
        });
        this.anims.create({
            key: 'chomp',
            frames: this.anims.generateFrameNumbers('sharkChomp', {start: 0, end: 4, first: 0}),
            frameRate: 12
        });

        this.p1Score = 0;
        this.timer = 0;
        
        // GAME OVER flag
        this.gameOver = false;

        this.score = this.add.text(0,0, this.p1Score, scoreConfig);

    }

    update(time, delta){
        this.timer += delta;
        while (this.timer > 1000 && !this.gameOver) {
            this.p1Score += 1;
            this.score.text = this.p1Score;
            this.timer -= 1000;
        }
        if(this.shark.x <= -15)
        {
            this.shark.x += 2;
        } else
        if (!this.gameOver) {
            this.underwater.tilePositionX += 4;
            this.submarine.update();
            this.rocket01.update();
            this.rocket02.update();
            if(three)
            {
                this.rocket03.update();
                if(this.checkCollision(this.submarine, this.rocket03)){
                    this.submarine.recoil();
                    this.submarineHurt(this.submarine);
                    this.rocket03.reset();
                }
            }
            if(this.shark.y != this.submarine.y)
            {
                this.shark.y = this.submarine.y;
            }
            //shark's follwing delay
            
            if(this.checkCollision(this.submarine, this.rocket01)){
                this.submarine.recoil();
                this.submarineHurt(this.submarine);
                this.rocket01.reset();
            }
            if(this.checkCollision(this.submarine, this.rocket02)){
                this.submarine.recoil();
                this.submarineHurt(this.submarine);
                this.rocket02.reset(); 
            }
            if(this.checkCollision(this.submarine, this.shark)){
                //
                this.sharkBite(this.shark, this.submarine)
                this.gameOver = true
            }
        }else
        {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER - Press ENTER to restart', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
            if(Phaser.Input.Keyboard.JustDown(keyENTER)) {
                this.game.sound.stopAll();
                this.scene.restart();
            }
        }
    }

    checkCollision(player, enemy) {
        if(player.x < enemy.x + enemy.width &&
           player.x + player.width > enemy.x &&
           player.y < enemy.y + enemy.height &&
           player.height + player.y > enemy. y) {
               return true;
           } else {
               return false;
           }
    }


    submarineHurt(submarine){
        this.input.keyboard.enabled = false;
        // temporarily hide player
        submarine.alpha = 0;
        // create explosion sprite at player position 
        let pain = this.add.sprite(submarine.x, submarine.y, 'hurt').setOrigin(0.5, 0.5);
        pain.anims.play('hurt');
        pain.on('animaioncomplete',() => {
            submarine.alpha = 1;
            pain.destroy();
        });
        this.sound.play('movement');
        this.input.keyboard.enabled = true;
    }
    
    sharkBite(shark, fish){
        // temporarily hide player
        shark.alpha = 0;                         
        // create explosion sprite at player position
        let chomp = this.add.sprite(shark.x, shark.y, 'chomp').setOrigin(0, 0.5);
        chomp.anims.play('chomp');
        chomp.on('animationcomplete', () => {
            fish.alpha = 0;
            chomp.destroy();
        });
        this.sound.play('movement');
        shark.alpha = 1; 
    }
}