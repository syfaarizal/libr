import DayPostLayout, { CodeBlock, QuoteBox } from '../DayPostLayout';

export default function Js2Page() {
  const conclusion = (
    <>
      <h3>🧠 Key Takeaways</h3>
      <ul>
        <li>Logic is the heart of JavaScript</li>
        <li>if–else is the foundation</li>
        <li>Operators must be memorized</li>
        <li>Loops save time and sanity</li>
        <li>Mini programs train thinking, not typing</li>
      </ul>
    </>
  );

  return (
    <DayPostLayout
      badge="JS Module 2"
      title="Logic Brain Gym: Mastering Control Flow"
      date="Jun 2026"
      tags="JavaScript, Logic, Control Flow"
      readingTime="8 min read"
      intro="This is where JavaScript stops being just a language and starts becoming a way of thinking."
      githubUrl="#"
      prev={{ path: '/blog/js-modul/js1', title: 'JavaScript Basics' }}
      next={{ path: '/blog/js-modul/js2-solutions', title: 'JS Logic Brain Gym — Solutions' }}
      related={[
        {
          path: '/blog/days-challenge/day4',
          date: 'June 11, 2025',
          title: 'Day 4: Number Guessing Game',
          excerpt: 'Creating an engaging number guessing game with random number generation and user feedback.',
          tags: ['JavaScript', 'Game', 'Logic'],
        },
        {
          path: '/blog/days-challenge/day6',
          date: 'June 15, 2025',
          title: 'Day 6: Odd, Even, or Special?',
          excerpt: 'Creating a weather application that fetches data from an API and displays it beautifully.',
          tags: ['JavaScript', 'Conditions', 'Logic'],
        },
      ]}
      conclusion={conclusion}
    >
      <QuoteBox>
        "At this stage, you either level up… or give up.{'\n'}We level up."
      </QuoteBox>

      <section>
        <h2>🔀 Conditions: if, else if, else</h2>
        <p>Logic in JavaScript starts with one simple question:</p>
        <p><b>If this is true, what should happen? If not, then what?</b></p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`if (condition) {
  // runs if true
} else {
  // runs if false
}`}
        </CodeBlock>

        <p>Real-life example:</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let age = 18;

if (age >= 17) {
  console.log("You may enter the cinema 🎬");
} else {
  console.log("Sorry, not old enough 😅");
}`}
        </CodeBlock>

        <p>JavaScript has zero empathy. True runs. False gets skipped.</p>
      </section>

      <section>
        <h2>⚖️ Comparison Operators & Booleans</h2>
        <table className="tb-blog">
          <thead>
            <tr>
              <th>Operator</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>==</td><td>Equal value (not recommended)</td></tr>
            <tr><td>===</td><td>Equal value &amp; type (USE THIS)</td></tr>
            <tr><td>!=</td><td>Not equal</td></tr>
            <tr><td>&gt;</td><td>Greater than</td></tr>
            <tr><td>&lt;</td><td>Less than</td></tr>
            <tr><td>&gt;=</td><td>Greater or equal</td></tr>
            <tr><td>&lt;=</td><td>Less or equal</td></tr>
          </tbody>
        </table>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`console.log(5 === "5"); // false
console.log(5 === 5);   // true`}
        </CodeBlock>

        <p>
          Boolean values are brutally simple: <b>true</b> or <b>false</b>. No middle ground.
        </p>
      </section>

      <section>
        <h2>🔗 Logical Operators</h2>
        <table className="tb-blog">
          <thead>
            <tr>
              <th>Operator</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>&amp;&amp;</td><td>AND</td></tr>
            <tr><td>||</td><td>OR</td></tr>
            <tr><td>!</td><td>NOT (reverse)</td></tr>
          </tbody>
        </table>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let age = 20;
let hasTicket = true;

if (age >= 17 && hasTicket) {
  console.log("Welcome to the cinema 🍿");
}`}
        </CodeBlock>
      </section>

      <section>
        <h2>🧭 Switch Case</h2>
        <p>When conditions get messy, <b>switch</b> keeps things readable.</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Time to work 💼");
    break;
  case "Sunday":
    console.log("Rest day 😴");
    break;
  default:
    console.log("Just another day");
}`}
        </CodeBlock>

        <p>
          Forget <code>break</code>? Everything below it runs. Chaos mode activated.
        </p>
      </section>

      <section>
        <h2>🔁 Loops: Repeat Without Crying</h2>

        <h3>for loop</h3>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);
}`}
        </CodeBlock>

        <h3>while loop</h3>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let count = 1;

while (count <= 3) {
  console.log(count);
  count++;
}`}
        </CodeBlock>

        <h3>do while loop</h3>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let num = 1;

do {
  console.log(num);
  num++;
} while (num <= 3);`}
        </CodeBlock>
      </section>

      <section>
        <h2>🧪 Practice Time</h2>

        <h3>Odd / Even Check</h3>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let number = 7;

if (number % 2 === 0) {
  console.log("Even");
} else {
  console.log("Odd");
}`}
        </CodeBlock>

        <h3>Multiple Check</h3>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let num = 20;

if (num % 5 === 0) {
  console.log("Multiple of 5");
} else {
  console.log("Not a multiple of 5");
}`}
        </CodeBlock>
      </section>

      <section>
        <h2>🎟️ Mini Program: Cinema Ticket</h2>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let age = 19;
let money = 50000;

if (age >= 17 && money >= 40000) {
  console.log("Ticket purchased 🎬");
} else {
  console.log("Requirements not met 😔");
}`}
        </CodeBlock>
        <p>This is real-world logic. Programming is decision-making, not math.</p>
      </section>

      <section>
        <h2>🔥 Mini Challenges</h2>
        <ul>
          <li><b>FizzBuzz</b> (3, 5, 3 &amp; 5)</li>
          <li>Loop 1–10 → Odd / Even</li>
          <li>Login simulation (username &amp; password)</li>
        </ul>
        <p>Try first. Don't peek. Your brain needs reps.</p>
      </section>
    </DayPostLayout>
  );
}