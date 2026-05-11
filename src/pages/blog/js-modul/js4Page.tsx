import DayPostLayout, { CodeBlock, QuoteBox } from '../DayPostLayout';

export default function Js4Page() {
  const conclusion = (
    <>
      <h3>📌 Key Takeaways</h3>
      <ul>
        <li>Functions make code reusable</li>
        <li><code>return</code> gives real results</li>
        <li>Parameters add flexibility</li>
        <li>Arrow functions are modern standard</li>
        <li>Scope separates clean code from chaos</li>
      </ul>
    </>
  );

  return (
    <DayPostLayout
      badge="JS Module 4"
      title="Function Mastery: From Beginner to Clean Code"
      date="Jan 2026"
      tags="JavaScript, Functions, Clean Code"
      readingTime="10 min read"
      intro="When your code gets long and copy–paste starts spreading, that's your sign: you need functions."
      githubUrl="#"
      prev={{ path: '/blog/js-modul/js3-solutions', title: 'Array & Object — Solutions' }}
      next={{ path: '/blog/js-modul/js4-solutions', title: 'Function Mastery — Solutions' }}
      related={[]}
      conclusion={conclusion}
    >
      <QuoteBox>"Functions separate script writers from real developers."</QuoteBox>

      <section>
        <h2>🛠️ What Is a Function?</h2>
        <p>A function is a reusable block of logic.</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function sayHello() {
  console.log("Hello world 👋");
}

sayHello();`}
        </CodeBlock>

        <p>Instead of repeating logic, you wrap it once and reuse it.</p>
      </section>

      <section>
        <h2>⚔️ Function Declaration vs Expression</h2>

        <h3>🟢 Function Declaration</h3>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function greet() {
  console.log("Hi!");
}`}
        </CodeBlock>
        <ul>
          <li>Can be called before declaration</li>
          <li>Good for core logic</li>
        </ul>

        <h3>🔵 Function Expression</h3>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`const greet = function() {
  console.log("Hi!");
};`}
        </CodeBlock>
        <ul>
          <li>Stored in a variable</li>
          <li>More predictable</li>
          <li>Common in modern codebases</li>
        </ul>
      </section>

      <section>
        <h2>🚀 Arrow Functions</h2>
        <p>Cleaner. Shorter. Modern.</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`const greet = () => {
  console.log("Hello!");
};`}
        </CodeBlock>

        <p>Ultra-short version:</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
          {`const greet = () => console.log("Hello!");`}
        </CodeBlock>

        <p>This is what you'll see in React and modern projects.</p>
      </section>

      <section>
        <h2>🎁 Return Value</h2>
        <p>
          Without <code>return</code>, a function only talks.
          With <code>return</code>, it gives results.
        </p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function add(a, b) {
  return a + b;
}

let result = add(3, 4);
console.log(result);`}
        </CodeBlock>

        <p>No return? You get <code>undefined</code>.</p>
      </section>

      <section>
        <h2>🎯 Parameters & Default Values</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function greet(name) {
  console.log("Hello " + name);
}

greet("Syfa");`}
        </CodeBlock>

        <p>Default parameter:</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function greet(name = "Guest") {
  console.log("Hello " + name);
}

greet();`}
        </CodeBlock>

        <p>Safe, clean, no runtime errors.</p>
      </section>

      <section>
        <h2>🌍 Scope: Global vs Local</h2>

        <h3>❌ Global Scope</h3>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let name = "Syfa";

function showName() {
  console.log(name);
}`}
        </CodeBlock>
        <p>Everyone can access it. Dangerous at scale.</p>

        <h3>✅ Local Scope</h3>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function showAge() {
  let age = 20;
  console.log(age);
}`}
        </CodeBlock>
        <p>Local variables stay inside. Cleaner. Safer.</p>
      </section>

      <section>
        <h2>🧮 Mini Project — Simple Calculator</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function calculate(a, b, operator) {
  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "*") return a * b;
  if (operator === "/") return a / b;

  return "Invalid operator";
}

console.log(calculate(10, 5, "+"));
console.log(calculate(10, 5, "*"));`}
        </CodeBlock>

        <p>This is real-world logic, not toy code.</p>
      </section>

      <section>
        <h2>🎲 Mini Project — Random Quote Generator</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`const quotes = [
  "Stay hungry, stay foolish.",
  "Code. Sleep. Repeat.",
  "Consistency beats talent."
];

function getRandomQuote() {
  let index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

console.log(getRandomQuote());`}
        </CodeBlock>

        <p>This connects perfectly to DOM later.</p>
      </section>

      <section>
        <h2>🔥 Mini Challenges</h2>
        <ul>
          <li>Function: return "Even" or "Odd"</li>
          <li>Function: input score → return grade</li>
          <li>Function: login validation</li>
        </ul>
        <p>Try first. Solutions come later.</p>
      </section>

      <section>
        <h2>🧠 Why This Module Is Critical</h2>
        <ul>
          <li>DOM uses functions</li>
          <li>Events are functions</li>
          <li>Fetch API uses functions</li>
          <li>React is function-based</li>
        </ul>
        <p>No functions = chaotic codebase.</p>
      </section>
    </DayPostLayout>
  );
}