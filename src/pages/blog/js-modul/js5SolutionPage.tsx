import DayPostLayout, { CodeBlock, QuoteBox } from '../DayPostLayout';

export default function Js5SolutionPage() {
  const conclusion = (
    <>
      <h3>📌 Final Takeaways</h3>
      <ul>
        <li>DOM events can stack on one element</li>
        <li>State matters more than visuals</li>
        <li><code>localStorage</code> = simple persistence</li>
        <li>Clean DOM logic = better UX</li>
      </ul>
    </>
  );

  return (
    <DayPostLayout
      badge="JS Module 5 — Solutions"
      title="DOM Manipulation — Solutions"
      date="Jan 2026"
      tags="JavaScript, DOM, Solutions"
      readingTime="8 min read"
      intro="Tried the challenges already? Good. Now let's break them down like real front-end devs."
      githubUrl="#"
      prev={{ path: '/blog/js-modul/js5', title: 'DOM Manipulation: When Code Starts Moving the Page' }}
      next={{ path: '/blog/js-modul/js6', title: 'Asynchronous JavaScript: Keep Your UI Alive' }}
      related={[]}
      conclusion={conclusion}
    >
      <QuoteBox>"DOM mastery is not magic. It's just knowing what to touch — and when."</QuoteBox>

      <section>
        <h2>✅ Challenge 1 — Todo Interaction</h2>
        <p>Requirements:</p>
        <ul>
          <li>Click item → strike through</li>
          <li>Double click → delete item</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`const input = document.querySelector("#todoInput");
const btn   = document.querySelector("#addBtn");
const list  = document.querySelector("#todoList");

btn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = input.value;

  // single click → toggle done
  li.addEventListener("click", () => {
    li.classList.toggle("done");
  });

  // double click → delete
  li.addEventListener("dblclick", () => {
    li.remove();
  });

  list.appendChild(li);
  input.value = "";
});`}
        </CodeBlock>

        <p>One element. Two behaviors. This is real DOM control.</p>
      </section>

      <section>
        <h2>🔢 Challenge 2 — Counter Upgrade</h2>
        <p>Requirements:</p>
        <ul>
          <li>Add minus button</li>
          <li>Set min &amp; max limit</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let count = 0;
const max = 10;
const min = 0;

const display = document.querySelector("#count");
const incBtn  = document.querySelector("#increment");
const decBtn  = document.querySelector("#decrement");

incBtn.addEventListener("click", () => {
  if (count < max) {
    count++;
    display.textContent = count;
  }
});

decBtn.addEventListener("click", () => {
  if (count > min) {
    count--;
    display.textContent = count;
  }
});`}
        </CodeBlock>

        <p>Boundaries = controlled UI. No wild numbers.</p>
      </section>

      <section>
        <h2>🌗 Challenge 3 — Persistent Theme</h2>
        <p>Requirements:</p>
        <ul>
          <li>Save theme mode</li>
          <li>Refresh page → keep the vibe</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`const toggle = document.querySelector("#toggleTheme");

// load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});`}
        </CodeBlock>

        <p>Small feature. Big user experience upgrade.</p>
      </section>

      <section>
        <h2>🧠 Why These Solutions Matter</h2>
        <ul>
          <li>You handled multiple events</li>
          <li>You controlled state with variables</li>
          <li>You made UI persistent</li>
          <li>You wrote logic that users actually feel</li>
        </ul>
        <p>This is no longer "learning JavaScript". This is building interfaces.</p>
      </section>
    </DayPostLayout>
  );
}