import DayPostLayout, { CodeBlock, Output, HighlightBox } from '../DayPostLayout';

export default function Day2Page() {
  return (
    <DayPostLayout
      badge="Challenge Day 2"
      title="Simple Age Calculator"
      date="June 6, 2025"
      tags="JavaScript, Math, Calculator"
      readingTime="7 min read"
      intro="Today's challenge was to create a JavaScript program that calculates someone's age based on their birth year, with proper input validation and edge case handling."
      githubUrl="https://github.com/syfaarizal/js-age-calculator"
      prev={{ path: '/blog/days-challenge/day1', title: 'Print Name and Status' }}
      next={{ path: '/blog/days-challenge/day3', title: 'Interactive Calculator' }}
      related={[
        {
          path: '/blog/days-challenge/day1',
          date: 'June 5, 2025',
          title: 'Day 1: Print Name and Status',
          excerpt: 'Learn how to print your name and status using JavaScript template literals — clean and cool output!',
          tags: ['JavaScript', 'Template Literals'],
        },
        {
          path: '/blog/days-challenge/day3',
          date: 'June 9, 2025',
          title: 'Day 3: Interactive Calculator',
          excerpt: 'Building a fully functional calculator with interactive user interface and proper error handling.',
          tags: ['JavaScript', 'Function', 'Calculator'],
        },
      ]}
      conclusion={
        <>
          <h3>🎯 What I Learned Today</h3>
          <ol>
            <li>Don't mix <code>prompt()</code> and <code>readline()</code> 😅</li>
            <li>Use <code>parseInt()</code> to ensure the input is a number</li>
            <li>Input validation is super important!</li>
            <li>Small additions like <code>\n</code> can make the program output much more readable</li>
          </ol>
          <p>
            Every challenge isn't just about whether the code works or not, but about{' '}
            <strong>how we think and learn from our mistakes.</strong> And on day 2, I understand even more
            why debugging isn't an enemy, but a friend.
          </p>
        </>
      }
    >
      <section>
        <p>
          Today's challenge really made my brain curl 😅 We were asked to create a <strong>JavaScript
          program</strong> that calculates someone's age based on their <strong>birth year</strong>. Sounds
          simple, but when I actually started coding, there were quite a few traps.
        </p>
      </section>

      <section>
        <h2><i className="fas fa-lightbulb"></i> Challenge Description</h2>
        <p>Create a program that:</p>
        <ol>
          <li>Asks the user to enter their <strong>birth year</strong></li>
          <li>Calculates their <strong>current age</strong></li>
          <li>Displays a message like this:</li>
        </ol>

        <CodeBlock lang="Expected Output" langIcon="fab fa-js">
{`You were born in 2005.
The current year is 2025.
That means you're 20 years old 🎉
Next year you'll be 21 years old.`}
        </CodeBlock>
      </section>

      <section>
        <h2><i className="fas fa-brain"></i> Thought Process (and Small Mistakes 😅)</h2>
        <p>At first I thought the input could be written like this:</p>

        <CodeBlock lang="Initial Attempt" langIcon="fab fa-js">
{`const readline = prompt();
const birthYear = readline.question("Enter your birth year: ");`}
        </CodeBlock>

        <p>Turns out... <strong>WRONG!</strong></p>
        <p>
          I forgot that <code>prompt()</code> only works in browsers, while{' '}
          <code>readline.question(...)</code> is part of Node.js's <code>readline</code> module — and{' '}
          <strong>you can't mix them.</strong>
        </p>
        <p>
          Luckily I still understood the logic. After some more tinkering (and asking ChatGPT too 🤭),
          I finally got the correct version:
        </p>
      </section>

      <section>
        <h2><i className="fas fa-check-circle"></i> Browser Version Solution</h2>

        <CodeBlock lang="Working Solution" langIcon="fab fa-js">
{`const birthYear = prompt("Enter your birth year: ");
const birth = parseInt(birthYear); // convert input string to number
const currentYear = new Date().getFullYear();
const age = currentYear - birth;
const nextYear = age + 1;

console.log(\`You were born in \${birthYear}. The current year is \${currentYear}. That means you're \${age} years old 🎉 Next year you'll be \${nextYear} years old.\`);`}
        </CodeBlock>
      </section>

      <section>
        <h2><i className="fas fa-question-circle"></i> Why parseInt()?</h2>
        <p>
          Because input from <code>prompt()</code> is always a string. If we want to calculate age, we need
          to convert it to a number first. That's why we need <code>parseInt()</code> or we could also use{' '}
          <code>Number()</code>.
        </p>
      </section>

      <section>
        <h2><i className="fas fa-star"></i> Bonus Challenge: Validation &amp; Edge Cases</h2>
        <p>
          The bonus challenge was fun too: we were asked to add additional logic so the program could handle
          weird cases, like...
        </p>

        <h3><i className="fas fa-rocket"></i> Case 1: User Enters Year Greater Than Current Year</h3>
        <CodeBlock lang="Future Year Check" langIcon="fab fa-js">
{`if (birth > currentYear) {
    console.log("Are you from the future? 🛸");
}`}
        </CodeBlock>

        <h3><i className="fas fa-exclamation-triangle"></i> Case 2: Invalid Input (Letters, empty, etc)</h3>
        <CodeBlock lang="Input Validation" langIcon="fab fa-js">
{`if (isNaN(birth)) {
    console.log("Invalid input. Please enter a valid birth year.");
}`}
        </CodeBlock>

        <HighlightBox>
          <h3><i className="fas fa-broom"></i> Bonus Tip: Use <code>\n</code> for cleaner output</h3>
          <p>
            In JavaScript console, <code>\n</code> works like <code>&lt;br&gt;</code> in HTML. So we can
            format the output to be more readable.
          </p>
        </HighlightBox>
      </section>

      <section>
        <h2><i className="fas fa-file-code"></i> Final Code</h2>
        <CodeBlock lang="Complete Solution" langIcon="fab fa-js">
{`const birthYear = prompt("Enter your birth year: ");
const birth = parseInt(birthYear);
const currentYear = new Date().getFullYear();
const age = currentYear - birth;
const nextYear = age + 1;

if (isNaN(birth)) {
    console.log("Invalid input. Please enter a valid birth year.");
} else if (birth > currentYear) {
    console.log("Are you from the future? 🛸");
} else {
    console.log(\`You were born in \${birthYear}.\\nThe current year is \${currentYear}.\\nThat means you're \${age} years old 🎉\\nNext year you'll be \${nextYear} years old.\`);
}`}
        </CodeBlock>
      </section>
    </DayPostLayout>
  );
}