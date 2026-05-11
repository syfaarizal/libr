import DayPostLayout, { CodeBlock, Output, HighlightBox } from '../DayPostLayout';

export default function Day1Page() {
  return (
    <DayPostLayout
      badge="Challenge Day 1"
      title="Print Name and Status"
      date="June 5, 2025"
      tags="JavaScript, Template Literals"
      readingTime="5 min read"
      intro="Today I learned about template literals in JavaScript — a feature that allows us to insert variables directly into strings using the ${} syntax."
      githubUrl="https://github.com/syfaarizal/js-print-name-status"
      prev={undefined}
      next={{ path: '/blog/days-challenge/day2', title: 'Simple Age Calculator' }}
      related={[
        {
          path: '/blog/days-challenge/day2',
          date: 'June 6, 2025',
          title: 'Day 2: Simple Age Calculator',
          excerpt: 'Creating a JavaScript program that calculates age based on birth year with proper date handling.',
          tags: ['JavaScript', 'Math', 'Calculator'],
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
          <h3>🎯 Key Takeaways</h3>
          <p>
            Use <code>new Date()</code> to get the current time, break it into date components, and style the output
            using a <code>ternary operator</code> for a cleaner result. Template literals dengan <code>${"{}"}</code>{' '}
            syntax membuat string interpolation jadi jauh lebih mudah dan readable dibanding concatenation biasa.
          </p>
        </>
      }
    >
      <section>
        <p>
          Today I learned about <code>template literals</code> in JavaScript — you know, that thing where you can
          insert variables directly into strings using <code>${"{}"}</code>. Kinda mind-blowing at first 😄
        </p>
        <p>At first, I just used it in a simple way like this:</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`const currentDate = new Date();
console.log(\`Hari ini tanggal \${currentDate}\`);`}
        </CodeBlock>

        <p>Yep, this shows the date and time info in JavaScript's default format, like:</p>
        <Output>Today is Sun Jun 16 2025 21:41:00 GMT+0700 (Western Indonesia Time)</Output>
      </section>

      <section>
        <h2><i className="fas fa-calendar-alt"></i> Better Date Format</h2>
        <p>
          But… it feels kinda messy and not that personal, right? So I found a more flexible way where you can
          customize it however you want. Here's an example:
        </p>

        <CodeBlock lang="Improved Date Formatting" langIcon="fab fa-js">
{`const now = new Date();
const day = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();
const hours = now.getHours();
const minutes = now.getMinutes();

console.log(\`Today is \${day}/\${month}/\${year}, at \${hours}:\${minutes < 10 ? "0" + minutes : minutes}\`);`}
        </CodeBlock>

        <p>The result looks way cleaner and easier to read:</p>
        <Output>Today is 05/6/2025, at 21:41</Output>
      </section>

      <section>
        <h3>🤔 Why do we use <code>minutes &lt; 10 ? "0" + minutes : minutes</code>?</h3>

        <HighlightBox>
          <p>I was kinda confused when I first saw this line:</p>

          <CodeBlock lang="Ternary Operator" langIcon="fas fa-question-circle">
{`minutes < 10 ? '0' + minutes : minutes`}
          </CodeBlock>

          <p>
            But I finally got it: it's a <strong>ternary operator</strong>, basically like a mini if-else.
            <br /><br />
            Basically: if the minute is less than 10 (like 5), it'll automatically add a zero in front ("05") so it
            doesn't look weird. Imagine writing <code>03:7</code> instead of <code>03:07</code> — yeah, kinda
            awkward. This makes it way more readable and aesthetic.
          </p>
        </HighlightBox>
      </section>
    </DayPostLayout>
  );
}