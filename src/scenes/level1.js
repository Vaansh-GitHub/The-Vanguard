import { makePlayer} from "../playerLogic.js";
import {setColliders} from "./commonScriptForLevels.js"
export function level1(k,level1Data){
    // make() method creates a game obj but does not adds a scene while add method can create as well as add the obj to the scene
    // I can also add a make() method here maybe (Think after developing game)
    // k.add([
    //     //Format for add obj
    //     k.text("Hello"),       //Component
    //     k.pos(80,50)         //Position of component on campus
    // ])
    k.camScale(1.2);
    k.camPos(270,170);
    k.setGravity(1000);
    const levellayers=level1Data.layers;

    const map=k.add([k.pos(0,-150),k.sprite("level1")])
    const colliders=[]
    const positions=[]
    for(let layer of levellayers)
    {
        if(layer.name==="positions")
        {
            positions.push(...layer.objects)
        }
        if(layer.name==="colliders")
        {
            colliders.push([...layer.objects])
            continue;
        }
    }
    // const colliders=layers[4].objects also works but i am ommiting it for now
    setColliders(k,map,colliders)
    
    const player = map.add(makePlayer(k));
    
    player.setPosition(positions.find(p=>p.name==="player").x,positions.find(p=>p.name==="player").y)
    player.setControls();
    console.log('Player loaded')
}