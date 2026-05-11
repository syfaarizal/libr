import DayPostLayout, { CodeBlock, QuoteBox } from '../DayPostLayout';

export default function HtmlIntro2Page() {
  return (
    <DayPostLayout
      badge="HTML Module"
      title="HTML Intermediate: Structure & Semantics"
      date="May 16, 2025"
      tags="HTML, Web Development, Semantics"
      readingTime="10 min read"
      intro="Take your HTML skills to the next level by learning about iframes, div vs span, and the importance of semantic HTML structure."
      githubUrl="#"
      prev={{ path: '/blog/html-modul/html1', title: 'HTML Basics: The Foundation of Web Development' }}
      next={{ path: '/blog/css-modul/css1', title: 'CSS Fundamentals: The Basics You Must Know' }}
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
          date: 'May 10, 2025',
          title: 'CSS Fundamentals: The Basics You Must Know',
          excerpt: 'CSS is what makes your HTML go from boring black text to a stunning visual experience.',
          tags: ['CSS', 'Basics', 'Fundamentals'],
        },
      ]}
      conclusion={
        <>
          <h3>🎯 Key Takeaways</h3>
          <p>
            <i>
              HTML is like decorating a house after the foundation is built. In this lesson, you learned how to
              arrange rooms so they're not messy and all elements have meaning.
            </i>
          </p>
          <h3>What I learned:</h3>
          <ul>
            <li>
              How to embed external content with <code>&lt;iframe&gt;</code>
            </li>
            <li>
              Understand the function &amp; difference between <code>div</code> and <code>span</code>
            </li>
            <li>Get to know semantic HTML and why it's important</li>
            <li>Know the ideal HTML5 structure for real projects</li>
          </ul>
        </>
      }
    >
      <QuoteBox>
        "If part 1 was the house foundation, part 2 is about arranging the rooms to be cozy and well-structured."
      </QuoteBox>

      {/* ── iframe ── */}
      <section>
        <h2>🖼️ What is <code>&lt;iframe&gt;</code>?</h2>
        <p>
          <code>&lt;iframe&gt;</code> is like a small window in your page that can display another web page
          from the internet.
        </p>

        <h3>🔍 Functions:</h3>
        <ul>
          <li>Display YouTube videos</li>
          <li>Show Google Maps</li>
          <li>Embed external documents</li>
        </ul>

        <h3>🔧 Example:</h3>
        <CodeBlock lang="HTML" langIcon="fab fa-html5">
{`<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  width="560"
  height="315"
  allowfullscreen>
</iframe>`}
        </CodeBlock>

        <h3>⚠️ Tips:</h3>
        <ul>
          <li>Don't use too many iframes, they make pages heavy</li>
          <li>
            Use <code>width</code>, <code>height</code>, and <code>allowfullscreen</code> attributes to
            control appearance
          </li>
        </ul>
      </section>

      {/* ── div ── */}
      <section>
        <h2>📦 What is <code>&lt;div&gt;</code>?</h2>
        <p>
          <code>&lt;div&gt;</code> stands for <i>division</i>, and is used to wrap/group larger HTML elements.
        </p>

        <h3>🔍 Its functions:</h3>
        <ul>
          <li>Divide content into sections</li>
          <li>Used with CSS for layout styling</li>
        </ul>
        <p>
          🧠 Think of it like: <code>div</code> = big container (like a cardboard box holding many items)
        </p>

        <h3>🔧 Example:</h3>
        <CodeBlock lang="HTML" langIcon="fab fa-html5">
{`<div class="card">
  <h2>Article Title</h2>
  <p>Article content goes here...</p>
</div>`}
        </CodeBlock>
      </section>

      {/* ── span ── */}
      <section>
        <h2>🧬 What is <code>&lt;span&gt;</code>?</h2>
        <p>
          <code>&lt;span&gt;</code> is an inline element used to wrap small text you want to{' '}
          <i>format or style</i>.
        </p>

        <h3>🔍 Its functions:</h3>
        <ul>
          <li>Highlight specific text</li>
          <li>Add style to words/sentences without disrupting paragraphs</li>
        </ul>
        <p>
          🧠 Think of it like: <code>span</code> = text highlighter, not a box
        </p>

        <h3>🔧 Example:</h3>
        <CodeBlock lang="HTML" langIcon="fab fa-html5">
{`<p>My name is <span class="highlight">Syifa Arizal</span> and I love coding!</p>`}
        </CodeBlock>
      </section>

      {/* ── div vs span ── */}
      <section>
        <h2>⚔️ Difference Between <code>div</code> vs <code>span</code></h2>
        <table className="tb-blog">
          <thead>
            <tr>
              <th>Comparison</th>
              <th><code>&lt;div&gt;</code></th>
              <th><code>&lt;span&gt;</code></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type</td>
              <td>Block-level</td>
              <td>Inline</td>
            </tr>
            <tr>
              <td>Size</td>
              <td>Full line width</td>
              <td>Only small text selection</td>
            </tr>
            <tr>
              <td>Commonly used for</td>
              <td>Layout &amp; large containers</td>
              <td>Styling specific words/sentences</td>
            </tr>
            <tr>
              <td>Creates new line?</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
        <p>
          🧠 If <code>div</code> <i>is a container box</i>, <code>span</code>{' '}
          <i>is a text highlighter</i>.
        </p>
      </section>

      {/* ── Semantic HTML ── */}
      <section>
        <h2>🧠 What is Semantic HTML?</h2>
        <p>
          <b>Semantic HTML</b> are HTML elements whose names already indicate their meaning. So{' '}
          <i>not just neat coding</i>, but also makes websites easier to understand by browsers, SEO, and
          screen readers.
        </p>

        <h3>🎯 Purpose:</h3>
        <ul>
          <li>Clearer structure</li>
          <li>More accessible (for disabilities)</li>
          <li>SEO-friendly</li>
        </ul>

        <h3>🧱 Semantic Tag Examples:</h3>
        <table className="tb-blog">
          <thead>
            <tr>
              <th>Tag</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>&lt;header&gt;</code></td>
              <td>Page header (usually contains logo, nav)</td>
            </tr>
            <tr>
              <td><code>&lt;nav&gt;</code></td>
              <td>Navigation/menu</td>
            </tr>
            <tr>
              <td><code>&lt;main&gt;</code></td>
              <td>Main content</td>
            </tr>
            <tr>
              <td><code>&lt;article&gt;</code></td>
              <td>Standalone article</td>
            </tr>
            <tr>
              <td><code>&lt;section&gt;</code></td>
              <td>Specific section in page</td>
            </tr>
            <tr>
              <td><code>&lt;footer&gt;</code></td>
              <td>Page footer</td>
            </tr>
            <tr>
              <td><code>&lt;aside&gt;</code></td>
              <td>Sidebar or additional info</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── Non-Semantic ── */}
      <section>
        <h2>🚫 Non-Semantic HTML</h2>
        <p>
          <b>Non-semantic HTML</b> are tags that <i>don't provide context</i> about their content.
        </p>

        <h3>🎯 Examples:</h3>
        <ul>
          <li><code>&lt;div&gt;</code></li>
          <li><code>&lt;span&gt;</code></li>
        </ul>
        <p>
          These don't say "hey I'm navigation" or "this is an article." They're just empty boxes without
          identity.
        </p>
      </section>

      {/* ── Combination Example ── */}
      <section>
        <h2>🔀 Semantic &amp; Non-Semantic Combination Example</h2>
        <CodeBlock lang="HTML" langIcon="fab fa-html5">
{`<header>
  <div class="logo">🌟 Website Logo</div>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Learning HTML is fun!</h1>
    <p><span class="highlight">HTML</span> is the foundation of modern web.</p>
  </article>
</main>
<footer>
  <p>&copy; 2025 - Syifa SICODER.</p>
</footer>`}
        </CodeBlock>
        <p>
          ➡️ This is an example <i>combo</i>: semantic HTML for big structure, non-semantic for small styling.
        </p>
      </section>

      {/* ── Ideal HTML5 Structure ── */}
      <section>
        <h2>🧩 Ideal HTML5 Structure</h2>
        <CodeBlock lang="HTML" langIcon="fab fa-html5">
{`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Syifa's Website</title>
  </head>
  <body>
    <header>...</header>
    <nav>...</nav>
    <main>
      <section>...</section>
      <article>...</article>
    </main>
    <footer>...</footer>
  </body>
</html>`}
        </CodeBlock>
        <p>🧠 Complete structure: clear, easy to read, and ready for responsive + SEO!</p>
      </section>
    </DayPostLayout>
  );
}