import { makeNotificationBox, upgradePlayer } from "./common.js";
import { k } from "./loader.js";
import { level1 } from "./scenes/level1.js"
import { level2 } from "./scenes/level2.js"
import { level3 } from "./scenes/level3.js"
import { level4 } from "./scenes/level4.js"
import { level5 } from "./scenes/level5.js"
async function main() {
    const level1Data = await (await fetch("../maps/level1.json")).json()
    const level2Data = await (await fetch("../maps/level2.json")).json()
    const level3Data = await (await fetch("../maps/level3.json")).json()
    const level4Data = await (await fetch("../maps/level4.json")).json()
    const level5Data = await (await fetch("../maps/level5.json")).json()
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
}
main()
k.scene("intro", () => { // Scene Method to define scene in kaboom js
    k.add(
        makeNotificationBox(k, "'w' to move up 'a'  to move left 'd' to move right and space to attack \npress enter to start", 900, 400)
    )
    k.onKeyPress("enter", () => {
        k.go("level5") //To start the default scene
    })
})
k.scene("final", () => { // Scene Method to define scene in kaboom js
    k.add(
        makeNotificationBox(k, "Congrats You Won !! Click Enter to Start again", 900, 400)
    )
    k.onKeyPress("enter", () => {
        k.go("level3") //To start the default scene
    })
})
k.scene("upgradePlayer", () => { // Scene Method to define scene in kaboom js
    k.add(
        upgradePlayer(k, "Congrats You Got The Wizard Skin !! Click Enter to Start next Level", 900, 400)
    )
    k.onKeyPress("enter", () => {
        k.go("intro") //To start the default scene
    })
})

k.go("intro")


