function globalUpdate(){
  console.log( game.day );
  game.day += 1;
  game.update();
  game.player.networth += 3;

  stockMarket.newPrice();
  reMarket.newPrice();

  rechart.flow({
    rows: [
      ['Price'],
      [parseFloat( reMarket.price.toFixed(1) )]
    ],
    to: 0,
    duration: 0.3
  });

  stockchart.flow({
    rows: [
      ['Price'],
      [parseFloat( stockMarket.price.toFixed(1) )]
    ],
    to: 0,
    length: 30,
    duration: 0.3
  });

}

function drawC3Charts() {
  rechart = c3.generate({
    bindto: '#real_estate_chart_div',
    data: {
      rows: [
        ['Price'],
        [reMarket.price]
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

  stockchart = c3.generate({
    bindto: '#stock_chart_div',
    data: {
      rows: [
        ['Price'],
        [stockMarket.price]
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
