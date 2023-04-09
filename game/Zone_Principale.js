class monjeu extends Phaser.Scene {
    constructor() {
        super("monjeu");
    }
    init(data){
        this.coX = data.x 
        this.coY = data.y
    }
    preload() {
        this.load.image('Tileset1', 'assets/maps/newstileset.png');
        this.load.image("UI","Assets/ui.png");
        this.load.image("background", "Assets/maps/ZL_MAP_PRINCIPAL.png");

        this.load.spritesheet('player', 'assets/sprites/supercat_sprites.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Chests', 'assets/sprites/Chests.png',
            { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('enemy', 'assets/sprites/Robot_Mouse-sheet.png',
            { frameWidth: 32, frameHeight: 32 });


        this.load.tilemapTiledJSON('tilemap', 'assets/maps/ZL_MAP_PRINCIPAL.json')

    }


    create() {


        this.player;
        this.enemy;
        this.hp = 100;


        this.add.image(300,300,"background");


        // TILED - load la map
        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('newstileset', 'Tileset1')
        const Teleportation = map.createLayer(
            "Calque 8 Teleportation",
            tileset,
        )
        const tp2 = map.createLayer(
            "Calque 9 tp1",
            tileset,
        )
        const tp3 = map.createLayer(
            "Calque 10 tp2",
            tileset,
        )
        const tp4 = map.createLayer(
            "Calque 11 tp3",
            tileset,
        )
        const tp5 = map.createLayer(
            "Calque 12 tp4",
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
        //this.Teleportation = map.createLayer('Calque 8 Teleportation', tileset)

        if(this.coX && this.coY){
            this.player = this.physics.add.sprite(this.coX, this.coY, 'player').setSize(15,25).setOffset(7,5);
        }
        else{
        this.player = this.physics.add.sprite(155 * 16, 297 * 16, 'player').setSize(15,25).setOffset(7,5);
        }
        this.player.setDepth(1);

        this.enemy = this.physics.add.sprite(155 * 16, 249 * 16, 'enemy').setSize(18,23).setOffset(11,8);
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

        //TELEPORTEUR DE CHANGEMENT DE SCENE DE LA SALLE 1

        Teleportation.setCollisionByExclusion (-1, true);
        this.physics.add.collider(this.player, Teleportation,this.changeScene, null, this);

        tp2.setCollisionByExclusion (-1, true);
        this.physics.add.collider(this.player, tp2,this.changeScene2, null, this);
        
        //TELEPORTEUR DE CHANGEMENT DE SCENE DE LA SALLE 2
        tp3.setCollisionByExclusion (-1, true);
        this.physics.add.collider(this.player, tp3,this.changeScene3, null, this);

        tp4.setCollisionByExclusion (-1, true);
        this.physics.add.collider(this.player, tp4,this.changeScene4, null, this);

        //TELEPORTEUR DE CHANGEMENT DE SCENE 3

        tp5.setCollisionByExclusion (-1, true);
        this.physics.add.collider(this.player, tp5,this.changeScene5, null, this);

        this.clavier = this.input.keyboard.addKeys('S,Q,D,Z,SPACE,SHIFT');
        this.add.image(this.player.x+333*16 ,450*16 , "UI").setScale(1).setScrollFactor(0);

        // Create interact button
        this.interactButton = this.input.keyboard.addKey('E');

        this.camera = this.cameras.main.setSize(1600, 900);

        this.camera.startFollow(this.player);
        this.camera.setDeadzone(100, 100);
        this.camera.setBounds(0, 0, 299 * 16, 299 * 16);
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


        this.anims.create({
            key: 'right_mob',
            frames: this.anims.generateFrameNumbers('enemy', { start: 4, end: 6}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left_mob',
            frames: this.anims.generateFrameNumbers('enemy', { start: 7, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_mob',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.add.image(this.player.x+ 155,289, "UI").setScale(1).setScrollFactor(0);
    }

    update() {
        var distance = Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.player.x, this.player.y);
        if(distance < 300){
            this.enemy.setVelocityX(this.player.x-this.enemy.x)
            this.enemy.setVelocityY(this.player.y-this.enemy.y)
            
        }
        else{this.enemy.setVelocity(0)
            this.enemy.anims.play('right_mob')
        }

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
            console.log("test")
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
    changeScene(){
        this.scene.start("Dortoire",{x: 96 * 16, y: 95 * 16},)
    }
    changeScene2(){
        this.scene.start("Dortoire", {x: 97 * 16, y: 6 * 16})
    }
    changeScene3(){
        this.scene.start("Labo", {x: 5 * 16, y: 96 * 16})
    }
    changeScene4(){
        this.scene.start("Labo", {x: 95 * 16, y: 96 * 16})
    }
    changeScene5(){
        this.scene.start("Hall", {x: 2 * 16, y: 58 * 16})
    }
}