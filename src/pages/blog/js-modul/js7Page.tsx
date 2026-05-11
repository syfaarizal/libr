import DayPostLayout, { CodeBlock, QuoteBox } from '../DayPostLayout';

export default function Js7Page() {
  const conclusion = (
    <>
      <h3>🏁 Final Takeaways</h3>
      <ul>
        <li>Projects matter more than theory</li>
        <li>Small but finished beats big but abandoned</li>
        <li>Every project here can be expanded</li>
        <li>This proves real front-end readiness</li>
      </ul>
    </>
  );

  return (
    <DayPostLayout
      badge="JS Module 7"
      title="Mini Projects Gallery"
      date="Jan 2026"
      tags="JavaScript, Projects, Portfolio"
      readingTime="8 min read"
      intro="Tutorials teach you how to type. Projects prove you can think and build."
      githubUrl="#"
      prev={{ path: '/blog/js-modul/js6-solutions', title: 'Asynchronous JavaScript — Solutions' }}
      next={undefined}
      related={[]}
      conclusion={conclusion}
    >
      <QuoteBox>"Small projects. Real problems. Real skills."</QuoteBox>

      <section>
        <p>This module is different. Less theory. More building.</p>
        <ul>
          <li>Every project is small but real</li>
          <li>Each one trains a specific skill</li>
          <li>All of them belong in your portfolio</li>
        </ul>
        <p>This is where your blog starts to feel alive.</p>
      </section>

      <section>
        <h2>⏱️ Project 1 — Stopwatch</h2>

        <h3>🎯 Focus Skills</h3>
        <ul>
          <li><code>setInterval</code> &amp; <code>clearInterval</code></li>
          <li>DOM manipulation</li>
          <li>Simple state management</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let time = 0;
let interval;

function start() {
  interval = setInterval(() => {
    time++;
    display.textContent = time;
  }, 1000);
}

function stop() {
  clearInterval(interval);
}

function reset() {
  time = 0;
  display.textContent = time;
}`}
        </CodeBlock>

        <h3>🚀 Upgrade Ideas</h3>
        <ul>
          <li>Minute : second format</li>
          <li>Lap time</li>
          <li>Small animation for smooth UI</li>
        </ul>
      </section>

      <section>
        <h2>🌦️ Project 2 — Weather App</h2>

        <h3>🎯 Focus Skills</h3>
        <ul>
          <li>Fetch API</li>
          <li>async / await</li>
          <li>Error handling</li>
          <li>DOM rendering</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`async function getWeather(city) {
  const res = await fetch(
    \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=API_KEY&units=metric\`
  );
  const data = await res.json();

  console.log(data.main.temp);
}`}
        </CodeBlock>

        <h3>🚀 Upgrade Ideas</h3>
        <ul>
          <li>Weather icons</li>
          <li>Loading state</li>
          <li>City search history</li>
          <li>Geolocation support</li>
        </ul>
      </section>

      <section>
        <h2>🔐 Project 3 — Password Generator</h2>

        <h3>🎯 Focus Skills</h3>
        <ul>
          <li>Function logic</li>
          <li>Randomization</li>
          <li>Event handling</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function generatePassword(length) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$";
  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
}`}
        </CodeBlock>

        <h3>🚀 Upgrade Ideas</h3>
        <ul>
          <li>Toggle symbols / numbers</li>
          <li>Password strength indicator</li>
          <li>Copy to clipboard</li>
        </ul>
      </section>

      <section>
        <h2>📝 Project 4 — Notes App</h2>

        <h3>🎯 Focus Skills</h3>
        <ul>
          <li>CRUD logic</li>
          <li>LocalStorage</li>
          <li>Dynamic rendering</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function saveNote(note) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}`}
        </CodeBlock>

        <h3>🚀 Upgrade Ideas</h3>
        <ul>
          <li>Edit &amp; delete notes</li>
          <li>Search notes</li>
          <li>Tags system</li>
          <li>Dark mode</li>
        </ul>
      </section>

      <section>
        <h2>❓ Project 5 — Quiz App</h2>

        <h3>🎯 Focus Skills</h3>
        <ul>
          <li>Array of objects</li>
          <li>State management</li>
          <li>Conditional rendering</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`const questions = [
  {
    question: "What is DOM?",
    options: ["Database", "Document Object Model", "Framework"],
    answer: 1
  }
];`}
        </CodeBlock>

        <h3>🚀 Upgrade Ideas</h3>
        <ul>
          <li>Score system</li>
          <li>Timer</li>
          <li>Randomized questions</li>
          <li>Result summary</li>
        </ul>
      </section>

      <section>
        <h2>🧠 How to Display This on Your Blog</h2>
        <ul>
          <li>One card per project</li>
          <li>Preview (GIF or screenshot)</li>
          <li>Tech stack</li>
          <li>Main features</li>
          <li>Demo link</li>
          <li>Source code link</li>
        </ul>
        <p>This turns your blog into a clickable portfolio.</p>
      </section>

      <section>
        <h2>🔥 Challenge Mode</h2>
        <ul>
          <li>✅ Beginner</li>
          <li>⚡ Intermediate</li>
          <li>🔥 Advanced</li>
        </ul>
        <p>
          Or simply: <strong>"Build this without a tutorial."</strong>{' '}
          Recruiters love this energy.
        </p>
      </section>
    </DayPostLayout>
  );
}