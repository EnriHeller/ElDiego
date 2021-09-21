export class Game extends Phaser.Scene {
    constructor(){
        super({key: "game"});
    }

    preload() {
        this.load.image("background", "./images/998448.jpg");
        this.load.image("gameover", "./images/Captura de pantalla 2021-04-14 230014.png");
        this.load.image("platform", "./images/platform-png-7.png");
        this.load.image("ball", "./images/bola.png");
    }

    create() {
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.add.image(400, 250, "background");
        this.gameoverImage = this.add.image(400,90, "gameover");
        this.gameoverImage.visible = false;

        this.platform = this.physics.add.image(400,460, "platform").setImmovable();
        this.platform.body.allowGravity = false;
        this.platform.setCollideWorldBounds(true);


        this.ball = this.physics.add.image(400,30,"ball");
        this.ball.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        let velocity = 100 * Phaser.Math.Between(1.3, 2);
        if(Phaser.Math.Between(0, 10) > 5){
            velocity = 0 - velocity;
        }
        this.ball.setVelocity(velocity,10)

        this.physics.add.collider(this.ball, this.platform);
        this.ball.setBounce(1)
    }

    update() {
        if(this.cursors.left.isDown){
            this.platform.setVelocityX(-300);
        }else if(this.cursors.right.isDown){
            this.platform.setVelocityX(300);
        }else{
            this.platform.setVelocity(0);
        }

        if(this.ball.y > 500){
            this.gameoverImage.visible = true;
            this.scene.pause()
        }
    }
}

