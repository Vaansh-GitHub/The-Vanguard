import { blink, stopMusic } from "./common.js";

export function makeBoss(k, player) {
    return k.make([
        k.scale(0.8),
        k.pos(),
        k.sprite("boss3-idle", { anim: "idle" }),
        k.area({
            shape: new k.Rect(k.vec2(0, 50), 50, 60),
            collisionIgnore: [],
        }),
        k.body({}),
        k.anchor("center"),
        k.health(1),
        k.state("idle", ["idle", "follow", "attack", "stop-attacking", "attacking"]),
        "boss",
        k.opacity(1),
        {
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
                this.onStateEnter("idle", () => {
                    this.collisionIgnore = ["player"];
                    if (this.hp() != 0) {
                        this.usePreserveSprite("boss3-idle");
                        this.play("idle");
                        k.wait(2, () => {
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
                        k.area({ shape: new k.Rect(k.vec2(this.flipX ? 0 : -110, -30), 110, 50) }),
                        "boss-hitbox",
                    ]);

                    k.wait(1.2, () => {
                        this.enterState("stop-attacking");
                    })
                });

                this.onStateEnd("stop-attacking", () => {
                    const bossHitBox = k.get("boss-hitbox", { recursive: true })[0];
                    if (bossHitBox) k.destroy(bossHitBox);
                });

                this.onStateEnter("stop-attacking", () => {
                    this.collisionIgnore = ["player"];
                    this.enterState("idle");
                });

                this.onCollide("attack-hitbox", () => {
                    this.hurt(1);
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
                            k.go("final")
                            stopMusic(k, k.bgMusic);
                            k.bgMusic = k.play("victory");
                        })
                    }
                })
            },
            setEvents: function () {
                this.onAnimEnd((anim) => {
                    if (anim === "attack") {
                        this.enterState("stop-attacking");
                    }
                });
            },
        },
    ])
}