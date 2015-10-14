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
var games = [];
var $startButton = $('#gameStart');
var $share = $('#shareImages');
var $playAgain = $('#playAgain');

var countdownPause = null;
var countdownRound = null;
var newGame = null;

// Game Object Constructor - Factory
var Game = function(players, roundTime) {
  this.players = players || 4;
  this.roundTimer = roundTime || 60;
  this.pauseTimer = 15;
  this.roundCounter = 0;
  this.gameRounds = [];
  this.newRound = function() {
    this.round = this.roundCounter;
    this.content = null;
  };
  this.roundIncrement = function() {
    console.log("Round counter = "+ this.roundCounter)
    this.roundCounter++;
    console.log("Round", this.roundCounter);
    $('#roundNum').text(this.roundCounter);
    if (this.roundCounter === 1){
      console.log("First round");
      $('#previousRound').hide;
      $textBox.hide();
    } else if (this.roundCounter > this.players) {
      console.log("No more rounds!");
      saveGame(this);
      console.log(games);
      return (alert('Game Over!'));
      endRound();
      endPause();
    } else if (this.roundCounter % 2 === 1) {
      console.log("Drawing round!");
      $textBox.hide();
      showCanvas();
    } else {
      console.log("Writing round!");
      $textBox.show();
      removeCanvas();
    }
  };
  this.saveRound = function(){
    this.gameRounds.push(this.newRound);
  };
};

// Game Functions
$startButton.submit(function(event){
  event.preventDefault();
  $players = $('#numPlayers').val();
  $roundTime = $('#roundLength').val();
  newGame = new Game($players, $roundTime);
  console.log(newGame);
  $('#controls').show();
  $('#timer').text(newGame.roundTimer);
  startRound();
});

function saveGame(currentGame) {
  games.push(currentGame);
}

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

//TIMER FUNCTIONS
function roundTimer() {
  if ($('#timer').text($timeRemaining) === newGame.roundTimer) {
    var $timeRemaining = newGame.roundTimer;
  }
  else {
    var $timeRemaining = $('#timer').text();
  }
  $timeRemaining -= 1;
  console.log($timeRemaining);
  $('#timer').text($timeRemaining);
  if ($timeRemaining === 0) {
    console.log('ending round')
    endRound();
    newGame.roundIncrement();
    pauseTimer();
    $('#timer').text(newGame.roundTimer);
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


// DEPCRECATED FUNCTIONS DURING OBJECT-ORIENTED REFACTORING
// function newGame() {
//   return Game()
// }

// //Game Round Functions
// function newRound() {
//   new GameRound;
// }
//

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
