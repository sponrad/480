reMarket = new Market();
stockMarket = new Market();

reMarket.price = 250;
stockMarket.price = 1800;
stockMarket.volatility = 0.1;

game = new Game();

drawC3Charts();

rivets.bind($('#480'), { game: game });

$(document).keyup(function(e){
  //console.log(e);
  if (e.keyCode == 32){
    e.preventDefault();
    if (chrono == null){
      play();
    }
    else {
      pause();
    }
  }
});

$(document).on("click", "#playButton", function(){ play() });
$(document).on("click", "#pauseButton", function(){ pause() });

