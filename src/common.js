export function makeNotificationBox(k, content, wid, ht) {
  const container = k.make([
    k.rect(wid, ht),
    k.color(k.Color.fromHex("#000000")),
    k.fixed(),
    k.pos(k.center()),
    k.area(),
    k.anchor("center"),
    {
      close() {
        k.destroy(this);
      },
    },
  ]);
  container.add([
    k.text(content, {
      font: "fonts",
      size: 14,
    }),
    k.color(k.Color.fromHex("#ffffff")),
    k.area(),
    k.anchor("center"),
  ]);

  return container;
}

export async function blink(k, entity, timespan = 0.1) {
  await k.tween(
    entity.opacity,
    0,
    timespan,
    (val) => (entity.opacity = val),
    k.easings.linear
  );
  k.tween(
    entity.opacity,
    1,
    timespan,
    (val) => (entity.opacity = val),
    k.easings.linear
  );
}
export function upgradePlayer(k, content, wid, ht) {
  const container = makeNotificationBox(k, content, wid, ht);
  const player = container.add([
    k.sprite("player2-idle"),
    k.area(),
    k.anchor("center"),
    k.pos(0, -60),
    k.fixed(),
  ])
  player.play("idle");
  return container;
}
export function stopMusic(k, music) {
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
}