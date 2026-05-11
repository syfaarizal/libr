import DayPostLayout, { CodeBlock, QuoteBox } from '../DayPostLayout';

export default function Js6Page() {
  const conclusion = (
    <>
      <h3>📌 Key Takeaways</h3>
      <ul>
        <li>Async keeps the UI responsive</li>
        <li>Callbacks → Promises → async/await</li>
        <li>Fetch API connects your app to the world</li>
        <li>Error handling is not optional</li>
        <li>Data + DOM = real applications</li>
      </ul>
    </>
  );

  return (
    <DayPostLayout
      badge="JS Module 6"
      title="Asynchronous JavaScript: Keep Your UI Alive"
      date="Jan 2026"
      tags="JavaScript, Async, Fetch API"
      readingTime="12 min read"
      intro="JavaScript is single-threaded. If your code waits and freezes, your UI dies."
      githubUrl="#"
      prev={{ path: '/blog/js-modul/js5-solutions', title: 'DOM Manipulation — Solutions' }}
      next={{ path: '/blog/js-modul/js6-solutions', title: 'Asynchronous JavaScript — Solutions' }}
      related={[]}
      conclusion={conclusion}
    >
      <QuoteBox>"Wait for data — but never freeze the user."</QuoteBox>

      <section>
        <h2>🕰️ Sync vs Async</h2>

        <h3>⏳ Synchronous</h3>
        <p>Runs line by line. No patience.</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`console.log("A");
console.log("B");
console.log("C");`}
        </CodeBlock>

        <p>Output: A → B → C</p>

        <h3>⚡ Asynchronous</h3>
        <p>Waits without blocking.</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`console.log("A");

setTimeout(() => {
  console.log("B");
}, 2000);

console.log("C");`}
        </CodeBlock>

        <p>Output: A → C → B</p>
      </section>

      <section>
        <h2>📞 Callback</h2>
        <p>A callback is a function called later.</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`function loadData(callback) {
  setTimeout(() => {
    callback("Data loaded");
  }, 2000);
}

loadData((result) => {
  console.log(result);
});`}
        </CodeBlock>

        <p>
          Works — but too many callbacks lead to <strong>callback hell</strong>.
        </p>
      </section>

      <section>
        <h2>🤝 Promise</h2>
        <p>A promise represents a value that will exist later.</p>
        <ul>
          <li>pending</li>
          <li>fulfilled</li>
          <li>rejected</li>
        </ul>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`const getData = new Promise((resolve, reject) => {
  let success = true;

  if (success) {
    resolve("Data loaded");
  } else {
    reject("Failed to load data");
  }
});

getData
  .then(result => console.log(result))
  .catch(error => console.log(error));`}
        </CodeBlock>

        <p>Cleaner than callbacks. Still readable.</p>
      </section>

      <section>
        <h2>🚀 async / await</h2>
        <p>Looks synchronous. Works asynchronously.</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`async function fetchData() {
  try {
    const result = await getData;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}`}
        </CodeBlock>

        <p>This is the modern standard.</p>
      </section>

      <section>
        <h2>🌐 Fetch API</h2>
        <p>Fetch is how JavaScript talks to the internet.</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`fetch("https://api.example.com/data")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));`}
        </CodeBlock>

        <p>Cleaner with async/await:</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`async function getData() {
  const res  = await fetch("https://api.example.com/data");
  const data = await res.json();
  console.log(data);
}`}
        </CodeBlock>
      </section>

      <section>
        <h2>💬 Mini Project — Quote Generator</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`async function getQuote() {
  const res  = await fetch("https://api.quotable.io/random");
  const data = await res.json();

  console.log(data.content);
}`}
        </CodeBlock>
      </section>

      <section>
        <h2>🧑 Mini Project — Random User</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`async function getUser() {
  const res  = await fetch("https://randomuser.me/api/");
  const data = await res.json();

  const user = data.results[0];
  console.log(user.name.first, user.email);
}`}
        </CodeBlock>
      </section>

      <section>
        <h2>🪪 Mini Project — Display User Card</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`async function showUser() {
  const res  = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const user = data.results[0];

  const card = document.querySelector(".card");
  card.innerHTML = \`
    <img src="\${user.picture.large}">
    <h3>\${user.name.first} \${user.name.last}</h3>
    <p>\${user.email}</p>
  \`;
}`}
        </CodeBlock>

        <p>JS + DOM + API = full front-end combo.</p>
      </section>

      <section>
        <h2>🔥 Mini Challenges</h2>
        <ul>
          <li>Add loading text &amp; error handling</li>
          <li>Button to refetch data</li>
          <li>Filter user by gender and display it</li>
        </ul>
      </section>
    </DayPostLayout>
  );
}