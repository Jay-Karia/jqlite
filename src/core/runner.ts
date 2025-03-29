import { lexer } from "parser/lexer";
import type {Token} from "parser/tokens";

export class QueryRunner {
  /**
   * Runs the query
   * @description Runs the query and returns the result
   * @param {string} query The query to run
   * @return {void}
   * @example
   * ```ts
   * query.run("$.friends[0].name");
   * ```
   */
  public run(query: string): void {
    const tokens: Token[] = lexer.tokenize(query);
  }
}

export const query = new QueryRunner();
