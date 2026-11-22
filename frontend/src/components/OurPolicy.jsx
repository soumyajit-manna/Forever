const policies = [
  {
    title: "Easy Exchanges",
    description: "Hassle-free exchanges, made simple.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 8h15l-3-3m4 11H5l3 3" />
        <path d="m16 5 3 3-3 3M8 13l-3 3 3 3" />
      </svg>
    ),
  },
  {
    title: "7-Day Returns",
    description: "Enjoy a free return within seven days.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 8.5 12 5l7 3.5v8L12 20l-7-3.5v-8Z" />
        <path d="M5.5 8.8 12 12l6.5-3.2M12 12v7.5" />
        <path d="M9 6.5 16 10" />
      </svg>
    ),
  },
  {
    title: "Here for You",
    description: "Our support team is here, 24/7.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4.5 13v-1a7.5 7.5 0 0 1 15 0v1" />
        <path d="M4.5 12h2.2a1.8 1.8 0 0 1 1.8 1.8v2.4A1.8 1.8 0 0 1 6.7 18H6a1.5 1.5 0 0 1-1.5-1.5V12Zm15 0h-2.2a1.8 1.8 0 0 0-1.8 1.8v2.4a1.8 1.8 0 0 0 1.8 1.8h.7a1.5 1.5 0 0 0 1.5-1.5V12Z" />
        <path d="M17 18c-.6 1.1-1.7 1.7-3.5 1.7" />
      </svg>
    ),
  },
];

const renderPolicyCards = () =>
  policies.map((policy, index) => (
    <article className="policy-card" key={policy.title}>
      <div className="policy-card-top">
        <span>0{index + 1}</span>
        <div className="policy-icon">{policy.icon}</div>
      </div>
      <h3>{policy.title}</h3>
      <p>{policy.description}</p>
    </article>
  ));

const OurPolicy = () => {
  return (
    <section className="policy-section">
      <div className="policy-inner">
        <div className="policy-heading">
          <p className="policy-kicker">
            <span>04</span>
            THE FOREVER PROMISE
          </p>
          <h2>
            Good style.
            <br />
            <em>Good service.</em>
          </h2>
          <p className="policy-intro">
            A little more care, built into every order.
          </p>
        </div>

        <div className="policy-grid">
          <div className="policy-track">
            <div className="policy-group">{renderPolicyCards()}</div>
            <div className="policy-group policy-group--duplicate" aria-hidden="true">
              {renderPolicyCards()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
