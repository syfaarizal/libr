import DayPostLayout, { CodeBlock, QuoteBox } from '../DayPostLayout';

export default function HtmlIntroPage() {
  return (
    <DayPostLayout
      badge="HTML Module"
      title="HTML Basics: The Foundation of Web Development"
      date="May 15, 2025"
      tags="HTML, Web Development, Basics"
      readingTime="8 min read"
      intro="HTML is the foundation of all web development. Learn the basic concepts, tags, and structure that make up every webpage on the internet."
      githubUrl="#"
      prev={{ path: '/blog/days-challenge/day6', title: 'Odd, Even, or Special?' }}
      next={{ path: '/blog/html-modul/html2', title: 'HTML Intermediate: Structure & Semantics' }}
      related={[
        {
          path: '/blog/days-challenge/day6',
          date: 'June 15, 2025',
          title: 'Day 6: Odd, Even, or Special?',
          excerpt: 'Creating a weather application that fetches data from an API and displays it beautifully.',
          tags: ['JavaScript', 'Conditions', 'Logic'],
        },
        {
          path: '/blog/html-modul/html2',
          date: 'May 16, 2025',
          title: 'HTML Intermediate: Structure & Semantics',
          excerpt: 'Learning about iframes, div vs span, and the importance of semantic HTML structure.',
          tags: ['HTML', 'Web Development', 'Semantics'],
        },
      ]}
      conclusion={
        <>
          <h3>🎯 Key Takeaways</h3>
          <p>
            HTML is the foundation of all web development. You've learned about basic structure, tags, text
            formatting, links, images, and tables. Remember that while HTML provides the structure, CSS and
            JavaScript add style and functionality.
          </p>
        </>
      }
    >
      <QuoteBox>
        "If a website is a house, HTML is its foundation. You can't see it, but everything stands because of it."
      </QuoteBox>

      {/* ── What is HTML? ── */}
      <section>
        <h2>✨ What is HTML?</h2>
        <p>
          <b>HTML (HyperText Markup Language)</b> is not a programming language, but a markup language. Its
          function? To structure content on web pages. So HTML tells the browser:
        </p>
        <p>
          <i>"Hey bro, this is a title, this is a paragraph, this is an image, this is a login button."</i>
        </p>
        <p>📌 Not a Programming Language because:</p>
        <ul>
          <li>No logic like <code>if</code>, <code>else</code>, <code>loop</code></li>
          <li>Can't calculate or create dynamic actions</li>
          <li>Only for marking and wrapping content</li>
        </ul>
      </section>

      {/* ── Basic HTML Terms ── */}
      <section>
        <h2>🧩 Basic HTML Terms</h2>
        <table className="tb-blog">
          <thead>
            <tr>
              <th>Term</th>
              <th>Simple Explanation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Element</td>
              <td>
                Main HTML component, usually starts and ends with tags. Example:{' '}
                <code>&lt;p&gt;Hello&lt;/p&gt;</code>
              </td>
            </tr>
            <tr>
              <td>Tag</td>
              <td>
                Structure markers. There are opening <code>&lt;p&gt;</code> and closing{' '}
                <code>&lt;/p&gt;</code> tags.
              </td>
            </tr>
            <tr>
              <td>Attribute</td>
              <td>
                Additional info inside tags. Example: <code>type="text"</code> in{' '}
                <code>&lt;input&gt;</code>.
              </td>
            </tr>
            <tr>
              <td>Property</td>
              <td>Usually used in CSS/JS for styling or scripting, not directly in HTML.</td>
            </tr>
            <tr>
              <td>Content</td>
              <td>
                Text between opening and closing tags. Example: "Hello" in{' '}
                <code>&lt;p&gt;Hello&lt;/p&gt;</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── Meta Tags ── */}
      <section>
        <h2>🔖 Meta Tags: So Browsers Don't Misunderstand</h2>
        <p>Meta tags are like secret instructions given to the browser before the web page appears.</p>

        <h3>🧠 Meta Tag Examples:</h3>
        <table className="tb-blog">
          <thead>
            <tr>
              <th>Tag</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>&lt;meta charset="UTF-8"&gt;</code></td>
              <td>Ensures all characters, emojis, and symbols display correctly.</td>
            </tr>
            <tr>
              <td>
                <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>
              </td>
              <td>Makes the page responsive on phones, tablets, laptops, etc.</td>
            </tr>
          </tbody>
        </table>

        <h3>Why Put Them in <code>&lt;head&gt;</code>?</h3>
        <p>
          Because browsers read the <code>&lt;head&gt;</code> section first. So important info like this
          needs to be given upfront.
        </p>
        <p>
          Meta tags are like giving a briefing to the browser:{' '}
          <i>"Okay, this is how to display my page."</i>
        </p>
      </section>

      {/* ── Text Formatting ── */}
      <section>
        <h2>🎨 Text Formatting</h2>
        <p>HTML can also help you <i>style</i> text!</p>
        <table className="tb-blog">
          <thead>
            <tr>
              <th>Tag</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>&lt;b&gt;</code> / <code>&lt;strong&gt;</code></td>
              <td>Bold text like your feelings for them</td>
            </tr>
            <tr>
              <td><code>&lt;i&gt;</code> / <code>&lt;em&gt;</code></td>
              <td>Italic text, good for emphasis</td>
            </tr>
            <tr>
              <td><code>&lt;u&gt;</code></td>
              <td>Underline</td>
            </tr>
            <tr>
              <td><code>&lt;sup&gt;</code></td>
              <td>Small text above, example: 2<sup>2</sup></td>
            </tr>
            <tr>
              <td><code>&lt;sub&gt;</code></td>
              <td>Small text below, example: H<sub>2</sub>O</td>
            </tr>
            <tr>
              <td><code>&lt;br&gt;</code></td>
              <td>Line break</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── Anchor ── */}
      <section>
        <h2>🔗 Anchor (Links): Web Portals</h2>
        <p>
          The <code>&lt;a&gt;</code> tag is like a teleport door. Click it, and you're somewhere else.
        </p>

        <CodeBlock lang="HTML" langIcon="fab fa-html5">
{`<a href="https://google.com" target="_blank">Search on Google</a>`}
        </CodeBlock>

        <table className="tb-blog">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>href</code></td>
              <td>Link destination</td>
            </tr>
            <tr>
              <td><code>target="_blank"</code></td>
              <td>Open link in new tab (so it doesn't leave your page)</td>
            </tr>
          </tbody>
        </table>
        <p>🌀 <i>Click link = teleport to another world.</i></p>
      </section>

      {/* ── Images ── */}
      <section>
        <h2>🖼️ Images</h2>
        <p>HTML can display images using the <code>&lt;img&gt;</code> tag.</p>

        <CodeBlock lang="HTML" langIcon="fab fa-html5">
{`<img src="image.jpg" alt="Cute Cat Picture">`}
        </CodeBlock>

        <table className="tb-blog">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>src</code></td>
              <td>Image address (online/offline)</td>
            </tr>
            <tr>
              <td><code>alt</code></td>
              <td>Image description (for accessibility and SEO)</td>
            </tr>
          </tbody>
        </table>
        <p>
          📌 <i><code>alt</code> is super important. If the image fails to load, this text becomes the savior.</i>
        </p>
      </section>

      {/* ── Tables ── */}
      <section>
        <h2>📊 Tables</h2>
        <p>Tables are used to display organized data in rows and columns.</p>

        <CodeBlock lang="HTML" langIcon="fab fa-html5">
{`<table>
  <thead>
    <tr>
      <th>No</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Syifa</td>
    </tr>
  </tbody>
</table>`}
        </CodeBlock>

        <table className="tb-blog">
          <thead>
            <tr>
              <th>Tag</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>&lt;table&gt;</code></td>
              <td>Start creating a table</td>
            </tr>
            <tr>
              <td><code>&lt;tr&gt;</code></td>
              <td>Table row</td>
            </tr>
            <tr>
              <td><code>&lt;th&gt;</code></td>
              <td>Column header</td>
            </tr>
            <tr>
              <td><code>&lt;td&gt;</code></td>
              <td>Table data</td>
            </tr>
          </tbody>
        </table>
      </section>
    </DayPostLayout>
  );
}