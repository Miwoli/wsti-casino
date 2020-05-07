import Game from '../Game';
import Deck, { card } from '../helpers/Deck';
import { reward } from '../../helpers/interfaces/reward';

export default class Blackjack extends Game {
  houseHand: {
    total: number;
    cards: card[];
    isStanded: boolean;
  }

  playerHand: {
    total: number;
    cards: card[];
    bet: number;
  }

  private deck: card[];

  constructor() {
    super();
    this.houseHand = {
      total: 0,
      cards: [],
      isStanded: false
    }

    this.playerHand = {
      total: 0,
      cards: [],
      bet: 0
    }

    this.deck = new Deck();
  }

  draw(): card {
    return this.deck[Math.floor(Math.random() * this.deck.length)];
  }

  hit(): void {
    let card = this.draw();

    this.playerHand.cards.push(card);
    this.playerHand.total += card.weight;

    
    if (this.houseHand.total < 17) {
      card = this.draw();
      this.houseHand.cards.push(card);
      this.houseHand.total += card.weight;
    } else {
      this.houseHand.isStanded = true;
    }
  }

  stand(natural?: boolean): reward {

    while (this.houseHand.isStanded === false && (this.houseHand.total < this.playerHand.total) && (this.houseHand.total <= 21)) {
      let card = this.draw();
      this.houseHand.cards.push(card);
      this.houseHand.total += card.weight;
    }

    if (natural && this.houseHand.total !== 21) {
      return { name: 'Natural!', reward: this.bet + (this.bet * 1.5) };
    }

    if (natural && this.houseHand.total === 21) {
      return { name: 'Tie', reward: this.bet };
    }

    if (this.playerHand.total <= 21) {
      if (this.houseHand.total > 21) {
        return { name: 'Win', reward: this.bet * 2 };
      }

      if (this.playerHand.total > this.houseHand.total) {
        return { name: 'Win', reward: this.bet * 2 };
      } else if (this.playerHand.total === this.houseHand.total) {
        return { name: 'Tie', reward: this.bet };
      } else {
        return { name: 'Lose', reward: 0 };
      }
    }

    return { name: 'Lose', reward: 0 };
  }

  reset(): void {
    this.houseHand.cards = [];
    this.houseHand.total = 0;
    this.houseHand.isStanded = false;

    this.playerHand.cards = [];
    this.playerHand.total = 0;
  }

  start(bet: number): void {
    this.bet = bet;
    for (let i = 0; i < 2; i++) {
      this.playerHand.cards.push(this.draw());
      this.playerHand.total += this.playerHand.cards[this.playerHand.cards.length - 1].weight;
    }

    for (let i = 0; i < 2; i++) {
      this.houseHand.cards.push(this.draw());
      this.houseHand.total += this.houseHand.cards[this.houseHand.cards.length - 1].weight;
    }
  }
}