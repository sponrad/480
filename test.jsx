import React from 'react';
import ReactDOM from 'react-dom';

/*class Hello extends React.Component {
  render() {
    return <h1>Hello</h1>
  }
}*/

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
        return(<h1>World {this.state.game.player.name } and day: { this.state.game.day }</h1>);
    },
});

game.player.name = "Babooo";

ReactDOM.render(<Hello/>, document.getElementById('hello'));
var world = ReactDOM.render(<World game={game} />, document.getElementById('world'));

game.player.name = "Zanadu";

game.player.name = "Conrad Frame";

function update(){
    game.day += 1;
    game.update();
    game.player.networth += 3;
    //game.processevents
    world.forceUpdate();
//    console.log( game.day+69);
    data.addRow([ (game.day+69), Math.floor(Math.random()*100) ] );
    chart.draw(data, options);
}

rivets.bind($('#480'), { game: game });

var now,
    dt   = 0,
    last = timestamp(),
    step = 1;

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
