var data = null;
var chart, options;

INFLATION_RATE = 0.04;

game = new Game();

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBackgroundColor);
