/* ==================== 
   Authentication JavaScript
   User login and registration handling
   ==================== */

// Check if user is already logged in
window.addEventListener('load', function() {
  const currentUser = localStorage.getItem('currentUser');
  
  // Redirect logged-in users away from auth pages
  const currentPage = window.location.pathname;
  
  if (currentUser && (currentPage.includes('login.html') || currentPage.includes('register.html'))) {
    const user = JSON.parse(currentUser);
    if (user.role === 'admin') {
      window.location.href = 'admin/dashboard.html';
    } else {
      window.location.href = 'user/dashboard.html';
    }
  }
});

// Session management
class AuthManager {
  static SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  static sessionTimeout;
  
  static startSession() {
    this.resetSessionTimeout();
    document.addEventListener('mousemove', () => this.resetSessionTimeout());
    document.addEventListener('keypress', () => this.resetSessionTimeout());
  }
  
  static resetSessionTimeout() {
    clearTimeout(this.sessionTimeout);
    this.sessionTimeout = setTimeout(() => {
      this.logoutDueToInactivity();
    }, this.SESSION_TIMEOUT);
  }
  
  static logoutDueToInactivity() {
    localStorage.removeItem('currentUser');
    alert('Your session has expired. Please login again.');
    window.location.href = '../login.html';
  }
  
  static validatePassword(password) {
    // At least 6 characters
    if (password.length < 6) {
      return {
        valid: false,
        message: 'Password must be at least 6 characters long'
      };
    }
    
    // Additional security checks can be added here
    return {
      valid: true,
      message: 'Password is valid'
    };
  }
  
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        valid: false,
        message: 'Invalid email address'
      };
    }
    
    return {
      valid: true,
      message: 'Email is valid'
    };
  }
}

// Start session if user is logged in
if (localStorage.getItem('currentUser')) {
  AuthManager.startSession();
}

// Protected route guard
function protectedRoute(requiredRole = 'user') {
  const currentUser = localStorage.getItem('currentUser');
  
  if (!currentUser) {
    window.location.href = '../login.html';
    return false;
  }
  
  const user = JSON.parse(currentUser);
  
  if (requiredRole && user.role !== requiredRole && requiredRole !== 'any') {
    if (user.role === 'admin') {
      window.location.href = '../admin/dashboard.html';
    } else {
      window.location.href = '../user/dashboard.html';
    }
    return false;
  }
  
  return true;
}

// User profile management
class UserProfile {
  static getProfile(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(u => u.id === userId);
  }
  
  static updateProfile(userId, updates) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('users', JSON.stringify(users));
      
      // Update current user if it's the logged-in user
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const current = JSON.parse(currentUser);
        if (current.id === userId) {
          localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        }
      }
      
      return true;
    }
    
    return false;
  }
  
  static deleteProfile(userId) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
  
  static changePassword(userId, currentPassword, newPassword) {
    const user = this.getProfile(userId);
    
    if (!user || user.password !== currentPassword) {
      return {
        success: false,
        message: 'Current password is incorrect'
      };
    }
    
    const validation = AuthManager.validatePassword(newPassword);
    if (!validation.valid) {
      return {
        success: false,
        message: validation.message
      };
    }
    
    this.updateProfile(userId, { password: newPassword });
    
    return {
      success: true,
      message: 'Password changed successfully'
    };
  }
}

// Login validation
function validateLoginForm(email, password) {
  const errors = [];
  
  if (!email) {
    errors.push('Email is required');
  } else {
    const emailValidation = AuthManager.validateEmail(email);
    if (!emailValidation.valid) {
      errors.push(emailValidation.message);
    }
  }
  
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}

// Register validation
function validateRegisterForm(fullname, email, field, password, confirmPassword) {
  const errors = [];
  
  if (!fullname) {
    errors.push('Full name is required');
  } else if (fullname.length < 3) {
    errors.push('Full name must be at least 3 characters');
  }
  
  if (!email) {
    errors.push('Email is required');
  } else {
    const emailValidation = AuthManager.validateEmail(email);
    if (!emailValidation.valid) {
      errors.push(emailValidation.message);
    }
  }
  
  if (!field) {
    errors.push('Field of study is required');
  }
  
  if (!password) {
    errors.push('Password is required');
  } else {
    const passwordValidation = AuthManager.validatePassword(password);
    if (!passwordValidation.valid) {
      errors.push(passwordValidation.message);
    }
  }
  
  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}

// OAuth-like functionality (for future implementation)
class SocialAuth {
  static googleLogin() {
    // Placeholder for Google OAuth
    console.log('Google login not implemented');
  }
  
  static facebookLogin() {
    // Placeholder for Facebook OAuth
    console.log('Facebook login not implemented');
  }
  
  static githubLogin() {
    // Placeholder for GitHub OAuth
    console.log('GitHub login not implemented');
  }
}

// Two-factor authentication placeholder
class TwoFactorAuth {
  static requiresTwoFactor(userId) {
    // Placeholder for checking if user has 2FA enabled
    return false;
  }
  
  static sendCode(email) {
    // Placeholder for sending 2FA code
    console.log('2FA code would be sent to:', email);
  }
  
  static verifyCode(code) {
    // Placeholder for verifying 2FA code
    return code === '123456'; // Demo code
  }
}

// Email verification
class EmailVerification {
  static sendVerificationEmail(email) {
    // Placeholder for sending verification email
    console.log('Verification email would be sent to:', email);
    return true;
  }
  
  static verifyEmail(token) {
    // Placeholder for verifying email token
    return true;
  }
  
  static isEmailVerified(userId) {
    // Placeholder for checking if email is verified
    return true;
  }
}

// Account recovery
class AccountRecovery {
  static initiatePasswordReset(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return {
        success: false,
        message: 'Email not found'
      };
    }
    
    // In a real app, send reset link via email
    console.log('Password reset email would be sent to:', email);
    
    return {
      success: true,
      message: 'Check your email for reset instructions'
    };
  }
  
  static resetPassword(token, newPassword) {
    // Placeholder for resetting password with token
    console.log('Password reset with token:', token);
    return true;
  }
}

// Activity logging
class ActivityLog {
  static logLogin(userId) {
    let logs = JSON.parse(localStorage.getItem('activityLogs')) || [];
    logs.push({
      userId,
      action: 'login',
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('activityLogs', JSON.stringify(logs));
  }
  
  static logLogout(userId) {
    let logs = JSON.parse(localStorage.getItem('activityLogs')) || [];
    logs.push({
      userId,
      action: 'logout',
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('activityLogs', JSON.stringify(logs));
  }
  
  static logBookBorrow(userId, bookId) {
    let logs = JSON.parse(localStorage.getItem('activityLogs')) || [];
    logs.push({
      userId,
      action: 'borrow_book',
      bookId,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('activityLogs', JSON.stringify(logs));
  }
  
  static getActivityLog(userId) {
    const logs = JSON.parse(localStorage.getItem('activityLogs')) || [];
    return logs.filter(log => log.userId === userId);
  }
}
