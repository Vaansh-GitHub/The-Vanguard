import { stopMusic } from "./common.js";
export function makePlayer(k) {
    return k.make([
        k.pos(),
        k.sprite("player2-idle"),
        k.scale(0.8),
        k.area({
            shape: new k.Rect(k.vec2(0, 20), 20, 40),
        }),
        k.body({ mass: 50, jumpForce: 500 }),
        k.anchor("center"),
        "player",
        k.doubleJump(1),
        k.health(5),
        {
            speed: 200,
            kills: 0,
            disableControls() {
                for (const handler of this.controlHandlers) {
                    handler.cancel();
                }
            },
            usePreserveSprite: function (name) {
                const prevFlip = this.flipX;
                this.use(k.sprite(name));
                this.flipX = prevFlip;
            },
            setPosition: function (x, y) {
                this.pos.x = x;
                this.pos.y = y;
            },
            setControls: function () {
                this.controlHandlers = []

                this.controlHandlers.push(
                    k.onKeyPress(async (key) => {
                        if (key === "w" && !this.isAttacking && this.isGrounded()) {
                            if (this.curAnim() !== "jump") {
                                this.usePreserveSprite("player2-jump")
                                await this.play("jump");
                            }
                            this.doubleJump();
                            return;
                        }
                        if (key === "space" && this.isGrounded() && !this.isAttacking) {
                            this.isAttacking = true;
                            this.usePreserveSprite("player2-attack1")
                            const attackHitBox = this.add([
                                k.pos(this.flipX ? -90 : 0, 2),
                                k.area({ shape: new k.Rect(k.vec2(0, -30), 120, 60) }),
                                "attack-hitbox",
                            ])
                            await this.play("attack");
                            k.wait(0.3, async () => {
                                this.usePreserveSprite("player2-attack2")
                                await this.play("attack")
                            })
                            k.wait(1.2, () => {
                                attackHitBox.destroy();
                                this.isAttacking = false;
                                this.usePreserveSprite("player2-idle")
                                this.play("idle");
                            });
                        }
                    }))
                this.controlHandlers.push(
                    k.onKeyDown((key) => {
                        if (key === "a" && !this.isAttacking) {
                            if (this.curAnim() !== "run" && this.isGrounded()) {
                                this.usePreserveSprite("player2-run")
                                this.play("run");
                            }
                            this.flipX = true;
                            //this.lastFlipX = true;
                            this.move(-this.speed, 0);
                            return;
                        }
                        if (key === "d" && !this.isAttacking) {
                            if (this.curAnim() !== "run" && this.isGrounded()) {
                                this.usePreserveSprite("player2-run")
                                this.play("run");
                            }
                            this.flipX = false;
                            //this.lastFlipX = false;
                            this.move(this.speed, 0);
                            return;
                        }
                    }))
                this.controlHandlers.push(
                    k.onKeyRelease(() => {
                        if (
                            this.curAnim() !== "attack" &&
                            this.curAnim() !== "jump" &&
                            this.curAnim() !== "fall" &&
                            this.isGrounded()) {

                            //this.flipX = this.lastFlipX;
                            this.usePreserveSprite("player2-idle")
                            this.play("idle");
                        }
                    })
                )
            },
            setEvents: function () {
                // this.onUpdate(() => {
                //     const bossHitBox = k.get("boss-hitbox", { recursive: true })[0];
                //     if (bossHitBox && this.isColliding(bossHitBox)) {
                //         console.log("Collided with Boss-Hitbox")
                //     }
                // })
                this.onCollide("skeleton-hitbox", () => {
                    this.hurt(1);
                    this.usePreserveSprite("player2-hit")
                    this.play("hit")
                    k.wait(0.3, () => {
                        if (this.hp() <= 0) {
                            this.trigger("die");
                            return;
                        }
                    })
                })
                this.onCollide("boss-hitbox", () => {
                    this.hurt(1);
                    this.usePreserveSprite("player2-hit")
                    this.play("hit")
                    k.wait(0.3, () => {
                        if (this.hp() <= 0) {
                            this.trigger("die");
                            return;
                        }
                    })
                })
                this.onCollide("boss", () => {
                    this.hurt(1);
                    this.usePreserveSprite("player2-hit")
                    this.play("hit")
                    k.wait(0.3, () => {
                        if (this.hp() <= 0) {
                            this.trigger("die");
                            return;
                        }
                    })
                })
                this.onCollide("skeleton", async () => {
                    this.hurt(1);
                    this.usePreserveSprite("player2-hit")
                    this.play("hit")
                    k.wait(0.3, () => {
                        if (this.hp() <= 0) {
                            this.trigger("die");
                            return;
                        }
                    })
                })
                this.onFall(() => {
                    this.usePreserveSprite("player2-fall")
                    this.play("fall");
                })
                this.onFallOff(async () => {
                    this.usePreserveSprite("player2-fall")
                    await this.play("fall");
                })
                this.onGround(() => {
                    this.usePreserveSprite("player2-idle")
                    this.play("idle");
                })
                this.onHeadbutt(async () => {
                    this.usePreserveSprite("player2-fall")
                    await this.play("fall");
                })
                this.on("die", async () => {
                    this.disableControls();
                    this.collisionIgnore = ["skeleton", "boss"];
                    this.usePreserveSprite("player2-death");
                    this.play("death");
                    k.wait(1.5, () => {
                        this.respawn("level4")
                    })
                })
                this.on("hurt", () => {
                    console.log("Player HP", this.hp());
                    this.usePreserveSprite("player2-hit");
                    this.play("hit");
                    k.wait(0.5, () => {
                        if (this.hp() <= 0) {
                            this.trigger("die");
                        }
                    });
                })
                this.onCollide("dump", () => {
                    this.respawn("level4");
                })
                this.onCollide("door", () => {
                    stopMusic(k, k.bgMusic)
                    k.go("level7");
                })

            },
            setPassThrough: function () {
                this.onBeforePhysicsResolve((collision) => {
                    if (collision.target.is("passthrough") && this.isJumping()) {
                        collision.preventResolution();
                    }
                    if (collision.target.is("cameraZone")) {
                        collision.preventResolution();
                    }
                    if (collision.target.is("skeleton")) {
                        collision.preventResolution();
                    }
                    if (collision.target.is("boss")) {
                        collision.preventResolution();
                    }
                });
            },
            respawn: function (destinationName, previousSceneData = { exitName: null }) {
                stopMusic(k, k.bgMusic);
                k.go(destinationName, previousSceneData);
            },
        }
    ])
}