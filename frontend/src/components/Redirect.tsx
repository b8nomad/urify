import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Redirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      if (slug) {
        const response = await fetch(
          `${import.meta.env.BACKEND_URL}?url_slug=${encodeURIComponent(
            slug
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.slug && data.slug.redirect) {
            window.location.href = data.slug.redirect;
        } else {
          navigate("/", { replace: true });
        }
      }
    };
    fetchAndRedirect();
  }, [slug, navigate]);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "60vh" }}
    >
      <div
        className="spinner-border text-primary mb-3"
        role="status"
        aria-label="Loading"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div>Redirecting, please wait...</div>
    </div>
  );
};

export default Redirect;
