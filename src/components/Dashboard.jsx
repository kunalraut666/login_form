import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; //

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const fullName = location.state?.fullName || "User";

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("token");
    toast.success("Logged out successfully! 👋");

    setTimeout(() => {
      navigate("/");
    },2000);
  };

  return (
    <motion.div
    initial={{ opacity: 0 }}  // Starting state (transparent)
    animate={{ opacity: 1 }}   // Animate to fully visible (opaque)
    exit={{ opacity: 0 }}      // When leaving, fade out
    transition={{ duration: 1, ease: "easeOut" }}  // Smooth fade-in transition
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        padding: "1rem",
        background: "linear-gradient(to bottom right, #fdf6e3, #d0f0fd)",
      }}
    >
      {/* Logout button top right */}
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#ff4d4f",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: isLoggingOut ? "not-allowed" : "pointer",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <div
            style={{
              border: "2px solid #fff",
              borderTop: "2px solid transparent",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              animation: "spin 1s linear infinite",
            }}
          />
        ) : (
          "Logout"
        )}
      </button>

      {/* Centered heading */}
      <div style={{ textAlign: "center", marginTop: "14rem" }}>
        <h1>Welcome to Dashboard! <br /> {fullName}!</h1>
      </div>

      {/* Keyframes for spinner */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </motion.div>
  );
}
