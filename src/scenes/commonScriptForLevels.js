export function setColliders(k, map, colliders) {
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
export function setCameraZones(k,map,cameras)
{
    for(let camera of cameras)
    {
        const cameraZone= map.add([
            k.pos(camera.x,camera.y),
            k.area({
                shape: new k.Rect(k.vec2(0,0),camera.width,camera.height),
                collisionIgnore:["cameraZone","collider",],
            }),
            k.body({ isStatic: true }),
            "cameraZone",
        ])
        
        if(camera.properties[0].name==="camPosX")
        {
            cameraZone.onCollide("player",()=>{
                if(k.camPos().x!==camera.properties[0].value)
                {
                    k.tween(k.camPos().x,
                           camera.properties[0].value,
                           0.7,
                           (value)=>{k.camPos(value,k.camPos().y)},
                           k.easings.linear
                    )
                }
            })
        }
        if(camera.properties[0].name==="camPosY")
        {
            cameraZone.onCollide("player",()=>{
                if(k.camPos().y!==camera.properties[0].value)
                {
                    k.tween(k.camPos().y,
                           camera.properties[0].value,
                           0.5,
                           (value)=>{k.camPos(k.camPos().x,value)},
                           k.easings.linear
                    )
                }
            })
        }
    }
}
export function setEntryAndExitPoints(k,map,player,exits)
{
    console.log(exits);
    for(let exit of exits)
    {
        if(exit.type==="start")
        {
            map.add([
                k.pos(exit.x,exit.y),
                k.area({
                    shape : new k.Rect(k.vec2(0,0),exit.width,exit.height),
                    collisionIgnore:["collider"] 
                }),
                k.body({isStatic:true}),
                "start"
            ])
        }
        if(exit.type==="exit-1")
        {
            map.add([
                k.pos(exit.x,exit.y),
                k.area({
                    shape : new k.Rect(k.vec2(0,0),exit.width,exit.height),
                    collisionIgnore:["collider"] 
                }),
                k.body({isStatic:true}),
                "exit-1"
            ])
        }
    }
}