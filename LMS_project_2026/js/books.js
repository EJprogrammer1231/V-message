/* ==================== 
   Books Management JavaScript
   Book-related functions and utilities
   ==================== */

// Book management class
class BookManager {
  static getAllBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
  }
  
  static getBooksByCategory(category) {
    const books = this.getAllBooks();
    return category ? books.filter(b => b.category === category) : books;
  }
  
  static getBooksByField(field) {
    const books = this.getAllBooks();
    return books.filter(b => b.category === field);
  }
  
  static searchBooks(query) {
    const books = this.getAllBooks();
    const lowerQuery = query.toLowerCase();
    
    return books.filter(book => 
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.isbn.includes(lowerQuery)
    );
  }
  
  static getAvailableBooks() {
    const books = this.getAllBooks();
    return books.filter(b => b.available > 0);
  }
  
  static getBooksByAuthor(author) {
    const books = this.getAllBooks();
    return books.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  }
  
  static sortBooks(books, sortBy = 'newest') {
    const sorted = [...books];
    
    switch(sortBy) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'author':
        sorted.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        sorted.sort((a, b) => b.available - a.available);
        break;
      case 'newest':
      default:
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    return sorted;
  }
  
  static addBook(bookData) {
    const books = this.getAllBooks();
    const newBook = {
      id: Date.now(),
      ...bookData,
      createdAt: new Date().toISOString()
    };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    return newBook;
  }
  
  static updateBook(bookId, updates) {
    let books = this.getAllBooks();
    const index = books.findIndex(b => b.id === bookId);
    
    if (index !== -1) {
      books[index] = { ...books[index], ...updates };
      localStorage.setItem('books', JSON.stringify(books));
      return books[index];
    }
    
    return null;
  }
  
  static deleteBook(bookId) {
    let books = this.getAllBooks();
    books = books.filter(b => b.id !== bookId);
    localStorage.setItem('books', JSON.stringify(books));
    return true;
  }
  
  static getBookStats() {
    const books = this.getAllBooks();
    
    return {
      total: books.length,
      available: books.filter(b => b.available > 0).length,
      unavailable: books.filter(b => b.available === 0).length,
      totalCopies: books.reduce((sum, b) => sum + b.total, 0),
      availableCopies: books.reduce((sum, b) => sum + b.available, 0),
      borrowedCopies: books.reduce((sum, b) => sum + (b.total - b.available), 0),
      averageRating: (books.reduce((sum, b) => sum + (b.rating || 0), 0) / books.length).toFixed(2)
    };
  }
}

// Book borrowing system
class BorrowingSystem {
  static BORROW_DURATION = 14; // days
  static LATE_FEE_PER_DAY = 0.5; // dollars
  
  static borrowBook(userId, bookId) {
    const user = this.getUserById(userId);
    const book = BookManager.getAllBooks().find(b => b.id === bookId);
    
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    
    if (!book) {
      return { success: false, message: 'Book not found' };
    }
    
    if (book.available === 0) {
      return { success: false, message: 'Book not available' };
    }
    
    if (!user.borrowedBooks) {
      user.borrowedBooks = [];
    }
    
    if (user.borrowedBooks.some(b => b.bookId === bookId)) {
      return { success: false, message: 'User has already borrowed this book' };
    }
    
    const borrowRecord = {
      bookId,
      borrowedAt: new Date().toISOString(),
      dueDate: this.calculateDueDate(),
      returned: false,
      renewals: 0
    };
    
    user.borrowedBooks.push(borrowRecord);
    
    // Update book availability
    BookManager.updateBook(bookId, { available: book.available - 1 });
    
    // Update user
    this.updateUser(userId, user);
    
    // Log activity
    ActivityLog.logBookBorrow(userId, bookId);
    
    return { success: true, message: 'Book borrowed successfully' };
  }
  
  static returnBook(userId, bookId) {
    const user = this.getUserById(userId);
    const book = BookManager.getAllBooks().find(b => b.id === bookId);
    
    if (!user || !book) {
      return { success: false, message: 'Invalid user or book' };
    }
    
    if (!user.borrowedBooks) {
      return { success: false, message: 'No borrowed books' };
    }
    
    const borrowIndex = user.borrowedBooks.findIndex(b => b.bookId === bookId && !b.returned);
    
    if (borrowIndex === -1) {
      return { success: false, message: 'This book is not borrowed by this user' };
    }
    
    const borrowRecord = user.borrowedBooks[borrowIndex];
    const isLate = new Date() > new Date(borrowRecord.dueDate);
    const lateFee = isLate ? this.calculateLateFee(borrowRecord.dueDate) : 0;
    
    borrowRecord.returned = true;
    borrowRecord.returnedAt = new Date().toISOString();
    borrowRecord.lateFee = lateFee;
    borrowRecord.isLate = isLate;
    
    // Update book availability
    BookManager.updateBook(bookId, { available: book.available + 1 });
    
    // Update user
    this.updateUser(userId, user);
    
    return {
      success: true,
      message: 'Book returned successfully',
      lateFee: lateFee,
      isLate: isLate
    };
  }
  
  static renewBook(userId, bookId) {
    const user = this.getUserById(userId);
    
    if (!user || !user.borrowedBooks) {
      return { success: false, message: 'Invalid user' };
    }
    
    const borrowRecord = user.borrowedBooks.find(b => b.bookId === bookId && !b.returned);
    
    if (!borrowRecord) {
      return { success: false, message: 'Book not found in borrowing history' };
    }
    
    if (borrowRecord.renewals >= 2) {
      return { success: false, message: 'Maximum renewals reached' };
    }
    
    borrowRecord.renewals++;
    borrowRecord.dueDate = this.calculateDueDate(new Date(borrowRecord.dueDate));
    
    this.updateUser(userId, user);
    
    return {
      success: true,
      message: 'Book renewed successfully',
      newDueDate: borrowRecord.dueDate
    };
  }
  
  static calculateDueDate(fromDate = null) {
    const from = fromDate || new Date();
    const due = new Date(from);
    due.setDate(due.getDate() + this.BORROW_DURATION);
    return due.toISOString();
  }
  
  static calculateLateFee(dueDate) {
    const due = new Date(dueDate);
    const now = new Date();
    const daysLate = Math.ceil((now - due) / (1000 * 60 * 60 * 24));
    
    return daysLate > 0 ? daysLate * this.LATE_FEE_PER_DAY : 0;
  }
  
  static checkOverdueBooks(userId) {
    const user = this.getUserById(userId);
    
    if (!user || !user.borrowedBooks) {
      return [];
    }
    
    return user.borrowedBooks.filter(b => 
      !b.returned && new Date() > new Date(b.dueDate)
    ).map(b => ({
      ...b,
      lateFee: this.calculateLateFee(b.dueDate),
      daysOverdue: Math.ceil((new Date() - new Date(b.dueDate)) / (1000 * 60 * 60 * 24))
    }));
  }
  
  static getUserById(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(u => u.id === userId);
  }
  
  static updateUser(userId, userData) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const index = users.findIndex(u => u.id === userId);
    
    if (index !== -1) {
      users[index] = userData;
      localStorage.setItem('users', JSON.stringify(users));
      
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const current = JSON.parse(currentUser);
        if (current.id === userId) {
          localStorage.setItem('currentUser', JSON.stringify(userData));
        }
      }
    }
  }
}

// Book recommendations
class BookRecommendation {
  static getRecommendedBooks(userId) {
    const user = BorrowingSystem.getUserById(userId);
    if (!user) return [];
    
    const books = BookManager.getBooksByField(user.field);
    const borrowed = user.borrowedBooks?.map(b => b.bookId) || [];
    
    // Get books in same field that user hasn't borrowed
    return books.filter(b => !borrowed.includes(b.id))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }
  
  static getSimilarBooks(bookId) {
    const books = BookManager.getAllBooks();
    const book = books.find(b => b.id === bookId);
    
    if (!book) return [];
    
    return books.filter(b => 
      b.category === book.category && 
      b.id !== bookId
    ).slice(0, 5);
  }
  
  static getTrendingBooks() {
    const books = BookManager.getAllBooks();
    
    // Books that are most borrowed (least available relative to total)
    return books
      .filter(b => b.available === 0)
      .sort((a, b) => (b.total - b.available) - (a.total - a.available))
      .slice(0, 5);
  }
  
  static getNewReleases(days = 30) {
    const books = BookManager.getAllBooks();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return books.filter(b => new Date(b.createdAt) > cutoffDate)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

// Reserve system
class ReserveSystem {
  static reserveBook(userId, bookId) {
    let reserves = JSON.parse(localStorage.getItem('bookReserves')) || [];
    
    // Check if user already reserved this
    if (reserves.some(r => r.userId === userId && r.bookId === bookId)) {
      return { success: false, message: 'Already reserved' };
    }
    
    reserves.push({
      id: Date.now(),
      userId,
      bookId,
      reservedAt: new Date().toISOString(),
      status: 'active'
    });
    
    localStorage.setItem('bookReserves', JSON.stringify(reserves));
    
    return { success: true, message: 'Book reserved successfully' };
  }
  
  static cancelReservation(reserveId) {
    let reserves = JSON.parse(localStorage.getItem('bookReserves')) || [];
    reserves = reserves.filter(r => r.id !== reserveId);
    localStorage.setItem('bookReserves', JSON.stringify(reserves));
    
    return true;
  }
  
  static getReservationQueue(bookId) {
    const reserves = JSON.parse(localStorage.getItem('bookReserves')) || [];
    return reserves
      .filter(r => r.bookId === bookId && r.status === 'active')
      .sort((a, b) => new Date(a.reservedAt) - new Date(b.reservedAt));
  }
}

// Book ratings and reviews
class BookRating {
  static rateBook(userId, bookId, rating, review = '') {
    let ratings = JSON.parse(localStorage.getItem('bookRatings')) || [];
    
    // Check if user already rated
    const existingIndex = ratings.findIndex(r => r.userId === userId && r.bookId === bookId);
    
    const ratingRecord = {
      userId,
      bookId,
      rating: Math.min(5, Math.max(1, rating)),
      review: review || '',
      ratedAt: new Date().toISOString()
    };
    
    if (existingIndex !== -1) {
      ratings[existingIndex] = ratingRecord;
    } else {
      ratings.push(ratingRecord);
    }
    
    localStorage.setItem('bookRatings', JSON.stringify(ratings));
    
    // Update book average rating
    this.updateBookRating(bookId);
    
    return { success: true, message: 'Rating saved successfully' };
  }
  
  static getBookRatings(bookId) {
    const ratings = JSON.parse(localStorage.getItem('bookRatings')) || [];
    return ratings.filter(r => r.bookId === bookId);
  }
  
  static updateBookRating(bookId) {
    const ratings = this.getBookRatings(bookId);
    
    if (ratings.length === 0) return;
    
    const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    BookManager.updateBook(bookId, { rating: parseFloat(avgRating.toFixed(1)) });
  }
  
  static getUserRating(userId, bookId) {
    const ratings = JSON.parse(localStorage.getItem('bookRatings')) || [];
    return ratings.find(r => r.userId === userId && r.bookId === bookId);
  }
}

// Initialize sample data if needed
if (!localStorage.getItem('bookRatings')) {
  localStorage.setItem('bookRatings', JSON.stringify([]));
}

if (!localStorage.getItem('bookReserves')) {
  localStorage.setItem('bookReserves', JSON.stringify([]));
}
