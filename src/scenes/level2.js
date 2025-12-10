import { makePlayer } from "../playerLogic.js";
import { makeBoss } from "../bossLogic.js"
import { makeSkeleton } from "../skeletonLogic.js"
import { makeGoblin } from "../goblinLogic.js"
import { setColliders, setCameraZones, setCameraControls, setEntryAndExitPoints } from "./commonScriptForLevels.js"
export function level2(k, level2Data) {
    // make() method creates a game obj but does not adds a scene while add method can create as well as add the obj to the scene
    // I can also add a make() method here maybe (Think after developing game)
    // k.add([
    //     //Format for add obj
    //     k.text("Hello"),       //Component
    //     k.pos(80,50)         //Position of component on campus
    // ])
    k.camScale(0.8);
    k.camPos(400, 290);
    k.setGravity(1000);
    const levellayers = level2Data.layers;

    const map = k.add([k.pos(0, 0), k.sprite("level2")])
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
    // const colliders=layers[4].objects also works but i am ommiting it for now
    //Setting the colliders
    setColliders(k, map, colliders)

    // //Setting camera Zones
    // setCameraZones(k, map, cameras)

    //Adding the player logic 
    const player = map.add(makePlayer(k));
    //Creating the boss
    const boss = map.add(makeBoss(k, player))

    setCameraControls(k, map, player, level2Data);

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
        if (position.type === "skeleton") {
            const skeleton = map.add(makeSkeleton(k, k.vec2(position.x, position.y)))
            skeleton.setBehaviour();
            skeleton.setEvents();
        }
    }

    //Setting the Exit and Entry Point Colliders
    setEntryAndExitPoints(k, map, exits)

    // store the returned sound instance so we can stop it later (e.g. on respawn/scene switch)
    k.bgMusic = k.play("errieMusic", { loop: true });
}