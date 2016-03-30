game = new Game();

reMarket = new Market();
reMarket.price = 250;
stockMarket = new Market();
stockMarket.price = 55;
stockMarket.volatility = 0.3;

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCharts);


rivets.bind($('#480'), { game: game });

chrono = setInterval(update, DELAY);
