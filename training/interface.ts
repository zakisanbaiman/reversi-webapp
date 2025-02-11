const STONE = 0;
const PAPER = 1;
const SCISSORS = 2;

interface HandGenerator {
    generate(): number;
    generateArray(): number[];
}

class RandomHandGenerator implements HandGenerator {
    generate(): number {
        return Math.floor(Math.random() * 3);
    }

    generateArray(): number[] {
        return [];
    }
}

class StoneHandGenerator implements HandGenerator {
    generate(): number {
        return STONE;
    }

    generateArray(): number[] {
        return [];
    }
}

class Janken {
  play(handGenerator: HandGenerator): void {
    const computerHand = handGenerator.generate();
    console.log(`Computer hand: ${computerHand}`);
  } 
}

const janken = new Janken();
// const handGenerator = new RandomHandGenerator();
// janken.play(handGenerator);

const stoneHandGenerator = new StoneHandGenerator();
janken.play(stoneHandGenerator);
