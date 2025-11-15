export function makePlayer(k) {
    return k.make([
        k.pos(),
        k.sprite("player-idle"),
        k.area({
            shape: new k.Rect(k.vec2(0), 20, 40),
        }),
        k.body({ mass: 50, jumpForce: 450 }),
        k.anchor("center"),//tells from where all the game obj are centered
        "player",
        k.doubleJump(1),
        k.health(5),
        {
            speed: 200,
            kills: 0,
            usePreserveSprite: function(name) {
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
                    k.onKeyPress((key) => {
                        if (key === "w" && !this.isAttacking && this.isGrounded()) {
                            if (this.curAnim() !== "jump") {
                                    this.usePreserveSprite("player-jump")
                                this.play("jump");
                            }
                            this.doubleJump();
                            return;
                        }
                        if (key === "space" && this.isGrounded() && !this.isAttacking) {
                            this.isAttacking = true;
                                this.usePreserveSprite("player-attack") 
                            const attackHitBox = this.add([
                                k.pos(0, 2),
                                k.area({ shape: new k.Rect(k.vec2(this.flipX?-25:0, -30), 90, 45) }),
                                "attack-hitbox",
                            ])
                            this.play("attack");
                            k.wait(0.4, () => {
                                attackHitBox.destroy();
                                this.isAttacking = false;
                                    this.usePreserveSprite("player-idle")
                                this.play("idle");
                            });
                        }
                    }))
                this.controlHandlers.push(
                    k.onKeyDown((key) => {
                        if (key === "a" && !this.isAttacking) {
                            if (this.curAnim() !== "run" && this.isGrounded()) {
                                  this.usePreserveSprite("player-run")
                                this.play("run");
                            }
                            this.flipX = true;
                            //this.lastFlipX = true;
                            this.move(-this.speed, 0);
                            return;
                        }
                        if (key === "d" && !this.isAttacking) {
                            if (this.curAnim() !== "run" && this.isGrounded()) {
                                  this.usePreserveSprite("player-run")
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
                                this.usePreserveSprite("player-idle")
                            this.play("idle");
                        }
                    })
                )
            },
            setEvents: function () {
                this.onCollide("skeleton-hitbox", () => {
                    this.hurt(1);
                        this.usePreserveSprite("player-hit")
                    this.play("hit")
                    k.wait(0.3, () => {
                        if (this.hp() === 0) {
                            this.trigger("die");
                            return;
                        }
                    })
                })
                this.onCollide("boss-hitbox", () => {
                    this.hurt(1);
                    this.use(k.sprite("player-hit"))
                    this.play("hit")
                    k.wait(0.3, () => {
                        if (this.hp() === 0) {
                            this.trigger("die");
                            return;
                        }
                    })
                })
                this.onCollide("boss",async ()=>{
                    this.hurt(1);
                    this.use(k.sprite("player-hit"))
                    await this.play("hit")
                    k.wait(0.3, () => {
                        if (this.hp() === 0) {
                            this.trigger("die");
                            return;
                        }
                    })
                })
                this.onFall(() => {
                    this.usePreserveSprite("player-fall")
                    this.play("fall");
                })
                this.onFallOff(() => {
                    this.usePreserveSprite("player-fall")
                    this.play("fall");
                })
                this.onGround(() => {
                    this.usePreserveSprite("player-idle")
                    this.play("idle");
                })
                this.onHeadbutt(() => {
                    this.usePreserveSprite("player-fall")
                    this.play("fall");
                })
                this.on("die", async () => {
                    this.collisionIgnore = ["skeleton","boss"];
                    this.use(k.sprite("player-death"));
                    await this.play("death");
                    k.wait(1.5, () => {
                        this.respawn("level1")
                    })
                })
                this.on("hurt", () => {
                    console.log(this.hp());
                })
                this.onCollide("exit", () => {
                    console.log("collided with exit " + this.kills);
                    if (this.kills === 4) {
                        this.respawn("level2");
                    }
                })

            },
            setPassThrough: function () {
                this.onBeforePhysicsResolve((collision) => {
                    if (collision.target.is("passthrough") && this.isJumping()) {
                        collision.preventResolution(); //for preventing collision resolution so that player can pass through
                    }
                    if (collision.target.is("cameraZone")) {
                        collision.preventResolution(); //for preventing collision resolution so that player can pass through
                    }
                    if (collision.target.is("skeleton")) {
                        collision.preventResolution(); //for preventing collision resolution so that player can pass through
                    }
                    if(collision.target.is("boss"))
                    {
                        collision.preventResolution();
                    }
                });
                //What is the problem happening with onBeforePhysicsResolve why isn't it working and giving me this error Cannot read properties of undefined (reading 'onBeforePhysicsResolve')

                // Let me check your playerLogic.js to see how you're using it: 

                // I see the issue. In your `setPassThrough` function, you're using an arrow function which changes the scope of `this`. That's why `this` is undefined when trying to access `onBeforePhysicsResolve`. Let's fix that by changing it to a regular function: 

                // The issue was that you were using an arrow function (`=>`) for the `setPassThrough` method. Arrow functions don't bind their own `this` value, so `this` was undefined when trying to access `onBeforePhysicsResolve`.

                // By changing it to a regular function using the `function()` syntax, `this` will correctly refer to the player object, giving you access to the `onBeforePhysicsResolve` method.

                // Also, let's check where you're calling `setPassThrough`. Make sure you're calling it after the player object is fully created. You should call it in level1.js like this: 

                // I see you're already calling `setPassThrough()` at the end of level1.js, which is good. The error should be fixed now by changing the arrow function to a regular function.

                // To summarize:
                // 1. The error was caused by using an arrow function for `setPassThrough` which lost the correct `this` context
                // 2. Changed it to a regular function to maintain proper `this` binding
                // 3. The method should now work correctly with the player object

                // Try running the game again - the passthrough collision detection should work properly now.
            },
            respawn: function (destinationName, previousSceneData = { exitName: null }, music) {
                // stop background music if available
                try {
                    // prefer music handle passed in
                    if (music && typeof music.stop === "function") {
                        music.stop();
                    }
                    // otherwise stop the stored bgMusic on k (set in level scenes)
                    else if (k && k.bgMusic && typeof k.bgMusic.stop === "function") {
                        k.bgMusic.stop();
                        k.bgMusic = null;
                    }
                } catch (e) {
                    console.warn("Could not stop background music:", e);
                }

                k.go(destinationName, previousSceneData);
            },
            disableControls:function(){

            },
        }
    ])
}