const { useEffect, useState } = React;

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwPtqHjrERNrxXzZVcS7_FPVKasvTkZXBSLuibkTiAgHx_ceSXv1MVBjJhUPFxBtu4lrw/exec";

function ApplicantsApp() {
  const [applicants, setApplicants] = useState([]);
  const [status, setStatus] = useState("Loading applicants...");

  const formatSubmittedAt = (value) => {
    if (!value) {
      return "New applicant";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const callbackName = `effortlessApplicants_${Date.now()}`;
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      setStatus("Applicant list is not available yet. Update and redeploy the Apps Script list endpoint.");
      delete window[callbackName];
      script.remove();
    }, 8000);

    window[callbackName] = (response) => {
      window.clearTimeout(timeout);
      setApplicants(response.applicants || []);
      setStatus(response.applicants?.length ? "" : "No applicants have been submitted yet.");
      delete window[callbackName];
      script.remove();
    };

    script.src = `${APPS_SCRIPT_URL}?callback=${callbackName}`;
    script.onerror = () => {
      window.clearTimeout(timeout);
      setStatus("Applicant list could not load. Check the Apps Script deployment.");
      delete window[callbackName];
      script.remove();
    };

    document.body.appendChild(script);

    return () => {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    };
  }, []);

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
          <p className="kicker">Recruiter view</p>
          <h1>Applicants</h1>
          <p>
            Every submission from the candidate pool appears here after the
            Apps Script read endpoint is deployed. Recruiters can scan the list
            and open each resume from the pool.
          </p>
        </section>

        {status && <p className="applicant-status">{status}</p>}

        <section className="applicant-list" aria-label="Applicant list">
          {applicants.map((applicant, index) => (
            <article className="applicant-row" key={`${applicant.submittedAt}-${index}`}>
              <div>
                <span>{formatSubmittedAt(applicant.submittedAt)}</span>
                <h2>{applicant.name || "Unnamed applicant"}</h2>
              </div>
              <p>{applicant.role || "Role pending"}</p>
              <p>{applicant.skills || "Skills pending"}</p>
              <p>Zip {applicant.zipCode || "pending"}</p>
              {applicant.resumeUrl ? (
                <a href={applicant.resumeUrl} target="_blank" rel="noreferrer">
                  Resume
                </a>
              ) : (
                <span>No resume</span>
              )}
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ApplicantsApp />);
