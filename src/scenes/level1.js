import {setColliders} from "./commonScriptForLevels.js"
export function level1(k,level1Data){
    // make() method creates a game obj but does not adds a scene while add method can create as well as add the obj to the scene
    // I can also add a make() method here maybe (Think after developing game)
    // k.add([
    //     //Format for add obj
    //     k.text("Hello"),       //Component
    //     k.pos(80,50)         //Position of component on campus
    // ])
    
    const levellayers=level1Data.layers;

    const map=k.add([k.pos(0,-150),k.sprite("level1")])
    const colliders=[]
    for(let layer of levellayers)
    {
        if(layer.name==="colliders")
        {
            colliders.push([...layer.objects])
            break;
        }
    }
    // const colliders=layers[4].objects also works but i am ommiting it for now
    setColliders(k,map,colliders)
}