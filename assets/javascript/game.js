$( document ).ready(function() {
    console.log( "ready!" );

var totalCorrect = 0;
var totalWrong = 0;
var unanswered = 0;

var questionNum = -1;
var userChoice = -1;
var displayTime = 30;
var secondsLeft = 0 ;
var winaudio = new Audio('assets/audio/ding.mp3');
var loseaudio = new Audio('assets/audio/buzz.mp3');

nextQuestion();

function showTime(){
	$("#time").text(secondsLeft);
	secondsLeft--;
	if (secondsLeft == -1){
		endQuestion();
	}
};

$(".newGame").click(function(){
	if(questionNum == -1){
		totalCorrect = 0;
		totalWrong = 0;
		unanswered = 0;
		nextQuestion();
	}
	
});

function nextQuestion(){
	if (questionNum < allQuestions.length-1){
	questionNum++;
	startNextQuestion(questionNum);
	}else{	
	$("#question").text("You got " +Math.round(totalCorrect/allQuestions.length*100) +"% correct");
	$(".choices").empty();
	$("#answer").text("");
	$("#result").text("");
	questionNum = -1;
	}
};

function startNextQuestion(q){
	displayTime = 30;
	$("#time").text(displayTime);

	$("#question").val("");
	$(".choices").empty();
	$("#answer").text("Click The Correct Choice");
	$("#answer").css('color', 'red');
	$("#answer").css('background','lightpink');
	$("#result").text("Good Luck!");
	displayChoices(q);
};

function displayChoices(i){
	userChoice = -1;
	questionNum = i;
	secondsLeft = displayTime - 1;

	clearTimeout(displayTime);
	displayTime = setInterval(showTime,1000);
	$("#question").html("<p>" + allQuestions[i].question + "</p>");
	$("#answer").text("Click The Correct Choice");
	$("#answer").css('color', 'red');
	$("#answer").css('background','lightpink');
	$("#result").text("Good Luck!");
	var choiceArray = allQuestions[i].choices
	answer = choiceArray[allQuestions[i].correctChoice];
	for (k=0; k<choiceArray.length; k++){
		$(".choices").append("<p><span id = q" + k + ">" + choiceArray[k] +  "</span></p>");

			$('#q' + k).click(function(){
				$(this).css('color', 'white');
				$(this).css('background','red');
				$("#answer").text("Correct Choice: " + answer);
				$("#answer").css('color', 'white');
				$("#answer").css('background','blue');
				if (userChoice == -1){
					userChoice = ($(this).attr('id'))[1];
					endQuestion();
				};
			});

			$('#q' + k).hover(function(){					
				$(this).css('color', 'white');
				$(this).css('background','red');
					}, function(){
					$(this).css('color', 'black');
					$(this).css('background','lightgrey');
					});
	}
};

function endQuestion(){
	if (userChoice == allQuestions[questionNum].correctChoice){
					totalCorrect++;
					$("#result").text("Correct!");
					winaudio.play();
				}else if (userChoice == -1){
					unanswered++;
					loseaudio.play();
					$("#result").text("No Choice Made");
				}else{
					totalWrong++;
					loseaudio.play();
					$("#result").text("Wrong!");
				};
				$("#time").text(0);
				$("#right").text(totalCorrect);
				$("#wrong").text(totalWrong);
				$("#unanswered").text(unanswered);
				clearInterval(displayTime);
				displayTime = setTimeout(nextQuestion,1000);
	}
});

