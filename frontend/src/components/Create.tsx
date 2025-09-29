import { useState } from "react";

const Create = () => {
  const [redirect, setRedirect] = useState("");
  const [slug, setSlug] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${import.meta.env.BACKEND_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          redirect: redirect.startsWith('http') ? redirect : `https://${redirect}`,
          url_slug: slug,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create short URL');
      }

      setSuccess(`Short URL created successfully! Your URL: urify.b8nomad.lol/r/${slug}`);
      // Reset form
      setRedirect("");
      setSlug("");
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-5">
      <div className="card-body">
        <h2 className="card-title mb-4">Create a Short URL</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="redirect" className="form-label">
              Redirect URL
            </label>
            <div className="input-group">
              <span className="input-group-text">https://</span>
              <input
                type="text"
                className="form-control"
                id="redirect"
                placeholder="example.com/your-long-url"
                value={redirect}
                onChange={(e) => setRedirect(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="slug" className="form-label">
              Custom Slug
            </label>
            <div className="input-group">
              <span className="input-group-text">https://urify.b8nomad.lol/r/</span>
              <input
                type="text"
                className="form-control"
                id="slug"
                placeholder="your-custom-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
              type={isPassVisible ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Enter a password (optional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setIsPassVisible(!isPassVisible)}
            >
              {isPassVisible ? "Hide" : "Show"}
            </button>
            </div>
          </div>
          <button type="submit" className="btn btn-success" disabled={isLoading}>
            {isLoading ? "Creating..." : "Shorten URL"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;