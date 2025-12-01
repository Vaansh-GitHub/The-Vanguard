export function makeNotificationBox(k, content,wid,ht) {
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