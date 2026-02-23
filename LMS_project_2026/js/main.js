/* ==================== 
   Main JavaScript
   Global functions and utilities
   ==================== */

/* ==================== THEME TOGGLE ==================== */
class ThemeManager {
  static STORAGE_KEY = 'lms-theme-preference';
  
  static init() {
    // Load saved theme preference
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    this.setTheme(theme);
    this.setupToggleButton();
  }
  
  static setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      localStorage.setItem(this.STORAGE_KEY, 'dark');
      this.updateToggleButton('☀️');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem(this.STORAGE_KEY, 'light');
      this.updateToggleButton('🌙');
    }
  }
  
  static toggleTheme() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    this.setTheme(isDarkMode ? 'light' : 'dark');
  }
  
  static updateToggleButton(icon) {
    const button = document.getElementById('themeToggle');
    if (button) {
      button.textContent = icon;
    }
  }
  
  static setupToggleButton() {
    const button = document.getElementById('themeToggle');
    if (button) {
      button.addEventListener('click', () => this.toggleTheme());
    }
  }
}

// Initialize theme on page load
window.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
  hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickInsideHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideMenu && !isClickInsideHamburger) {
      navMenu.classList.remove('active');
    }
  });
}

// Initialize sample data on first load
function initializeSampleData() {
  // Sample books data
  const sampleBooks = [
    {
      id: 1,
      title: 'JavaScript: The Good Parts',
      author: 'Douglas Crockford',
      isbn: '978-0596517748',
      category: 'IT',
      total: 15,
      available: 12,
      rating: 4.5,
      description: 'Master JavaScript fundamentals'
    },
    {
      id: 2,
      title: 'Python for Data Analysis',
      author: 'Wes McKinney',
      isbn: '978-1491957660',
      category: 'IT',
      total: 10,
      available: 8,
      rating: 4.7,
      description: 'Data manipulation with Python and Pandas'
    },
    {
      id: 3,
      title: 'Introduction to Algorithms',
      author: 'Cormen, Leiserson, Rivest, Stein',
      isbn: '978-0262033848',
      category: 'IT',
      total: 12,
      available: 10,
      rating: 4.8,
      description: 'Comprehensive algorithms and data structures'
    },
    {
      id: 4,
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '978-0553380163',
      category: 'Science',
      total: 8,
      available: 6,
      rating: 4.6,
      description: 'Journey through space and time'
    },
    {
      id: 5,
      title: 'The Universe in a Nutshell',
      author: 'Stephen Hawking',
      isbn: '978-0553802023',
      category: 'Science',
      total: 7,
      available: 5,
      rating: 4.5,
      description: 'Modern astrophysics explained'
    },
    {
      id: 6,
      title: 'Engineering Mechanics',
      author: 'J.L. Meriam',
      isbn: '978-1118885840',
      category: 'Engineering',
      total: 10,
      available: 8,
      rating: 4.4,
      description: 'Fundamental principles of mechanics'
    },
    {
      id: 7,
      title: 'Business Strategy',
      author: 'Michael E. Porter',
      isbn: '978-0684801933',
      category: 'Business',
      total: 6,
      available: 4,
      rating: 4.7,
      description: 'Competitive strategies for business'
    },
    {
      id: 8,
      title: 'Human Anatomy',
      author: 'Henry Gray',
      isbn: '978-0323393577',
      category: 'Medical',
      total: 9,
      available: 7,
      rating: 4.8,
      description: 'Comprehensive guide to human body'
    }
  ];

  // Sample admin user
  const sampleAdmin = {
    id: 999,
    fullname: 'Admin User',
    email: 'admin@lms.com',
    password: 'admin123',
    field: 'Admin',
    role: 'admin',
    createdAt: new Date().toISOString(),
    borrowedBooks: [],
    favBooks: []
  };

  // Initialize data only if not already present
  if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify(sampleBooks));
  }

  if (!localStorage.getItem('users')) {
    let users = [sampleAdmin];
    localStorage.setItem('users', JSON.stringify(users));
  }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initializeSampleData);

// Alert function
function showAlert(message, type = 'info') {
  const alertContainer = document.getElementById('alertContainer');
  if (alertContainer) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
    
    setTimeout(() => alert.remove(), 3000);
  }
}

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
  }
}

function closeModal(modalId = 'bookModal') {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
  }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
  const modal = document.getElementById('bookModal');
  if (modal && event.target === modal) {
    closeModal();
  }
});

// Format date function
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Format time function
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Get user by ID
function getUserById(userId) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find(u => u.id === userId);
}

// Get book by ID
function getBookById(bookId) {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  return books.find(b => b.id === bookId);
}

// Update book availability
function updateBookAvailability(bookId, changeBy) {
  let books = JSON.parse(localStorage.getItem('books')) || [];
  const book = books.find(b => b.id === bookId);
  
  if (book) {
    book.available += changeBy;
    localStorage.setItem('books', JSON.stringify(books));
    return true;
  }
  return false;
}

// Check if user is logged in
function isUserLoggedIn() {
  return localStorage.getItem('currentUser') !== null;
}

// Get current logged in user
function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

// Logout function
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = '../index.html';
}

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Search functionality
function searchBooks() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const currentUser = getCurrentUser();
  
  if (!currentUser) return;
  
  const filteredBooks = books.filter(book => {
    return (book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm)) &&
           book.category === currentUser.field;
  });
  
  displayBooks(filteredBooks);
}

// Filter books
function filterBooks() {
  const categoryFilter = document.getElementById('categoryFilter').value;
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const currentUser = getCurrentUser();
  
  if (!currentUser) return;
  
  let filtered = books.filter(book => {
    const matchesCategory = !categoryFilter || book.category === categoryFilter;
    const matchesField = book.category === currentUser.field || categoryFilter;
    return matchesCategory && matchesField;
  });
  
  displayBooks(filtered);
}

// Sort books
function sortBooks() {
  const sortFilter = document.getElementById('sortFilter').value;
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const currentUser = getCurrentUser();
  
  if (!currentUser) return;
  
  let filtered = books.filter(b => b.category === currentUser.field);
  
  if (sortFilter === 'popular') {
    filtered.sort((a, b) => b.available - a.available);
  } else if (sortFilter === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortFilter === 'newest') {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  
  displayBooks(filtered);
}

// Display books
function displayBooks(books) {
  const booksGrid = document.getElementById('booksGrid');
  if (!booksGrid) return;
  
  const currentUser = getCurrentUser();
  
  if (books.length === 0) {
    booksGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">📚</div>
        <div class="empty-title">No Books Found</div>
        <div class="empty-message">Try adjusting your search or filter</div>
      </div>
    `;
    return;
  }
  
  booksGrid.innerHTML = books.map(book => {
    const isBorrowed = currentUser?.borrowedBooks?.some(b => b.bookId === book.id);
    const isFavorite = currentUser?.favBooks?.some(b => b.id === book.id);
    
    return `
      <div class="book-card">
        <div class="book-cover">${book.title.charAt(0)}</div>
        <div class="book-info">
          <div class="book-title">${book.title}</div>
          <div class="book-author">by ${book.author}</div>
          <div class="book-category">${book.category}</div>
          <div class="book-rating">⭐ ${book.rating || 4.5}</div>
          <div style="color: #666; font-size: 12px; margin-bottom: 10px;">
            Available: ${book.available}/${book.total}
          </div>
          <div class="book-actions">
            <button class="btn btn-primary btn-small" 
              onclick="borrowBook(${book.id})" 
              ${book.available === 0 || isBorrowed ? 'disabled' : ''}>
              ${isBorrowed ? '✓ Borrowed' : 'Borrow'}
            </button>
            <button class="btn btn-secondary btn-small" 
              onclick="toggleFavorite(${book.id})"
              style="background-color: ${isFavorite ? 'var(--primary-color)' : 'var(--light-color)'}; color: ${isFavorite ? 'white' : 'var(--text-color)'}">
              ${isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Borrow book
function borrowBook(bookId) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = '../login.html';
    return;
  }
  
  if (!currentUser.borrowedBooks) {
    currentUser.borrowedBooks = [];
  }
  
  const alreadyBorrowed = currentUser.borrowedBooks.some(b => b.bookId === bookId);
  if (alreadyBorrowed) {
    showAlert('You have already borrowed this book', 'error');
    return;
  }
  
  const book = getBookById(bookId);
  if (!book || book.available === 0) {
    showAlert('Book is not available', 'error');
    return;
  }
  
  // Add to borrowed books
  currentUser.borrowedBooks.push({
    bookId: bookId,
    borrowedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
  });
  
  // Update book availability
  book.available--;
  
  // Save changes
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let books = JSON.parse(localStorage.getItem('books')) || [];
  books = books.map(b => b.id === bookId ? book : b);
  localStorage.setItem('books', JSON.stringify(books));
  
  // Update users list
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users = users.map(u => u.id === currentUser.id ? currentUser : u);
  localStorage.setItem('users', JSON.stringify(users));
  
  showAlert('Book borrowed successfully! Return within 14 days.', 'success');
  loadBooks();
  updateStats();
}

// Toggle favorite
function toggleFavorite(bookId) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = '../login.html';
    return;
  }
  
  if (!currentUser.favBooks) {
    currentUser.favBooks = [];
  }
  
  const isFavorite = currentUser.favBooks.some(b => b.id === bookId);
  
  if (isFavorite) {
    currentUser.favBooks = currentUser.favBooks.filter(b => b.id !== bookId);
  } else {
    const book = getBookById(bookId);
    currentUser.favBooks.push(book);
  }
  
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users = users.map(u => u.id === currentUser.id ? currentUser : u);
  localStorage.setItem('users', JSON.stringify(users));
  
  loadBooks();
  updateStats();
}

// Load books function (will be called in dashboard)
function loadBooks() {
  const booksGrid = document.getElementById('booksGrid');
  if (!booksGrid) return;
  
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const currentUser = getCurrentUser();
  
  if (!currentUser) return;
  
  // Filter books by user's field
  const userBooks = books.filter(b => b.category === currentUser.field);
  displayBooks(userBooks);
}

// Load borrowed books
function loadBorrowedBooks() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  const tbody = document.getElementById('borrowedTableBody');
  const emptyBorrowed = document.getElementById('emptyBorrowed');
  
  if (!currentUser.borrowedBooks || currentUser.borrowedBooks.length === 0) {
    emptyBorrowed.classList.remove('hidden');
    tbody.innerHTML = '';
    return;
  }
  
  emptyBorrowed.classList.add('hidden');
  
  tbody.innerHTML = currentUser.borrowedBooks.map(borrowed => {
    const book = getBookById(borrowed.bookId);
    if (!book) return '';
    
    return `
      <tr>
        <td><strong>${book.title}</strong></td>
        <td>${book.author}</td>
        <td><span class="book-category">${book.category}</span></td>
        <td>${formatDate(borrowed.borrowedAt)}</td>
        <td>${formatDate(borrowed.dueDate)}</td>
        <td>
          <button class="btn btn-small btn-secondary" onclick="returnBook(${book.id})">Return</button>
        </td>
      </tr>
    `;
  }).join('');
}

// Return book
function returnBook(bookId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  if (!currentUser.borrowedBooks) {
    currentUser.borrowedBooks = [];
  }
  
  const borrowIndex = currentUser.borrowedBooks.findIndex(b => b.bookId === bookId);
  if (borrowIndex !== -1) {
    currentUser.borrowedBooks.splice(borrowIndex, 1);
    
    // Increase book availability
    let books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books.find(b => b.id === bookId);
    if (book) {
      book.available++;
      localStorage.setItem('books', JSON.stringify(books));
    }
    
    // Save user
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(u => u.id === currentUser.id ? currentUser : u);
    localStorage.setItem('users', JSON.stringify(users));
    
    showAlert('Book returned successfully!', 'success');
    loadBorrowedBooks();
    updateStats();
  }
}

// Update statistics
function updateStats() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  const borrowedCount = currentUser.borrowedBooks?.length || 0;
  const favCount = currentUser.favBooks?.length || 0;
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const userBooks = books.filter(b => b.category === currentUser.field);
  const availableCount = userBooks.reduce((sum, b) => sum + b.available, 0);
  
  const borrowedCountEl = document.getElementById('borrowedCount');
  const availableCountEl = document.getElementById('availableCount');
  const favCountEl = document.getElementById('favCount');
  
  if (borrowedCountEl) borrowedCountEl.textContent = borrowedCount;
  if (availableCountEl) availableCountEl.textContent = availableCount;
  if (favCountEl) favCountEl.textContent = favCount;
}

// Prevent form submission issues
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Prevent multiple submissions
      if (this.submitted) {
        e.preventDefault();
        return false;
      }
      this.submitted = true;
    });
  });
});
