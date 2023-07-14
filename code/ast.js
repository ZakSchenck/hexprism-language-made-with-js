const node = [
    "Program",
    "Literal",
    "UnaryExpression",
    "FunctionDeclaration",
    "CalledExpression",
    "BinaryExpression",
    "Identifier"
  ];
  
  const Statement = {
    kind: null,
  };
  
  const Program = {
    kind: "Program",
    body: [],
  };
  
  const Expression = {};
  
  const BinaryExpression = {
    kind: "BinaryExpression",
    left: Expression,
    operator: Expression,
    right: Expression,
  };
  
  const Identifier = {
    kind: "Identifier",
    symbol: "",
  };
  
  const NumericLiteral = {
    kind: "NumericLiteral",
    value: 0,
  };
  
  export {
    Statement,
    Program,
    Expression,
    BinaryExpression,
    Identifier,
    NumericLiteral,
  };
  