// var DontFUp = DontFUp || {};

// Canvas no jQuery:
  // var canvas = LC.init(document.getElementsByClassName('literally')[0],
  //                         {imageURLPrefix: 'img',
  //                         tools: [
  //                           LC.tools.Pencil,
  //                           LC.tools.Eraser,
  //                           LC.tools.Line,
  //                           LC.tools.Rectangle,
  //                           LC.tools.Polygon,
  //                           LC.tools.Pan,
  //                           LC.tools.Eyedropper]
  //                         });

// Canvas jQuery:
var $canvas = LC.init(($('.literally').get(0)),
                        {imageURLPrefix: 'img',
                        tools: [
                          LC.tools.Pencil,
                          LC.tools.Eraser,
                          LC.tools.Line,
                          LC.tools.Rectangle,
                          LC.tools.Polygon,
                          LC.tools.Pan,
                          LC.tools.Eyedropper]
                        });
var $textBox = $('.textBox');
var games = null;
var $startButton = $('#gameStart');
var $share = $('#shareImages');
var $playAgain = $('#playAgain');
var countdownPause = null;
var countdownRound = null;
// var paused = false;


// Game Object Constructor - Factory
var Game = function(players, roundTime) {
  this.players = players || 4;
  this.roundTimer = roundTime || 60;
  this.pauseTimer = 15;
  this.roundCounter = 0;
  this.gameRounds = [];
  this.newRound = function() {
    this.round = roundCounter;
    this.content = null;
    this.roundIncrement = function() {
      roundCounter++;
      $('#roundCounter').text(roundCounter);
      if (roundCounter === 1){
          $('#previousRound').hide;
          $textBox.hide();
      } else if (roundCounter > $players) {
          saveGame(this);
          return (alert('Game Over!'));
      } else if (roundCounter % 2 === 1) {
          $textBox.hide();
          showCanvas();
      } else {
          $textBox.show();
          removeCanvas();
      }
    };
    this.saveRound = function(){
      this.gameRounds.push(this.newRound);
    };
};
};

// Game Functions
$startButton.submit(function(event){
  event.preventDefault();
  $players = $('#numPlayers').val();
  $roundTime = $('#roundLength').val();
  var newGame = new Game($players, $roundTime);
  console.log(newGame);
  $('#controls').show();
});


// Toggle Canvas Functions:
function removeCanvas() {
  $canvas.clear();
  $('#canvas-container').hide();
}

function showCanvas() {
  $('#canvas-container').show();
}

// Export Canvas at End of Every Drawing Round
function saveCanvasToImage() {
  var roundCanvas = $canvas.getSnapshot();
  var roundImage = $canvas.getImage().toDataURL();
  console.log(roundImage, roundCanvas);
  return roundImage, roundCanvas;
}

function saveDescription() {
  return $('#description').val();
}


// Timer Functions
// var timer = function() {}; //TIMER OBJECT?


function roundTimer() {
  var $timeRemaining = $('#timer').text() //replace with newGame.roundTime
  $timeRemaining -= 1;
  console.log($timeRemaining);
  $('#timer').text($timeRemaining);
  if ($timeRemaining === 0) {
    console.log('ending round')
    endRound();
    pauseTimer();
    $('#timer').text('60');
    countdownPause = window.setInterval(pauseTimer, 1000);
  }
}

function endRound() {
  window.clearInterval(countdownRound);
}

function pauseTimer() {
  var $pauseRemaining = $('#pause').text(); //replace with newGame.pauseTimer
  $pauseRemaining -= 1;
  console.log($pauseRemaining);
  $('#pause').text($pauseRemaining);
  if ($pauseRemaining === 0) {
    endPause();
    // roundTimer();
    startRound();
    $('#pause').text('15');
  }
}

function endPause() {
  window.clearInterval(countdownPause);
}

// Event Timers
function startRound(){
  countdownRound = window.setInterval(roundTimer, 1000);
}

startRound();

// DEPCRECATED FUNCTIONS DURING OBJECT-ORIENTED REFACTORING
// function newGame() {
//   return Game()
// }

// //Game Round Functions
// function newRound() {
//   new GameRound;
// }
//
// function saveGame(currentGame) {
//   games.push(currentGame);
// }
//
// function halfRound() {
//   roundCounter++;
//   $('#roundCounter').text(roundCounter);
//   if (roundCounter === 1){
//       $('#previousRound').hide;
//       $textBox.hide();
//   } else if (roundCounter > $players) {
//       saveGame(this);
//       return (alert('Game Over!'));
//   } else if (roundCounter % 2 === 1) {
//       $textBox.hide();
//       showCanvas();
//   } else {
//       $textBox.show();
//       removeCanvas();
//   }
// }
