import * as React from 'react';
import Blackjack from '../../classes/games/Blackjack';

export interface BlackjackGameProps {

}

export interface BlackjackGameState {
  game: Blackjack;
}

export class BlackjackGame extends React.Component<BlackjackGameProps, BlackjackGameState> {
  constructor(props: BlackjackGameProps) {
    super(props);

    this.state = {
      game: new Blackjack()
    }

    this.handleStartGame = this.handleStartGame.bind(this);
  }

  handleStartGame = () => {
    this.state.game.start();
  }

  showCards = () => {
      this.state.game.playerHand.cards.map((card, idx) => {
        return <li key={ idx }>{ card.symbol } | { card.value }</li>
      })
  }

  render() {
    return(
      <>
        <button onClick={ this.handleStartGame }>Play</button>
        {
          this.state.game.playerHand.cards ? this.showCards() : <p></p>
        }
      </>
    ) 
  }
}