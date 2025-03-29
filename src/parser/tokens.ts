export enum TokenType {
  ROOT,            // $
  DOT,             // .
  PROPERTY,        // name
  LEFT_BRACKET,    // [
  RIGHT_BRACKET,   // ]
  NUMBER,          // 0
  EOQ,             // End Of Query
}

export interface Token {
  type: TokenType;
  value: string;
  position: number;
}
