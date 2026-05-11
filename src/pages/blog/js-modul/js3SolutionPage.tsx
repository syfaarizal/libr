import DayPostLayout, { CodeBlock, QuoteBox } from '../DayPostLayout';

export default function Js3SolutionPage() {
  const conclusion = (
    <>
      <h3>🧠 Final Notes</h3>
      <ul>
        <li>Use <code>filter()</code> to select data</li>
        <li>Use <code>map()</code> to transform data</li>
        <li>Avoid mutating original arrays</li>
        <li>Most UI bugs start with bad data handling</li>
      </ul>
    </>
  );

  return (
    <DayPostLayout
      badge="JS Module 3 — Solutions"
      title="Array & Object — Solutions"
      date="Jan 2026"
      tags="JavaScript, Array, Object, Solutions"
      readingTime="4 min read"
      intro="Official solutions for Module 3 challenges. If you didn't try first — scroll back."
      githubUrl="#"
      prev={{ path: '/blog/js-modul/js3', title: 'Data Exploration: Array & Object' }}
      next={{ path: '/blog/js-modul/js4', title: 'Function Mastery: From Beginner to Clean Code' }}
      related={[]}
      conclusion={conclusion}
    >
      <QuoteBox>"Data skills aren't memorized. They're trained."</QuoteBox>

      <section>
        <h2>🔥 Challenge 1 — Filter Students (score &gt; 80)</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let students = [
  { name: "Adit", score: 85 },
  { name: "Bela", score: 92 },
  { name: "Ciko", score: 70 }
];

let passedStudents = students.filter(s => s.score > 80);
console.log(passedStudents);`}
        </CodeBlock>

        <p>
          <b>Why filter?</b><br />
          Because you're selecting data, not transforming it.
        </p>
      </section>

      <section>
        <h2>🔥 Challenge 2 — Increase Prices by 10%</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let products = [
  { name: "Keyboard", price: 150000 },
  { name: "Mouse", price: 80000 },
  { name: "Headset", price: 200000 }
];

let updatedProducts = products.map(p => {
  return {
    ...p,
    price: p.price * 1.1
  };
});

console.log(updatedProducts);`}
        </CodeBlock>

        <p>
          <b>Key insight:</b><br />
          <code>map()</code> returns a new array. We keep data immutable like real devs.
        </p>
      </section>

      <section>
        <h2>🔥 Challenge 3 — Get Admin Users</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let users = [
  { name: "Syfa", role: "admin", active: true },
  { name: "Rizal", role: "user", active: false },
  { name: "Dina", role: "admin", active: true }
];

let admins = users.filter(u => u.role === "admin");
console.log(admins);`}
        </CodeBlock>

        <p>
          This pattern shows up constantly in dashboards, permission systems, and API filtering.
        </p>
      </section>

      <section>
        <h2>🚀 Bonus — Active Admins Only</h2>

        <CodeBlock lang="JavaScript" langIcon="fab fa-js">
{`let activeAdmins = users.filter(
  u => u.role === "admin" && u.active
);

console.log(activeAdmins);`}
        </CodeBlock>

        <p>Combining conditions = real-world logic.</p>
      </section>
    </DayPostLayout>
  );
}