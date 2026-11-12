
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-container">

        <div className="caution-tape">
          <p>404 Page Not Found</p>
        </div>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>

        <p className="problem-text">
          Oops. Something went wrong.
        </p>

      </div>
    </div>
  );
};

export default NotFound;
