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
      width: 400,
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
      width: 400,
    },
    transition: {
      duration: 0
    }
  });
}

function pause(){
  clearInterval(chrono);
  chrono = null;

  $("#pauseButton").css("color", "blue");
  $("#playButton").css("color", "#333");
}

function play(){
  chrono = setInterval(globalUpdate, DELAY);

  $("#pauseButton").css("color", "#333");
  $("#playButton").css("color", "blue");
}

function commas(value){
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function tradeStock(amt, action){
  amount = parseFloat(amt);
  shareCount = stockMarket.price / amount;
  if (action == "buy"){
    game.player.assets[1].shares += shareCount;
    game.player.assets[0].value -= amount;
    game.player.cash -= amount;
  }
  if (action == "sell"){
    game.player.assets[1].shares -= shareCount;
    game.player.assets[0].value += amount;
    game.player.cash += amount;
  }
}
