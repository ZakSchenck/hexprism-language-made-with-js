import { tokenize } from "./code/lexer.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function repl() {
  console.log("Repl v0.1");

  const questionAsync = (query) => {
    return new Promise((resolve) => {
      rl.question(query, resolve);
    });
  };

  const prompt = async () => {
    const input = await questionAsync("> ");

    if (!input || input.includes("exit")) {
      rl.close();
      return;
    }

    const tokens = tokenize(input);
    tokens.forEach((token) => {
      console.log(token);
    });

    prompt();
  };

  prompt();
}

repl();
