$(document).ready(function () {

    //// setting variables for the game///

    var wins = 0;
    var losses = 0;
    var skipped = 0;
    var qArray = 0;
    var timeLeft = 30;
    var intervalID; 
    var isAnswered = false;
 
    ////setting a list of trivia questions////

    var triviaObject = [
        { 
          question: 'Surfing debuts in the Olympics in what year and country?',
          answers: ['1968 Mexico', '1932 United States', '2020 Japan' , '2016 Brazil'],
          correctAnswer: '2020 Japan',
          image: ('https://media.giphy.com/media/Ub2DqB6HpL7xK/giphy.gif')
           },
        {
        question: 'What 1959 film, starring Sandra Dee, inspired a TV series with Sally Field, is considered the beginning of the entire “beach party film” genre, and is often said to be the single biggest factor in the mainstreaming of surf culture?',
        answers: ['The Endless Summer', 'Blue Hawaii', 'Gidget', 'Bikini Beach'],
        correctAnswer: 'Gidget',
        image: ('https://media.giphy.com/media/3o7btQ7wXm8gLnsVmo/giphy.gif')
    }, 
    {
        question: 'What does “wipe out” refer to?',
        answers: ['An area where an underwater rocky point creates waves which are suitable for surfing', 'Falling off a surfboard while taking off on or riding a wave', 'A 1963 song recorded and released by the California surf rock band The Surfaris' , 'Both B and C'],
        correctAnswer: 'Both B and C',
        image: ('https://media.giphy.com/media/eCNt4ZFHQnNOU/giphy.gif')
     },
     { 
        question: 'Which professional female surfer survived a 2003 shark attack in which her left arm was bitten off, later returned to professional surfing, and was the subject of a 2011 feature film entitled Soul Surfer?',
        answers: ['Stephanie Gilmore', 'Bethany Hamilton', 'Keala Kennelly' , 'Carissa Moore'],
        correctAnswer: 'Bethany Hamilton',
        image: ('https://media.giphy.com/media/iMQ1dbEwGcf6ipB047/giphy.gif')
    },
    {
        question: 'Which professional surfer from Cocoa Beach, Florida has won an unprecedented 11 world surfing championships, including five consecutive titles, and is also the youngest (age 20) and the oldest (age 39) to win the title?',
        answers: ['Gerry Lopez', 'Laird Hamilton', 'Mark Richards', 'Kelly Slater'],
        correctAnswer: 'Kelly Slater',
        image: ('https://media.giphy.com/media/xT9IgjzsuLusCgbLXi/giphy.gif')
    },
    {
        question: 'Where did surfing originate?',
        answers: ['South Africa', 'California', 'Australia', 'Western Polynesia'],
        correctAnswer: 'Western Polynesia',
        image: ('https://media.giphy.com/media/3o6ZsXTIwhihRp1lXW/giphy.gif')
    },
    {
        question: 'Which surfer, who was also a five-time Olympic medalist in swimming, is considered the “Father of Modern Surfing”?',
        answers: ['Greg Noll', 'Duke Kahanamoku', 'Kelly Slater', 'Richard “Buffalo” Keaulana'],
        correctAnswer: 'Duke Kahanamoku',
        image: ('https://media.giphy.com/media/MH23NsKrvAN9u/giphy.gif')
    },
    {
        question: 'Which surfing technique, pioneered by surfer Laird Hamilton, has been one of the biggest breakthroughs in surfing history, and revolutionized the sport allowing surfers to catch big waves and break the 30-foot barrier?',
        answers: ['Tow-in surfing', 'Stand-up paddle boarding', 'Hydrofoil boarding', 'Hanging ten'],
        correctAnswer: 'Tow-in surfing',
        image: ('https://media.giphy.com/media/6PWUfAYZO5J84/giphy.gif')
    }
];

    /////creating a start button/////
    $('#start').append('<input type="image" src="./images/surfing.png"></input>');
    
    ///// creating sa starGame on click function/////
    $('#start').on("click", function startGame() {
        $('#start').empty();
        $('#startMe').remove();
        $('#answer-options').empty();
        $('#question').show();
        $('#timer').show();
        qArray = 0;
        wins = 0;
        losses = 0;
        questionsLeft = 0;
        showQuestion();
    })

    /////creating a function to show questions one at a time on a for loop
    /////setting a timer if/else statement
    /////changing answer options into buttons and creating an onclik function on each of them
    /////////////////
    function showQuestion() {
        isAnswered = false;
        timeLeft = 30;
        intervalID = setInterval(timer, 1000);
        if (isAnswered === false) {
            timer();
        }
        correctAnswer = triviaObject[qArray].correctAnswer;
        question = triviaObject[qArray].question;
        $('#question').text(question);
    
       
        for (var i = 0; i < 4; i++) {
            var answer = triviaObject[qArray].answers[i];
            $('#answer-options').append('<button>' + answer + '</button>');
            $('button').addClass('answerChoices');
        }

        $('button').click(function () {
            var answer = triviaObject[qArray].answers[i];
            var buttonValue = $(this).html();
                if (buttonValue === correctAnswer) {
                isAnswered = true; 
                win();
                reset();
            } else {
                isAnswered = true; 
                loss();
                reset()
            }
        });
    }

    /////creating a win function/////
    function win(){
                $('#question').html('<h5 id="correct">'+'You got it right!'+'</h5>'+'The correct answer is: ' + correctAnswer);
                $('.answerChoices').remove();
                image = triviaObject[qArray].image;
                $('#answer-options').html('<img class=answerImage src="' + image + ' ">'); // add the image
                qArray++;
                wins++;
    }

    //////creating a lose function////
    function loss(){
                $('#question').html('<h5>'+'Wrong Answer'+'</h5>' + 'The correct answer was: ' + correctAnswer);
                $('.answerChoices').remove();
                image = triviaObject[qArray].image;
                $('#answer-options').html('<img class=answerImage src="' + image + ' ">'); 
                qArray++;
                losses++;
    }

    /////creating a timer function with an if/else statement
    ///// if the time is up - it show the correct answer and goes to the next question////
    function timer() {
        if (timeLeft === 0) {
            isAnswered = true;
            clearInterval(intervalID);
            $('#question').html('<h5>'+ 'Your time is up!' +'</h5>' + 'The correct answer was: ' + correctAnswer);
            image = triviaObject[qArray].image;
            $('#answer-options').html('<img class=answerImage src="' + image + ' ">');
            qArray++;
            skipped++;
            $('.answerChoices').remove();
            reset();
        } else if (isAnswered === true) {
            clearInterval(intervalID);
        } else {
            timeLeft --;
            $('#timer').html('Timer: ' + '<strong>' + timeLeft + '</strong>').addClass('timer');
        }
    }

    /////creating a reset function that loops though the questions array
    ////once the array is done - it clears the fields and hides some of them and generates a new start button
    //////////////
        function reset() {
        if (qArray < triviaObject.length) {
            setTimeout(function () {
                $('.answerImage').remove();
                showQuestion();
            }, 4000);
        } else {
            setTimeout(function () {
                $('#question').empty().hide();
                $('#timer').empty().hide();
                $('.answerImage').remove();
                $('#answer-options').removeAttr('button');
                $('#answer-options').append('<p> Correct answers: ' + wins + '</p>').addClass('results');
                $('#answer-options').append('<p> Wrong answers: ' + losses + '</p>').addClass('results');
                $('#answer-options').append('<p> Skipped: ' + skipped + '</p>').addClass('results');
                $('#start').append('<input type="image" src="./images/surfing.png"></input>');
            }, 4000);
        }
    }
    

     
});
