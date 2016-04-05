reMarket = new Market();
stockMarket = new Market();

reMarket.price = 125;
reMarket.startingPrice = 125;
reMarket.data.push(reMarket.price);
reMarket.volatility = 0.03;
reMarket.fortyYearMultiple = 4;

stockMarket.price = 1800;
stockMarket.startingPrice = 1800;
stockMarket.data.push(stockMarket.price);
stockMarket.volatility = 0.09;
stockMarket.fortyYearMultiple = 8;

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

