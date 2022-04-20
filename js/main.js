// elements
let rulsDrop = document.querySelector(".ruls-img");
let ruls = document.querySelector(".ruls");
let closeRuls = document.querySelector(".close");
let score = document.querySelector(".score-v");
let paper = document.querySelector(".section-1 .paper");
let scissors = document.querySelector(".section-1 .scissors");
let rock = document.querySelector(".section-1 .rock");
let mainTag = document.querySelector(".main");
let sectionOne = document.querySelector(".section-1");
let sectionThree = document.querySelector(".section-3");

// varibales 
let yourPick = "";
let housePick = "";
let ran = "";
let result = "";
let scoreL = "";

// cheking the local storage for the score
if(window.localStorage.getItem("score")){
    scoreL = JSON.parse(window.localStorage.getItem("score")) ;
    score.innerHTML = scoreL ;
}

// ruls
ruls.addEventListener("click",function(){
    rulsDrop.style.display = "flex";
})
closeRuls.addEventListener("click",function(){
    rulsDrop.style.display = "none"
})

// event listner 
paper.onclick = startGame;
scissors.onclick = startGame;
rock.onclick = startGame;



// geting your pick in var , geting house pick by genaration random numbers
function startGame(){
    yourPick = this.classList.value ;
    ran = Math.floor(Math.random()*9 + 1);
    if(ran >= 1 && ran <= 3){
        housePick = "paper";
    }if(ran >= 4 && ran <= 6){
        housePick = "scissors";
    }if(ran >= 7 && ran <= 9){
        housePick = "rock";
    }
    checker(yourPick,housePick);
    sectionOne.style.display = "none";
}




function checker(yourPick,housePick){
    if(housePick == yourPick){
        result = "Tie";
        toPage (yourPick,housePick,result)
    }
    // you pick paper check
    if(yourPick == "paper" && housePick == "rock"){
        result = "you win";
        toPage (yourPick,housePick,result)
    }
    if(yourPick == "paper" && housePick == "scissors"){
        result = "you lose";
        toPage (yourPick,housePick,result)
    }
    // you pick scissors check
    if(yourPick == "scissors" && housePick == "paper"){
        result = "you win";
        toPage (yourPick,housePick,result)
    }
    if(yourPick == "scissors" && housePick == "rock"){
        result = "you lose";
        toPage (yourPick,housePick,result)
    }
    // you pick rock check
    if(yourPick == "rock" && housePick == "scissors"){
        result = "you win";
        toPage (yourPick,housePick,result)
    }
    if(yourPick == "rock" && housePick == "paper"){
        result = "you lose";
        toPage (yourPick,housePick,result)
    }
    
}  


function toPage (yourPick,housePick,result){
    // Your pick side
    let yourPickDivOne = document.createElement("div");
    yourPickDivOne.classList.add("your-pick");
    yourPickDivOne.innerHTML += `<p>You Picked</p>`;

    let yourPickDivTwo = document.createElement("div");
    yourPickDivTwo .classList.add(yourPick);

    let yourPickDivThree = document.createElement("div")

    let yourImg = document.createElement("img");
    yourImg.src = `./images/icon-${yourPick}.svg`;
    yourImg.alt = yourPick ;
    yourPickDivThree.appendChild(yourImg);
    yourPickDivTwo.appendChild(yourPickDivThree);
    yourPickDivOne.appendChild(yourPickDivTwo);
    sectionThree.appendChild(yourPickDivOne);


    // house pick side
    let housePickDivOne = document.createElement("div");
    housePickDivOne.classList.add("house-pick");
    housePickDivOne.innerHTML += `<p>house Picked</p>`;

    let housePickDivTwo = document.createElement("div");
    housePickDivTwo .classList.add("blank");
    housePickDivOne.appendChild(housePickDivTwo);
    housePickDivOne.appendChild(housePickDivTwo);
    sectionThree.appendChild(housePickDivOne);
    

    setTimeout(() => {
        housePickDivTwo.classList.remove("blank");
        housePickDivTwo.classList.add(housePick);
    
        let housePickDivThree = document.createElement("div")
    
        let houseImg = document.createElement("img");
        houseImg.src = `./images/icon-${housePick}.svg`;
        houseImg.alt = housePick ;
        housePickDivThree.appendChild(houseImg);
        housePickDivTwo.appendChild(housePickDivThree);
        
        // check for the winner
        if(result == "you win"){
            let span1 = document.createElement("span");
            span1.classList.add("span-1");
            let span2 = document.createElement("span");
            span2.classList.add("span-2");
            yourPickDivTwo.appendChild(span1);
            yourPickDivTwo.appendChild(span2);
            yourPickDivTwo.classList.add("active");
            scoreV();
        }

        if(result == "you lose"){
            let span1 = document.createElement("span");
            span1.classList.add("span-1");
            let span2 = document.createElement("span");
            span2.classList.add("span-2");
            housePickDivTwo.appendChild(span1);
            housePickDivTwo.appendChild(span2);
            housePickDivTwo.classList.add("active");
        }


        // Result side
        let resultDiv = document.createElement("div");
        resultDiv.classList.add("win-lose");
            
        let resultPara = document.createElement("h2");
        resultPara.innerHTML = result;
        resultDiv.appendChild(resultPara);
        
        let playAgain = document.createElement("button");
        playAgain.innerHTML = "play again";
        resultDiv.appendChild(playAgain);
        
        sectionThree.appendChild(resultDiv);
        mainTag.appendChild(sectionThree);
        playAgain.addEventListener("click",function(){
            sectionThree.innerHTML = "";
            sectionOne.style.display = "block";
        });
    }, 1000)

}

// score to local storage
function scoreV(){
    scoreL = +scoreL+1 ;
    window.localStorage.setItem("score",JSON.stringify(scoreL));
    score.innerHTML = scoreL
}