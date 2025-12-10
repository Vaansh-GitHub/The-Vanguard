import { makePlayer } from "../player2Logic.js";
import { makeBoss } from "../boss3Logic.js"
import { setColliders, setCameraZones, setCameraControls, setEntryAndExitPoints } from "./commonScriptForLevels.js"
export function level5(k, level5Data) {
    k.camScale(0.8);
    k.camPos(400, 290);
    k.setGravity(1000);
    const levellayers = level5Data.layers;

    const map = k.add([k.pos(0, 0), k.sprite("level5")])
    const colliders = []
    const positions = []
    const cameras = []
    const exits = []
    for (let layer of levellayers) {
        if (layer.name === "positions") {
            positions.push(...layer.objects)
        }
        if (layer.name === "colliders") {
            colliders.push(...layer.objects)
            continue;
        }
        // if (layer.name === "cameras") {
        //     cameras.push(...layer.objects)
        // }
        if (layer.name === "exits") {
            exits.push(...layer.objects)
        }
    }
    //Setting the colliders
    setColliders(k, map, colliders)

    // //Setting camera Zones
    // setCameraZones(k, map, cameras)

    //Adding the player logic 
    const player = map.add(makePlayer(k, level5Data));
    //Creating the boss
    const boss = map.add(makeBoss(k, player))

    setCameraControls(k, map, player, level5Data);

    for (let position of positions) {
        if (position.name === "player") {
            //Setting players properties
            player.setPosition(position.x, position.y)
            player.setControls();
            player.setEvents();
            player.setPassThrough();
            continue;
        }
        if (position.name === "boss") {
            boss.setPosition(position.x, position.y)
            boss.setBehaviour();
            boss.setEvents();
        }
    }

    //Setting the Exit and Entry Point Colliders
    setEntryAndExitPoints(k, map, exits)

    // store the returned sound instance so we can stop it later (e.g. on respawn/scene switch)
    k.bgMusic = k.play("bossFightSound", { loop: true });
}