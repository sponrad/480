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
  if (e.keyCode == 32){ //space
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
  $("#tradeStockValue").val( parseFloat(($(this).val() * stockMarket.price).toFixed(1)) );
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
  //check for if the current trade is valid or not
  if (validTradeFlag){
    tradeStock( $("#tradeStockValue").val(), $("input[name=buySellStock]:checked").val() );
    //console.log($("#tradeStockValue").val() + " " +  $("input[name=buySellStock]:checked").val() );
    }
});

$('#buySellREModal').on('show.bs.modal', function () {
  var listings = generateREListings();

  $("#reListingsRadioDiv").html("");

  listings.forEach( function(element, index, array){

    var sqft = element[0];
    var price = element[1];
    var marketPrice = element[2];

    $("#reListingsRadioDiv").append("<div class='radio'><label><input type='radio' name='reRadios' data-sqft='" + sqft  + "' data-price='" + price + "' data-marketPrice='" + marketPrice + "' value='option1'>" + sqft + " sqft -  $" + commas(price) + "<small> Market: $" + commas(marketPrice) + "</small></label></div>");
  }); 
});
