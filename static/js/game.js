initGame();

function initGame() {
    let spinnedResults = [];
    let spinButton = document.getElementById("take_spin");
    const imageNames = ["bar", "cherry", "faszlama", "grapes", "horseshoe", "lemon", "melon", "seven", "strawberry"]
    spinButton.addEventListener("click", manipulate_image);
    function manipulate_image(){
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
    }
    function intervalHandler(pictureIndex, images, stopTime, startingIndex) {
        let j = startingIndex;
                let slotOneSpin = setInterval(function (){
                    images[pictureIndex].src = "static/images/slot_" + imageNames[j]+ ".jpg";
                    j++;
                    if (j===imageNames.length) j=0;

                }, 50);
                setTimeout(function () {
                    let finalPicture = imageNames[Math.floor(Math.random() * imageNames.length)];
                    clearInterval(slotOneSpin);
                    images[pictureIndex].src = "static/images/slot_" + finalPicture+ ".jpg";
                }, stopTime);
    }


    // Your game can start here, but define separate functions, don't write everything in here :)

}
