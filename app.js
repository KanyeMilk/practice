function App() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="index.html" aria-label="Effortless home">
          Effortless
        </a>
        <nav className="header-actions" aria-label="Main navigation">
          <a href="#how">How it works</a>
          <a href="applicants.html">View Applicants</a>
          <a className="nav-pill" href="apply.html">Enter Pool</a>
        </nav>
      </header>

      <main>
        <section className="home-hero">
          <p className="kicker">Recruiting reversed</p>
          <h1>Stop applying. Start being found.</h1>
          <p>
            Effortless is a calmer hiring layer where candidates upload one
            profile, then recruiters browse the pool and make the first move.
          </p>
          <div className="hero-actions">
            <a href="apply.html">Enter the pool</a>
            <a href="applicants.html">View applicants</a>
          </div>
        </section>

        <section className="how-section" id="how">
          <article>
            <span>01</span>
            <h2>Upload once.</h2>
            <p>Add your role, location, skills, and resume on the application tab.</p>
          </article>
          <article>
            <span>02</span>
            <h2>Join the pool.</h2>
            <p>Your profile appears in the candidate database for recruiter review.</p>
          </article>
          <article>
            <span>03</span>
            <h2>Get selected.</h2>
            <p>Recruiters shortlist people intentionally before starting outreach.</p>
          </article>
        </section>
      </main>

      <footer className="site-footer">
        <h2>The application era is overdue for a redesign.</h2>
        <p>
          Static concept demo. A production version would connect this flow to
          secure resume storage, recruiter accounts, and a real database.
        </p>
      </footer>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
