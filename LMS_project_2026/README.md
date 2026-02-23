# 📚 Library Management System (LMS) - Frontend Website

A modern, responsive, and fully functional Library Management System website built with HTML, CSS, and JavaScript. The system includes features for both regular users and administrators, with a focus on ease of use and beautiful UI/UX design.

## ✨ Features

### **For Regular Users**
- 📖 **Browse & Search Books** - Find books by title, author, or category
- 🎯 **Field-Specific Recommendations** - See books related to your field of study
- 📚 **Borrow & Return Books** - Manage your book borrowing with a 14-day return policy
- ❤️ **Favorite Books** - Mark books as favorites for quick access
- 🎵 **Music Room** - Relaxing background music playlist while studying
- 👤 **User Profile** - Manage your account and borrowed books
- 📊 **Dashboard** - View statistics and borrowing history

### **For Administrators**
- 🏢 **System Overview** - View statistics and system health
- 📕 **Manage Books** - Add, edit, and delete books from the library
- 👥 **Manage Users** - View and manage user accounts
- 📋 **Borrow Requests** - Process and monitor book requests
- 📈 **Analytics** - Track library usage and popular books

## 🗂️ Project Structure

```
LMS_project_2026/
├── index.html                 # Landing page
├── login.html                 # User login page
├── register.html              # User registration page
│
├── user/
│   └── dashboard.html         # User dashboard with all features
│
├── admin/
│   └── dashboard.html         # Admin control panel
│
├── css/
│   ├── style.css              # Main styles (Color scheme: White, Black, Blue)
│   ├── responsive.css         # Mobile-first responsive design
│   └── components.css         # Component-specific styles
│
├── js/
│   ├── main.js                # Main functionality and utilities
│   ├── auth.js                # Authentication and session management
│   ├── books.js               # Book management and borrowing system
│   └── music.js               # Music player functionality
│
├── assets/
│   ├── images/                # Image assets (placeholder for future)
│   └── music/                 # Music files (placeholder for future)
│
├── data/
│   └── sample-data.json       # Sample data structure
│
└── README.md                  # This file
```

## 🎨 Color Theme

- **Primary Color**: Light Blue (#4a90e2)
- **Secondary Color**: White (#ffffff)
- **Dark Color**: Black (#1a1a1a)
- **Accents**: Gray shades for borders and backgrounds

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required (uses browser's localStorage)

### How to Run

1. **Extract/Open the project folder**
   - Navigate to `LMS_project_2026`

2. **Open in Browser**
   - Double-click `index.html` or right-click and select "Open with Browser"
   - Or use a local server: `python -m http.server` (Python 3)

3. **First Time Setup**
   - The system automatically initializes with sample data
   - An admin account is created automatically

## 👤 Default Accounts

### Admin Account
```
Email: admin@lms.com
Password: admin123
Role: Administrator
```

### Test User Account
- Create your own account through the registration page
- Select your field of study during registration
- You'll see books relevant to your field

## 📱 Responsive Design

The website is fully responsive and works on:
- 📱 **Mobile Devices** (320px - 480px)
- 📱 **Tablets** (481px - 768px)
- 💻 **Laptops** (769px - 1024px)
- 🖥️ **Desktops** (1025px+)

## 🔐 Security Features

- Email and password validation
- Session management with auto-logout
- Activity logging
- Password change functionality
- Account deletion option

## 📊 Data Storage

All data is stored locally in the browser's **localStorage**:
- User accounts and profiles
- Book catalog
- Borrowing history
- Favorites and ratings
- Activity logs
- Music preferences

**Note**: Data persists while browser cache is not cleared. For production, integrate with a backend database.

## 🎵 Music Room Features

The Music Room provides:
- 8 curated ambient/study music tracks
- Play, pause, skip controls
- Volume control
- Progress bar with seek functionality
- Current time and duration display
- Keyboard shortcuts support
- Playlist management

### Keyboard Shortcuts
- **Space**: Play/Pause
- **Ctrl + →**: Next Track
- **Ctrl + ←**: Previous Track
- **↑**: Volume Up
- **↓**: Volume Down

## 📖 User Workflow

### Registration & Login
```
1. Visit landing page (index.html)
2. Click "Sign Up" or "Create Account"
3. Fill in details and select field of study
4. Account is created automatically
5. Redirected to user dashboard
```

### Borrowing Books
```
1. Go to "Browse Books" section
2. View books relevant to your field
3. Click "Borrow" on desired book
4. Book is added to "My Books" section
5. You have 14 days to return it
```

### Admin Operations
```
1. Login with admin credentials
2. Go to dashboard for overview
3. Manage Books: Add, edit, delete books
4. Manage Users: View and remove users
5. Check borrow requests and statistics
```

## 🔧 Customization

### Change Color Theme
Edit `/css/style.css` - Modify the `:root` CSS variables:
```css
:root {
  --primary-color: #4a90e2;    /* Change blue to any color */
  --secondary-color: #ffffff;  /* Change white */
  --dark-color: #1a1a1a;       /* Change black */
}
```

### Add More Books
Go to Admin Dashboard → Manage Books → Add New Book

### Add More Categories
Edit the select options in:
- `register.html` - Field of study
- `user/dashboard.html` - Category filter
- `admin/dashboard.html` - Book categories

## 🎓 Fields of Study

- Information Technology (IT)
- Science
- Engineering
- Business
- Arts & Humanities
- Medical/Health Sciences
- Education
- Law

## 📝 Book Management System

### Admin Can:
- Add new books with ISBN, author, category
- Edit book details
- Delete books from library
- Monitor availability
- Track borrowed copies

### Users Can:
- View 14-day borrow period
- Renew books (up to 2 times)
- Check return dates
- View late fees (if applicable)
- Get personalized recommendations

## 🌐 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| Opera   | ✅ Full |

## ⚠️ Known Limitations

- No actual audio files (music player uses demo sounds)
- No backend server (all data in localStorage)
- No email notifications
- No physical book reserves
- No multi-language support

## 🚀 Future Enhancements

- [ ] Backend integration (Node.js/Django/Flask)
- [ ] Real database (MongoDB/MySQL/PostgreSQL)
- [ ] Email notifications
- [ ] PDF book viewing
- [ ] Advanced search with filters
- [ ] Book recommendations by AI
- [ ] Social features (reviews, ratings)
- [ ] Mobile app
- [ ] Payment integration for late fees
- [ ] QR code for book check-in/out
- [ ] Video tutorials
- [ ] Dark mode toggle

## 📧 Support & Contact

For issues or suggestions, contact: support@lms.com

## 📄 License

This project is free to use for educational and personal purposes.

## 👨‍💻 Developer Notes

### Code Quality
- Clean and well-commented code
- Modular JavaScript structure
- CSS follows BEM naming convention
- Responsive mobile-first approach

### Performance
- Optimized for fast loading
- Minimal external dependencies
- Efficient localStorage usage
- Smooth animations with GPU acceleration

### Accessibility
- Semantic HTML
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast colors
- Focus indicators on interactive elements

---

**Made with ❤️ for librarians and students**

Version: 1.0.0
Last Updated: February 23, 2026
