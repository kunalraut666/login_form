import { useNavigate, useLocation} from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const fullName = location.state?.fullName || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw", // fix yahan
        minHeight: "100vh",
        padding: "1rem",
        background: "linear-gradient(to bottom right, #fdf6e3, #d0f0fd)", // optional, just to match your screenshot
      }}
    >
      {/* Logout button left top corner */}
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem", // yeh add karna important tha
          padding: "0.5rem 1rem",
          backgroundColor: "#ff4d4f",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>

      {/* Centered heading */}
      <div style={{ textAlign: "center", marginTop: "14rem" }}>
        <h1>Welcome to Dashboard! <br/> {fullName}!</h1>
      </div>
    </div>
  );
}
