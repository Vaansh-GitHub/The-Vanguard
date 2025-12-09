import kaboom from "../lib/kaboom.mjs"

export const scale = 2;
export const k = kaboom({
    canvas: document.querySelector("#mycanvas"),
    width: 320 * scale,
    height: 160 * scale,
    scale,
    //letterbox:true,//to maintain the aspect ratio of the canvas
    global: false,
});

//Player
k.loadSprite("player-idle", "../assets/sprites/hero/Idle.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        idle: { from: 0, to: 7, loop: true },
    }
});
k.loadSprite("player-attack", "../assets/sprites/hero/Attack1.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
        attack: { from: 0, to: 5, speed: 15 },
    },
});
k.loadSprite("player-fall", "../assets/sprites/hero/Fall.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
        fall: { from: 0, to: 1, loop: true },
    }
});
k.loadSprite("player-jump", "../assets/sprites/hero/Jump.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
        jump: { from: 0, to: 1, loop: true },
    }
});
k.loadSprite("player-run", "../assets/sprites/hero/Run.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        run: { from: 0, to: 7, loop: true },
    }
});
k.loadSprite("player-hit", "../assets/sprites/hero/Hit.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        hit: { from: 0, to: 3 },
    }
});
k.loadSprite("player-death", "../assets/sprites/hero/Death.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
        death: { from: 0, to: 5 },
    }
});

//Skeleton
k.loadSprite("skeleton-idle", "../assets/sprites/skeleton/Idle.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        idle: { from: 0, to: 3, loop: true },
    }
});
k.loadSprite("skeleton-attack", "../assets/sprites/skeleton/Attack.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        attack: { from: 0, to: 7, speed: 15 },
    }
});
k.loadSprite("skeleton-walk", "../assets/sprites/skeleton/Walk.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        walk: { from: 0, to: 3, loop: true },
    }
});
k.loadSprite("skeleton-death", "../assets/sprites/skeleton/Death.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        death: { from: 0, to: 3 },
    }
});
k.loadSprite("skeleton-hit", "../assets/sprites/skeleton/Take Hit.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        hit: { from: 0, to: 3 },
    }
});

//Boss 1
k.loadSprite("villain-idle", "../assets/sprites/villain/idle.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
        idle: { from: 0, to: 3, loop: true },
    }
});
k.loadSprite("villain-attack", "../assets/sprites/villain/attacking.png", {
    sliceX: 6,
    sliceY: 3,
    anims: {
        attack: { from: 0, to: 12, speed: 20 },
    }
});
k.loadSprite("villain-death", "../assets/sprites/villain/death.png", {
    sliceX: 10,
    sliceY: 2,
    anims: {
        death: { from: 0, to: 19 },
    }
});
k.loadSprite("villain-appear", "../assets/sprites/villain/summonAppear.png", {
    sliceX: 3,
    sliceY: 2,
    anims: {
        appear: { from: 0, to: 5, speed: 12 },
    }
});
k.loadSprite("villain-disappear", "../assets/sprites/villain/summonDeath.png", {
    sliceX: 3,
    sliceY: 2,
    anims: {
        disappear: { from: 0, to: 5, speed: 12 },
    }
});

//Player 2
k.loadSprite("player2-idle", "../assets/sprites/hero2/Idle.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        idle: { from: 0, to: 7, loop: true },
    }
});
k.loadSprite("player2-jump", "../assets/sprites/hero2/Jump.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
        jump: { from: 0, to: 1, loop: true },
    }
});
k.loadSprite("player2-fall", "../assets/sprites/hero2/Fall.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
        fall: { from: 0, to: 1, loop: true },
    }
});
k.loadSprite("player2-run", "../assets/sprites/hero2/Run.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        run: { from: 0, to: 7, loop: true },
    }
});
k.loadSprite("player2-hit", "../assets/sprites/hero2/Take hit.png", {
    sliceX: 3,
    sliceY: 1,
    anims: {
        hit: { from: 0, to: 2, },
    }
});
k.loadSprite("player2-death", "../assets/sprites/hero2/Death.png", {
    sliceX: 7,
    sliceY: 1,
    anims: {
        death: { from: 0, to: 6, },
    }
});
k.loadSprite("player2-attack1", "../assets/sprites/hero2/Attack1.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        attack: { from: 0, to: 7, },
    }
});
k.loadSprite("player2-attack2", "../assets/sprites/hero2/Attack2.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        attack: { from: 0, to: 7, },
    }
});

//Boss 2
k.loadSprite("boss2", "../assets/sprites/boss2/boss2_repacked.png", {
    sliceX: 7,
    sliceY: 7,
    anims: {
        idle: { from: 0, to: 15, loop: true },
        walk: { from: 16, to: 27, loop: true },
        attack: { from: 32, to: 47, },
    }
});

//Boss 3
k.loadSprite("boss3-idle", "../assets/sprites/boss3/boss3_idle.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
        idle: { from: 0, to: 5, loop: true },
    }
});
k.loadSprite("boss3-walk", "../assets/sprites/boss3/boss3_walk.png", {
    sliceX: 6,
    sliceY: 2,
    anims: {
        walk: { from: 0, to: 11, loop: true },
    }
});
k.loadSprite("boss3-attack", "../assets/sprites/boss3/boss3_attack.png", {
    sliceX: 5,
    sliceY: 3,
    anims: {
        attack: { from: 0, to: 14, },
    }
});
k.loadSprite("boss3-hit", "../assets/sprites/boss3/boss3_hit.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
        hit: { from: 0, to: 4, },
    }
});
k.loadSprite("boss3-death", "../assets/sprites/boss3/boss3_death.png", {
    sliceX: 6,
    sliceY: 4,
    anims: {
        death: { from: 0, to: 21, },
    }
});

//Goblin
k.loadSprite("goblin-idle", "../assets/sprites/goblin/Idle.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        idle: { from: 0, to: 3, loop: true },
    }
});
k.loadSprite("goblin-walk", "../assets/sprites/goblin/Run.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        walk: { from: 0, to: 7, loop: true },
    }
});
k.loadSprite("goblin-attack", "../assets/sprites/goblin/Attack.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        attack: { from: 0, to: 7, },
    }
});
k.loadSprite("goblin-death", "../assets/sprites/goblin/Death.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        death: { from: 0, to: 3, },
    }
});
k.loadSprite("goblin-hit", "../assets/sprites/goblin/Take hit.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        hit: { from: 0, to: 3, },
    }
});

//Mushroom
k.loadSprite("mushroom-idle", "../assets/sprites/mushroom/Idle.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        idle: { from: 0, to: 3, loop: true },
    }
});
k.loadSprite("mushroom-walk", "../assets/sprites/mushroom/Run.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        walk: { from: 0, to: 7, loop: true },
    }
});
k.loadSprite("mushroom-attack", "../assets/sprites/mushroom/Attack.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        attack: { from: 0, to: 7, },
    }
});
k.loadSprite("mushroom-death", "../assets/sprites/mushroom/Death.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        death: { from: 0, to: 3, },
    }
});
k.loadSprite("mushroom-hit", "../assets/sprites/mushroom/Take hit.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        hit: { from: 0, to: 3, },
    }
});

k.loadSprite("level1", "../maps/level1.png")
k.loadSprite("level2", "../maps/level2.png")
k.loadSprite("level3", "../maps/level3.png")
k.loadSprite("level4", "../maps/level4.png")
k.loadSprite("level5", "../maps/level5.png")
k.loadSprite("level6", "../maps/level6.png")
k.loadSprite("level7", "../maps/level7.png")
k.loadSound("backgroundSound", "../assets/sounds/Ballad of Ashenwood.mp3")
k.loadSound("errieMusic", "../assets/sounds/vgm-atmospheric-air.mp3")
k.loadSound("victory", "../assets/sounds/victory.mp3")
k.loadFont("fonts", "../assets/fonts.TTF")