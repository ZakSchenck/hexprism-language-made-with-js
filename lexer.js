const fs = require('fs');

// Custom tokens in HexPrism
const TokenType = {
  Number: 0,
  Identifier: 1,
  Equals: 2,
  Set: 3,
  OpenParen: 4,
  CloseParen: 5,
  BinaryOperator: 6,
};

// Keyword dictionary
const KEYWORDS = {
  set: TokenType.Set,
};

// Checks if token is alphabetic
const isAlphabetical = (src) => {
  return src.toUpperCase() != src.toLowerCase();
};

// Checks if given string is a number character
// Returns boolean
const isInteger = (str) => {
  const char = str.charCodeAt(0);
  const boundaries = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
  return char >= boundaries[0] && char <= boundaries[1];
};

// Returns Token object for each Token value
const token = (value = '', type) => {
  return { value, type };
};

// Checks if the given character is a skippable character
const isSkippableCharacters = (str) => {
  return str === ' ' || str === '\n' || str === '\t';
};

// Stores each token and 'Tokenizes' them
const tokenize = (sourceCode) => {
  const tokens = [];
  const src = sourceCode.split('');

  // Build each token until end of file
  while (src.length > 0) {
    // Open Parenthesis
    if (src[0] === '(') {
      tokens.push(token(src.shift(), TokenType.OpenParen));
    }
    // Closed parenthesis
    else if (src[0] === ')') {
      tokens.push(token(src.shift(), TokenType.CloseParen));
    }
    // Binary operator / Math operator handlers
    else if (src[0] === '+' || src[0] === '-' || src[0] === '*' || src[0] === '/') {
      tokens.push(token(src.shift(), TokenType.BinaryOperator));
    }
    // Equals sign
    else if (src[0] === '=') {
      tokens.push(token(src.shift(), TokenType.Equals));
    }
    // Characters that are more than one character
    else {
      // Check if it's an integer
      if (isInteger(src[0])) {
        let num = '';
        // Runs loop if characters exist and if it is an integer
        while (src.length > 0 && isInteger(src[0])) {
          num += src.shift();
        }
        tokens.push(token(num, TokenType.Number));
      }
      // Check if it's alphabetic
      else if (isAlphabetical(src[0])) {
        let char = '';
        // Runs loop if characters exist and if it is alphabetic
        while (src.length > 0 && isAlphabetical(src[0])) {
          char += src.shift();
        }
        const reserved = KEYWORDS[char];
        if (reserved === undefined) {
          tokens.push(token(char, TokenType.Identifier));
        } else {
          tokens.push(token(char, reserved));
        }
      }
      // Skips the current character
      else if (isSkippableCharacters(src[0])) {
        src.shift();
      }
      // Unrecognized character
      else {
        console.log('Unrecognized character:', src[0]);
        process.exit();
      }
    }
  }

  return tokens;
};

// Read source code from test.txt file
const source = fs.readFileSync('./codeTest.txt', 'utf8');
// Tokenize the source code and log each token
for (const token of tokenize(source)) {
  console.log(token);
}


module.exports = {
  TokenType,
  tokenize
}