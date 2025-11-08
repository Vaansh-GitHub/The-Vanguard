export function setColliders(k, map, colliders) {
    colliders = colliders[0]; // Extract the array of collider objects
    for (const collider of colliders) {
        if (collider.polygon) {
            //Code to store coordinates of polygon as 2d vectors
            const coordinates = []
            for (let point of collider.polygon) {
                coordinates.push(k.vec2(point.x, point.y));
            }

            map.add([
                k.pos(collider.x, collider.y),
                k.area({
                    shape: new k.Polygon(coordinates),
                    collisionIgnore:["collider"],
                }),
                k.body({ isStatic: true }),
                "collider",
                collider.type,
            ])
            continue;
        }
        else{
            map.add([
            k.pos(collider.x, collider.y),
            k.area({
                    shape: new k.Rect(k.vec2(0,0),collider.width,collider.height),
                    collisionIgnore:["collider"],
            }),
            k.body({ isStatic: true }),
            "collider",
            collider.type
        ])
        }
    }
}