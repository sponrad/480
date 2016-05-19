function Game(){
  this.paused = true;
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
  this.assets = [];
  this.happiness = 90;
  this.income = 0;
  this.payments = 0;
  this.networth = 0;
  this.cash = 0;

  this.assets.push( new Asset("Cash", 500, function(){
    this.value += game.player.income - game.player.payments;
    game.player.cash = this.value;
    this.updateDescription();
  }));
  this.assets.push( new stockAsset(0) );
  this.assets.push( new Job("Entry Level", 4800) );
  this.assets.push( new Asset("Rent", 0, update=null, income=-800) );
  this.assets.push( new Asset("Expenses", 0, update=null, income=-3600) );


  this.update = function(){
    income = 0;
    payments = 0;
    networth = 0;

    for (var i =0; i < this.assets.length; i++) {
      this.assets[i].update();

      if (this.assets[i].income >= 0){
        income += this.assets[i].income;
      }
      else {
        payments += Math.abs(this.assets[i].income);
      }
      networth += this.assets[i].value;
    }
    
    this.income = income;
    this.payments = payments;
    this.networth = networth;
    
  }
}

function Asset(name, value, update=null, income=0){
  this.value = value;
  this.name = name;
  this.description = name
  this.income = income;

  this.updateDescription = function(){
    if (this.value > 0){
      this.description = this.name + ": $" + commas(this.value);
    }
    if (this.income != 0){
      if (this.income > 0){
        this.description = this.name + ": $" + commas(this.income);
      }
      else {
        this.description = this.name + ": -$" + commas( Math.abs(this.income) );
      }
    }
  }
  
  this.updateDescription();

  if (update){
    this.update = update;
  }
  else{
    this.update = function(){
      this.updateDescription();
    }
  }


}

function Job(name, income){
  this.income = income;
  this.payment = 0;
  this.name = name;
  this.description = "Job: " + name + "  $" + this.income + " /mo";
  this.value = 0;
  this.tick = 0
  this.update = function(){
    this.tick += 1
    //change earnings over time?
    if (this.tick == 12){
      this.income = updateJobIncome(Number(this.income));
      this.tick = 0;
    }
  }
}

function stockAsset(amt){
  this.value = amt;
  this.income = 0;
  this.payment = 0;
  this.shares = amt / stockMarket.price;
  this.description = "Stock " + this.shares.toFixed(2) + " shares: $" + commas(this.value.toFixed(1));
  
  this.update = function(){
    this.value = parseFloat((stockMarket.price * this.shares).toFixed(1));
    this.description = "Stock " + this.shares.toFixed(2) + " shares: $" + commas(this.value.toFixed(1));
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
