var questions = [
    {
        questionText: "Which is not a valid data type?",
        choices: [
            "Number",
            "String",
            "Element",
            "Object",
        ],
        answer: "Element",
        questionId: 1
    },
    {
        questionText: "What is the name of the following operator? ===",
        choices: [
            "Very Equal",
            "Slightly Equal",
            "Strictly Equal",
            "Maybe Equal in the future",
        ],
        answer: "Strictly Equal",
        questionId: 2
    },
    {
        questionText: "Which is not a type of pop-up availabel in JavaScript?",
        choices: [
            "Alert",
            "Confirm",
            "Prompt",
            "Cancel",
        ],
        answer: "Cancel",
        questionId: 3
    },
    {
        questionText: "Which is not a type of boolean operator?",
        choices: [
            "&&",
            "||",
            "|=",
            "!",
        ],
        answer: "|=",
        questionId: 4
    },
    {
        questionText: "Is JavaScript fun and easy to use?",
        choices: [
            "Obviously",
            "Depends on who you ask...",
            "The opposite is true in fact",
            "No comment reccieved",
        ],
        answer: "Depends on who you ask...",
        questionId: 5
    },
];


// assign variables to corresponding sections of html file
var quizStart = document.querySelector("#quiz-start");
var questionBox = document.querySelector("#question-card");
var scoreBox = document.querySelector("#score");
var leaderboardBox = document.querySelector("#leaderboard");
var result = document.querySelector("#result");
var resultMsg = document.querySelector("#result-msg");
var timeClock = document.querySelector("#time");
var score = document.querySelector("#final-score");
var confirmBtn = document.querySelector("#confirm-button");
var input = document.querySelector("#initials");
var returnBtn = document.querySelector("#return-button");
var resetBtn = document.querySelector("#reset-button");
// creates global variables for timer and question number
var intervalId;
var time;
var currentQuestion;

// hides unused elements when not in use
function hideBoxes() {
   quizStart.style.display = "none";
   questionBox.style.display = "none";
   scoreBox.style.display = "none";
   leaderboardBox.style.display = "none";
}
// hides all boxes except the starting message and button
function startPage(){
    quizStart.style.display = "block";
    questionBox.style.display = "none";
   scoreBox.style.display = "none";
   leaderboardBox.style.display = "none";
}
// calls the startpage function on window load
window.onload = startPage();

// eventListener on the Start Quiz button to run the function
quizStart.addEventListener("click", function(){
    hideBoxes();
    questionBox.style.display = "block";
    // ensures that the first element of the array is called at the start of the quiz
    currentQuestion = 0;
    // calls the function to display questions
    showQuestion();
    time = questions.length * 15;
    intervalId = setInterval(timer, 1000);
    showTime(); 
});
// reduces time by one at a set interval, otherwise run finish function
function timer(){
    time--;
    showTime();
    if (time < 1){
        finish();
    }
}
// display timer on page
function showTime(){
    timeClock.textContent = time;
}
// reveal the question and answer options
function showQuestion(){
    var question = questions[currentQuestion];
    var choices = question.choices;
    var questionEl = document.querySelector("#question-info");
    questionEl.textContent = question.questionText;
// creates a button for each choice in the question
    for (var i = 0; i < choices.length; i++){
        var choice = choices[i];
        var choiceButton = document.querySelector("#choice" + i);
        choiceButton.textContent = choice;
    }

}

document.querySelector("#quiz-buttons").addEventListener('click', checkAnswer);

// compares the text of the selected button with the answer provided
function correctChoice(choiceButton){
    return choiceButton.textContent === questions[currentQuestion].answer;
}
// subtracts time for each incorrect answer
function checkAnswer(eventObject){
    var choiceButton = eventObject.target;
    result.style.display = "block";
    if (correctChoice(choiceButton)) {
        resultMsg.textContent = "You're Right!";
     } else {
         resultMsg.textContent = "Not this time!"
        if(time >= 10){
            time = time -10;
            showTime();
        } else{
            time = 0;
            showTime();
            finish();
        }
    }
    // proceeds to the next question until none are left and runs the finish function
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else{
        finish();
    }
}
// ends the game and displays the score 
function finish(){
    clearInterval(intervalId);
    hideBoxes();
    scoreBox.style.display = "block";
    score.textContent = time;
}
confirmBtn.addEventListener("click", saveScore)
// creates an object from user input and stores it to localStorage as a string using JSON
function saveScore(event){
    event.preventDefault();
    var highscoreEl = {
        initials: input.value,
        score: time,
    };
        hideBoxes();
        leaderboardBox.style.display = "block";
        localStorage.setItem("highscoreEl", JSON.stringify(highscoreEl));
    getHighscore();
    
}
// retrieves the stored object and displays on the leaderboard screen
function getHighscore(){
    var lastscore = JSON.parse(localStorage.getItem("highscoreEl"));
    if (lastscore !==null){
         
        document.querySelector("#score-list").textContent = lastscore.initials + "-" + lastscore.score
       
    } else {
        document.getElementById("#score-list").textContent = "Nothing to Display";
    }
}
// creates the option to start over from beginning
returnBtn.addEventListener('click', startAgain);
function startAgain(){
    startPage();
}
// clears the local storage of items
resetBtn.addEventListener('click', resetScores);
function resetScores(){
    localStorage.clear();
}
















