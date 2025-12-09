import { blink, stopMusic } from "./common.js";

export function makeBoss(k, player) {
    return k.make([
        k.scale(0.8),
        k.pos(),
        k.sprite("boss3-idle"),
        k.area({
            shape: new k.Rect(k.vec2(0, 50), 50, 60),
            collisionIgnore: [],
        }),
        k.body({}),
        k.anchor("center"),
        k.health(10),
        k.state("idle", ["idle", "follow", "attack", "stop-attacking", "attacking"]),
        "boss",
        k.opacity(1),
        {
            updateHealthBar() {
                if (this.healthTracker) {
                    this.healthTracker.destroy();
                }
                this.healthTracker = healthTracker(k, "Boss  HP  " + this.hp(), k.width() - 40, 25, 70, 10)
                k.add(this.healthTracker);
            },
            setPosition: function (x, y) {
                this.pos.x = x;
                this.pos.y = y;
            },
            usePreserveSprite: function (name) {
                const prevFlip = this.flipX;
                this.use(k.sprite(name));
                this.flipX = prevFlip;
            },
            setBehaviour: function () {
                this.updateHealthBar()
                this.onStateEnter("idle", () => {
                    this.collisionIgnore = ["player"];
                    if (this.hp() != 0) {
                        this.usePreserveSprite("boss3-idle");
                        this.play("idle");
                        k.wait(0.3, () => {//This delay is to prevent the boss from attacking the player
                            this.enterState("follow");
                        })
                    }
                });
                this.onStateEnter("follow", () => {
                    this.collisionIgnore = ["player"];
                    this.usePreserveSprite("boss3-walk");
                    this.play("walk");
                });

                this.onStateUpdate("follow", () => {
                    this.flipX = player.pos.x >= this.pos.x;
                    this.moveTo(k.vec2(player.pos.x + 60, this.pos.y), 100);//Here 100 is set as the speed of walking

                    if (this.pos.dist(player.pos) < 100) {
                        this.enterState("attack");
                    }
                });

                this.onStateEnter("attack", () => {
                    if (this._isAttacking) return;
                    this._isAttacking = true;

                    this.collisionIgnore = ["player"];
                    this.usePreserveSprite("boss3-attack");
                    this.play("attack");
                    k.wait(0.8, () => {
                        this.enterState("attacking");
                    })
                });
                this.onStateEnter("attacking", () => {
                    this.collisionIgnore = ["player"];
                    const bossHitBox = this.add([
                        k.pos(0, 50),
                        k.area({ shape: new k.Rect(k.vec2(this.flipX ? 0 : -130, -30), 130, 60) }),
                        "boss-hitbox",
                    ]);

                    bossHitBox.onUpdate(() => {
                        if (this.isColliding(player)) {
                            player.hurt(1);
                            player.usePreserveSprite("player2-hit");
                            player.play("hit");
                            k.wait(0.3, () => {
                                if (player.hp() === 0) {
                                    player.trigger("die");
                                    return;
                                }
                            })
                        }
                    })
                    k.wait(1, () => {
                        this.enterState("stop-attacking");
                    })
                });

                this.onStateEnter("stop-attacking", () => {
                    this._isAttacking = false;
                    this.collisionIgnore = ["player"];
                    const bossHitBox = k.get("boss-hitbox", { recursive: true })[0];
                    if (bossHitBox) k.destroy(bossHitBox);
                    this.enterState("idle");
                });

                this.onCollide("attack-hitbox", () => {
                    this.hurt(1);
                    this.updateHealthBar()
                    console.log("Boss hp", this.hp());
                })
                this.on("hurt", async () => {
                    this.usePreserveSprite("boss3-hit");
                    this.play("hit");
                    if (this.hp() === 0) {
                        await player.disableControls();
                        this.unuse("body")
                        this.use(k.sprite("boss3-death"))
                        await this.play("death");
                        k.wait(2, () => {
                            this.destroy()
                            k.go("level6")
                            stopMusic(k, k.bgMusic);
                            k.bgMusic = k.play("backgroundSound");
                        })
                    }
                })
            },
            setEvents: function () {

            },
        },
    ])
}