// ifsh prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = 2;
    }


update() {
    this.x -= this.moveSpeed;
    if(this.x <= 0 - this.width) {
        this.reset();
    }
}

reset() {
    //randomize trash sprite as well
    let rand = Math.floor(Math.random() * game.config.height);
    this.x = game.config.width;
    this.y = rand;
}


}