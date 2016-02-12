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
