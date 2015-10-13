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
  // var paused = false;


// Game Object Constructor - Factory
var Game = function(players, roundTime) {
  return {
    players: players || 4,
    roundTimer: roundTime || 60,
    pauseTimer: 15,
    roundCounter: 0,
    gameRounds: [],
    newRound: function(){
      this.
    }
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


// Game Functions
$startButton.click(function(){
  $players = $('#numPlayers').val();
  $roundTime = $('#roundLength').val();
  $('#controls'.show());
  console.log(newGame());
});

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


// Timer Functions
function roundTimer(timeRemaining) {
  console.log(timeRemaining);
  timeRemaining -= 1;
  if (timeRemaining === 0) {
    endRound();
  }
}

function endRound() {
  window.clearInterval(countdownRound);
}

function pauseTimer() {
  var timeRemaining = this.pauseTimer;
  timeRemaining--;
  if (timeRemaining === 0) {
    endPause();
  }
}

function endPause() {
  window.clearInterval(countdownPause);
}


// Event Timers
var countdownRound = window.setInterval(roundTimer, 1000);
var countdownPause = window.setInterval(pauseTimer, 1000);
