import React from 'react';
import ReactDOM from 'react-dom';

var Hello = React.createClass({
    render: function(){
        return(<h1>Hello</h1>);
    }
});

var Header = React.createClass({
    render: function(){
        return(
            <div className="row">
	    <div className="col-md-6">
	    <h1>480</h1>
	    </div>
	    
	    <div className="col-md-6">

            <span>Year: { this.props.game.year } | Month: { this.props.game.month } | Day: { this.props.game.monthday }</span>
	    <span className="glyphicon glyphicon-pause"></span>
	    <span className="glyphicon glyphicon-play"></span>
	    <span className="glyphicon glyphicon-forward"></span>
	    <span className="glyphicon glyphicon-fast-forward"></span>
	    </div>
            </div>
        );
    }
});

//another component for mid section

var World = React.createClass({    
    render: function(){        
        return (
            <div className="container-fluid">
            <Hello/>
            <Header game={this.props.game} />
            <h1>World {this.props.game.player.name } and day: { this.props.game.day }</h1>
            </div>
        );
    }
});

var worldref = ReactDOM.render(<World game={game} />, document.getElementById('world'));

function update(){
    //updating globals ... and world which is not a global
    game.day += 1;
    game.update();
    game.player.networth += 3;
    worldref.forceUpdate();
    data.addRow([ (game.day+69), Math.floor(Math.random()*100) ] );
    chart.draw(data, options);
}

$(document).ready( function(){
    //loop logic
    var now,
        dt   = 0,
        last = timestamp(),
        step = 0.5;

    function frame() {
        now = timestamp();
        dt = dt + Math.min(1, (now - last) / 1000);
        while(dt > step) {
	    dt = dt - step;
	    update();
	    //console.log( game );
        }
        //render(dt);
        last = now;
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
});
