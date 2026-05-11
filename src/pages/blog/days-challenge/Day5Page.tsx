import DayPostLayout, { CodeBlock, Output, HighlightBox, QuoteBox } from '../DayPostLayout';

export default function Day5Page() {
  return (
    <DayPostLayout
      badge="Challenge Day 5"
      title="Creative Name Looping"
      date="June 13, 2025"
      tags="JavaScript, Loops, Arrays"
      readingTime="7 min read"
      intro="After taking some time off to focus on other projects, I'm back to the JS challenges! This time with a simple but brain-stimulating challenge: looping names and creating more creative outputs."
      githubUrl="https://github.com/syfaarizal/js-looping-name"
      prev={{ path: '/blog/days-challenge/day4', title: 'Number Guessing Game' }}
      next={{ path: '/blog/days-challenge/day6', title: 'Odd, Even, or Special?' }}
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
      conclusion={
        <>
          <h3>🎯 Key Takeaways</h3>
          <ul>
            <li>Modulus operator (<code>%</code>) is powerful for cycling through arrays</li>
            <li>Input validation is crucial for robust programs</li>
            <li>Small creative touches (like emojis) can make programs more engaging</li>
            <li>Taking breaks is part of the learning process</li>
          </ul>
        </>
      }
    >
      <QuoteBox>
        "It's okay to take breaks, but don't give up. Let's get back on track!"
      </QuoteBox>

      <section>
        <h2><i className="fas fa-bullseye"></i> Challenge Description</h2>
        <p>Create a program that:</p>
        <ul>
          <li>Prints your name <code>n</code> times (user input)</li>
          <li>Adds numbering in front</li>
        </ul>

        <CodeBlock lang="Example Output" langIcon="fab fa-js">
{`1. Syifa Fauziyah Arizal
2. Syifa Fauziyah Arizal
3. Syifa Fauziyah Arizal`}
        </CodeBlock>
      </section>

      <section>
        <h2><i className="fas fa-question-circle"></i> What is N?</h2>
        <p>
          Here, <code>n</code> means the number of repetitions requested by the user. So the user will
          be asked how many times they want to print their name.
        </p>
        <p>Simple? Yep. But my brain lagged a bit because it's been a while since I worked with JS. 😅</p>
      </section>

      <section>
        <h2><i className="fas fa-flask"></i> First Attempt</h2>

        <CodeBlock lang="Initial Implementation" langIcon="fab fa-js">
{`const input = prompt("How many times do you want to print your name? ");

for (let i = 1; i <= input; i++) {
    console.log(i + ". " + "Syifa Fauziyah Arizal");
}`}
        </CodeBlock>

        <p>Does it work? Yup! But not very robust yet.</p>
      </section>

      <section>
        <h2><i className="fas fa-check-circle"></i> Input Validation Version</h2>

        <CodeBlock lang="Improved Version" langIcon="fab fa-js">
{`const input = Number(prompt("How many times do you want to print your name? "));

if (!isNaN(input) && input > 0) {
    for (let i = 1; i <= input; i++) {
        console.log(\`\${i}. Syifa Fauziyah Arizal\`);
    }
} else {
    console.log("Please enter a valid number 😅");
}`}
        </CodeBlock>

        <HighlightBox>
          <h3><i className="fas fa-lightbulb"></i> Explanation:</h3>
          <p>
            <code>isNaN()</code> means <em>is Not a Number</em>, so we use <code>!isNaN()</code> to
            check if the input is valid. We also add <code>input &gt; 0</code> to prevent the loop
            from running if the user enters 0 or negative numbers (why would you want to print your
            name 0 times anyway? 😆).
          </p>
        </HighlightBox>
      </section>

      <section>
        <h2><i className="fas fa-gift"></i> Bonus Challenge</h2>
        <p>Level up! Add:</p>
        <ul>
          <li>Different emoji for each line (looping from array)</li>
          <li>Different motivational quote for each line</li>
          <li>Combine all outputs into one concatenated string</li>
        </ul>

        <h3><i className="fas fa-code"></i> Example Output:</h3>
        <Output>
          {`1. Syifa 🔥 — Keep going!\n2. Syifa 💡 — You're learning!\n3. Syifa 🌱 — Progress every day!`}
        </Output>
      </section>

      <section>
        <h2><i className="fas fa-lightbulb"></i> Solution: Using Arrays and Modulus</h2>

        <CodeBlock lang="Arrays Setup" langIcon="fab fa-js">
{`const emojis = ["🔥", "💡", "🌱", "🚀", "🎯", "💪", "🧠", "✨", "🔧", "🎉"];
const motivation = [
    "Keep going!",
    "You can do it!",
    "Believe in yourself!",
    "Stay positive!",
    "Never give up!",
    "Dream big!",
    "Stay focused!",
    "Work hard!",
    "Embrace challenges!",
    "Success is yours!",
];`}
        </CodeBlock>

        <HighlightBox>
          <h3><i className="fas fa-question-circle"></i> Why Use <code>%</code> (Modulus)?</h3>
          <p>
            For example if <code>i = 11</code>, then <code>emoji[11 % 10] = emoji[1]</code> — it
            cycles back to the start of the array when the index exceeds its length. A genius way to
            create <em>infinite looping</em> within array bounds 💡.
          </p>
          <p>✅ Simple, efficient, and creates creative outputs without errors!</p>
        </HighlightBox>
      </section>

      <section>
        <h2><i className="fas fa-code"></i> Final Code</h2>

        <CodeBlock lang="Complete Solution" langIcon="fab fa-js">
{`const input = Number(prompt("How many times do you want to print your name? "));

const emojis = ["🔥", "💡", "🌱", "🚀", "🎯", "💪", "🧠", "✨", "🔧", "🎉"];
const motivation = [
    "Keep going!",
    "You can do it!",
    "Believe in yourself!",
    "Stay positive!",
    "Never give up!",
    "Dream big!",
    "Stay focused!",
    "Work hard!",
    "Embrace challenges!",
    "Success is yours!",
];

let result = "";

if (!isNaN(input) && input > 0) {
    for (let i = 0; i < input; i++) {
        const emoji = emojis[i % emojis.length];
        const quote = motivation[i % motivation.length];
        result += \`\${i + 1}. Syifa \${emoji} - \${quote}\\n\`;
    }
    console.log(result);
} else {
    console.log("Please enter a valid number 😅");
}`}
        </CodeBlock>
      </section>

      <section>
        <h2><i className="fas fa-pen"></i> Mini Reflection</h2>
        <p>
          I got stuck at first, but after some tinkering, researching, and giving my brain some
          breathing room, I figured it out.
        </p>
        <p>This challenge, while seemingly light, reminded me of the importance of basics like:</p>
        <ul>
          <li>✔️ Input validation</li>
          <li>✔️ Array looping with modulus</li>
          <li>✔️ Combining strings with newline <code>\n</code></li>
        </ul>
        <p>
          Sometimes we focus too much on big things, when it's these small things that form our
          foundation. And yes, I'm back. Let's go!
        </p>
      </section>

      <QuoteBox>
        "When stuck, don't panic. Take a break first. Drink some water. Take a short walk. Then come
        back to coding. Your brain needs refreshing too."
      </QuoteBox>
    </DayPostLayout>
  );
}