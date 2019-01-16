/*JavaScript*/
// (function () {
//     var counter,
//         targetNumber,
//         $winner = $("#winner"),
//         $loser = $("#loser"),
//         wins = 0,
//         losses = 0,
//         isRoundDone = false;

//     // create variables globally towards our application
//     var targetNumber = "";

//     var $reset = $("#reset")



//     function startGame() {

//         counter = 0;
//         $("#counter").html(counter);

//         //Reset the round
//         isRoundDone = false;

//         // // Hide 'play again' button.
//         // $reset.addClass("hide");

//         //Hide Winner Statement
//         $winner.hide();

//         //Hide Loser Statement
//         $loser.hide();

//         // generate random target number
//         targetNumber = Math.floor((Math.random() * 101) + 19);

//         //display the value to users
//         $("#number-to-guess").html(targetNumber);

//         //Generate random gem values
//         $("#Garnet").val(Math.floor((Math.random() * 12) + 1));
//         console.log("Garnet is: " + $("#Garnet").val());
//         $("#Amethyst").val(Math.floor((Math.random() * 12) + 1));
//         console.log("Amethyst is: " + $("#Amethyst").val());
//         $("#Pearl").val(Math.floor((Math.random() * 12) + 1));
//         console.log("Pearl is: " + $("#Pearl").val());
//         $("#Steven").val(Math.floor((Math.random() * 12) + 1));
//         console.log("Steven is: " + $("#Steven").val());
//     }


//     // This time, our click event applies to every single crystal on the page. Not just one.
//     $(".gem").on("click", function () {
//         if (isRoundDone) {
//             true;
//             return;
//         }

//         var crystalValue = ($(this).val());
//         crystalValue = parseInt(crystalValue);

//         // // We then add the crystalValue to the user's "counter" which is a global variable.
//         // // Every click, from every crystal adds to the global counter.
//         counter += crystalValue;

//         $("#counter").html(counter);

//         // Lose Logic
//         if (counter > targetNumber) {
//             //Congratulate player on trying their best
//             $loser.show();
//             losses++; // increments the losses variable by 1 e.g. losses = losses + 1
//             document.querySelector("#losses").innerHTML = losses;
//             isRoundDone = true;
//         }

//         // Win Logic
//         if (counter === targetNumber) {
//             //Congratulate player on guessing correctly
//             $winner.show();
//             wins++; // increments the wins variable by 1 e.g. wins = wins + 1
//             document.querySelector("#wins").innerHTML = wins;
//             isRoundDone = true;
//         }

//         $reset.removeClass("hide");

//     });

//     // attach handler to the keydown event of the "return" document
//     document.addEventListener('keydown', function handler(e) {
//         if (event.keyCode === 13) {
//             startGame();
//         }
//     });


//     // Initial start of game
//     startGame();


//     $reset.on('click', function (e) {
//         // Replay game
//         startGame();
//     });
// })();



//Start functions
$("#start").on("click", function() {
    $("#start").remove();
    game.loadQuestion();
});

$(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
});

$(document).on("click", "#reset", function(){
    game.reset();
})


//Question Bank
var questions = [{
    question: "????",
    answers: ["a", "?", "?", "?"],
    correctAnswer: "a",
    image: "assets/images/...."
}, {
    question: "????",
    answers: ["?", "?", "?", "?"],
    correctAnswer: "?",
    image: "assets/images/...."
}, {
    question: "????",
    answers: ["?", "?", "?", "?"],
    correctAnswer: "?",
    image: "assets/images/...."
}];

//Overall Game Logic
var game = {
    questions:questions,
    currentQuestion:0,
    counter:30,
    correct:0,
    incorrect:0,
    unanswered:0,
    countdown: function(){
        game.counter--;
        $("#counter").html(game.counter);
        if(game.counter<=0){
            console.log("TTIME UP!");
            game.timeUp();
        }
    },
    loadQuestion: function(){
        timer = setInterval(game.countdown, 1000);
        $("#subwrapper").html("<h2> Time Remaining: <span id='counter'> 30 </span> Seconds</h2>");
        $("#subwrapper").append("<h2>" + questions[game.currentQuestion].question + "</h2>");
        for (var i=0; i<questions[game.currentQuestion].answers.length; i++) {
            $("#subwrapper").append('<button class="answer-button" id="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 30;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $("#subwrapper").html("<h2>Out of time!</h2>");
        $("#subwrapper").append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + ".</h3>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    results: function(){
        clearInterval(timer);
        $("#subwrapper").html("<h2>All done! :)</h2>");
        $("#subwrapper").append("<h3>Correct: " + game.correct + "</h3>");
        $("#subwrapper").append("<h3>Incorrect: " + game.incorrect + "</h3>");
        $("#subwrapper").append("<h3>Unanswered: " + game.unanswered + "</h3>");
        $("#subwrapper").append("<button id='reset'> Reset </button>");
    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function(){
        console.log("YOU GOT IT!");
        clearInterval(timer);
        game.correct++;
        $("#subwrapper").html("<h2> You got it right!</h2>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    answeredIncorrectly: function(){
        console.log("Wrong!");
        clearInterval(timer);
        game.incorrect++;
        $("#subwrapper").html("<h2> You got it wrong!</h2>");
        $("#subwrapper").append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + ".</h3>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }
}