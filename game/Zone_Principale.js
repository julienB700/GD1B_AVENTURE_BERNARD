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

        this.load.spritesheet('player', 'assets/sprites/supercat_sprites.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Chests', 'assets/sprites/Chests.png',
            { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('enemy', 'assets/sprites/robot.sprites.png',
            { frameWidth: 32, frameHeight: 32 });


        this.load.tilemapTiledJSON('tilemap', 'assets/maps/ZL_MAP_PRINCIPAL.json')

    }


    create() {


        this.player;
        this.enemy;

        //this.npc;



        // TILED - load la map
        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('newstileset', 'Tileset1')
        const Teleportation = map.createLayer(
            "Calque 8 Teleportation",
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

        Teleportation.setCollisionByExclusion (-1, true);
        this.physics.add.collider(this.player, Teleportation,this.changeScene, null, this);
        

        this.clavier = this.input.keyboard.addKeys('S,Q,D,Z,SPACE,SHIFT');

        // Create interact button
        this.interactButton = this.input.keyboard.addKey('E');

        this.camera = this.cameras.main.setSize(1600, 900);

        this.camera.startFollow(this.player);
        this.camera.setDeadzone(100, 100);
        this.camera.setBounds(0, 0, 299 * 16, 299 * 16);
        this.cameras.main.zoom = 2



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
            frames: this.anims.generateFrameNumbers('enemy', { start: 1, end: 6}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left_mob',
            frames: this.anims.generateFrameNumbers('enemy', { start: 8, end: 13 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up_mob',
            frames: this.anims.generateFrameNumbers('enemy', { start: 1, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down_mob',
            frames: this.anims.generateFrameNumbers('enemy', { start: 8, end: 13 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_mob',
            frames: this.anims.generateFrameNumbers('enemy', { start: 14, end: 17 }),
            frameRate: 4,
            repeat: -1
        });

    }

    update() {
        //if (Phaser.Math.Distance.Between(enemy.x, enemy.y, player.x, player.y) > 100) {
        //	this.physics.moveToObject(enemy, player, 100);
        //}
        //else {
        //	enemy.body.setVelocity(0, 0);
        //	// attack player if close enough
        //	if (Phaser.Math.Distance.Between(enemy.x, enemy.y, player.x, player.y) < 50) {
        //		player.setTint(0xff0000);
        //	}
        //	else {
        //		player.clearTint();
        //	}
        //}


        if (this.clavier.Z.isDown) {
            this.player.setVelocityY(-260);
            this.player.anims.play('up', true);
        }
        else if (this.clavier.S.isDown) {
            this.player.setVelocityY(260);
            this.player.anims.play('down', true);
        }
        else {this.player.setVelocityY(0)}

        if (this.clavier.Q.isDown) {
            this.player.setVelocityX(-260);
            this.player.anims.play('left', true);
        }
        else if (this.clavier.D.isDown) {
            this.player.setVelocityX(260);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0)
            this.player.anims.play('idle', true);
        }

    }
    changeScene(){
        this.scene.start("Dortoire")
    }
}