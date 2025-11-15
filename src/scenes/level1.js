import { makePlayer } from "../playerLogic.js";
import {makeSkeleton} from "../skeletonLogic.js"
import { setColliders, setCameraZones, setEntryAndExitPoints } from "./commonScriptForLevels.js"
export function level1(k, level1Data) {
    // make() method creates a game obj but does not adds a scene while add method can create as well as add the obj to the scene
    // I can also add a make() method here maybe (Think after developing game)
    // k.add([
    //     //Format for add obj
    //     k.text("Hello"),       //Component
    //     k.pos(80,50)         //Position of component on campus
    // ])
    k.camScale(1);
    k.camPos(320, 170);
    k.setGravity(1000);
    const levellayers = level1Data.layers;

    const map = k.add([k.pos(0, -150), k.sprite("level1")])
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
        if (layer.name === "cameras") {
            cameras.push(...layer.objects)
        }
        if (layer.name === "exits") {
            exits.push(...layer.objects)
        }
    }
    // const colliders=layers[4].objects also works but i am ommiting it for now
    //Setting the colliders
    setColliders(k, map, colliders)

    //Setting camera Zones
    setCameraZones(k, map, cameras)

    //Adding the player logic 
    const player = map.add(makePlayer(k));
    k.playerData=player;
    
    for (let position of positions) {
        if (position.name === "player") {
            //Setting players properties
            player.setPosition(position.x,position.y)
            player.setControls();
            player.setEvents();
            player.setPassThrough();
            continue;
        }
        if(position.type==="skeleton")
        {
            const skeleton=map.add(makeSkeleton(k,k.vec2(position.x,position.y)))
            skeleton.setBehaviour();
            skeleton.setEvents();
        }
    }

    //Setting the Exit and Entry Point Colliders
    setEntryAndExitPoints(k, map, exits)

    // store the returned sound instance so we can stop it later (e.g. on respawn/scene switch)
    k.bgMusic = k.play("backgroundSound", { loop: true });
}