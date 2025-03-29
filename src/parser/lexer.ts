import type { Token } from "./tokens";

export class Lexer {
  private input: string;
  private readonly position: number;
  private readonly character: string;

  /**
   * Lexer constructor
   */
  constructor() {
    this.input = "";
    this.position = 0;
    this.character = "";
  }

  /**
   * Tokenizes the input string
   * @param {string} input The input string to tokenize
   * @returns {Token[]} The tokens
   */
  public tokenize(input: string): Token[] {
    this.input = input;

    const tokens = new Array<Token>();
    console.log(input);

    return tokens;
  }

  // peek -> look at the next character
  // next -> move to the next character
  // skipWhitespace -> skip whitespace characters
  // nextToken -> get the next token and push to tokens
  // isLetter, isDigit -> helpers
}

export const lexer = new Lexer();
