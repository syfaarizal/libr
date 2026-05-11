import DayPostLayout, { CodeBlock, Output, HighlightBox } from '../DayPostLayout';

export default function Day3Page() {
  return (
    <DayPostLayout
      badge="Challenge Day 3"
      title="Interactive Calculator"
      date="June 9, 2025"
      tags="JavaScript, Functions, Calculator"
      readingTime="9 min read"
      intro="Day 3 of this coding challenge really made me frown but also smile when I finally got it working. I was challenged to create a simple interactive calculator using JavaScript with proper input validation and looping functionality."
      githubUrl="https://github.com/syfaarizal/js-mini-calculator"
      prev={{ path: '/blog/days-challenge/day2', title: 'Simple Age Calculator' }}
      next={{ path: '/blog/days-challenge/day4', title: 'Number Guessing Game' }}
      related={[
        {
          path: '/blog/days-challenge/day2',
          date: 'June 6, 2025',
          title: 'Day 2: Simple Age Calculator',
          excerpt: 'Creating a JavaScript program that calculates age based on birth year with proper date handling.',
          tags: ['JavaScript', 'Math', 'Calculator'],
        },
        {
          path: '/blog/days-challenge/day4',
          date: 'June 11, 2025',
          title: 'Day 4: Number Guessing Game',
          excerpt: 'Creating an engaging number guessing game with random number generation and user feedback.',
          tags: ['JavaScript', 'Game', 'Logic'],
        },
      ]}
      conclusion={
        <>
          <h3>🎯 Key Takeaways</h3>
          <ul>
            <li><code>parseFloat()</code> is more flexible than <code>parseInt()</code> for handling decimal numbers</li>
            <li><code>isNaN()</code> serves as the first line of defense for number validation</li>
            <li>Functions make the code cleaner and reusable</li>
            <li><code>while</code> loop + <code>confirm()</code> makes the program dynamic and fun for users</li>
          </ul>
          <p>
            In the end, this became more than just a regular calculator — it was practice in logical
            thinking, cleaning up code structure, and creating an interactive experience for users.
            See you in the next challenge! 🚀
          </p>
        </>
      }
    >
      <section>
        <p>At first I wrote it like this:</p>

        <CodeBlock lang="Initial Attempt" langIcon="fab fa-js">
{`const num1 = prompt("Enter first number");
const num2 = prompt("Enter second number");
const num1 = prompt("Enter operator (+, -, *, /)");`}
        </CodeBlock>

        <p>
          Yes, I mistakenly reused <code>num1</code>, and the operator prompt was completely wrong.
          Then I went ahead and created a <code>switch</code>:
        </p>

        <CodeBlock lang="Switch Statement Attempt" langIcon="fab fa-js">
{`switch(num1){
  case = "+":
    console.log(num1 + num2)
}`}
        </CodeBlock>

        <p>
          First problem? The numbers we get from <code>prompt()</code> are <strong>strings</strong>, not
          numbers. So if we add them directly, they get concatenated instead of summed. For example:{' '}
          <code>"2" + "3" = "23"</code>, not <code>5</code>. The solution? Use <code>parseFloat()</code>{' '}
          so it can handle <strong>decimal numbers</strong> too.
        </p>

        <CodeBlock lang="Number Conversion" langIcon="fab fa-js">
{`const number1 = parseFloat(num1);
const number2 = parseFloat(num2);
let result; // Prepared to store the operation result`}
        </CodeBlock>
      </section>

      <section>
        <h2><i className="fas fa-code"></i> Refactored Version</h2>
        <p>After that, I refactored it to look like this:</p>

        <CodeBlock lang="If-Else Implementation" langIcon="fab fa-js">
{`const num1 = prompt("Enter first number");
const num2 = prompt("Enter second number");
const operator = prompt("Enter operator (+, -, *, /)");

const number1 = parseFloat(num1);
const number2 = parseFloat(num2);
let result;

if (operator === "+"){
    result = number1 + number2;
} else if (operator === "-"){
    result = number1 - number2;
} else if (operator === "*"){
    result = number1 * number2;
} else if (operator === "/"){
    result = number1 / number2;
} else {
    result = "Unknown result";
}

console.log("Result: " + result);`}
        </CodeBlock>

        <p>At this point it was working, but could still be improved. Enter the bonus challenge:</p>
      </section>

      <section>
        <h2><i className="fas fa-star"></i> Bonus Challenge</h2>
        <ol>
          <li>Validate input to ensure it's actually numbers using <code>isNaN()</code></li>
          <li>Replace <code>if-else</code> with <code>switch-case</code> for cleaner code</li>
          <li>Display results in an attractive format like: "📊 The result of 10 / 2 is 5"</li>
        </ol>

        <h3><i className="fas fa-check-circle"></i> Final Version with Validation and <code>switch-case</code>:</h3>
        <CodeBlock lang="Switch Statement Solution" langIcon="fab fa-js">
{`const num1 = prompt("Enter first number");
const num2 = prompt("Enter second number");
const operator = prompt("Enter operator (+, -, *, /)");

const number1 = parseFloat(num1);
const number2 = parseFloat(num2);

if (isNaN(number1) || isNaN(number2)) {
    console.log("❌ Input is not a valid number!");
} else {
    let result;

    switch(operator) {
        case "+": result = number1 + number2; break;
        case "-": result = number1 - number2; break;
        case "*": result = number1 * number2; break;
        case "/": result = number2 === 0 ? "⚠️ Error: division by zero" : number1 / number2; break;
        default:
            result = "❌ Operator not recognized. Please use +, -, *, or /.";
    }

    if (typeof result === "string") {
        console.log(result);
    } else {
        console.log(\`📊 The result of \${num1} \${operator} \${num2} is \${result}\`);
    }
}`}
        </CodeBlock>
      </section>

      <section>
        <h2><i className="fas fa-sync-alt"></i> Level Up! Adding Function and Looping</h2>
        <p>
          I felt this could be made even cleaner with functions and loops. Functions for reusability,
          loops to recalculate without refreshing the page.
        </p>

        <h3><i className="fas fa-rocket"></i> Final modular and interactive version:</h3>
        <CodeBlock lang="Function + Loop Implementation" langIcon="fab fa-js">
{`let continueCalc = true;

while (continueCalc) {
    const num1 = prompt("Enter first number");
    const num2 = prompt("Enter second number");
    const operator = prompt("Enter operator (+, -, *, /)");

    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
        console.log("❌ Input is not a valid number!");
    } else {

        function calculate(num1, num2, operator) {
            switch (operator) {
                case "+": return num1 + num2;
                case "-": return num1 - num2;
                case "*": return num1 * num2;
                case "/": return num2 === 0 ? "⚠️ Error: division by zero" : num1 / num2;
                default: return "❌ Operator not recognized. Please use +, -, *, or /.";
            }
        }

        const result = calculate(number1, number2, operator);

        if (typeof result === "string") {
            console.log(result);
        } else {
            console.log(\`📊 The result of \${num1} \${operator} \${num2} is \${result}\`);
        }
    }

    continueCalc = confirm("Want to calculate again?");
}`}
        </CodeBlock>
      </section>
    </DayPostLayout>
  );
}