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
      // Store the current page URL to redirect back after login
      localStorage.setItem("redirectAfterLogin", window.location.href);
      
      // Calculate path to login.html (this might be different for nested pages)
      let loginPath = "login.html";
      if (window.location.pathname.includes("/link/")) {
          // If we're in a movie watch page (moviecard/hero/link/m*.html)
          // We are 4 levels deep from root in the typical setup
          // e.g. /project-mj/moviecard/thor/link/m3.html
          loginPath = "../../../../login.html";
      }
      
      window.location.href = loginPath;
      return false;
    }
    return true;
  }
}

// Create global auth instance
const auth = new AuthSystem();

// Handle "Watch Now" click across all pages
document.addEventListener("DOMContentLoaded", function () {
  console.log("Auth system loaded. Path:", window.location.pathname);
  
  // Find all links on the page
  const links = document.querySelectorAll("a");
  
  links.forEach(link => {
    // Check if the link text is "Watch Now" (case-insensitive)
    if (link.textContent.trim().toLowerCase() === "watch now") {
      link.addEventListener("click", function (e) {
        console.log("Watch Now clicked. Authenticated:", auth.isAuthenticated);
        if (!auth.isAuthenticated) {
          e.preventDefault(); // Prevent opening the movie link
          auth.requireAuth(); // Redirect to login
        }
      });
    }
  });
});
