export function initializePlayerStateManager(k) {
    const playerState = {
        //So that the player does not get damage while attacking
        playerHP:5,
        maxPlayerHP:5,
        isBossDefeated:false,
        isPlayerInBossFight:false,
    };

    return {
        getState: () => {return {...playerState}},
        setState: (property,value) => {
            state.property = value;
        },
    }
}