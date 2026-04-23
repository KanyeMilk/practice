function ApplicantsApp() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="index.html" aria-label="Effortless home">
          Effortless
        </a>
        <nav className="header-actions" aria-label="Main navigation">
          <a href="index.html#how">How it works</a>
          <a className="nav-pill is-active" href="applicants.html">View Applicants</a>
          <a href="apply.html">Enter Pool</a>
        </nav>
      </header>

      <main className="applicants-page">
        <section className="applicants-intro">
          <p className="kicker">Recruiter access</p>
          <h1>Applicant review is coming soon.</h1>
          <p>
            This area will become a more intentional recruiter workflow later:
            login, filtering, candidate review, and controlled resume access.
            For now, applicant data stays out of the public website view.
          </p>
          <div className="hero-actions">
            <a href="apply.html">Enter the pool</a>
            <a href="index.html">Return home</a>
          </div>
        </section>
      </main>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ApplicantsApp />);
