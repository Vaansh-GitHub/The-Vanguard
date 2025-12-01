import { blink } from "./common.js";

export function makeBoss(k, player) {
    return k.make([
        k.pos(),
        k.sprite("villain-idle", { anim: "idle" }),
        k.area({
            shape: new k.Rect(k.vec2(0, 10), 20, 40),
            collisionIgnore: [],
        }),
        k.body({ gravityScale: 0 }),
        k.anchor("center"),
        k.health(10),
        k.state("idle", ["idle", "follow", "attack"]),
        "boss",
        k.opacity(1),
        {
            speed: 100,
            setPosition: function (x, y) {
                this.pos.x = x;
                this.pos.y = y;
            },
            disableControls() {
                for (const handler of this.controlHandlers) {
                    handler.cancel();
                }
            },
            usePreserveSprite: function(name) {
                    const prevFlip = this.flipX;
                    this.use(k.sprite(name));
                    this.flipX = prevFlip;
            },
            setBehaviour: function () {
                this.onStateEnter("idle", async () => {
                    this.collisionIgnore = [];

                    this.flipX = player.pos.x <= this.pos.x;
                    k.wait(1, async () => {
                        this.use(k.sprite("villain-disappear"))
                        this.collisionIgnore = ["player", "attack-hitbox"];
                        await this.play("disappear")
                        k.wait(Math.floor(2 + Math.random() * 5), () => {
                            this.enterState("follow")
                        })
                    })
                })
                this.onStateEnter("follow", async () => {

                    this.moveTo(player.pos.x - 30, player.pos.y);
                    k.wait(1, async () => {
                        this.use(k.sprite("villain-appear"))
                        this.collisionIgnore = ["player", "attack-hitbox"];
                        await this.play("appear")

                        k.wait(0.5, () => {
                            this.enterState("attack")
                        })
                    })
                })
                this.onStateEnter("attack", async () => {
                    if (this._isPerformingAttack) return;
                    this._isPerformingAttack = true;
                    this.collisionIgnore = ["player", "attack-hitbox"];
                    this.use(k.sprite("villain-attack"))
                    const bossHitBox = this.add([
                        k.pos(this.flipX ? -25 : 0, 10),
                        k.area({ shape: new k.Rect(k.vec2(0, -30), 60, 45) }),
                        "boss-hitbox",
                    ]);
                    await this.play("attack")
                    // destroy hitbox after animation window
                    k.wait(0.7, () => {
                        if (bossHitBox && bossHitBox.exists()) bossHitBox.destroy();
                        this._isPerformingAttack = false;
                        this.enterState("idle")
                    })
                })
                this.onCollide("attack-hitbox", () => {
                    this.hurt(1);
                    console.log("Boss hp", this.hp());
                })
                this.on("hurt", async () => {
                    blink();
                    if (this.hp() === 0) {
                        await player.disableControls();
                        this.collisionIgnore = ["player"];
                        this.unuse("body")
                        this.use(k.sprite("villain-death"))
                        await this.play("death");
                        k.wait(1.5,()=>{
                            this.destroy()
                            k.go("final")
                            if (k && k.bgMusic && typeof k.bgMusic.stop === "function") {
                                k.bgMusic.stop();
                                k.bgMusic = null;
                            }
                            k.bgMusic = k.play("victory");
                        })
                    }
                })
            },
            setEvents: function () {

            },
        },
    ])
}