function Game(){
  this.day = 0;
  this.monthday = 0;
  this.month = 1;
  this.year = 0;
  this.age = 23;
  this.player = new Player();
  this.stockprice = stockMarket.price.toFixed(1);
  this.reprice = reMarket.price.toFixed(1);
  this.assets = [];
  this.update = function(){

    this.monthday = function(){ return (this.day % 30)+1; }
    //this.month = function(){ return (Math.floor((this.day%360)/30))+1; }
    this.month = function(){ return (Math.floor(this.day/30))+1; }
    this.year = function(){ return (Math.floor(this.day/360))+1;}
    this.age = function(){ return (Math.floor(this.day/360))+23;}
    //game.processevents
    
    this.stockprice = stockMarket.price.toFixed(1);
    this.reprice = reMarket.price.toFixed(1);

    this.player.update();
  }  
}

function Player(){
  this.name = "Zebedee Stanley";
  this.occupation = "Broker";
  this.assets = [];
  this.humanity = 2;
  this.income = 4800;
  this.payments = 4600;
  this.networth = 0;
  this.cash = 0;

  this.assets.push( new Asset("Cash", 500, function(){
    this.value += game.player.income - game.player.payments;
    game.player.cash = this.value;
  }));
  this.assets.push( new Asset("Rent, $800/mo", 0) );
  this.assets.push( new stockAsset(2500) );

  this.update = function(){
    this.networth = function(){
      sum = 0;
      for (let asset of this.assets){
        sum += asset.value;
      }
      console.log("sum " + sum);
      return sum;
    }
    
    for (let asset of this.assets) {
      asset.update();
    }
  }
}

function Asset(name, value, update=null){
  this.name = name;
  this.value = value;

  if (update){
    this.update = update;
  }
  else{
    this.update = function(){
      //should be defined when the asset is created
    }
  }
}

function stockAsset(amt){
  this.value = amt;
  this.startingValue = amt;
  this.shares = this.startingValue / stockMarket.price;
  this.name = "Stock " + this.shares.toFixed(2) + " shares";

  this.update = function(){
    this.value = parseFloat((stockMarket.price * this.shares).toFixed(1));
  }
}

function Market(){
  this.volatility = 0.005;
  this.data = []
  this.fortyYearMultiple = 1;
  this.price = 1;
  this.startingPrice = 1;
  this.newPrice = function(){
    change = 2 * this.volatility * Math.random();
    if (change > this.volatility)
      change -= (2 * this.volatility);
    change_amount = this.price * change;
    base_value = this.startingPrice * Math.pow(game.day, 2) * this.fortyYearMultiple / Math.pow(960,2);
    if ( (this.price + change_amount) < base_value){
      change_amount = Math.abs(change_amount);
    }
    this.price += change_amount;
    this.data.push(parseFloat( this.price.toFixed(1) ));
  }
  this.buy = function(amt){
    
  }
  this.sell = function(amt){
    
  }
}
