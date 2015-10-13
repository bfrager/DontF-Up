// var DontFUp = DontFUp || {};

// Global Variables
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
  var $promptStart = $('#start-prompt');
  var games = null;
  // var paused = false;


// Game Object Constructor - Factory
var Game = function() {
  var $players = $('.players').val();
  var $roundTime = $('.set-timer').val();
  return {
    players: $players,
    roundTimer: $roundTime,
    pauseTimer: 15,
    roundCounter: 0,
    gameRounds: {},
  }
}

// Game Round Object Constructor
var GameRound = function() {
  return {
    round: roundCounter,
    drawing: roundDrawing,
    canvas: roundCanvas,
    description: roundDescription,
  }
}

var button = document.querySelector('.button');
button.addEventListener('click', function(){
  console.log(newGame())
});

// Game Functions
function newGame() {
  return Game()
}

function saveGame(currentGame) {
  games.push(currentGame);
}

//Game Round Functions
function newRound() {
  new GameRound;
}

function halfRound() {
  roundCounter++;
  $('#roundCounter').text(roundCounter);
  if (roundCounter === 1){
      
  } else if (roundCounter === $players) {
      saveGame(this);
      return (alert('Game Over!'));
  } else if (roundCounter % 2 === 1) {

      showCanvas();
  } else {
      removeCanvas();
  }
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
  return $textBox.text();
}

function roundTimer() {
  var timeRemaining = this.roundTimer;
  timeRemaining--;
  if (timeRemaining === 0) {
    endRound();
  }
}

function endRound() {
  clearInterval(countdownRound);
}

function pauseTimer() {
  var timeRemaining = this.pauseTimer;
  timeRemaining--;
  if (timeRemaining === 0) {
    endPause();
  }
}

function endPause() {
  clearInterval(countdownPause);
}


// Event Timers
var countdownRound = window.setInterval(roundTimer, 1000);
var countdownPause = window.setInterval(pauseTimer, 1000);
