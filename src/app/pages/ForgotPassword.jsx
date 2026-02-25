import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, ArrowLeft, AlertCircle, CheckCircle, Lock } from "lucide-react";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  // Start countdown when OTP is sent
  React.useEffect(() => {
    if (step === "otp" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate sending OTP
    setTimeout(() => {
      if (email) {
        setStep("otp");
        setTimer(300); // Reset timer
        setCanResend(false);
      } else {
        setError("Please enter your email address");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const otpCode = otp.join("");
    // Simulate OTP verification
    setTimeout(() => {
      if (otpCode.length === 6) {
        // Mock successful verification
        setStep("reset");
      } else {
        setError("Please enter the complete 6-digit OTP");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimer(200);
    setCanResend(false);
    setError("");
    // Simulate resending OTP
    alert("OTP has been resent to your email");
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate password reset
    setTimeout(() => {
      setStep("success");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C3002F] rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
          <p className="text-gray-600 mt-2">
            {step === "email" && "Enter your email to receive OTP"}
            {step === "otp" && "Enter the 6-digit code sent to your email"}
            {step === "reset" && "Create a new password"}
            {step === "success" && "Password successfully reset"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Step 1: Email Input */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@nissan.com"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F] focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#C3002F] text-white rounded-lg font-medium hover:bg-[#A00027] transition-colors disabled:opacity-50"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === "otp" && (
            <form onSubmit={handleOtpVerify} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Enter 6-Digit OTP
                </label>
                <div className="flex justify-center gap-2 mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3002F] focus:border-transparent"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-center">
                  OTP sent to: <span className="font-medium">{email}</span>
                </p>
              </div>

              <div className="text-center text-sm">
                {timer > 0 ? (
                  <p className="text-gray-600">
                    OTP expires in:{" "}
                    <span className="font-bold text-[#C3002F]">
                      {formatTime(timer)}
                    </span>
                  </p>
                ) : (
                  <p className="text-red-600 font-medium">OTP has expired</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || timer === 0}
                className="w-full py-3 bg-[#C3002F] text-white rounded-lg font-medium hover:bg-[#A00027] transition-colors disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResend}
                className="w-full py-2 text-sm text-[#C3002F] hover:text-[#A00027] font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {canResend
                  ? "Resend OTP"
                  : "Resend available after timer expires"}
              </button>
            </form>
          )}

          {/* Step 3: Reset Password */}
          {step === "reset" && (
            <form onSubmit={handlePasswordReset} className="space-y-5">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F] focus:border-transparent"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C3002F] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#C3002F] text-white rounded-lg font-medium hover:bg-[#A00027] transition-colors disabled:opacity-50"
              >
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          )}

          {/* Step 4: Success */}
          {step === "success" && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Password Reset Successful!
                </h3>
                <p className="text-gray-600">
                  You can now login with your new password
                </p>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 bg-[#C3002F] text-white rounded-lg font-medium hover:bg-[#A00027] transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}

          {/* Back to Login (for email and OTP steps) */}
          {(step === "email" || step === "otp") && (
            <button
              onClick={() => navigate("/login")}
              className="w-full mt-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
