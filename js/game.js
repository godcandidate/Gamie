// selectBox elements
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),

//playboard elements
playBoard = document.querySelector(".play-board"),
players =  document.querySelector(".players"),
allBox =  document.querySelectorAll("section span"),

//result elements
wonText =  document.querySelector(".won-text"),
replayBtn =  document.querySelector(".btn-replay"),
resultBox =  document.querySelector(".result-box");


// when home page reloads
window.onload = ()=> {
    //add onclick attribute in all available section
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
        
    }
    //player X
    selectXBtn.onclick = () =>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
    }
     //player O
     selectOBtn.onclick = () =>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");

    }
}

// font awesome icons
let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";

let playerSign = "X";
let runbot = true;

// user click function
function clickedBox(element){
    if(players.classList.contains("player")){
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    playBoard.style.pointerEvents = "none"; // user must must wait for bot to select
    // a box can only be clicked once
    element.style.pointerEvents = "none";

    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(runbot);
    }, randomDelayTime);

}

// bot function
function bot(runbot)
{
    if(runbot)
    {
        playerSign = "O";
        let array = [];
        // get unclicked boxex
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){
                array.push(i);
            }
        }
        // get a random unclicked box for bot to select
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0){
            if(players.classList.contains("player")){
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.remove("active");
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        playBoard.style.pointerEvents = "auto";
        allBox[randomBox].style.pointerEvents = "none";
        playerSign = "X";
    }
}

// winner functions
function getClass(idname){
    return document.querySelector(".box" + idname).id;
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}
function selectWinner(){
    if(checkClass(1,2,3, playerSign) || checkClass(4,5,6, playerSign) || checkClass(7,8,9, playerSign) || 
    checkClass(1,4,7, playerSign) || checkClass(2,5,8, playerSign) || checkClass(3,6,9, playerSign) || 
    checkClass(1,5,9, playerSign) || checkClass(3,5,7, playerSign)){
        runbot = false; // stop bot when someone wins
        bot(runbot);
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");

        }, 700); // 700ms delay 
        if (playerSign == 'X'){
            wonText.innerHTML = `Xeno <p> (${playerSign}) </p>won the game!`;
        }else{
            wonText.innerHTML = `Omni  <p> (${playerSign})</p>won the game!`;
        }
       
    }else
    {
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" &&
        getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "")
        {
            runbot = false; // stop bot when someone wins
            bot(runbot);
            setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");

        }, 700); // 700ms delay
        wonText.innerHTML = `The match is draw!`;
        }
    }

}

replayBtn.onclick = () =>{
    window.location.reload();
}

