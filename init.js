game = new Game();

reMarket = new Market();
stockMarket = new Market();

reMarket.price = 250;
stockMarket.price = 1800;
stockMarket.volatility = 0.1;

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCharts);

rivets.bind($('#480'), { game: game });

$(document).keyup(function(e){
  console.log(e);
  if (e.keyCode == 32){
    e.preventDefault();
    console.log("SPACE");
    if (chrono == null){
      chrono = setInterval(globalUpdate, DELAY);
    }
    else {
      chrono = null;
    }
  }
});

//wait for keypress here, play paush with keypress
//chrono = setInterval(globalUpdate, DELAY);
