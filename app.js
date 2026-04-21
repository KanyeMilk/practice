const { useState } = React;

const navGroups = [
  {
    title: "Featured",
    links: ["New Arrivals", "Classic Styles", "Athletics", "Footwear"],
  },
  {
    title: "Collections",
    links: ["Spring Edit", "Winter Uniform", "Team Apparel", "Core Fleece"],
  },
  {
    title: "Mens",
    links: ["Tops", "Bottoms", "Hoodies", "Knitwear", "Outerwear"],
  },
  {
    title: "Womens",
    links: ["Tops", "Bottoms", "Knitwear", "Outerwear"],
  },
];

const heroPanels = [
  {
    eyebrow: "Campaign",
    title: "Spring essentials",
    action: "Discover",
  },
  {
    eyebrow: "Shop",
    title: "Classic silhouettes",
    action: "Shop now",
  },
];

const productCards = [
  "Relaxed Hoodie",
  "Heavy Fleece Sweatpant",
  "Boxy Long Sleeve",
  "Nylon Coaches Jacket",
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <button className="text-button" onClick={() => setMenuOpen(true)}>
          Filter +
        </button>
        <a className="brand" href="#top" aria-label="Essentials practice home">
          Essentials
        </a>
        <nav className="header-actions" aria-label="Utility navigation">
          <button className="text-button" onClick={() => setSearchOpen(true)}>
            Search
          </button>
          <a href="#account">Account</a>
          <a href="#bag">Bag 0</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-grid" aria-label="Featured editorials">
          {heroPanels.map((panel) => (
            <article className="hero-panel" key={panel.title}>
              <div className="blank-image">
                <span>Image placeholder</span>
              </div>
              <div className="panel-caption">
                <p>{panel.eyebrow}</p>
                <h1>{panel.title}</h1>
                <a href="#collection">{panel.action}</a>
              </div>
            </article>
          ))}
        </section>

        <section className="collection-intro" id="collection">
          <p className="kicker">Collection</p>
          <h2>Quiet uniforms for everyday movement.</h2>
          <div className="split-actions">
            <a href="#mens">Shop mens</a>
            <a href="#womens">Shop womens</a>
          </div>
        </section>

        <section className="product-row" aria-label="Featured product placeholders">
          {productCards.map((item, index) => (
            <article className="product-card" key={item}>
              <div className="product-image">
                <span>Blank {index + 1}</span>
              </div>
              <div className="product-meta">
                <p>{item}</p>
                <span>Coming soon</span>
              </div>
            </article>
          ))}
        </section>

        <section className="lookbook">
          <div className="lookbook-copy">
            <p className="kicker">Lookbook</p>
            <h2>Built around calm color, clean spacing, and image-led shopping.</h2>
            <p>
              These gray blocks are ready for your own campaign photos, product
              shots, or lifestyle images when you want to customize the site.
            </p>
          </div>
          <div className="wide-placeholder">
            <span>Wide image placeholder</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <h2>Join the conversation</h2>
          <form className="email-form">
            <label htmlFor="email">Email address</label>
            <div>
              <input id="email" type="email" placeholder="you@example.com" />
              <button type="button">Subscribe</button>
            </div>
          </form>
        </div>
        <p className="practice-note">
          Practice storefront concept. Not affiliated with Fear of God.
        </p>
      </footer>

      <aside className={`drawer ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawer-header">
          <p>Navigation</p>
          <button className="text-button" onClick={() => setMenuOpen(false)}>
            Close
          </button>
        </div>
        {navGroups.map((group) => (
          <section className="drawer-group" key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map((link) => (
              <a href="#collection" onClick={() => setMenuOpen(false)} key={link}>
                {link}
              </a>
            ))}
          </section>
        ))}
      </aside>

      <div
        className={`scrim ${menuOpen || searchOpen ? "is-visible" : ""}`}
        onClick={() => {
          setMenuOpen(false);
          setSearchOpen(false);
        }}
      />

      <section className={`search-panel ${searchOpen ? "is-open" : ""}`} aria-hidden={!searchOpen}>
        <div className="drawer-header">
          <p>Search</p>
          <button className="text-button" onClick={() => setSearchOpen(false)}>
            Close
          </button>
        </div>
        <label htmlFor="siteSearch">Enter keyword</label>
        <input id="siteSearch" type="search" placeholder="Hoodie, fleece, outerwear" />
        <button type="button">Submit</button>
      </section>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
