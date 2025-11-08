import kaboom from "../lib/kaboom.mjs"

export const scale=2;
export const k=kaboom({
    canvas:document.querySelector("#mycanvas"),
    width:320*scale,
    height:160*scale,
    scale,
    //letterbox:true,//to maintain the aspect ratio of the canvas
    global:false,
});

k.loadSprite("player-idle","../assets/sprites/hero/Idle.png",{
    sliceX:8,
    sliceY:1,
    anims:{
        idle:{from:0,to:7,loop:true},
    }
});

k.loadSprite("player-attack","../assets/sprites/hero/Attack1.png",{
    sliceX:6,
    sliceY:1,
    anims:{
        attack:{from:0,to:5,speed:15},
    },
});
k.loadSprite("player-fall","../assets/sprites/hero/Fall.png",{
    sliceX:2,
    sliceY:1,
    anims:{
        fall:{from:0,to:1,loop:true},
    }
});
k.loadSprite("player-jump","../assets/sprites/hero/Jump.png",{
    sliceX:2,
    sliceY:1,
    anims:{
        jump:{from:0,to:1,},
    }
});
k.loadSprite("player-run","../assets/sprites/hero/Run.png",{
    sliceX:8,
    sliceY:1,
    anims:{
        run:{from:0,to:7,loop:true},
    }
});
k.loadSprite("player-hit","../assets/sprites/hero/Hit.png",{
    sliceX:4,
    sliceY:1,
    anims:{
        hit:{from:0,to:3},
    }
});
k.loadSprite("player-death","../assets/sprites/hero/Death.png",{
    sliceX:6,
    sliceY:1,
    anims:{
        death:{from:0,to:5},
    }
});


let isAttacking = false

// attack on spacebar
k.onKeyPress("space", () => {
        if (isAttacking) return
        isAttacking = true
        
        // Save current position
        const currentPos = player.pos.clone()
        
        // Switch to attack sprite
        player.use(k.sprite("player-attack"))
        player.pos = currentPos
        player.play("attack")
        
        // After attack animation, go back to idle
        k.wait(0.4, () => {
                player.use(k.sprite("player-idle"))
                player.pos = currentPos
                player.play("idle")
                isAttacking = false
        })
})
k.loadSprite("level1","../maps/level1.png")
