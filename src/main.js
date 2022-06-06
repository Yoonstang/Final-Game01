/*
Spencer Kim

The Under Water - 6/2/2022

*/

let config = {
    type: Phaser.Auto,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Tutorial],
    physics: {
        default: 'arcade',
        arcade: {debug: true}
    }
}
let controls; 
let game = new Phaser.Game(config);
//keyboard
let keyENTER, keyUP, keyDOWN;
let three = false;



//ui size
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
