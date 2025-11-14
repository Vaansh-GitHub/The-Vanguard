export function makeBoss(k,player) {
    return k.make([
        k.pos(),
        k.area({
            shape: new k.Rect(k.vec2(0), 40, 60),
            collisionIgnore: [],
        }),
        k.scale(1.5),
        k.body({}),
        k.anchor("center"),
        k.health(2),
        "boss",
        {
            setPosition: function (x, y) {
                this.pos.x = x;
                this.pos.y = y;
            },
            spawnBoss: function (player) {
                this.use(k.sprite("villain-appear"))
                this.play("appear")
                k.wait(3, () => {
                    this.use(k.sprite("villain-idle"))
                    this.play("idle")
                    this.flipX=player.pos.x<=this.pos.x
                })
            }
        },

    ])
}