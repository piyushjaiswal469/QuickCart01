import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; // 1. Import Link
import "../css/LoginModal.css";

const API_BASE_URL = "http://localhost:5000/api/auth";

export default function LoginModal({
  open = true,
  onClose = () => {},
  onLoginSuccess,
}) {
  const [step, setStep] = useState("PHONE");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Timer State for Resend OTP
  const [timer, setTimer] = useState(0);

  // New Error State
  const [error, setError] = useState("");
  
  const inputRef = useRef(null);

  // --- Reset state whenever 'open' becomes true ---
  useEffect(() => {
    if (open) {
      setStep("PHONE");
      setMobile("");
      setOtp("");
      setError("");
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // --- Timer Logic ---
  useEffect(() => {
    let interval;
    if (step === "OTP" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!open) return null;

  // --- Logic to Disable Button ---
  const isBtnDisabled = 
    loading || 
    (step === "PHONE" && mobile.length !== 10) || 
    (step === "OTP" && otp.length !== 4);

  // --- Helper to Send OTP ---
  const sendOtpApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: mobile }),
      });
      const data = await res.json();
      
      if (data.success) {
        setStep("OTP");
        setOtp("");
        setError("");
        setTimer(30); // Start/Reset 30s timer
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Something went wrong. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    setError("");

    if (step === "PHONE") {
      await sendOtpApi();
    } else {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: mobile, otp }),
        });
        const data = await res.json();

        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          if (onLoginSuccess) onLoginSuccess(data.user);

          setStep("PHONE");
        } else {
          setError("Invalid OTP. Please try again.");
        }
      } catch (err) {
        setError("Something went wrong. Please check your internet.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    await sendOtpApi();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isBtnDisabled) {
      handleContinue();
    }
  };

  const handleInputChange = (e) => {
    setError("");
    const val = e.target.value.replace(/\D/g, "");
    if (step === "PHONE") setMobile(val);
    else setOtp(val);
  };

  return (
    <div className="login-overlay" onMouseDown={onClose}>
      <div className="login-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="content">
          <div className="logo-container">
            <div className="quickcart-logo">
              <span className="quick">Quick</span>
              <span className="cart">Cart</span>
            </div>
          </div>
          <h1 className="tagline">
            {step === "PHONE" ? "India's last minute app" : "Verify Details"}
          </h1>
          <p className="prompt-text">
            {step === "PHONE"
              ? "Log in or Sign up"
              : `OTP sent to +91 ${mobile}`}
          </p>

          <div className="input-container">
            {step === "PHONE" && <span className="country-code">+91</span>}
            <input
              ref={inputRef}
              className={`mobile-input ${error ? "input-error" : ""}`}
              placeholder={step === "PHONE" ? "Enter mobile number" : "X X X X"}
              maxLength={step === "PHONE" ? 10 : 4}
              value={step === "PHONE" ? mobile : otp}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              style={
                step === "OTP"
                  ? {
                      textAlign: "center",
                      letterSpacing: "8px",
                    }
                  : {}
              }
            />
          </div>

          {error && <div className="login-error-msg">{error}</div>}

          <button
            className="continue-button"
            onClick={handleContinue}
            disabled={isBtnDisabled}
          >
            {loading ? "Please Wait..." : "Continue"}
          </button>

          {step === "OTP" && (
            <div style={{ marginTop: "15px" }}>
              <p style={{ fontSize: "13px", color: "#666", marginBottom: "5px" }}>
                Didn't receive code?{" "}
                {timer > 0 ? (
                  <span style={{ fontWeight: "bold", color: "#999" }}>
                    Resend in {timer}s
                  </span>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    style={{
                      border: "none",
                      background: "none",
                      color: "#16a34a",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Resend OTP
                  </button>
                )}
              </p>

              <button
                onClick={() => {
                  setStep("PHONE"); 
                  setOtp("");
                  setError("");
                }}
                className="back-link"
              >
                Change Phone Number
              </button>
            </div>
          )}

          {/* 2. Terms & Privacy Footer */}
          <div className="footer">
            <p className="terms-textt">
              By continuing, you agree to our{" "}
              <a href="/terms" onClick={onClose}>Terms of Service</a> &{" "}
              <a href="/privacy" onClick={onClose}>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}