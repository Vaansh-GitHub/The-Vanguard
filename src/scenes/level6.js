import { makePlayer } from "../player2Logic.js";
import { setColliders, setCameraControls, setEntryAndExitPoints } from "./commonScriptForLevels.js"
export function level6(k, level6Data) {
    k.camScale(1);
    k.camPos(400, 290);
    k.setGravity(1000);
    const levellayers = level6Data.layers;

    const map = k.add([k.pos(0, 0), k.sprite("level6")])
    const colliders = []
    const positions = []
    const exits = []
    for (let layer of levellayers) {
        if (layer.name === "positions") {
            positions.push(...layer.objects)
        }
        if (layer.name === "colliders") {
            colliders.push(...layer.objects)
            continue;
        }
        if (layer.name === "exits") {
            exits.push(...layer.objects)
        }
        if (layer.name === "door") {
            map.add([
                k.pos(layer.objects[0].x, layer.objects[0].y),
                k.area({
                    shape: new k.Rect(k.vec2(0, 0), layer.objects[0].width, layer.objects[0].height),
                }),
                "door",
                layer.type,
            ]);
        }
    }

    //Setting the colliders
    setColliders(k, map, colliders)
    //Setting the player
    const player = map.add(makePlayer(k, level6Data));

    setCameraControls(k, map, player, level6Data);
    for (let position of positions) {
        if (position.name === "player") {
            //Setting players properties
            player.setPosition(position.x, position.y)
            player.setControls();
            player.setEvents();
            player.setPassThrough();
            continue;
        }
    }

    //Setting the Exit and Entry Point Colliders
    setEntryAndExitPoints(k, map, exits)

    // store the returned sound instance so we can stop it later (e.g. on respawn/scene switch)
    k.bgMusic = k.play("backgroundSound", { loop: true });
}