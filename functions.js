function globalUpdate(){
  //console.log( game.day );
  game.day += 1;

  stockMarket.newPrice();
  reMarket.newPrice();
  
  game.update();

  if (game.day == 480){
    updateC3Charts();
    pause();
    alert("480");
  }

  //updateC3Charts();
}

function updateC3Charts(){
  tempREData = ['Price'];
  tempREData = tempREData.concat( reMarket.data.slice(-480) );

  rechart.load({
    columns: [
      tempREData
    ]
  });

  tempStockData = ['Price'];
  tempStockData = tempStockData.concat( stockMarket.data.slice(-480) );

  stockchart.load({
    columns: [
      tempStockData
    ]
  });
}

function generateC3Charts() {
  tempREData = ['Price'];
  tempREData = tempREData.concat( reMarket.data );

  rechart = c3.generate({
    bindto: '#real_estate_chart_div',
    data: {
      columns: [
        tempREData
      ]
    },
    legend: {
      show: false,
    },
    point: {
      show: false
    },
    size: {
      height: 240,

    },
    transition: {
      duration: 0
    },

  });

  tempStockData = ['Price'];
  tempStockData = tempStockData.concat( stockMarket.data );

  stockchart = c3.generate({
    bindto: '#stock_chart_div',
    data: {
      columns: [
        tempStockData
      ]
    },
    legend: {
      show: false,
    },
    point: {
      show: false
    },
    size: {
      height: 240,

    },
    transition: {
      duration: 0
    }
  });
}

function pause(){
  clearInterval(chrono);
  chrono = null;
  if (!game.paused){
    game.paused = true;
    console.log("game was not paused but now is!");
  }
  else {
    console.log("game was already paused");
  }

  generateRentPrice();

  $("#pauseButton").css("color", "blue");
  $("#playButton").css("color", "#333");

  updateC3Charts();
}

function play(){
  chrono = setInterval(globalUpdate, DELAY);
  game.paused = false;

  $("#pauseButton").css("color", "#333");
  $("#playButton").css("color", "blue");
}

function commas(value){
  value = parseFloat(parseFloat(value).toFixed(2));
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function tradeStock(amt, action){
  amount = amt;
  shareCount = amount / stockMarket.price;
  console.log(shareCount);
  if (action == "buy"){
    game.player.assets[1].shares += shareCount;
    game.player.assets[0].value -= amount;
    game.player.cash -= amount;
    game.update();
  }
  if (action == "sell"){
    game.player.assets[1].shares -= shareCount;
    game.player.assets[0].value += amount;
    game.player.cash += amount;
    game.update();
  }
  //dismiss the stock modal?
}

function generateREListings(){
  //generate a series of listings, sq ft, price etc, based off of reMarket.price
  var numberOfListings = 1 + Math.floor( Math.random() * 15 );
  var listings = []
  var sizes = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000];
  
  for (var i = 0; i < numberOfListings; i++){
    var sqft = sizes[Math.floor(Math.random() * sizes.length)];
    //random factor for above or below market, 0.95 - 1.05 eg
    var priceFactor = ((Math.random() * 0.1) + 0.95);
    var price = (reMarket.price * sqft) * priceFactor;
    var marketPrice = reMarket.price * sqft;

    console.log(sqft + "  $" + commas(price)  + "  market $" + commas(marketPrice) );
  }
}

function acceptREOffer(offer, listPrice){
  //use some magic to determine if an offer is accepted
  //if an offer is below listprice then the chance goes down
  //if an offer is above listprice the the chance goes up

  var percent = offer / listPrice;
  var coinflip = Math.random();

  console.log(percent + "  coinflip:  " + coinflip);
 
  if (
    (percent >= 1.1) ||
    (percent >= 1.05 && coinflip <= 0.9) ||
    (percent >= 1.0 && coinflip <= 0.85) ||
    (percent >= 0.95 && coinflip <= 0.75) ||
    (percent >= 0.90 && coinflip <= 0.5) ||
    (percent >= 0.80 && coinflip <= 0.20) ||
    (coinflip <= 0.02)
  ){
    return true;
  }
  else {
    return false
  }
  
}

function generateRentPrice(){
  //generates a new rent price given the real estate market
  var sqft = 1100
  var rentPrice = reMarket.price * sqft / 150;
  console.log( commas(rentPrice) + " /mo" );
}
