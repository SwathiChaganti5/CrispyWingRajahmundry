import React, { useEffect, useState } from "react";
import {
  ArrowDownRight, ArrowRight, Flame, Menu, X, MapPin, Phone,
  Clock3, Instagram, ChevronDown, Utensils, Sparkles
} from "lucide-react";
import "./App.css";

const ZOMATO_URL = "https://www.zomato.com/rajahmundry/crispy-wings-rajahmundry-locality/order";

const categories = [
  {
    id: "wings", name: "Wings & Chicken", eyebrow: "THE CRUNCH CLUB", image: "/images/wingschicken.png",
    description: "Big crunch. Bold seasoning. Serious cravings.",
    items: [
      ["8 Pieces Hot Wings", "Crispy wings tossed in a hot, spicy sauce."],
      ["6 Pieces Lollipops", "Spiced chicken lollipops with a golden crust."],
      ["Small Chicken Popcorn", "Bite-sized, crunchy chicken pieces."],
      ["6 Pieces Chicken Strips", "Tender chicken strips in a crispy coating."],
      ["2 Pieces Fried Chicken", "Golden-fried chicken with a seasoned crust."],
      ["2 Pc Grilled Chicken", "Chicken marinated with aromatic spices."]
    ]
  },
  {
    id: "burgers", name: "Burgers", eyebrow: "STACKED & LOADED", image: "/images/burger.png",
    description: "Saucy layers and a satisfying bite, every time.",
    items: [
      ["Crispy Chicken Supreme Burger", "Crunchy chicken with fresh lettuce, tomato and sauce."],
      ["Chicken Double Patty Burger", "A double chicken-patty stack layered with cheese."],
      ["Chicken Keema Crunch Burger", "A bold, crunchy chicken-keema burger."],
      ["BBQ Chicken Ranch Burger", "Chicken, smoky BBQ and creamy ranch flavours."],
      ["Crispy Veg Supreme Burger", "A crunchy veggie patty with fresh toppings."],
      ["Paneer Tikka Burger", "Grilled paneer tikka with crisp veggies and sauce."]
    ]
  },
  {
    id: "pizza", name: "Pizza", eyebrow: "CHEESE PULL ENERGY", image: "/images/pizza-photo.jpg",
    description: "A hot favourite for solo cravings and sharing.",
    items: [
      ["Chicken Dominator Pizza", "A signature-style pizza featuring four types of chicken."],
      ["Spicy Chicken Pizza", "Chicken with a hot-and-spicy flavour profile."],
      ["BBQ Chicken Pizza", "BBQ chicken, sweet corn and regular vegetables."],
      ["Chicken Tikka Makhani Pizza", "Spiced tandoori chicken with a rich makhani twist."],
      ["Veg Margherita Pizza", "A simple veggie pizza with classic toppings."],
      ["Paneer Tandoori Pizza", "Tandoori paneer, red pepper and mint mayonnaise."]
    ]
  },
  {
    id: "combos", name: "Combos", eyebrow: "MORE TO LOVE", image: "/images/chicken-bucket.jpg",
    description: "Bring the crew. Make it a feast.",
    items: [
      ["Mini Combo", "Fries, chicken wrap, chicken sandwich and a drink."],
      ["Couple Combo", "Kebabs, strips, wings, a chicken burger, wrap and drinks."],
      ["Crispy Chicken Bucket", "Kebabs, wings, lollipops, strips and fries."],
      ["Friends Combo", "A sharing spread with chicken favourites, fries and pizza."],
      ["Family Combo", "A larger spread of chicken favourites, pizza and drinks."],
      ["Mini Veg Combo", "A vegetarian mix of crispy bites, fries and a drink."]
    ]
  },
  {
    id: "wraps", name: "Wraps & Sandwiches", eyebrow: "ROLL WITH IT", image: "/images/burger-photo.jpg",
    description: "Easy to hold. Hard to put down.",
    items: [
      ["Crispy Chicken Wrap", "Crispy chicken strips wrapped with veggies and sauce."],
      ["Chicken Tandoori Wrap", "Smoky tandoori chicken in a soft wrap."],
      ["Chicken Keema Wrap", "Spiced chicken keema with fresh vegetables."],
      ["Crispy Chicken Sandwich", "Crunchy chicken, lettuce and creamy mayo."],
      ["Golden Corn Sandwich", "Sweet corn, creamy mayo and gentle seasoning."],
      ["Mexican BBQ Pizza Sandwich", "A fusion sandwich with smoky BBQ and melted cheese."]
    ]
  },
  {
    id: "sides", name: "Sides & Sips", eyebrow: "THE PERFECT SIDEKICK", image: "/images/sidesip.png",
    description: "Add a little extra to your order.",
    items: [
      ["French Fries", "Golden, crispy fries lightly seasoned."],
      ["Pizza Fries", "Fries topped with pizza sauce, cheese and seasoning."],
      ["Chicken Nuggets", "Crunchy-coated, bite-sized chicken nuggets."],
      ["Chicken Garlic Bread", "Garlic bread topped with chicken, cheese and herbs."],
      ["Mocktails", "Refreshing mocktail options listed on the menu."],
      ["Oreo Delight", "A sweet treat from the dessert selection."]
    ]
  }
];

const featured = [
  { title: "Hot Wings", tag: "SPICE LEVEL: BOLD", image: "/images/wings-photo.jpg", className: "feature-wings" },
  { title: "Chicken Dominator", tag: "PIZZA NIGHT", image: "/images/pizza-photo.jpg", className: "feature-pizza" },
  { title: "Crispy Supreme", tag: "BURGER MOOD", image: "/images/burger-photo.jpg", className: "feature-burger" }
];

function Reveal({ children, className = "" }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = document.querySelectorAll(".reveal-watch");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    node.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <div className={`reveal-watch ${className}`}>{children}</div>;
}

function OrderButton({ children = "ORDER ON ZOMATO", className = "" }) {
  return <a className={`button button-hot ${className}`} href={ZOMATO_URL} target="_blank" rel="noreferrer">
    {children}<ArrowRight size={17} strokeWidth={2.5} />
  </a>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("wings");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const active = categories.find((category) => category.id === activeCategory) || categories[0];
  const filteredItems = active.items.filter(([name, description]) =>
    `${name} ${description}`.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onScroll = () => document.body.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToMenu = () => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Crispy Wings home">
          <img className="brand-logo" src="/images/logo.png" alt="Crispy Wings logo" />
          <span className="brand-word">CRISPY<span>WINGS</span><small>RAJAHMUNDRY</small></span>
        </a>
        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <a href="#signature" onClick={() => setMenuOpen(false)}>Fan Favourites</a>
          <a href="#menu" onClick={() => setMenuOpen(false)}>The Menu</a>
          <a href="#visit" onClick={() => setMenuOpen(false)}>Find Us</a>
          <a className="social-link" href="https://www.instagram.com/crispy_wings_official/" target="_blank" rel="noreferrer" aria-label="Follow us on Instagram">
            <Instagram size={17} />
          </a>
          <OrderButton className="nav-order">Order online</OrderButton>
        </nav>
        <div className="mobile-header-actions">
          <a className="social-link mobile-social-link" href="https://www.instagram.com/crispy_wings_official/" target="_blank" rel="noreferrer" aria-label="Follow us on Instagram">
            <Instagram size={17} />
          </a>
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> RAJAHMUNDRY, GET READY <Flame size={15} fill="currentColor" /></div>
            <h1>CRUNCH<br />WITH <span>ATTITUDE.</span></h1>
            <p className="hero-subtitle">Big flavour. Serious crunch.<br /><em>Your next craving starts here.</em></p>
            <div className="hero-actions">
              <OrderButton>GET YOUR CRUNCH</OrderButton>
              <button className="text-button" onClick={goToMenu}>EXPLORE THE MENU <ArrowDownRight size={18} /></button>
            </div>
            <div className="hero-note"><span className="note-dot" /> WINGS · BURGERS · PIZZA · MORE</div>
          </div>
          <div className="hero-art" aria-label="Crispy chicken wings food photograph">
            <div className="orbit orbit-a" /><div className="orbit orbit-b" />
            <div className="hero-sticker sticker-top">HOT<br /><b>& CRISPY</b></div>
            <img className="hero-food" src="/images/hero-wings.jpg" alt="Crispy chicken wings served with seasoning" />
            <div className="hero-splat splat-one">✳</div><div className="hero-splat splat-two">✦</div>
            <div className="hero-caption"><span>01 / THE ORIGINAL CRAVING</span><b>FLAVOUR THAT HITS DIFFERENT</b></div>
          </div>
          <div className="hero-bottom"><span>MADE FOR THE HUNGRY</span><span className="scroll-cue">SCROLL TO FEAST <ChevronDown size={15} /></span><span>EST. IN YOUR CRAVINGS</span></div>
        </section>

        <div className="ticker" aria-label="Food slogan">
          <div className="ticker-track">{Array.from({ length: 4 }).map((_, i) => <span key={i}>NO BORING BITES <b>✳</b> ALL CRUNCH. ALL FLAVOUR. <b>✳</b> LET'S GET SAUCY <b>✳</b></span>)}</div>
        </div>

        <section className="intro section-pad">
          <Reveal className="intro-label"><span className="section-index">01</span><span>THIS IS YOUR SIGN</span></Reveal>
          <Reveal className="intro-content">
            <h2>GOOD FOOD.<br /><span>NO QUIET</span> CRAVINGS.</h2>
            <div className="intro-right"><p>From crispy chicken and loaded burgers to pizza, wraps and shareable combos — find your next favourite on the Crispy Wings menu.</p><a href="#menu" className="underlined-link">FIND YOUR FAVOURITE <ArrowRight size={16}/></a></div>
          </Reveal>
          <div className="intro-marquee"><span>CRAVE IT. CRUNCH IT. REPEAT IT.</span></div>
        </section>

        <section className="signature section-pad" id="signature">
          <Reveal className="section-heading">
            <div><span className="eyebrow"><span className="eyebrow-line" /> CROWD-PLEASING CRAVINGS</span><h2>THE <span>MAIN</span><br />CHARACTERS.</h2></div>
            <p>Some cravings don't need a reason. Start with these menu favourites.</p>
          </Reveal>
          <div className="feature-grid">
            {featured.map((item, index) => <Reveal className={`feature-card ${item.className}`} key={item.title}>
              <div className="feature-card-top"><span>0{index + 1}</span><span>{item.tag}</span></div>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="feature-card-bottom"><h3>{item.title}</h3><a href={ZOMATO_URL} target="_blank" rel="noreferrer" aria-label={`Order ${item.title} on Zomato`}><ArrowUpRightIcon /></a></div>
            </Reveal>)}
          </div>
        </section>

        <section className="menu-section section-pad" id="menu">
          <Reveal className="menu-heading">
            <span className="eyebrow"><span className="eyebrow-line" /> THE LINE-UP</span>
            <h2>FOLLOW<br />YOUR <span>HUNGER.</span></h2>
            <p>Pick a lane. Find your flavour. Prices and availability are shown on Zomato.</p>
          </Reveal>
          <div className="menu-explorer">
            <div className="category-list" role="tablist" aria-label="Menu categories">
              {categories.map((category, i) => <button key={category.id} className={`category-tab ${activeCategory === category.id ? "active" : ""}`} onClick={() => { setActiveCategory(category.id); setQuery(""); }} role="tab" aria-selected={activeCategory === category.id}>
                <span className="category-number">0{i + 1}</span><img className="category-thumb" src={category.image} alt={category.name} /><span>{category.name}</span><ArrowRight className="category-arrow" size={17}/>
              </button>)}
              <div className="category-note"><Flame size={18} fill="currentColor"/><span>THE GOOD STUFF<br/><b>IS ONE CLICK AWAY.</b></span></div>
            </div>
            <div className="menu-panel">
              <div className="menu-panel-heading"><div><span className="mini-eyebrow">{active.eyebrow}</span><h3>{active.name}</h3><p>{active.description}</p></div><img className="menu-big-thumb" src={active.image} alt={active.name}/></div>
              <div className="menu-items">
                {filteredItems.map(([name, description], i) => <article className="menu-item" key={name} style={{ "--item-delay": `${i * 55}ms` }}>
                  <div className="menu-item-number">{String(i + 1).padStart(2, "0")}</div>
                  <div className="menu-item-copy"><h4>{name}</h4><p>{description}</p></div>
                  <a className="item-order" href={ZOMATO_URL} target="_blank" rel="noreferrer" aria-label={`Find ${name} on Zomato`}><ArrowUpRightIcon /></a>
                </article>)}
                {filteredItems.length === 0 && <p className="empty-state">No items match that search in this category. Try another word.</p>}
              </div>
              <div className="menu-panel-footer"><span>MENU ITEMS MAY VARY</span><a href={ZOMATO_URL} target="_blank" rel="noreferrer">SEE MENU & PRICES ON ZOMATO <ArrowRight size={15}/></a></div>
            </div>
          </div>
          <div className="menu-bottom-cta"><p>Found your craving?</p><OrderButton>ORDER ON ZOMATO</OrderButton></div>
        </section>

        <section className="manifesto">
          <div className="manifesto-bg-type" aria-hidden="true">CRUNCH</div>
          <Reveal className="manifesto-content"><span className="eyebrow"><Flame size={15} fill="currentColor"/> CRAVINGS, ANSWERED</span><h2>ONE BITE.<br /><span>FULL SEND.</span></h2><p>Make it spicy. Make it cheesy. Make it a combo for the whole crew.</p><OrderButton>LET'S EAT</OrderButton></Reveal>
          <img className="manifesto-food" src="/images/chicken-bucket.jpg" alt="Crispy fried chicken food photograph" loading="lazy"/>
          <span className="manifesto-stamp">THE CRUNCH<br/>IS REAL ✳</span>
        </section>

        <section className="visit section-pad" id="visit">
          <Reveal className="visit-heading"><span className="eyebrow"><span className="eyebrow-line" /> COME THROUGH</span><h2>YOUR TABLE.<br /><span>YOUR RULES.</span></h2><p>Looking for us in Rajahmundry? Here's the listed location and contact information.</p></Reveal>
          <div className="visit-grid">
            <Reveal className="visit-card visit-address"><div className="visit-card-icon"><MapPin size={22}/></div><span className="mini-eyebrow">FIND THE SPOT</span><h3>CRISPY WINGS</h3><p>Shop 3 & 4, Door 79-07-06,<br/>Old Somalamma Temple Street,<br/>Syamala Nagar, Rajahmundry.</p><a href="https://www.google.com/maps/search/?api=1&query=Crispy+Wings+Old+Somalamma+Temple+Street+Rajahmundry" target="_blank" rel="noreferrer" className="underlined-link">OPEN MAPS <ArrowRight size={16}/></a></Reveal>
            <Reveal className="visit-card visit-contact"><div className="visit-card-icon"><Phone size={22}/></div><span className="mini-eyebrow">GOT A QUESTION?</span><h3>GIVE US A RING.</h3><p>Call the restaurant using the contact number listed for this location.</p><a className="phone-link" href="tel:+919542426444">+91 95424 26444</a><a href="tel:+919542426444" className="underlined-link">CALL CRISPY WINGS <ArrowRight size={16}/></a></Reveal>
            <Reveal className="visit-card visit-order"><div className="visit-card-icon"><Utensils size={22}/></div><span className="mini-eyebrow">READY WHEN YOU ARE</span><h3>ORDER YOUR FAVES.</h3><p>Check the current menu, availability and prices on the restaurant's Zomato listing.</p><OrderButton>ORDER ON ZOMATO</OrderButton></Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home"><img className="brand-logo" src="/images/logo.png" alt="Crispy Wings logo" /><span className="brand-word">CRISPY<span>WINGS</span><small>RAJAHMUNDRY</small></span></a>
        <span className="footer-slogan">KEEP IT CRISPY. KEEP IT LOUD.</span>
        <div className="footer-actions">
          <a className="social-link footer-social" href="https://www.instagram.com/crispy_wings_official/" target="_blank" rel="noreferrer" aria-label="Follow us on Instagram">
            <Instagram size={18} />
          </a>
          <a href={ZOMATO_URL} target="_blank" rel="noreferrer" className="footer-zomato">FIND US ON ZOMATO <ArrowRight size={16}/></a>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} CRISPY WINGS</span><a href="#home">BACK TO TOP ↑</a><span>MADE FOR BIG CRAVINGS</span></div>
      </footer>
      <a href={ZOMATO_URL} target="_blank" rel="noreferrer" className="mobile-order-float"><Flame size={17} fill="currentColor"/> ORDER ON ZOMATO <ArrowRight size={16}/></a>
    </div>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight size={18} className="arrow-diagonal" />;
}
