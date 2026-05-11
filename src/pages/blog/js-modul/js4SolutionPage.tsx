import DayPostLayout, { CodeBlock, QuoteBox } from '../DayPostLayout';

export default function Js4SolutionPage() {
  const conclusion = (
    <>
      <h3>🧠 Final Notes</h3>
      <ul>
        <li>Functions are reusable logic containers</li>
        <li><code>return</code> makes functions useful</li>
        <li>Cleaner logic beats clever tricks</li>
        <li>Rewrite these without looking</li>
      </ul>
    </>
  );

  return (
    <DayPostLayout
      badge="JS Module 4 — Solutions"
      title="Function Mastery — Solutions"
      date="Jun 2026"
      tags="JavaScript, Functions, Solutions"
      readingTime="5 min read"
      intro="This page contains the official solutions for Module 4. If you haven't tried the challenges yet — stop scrolling."
      githubUrl="#"
      prev={{ path: '/blog/js-modul/js4', title: 'Function Mastery: From Beginner to Clean Code' }}
      next={{ path: '/blog/js-modul/js5', title: 'DOM Manipulation: When Code Starts Moving the Page' }}
      related={[]}
      conclusion={conclusion}
    >
      <QuoteBox>
        "Copying solutions doesn't make you better. Understanding why they work does."
      </QuoteBox>

      <section>
        <h2>🔥 Challenge 1 — Even or Odd Function</h2>
        <p>Create a function that:</p>
        <ul>
          <li>Receives a number</li>
          <li>Returns <b>Even</b> or <b>Odd</b></li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function checkEvenOdd(number) {
  if (number % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}

console.log(checkEvenOdd(7));
console.log(checkEvenOdd(10));`}
        </CodeBlock>

        <p>Modulo (<code>%</code>) is the core logic here. Same weapon, different use case.</p>
      </section>

      <section>
        <h2>🔥 Challenge 2 — Grade Generator</h2>
        <p>Rules:</p>
        <ul>
          <li>Input score</li>
          <li>Return grade (A–E)</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "E";
}

console.log(getGrade(92));
console.log(getGrade(76));
console.log(getGrade(60));`}
        </CodeBlock>

        <p>Early return keeps logic clean and readable. No nested mess.</p>
      </section>

      <section>
        <h2>🔥 Challenge 3 — Login Function</h2>
        <p>Conditions:</p>
        <ul>
          <li>Username must match</li>
          <li>Password must match</li>
          <li>Return success or error message</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function login(username, password) {
  const correctUsername = "admin";
  const correctPassword = "12345";

  if (username === correctUsername && password === correctPassword) {
    return "Login successful 👋";
  } else {
    return "Invalid credentials ❌";
  }
}

console.log(login("admin", "12345"));
console.log(login("user", "123"));`}
        </CodeBlock>

        <p>This is simplified authentication logic. Same concept used in real apps.</p>
      </section>

      <section>
        <h2>🚀 Bonus — Cleaner Validation</h2>
        <p>More detailed feedback:</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function login(username, password) {
  if (username !== "admin") {
    return "Username not found";
  } else if (password !== "12345") {
    return "Wrong password";
  } else {
    return "Login successful";
  }
}`}
        </CodeBlock>

        <p>Same logic. Better UX.</p>
      </section>
    </DayPostLayout>
  );
}