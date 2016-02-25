game = new Game();

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCharts);


rivets.bind($('#480'), { game: game });

setInterval(update, DELAY);
