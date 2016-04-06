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

rivets.formatters.currency = function(value){
  return commas(value)
}

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

$("#tradeStockShareCount").keyup(function(){
  $("#tradeStockValue").val( $(this).val() * stockMarket.price );
  if ( ( $("#tradeStockValue").val() > game.player.cash && $("input[name=buySellStock]:checked").val() == "buy") || ($("#tradeStockValue").val() > game.player.assets[1].value && $("input[name=buySellStock]:checked").val() == "sell") ) {
    validTradeFlag = false;
    console.log("invalid trade");
  }    
  else {
    validTradeFlag = true;
    console.log("valid trade");
  }
});
$(document).on("click", "#tradeStockButton", function(){
  if (validTradeFlag){
    tradeStock( $("#tradeStockValue").val(), $("input[name=buySellStock]:checked").val() );
    //console.log($("#tradeStockValue").val() + " " +  $("input[name=buySellStock]:checked").val() );
    }
});
