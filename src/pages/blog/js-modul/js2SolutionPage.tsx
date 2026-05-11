import DayPostLayout, { CodeBlock, QuoteBox } from '../DayPostLayout';

export default function Js2SolutionPage() {
  const conclusion = (
    <>
      <h3>🧠 Final Notes</h3>
      <ul>
        <li>Solutions are tools, not shortcuts</li>
        <li>If this felt hard — good, that's growth</li>
        <li>Logic skill comes from repetition</li>
        <li>Rewrite these without looking next time</li>
      </ul>
    </>
  );

  return (
    <DayPostLayout
      badge="JS Module 2 — Solutions"
      title="Logic Brain Gym — Solutions"
      date="Jun 2026"
      tags="JavaScript, Logic, Solutions"
      readingTime="5 min read"
      intro="This page contains the official solutions for Module 2. If you haven't tried the challenges yet — stop scrolling."
      githubUrl="#"
      prev={{ path: '/blog/js-modul/js2', title: 'Logic Brain Gym' }}
      next={{ path: '/blog/js-modul/js3', title: 'Data Exploration: Array & Object' }}
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
        "Reading solutions without trying is like going to the gym just to watch people lift."
      </QuoteBox>

      <section>
        <h2>🔥 Challenge 1 — FizzBuzz</h2>
        <p>Rules recap:</p>
        <ul>
          <li>Multiple of 3 → <b>Fizz</b></li>
          <li>Multiple of 5 → <b>Buzz</b></li>
          <li>Multiple of 3 &amp; 5 → <b>FizzBuzz</b></li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let number = 15;

if (number % 3 === 0 && number % 5 === 0) {
  console.log("FizzBuzz");
} else if (number % 3 === 0) {
  console.log("Fizz");
} else if (number % 5 === 0) {
  console.log("Buzz");
} else {
  console.log(number);
}`}
        </CodeBlock>

        <p>
          <b>Why this order matters:</b><br />
          The combined condition must be checked first.
          Otherwise, JavaScript will exit early and your logic breaks.
        </p>
      </section>

      <section>
        <h2>🔥 Challenge 2 — Odd / Even Loop</h2>
        <p>Loop from 1 to 10:</p>
        <ul>
          <li>Even numbers → "Even"</li>
          <li>Odd numbers → "Odd"</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    console.log(i + " Even");
  } else {
    console.log(i + " Odd");
  }
}`}
        </CodeBlock>

        <p>
          This challenge checks three things: looping, modulo, and clean conditional thinking.
        </p>
      </section>

      <section>
        <h2>🔥 Challenge 3 — Login Simulation</h2>
        <p>Conditions:</p>
        <ul>
          <li>Correct username</li>
          <li>Correct password</li>
          <li>Error message if invalid</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let inputUsername = "admin";
let inputPassword = "12345";

let correctUsername = "admin";
let correctPassword = "12345";

if (inputUsername === correctUsername && inputPassword === correctPassword) {
  console.log("Login successful 👋");
} else {
  console.log("Username or password is wrong ❌");
}`}
        </CodeBlock>

        <p>This is a simplified version of real authentication logic. Same concept, different scale.</p>
      </section>

      <section>
        <h2>🚀 Bonus — More Detailed Validation</h2>
        <p>Cleaner feedback for users:</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`if (inputUsername !== correctUsername) {
  console.log("Username not found");
} else if (inputPassword !== correctPassword) {
  console.log("Wrong password");
} else {
  console.log("Login successful");
}`}
        </CodeBlock>

        <p>Same logic. Better UX.</p>
      </section>
    </DayPostLayout>
  );
}