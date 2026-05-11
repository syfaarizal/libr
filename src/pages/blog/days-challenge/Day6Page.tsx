import DayPostLayout, { CodeBlock, Output, HighlightBox } from '../DayPostLayout';

export default function Day6Page() {
  return (
    <DayPostLayout
      badge="Challenge Day 6"
      title="Odd, Even, or Special?"
      date="June 15, 2025"
      tags="JavaScript, Conditions, Logic"
      readingTime="8 min read"
      intro="Today's challenge focuses on number classification with layered logic to sharpen coding reasoning skills, including checking for odd, even, and multiples of 10."
      githubUrl="https://github.com/syfaarizal/js-ganjil-genap"
      prev={{ path: '/blog/days-challenge/day5', title: 'Creative Name Looping' }}
      next={{ path: '/blog/html-modul/html1', title: 'HTML Basics: The Foundation of Web Development' }}
      related={[
        {
          path: '/blog/days-challenge/day5',
          date: 'June 13, 2025',
          title: 'Day 5: Creative Name Looping',
          excerpt: 'Building a simple to-do list application with add, remove, and mark as complete functionality.',
          tags: ['JavaScript', 'Loops', 'Arrays'],
        },
        {
          path: '/blog/html-modul/html1',
          date: 'May 15, 2025',
          title: 'HTML Basics: The Foundation of Web Development',
          excerpt: 'Learn the basic concepts, tags, and structure that make up every webpage on the internet.',
          tags: ['HTML', 'Web Development', 'Basics'],
        },
      ]}
      conclusion={
        <>
          <h3><i className="fas fa-lightbulb"></i> Reflection</h3>
          <p>This challenge taught me many small but important things:</p>
          <ul>
            <li>Organizing <code>if-else</code> logic so they don't conflict</li>
            <li>Validating user input in a friendly way</li>
            <li>Giving expressive feedback through emojis (to make it fun!)</li>
            <li>Looping with <code>while (true)</code> and <code>break</code> when user wants to stop</li>
          </ul>
          <p>Definitely more excited to continue to <strong>Day 7</strong>! 🚀</p>
        </>
      }
    >
      <section>
        <h2><i className="fas fa-bullseye"></i> Challenge Goals</h2>
        <ul>
          <li>Practice nested conditions (<code>if</code>, <code>else if</code>, <code>else</code>)</li>
          <li>Understand odd, even, and multiple concepts</li>
          <li>Add input validation &amp; more human-friendly output</li>
        </ul>
      </section>

      <section>
        <h2><i className="fas fa-list-ol"></i> Program Description</h2>
        <ol>
          <li>User inputs a <strong>number</strong></li>
          <li>
            Program checks if the number is:
            <ul>
              <li>✅ Odd</li>
              <li>✅ Even</li>
              <li>🎉 Multiple of 10 (shows special message)</li>
            </ul>
          </li>
          <li>Output includes emojis to make it more expressive 😄</li>
        </ol>

        <CodeBlock lang="Example Output" langIcon="fab fa-js">
{`Enter a number: 27
➡️ 27 is an odd number 🔹

Enter a number: 44
➡️ 44 is an even number 🔸

Enter a number: 30
🎉 30 is an even number & multiple of 10!`}
        </CodeBlock>
      </section>

      <section>
        <h2><i className="fas fa-tools"></i> Tools &amp; Concepts</h2>
        <ul>
          <li><code>prompt()</code> and <code>parseInt()</code> to get user input</li>
          <li><code>isNaN()</code> for input validation</li>
          <li><code>if</code> and <code>else if</code> for conditional logic</li>
          <li><code>%</code> (modulus) operator to check odd/even/multiples</li>
        </ul>
      </section>

      <section>
        <h2><i className="fas fa-cog"></i> Basic Implementation</h2>

        <CodeBlock lang="Initial Version" langIcon="fab fa-js">
{`const input = parseInt(prompt("Enter a number:"));

if (isNaN(input)) {
    console.log("Please enter a valid number 😅");
} else if (input % 2 === 0) {
    console.log("This is an even number 👍");
} else {
    console.log("This is an odd number 👌");
}`}
        </CodeBlock>
      </section>

      <section>
        <h2><i className="fas fa-star"></i> Adding: Multiple of 10</h2>

        <HighlightBox>
          <p>
            Since multiples of 10 are always even, the <code>multiple of 10</code> check must come{' '}
            <strong>before</strong> the general even check. Otherwise it'll always be caught by the even
            condition first.
          </p>
          <CodeBlock lang="Enhanced Condition" langIcon="fab fa-js">
{`else if (input % 10 === 0 && input % 2 === 0)`}
          </CodeBlock>
        </HighlightBox>

        <h3><i className="fas fa-check-circle"></i> Full Code Version 1:</h3>
        <CodeBlock lang="With Special Case" langIcon="fab fa-js">
{`const input = parseInt(prompt("Enter a number:"));

if (isNaN(input)) {
    console.log("Please enter a valid number 😅"); 
} else if (input % 10 === 0 && input % 2 === 0) {
    console.log("🎉 This is an even number and multiple of 10!");
} else if (input % 2 === 0) {
    console.log("🔸 This is an even number!");
} else {
    console.log("🔹 This is an odd number!");
}`}
        </CodeBlock>
      </section>

      <section>
        <h2><i className="fas fa-sync-alt"></i> Bonus Challenge: Loop Version</h2>

        <CodeBlock lang="Interactive Version" langIcon="fab fa-js">
{`let input;

while (true) {
    input = prompt("Enter a number (type 'exit' to quit)");

    if (input === "exit") {
        console.log("Goodbye! 👋");
        break;
    }

    const number = parseFloat(input);

    if (isNaN(number)) {
        console.log("❌ Please enter a valid number 😅"); 
    } else if (number % 10 === 0 && number % 2 === 0) {
        console.log("🎊 This is an even number and multiple of 10!");
    } else if (number % 2 === 0) {
        console.log("🔸 This is an even number!");
    } else {
        console.log("🔹 This is an odd number!");
    }
}`}
        </CodeBlock>
      </section>

      <section>
        <h2><i className="fas fa-plus-circle"></i> Addition: Check Negative Numbers</h2>
        <p>
          One more edge case worth handling — what if the user enters a negative number? Let's give it
          a dedicated message too.
        </p>

        <h3><i className="fas fa-rocket"></i> Final Code:</h3>
        <CodeBlock lang="Complete Solution" langIcon="fab fa-js">
{`let input;

while (true) {
    input = prompt("Enter a number (type 'exit' to quit)");

    if (input === "exit") {
        console.log("Goodbye! 👋");
        break;
    }

    const number = parseFloat(input);

    if (isNaN(number)) {
        console.log("❌ Please enter a valid number 😅"); 
    } else if (number < 0) {
        console.log("📉 This is a negative number...");
    } else if (number % 10 === 0 && number % 2 === 0) {
        console.log("🎊 This is an even number and multiple of 10!");
    } else if (number % 2 === 0) {
        console.log("🔸 This is an even number!");
    } else {
        console.log("🔹 This is an odd number!");
    }
}`}
        </CodeBlock>
      </section>
    </DayPostLayout>
  );
}