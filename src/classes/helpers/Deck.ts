export interface card {
  value: string,
  symbol: string,
  weight: number
}

const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];
const symbols = [
  'Hearts',
  'Clubs',
  'Spades',
  'Diamonds'
];

const createDeck = (): card[] => {
  const deck: card[] = [];
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < symbols.length; j++) {
      let weight = parseInt(values[i]);

      if (values[i] === 'J'
        || values[i] === 'Q'
        || values[i] === 'K') {
          weight = 10;
        }

      if (values[i] === 'A') {
        weight = 11;
      }

      deck.push({ value: values[i], symbol: symbols[j], weight: weight });
    }
  }

  return deck;
}
export default class Deck extends Array {
  constructor() {
    super()
    return createDeck();
  }
}