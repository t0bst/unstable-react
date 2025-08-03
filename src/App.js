import React, { useState, useEffect } from 'react';

// Main App component replicating the Unstable States Dollar site using React
export default function App() {
  // State to toggle mobile navigation menu
  const [navOpen, setNavOpen] = useState(false);
  // Track which section is currently active (for highlighting nav links)
  const [activeSection, setActiveSection] = useState('home');
  // State to show copy tooltip for contract address
  const [copied, setCopied] = useState(false);
  // State for staking amount input
  const [stakeAmount, setStakeAmount] = useState('');

  // Contract address constant
  const contractAddress = '7WXaHLjatDZBAZ7hyRiFpYpGpPbcKiyHf6HaxUzSbonk';

  // IntersectionObserver to update active nav link based on scroll position
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -70% 0px',
      threshold: 0
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    sections.forEach(section => observer.observe(section));
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // Copy contract address to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  // Simulate staking
  const handleStake = () => {
    const amount = parseFloat(stakeAmount);
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount of USD to stake.');
      return;
    }
    alert(`Demo: You would stake ${amount.toLocaleString()} USD. This is a simulation only.`);
    setStakeAmount('');
  };

  // Sample burn/buyback history data
  const burnData = [
    {
      date: '2025-08-01',
      type: 'Burn',
      amount: '10,000 USD',
      notes: 'Initial liquidity burn'
    },
    {
      date: '2025-08-02',
      type: 'Buyback',
      amount: '20,000 USD',
      notes: 'Tokens bought back and added to the staking pool'
    }
  ];

  return (
    <>
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="container nav-container">
          <a href="#home" className="logo-wrap" onClick={() => setNavOpen(false)}>
            <img src="/assets/logo.png" alt="Unstable States Dollar logo" className="logo" />
            <span className="logo-text">USD</span>
          </a>
          <nav className={`nav-links ${navOpen ? 'open' : ''}`} id="navLinks">
            <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => setNavOpen(false)}>Home</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => setNavOpen(false)}>About</a>
            <a href="#tokenomics" className={activeSection === 'tokenomics' ? 'active' : ''} onClick={() => setNavOpen(false)}>Tokenomics</a>
            <a href="#roadmap" className={activeSection === 'roadmap' ? 'active' : ''} onClick={() => setNavOpen(false)}>Roadmap</a>
            <a href="#dashboard" className={activeSection === 'dashboard' ? 'active' : ''} onClick={() => setNavOpen(false)}>Dashboard</a>
            <a href="#buy" className={activeSection === 'buy' ? 'active' : ''} onClick={() => setNavOpen(false)}>How&nbsp;To&nbsp;Buy</a>
            <a href="#community" className={activeSection === 'community' ? 'active' : ''} onClick={() => setNavOpen(false)}>Community</a>
          </nav>
          {/* Hamburger button for mobile */}
          <button className="nav-toggle" aria-label="Open navigation" onClick={() => setNavOpen(!navOpen)}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-logo">
            <img src="/assets/logo.png" alt="Unstable States Dollar" />
          </div>
          <h1 className="hero-title">Unstable States Dollar</h1>
          <p className="hero-subtitle">The most unpredictable meme coin on Solana</p>
          <div className="hero-buttons">
            <a href="#buy" className="btn btn-primary">Buy USD</a>
            <a href="#community" className="btn btn-secondary">Join Community</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about">
        <div className="container">
          <h2>About Unstable States Dollar</h2>
          <p>
            Unstable States Dollar (USD) is a light‑hearted meme coin minted on the Solana
            blockchain using the Bonk protocol. Meme coins are cryptocurrencies created to
            follow trends, employ humor and build a sense of community to attract users<sup><a href="#ref2">[2]</a></sup>.
            They often take their names from pop culture or internet jokes and are
            accompanied by playful marketing campaigns.
          </p>
          <p>
            Our mission is simple: embrace the chaotic fun of crypto while harnessing
            the blazing speed and low fees of Solana. Solana’s innovative design
            processes tens of thousands of transactions per second at extremely low
            fees<sup><a href="#ref1">[1]</a></sup>, making it an ideal home for micro‑transactions,
            trading games and community‑driven tokens like USD.
          </p>
          <p>
            USD isn’t about utility or promises of wealth—it's about community,
            creativity and fun. Like most meme coins, ours is meant purely for
            entertainment and speculative trading; nothing here should be taken as
            financial advice<sup><a href="#ref3">[3]</a></sup>.
          </p>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="section tokenomics">
        <div className="container">
          <h2>Tokenomics</h2>
          <p>
            The Unstable States Dollar supply has been capped at
            <strong>1,000,000,000&nbsp;USD</strong> tokens. Minted on Solana using Bonk, the
            token contract lives at:
          </p>
          <div className="contract-row">
            <span className="contract" id="contractAddress">{contractAddress}</span>
            <button className="copy-btn" onClick={handleCopy} aria-label="Copy contract address">Copy</button>
            <span className="copy-tooltip" style={{ opacity: copied ? 1 : 0 }}>Copied!</span>
          </div>
          <div className="token-distribution">
            <div className="distribution-item">
              <h3>Liquidity</h3>
              <div className="bar"><div className="bar-inner" style={{ width: '50%' }}></div></div>
              <span>50%</span>
            </div>
            <div className="distribution-item">
              <h3>Community Rewards</h3>
              <div className="bar"><div className="bar-inner" style={{ width: '25%' }}></div></div>
              <span>25%</span>
            </div>
            <div className="distribution-item">
              <h3>Marketing &amp; Partnerships</h3>
              <div className="bar"><div className="bar-inner" style={{ width: '15%' }}></div></div>
              <span>15%</span>
            </div>
            <div className="distribution-item">
              <h3>Development</h3>
              <div className="bar"><div className="bar-inner" style={{ width: '10%' }}></div></div>
              <span>10%</span>
            </div>
          </div>
          <div className="token-details">
            <h3>Liquidity</h3>
            <ul>
              <li><strong>LP&nbsp;Burned:</strong> Liquidity is locked and burned forever to ensure fairness and trust.</li>
              <li><strong>Community&nbsp;take&nbsp;over:</strong> With the liquidity burned and ownership renounced, the community fully controls the token’s future.</li>
            </ul>
            <h3>Fair Launch</h3>
            <ul>
              <li><strong>100% Community:</strong> No presale, no team allocation and no tax—just pure community ownership. Everyone has an equal chance to participate from day one.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="section roadmap">
        <div className="container">
          <h2>Roadmap</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-icon"><i className="fa-solid fa-handshake"></i></div>
              <div className="timeline-content">
                <h3>Partner with Streamflow</h3>
                <ul>
                  <li>Offer <span className="contract-inline">$USD</span> staking via Streamflow</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon"><i className="fa-solid fa-fire"></i></div>
              <div className="timeline-content">
                <h3>Buybacks&nbsp;&amp;&nbsp;Burn Plan</h3>
                <ul>
                  <li>Use creator fees from Let’s Bonk tokens for direct buybacks</li>
                  <li>Burn repurchased tokens or add them to the staking pool</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon"><i className="fa-solid fa-display"></i></div>
              <div className="timeline-content">
                <h3>Website&nbsp;&amp;&nbsp;Dashboard</h3>
                <ul>
                  <li>Launch a basic landing page with <span className="contract-inline">$USD</span> token info</li>
                  <li>Integrate Streamflow staking UI</li>
                  <li>Burn tracker &amp; buyback history</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon"><i className="fa-solid fa-cookie-bite"></i></div>
              <div className="timeline-content">
                <h3>SocialFi Expansion</h3>
                <ul>
                  <li>Integrate Cookie&nbsp;Fun to boost community engagement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard & Staking Section */}
      <section id="dashboard" className="section dashboard">
        <div className="container">
          <h2>Dashboard&nbsp;&amp;&nbsp;Staking</h2>
          <p>
            Explore essential information about <span className="contract-inline">$USD</span> and upcoming DeFi features. Stake your
            tokens, track burn events and monitor buybacks—all in one place.
          </p>
          <div className="dashboard-grid">
            <div className="dashboard-item">
              <h3>$USD Token Info</h3>
              <p>
                Total Supply:&nbsp;<strong>1,000,000,000&nbsp;USD</strong><br />
                Contract:&nbsp;<span className="contract-inline">{contractAddress}</span>
              </p>
            </div>
            <div className="dashboard-item">
              <h3>Staking UI</h3>
              <p>
                Partnered with <strong>Streamflow</strong>, our staking portal allows you to lock up your
                USD tokens to earn rewards. Enter the amount you wish to stake and click
                stake to simulate the process.
              </p>
              <div className="staking-ui">
                <input
                  type="number"
                  placeholder="Amount of USD to stake"
                  min="1"
                  step="1"
                  value={stakeAmount}
                  onChange={e => setStakeAmount(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleStake}>Stake</button>
                <p className="note">This is a demo. Actual staking will be available via Streamflow integration.</p>
              </div>
            </div>
            <div className="dashboard-item">
              <h3>Burn Tracker &amp; Buyback History</h3>
              <p>
                Keep tabs on all burn events and buybacks funded by creator fees from Let’s&nbsp;Bonk tokens. The table below shows a running
                history of burns and buybacks (sample data for demonstration).
              </p>
              <table className="burn-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {burnData.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.date}</td>
                      <td>{row.type}</td>
                      <td>{row.amount}</td>
                      <td>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How To Buy Section */}
      <section id="buy" className="section buy">
        <div className="container">
          <h2>How to Buy&nbsp;USD</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Set up a wallet</h3>
                <p>
                  Download a Solana‑compatible wallet such as
                  <a href="https://phantom.app/" target="_blank" rel="noopener">Phantom</a>
                  or <a href="https://solflare.com/" target="_blank" rel="noopener">Solflare</a> and create your address. Secure your recovery
                  phrase and ensure you have full control over your private keys.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Fund your wallet</h3>
                <p>
                  Buy SOL on a centralized exchange or fiat on‑ramp and send it to your wallet. You’ll need SOL to pay network fees and to swap for USD.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Swap for&nbsp;$USD</h3>
                <p>
                  Use a Solana DEX aggregator like
                  <a href="https://jup.ag/" target="_blank" rel="noopener">Jupiter</a> or your preferred DEX to swap your SOL for USD. Enter the
                  contract address
                  <span className="contract-inline">{contractAddress}</span>
                  and approve the transaction using your wallet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="section community">
        <div className="container">
          <h2>Join the Community</h2>
          <p>
            USD thrives on its holders. Follow us on social platforms, share your best
            memes and ideas, and help shape the future of the Unstable States
            Dollar.
          </p>
          <div className="social-links">
            <a href="https://x.com/unstablestatedollar" target="_blank" rel="noopener" aria-label="Twitter"><span className="social-icon">X</span></a>
            <a href="https://t.me/unstablestatedollar" target="_blank" rel="noopener" aria-label="Telegram"><span className="social-icon">TG</span></a>
            <a href="https://discord.gg/unstablestatedollar" target="_blank" rel="noopener" aria-label="Discord"><span className="social-icon">DC</span></a>
          </div>
        </div>
      </section>

      {/* References Section */}
      <footer className="references">
        <div className="container">
          <h2>References</h2>
          <p id="ref1"><a href="【304760831365848†L840-L844】" target="_blank" rel="noopener">[1]</a> Forbes explains that Solana processes tens of thousands of transactions per
            second at extremely low fees, making it ideal for micro‑transactions and
            decentralized applications.</p>
          <p id="ref2"><a href="【118856998733433†L238-L248】" target="_blank" rel="noopener">[2]</a> According to Investopedia, meme coins are humorous
            altcoins created to follow trends and build a sense of community.</p>
          <p id="ref3"><a href="【118856998733433†L309-L314】" target="_blank" rel="noopener">[3]</a> Investopedia warns that meme coins are highly volatile and often lack
            long‑term use cases; investors should exercise caution and treat them as
            entertainment.</p>
        </div>
      </footer>
    </>
  );
}