class Fraction {
  // 基本的にはprivateで定義する
  // private _numerator: number; // 分子
  // private _denominator: number; // 分母
  // constructor(numerator: number, denominator: number) {
  //   this._numerator = numerator;
  //   this._denominator = denominator;
  // }

  // 上記のコードを省略して書くことができる
  constructor(private _numerator: number, private _denominator: number) {
  }

  add(fraction: Fraction): Fraction {
    const resultNumerator = this._numerator * fraction._denominator + this._denominator * fraction._numerator;  
    const resultDenominator = this._denominator * fraction._denominator;
    return new Fraction(resultNumerator, resultDenominator);
  }

  toString(): string {
    return `${this._numerator}/${this._denominator}`;
  }

  get numerator(): number {
    return this._numerator;
  }
  
  get denominator(): number {
    return this._denominator;
  }
}

const f1 = new Fraction(1, 2);
console.log(f1); // Fraction { numerator: 1, denominator: 2 }

// privateがないと書き換え可能になってしまう
// f1.numerator = 3;
// console.log(f1); // Fraction { numerator: 3, denominator: 2 }

console.log(f1.numerator); // 1
console.log(f1.denominator); // 2

const f2 = new Fraction(1, 3);
console.log(f2.toString()); // 1 / 3

const f3 = f1.add(f2);
console.log(f3.toString()); // 5 / 6