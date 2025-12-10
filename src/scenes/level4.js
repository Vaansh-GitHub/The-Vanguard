import { makePlayer } from "../player2Logic.js";
import { makeSkeleton } from "../skeletonLogic.js"
import { makeGoblin } from "../goblinLogic.js"
import { makeMushroom } from "../mushroomLogic.js";
import { setColliders, setCameraZones, setEntryAndExitPoints, setCameraControls } from "./commonScriptForLevels.js"
export function level4(k, level4Data) {
    k.camScale(1);
    k.camPos(320, 170);
    k.setGravity(1000);
    const levellayers = level4Data.layers;

    const map = k.add([k.pos(0, 0), k.sprite("level4")])
    const colliders = []
    const positions = []
    const cameras = []
    for (let layer of levellayers) {
        if (layer.name === "positions") {
            positions.push(...layer.objects)
        }
        if (layer.name === "colliders") {
            colliders.push(...layer.objects)
            continue;
        }
        if (layer.name === "cameras") {
            cameras.push(...layer.objects)
        }
    }

    //Setting the colliders
    setColliders(k, map, colliders)

    //Setting camera Zones
    // setCameraZones(k, map, cameras)

    //Adding the player logic 
    const player = map.add(makePlayer(k, level4Data));
    k.playerData = player;

    setCameraControls(k, map, player, level4Data);

    for (let position of positions) {
        if (position.name === "player") {
            //Setting players properties
            player.setPosition(position.x, position.y)
            player.setControls();
            player.setEvents();
            player.setPassThrough();
            continue;
        }
        if (position.type === "skeleton") {
            const skeleton = map.add(makeSkeleton(k, k.vec2(position.x, position.y)))
            skeleton.setBehaviour();
            skeleton.setEvents();
        }
        if (position.type === "goblin") {
            const goblin = map.add(makeGoblin(k, k.vec2(position.x, position.y)))
            goblin.setBehaviour();
            goblin.setEvents();
        }
        if (position.type === "mushroom") {
            const mushroom = map.add(makeMushroom(k, k.vec2(position.x, position.y)))
            mushroom.setBehaviour();
            mushroom.setEvents();
        }
    }


    // store the returned sound instance so we can stop it later (e.g. on respawn/scene switch)
    k.bgMusic = k.play("backgroundSound", { loop: true });
}