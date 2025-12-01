import { makeNotificationBox } from "./common.js";
import {k} from "./loader.js";
import {level1} from "./scenes/level1.js"
import {level2} from "./scenes/level2.js"
async function main()
{
    const level1Data= await (await fetch("../maps/level1.json")).json()
    const level2Data=await(await fetch("../maps/level2.json")).json()
    k.scene("level1",()=>{ // Scene Method to define scene in kaboom js
        level1(k,level1Data);
    })
    
    k.scene("level2",()=>{ // Scene Method to define scene in kaboom js
        level2(k,level2Data)
    })
}
main()
k.scene("intro",()=>{ // Scene Method to define scene in kaboom js
    k.add(
        makeNotificationBox(k,"'w' to move up 'a'  to move left 'd' to move right and space to attack \npress enter to start",900,400)
    )
    k.onKeyPress("enter",()=>{
         k.go("level1") //To start the default scene
    })
})
k.scene("final",()=>{ // Scene Method to define scene in kaboom js
    k.add(
        makeNotificationBox(k,"Congrats You Won !! Click Enter to Start again",900,400)
    )
    k.onKeyPress("enter",()=>{
         k.go("intro") //To start the default scene
    })
})

k.go("intro")


