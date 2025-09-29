import { useState } from "react";

const Manage = () => {
  const [slug, setSlug] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [urlData, setUrlData] = useState<{
    slug: string;
    redirectUrl: string;
    clickCount: number;
    createdAt: string;
  } | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.BACKEND_URL}?url_slug=${encodeURIComponent(slug)}&password=${encodeURIComponent(password)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid password or URL not found');
      }

      if (!data.slug || !data.slug._id) {
        throw new Error('Invalid password or URL not found');
      }

      setUrlData({
        slug: data.slug.url_slug,
        redirectUrl: data.slug.redirect,
        clickCount: data.slug.count || 0,
        createdAt: data.slug.createdAt || new Date().toISOString(),
      });
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (newPassword.length < 1) {
      setError("Password cannot be empty");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.BACKEND_URL}?new_password=${encodeURIComponent(newPassword)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url_slug: slug,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to change password');
      }

      setNewPassword("");
      setConfirmPassword("");
      setIsChangingPassword(false);
      // Update the current password for future operations
      setPassword(newPassword);
      alert('Password changed successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetSession = () => {
    setIsAuthenticated(false);
    setUrlData(null);
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChangingPassword(false);
    setError("");
  };

  if (!isAuthenticated) {
    return (
      <div className="card mb-5">
        <div className="card-body">
          <h2 className="card-title mb-4">Manage Short URL</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-3">
              <label htmlFor="slug" className="form-label">
                URL Slug
              </label>
              <div className="input-group">
                <span className="input-group-text">urify.b8nomad.lol/r/</span>
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
                  placeholder="Enter password to access management"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Access Management"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Managing: {urlData?.slug}</h2>
        <button 
          className="btn btn-outline-secondary btn-sm"
          onClick={resetSession}
        >
          Switch URL
        </button>
      </div>

      {/* URL Statistics Card */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">URL Statistics</h5>
          <div className="row">
            <div className="col-md-6">
              <p className="mb-2">
                <strong>Short URL:</strong> 
                <br />
                <a 
                  href={`https://urify.b8nomad.lol/r/${urlData?.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  urify.b8nomad.lol/r/{urlData?.slug}
                </a>
              </p>
              <p className="mb-2">
                <strong>Redirects to:</strong>
                <br />
                <a 
                  href={urlData?.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-break"
                >
                  {urlData?.redirectUrl}
                </a>
              </p>
            </div>
            <div className="col-md-6">
              <div className="text-center">
                <h1 className="display-4 text-primary mb-0">{urlData?.clickCount}</h1>
                <p className="text-muted">Total Clicks</p>
              </div>
              <p className="mb-0">
                <strong>Created:</strong> {new Date(urlData?.createdAt || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Password Management Card */}
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">Password Management</h5>
            {!isChangingPassword && (
              <button 
                className="btn btn-outline-warning btn-sm"
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </button>
            )}
          </div>

          {isChangingPassword && (
            <>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handlePasswordChange}>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showNewPass ? "text" : "password"}
                      className="form-control"
                      id="newPassword"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowNewPass(!showNewPass)}
                    >
                      {showNewPass ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm New Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                    >
                      {showConfirmPass ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-warning"
                    disabled={isLoading}
                  >
                    {isLoading ? "Changing..." : "Change Password"}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setNewPassword("");
                      setConfirmPassword("");
                      setError("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}

          {!isChangingPassword && (
            <p className="text-muted mb-0">
              Click "Change Password" to update the password for this short URL.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manage;
