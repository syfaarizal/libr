import DayPostLayout, { CodeBlock, QuoteBox } from '../DayPostLayout';

export default function Css3Page() {
  return (
    <DayPostLayout
      badge="Layout"
      title="CSS Layout: Positioning and Modern Techniques"
      date="May 22, 2025"
      tags="CSS, Layout, Flexbox, Grid"
      readingTime="9 min read"
      intro="Master modern CSS layout techniques including positioning, Flexbox, Grid systems, and responsive design to create professional web layouts."
      githubUrl="#"
      prev={{ path: '/blog/css-modul/css2', title: 'CSS Styling: Beyond the Basics' }}
      next={{ path: '/blog/css-modul/css4', title: 'CSS Advanced: Animations, Responsive Design & Best Practices' }}
      related={[
        {
          path: '/blog/css-modul/css2',
          date: 'May 19, 2025',
          title: 'CSS Styling: Beyond the Basics',
          excerpt: 'Master text styling, box model, backgrounds, and display properties.',
          tags: ['CSS', 'Web Design', 'Styling'],
        },
        {
          path: '/blog/css-modul/css4',
          date: 'May 27, 2025',
          title: 'CSS Advanced: Animations, Responsive Design & Best Practices',
          excerpt: 'Bring your websites to life with smooth animations and interactive transitions.',
          tags: ['CSS', 'Animations', 'Responsive Design'],
        },
      ]}
      conclusion={
        <>
          <h3>🎯 Key Takeaways</h3>
          <ul>
            <li>Know all <code>position</code> types and how to use them</li>
            <li>Can control layers with <code>z-index</code></li>
            <li>Flexbox = easy layouts, centered without stress</li>
            <li>CSS Grid = create complex magazine-like layouts</li>
            <li>Media query = responsive layouts? automatic!</li>
          </ul>
        </>
      }
    >
      <QuoteBox>
        &quot;Now that the design looks good, let&apos;s arrange the placement so elements don&apos;t go wild and step on each other.&quot;
      </QuoteBox>

      <section>
        <h2>📍 Positioning: Keeping Elements in Place</h2>
        <p>
          CSS has the <code>position</code> property to control how elements &quot;stick&quot; to the page.
        </p>
        <h3>🔧 Types of <code>position</code>:</h3>
        <table className="tb-blog">
          <thead>
            <tr>
              <th>Type</th>
              <th>Brief Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>static</code></td><td>Default (follows HTML flow)</td></tr>
            <tr><td><code>relative</code></td><td>Offset relative to initial position</td></tr>
            <tr><td><code>absolute</code></td><td>Sticks to nearest positioned parent</td></tr>
            <tr><td><code>fixed</code></td><td>Sticks to viewport (doesn&apos;t scroll)</td></tr>
            <tr><td><code>sticky</code></td><td>Hybrid of relative + fixed (sticks when scrolling)</td></tr>
          </tbody>
        </table>
        <h3>🧪 Example:</h3>
        <CodeBlock lang="CSS" langIcon="fab fa-css3-alt">
{`.box {
  position: relative;
  top: 20px;
  left: 30px;
}`}
        </CodeBlock>
      </section>

      <section>
        <h2>z-index: Who&apos;s On Top?</h2>
        <p>
          <code>z-index</code> controls the stacking order of elements (z-axis). Higher value = more forward.
        </p>
        <CodeBlock lang="CSS" langIcon="fab fa-css3-alt">
{`.card {
  position: absolute;
  z-index: 10;
}`}
        </CodeBlock>
        <p>Useful so popups/modals don&apos;t get covered by other content. Think of it like Photoshop layers 🎨</p>
      </section>

      <section>
        <h2>🧘 Flexbox: Stress-Free Layouts &amp; Centering</h2>
        <h3>🔧 Important container properties:</h3>
        <CodeBlock lang="CSS" langIcon="fab fa-css3-alt">
{`.container {
  display: flex;
  justify-content: center;   /* Horizontal alignment */
  align-items: center;       /* Vertical alignment */
  flex-direction: row;       /* Can be 'row' or 'column' */
}`}
        </CodeBlock>
        <h3>🔧 Important item properties:</h3>
        <CodeBlock lang="CSS" langIcon="fab fa-css3-alt">
{`.item {
  flex-grow: 1;
}`}
        </CodeBlock>
        <h3>🧪 Simple Flexbox Example:</h3>
        <CodeBlock lang="CSS" langIcon="fab fa-css3-alt">
{`.flexbox {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}`}
        </CodeBlock>
        <CodeBlock lang="HTML" langIcon="fab fa-html5">
{`<div class="flexbox">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
</div>`}
        </CodeBlock>
        <table className="tb-blog">
          <thead>
            <tr>
              <th>Property</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>justify-content</code></td><td>Horizontal position (start, center, end, space-between)</td></tr>
            <tr><td><code>align-items</code></td><td>Vertical position (start, center, stretch, end)</td></tr>
            <tr><td><code>flex-direction</code></td><td>Layout order: row / column</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>🧩 CSS Grid: For More Complex Layouts</h2>
        <p><i>Grid is like Flexbox&apos;s &quot;matrix&quot; version — perfect for 2D layouts (rows &amp; columns).</i></p>
        <h3>🔧 Basic example:</h3>
        <CodeBlock lang="CSS" langIcon="fab fa-css3-alt">
{`.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`}
        </CodeBlock>
        <h3>🔧 Important properties:</h3>
        <table className="tb-blog">
          <thead>
            <tr>
              <th>Property</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>grid-template-columns</code></td><td>Number &amp; width of columns</td></tr>
            <tr><td><code>grid-template-rows</code></td><td>Number &amp; height of rows</td></tr>
            <tr><td><code>gap</code></td><td>Space between elements</td></tr>
            <tr><td><code>grid-column / row</code></td><td>For merging columns/rows (span)</td></tr>
          </tbody>
        </table>
        <h3>🧪 CSS Grid Example:</h3>
        <CodeBlock lang="HTML" langIcon="fab fa-html5">
{`<div class="grid-container">
  <div class="grid-item">A</div>
  <div class="grid-item">B</div>
  <div class="grid-item">C</div>
</div>`}
        </CodeBlock>
        <CodeBlock lang="CSS" langIcon="fab fa-css3-alt">
{`.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}`}
        </CodeBlock>
        <p>🧠 <i>1fr = 1 fraction of available space. Think of it as: 1 slot out of 3 equally divided slots.</i></p>
      </section>

      <section>
        <h2>📱 Responsive Layout: Start Here</h2>
        <p>Use <code>@media query</code> to create responsive layouts based on screen size.</p>
        <h3>🧪 Basic Media Query Example:</h3>
        <CodeBlock lang="CSS" langIcon="fab fa-css3-alt">
{`@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}`}
        </CodeBlock>
        <p>Meaning: when screen ≤ 768px (tablet/mobile), change flex to vertical.</p>
      </section>
    </DayPostLayout>
  );
}