import DayPostLayout, { CodeBlock, Output, HighlightBox } from '../DayPostLayout';

export default function Day4Page() {
  return (
    <DayPostLayout
      badge="Challenge Day 4"
      title="Number Guessing Game"
      date="June 11, 2025"
      tags="JavaScript, Game, Logic"
      readingTime="8 min read"
      intro="Day 4 of this coding challenge had a different vibe because I was asked to create a simple game: Number Guessing Game! This challenge taught me about random number generation, user interaction, and conditional logic."
      githubUrl="https://github.com/syfaarizal/js-number-guessing-game"
      prev={{ path: '/blog/days-challenge/day3', title: 'Interactive Calculator' }}
      next={{ path: '/blog/days-challenge/day5', title: 'Creative Name Looping' }}
      related={[
        {
          path: '/blog/days-challenge/day3',
          date: 'June 9, 2025',
          title: 'Day 3: Interactive Calculator',
          excerpt: 'Building a fully functional calculator with interactive user interface and proper error handling.',
          tags: ['JavaScript', 'Function', 'Calculator'],
        },
        {
          path: '/blog/days-challenge/day5',
          date: 'June 13, 2025',
          title: 'Day 5: Creative Name Looping',
          excerpt: 'Building a simple to-do list application with add, remove, and mark as complete functionality.',
          tags: ['JavaScript', 'Loops', 'Arrays'],
        },
      ]}
      conclusion={
        <>
          <h3>💡 Reflection</h3>
          <p>What I learned from this challenge:</p>
          <ul>
            <li>The importance of careful syntax writing (small typos can cause big errors)</li>
            <li><code>if-else</code> logic can be enhanced to be more interactive and dynamic</li>
            <li><code>confirm()</code> and <code>prompt()</code> make the user experience more engaging</li>
            <li>Debugging can actually be fun when treated as learning material</li>
          </ul>
          <p>And of course, I'm more excited to continue to Day 5 🚀</p>
        </>
      }
    >
      <section>
        <h2><i className="fas fa-gamepad"></i> Challenge Description</h2>
        <p>The program should be able to:</p>
        <ol>
          <li>Generate a random number between 1 and 10</li>
          <li>Ask the user to guess the number</li>
          <li>
            If wrong:
            <ul>
              <li>Give a clue: "Too small" or "Too big"</li>
              <li>Repeat the guess</li>
            </ul>
          </li>
          <li>
            If correct:
            <ul>
              <li>Show success message + number of attempts</li>
            </ul>
          </li>
        </ol>

        <CodeBlock lang="Example Output" langIcon="fab fa-js">
{`I'm thinking of a number between 1 and 10.
Take a guess!
Your guess: 4
Too small!
Your guess: 7
Too big!
Your guess: 6
Congratulations! You guessed the number correctly in 3 attempts.`}
        </CodeBlock>
      </section>

      <section>
        <h2><i className="fas fa-bug"></i> Funny Debugging</h2>
        <p>At first I wrote it like this:</p>

        <CodeBlock lang="Initial Mistake" langIcon="fab fa-js">
{`const randomNumber:
Math.floor(Math.random() * 10) + 1:`}
        </CodeBlock>

        <HighlightBox>
          <p>
            And of course it errored. I was confused for a moment. Turns out I used <code>:</code> when
            I should've used <code>=</code> for assignment. Classic JavaScript typo.
          </p>
        </HighlightBox>
      </section>

      <section>
        <h2><i className="fas fa-check-circle"></i> Initial Fixed Version</h2>
        <p>After fixing and rearranging the logic, here's my first working version:</p>

        <CodeBlock lang="Working Version" langIcon="fab fa-js">
{`let randomNumber = Math.floor(Math.random() * 10) + 1;
let attempt = 0;
let repeat = true;

while(repeat) {
  const userInput = prompt("I'm thinking of a number between 1 and 10. Take a guess!");
  attempt++;

  const guess = parseInt(userInput);

  if (isNaN(guess)) {
    console.log("Eh? Please enter a number 😄");
  } else {
    if (guess < randomNumber) {
      console.log("Too small 😅");
    } else if (guess > randomNumber) {
      console.log("Too big 😅");
    } else {
      console.log(\`🎉 Congratulations! You guessed the number correctly in \${attempt} attempts.\`);
      repeat = false;
    }
  }
}`}
        </CodeBlock>

        <p>The code is simple and works immediately. But I felt it could still be improved.</p>
      </section>

      <section>
        <h2><i className="fas fa-star"></i> Bonus Challenge</h2>
        <p>There were additional optional challenges:</p>
        <ul>
          <li>Number input validation</li>
          <li>Scoring system (comments based on number of attempts)</li>
          <li>Hard mode: 1–50</li>
        </ul>

        <h3><i className="fas fa-check-double"></i> Input Validation &amp; Scoring</h3>
        <p>
          Number validation was already implemented using <code>isNaN()</code>. Just needed to add the
          scoring system logic:
        </p>

        <CodeBlock lang="Scoring System" langIcon="fab fa-js">
{`if(attempt <= 3) {
  console.log("🔥 Pro move! You guessed it super fast.");
} else if (attempt <= 6) {
  console.log("👍 Not bad! But you can do better.");
} else {
  console.log("😅 Well, needs more practice. Keep trying!");
}`}
        </CodeBlock>

        <h3><i className="fas fa-fire"></i> Hard Mode (1–50)</h3>
        <p>I used <code>confirm()</code> to ask if the user wants to play in hard mode:</p>

        <CodeBlock lang="Hard Mode Implementation" langIcon="fab fa-js">
{`let hardMode = confirm("Want to play in hard mode? (Numbers 1–50)");
let rangeText = hardMode ? "1 and 50" : "1 and 10";
let randomNumber = Math.floor(Math.random() * (hardMode ? 50 : 10)) + 1;`}
        </CodeBlock>

        <p>Then I included <code>rangeText</code> in the <code>prompt()</code> to make it dynamic:</p>

        <CodeBlock lang="Dynamic Prompt" langIcon="fab fa-js">
{`const userInput = prompt(\`I'm thinking of a number between \${rangeText}. Take a guess!\`);`}
        </CodeBlock>
      </section>

      <section>
        <h2><i className="fas fa-trophy"></i> Final Version: Fully Interactive</h2>

        <CodeBlock lang="Complete Solution" langIcon="fab fa-js">
{`let hardMode = confirm("Want to play in hard mode? (Numbers 1–50)");
let rangeText = hardMode ? "1 and 50" : "1 and 10";
let randomNumber = Math.floor(Math.random() * (hardMode ? 50 : 10)) + 1;
let attempt = 0;
let repeat = true;

while(repeat) {
  const userInput = prompt(\`I'm thinking of a number between \${rangeText}. Take a guess!\`);
  attempt++;

  const guess = parseInt(userInput);

  if (isNaN(guess)) {
    console.log("Eh? Please enter a number 😄");
  } else {
    if (guess < randomNumber) {
      console.log("Too small 😅");
    } else if (guess > randomNumber) {
      console.log("Too big 😅");
    } else {
      console.log(\`🎉 Congratulations! You guessed the number correctly in \${attempt} attempts.\`);

      if(attempt <= 3) {
        console.log("🔥 Pro move! You guessed it super fast.");
      } else if (attempt <= 6) {
        console.log("👍 Not bad! But you can do better.");
      } else {
        console.log("😅 Well, needs more practice. Keep trying!");
      }

      repeat = false;
    }
  }
}`}
        </CodeBlock>
      </section>
    </DayPostLayout>
  );
}