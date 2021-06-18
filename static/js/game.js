initGame();

const odds = {
    lemon: 1,
    strawberry: 2,
    grapes: 5,
    melon: 10,
    cherry: 25,
    horseshoe: 50,
    bar: 75,
    seven: 100,
    faszlama: 1000
};
const imageNames = ["bar", "cherry", "faszlama", "grapes", "horseshoe", "lemon", "melon", "seven", "strawberry"];
const imagesToPick = ["faszlama", "seven", "seven"];
const testList = ["faszlama", "faszlama", "faszlama", "faszlama", "faszlama", "faszlama", "faszlama", "faszlama",]
getImagesToPick();

function getImagesToPick() {
    for (let i = 0; i < 5; i++) {
        imagesToPick.push("bar");
    }
    for (let i = 0; i < 10; i++) {
        imagesToPick.push("horseshoe");
    }
    for (let i = 0; i < 20; i++) {
        imagesToPick.push("cherry");
    }
    for (let i = 0; i < 35; i++) {
        imagesToPick.push("melon");
    }
    for (let i = 0; i < 50; i++) {
        imagesToPick.push("grapes");
    }
    for (let i = 0; i < 75; i++) {
        imagesToPick.push("strawberry");
    }
    for (let i = 0; i < 100; i++) {
        imagesToPick.push("lemon");
    }
}

function initGame() {
    let spinnedResults = [];
    let spinButton = document.getElementById("take_spin");
    spinButton.addEventListener("click", manipulate_image);
    spinButton.addEventListener("click", balanceHandler);
    spinButton.addEventListener("click", initialSziaUram);

    function manipulate_image() {
        spinnedResults = [];
        let images = document.getElementsByClassName("slot_signs");
        for (let i = 0; i < images.length; i++) {
            if (i === 0) {
                intervalHandler(i, images, 3000, 0);
            } else if (i === 1) {
                intervalHandler(i, images, 3500, 5);
            } else {
                intervalHandler(i, images, 4000, 7);
            }
        }
        setTimeout(gameEndHandler, 4200);

    }

    function intervalHandler(pictureIndex, images, stopTime, startingIndex) {//todo name
        let j = startingIndex;
        let finalImage;
        let slotOneSpin = setInterval(function () {
            images[pictureIndex].src = "static/images/slot_" + imageNames[j] + ".jpg";
            j++;
            if (j === imageNames.length) j = 0;

        }, 50);
        setTimeout(finalImage = function () {
            const balanceInput = document.getElementsByClassName('balance')[0];
            const bet = document.getElementsByClassName("bet-select")[0];
            let finalPicture;
            if (Number(balanceInput.dataset.balance) === Number(bet.value)) {//todo parsint
                finalPicture = testList[Math.floor(Math.random() * testList.length)];
            } else {
                finalPicture = imagesToPick[Math.floor(Math.random() * imagesToPick.length)];
            }

            clearInterval(slotOneSpin);
            images[pictureIndex].src = "static/images/slot_" + finalPicture + ".jpg";
            spinnedResults.push(finalPicture);
        }, stopTime);
    }

    function gameEndHandler() {
        const winningOdds = checkOdds(spinnedResults);
        calculateWin();
        rewriteSziaUram(winningOdds);

        function checkOdds(resultList) {
            if (resultList[0] === resultList[1] && resultList[1] === resultList[2]) {
                let winningItem = resultList[0];
                return odds[winningItem];
            } else return 0;
        }

        function calculateWin() {
            const bet = document.getElementsByClassName("bet-select")[0];
            const winThis = document.getElementsByClassName("win_this_round");
            const balanceInput = document.getElementsByClassName('balance');
            for (let i = 0; i < winThis.length; i++) {
                winThis[i].value = bet.value * winningOdds;
                balanceInput[i].value = Number(balanceInput[i].value) + Number(winThis[i].value);
                balanceInput[i].setAttribute("value", String(balanceInput[i].value));//todo tostring
                winThis[i].setAttribute("value", String(winThis[i].value));
                if (balanceInput[i].dataset.biggestWin) {//todo ctrl + alt + l (auto indent, can give rules for code formatting)!!!-check it out-
                    if (winThis[i].value > balanceInput[i].dataset.biggestWin) {
                        balanceInput[i].dataset.biggestWin = winThis[i].value;//todo ternary operator
                    }
                } else {
                    balanceInput[i].dataset.biggestWin = winThis[i].value;
                }
                bet.setAttribute("max", balanceInput[i].value);
            }


        }


    }

    function balanceHandler() {
        const winThis = document.getElementsByClassName("win_this_round");
        const bet = document.getElementsByClassName("bet-select")[0];
        const balanceInput = document.getElementsByClassName('balance');
        for (let i = 0; i < winThis.length; i++) {
            winThis[i].value = 0;
            if (Number(bet.value) > Number(balanceInput[i].value)) {
                bet.value = balanceInput[i].value;
            }
            balanceInput[i].dataset.balance = balanceInput[i].value;
            balanceInput[i].value = Number(balanceInput[i].value) - Number(bet.value);
            balanceInput[i].setAttribute("value", String(balanceInput[i].value));
        }
    }

    function rewriteSziaUram(winningOdds) {
        let sziaUram = document.getElementById("status");//todo funny but take it serious next time
        if (winningOdds !== 0) {
            sziaUram.innerText = "YOU WIN! 🤗"
        } else {
            sziaUram.innerText = "YOU LOSE 😞"
        }
    }

    function initialSziaUram() {
        let sziaUram = document.getElementById("status");
        sziaUram.innerText = "LET'S SEE...👀"
    }
}
//todo learn this and object logic

