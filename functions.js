function globalUpdate(){
  console.log( game.day );
  game.day += 1;
  game.update();
  game.player.networth += 3;

  stockMarket.newPrice();
  reMarket.newPrice();

  updateC3Charts();
}

function updateC3Charts(){
  tempREData = ['Price'];
  tempREData = tempREData.concat( reMarket.data );

  rechart.load({
    columns: [
      tempREData
    ]
  });

  tempStockData = ['Price'];
  tempStockData = tempStockData.concat( stockMarket.data );

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
