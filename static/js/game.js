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
function initGame() {
    let spinnedResults = [];
    let spinButton = document.getElementById("take_spin");
    const imageNames = ["bar", "cherry", "faszlama", "grapes", "horseshoe", "lemon", "melon", "seven", "strawberry"];
    spinButton.addEventListener("click", manipulate_image);

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
                    let finalPicture = imageNames[Math.floor(Math.random() * imageNames.length)];
                    clearInterval(slotOneSpin);
                    images[pictureIndex].src = "static/images/slot_" + finalPicture+ ".jpg";
                    console.log("finalpicture:"+finalPicture)
                    spinnedResults.push(finalPicture);
                }, stopTime);
    }
    function gameEndHandler () {
        const winningOdds = checkOdds(spinnedResults);

        function checkOdds(resultList) {
            if (resultList[0] === resultList[1] && resultList[1] === resultList[2]) {
                let winningItem = resultList[0];
                return odds[winningItem];
            }
        }


    }
    // Your game can start here, but define separate functions, don't write everything in here :)





}
