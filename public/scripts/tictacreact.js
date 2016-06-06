var TicTacBoard = React.createClass({
  getInitialState: function() {
    return {gameOver:0, data: [{place:1,num:""},{place:2,num:""},{place:4,num:""},{place:8,num:""},{place:16,num:""},{place:32,num:""},{place:64,num:""},
    {place:128,num:""},{place:256,num:""}], player:"X", scoreX:0, scoreO:0, wins:[7, 56, 448, 73, 146, 292, 273, 84]};
  },
  componentDidMount: function() {
    //this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    var self = this;
    var switchPlayer = function(){
      if(self.state.player === "X")
        self.state.player = "O";
      else
        self.state.player = "X";
    };
    var checkWinState = function(score){
        for (var i = 0; i < self.state.wins.length; i++) {
            if ((self.state.wins[i] & score) === self.state.wins[i]) {
                return true;
            }
        }
        return false;
    };
    var handleClick = function(placeInArray) {
      if(!self.state.data[placeInArray].num && !self.state.gameOver){
        self.state.data[placeInArray].num = self.state.player;
        self.state["score" + self.state.player] += self.state.data[placeInArray].place;
        if(checkWinState(self.state["score" + self.state.player])){
          self.state.gameOver = 1;
          alert(self.state.player + " WINS!");
        }
        switchPlayer();
        self.setState({data: self.state.data});
      }
    }
    var resetBoard = function(){
      self.setState(self.getInitialState());
    }

    return (
      <div className="TicTacBoard">
        <h1>Tic-Tac-React</h1>
        <button onClick={resetBoard}>Reset Board</button>
        <TicTacList data={this.state.data} handleClick={handleClick} />
      </div>
    );
  }
});

var TicTacList = React.createClass({
  render: function() {
    var self = this;
    var i = -1;
    var ticTacNodes = this.props.data.map(function(player) {
      i++;
      return (
        <Tile placement={i} handleClick={self.props.handleClick}>
          {player.num}
        </Tile>
      );
    });
    return (
      <div className="ticTacList">
        <div className="row">
          {ticTacNodes}
        </div>
      </div>
    );
  }
});

var Tile = React.createClass({
  render: function() {
    var boundClick = this.props.handleClick.bind(this, this.props.placement);
    return (
      <div className="tile">
        <div className="col-xs-4" onClick={boundClick}>
          | {this.props.children} |
        </div>
      </div>
    );
  }
});


ReactDOM.render(
  <TicTacBoard />,
  document.getElementById('content')
);
