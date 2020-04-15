import Game from '../Game';
import Deck, { card } from '../helpers/Deck';

export default class Blackjack extends Game {
  houseHand: {
    total: number;
    cards: card[] | undefined;
  }

  playerHand: {
    total: number;
    cards: card[] | undefined;
  }

  private deck: card[];

  constructor() {
    super();
    this.houseHand = {
      total: 0,
      cards: []
    }

    this.playerHand = {
      total: 0,
      cards: []
    }

    this.deck = new Deck();
  }

  draw(): card {
    return this.deck[Math.floor(Math.random() * this.deck.length)];
  }

  start() {
    for (let i = 0; i < 2; i++) {
      this.playerHand.cards.push(this.draw());
      this.playerHand.total += this.playerHand.cards[this.playerHand.cards.length - 1].weight;
    }

    for (let i = 0; i < 2; i++) {
      this.houseHand.cards.push(this.draw());
      this.houseHand.total += this.houseHand.cards[this.houseHand.cards.length - 1].weight;
    }

    console.log(this.playerHand);
    console.log(this.houseHand);
  }
}