// Authentication System for Marvel Studio

class AuthSystem {
  constructor() {
    this.isAuthenticated = this.checkAuthStatus();
  }

  // Check if user is authenticated
  checkAuthStatus() {
    return localStorage.getItem("marvelAuth") === "true";
  }

  // Set authentication status
  setAuthStatus(status) {
    localStorage.setItem("marvelAuth", status.toString());
    this.isAuthenticated = status;
  }

  // Login user
  login(username, password) {
    // For demo purposes, accept any credentials
    // In production, this would validate against a backend
    this.setAuthStatus(true);
    localStorage.setItem("marvelUser", username);
    return true;
  }

  // Logout user
  logout() {
    this.setAuthStatus(false);
    localStorage.removeItem("marvelUser");
  }

  // Get current user
  getCurrentUser() {
    return localStorage.getItem("marvelUser");
  }

  // Redirect to login if not authenticated
  requireAuth() {
    if (!this.isAuthenticated) {
      window.location.href = "login.html";
      return false;
    }
    return true;
  }
}

// Create global auth instance
const auth = new AuthSystem();

// Auto-redirect on page load if not authenticated
document.addEventListener("DOMContentLoaded", function () {
  // Only check auth for protected pages (not login/signup pages)
  if (
    !window.location.pathname.includes("login.html") &&
    !window.location.pathname.includes("signup.html")
  ) {
    auth.requireAuth();
  }
});
