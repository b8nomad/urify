const Home = () => {
  return (
    <>
      <div className="jumbotron mb-5 p-5 bg-light rounded-3">
        <h1 className="display-4">Welcome to Urify!</h1>
        <p className="lead">
          Your ultimate URL shortening service. Create short, memorable links
          for your long URLs and track their performance.
        </p>
        <hr className="my-4" />
        <p>
          Get started by creating your first short URL or explore our features
          to see what Urify can do for you.
        </p>
        <div className="mt-4">
          <button
            className="btn btn-primary btn-lg me-3"
            onClick={() => window.location.href = '/create'}
          >
            Create Short URL
          </button>
          <button className="btn btn-outline-secondary btn-lg"
            onClick={() => window.location.href = 'https://b8nomad.lol'}
          >
            Go to Nomad
          </button>
        </div>
      </div>
      <div>
        <h1 className="mb-4">Features</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">🔗 URL Shortening</h5>
                <p className="card-text">
                  Convert long URLs into short, manageable links that are easy
                  to share across platforms.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">📊 Analytics</h5>
                <p className="card-text">
                  Track clicks, monitor performance, and get detailed insights
                  about your shortened URLs.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">🎨 Custom Slugs</h5>
                <p className="card-text">
                  Create personalized short URLs with custom slugs that match
                  your brand or campaign.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">⚡ Fast Redirects</h5>
                <p className="card-text">
                  Lightning-fast redirects ensure your users reach their
                  destination without delay.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">🔒 Secure Links</h5>
                <p className="card-text">
                  All URLs are processed securely with industry-standard
                  security measures.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">📱 Mobile Friendly</h5>
                <p className="card-text">
                  Fully responsive design that works perfectly on all devices
                  and screen sizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
