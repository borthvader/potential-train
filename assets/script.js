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
// creates global variables for timer and question number
var intervalID;
var time;
var currentQuestion;

function hideBoxes() {
   quizStart.setAttribute("hidden", true);
   scoreBox.setAttribute("hidden",true)
   leaderboardBox.setAttribute("hidden",true)
}


quizStart.addEventListener("click", function(){
    hideBoxes();
    questionBox.removeAttribute("hidden");
    // ensures that the first element of the array is called at the start of the quiz
    currentQuestion = 0;
    // calls the function to display questions
    showQuestion();
    time = questions.length * 15;

});
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
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    }
}











