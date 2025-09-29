const Footer = () => {
  return (
    <footer className="mt-5 py-4 text-center text-muted border-top bg-white shadow-sm">
      <div>
        Built with{" "}
        <span role="img" aria-label="coffee">
          ☕️
        </span>{" "}
        by{" "}
        <a
          href="https://b8nomad.lol"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none fw-bold text-primary"
        >
          Elisha
        </a>
        .
      </div>
      <div>
        &copy; {new Date().getFullYear()}{" "}
        <span className="fw-semibold">Urify</span>. All rights reserved.
      </div>
      <div className="mt-2">
        <a
          href="https://twitter.com/elisha_smile"
          target="_blank"
          rel="noopener noreferrer"
          className="me-3 text-muted"
        >
          <i className="bi bi-twitter"></i> Twitter
        </a>
        <a
          href="https://github.com/b8nomad/urify"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted"
        >
          <i className="bi bi-github"></i> GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
