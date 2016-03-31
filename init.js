reMarket = new Market();
stockMarket = new Market();

reMarket.price = 125;
reMarket.data = [reMarket.price]
stockMarket.price = 1800;
stockMarket.data = [stockMarket.price]
stockMarket.volatility = 0.1;

game = new Game();

generateC3Charts();

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

