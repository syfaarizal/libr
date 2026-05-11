import DayPostLayout, { CodeBlock, QuoteBox } from '../DayPostLayout';

export default function Js1Page() {
  const conclusion = (
    <>
      <h3>🎯 Key Takeaways</h3>
      <ul>
        <li>JavaScript is the brain of the web</li>
        <li>Know how to connect JS to HTML</li>
        <li><code>console.log()</code> is your debugging weapon</li>
        <li>Use <code>let</code> and <code>const</code></li>
        <li>Understand data types before touching logic</li>
      </ul>
    </>
  );

  return (
    <DayPostLayout
      badge="JS Module 1"
      title="JavaScript Basics: Your First Step Into the Logic World"
      date="May 2025"
      tags="JavaScript, Front-End, Logic"
      readingTime="6 min read"
      intro="If HTML is the skeleton and CSS is the outfit, JavaScript is the brain. Without it, your website is just a pretty statue doing absolutely nothing."
      githubUrl="#"
      prev={{ path: '/blog/css-modul/css4', title: 'CSS Advanced: Animations, Responsive Design & Best Practices' }}
      next={{ path: '/blog/js-modul/js2', title: 'Logic Brain Gym: Mastering Control Flow' }}
      related={[
        {
          path: '/blog/html-modul/html1',
          date: 'May 15, 2025',
          title: 'HTML Basics: The Foundation of Web Development',
          excerpt: 'Learn the basic concepts, tags, and structure that make up every webpage on the internet.',
          tags: ['HTML', 'Web Development', 'Basics'],
        },
        {
          path: '/blog/css-modul/css1',
          date: 'May 17, 2025',
          title: 'CSS Basics: Styling the Web',
          excerpt: 'Learn the fundamentals of styling web pages with colors, fonts, and layouts.',
          tags: ['CSS', 'Web Design', 'Styling'],
        },
      ]}
      conclusion={conclusion}
    >
      <QuoteBox>"No JavaScript? Congrats, you built a digital brochure."</QuoteBox>

      <section>
        <h2>✨ What is JavaScript?</h2>
        <p>
          JavaScript is the programming language that makes your website alive.
          Button clicks, animations, form validation, fetching data from APIs —
          yeah, that's all JavaScript doing overtime.
        </p>

        <h3>🧠 Why JavaScript matters</h3>
        <ul>
          <li>Runs directly in the browser (client-side)</li>
          <li>Makes websites interactive</li>
          <li>Dynamic and flexible</li>
          <li>Mandatory skill for front-end developers</li>
        </ul>

        <p>Without JavaScript, your website is static, silent, and kinda sad.</p>
      </section>

      <section>
        <h2>🧩 How to Run JavaScript</h2>
        <p>There are three ways to use JavaScript in HTML:</p>

        <h3>1. Inline JavaScript</h3>
        <CodeBlock lang="HTML" langIcon="fab fa-html5">
          {`<button onclick="alert('Hello!')">Click me</button>`}
        </CodeBlock>
        <p>⚠️ Only okay for demos. Not for real projects.</p>

        <h3>2. Internal JavaScript</h3>
        <CodeBlock lang="HTML" langIcon="fab fa-html5">
{`<script>
  console.log("Hello from internal JS!");
</script>`}
        </CodeBlock>

        <h3>3. External JavaScript ✅ Best Practice</h3>
        <CodeBlock lang="HTML" langIcon="fab fa-html5">
          {`<script src="script.js"></script>`}
        </CodeBlock>
        <p>Clean, scalable, and future-you will thank you.</p>
      </section>

      <section>
        <h2>🖥️ Meet Your Best Friend: console.log()</h2>
        <p>Your browser has a developer console. This is where JavaScript talks to you.</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
          {`console.log("Testing... 1 2 3");`}
        </CodeBlock>

        <ul>
          <li>Debug errors</li>
          <li>Check variable values</li>
          <li>Understand program flow</li>
          <li>Question your life choices</li>
        </ul>
      </section>

      <section>
        <h2>🥚 Variables — Where Data Lives</h2>
        <p>Modern JavaScript uses only two keywords:</p>
        <ul>
          <li><b>let</b> → value can change</li>
          <li><b>const</b> → value stays forever</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let age = 20;
const name = "Syfa";

age = 21;      // valid
name = "Budi"; // error 🚫`}
        </CodeBlock>

        <p>Forget <code>var</code>. That era is over.</p>
      </section>

      <section>
        <h2>🎭 JavaScript Data Types</h2>
        <table className="tb-blog">
          <thead>
            <tr>
              <th>Type</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>String</td><td>"Hello"</td></tr>
            <tr><td>Number</td><td>24, 3.14</td></tr>
            <tr><td>Boolean</td><td>true / false</td></tr>
            <tr><td>Null</td><td>null</td></tr>
            <tr><td>Undefined</td><td>undefined</td></tr>
            <tr><td>Object</td><td>{'{ name: "Syfa" }'}</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>➗ Basic Operators</h2>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let a = 10;
let b = 3;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);`}
        </CodeBlock>
        <p>Simple math now, serious logic later.</p>
      </section>

      <section>
        <h2>🧪 Your First Mini Program</h2>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
          {`let name = "Syfa";\nlet age = 20;\n\nconsole.log(\`Hello \${name}, you are \${age} years old\`);`}
        </CodeBlock>
        <p>Template literals = clean, modern, and actually readable.</p>
      </section>
    </DayPostLayout>
  );
}