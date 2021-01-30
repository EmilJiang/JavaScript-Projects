setScreen("welcome_screen");
var score;
var lives;
var seconds;
var level;
var goal;
var timespoped;

onEvent("startButton", "click", function() {
  resetall();
  setScreen("game_screen");
  update();
  timedloop();
});

onEvent("playAgain_button", "click", function() {
  setScreen("welcome_screen");
});

onEvent("tryAgain_button", "click", function() {
  setScreen("welcome_screen");
});

//For beginning of game
function resetall() {
  setScreen("welcome_screen");
  startvalues();
  update();
}

function startvalues() {
  score = 0;
  lives = 3;
  seconds = 20;
  level = 1;
  goal = 20;
  timespoped = 0;
  setSize("balloon", 100, 100);
  score = 0;
}

//For beginning of each level
function reset_forlevel() {
  score = 0;
  seconds = 20;
}

function update() {
  setText("number_seconds", seconds);
  setText("total_score", score);
  setText("number_lives", lives);
}

//Parent Algorithm
onEvent("balloon", "click", function() {
  playSound("Balloon-pop.mp3", false);
  score = score + 1;
  setPosition("balloon", randomNumber(50,280), randomNumber(50, 350));
  update();
  timespoped = timespoped + 1*level;
    if (score == goal) {
    reset_forlevel();
    update();
    level = level + 1;
    next_level();
    stopTimedLoop();
    onEvent("leveltwobutton", "click", function( ) {
      stopTimedLoop();
      setScreen("game_screen");
      timedloop();
    });
    onEvent("levelthreebutton", "click", function( ) {
      stopTimedLoop();
      setScreen("game_screen");
      timedloop();
    });
    onEvent("levelfourbutton", "click", function( ) {
      stopTimedLoop();
      setScreen("game_screen");
      timedloop();
    });
  }
});

//Child Algorithm and abstracion
function next_level() {
  if (level == 2) {
    setScreen("leveltwo");
    goal = goal + 5;
  }
  else if((level == 3)){
    setScreen("levelthree");
    goal = goal;
    setSize("balloon", 50, 50);
  }
  else if((level == 4)) {
    setScreen("levelfour");
    setSize("balloon", 50, 50);
    goal = goal + 5;
  }
  else{
    setScreen("win_screen");
  }
}

//Child Algorithm
function timedloop() {
  timedLoop(1000, function() {
  seconds = seconds - 1;
  update();
  if (seconds == 0) {
    setScreen("lose_screen");
    setText("finalscore", timespoped);
    stopTimedLoop();
  }
  });
}

onEvent("background", "click", function() {
  lives = lives - 1;
  update();
      if (lives == 0) {
    setScreen("lose_screen");
    setText("finalscore", timespoped);
    stopTimedLoop();
  }
});






