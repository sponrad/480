google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBackgroundColor);

var data = null;
var chart, options;

//will be expanded to include base charts and market charts, occupation data, potential land and other purchase data

game = new Game();
