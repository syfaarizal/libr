import DayPostLayout, { CodeBlock, QuoteBox } from '../DayPostLayout';

export default function Js3Page() {
  const conclusion = (
    <>
      <h3>📌 Key Takeaways</h3>
      <ul>
        <li>Array = list of data</li>
        <li>Object = data with identity</li>
        <li>map() &amp; filter() are core tools</li>
        <li>80% of coding is data processing</li>
        <li>Clean data makes UI easy</li>
      </ul>
    </>
  );

  return (
    <DayPostLayout
      badge="JS Module 3"
      title="Data Exploration: Array & Object"
      date="Jun 2026"
      tags="JavaScript, Array, Object, Data"
      readingTime="9 min read"
      intro="If JavaScript is a kitchen, arrays and objects are the fridge. Messy data = no cooking."
      githubUrl="#"
      prev={{ path: '/blog/js-modul/js2-solutions', title: 'Logic Brain Gym — Solutions' }}
      next={{ path: '/blog/js-modul/js3-solutions', title: 'Array & Object — Solutions' }}
      related={[]}
      conclusion={conclusion}
    >
      <QuoteBox>"You don't write bad code. You organize bad data."</QuoteBox>

      <section>
        <h2>🧺 Array — Storing Multiple Data</h2>
        <p>An array is a list of data.</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
          {`let fruits = ["Apple", "Banana", "Orange"];`}
        </CodeBlock>

        <h3>Why arrays matter</h3>
        <ul>
          <li>Store lots of data</li>
          <li>Easy to loop</li>
          <li>Easy to filter</li>
          <li>Easy to process</li>
        </ul>
      </section>

      <section>
        <h2>➕➖ Essential Array Methods</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`// add to the end
fruits.push("Mango");

// remove last item
fruits.pop();

// add to the front
fruits.unshift("Grape");

// remove first item
fruits.shift();`}
        </CodeBlock>

        <p>These are basic tools. You will use them constantly.</p>
      </section>

      <section>
        <h2>✂️ splice() vs 🍰 slice()</h2>
        <p>These two are often confused — but very different.</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`// splice() changes the original array
let numbers = [1, 2, 3, 4];
numbers.splice(1, 2);
// result: [1, 4]

// slice() copies only
let nums = [1, 2, 3, 4];
let newNums = nums.slice(1, 3);
// result: [2, 3]`}
        </CodeBlock>

        <p>Easy rule:</p>
        <ul>
          <li><b>splice</b> = brutal</li>
          <li><b>slice</b> = polite</li>
        </ul>
      </section>

      <section>
        <h2>🧠 Modern Array Power: map() & filter()</h2>

        <h3>map() — transform data</h3>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let prices = [10000, 20000, 30000];

let discounted = prices.map(price => price * 0.9);`}
        </CodeBlock>

        <h3>filter() — select data</h3>
        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
          {`let cheap = prices.filter(price => price < 25000);`}
        </CodeBlock>

        <p>Real projects use these every single day.</p>
      </section>

      <section>
        <h2>🧱 Object — Data with Identity</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let user = {
  name: "Syfa",
  age: 20,
  isActive: true
};`}
        </CodeBlock>

        <p>Accessing object data:</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`console.log(user.name);
console.log(user["age"]);`}
        </CodeBlock>
      </section>

      <section>
        <h2>🪆 Nested Object</h2>
        <p>Objects inside objects. Very common in API responses.</p>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let student = {
  name: "Syfa",
  major: "Informatics",
  scores: {
    math: 90,
    js: 95
  }
};

console.log(student.scores.js);`}
        </CodeBlock>
      </section>

      <section>
        <h2>🧪 Practice 1 — Product List</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let products = [
  { name: "Keyboard", price: 150000 },
  { name: "Mouse", price: 80000 },
  { name: "Headset", price: 200000 }
];

let cheapProducts = products.filter(p => p.price < 100000);
console.log(cheapProducts);`}
        </CodeBlock>
      </section>

      <section>
        <h2>🧪 Practice 2 — Student Data</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let students = [
  { name: "Adit", score: 85 },
  { name: "Bela", score: 92 },
  { name: "Ciko", score: 70 }
];

let names = students.map(s => s.name);`}
        </CodeBlock>
      </section>

      <section>
        <h2>🧪 Practice 3 — Array + Object Combo</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let users = [
  { name: "Syfa", role: "admin", active: true },
  { name: "Rizal", role: "user", active: false }
];

let activeUsers = users.filter(u => u.active);`}
        </CodeBlock>
      </section>

      <section>
        <h2>🔥 Mini Challenges</h2>
        <ul>
          <li>Filter students with score &gt; 80</li>
          <li>Increase all product prices by 10% using map()</li>
          <li>Get users with role "admin"</li>
        </ul>
        <p>Don't rush. Data thinking takes time.</p>
      </section>

      <section>
        <h2>🧠 Why This Module Matters Before DOM</h2>
        <p>When working with DOM, you will:</p>
        <ul>
          <li>Loop data</li>
          <li>Filter data</li>
          <li>Render data into HTML</li>
        </ul>
        <p>Weak array &amp; object skills = DOM nightmare.</p>
      </section>
    </DayPostLayout>
  );
}