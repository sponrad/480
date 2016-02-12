function drawBackgroundColor() {
    data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Price');

    data.addRows([
        [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
        [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
        [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
        [66, 70], [67, 72], [68, 75], [69, 80]
    ]);

    options = {
        hAxis: {
            title: 'Day'
        },
        vAxis: {
            title: 'Price'
        },
        backgroundColor: '#ffffff'
    };

    chart = new google.visualization.LineChart(document.getElementById('real_estate_chart_div'));
    chart.draw(data, options);
    chart = new google.visualization.LineChart(document.getElementById('stock_chart_div'));
    chart.draw(data, options);
}     

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function Game(){
    this.day = 0;
    this.monthday = 0;
    this.month = 0;
    this.year = 0;
    this.player = new Player();
    this.update = function(){
	this.monthday = function(){ return (this.day % 30)+1; }
	this.month = function(){ return (Math.floor((this.day%360)/30))+1; }
	this.year = function(){ return (Math.floor(this.day/360))+1;}
    }
}

function Player(){
    this.name = "Zebedee Stanley";
    this.occupation = "Broker";
    this.assets = [];
    this.humanity = 2;
    this.networth = 45;
    this.monthlyincome =  function(){};
    this.monthlydebts = function(){};
    this.totalassets = function(){};
    this.totaldebts = function(){};
}

function Asset(){
    //id
    this.type = "home"; //(home, rental home, rental they live in, loan, bank account, credit card, ETC)
    this.name = "Apartment";
    this.interest = 0;
    this.payment = 800;
    this.happinessfactor = 1; //- does this add or detract from happiness
    this.currentvalue = 0;
    this.pastvalues = []; //(list of values per days)
    this.generatenextvalue = 0;
    this.paymentamount = 0;
    this.paymentdue = 0;
}
