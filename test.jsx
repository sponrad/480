import React from 'react';
import ReactDOM from 'react-dom';

var Hello = React.createClass({
    render: function(){
        return(<h1>Hello</h1>);
    }
});

var World = React.createClass({
    getInitialState: function(){
        return { game: this.props.game }
    },
    render: function(){
        return (<div>
                <Hello />
                <h1>World {this.state.game.player.name } and day: { this.state.game.day }</h1>
                </div>
               );
    }
});

var world = ReactDOM.render(<World game={game} />, document.getElementById('world'));

function update(){
    game.day += 1;
    game.update();
    game.player.networth += 3;
    //game.processevents
    world.forceUpdate();
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
