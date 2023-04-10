class Labo extends Phaser.Scene {
    constructor() {
        super("Labo");
        this.player_invulnerable = false;
    }
    init(data){
        this.coX = data.x 
        this.coY = data.y
    }
    preload() {
        this.load.image("UI","Assets/ui.png");
        this.load.image('Tileset1', 'assets/maps/newstileset.png');

        this.load.spritesheet('player', 'assets/sprites/supercat_sprites.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Chests', 'assets/sprites/Chests.png',
            { frameWidth: 32, frameHeight: 32 });

            this.load.spritesheet('enemy', 'assets/sprites/Robot_Mouse-sheet.png',
            { frameWidth: 32, frameHeight: 32 });


        this.load.tilemapTiledJSON('tilemap2', 'assets/maps/ZL_ZONE_SECRETE_2.json')

    }


    create() {


        this.player;
        this.enemy;
        this.hp = 100;
        //this.npc;



        // TILED - load la map
        const map = this.make.tilemap({ key: 'tilemap2' })
        const tileset = map.addTilesetImage('newstileset', 'Tileset1')
        const Teleportation = map.createLayer(
            "Calque 8 Teleportation",
            tileset,
        )
        const tp = map.createLayer(
            "Calque 9 tp",
            tileset,
        )

        this.Sol = map.createLayer('Calque 1 Sol', tileset)
        this.murnoir = map.createLayer('Calque 2 Collision', tileset)
        this.Deco1 = map.createLayer('Calque 3 Décoration 1', tileset)
        this.Deco2 = map.createLayer('Calque 4 Décoration 2', tileset)
        this.Deco3 = map.createLayer('Calque 5 Décoration 3', tileset)
        this.Ciel = map.createLayer('Calque 6 Ciel', tileset)
        this.Ciel.setDepth(2);
        this.SurCiel = map.createLayer('Calque 7 SurCiel', tileset)
        this.SurCiel.setDepth(3);
        



        this.player = this.physics.add.sprite(this.coX, this.coY, 'player').setSize(15,25).setOffset(7,5);
        this.player.setDepth(1)

        this.enemy = this.physics.add.sprite(43 * 16, 49 * 16, 'enemy').setSize(18,23).setOffset(11,8);
        this.enemy.setDepth(1);

        //this.enemy = enemy = this.physics.add.sprite(155 * 16, 287 * 16, 'enemy');
        //this.enemy.setCollideWorldBounds(true);
        //this.enemy.setDepth(1);




        this.murnoir.setCollisionByProperty({ estSolide: true });
        this.physics.add.collider(this.player, this.murnoir);
        this.Deco1.setCollisionByProperty({ estSolide: true });
        this.physics.add.collider(this.player, this.Deco1);
        this.Deco2.setCollisionByProperty({ estSolide: true });
        this.physics.add.collider(this.player, this.Deco2);
        this.Deco3.setCollisionByProperty({ estSolide: true });
        this.physics.add.collider(this.player, this.Deco3);

        this.murnoir.setCollisionByProperty({ estSolide: true });
        this.physics.add.collider(this.enemy, this.murnoir);
        this.Deco1.setCollisionByProperty({ estSolide: true });
        this.physics.add.collider(this.enemy, this.Deco1);
        this.Deco2.setCollisionByProperty({ estSolide: true });
        this.physics.add.collider(this.enemy, this.Deco2);
        this.Deco3.setCollisionByProperty({ estSolide: true });
        this.physics.add.collider(this.enemy, this.Deco3);

        this.physics.add.collider(this.player, this.enemy, this.handlePlayerEnemyCollision, null, this);
        // ...

        Teleportation.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, Teleportation, this.changeScene, null, this);

        tp.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, tp, this.changeScene2, null, this);

        this.clavier = this.input.keyboard.addKeys('S,Q,D,Z,SPACE,SHIFT');

        // Create interact button
        this.interactButton = this.input.keyboard.addKey('E');

        this.camera = this.cameras.main.setSize(1600, 900);

        this.camera.startFollow(this.player);
        this.camera.setDeadzone(100, 100);
        this.camera.setBounds(0, 0, 100 * 16, 100 * 16);
        this.cameras.main.zoom = 1.8


        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.add.sprite(480,280, "UI").setScale(0.8).setScrollFactor(0).setDepth(4);
        
    }
    handlePlayerEnemyCollision() {
        if (this.player_invulnerable == false) {this.hp -= 1 ; console.log("- 1 HP");
        this.player_invulnerable = true;
        this.sleep(1000).then(() => {

            setTimeout(()=>{
            console.log("testHit")
            this.player_invulnerable= false
            },1000);
            }
            )}
    
        if (this.hp === 0) {
            this.player.setTint(0xff0000)
            this.handlePlayerDeath();
        }
       
            }  
    update() {
        var distance = Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemy.setVelocityX(this.player.x-this.enemy.x)
            this.enemy.setVelocityY(this.player.y-this.enemy.y)
        }
        else{this.enemy.setVelocity(0)}

        if (this.clavier.Z.isDown) {
            this.player.setVelocityY(-260);
            this.player.anims.play('up',true);
    
        }
        else if (this.clavier.S.isDown) {
            this.player.setVelocityY(260);
            this.player.anims.play('down',true);
        }
        else {this.player.setVelocityY(0)
            
        }
        

        if (this.clavier.Q.isDown) {
            this.player.setVelocityX(-260);
            this.player.anims.play('left', true);
        }
        else if (this.clavier.D.isDown) {
            this.player.setVelocityX(260);
            this.player.anims.play('right',true);
        }
        else {
            this.player.setVelocityX(0)
            
        }
        if(Math.abs(this.player.body.velocity.x) < 1 && Math.abs(this.player.body.velocity.y) < 1){
            this.player.anims.play("idle",true )
            }
    }
    handlePlayerEnemyCollision() {
        this.hp -= 10
        this.player.setTint(0xff0000);
        if (this.hp <= 0) {
            this.handlePlayerDeath();
        };
    }
    handlePlayerDeath() {
        this.scene.start("Labo",  {x: 51 * 16, y: 74 * 16});
    }
    changeScene() {
        this.scene.start("monjeu", { x: 86 * 16, y: 4 * 16 })

    }
    changeScene2(){
        this.scene.start("monjeu", { x: 215 * 16, y: 4 * 16 })
    }
}