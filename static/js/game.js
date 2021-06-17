initGame();

const odds = {
    lemon : 1,
    strawberry : 2,
    grapes : 5,
    melon : 10,
    cherry : 25,
    horseshoe : 50,
    bar : 75,
    seven : 100,
    faszlama : 1000
};
const imageNames = ["bar", "cherry", "faszlama", "grapes", "horseshoe", "lemon", "melon", "seven", "strawberry"];
const imagesToPick = ["faszlama", "seven", "seven"];
const testList = ["faszlama","faszlama","faszlama","faszlama","faszlama","faszlama","faszlama","faszlama",]
getImagesToPick();

function getImagesToPick() {
    for (let i=0; i < 5; i++ ) {
        imagesToPick.push("bar");
    }
    for (let i=0; i < 10; i++ ) {
        imagesToPick.push("horseshoe");
    }
    for (let i=0; i < 20; i++ ) {
        imagesToPick.push("cherry");
    }
    for (let i=0; i < 35; i++ ) {
        imagesToPick.push("melon");
    }
    for (let i=0; i < 50; i++ ) {
        imagesToPick.push("grapes");
    }
    for (let i=0; i < 75; i++ ) {
        imagesToPick.push("strawberry");
    }
    for (let i=0; i < 100; i++ ) {
        imagesToPick.push("lemon");
    }
}

function initGame() {
    let spinnedResults = [];
    let spinButton = document.getElementById("take_spin");
    spinButton.addEventListener("click", manipulate_image);
    spinButton.addEventListener("click", balanceHandler);

    function manipulate_image(){
        spinnedResults = [];
        let images = document.getElementsByClassName("slot_signs");
        for (let i = 0; i <images.length; i++ ) {
            if (i === 0) {
                intervalHandler(i, images, 3000, 0);
            }
            else if (i === 1) {
                intervalHandler(i, images, 3500, 5);
            }else {
                intervalHandler(i, images, 4000, 7);
            }
        }
            setTimeout(gameEndHandler, 5000);

    }

    function intervalHandler(pictureIndex, images, stopTime, startingIndex) {
        let j = startingIndex;
        let finalImage;
        let slotOneSpin = setInterval(function (){
                    images[pictureIndex].src = "static/images/slot_" + imageNames[j]+ ".jpg";
                    j++;
                    if (j===imageNames.length) j=0;

                }, 50);
        setTimeout(finalImage = function () {
                    let finalPicture = testList/*imagesToPick*/[Math.floor(Math.random() * testList/*imagesToPick*/.length)];
                    clearInterval(slotOneSpin);
                    images[pictureIndex].src = "static/images/slot_" + finalPicture+ ".jpg";
                    console.log("finalpicture:"+finalPicture)
                    spinnedResults.push(finalPicture);
                }, stopTime);
    }
    function gameEndHandler () {
        const winningOdds = checkOdds(spinnedResults);
        calculateWin();

        function checkOdds(resultList) {
            if (resultList[0] === resultList[1] && resultList[1] === resultList[2]) {
                let winningItem = resultList[0];
                return odds[winningItem];
            }
            else return 0;
        }
        function calculateWin() {
            const bet = document.getElementsByClassName("bet-select")[0].value;
            const winThis = document.getElementById("win_this");
            const balanceInput = document.getElementById('balanceNotHidden');
            winThis.value = bet * winningOdds;
            balanceInput.value = Number(balanceInput.value) + Number(winThis.value);
            balanceInput.setAttribute("value", String(balanceInput.value));
            if (balanceInput.dataset.biggestWin){
                if (winThis.value > balanceInput.dataset.biggestWin){
                    balanceInput.dataset.biggestWin = winThis.value;
                }
            }else {balanceInput.dataset.biggestWin = winThis.value;}

        }


    }
    function balanceHandler() {
        const winThis = document.getElementById("win_this");
        winThis.value = 0;
        const bet = document.getElementsByClassName("bet-select")[0].value;
        const balanceInput = document.getElementById('balanceNotHidden');
        balanceInput.value = Number(balanceInput.value) - Number(bet);
        balanceInput.setAttribute("value", String(balanceInput.value));


    }





}
