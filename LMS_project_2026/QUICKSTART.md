# 🚀 Quick Start Guide - LMS

## 5-Minute Setup

### Step 1: Open the Website
```
✓ Navigate to project folder: LMS_project_2026
✓ Open index.html in your web browser
✓ Or use: python -m http.server 8000 (if you have Python)
```

### Step 2: Explore the Landing Page
- See all features and benefits
- Learn about the system
- Beautiful animations and responsive design

### Step 3: Create Your Account
```
1. Click "Sign Up" button (top right)
2. Fill in:
   - Full Name: John Doe
   - Email: john@example.com
   - Field of Study: Choose IT, Science, Engineering, etc.
   - Password: At least 6 characters
3. Click "Create Account"
4. You're automatically logged in!
```

### Step 4: Explore User Dashboard
You now have access to:

#### 📖 **Browse Books Section**
- See books matching your field of study
- Search for specific books
- Filter by category
- Click "Borrow" to borrow books
- Use ❤️ to favorite books

#### 📚 **My Books Section**
- View all books you've borrowed
- See return dates
- Return books before due date

#### 🎵 **Music Room**
- Play relaxing background music
- Control volume and playback
- 8 different tracks available
- Use space bar to play/pause

#### 👤 **Profile Section**
- View your account details
- Change password
- Delete account if needed

## Test with Admin Account

### Step 1: Logout
- Click "Logout" button (top right)

### Step 2: Login as Admin
```
Email: admin@lms.com
Password: admin123
```

### Step 3: Explore Admin Dashboard
You now have access to:

#### 📊 **Dashboard Overview**
- Total users in system
- Total books in library
- Books borrowed
- Pending requests

#### 📕 **Manage Books**
- View all books
- Add new books (+ Add New Book button)
- Edit book details
- Delete books
- Search and filter

#### 👥 **Manage Users**
- View all registered users
- See borrowing statistics
- Remove users if needed

#### 📋 **Borrow Requests**
- Monitor book requests
- Approve/deny requests

## Sample Data Included

### Pre-loaded Books:
1. JavaScript: The Good Parts
2. Python for Data Analysis
3. Introduction to Algorithms
4. A Brief History of Time
5. And 4 more books...

### Pre-loaded Admin:
- Email: admin@lms.com
- Password: admin123

## Responsive Design

### On Mobile (Portrait)
- Menu becomes hamburger icon
- All content stacks vertically
- Touch-friendly buttons
- Full functionality preserved

### On Tablet (Landscape)
- Side-by-side layout for dashboards
- Grid layout for books
- All features fully accessible

### On Desktop
- Beautiful multi-column layouts
- Hover effects on cards
- Smooth animations

## Color Navigation

The system uses a clean color scheme:
- 🔵 **Blue** - Primary actions and highlights
- ⚫ **Black** - Header and professional areas
- ✨ **White** - Clean backgrounds
- Gray - Secondary text and borders

## Key Features at a Glance

| Feature | User | Admin |
|---------|------|-------|
| Browse Books | ✅ | ✅ |
| Borrow Books | ✅ | ❌ |
| Return Books | ✅ | ❌ |
| Manage Books | ❌ | ✅ |
| Manage Users | ❌ | ✅ |
| Music Room | ✅ | ✅ |
| User Profile | ✅ | ✅ |

## Helpful Tips

### 💡 Pro Tips

1. **Field of Study** - Books shown match your chosen field. Change it in profile to see different books.

2. **14-Day Borrow Period** - You have 14 days to return books. Late fees apply after that (demo feature).

3. **Search** - Use the search bar to quickly find books by title or author.

4. **Favorites** - Click the heart icon to save your favorite books for easy access.

5. **Music Player** - Use keyboard shortcuts:
   - Space: Play/Pause
   - Ctrl + Right Arrow: Next
   - Ctrl + Left Arrow: Previous
   - Up/Down Arrow: Volume

6. **Responsive** - Try resizing your browser window to see the responsive design in action!

## Troubleshooting

### Problem: Can't find a book?
- ✓ Check that the category filter is set correctly
- ✓ Make sure it matches your field of study
- ✓ Try searching by title or author

### Problem: Can't borrow a book?
- ✓ Book might be unavailable (all copies borrowed)
- ✓ You might have already borrowed this copy
- ✓ Make sure you're logged in

### Problem: Data disappeared?
- ✓ All data is stored locally in your browser
- ✓ Clearing browser cache/cookies might delete it
- ✓ Use "Remember me" option to save login

### Problem: Music not playing?
- ✓ For demo purposes, shows controls but may not play audio
- ✓ In production, integrate actual audio files
- ✓ Volume control works for demo player

## File Descriptions

```
📁 LMS_project_2026/
├── 📄 index.html              ← Start here!
├── 📄 login.html              ← Login page
├── 📄 register.html           ← Sign up page
├── 📁 user/
│   └── 📄 dashboard.html      ← Student features
├── 📁 admin/
│   └── 📄 dashboard.html      ← Admin controls
├── 📁 css/
│   ├── 📄 style.css           ← Main styles
│   ├── 📄 responsive.css      ← Mobile styles
│   └── 📄 components.css      ← Component styles
├── 📁 js/
│   ├── 📄 main.js             ← Core functionality
│   ├── 📄 auth.js             ← Login/Register
│   ├── 📄 books.js            ← Book system
│   └── 📄 music.js            ← Music player
└── 📄 README.md               ← Full documentation
```

## Next Steps

### To Customize:
1. Edit colors in `css/style.css` (look for `:root`)
2. Add more books via Admin Dashboard
3. Change category names in dropdown menus
4. Modify content in HTML files

### To Deploy:
1. Hosting: Use GitHub Pages, Netlify, or Vercel
2. Database: Integrate with backend
3. Authentication: Add real user authentication
4. Storage: Replace localStorage with cloud database

## Support

- 📖 See `README.md` for detailed documentation
- 💬 Code is well-commented for easy understanding
- 🎓 All JavaScript is vanilla (no frameworks needed)
- 🚀 Mobile-first responsive design throughout

---

**Enjoy your Library Management System!** 📚✨

For questions or issues, check the README.md file for more details.
