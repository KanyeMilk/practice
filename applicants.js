const { useState } = React;

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwPtqHjrERNrxXzZVcS7_FPVKasvTkZXBSLuibkTiAgHx_ceSXv1MVBjJhUPFxBtu4lrw/exec";

function ApplicantsApp() {
  const [form, setForm] = useState({
    fullName: "",
    businessEmail: "",
    companyName: "",
    hiringNeeds: "",
  });
  const [status, setStatus] = useState("");

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("Sending request...");

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          requestType: "recruiter_access",
          fullName: form.fullName,
          businessEmail: form.businessEmail,
          companyName: form.companyName,
          hiringNeeds: form.hiringNeeds,
        }),
      });

      setForm({
        fullName: "",
        businessEmail: "",
        companyName: "",
        hiringNeeds: "",
      });
      event.target.reset();
      setStatus("Request sent. We will review your business and follow up by email.");
    } catch {
      setStatus("Something went wrong. Please try again.");
    }
  }

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

      <main className="access-request">
        <section className="applicants-intro">
          <p className="kicker">Recruiter access</p>
          <h1>Request access to the applicant pool.</h1>
          <p>
            Applicant review stays private. Submit your business details below
            and Effortless will verify your company before sending an access
            invite by email.
          </p>
        </section>

        <form className="request-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              placeholder="Jordan Lee"
              autoComplete="name"
            />
          </label>
          <label>
            Business email
            <input
              type="email"
              value={form.businessEmail}
              onChange={(event) =>
                updateField("businessEmail", event.target.value)
              }
              placeholder="jordan@company.com"
              autoComplete="email"
            />
          </label>
          <label>
            Company name
            <input
              value={form.companyName}
              onChange={(event) =>
                updateField("companyName", event.target.value)
              }
              placeholder="Northstar Talent"
            />
          </label>
          <label className="is-full">
            What roles are you hiring for?
            <textarea
              rows="4"
              value={form.hiringNeeds}
              onChange={(event) =>
                updateField("hiringNeeds", event.target.value)
              }
              placeholder="Growth marketing, operations, product, early career hires..."
            />
          </label>
          <button type="submit">Request access</button>
          {status && <p className="form-status">{status}</p>}
          <p className="request-note">
            Access is reviewed manually. Businesses will only receive an invite
            after verification.
          </p>
        </form>
      </main>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ApplicantsApp />);
