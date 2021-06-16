initGame();

function initGame() {
    let spinButton = document.getElementById("take_spin");
    const imageNames = ["bar", "cherry", "faszlama", "grapes", "horseshoe", "lemon", "melon", "seven", "strawberry"]
    spinButton.addEventListener("click", manipulate_image);
    function manipulate_image(){
        let images = document.getElementsByClassName("slot_signs");
        for (let i = 0; i <images.length; i++ ) {
            if (i === 0) {
                let j = 0;
                let slotOneSpin = setInterval(function (){
                    images[i].src = "static/images/slot_" + imageNames[j]+ ".jpg";
                    j++;
                    if (j===8) j=0;

                }, 50);
                setTimeout(function () {
                    let finalPicture = imageNames[Math.floor(Math.random() * imageNames.length)];
                    clearInterval(slotOneSpin);
                    images[i].src = "static/images/slot_" + finalPicture+ ".jpg";
                }, 3000);
            }
            if ()
        }
    }


    // Your game can start here, but define separate functions, don't write everything in here :)

}
