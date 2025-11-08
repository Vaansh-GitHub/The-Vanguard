import { initializePlayerStateManager } from "./playerStateManager.js"
export function makePlayer(k) {
    const state = initializePlayerStateManager(k);
    console.log(state.getState());


    return k.make([
        k.pos(),
        k.sprite("player-idle"),
        k.area({
            shape: new k.Rect(k.vec2(0, 18), 30, 28),
        }),
        k.body({ mass: 50, jumpForce: 450 }),
        k.anchor("center"),//tells from where all the game obj are centered
        "player",
        k.doubleJump(1),
        k.health(state.getState().playerHP),
        {
            speed: 150,
            setPosition: function (x, y) {
                this.pos.x = x;
                this.pos.y = y;
            },
            setControls: function () {
                this.controlHandlers = []
                console.log(state.getState());

                this.controlHandlers.push(
                    k.onKeyPress((key) => {
                    if (key === "w" && !this.isAttacking && this.isGrounded()) {
                            if (this.curAnim() !== "jump"){
                                this.use(k.sprite("player-jump"))
                                this.play("jump");
                            }
                            this.doubleJump();
                            k.wait(0.7, () =>{
                                this.use(k.sprite("player-idle"))
                                this.play("idle");
                                console.log('Player idle after attack');
                                
                            });
                        }
                        if (key === "space" && this.isGrounded() && !this.isAttacking) {
                            this.isAttacking = true;
                            this.use(k.sprite("player-attack"))
                            const attackHitBox=this.add([
                                k.pos(this.flipX ? -25 : 0, 10),
                                k.area({ shape: new k.Rect(k.vec2(0, -30), 90, 45) }),
                                "attack-hitbox",
                            ])
                            this.play("attack");
                            k.wait(0.4, () => {
                                attackHitBox.destroy();
                                this.isAttacking = false;
                                this.use(k.sprite("player-idle"))
                                this.play("idle");
                                console.log('Player idle after attack');
                                
                            });
                        }
                    }))
                this.controlHandlers.push(
                    k.onKeyDown((key) => {
                        if (key === "a" && !this.isAttacking) {
                            if (this.curAnim() !== "run" && this.isGrounded()) {
                                this.use(k.sprite("player-run"))
                                this.play("run");
                            }
                            this.flipX = true;
                            this.move(-this.speed, 0);
                            return;
                        }
                        if (key === "d" && !this.isAttacking) {
                            if (this.curAnim() !== "run" && this.isGrounded()) {
                                this.use(k.sprite("player-run"))
                                this.play("run");
                            }
                            this.flipX = false;
                            this.move(this.speed, 0);
                            return;
                        }
                    }))
                this.controlHandlers.push(
                    k.onKeyRelease(() => {
                        if (
                            this.curAnim() !== "attack" &&
                            this.curAnim() !== "jump" &&
                            this.curAnim() !== "fall") {

                            this.use(k.sprite("player-idle"))
                            this.play("idle");
                        }
                    })
                )
            }
        }
    ])
}