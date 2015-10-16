// var DontFUp = DontFUp || {};

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

resetGame();

// Game Object Constructor - Factory
var Game = function(players, roundTime) {
  this.players = players || 4;
  this.roundTimer = roundTime || 60;
  this.pauseTimer = 15;
  this.roundCounter = 0;
  this.gameRounds = [];
  // this.newRound = function(content) {
  //   this.round = this.roundCounter;
  //   this.content = content;
  // };
  this.roundIncrement = function() {
    this.roundCounter++;
    console.log("Round counter = "+ this.roundCounter)
    $('#roundNum').text(this.roundCounter);
    $('#remaining').text(this.players);
    if (this.roundCounter === 1){
      console.log("First round");
      $('#instructions').text('Draw Something! Draw Anything!');
      $('#previousRound').hide;
      $textBox.hide();
    } else if (this.roundCounter % 2 === 1) {
      console.log("Drawing round!");
      drawingRoundRearrange(this.gameRounds[(this.gameRounds.length-1)]);
    } else {
      console.log("Writing round!");
      writingRoundRearrange(this.gameRounds[(this.gameRounds.length-1)]);
    }
  };
  this.saveRound = function(){
    // var roundObject = this.newRound(saveDescription() || saveCanvasToImage());
    // console.log("Logging Round Object = ",roundObject,"to gameRounds array")
    // this.gameRounds.push(roundObject);
    var description = saveDescription();
    var image = saveCanvasToImage();
    this.gameRounds.push(image || description);
  };
};

// Event Listeners
$startButton.submit(function(event){
  event.preventDefault();
  $players = $('#numPlayers').val();
  $roundTime = $('#roundLength').val();
  newGame = new Game($players, $roundTime);
  console.log(newGame);
  $('#gameStart').hide();
  $('#overlays-container').hide();
  $('#overlay-background').hide();
  $textBox.hide();
  $('#controls').show();
  scrollToDescription();
  $('#timer').text(newGame.roundTimer);
  newGame.roundIncrement();
  startRound();
});

$('#playAgain').click(function() {
  resetGame()
});

// Game Functions
function resetGame() {
  $('#gameStart').show();
  $('#overlays-container').show();
  $('#overlay-background').show();
  $('#controls').hide();
  $('#gameEnd').hide();
  $('#result-container').empty();
  $(document).scrollTop(0);
}

function drawingRoundRearrange(lastDescription){
  $('#instructions').text('Draw Your Best Depiction of This Sentence :');
  $('#previousRound').html("<h4 id='lastDescription'>"+lastDescription+"</h4>");
  removeTextBox();
  showCanvas();
}

function writingRoundRearrange(lastDrawing){
  $('#instructions').text('Describe What You See (be thorough!) :');
  $('#previousRound').html("<img id='lastDrawing' src='"+lastDrawing+"'>");
  $textBox.show();
  $('#description').focus();
  removeCanvas();
}

function pauseWindowLoad() {
  pauseTimer();
  countdownPause = window.setInterval(pauseTimer, 1000);
  $('#gamePause').show();
  $('#overlays-container').show();
  $('#overlay-background').show();
}

function pauseWindowClear() {
  $('#gamePause').hide();
  $('#overlays-container').hide();
  $('#overlay-background').hide();
  endPause();
  scrollToDescription();
}

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

function removeTextBox() {
  $('#description').val('');
  $textBox.hide();
}

function scrollToDescription() {
  $(document).scrollTop( $("#game").offset().top );
}

function scrollToOverlay() {
  $(document).scrollTop( $("#overlays-container").offset().top );
}

// Export Canvas at End of Every Drawing Round
function saveCanvasToImage() {
  var roundCanvas = $canvas.getSnapshot();
  if ($canvas.getImage()) {
    var roundImage = $canvas.getImage().toDataURL();
  } else {
    var roundImage = null;
  }
  console.log(roundImage, roundCanvas);
  // return {
  //   image: roundImage,
  //   canvas: roundCanvas
  // };
  return roundImage;
}

// Build images from gameRounds array
function roundsToImage(current) {
  // $('#result-container').html('<canvas id="gameResult" width="300" height="225"></canvas>');
  $.each(current.gameRounds, function( index, value ) {
    console.log("at index", index, "value = ", value);
    if (index % 2 === 0) {
      $('#result-container').append('<div class="snapshot" id="round'+(index+1)+'">'+'<img src="'+value+'">'+'</div>');
    } else if (index % 2 === 1) {
      $('#result-container').append('<div class="snapshot" id="round'+(index+1)+'">'+'<h4>'+value+'</h4>'+'</div>');
    }
  });
  // for (i=0;i<game.gameRounds.length;i++) {
  //   game.gameRounds
  // }
}

// Save Description at end of every writing round
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
  scrollToOverlay();
  if ($timeRemaining === 0) {
    console.log('ending round')
    endRound();
    newGame.saveRound();
    console.log("Round saved to", newGame.gameRounds);
    if (newGame.roundCounter == newGame.players) {
      console.log("No more rounds!");
      endRound();
      endPause();
      saveGame(newGame);
      roundsToImage(newGame);
      $('#gameEnd').show();
      $('#overlays-container').show();
      $('#overlay-background').show();
      console.log(games);
    } else {
      newGame.roundIncrement();
      $('#timer').text(newGame.roundTimer);
      pauseWindowLoad();
    }
  }
}

function pauseTimer() {
  var $pauseRemaining = $('#pause').text(); //replace with newGame.pauseTimer
  $pauseRemaining -= 1;
  console.log($pauseRemaining);
  $('#pause').text($pauseRemaining);
  if ($pauseRemaining === 0) {
    pauseWindowClear();
    // roundTimer();
    startRound();
    $('#pause').text('5');
  }
}

// Event Timers
function startRound(){
  countdownRound = window.setInterval(roundTimer, 1000);
}

function endRound() {
  window.clearInterval(countdownRound);
}

function startPause(){
  countdownRound = window.setInterval(pauseTimer, 1000);
}

function endPause() {
  window.clearInterval(countdownPause);
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
