var questions = [
    {
        questionText: "This is question 1",
        choices: [
            "answer 1",
            "answer 2",
            "answer 3",
            "answer 4",
        ],
        answer: "answer 2",
        questionId: 1
    },
    {
        questionText: "This is question 2",
        choices: [
            "answer 1",
            "answer 2",
            "answer 3",
            "answer 4",
        ],
        answer: "answer 2",
        questionId: 2
    },
    {
        questionText: "This is question 3",
        choices: [
            "answer 1",
            "answer 2",
            "answer 3",
            "answer 4",
        ],
        answer: "answer 2",
        questionId: 3
    },
    {
        questionText: "This is question 4",
        choices: [
            "answer 1",
            "answer 2",
            "answer 3",
            "answer 4",
        ],
        answer: "answer 2",
        questionId: 4
    },
    {
        questionText: "This is question 5",
        choices: [
            "answer 1",
            "answer 2",
            "answer 3",
            "answer 4",
        ],
        answer: "answer 2",
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

function checkAnswer(eventObject){
    var choiceButton = eventObject.target;
    result.style.display = "block";
    if (correctChoice(choiceButton)) {
        resultMsg.textContent = "You're Right!"
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
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else{
        finish();
    }
}
function finish(){
    clearInterval(intervalId);
    hideBoxes();
    scoreBox.style.display = "block";
    score.textContent = time;
}
// confirmBtn.addEventListener("click", saveScore)

// function saveScore(event){
//     event.preventDefault();
//     var highscoreEl = {
//         initials: input.value,
//         score: time,
//     };
//         hideBoxes();
//         leaderboardBox.style.display = "block";
//         localStorage.setItem("highscoreEl", JSON.stringify(highscoreEl));
//     renderHighscore();
    
// }

// function renderHighscore(){
//     var lastscore = JSON.parse(localStorage.getitem("#score-list"));
//     if (lastscore !==null){
//         document.querySelector("#score-list").textContent = lastscore.initials + lastscore.score
//     } 
// }











