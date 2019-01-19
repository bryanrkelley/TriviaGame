//Start functions
$("#start").on("click", function () {
    $("#start").remove();
    game.loadQuestion();
});

$(document).on("click", ".answer-button", function (e) {
    game.clicked(e);
});

$(document).on("click", "#reset", function () {
    game.reset();
})

$(document).keyup(function () {
    if (event.keyCode === 13) {
        game.reset();
    }
});


//Question Bank
var questions = [{
    question: "Who is Mario, the famed mustachioed plumber, named after?",
    answers: ["Mario Segale", "Mario Biaggi", "Mario Lopez", "Mario Lanza"],
    correctAnswer: "Mario Segale",
    image: "assets/images/...."
}, {
    question: "What was the first video game played in space?",
    answers: ["Kirby's Adventure", "Tetris", "Super Mario Bros.", "Dr. Mario"],
    correctAnswer: "Tetris",
    image: "assets/images/...."
}, {
    question: "When was Nintendo founded?",
    answers: ["1962", "1977", "1981", "1989"],
    correctAnswer: "1989",
    image: "assets/images/...."
}, {
    question: "What is Kirby based off of?",
    answers: ["A Baku", "A Placeholder", "Pac Man", "A Piranha"],
    correctAnswer: "A Placeholder",
    image: "assets/images/...."
}, {
    question: "Who is Nentendo's founder?",
    answers: ["Kazumi Totaka", "Shuntaro Furukawa", "Fusajiro Yamuchi", "Koji Kondo"],
    correctAnswer: "Fusajiro Yamuchi",
    image: "assets/images/...."
}, {
    question: "What is the correct name of Nintendo's iconic handheld system?",
    answers: ["Gameboy", "Game Boy", "Game boy", "GameBoy"],
    correctAnswer: "Game Boy",
    image: "assets/images/...."
}, {
    question: "What is the name of Mario's original love interest?",
    answers: ["Petunia", "Peach", "Petra", "Pauline"],
    correctAnswer: "Pauline",
    image: "assets/images/...."
}, {
    question: "What was Mario's orginal name?",
    answers: ["Jump Man", "Mr.Video", "Mario", "Ossan"],
    correctAnswer: "Jump Man",
    image: "assets/images/...."
}, {
    question: "How old is Mario?",
    answers: ["30-31", "34-35", "24-25", "40-41"],
    correctAnswer: "24-25",
    image: "assets/images/...."
}, {
    question: "What was NES known as in Japan?",
    answers: ["EnterSys", "N1", "Famicom", "ENS"],
    correctAnswer: "Famicom",
    image: "assets/images/...."
}];

//Overall Game Logic
var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function () {
        game.counter--;
        $("#counter").html(game.counter);
        if (game.counter <= 0) {
            console.log("TIME UP!");
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $("#subwrapper").html("<h2> Time Remaining: <span id='counter'> 30 </span> Seconds</h2>");
        $("#subwrapper").append("<h2>" + questions[game.currentQuestion].question + "</h2>");
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $("#subwrapper").append('<button class="answer-button" id="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function () {
        game.counter = 30;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        game.unanswered++;
        $("#subwrapper").html("<h2>Out of time!</h2>");
        $("#subwrapper").append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + ".</h3>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);
        $("#subwrapper").html("<h2>Thank you!  But our princess is in another castle!</h2>");
        $("#subwrapper").append("<h3>Correct: " + game.correct + "</h3>");
        $("#subwrapper").append("<h3>Incorrect: " + game.incorrect + "</h3>");
        $("#subwrapper").append("<h3>Unanswered: " + game.unanswered + "</h3>");
        $("#subwrapper").append("<button id='reset'> Play Again </button>");
    },
    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    start: function () {
        console.log("Start!");
        $("#subwrapper").html("<h2> You got it right!</h2>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 2.5 * 1000);
        } else {
            setTimeout(game.nextQuestion, 2.5 * 1000);
        }
    },
    answeredCorrectly: function () {
        console.log("YOU GOT IT!");
        clearInterval(timer);
        game.correct++;
        $("#subwrapper").html("<h2> You got it right!</h2>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 2.5 * 1000);
        } else {
            setTimeout(game.nextQuestion, 2.5 * 1000);
        }
    },
    answeredIncorrectly: function () {
        console.log("Wrong!");
        clearInterval(timer);
        game.incorrect++;
        $("#subwrapper").html("<h2> You got it wrong!</h2>");
        $("#subwrapper").append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + ".</h3>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 2.5 * 1000);
        } else {
            setTimeout(game.nextQuestion, 2.5 * 1000);
        }
    },
    reset: function () {
        game.currentQuestion = 0;
        game.counter = 30;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }
}