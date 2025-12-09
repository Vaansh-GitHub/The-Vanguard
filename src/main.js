import { makeNotificationBox, upgradePlayer } from "./common.js";
import { k } from "./loader.js";
import { level1 } from "./scenes/level1.js"
import { level2 } from "./scenes/level2.js"
import { level3 } from "./scenes/level3.js"
import { level4 } from "./scenes/level4.js"
import { level5 } from "./scenes/level5.js"
import { level6 } from "./scenes/level6.js"
import { level7 } from "./scenes/level7.js"
async function main() {
    const level1Data = await (await fetch("../maps/level1.json")).json()
    const level2Data = await (await fetch("../maps/level2.json")).json()
    const level3Data = await (await fetch("../maps/level3.json")).json()
    const level4Data = await (await fetch("../maps/level4.json")).json()
    const level5Data = await (await fetch("../maps/level5.json")).json()
    const level6Data = await (await fetch("../maps/level6.json")).json()
    const level7Data = await (await fetch("../maps/level7.json")).json()
    k.scene("level1", () => { // Scene Method to define scene in kaboom js
        level1(k, level1Data);
    })
    k.scene("level2", () => { // Scene Method to define scene in kaboom js
        level2(k, level2Data)
    })
    k.scene("level3", () => {
        level3(k, level3Data)
    })
    k.scene("level4", () => {
        level4(k, level4Data)
    })
    k.scene("level5", () => {
        level5(k, level5Data)
    })
    k.scene("level6", () => {
        level6(k, level6Data)
    })
    k.scene("level7", () => {
        level7(k, level7Data)
    })
}
main()
k.scene("intro", () => {
    k.add(
        makeNotificationBox(k, "Recommended to play over PC as the Game is not Optimised to  play over Handhelds\n\n Press Enter  to Continue", 900, 400)
    )
    k.onKeyPress("enter", () => {
        k.go("instructions") //To start the default scene
    })
})
k.scene("instructions", () => { // Scene Method to define scene in kaboom js
    k.add(
        makeNotificationBox(k, "'W' - to jump \n'A' - to move left \n'D' - to move right \n'Space' - to attack \nHit Enter  to  start", 900, 400)
    )
    k.onKeyPress("enter", () => {
        k.go("level1") //To start the default scene
    })
})
k.scene("final", () => { // Scene Method to define scene in kaboom js
    k.add(
        makeNotificationBox(k, "Congrats You Won !! Click Enter to Start again", 900, 400)
    )
    k.onKeyPress("enter", () => {
        k.go("intro") //To start the default scene
    })
})
k.scene("upgradePlayer", () => { // Scene Method to define scene in kaboom js
    k.add(
        upgradePlayer(k, "Congrats You Got The Wizard Skin !! Click Enter to Start next Level", 900, 400)
    )
    k.onKeyPress("enter", () => {
        k.go("level4") //To start the default scene
    })
})

k.go("intro")


