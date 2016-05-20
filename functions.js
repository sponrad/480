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
    game.player.assets[1].shares = game.player.assets[1].shares * 1.0 + shareCount * 1.0;
    game.player.assets[0].value = game.player.assets[0].value * 1.0 - amount * 1.0;
    game.player.cash = game.player.cash * 1.0 - amount * 1.0;
    game.update();
  }
  if (action == "sell"){
    game.player.assets[1].shares = game.player.assets[1].shares * 1.0 - shareCount * 1.0;
    game.player.assets[0].value = game.player.assets[0].value * 1.0 + amount * 1.0;
    game.player.cash = game.player.cash * 1.0 + amount * 1.0;
    game.update();
  }
  //dismiss the stock modal?
}

function generateREListings(){
  //generate a series of listings, sq ft, price etc, based off of reMarket.price
  var numberOfListings = 5 + Math.floor( Math.random() * 15 );
  var listings = []
  var sizes = [500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 3000, 4000, 5000];
  
  for (var i = 0; i < numberOfListings; i++){
    var sqft = sizes[Math.floor(Math.random() * sizes.length)];
    //random factor for above or below market, 0.95 - 1.05 eg
    var priceFactor = ((Math.random() * 0.1) + 0.95);
    var price = (reMarket.price * sqft) * priceFactor;
    var marketPrice = reMarket.price * sqft;

    console.log(sqft + "  $" + commas(price)  + "  market $" + commas(marketPrice) );
    
    listings.push( [sqft, price, marketPrice] );
  }

  listings.sort(function(a,b){return a[0] - b[0] });
    
  return listings;
}

function generateFinancing(price){
  //given the price, generate down payment and monthly payment for 30 years.
  downPaymentPercent = 0.20;
  downPayment = price * 0.20;

  borrowed = price - downPayment;

  //monthlyPaymentEstimate = borrowed / 200;
  monthlyPaymentEstimate = borrowed / reMarket.price * 1.6;

  console.log( commas(monthlyPaymentEstimate) );

  return( [downPayment, borrowed, monthlyPaymentEstimate] );
  
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

function updateJobIncome(currentJobIncome){
  //return a good deviation for % increase
  multiple =  Math.abs(chance.normal({mean: 1.03, dev: 0.05}));
  if (multiple < 1){
    //TODO: roll another dice and see if they got fired?
    return currentJobIncome;
  }
  else {
    return currentJobIncome * multiple;
  }
}

function updateExpenses(expenseAsset){
  //console.log("running expense update");
  //currentExpense = expenseAsset.income;
  //return a good deviation for % increase
  //return currentExpense * Math.abs(chance.normal({mean: 1.03, dev: 0.05}));
  expenseAsset.income = expenseAsset.income * Math.abs(chance.normal({mean: 1.0035, dev: 0.004}));
  expenseAsset.updateDescription();
}
