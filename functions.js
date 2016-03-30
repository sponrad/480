function update(){
  console.log( game.day );
  game.day += 1;
  game.update();
  game.player.networth += 3;
  //game.processevents

  stockMarket.newPrice();
  reMarket.newPrice();

  stockdata.addRow([ (game.day), stockMarket.price ] );
  stockchart.draw(stockdata, options);

  redata.addRow([ (game.day), reMarket.price ] );
  rechart.draw(redata, options);
  //updateCharts();
}

function drawCharts() {
  redata = new google.visualization.DataTable();
  redata.addColumn('number', 'X');
  redata.addColumn('number', 'Price');

  stockdata = new google.visualization.DataTable();
  stockdata.addColumn('number', 'X');
  stockdata.addColumn('number', 'Price');

  options = {
    hAxis: {
      title: 'Day'
    },
    vAxis: {
      title: 'Price'
    },
    backgroundColor: '#ffffff'
  };
  
  rechart = new google.visualization.LineChart(document.getElementById('real_estate_chart_div'));
  rechart.draw(redata, options);
  stockchart = new google.visualization.LineChart(document.getElementById('stock_chart_div'));
  stockchart.draw(stockdata, options);
}
