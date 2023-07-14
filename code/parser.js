import { TokenType, tokenize } from "./lexer.js"
import {
  Statement,
  Program,
  Expression,
  BinaryExpression,
  Identifier,
  NumericLiteral,
} from "./ast.js"; 

class Parser {
  constructor() {
    this.tokens = [];
  }

  notEndOfFile() {
    return this.tokens.length > 0; 
  }

  parseStatement() {
    return this.parseExpression(); 
  }

  parseExpression() {
    return this.parsePrimaryExpression(); 
  }

  at() {
    return this.tokens[0]; 
  }

  advance() {
    const previous = this.tokens.shift(); 
    return previous;
  }

  parsePrimaryExpression() {
    const token = this.at(); 
    switch (token.type) { 
      case TokenType.Identifier:
        return { kind: "Identifier", symbol: this.advance().value }; 
      case TokenType.Number:
        return { kind: "NumericLiteral", value: parseFloat(this.advance().value) }; 
      default:
        console.error("Unexpected token:", this.at());
        break; 
    }
  }

  createAST(sourceCode) {
    this.tokens = tokenize(sourceCode);
    const program = {
      kind: "Program",
      body: [],
    };

    while (this.notEndOfFile()) {
      program.body.push(this.parseStatement());
    }

    return program;
  }
}

export {
  Parser,
};
