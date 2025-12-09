export function makeGoblin(k, initialPos) {
    return k.make([
        k.pos(initialPos),
        k.sprite("goblin-walk", { anim: "walk" }),
        k.area({
            shape: new k.Rect(k.vec2(0, -10), 20, 30),
            collisionIgnore: ["cameraZone"]
        }),
        k.body({ mass: 50 }),
        k.anchor("center"),//tells from where all the game obj are centered
        "creature",
        k.health(2),
        k.offscreen({ distance: 400 }),
        k.state("patrol-right", ["patrol-right", "patrol-left", "attack", "alert", "retreat"]),
        {
            speed: 20,
            pursuitSpeed: 40,
            range: 90,
            setBehaviour() {
                const player = k.get("player", { recursive: true })[0]//As the player is the part of map object hence it searches for it recursively
                this.onStateEnter("patrol-right", async () => {
                    await k.wait(3);
                    if (this.state === "patrol-right") {
                        this.enterState("patrol-left")
                    }
                });
                this.onStateUpdate("patrol-right", () => {
                    if (this.pos.dist(player.pos) < this.range) {
                        this.enterState("alert")
                        return;
                    }
                    this.flipX = false;
                    this.move(this.speed, 0);
                })//This Function will runs every frame all the time when the obj is in the particular state

                this.onStateEnter("patrol-left", async () => {
                    await k.wait(3);
                    if (this.state === "patrol-left") {
                        this.enterState("patrol-right")
                    }
                });
                this.onStateUpdate("patrol-left", () => {
                    if (this.pos.dist(player.pos) < this.range) {
                        this.enterState("alert")
                        return;
                    }
                    this.flipX = true;
                    this.move(-this.speed, 0);
                })

                this.onStateEnter("alert", async () => {
                    this.use(k.sprite("goblin-idle"))
                    this.play("idle");
                    this.flipX = player.pos.x <= this.pos.x;
                    await k.wait(1);
                    this.use(k.sprite("goblin-walk"))
                    this.play("walk")
                    if (this.pos.dist(player.pos) < this.range) {
                        this.enterState("attack");
                        return;
                    }

                    this.enterState("patrol-right");
                })

                this.onStateUpdate("attack", () => {//We want to attack state to take place without any entering in the state yet we can write it but we want it to start it immediately
                    if (this.pos.dist(player.pos) > this.range) {
                        this.enterState("alert")//again from alert --> patrol-right state
                        return;
                    }
                    this.flipX = player.pos.x <= this.pos.x;
                    this.moveTo(k.vec2(player.pos.x + 12, player.pos.y), this.pursuitSpeed)//Function offered by kaboom to body containing elements it takes position and then a speed 
                })
            },
            setEvents() {
                const player = k.get("player", { recursive: true })[0];
                // Attack repeatedly while player remains colliding/overlapping
                this._attackCooldown = 0;
                this._isPerformingAttack = false;
                //onUpdate() function runs on a component every 60 frames
                this.onUpdate(() => {
                    if (!player || !player.exists()) return;
                    // decrease cooldown every second
                    if (this._attackCooldown > 0) this._attackCooldown -= k.dt();

                    // if currently colliding with player and cooldown expired, perform an attack
                    if (this.isColliding(player) && this._attackCooldown <= 0) {
                        this._attackCooldown = 0.8; // seconds between attacks
                        // perform attack
                        this._isPerformingAttack = true;
                        this.use(k.sprite("goblin-attack"));
                        this.play("attack");
                        const offX = (player.pos.x <= this.pos.x ? -60 : 0);
                        const goblinHitBox = this.add([
                            k.pos(this.flipX ? -25 : 0, 10),
                            k.area({ shape: new k.Rect(k.vec2(offX, -30), 60, 45) }),
                            "goblin-hitbox",
                        ]);
                        // destroy hitbox after animation window
                        k.wait(0.7, () => {
                            if (goblinHitBox && goblinHitBox.exists()) goblinHitBox.destroy();
                            this.use(k.sprite("goblin-walk"));
                            this.play("walk");
                            this._isPerformingAttack = false;
                        });
                    }
                });
                this.on("die", () => {
                    this.collisionIgnore = ["player"];
                    this.unuse("body")
                    this.use(k.sprite("goblin-death"))
                    this.play("death");
                    k.wait(0.5, () => {
                        player.kills = player.kills + 1;
                        this.destroy();
                    })
                })
                this.onCollide("attack-hitbox", () => {
                    this.hurt(1);
                    this.use(k.sprite("goblin-hit"))
                    this.play("hit")
                    k.wait(0.3, () => {
                        if (this.hp() === 0) {
                            this.trigger("die");
                            return;
                        }
                    })
                })
            }
        }
    ])
}