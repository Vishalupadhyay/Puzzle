var rows;
var columns;

var currTile;
var blankTile;
var winTile;
var result;
var imglocation = '';
var targetTile;
var difficultyPointer;

var turns = 0;
var imgOrder = ["4", "2", "7", "5", "1", "6", "8", "3", "blank"];
var correctOrder;
var finalOrder = [];

window.onload = reloadGame();

function reloadGame() {


    //easy settings
    if (document.getElementById("easy").checked) {
        turns = 0;
        document.getElementById("current-score").innerText = turns;
        rows = 3;
        columns = 3;
        correctOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "blank"];

        difficultyPointer = "easy";

        result = localStorage.getItem("bestResultEasy");

        if (document.querySelector("#target-img")) {
            document.querySelector("#target-img").remove();
        }
        if (document.querySelector("#win-image")) {
            document.querySelector("#win-image").remove();
        }

        targetTile = document.createElement("img");
        targetTile.src = "./img_asset/target.jpg";
        targetTile.id = "target-img";

        document.getElementById("taget").append(targetTile);

        document.querySelectorAll(".puzzle-image").forEach(el => el.remove());
        document.querySelectorAll(".puzzle-image-hard").forEach(el => el.remove());
        imgOrder = ["4", "2", "7", "5", "1", "6", "8", "3", "blank"];
        imglocation = "img_asset";
        loadgame();
    }

    //moderate settings
    if (document.getElementById("moderate").checked) {
        turns = 0;
        document.getElementById("current-score").innerText = turns;
        rows = 3;
        columns = 3;
        correctOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "blank"];
        difficultyPointer = "moderate";

        result = localStorage.getItem("bestResultModerate");

        document.querySelector("#target-img").remove();
        if (document.querySelector("#win-image")) {
            document.querySelector("#win-image").remove();
        }
        targetTile = document.createElement("img");
        targetTile.src = "./img_asset_moderate/target.jpg";
        targetTile.id = "target-img";

        document.getElementById("taget").append(targetTile);

        document.querySelectorAll(".puzzle-image").forEach(el => el.remove());
        document.querySelectorAll(".puzzle-image-hard").forEach(el => el.remove());
        imgOrder = ["4", "2", "7", "5", "1", "6", "8", "3", "blank"];
        imglocation = "img_asset_moderate";
        loadgame();
    }


    // hard setting
    if (document.getElementById("hard").checked) {

        rows = 4;
        columns = 4;
        correctOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "blank"];
        turns = 0;
        document.getElementById("current-score").innerText = turns;
        difficultyPointer = "hard";

        result = localStorage.getItem("bestResultHard");

        if (document.querySelector("#target-img")) {
            document.querySelector("#target-img").remove();
        }
        if (document.querySelector("#win-image")) {
            document.querySelector("#win-image").remove();
        }

        targetTile = document.createElement("img");
        targetTile.src = "./img_asset_hard/target.jpg";
        targetTile.id = "target-img";

        document.getElementById("taget").append(targetTile);

        document.querySelectorAll(".puzzle-image").forEach(el => el.remove());
        document.querySelectorAll(".puzzle-image-hard").forEach(el => el.remove());
        imgOrder = ["4", "2", "7", "5", "1", "6", "8", "3", "9", "10", "12", "11", "14", "13", "blank", "15"];
        imglocation = "img_asset_hard";
        loadgame();
    }
}

function loadgame() {

    document.getElementById("best-result").innerText = result;

    winTile = document.createElement("img");
    winTile.src = "./" + imglocation + "/target.jpg";
    winTile.className = "win-image";
    winTile.id = "win-image";


    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {


            var imageName = imgOrder.shift();
            let tile = document.createElement("img");
            if (difficultyPointer == "hard") {
                tile.className = "puzzle-image-hard";
            }
            if (difficultyPointer == "moderate" || difficultyPointer == "easy") {
                tile.className = "puzzle-image ";
            }
            tile.id = r.toString() + "-" + c.toString();
            tile.alt = imageName;
            tile.src = "./" + imglocation + "/" + imageName + ".jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("game-field").append(tile);

        }
    }
}
function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave(e) {
    e.preventDefault();
}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (!otherTile.src.includes("blank.jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let rowCoords = parseInt(currCoords[0]);
    let colcoords = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let otherRowCoords = parseInt(otherCoords[0]);
    let otherColCoords = parseInt(otherCoords[1]);

    let moveLeft = rowCoords == otherRowCoords && otherColCoords == colcoords - 1;
    let moveRight = rowCoords == otherRowCoords && otherColCoords == colcoords + 1;

    let moveUp = colcoords == otherColCoords && otherRowCoords == rowCoords - 1;
    let moveDown = colcoords == otherColCoords && otherRowCoords == rowCoords + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        let currImgalt = currTile.alt;
        let otherImgalt = otherTile.alt;

        currTile.src = otherImg;
        otherTile.src = currImg;

        currTile.alt = otherImgalt;
        otherTile.alt = currImgalt;

        turns += 1;
        document.getElementById("current-score").innerText = turns;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {

                var value = document.getElementById(r + "-" + c).alt;

                finalOrder.push(value);

            }
        }
        console.log(finalOrder);
        if (JSON.stringify(finalOrder) == JSON.stringify(correctOrder)) {


            if (result == "null" || result > turns) {
                result = turns;
            }

            if (difficultyPointer == "easy") {
                localStorage.setItem("bestResultEasy", result);
            }
            else if (difficultyPointer == "moderate") {
                localStorage.setItem("bestResultModerate", result);
            }
            else if (difficultyPointer == "hard") {
                localStorage.setItem("bestResultHard", result);
            }


            document.getElementById("best-result").innerText = result;


            document.getElementById("game-field").appendChild(winTile);
        }
        else if (finalOrder != correctOrder) {
            finalOrder = [];
        }

    }

}