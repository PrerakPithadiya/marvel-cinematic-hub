# Marvel Studio - MCU Movie Portal

A comprehensive Marvel Cinematic Universe (MCU) fan portal with user authentication and movie information organized by franchise.

## 🎯 Features

- **User Authentication System**
  - Secure login/signup with password hashing
  - Password reset functionality
  - Session management
  - Hero class selection during registration

- **Movie Organization**
  - Movies organized by MCU franchises (Avengers, Thor, Spider-Man, Iron Man, etc.)
  - Detailed movie overviews and information
  - Interactive movie cards with links to individual movie pages

- **Modern UI/UX**
  - Marvel-themed design with red/black color scheme
  - Responsive layout for all devices
  - Smooth animations and transitions
  - Floating label forms

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP 7+
- **Database**: MySQL
- **Authentication**: Session-based with password hashing
- **Styling**: Custom CSS with GSAP animations

## 📁 Project Structure

```
project-mj/
├── Overviews/                 # Text files with movie information by franchise
├── assets/                    # Static assets
│   ├── css/                  # Stylesheets
│   ├── fonts/                # Custom fonts
│   ├── images/               # Images and videos
│   └── js/                   # JavaScript files
├── database/                 # Database setup files
├── moviecard/                # Movie information pages by franchise
├── authenticate.php          # Login authentication
├── register.php             # User registration
├── reset_password.php       # Password reset
├── logout.php               # User logout
├── db_config.php            # Database configuration
├── login.html               # Authentication interface
├── index.html               # Main site page
└── .gitignore               # Git ignore file
```

## 🚀 Setup Instructions

### Prerequisites
- XAMPP (Apache, MySQL, PHP)
- Web browser

### Installation Steps

1. **Start XAMPP Services**
   - Start Apache web server
   - Start MySQL database server

2. **Database Setup**
   ```sql
   -- Run the SQL commands from database/setup.sql
   CREATE DATABASE marvel_studio;
   USE marvel_studio;
   
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(50) UNIQUE NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       password_hash VARCHAR(255) NOT NULL,
       full_name VARCHAR(100),
       hero_class VARCHAR(50),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

3. **Configure Database Connection**
   - Update `db_config.php` with your database credentials if needed
   - Default: localhost:3307, username: root, password: (empty)

4. **Access the Application**
   - Open your browser and navigate to: `http://localhost/project-mj/`
   - You'll be redirected to the login page
   - Create an account or login with existing credentials

## 🔐 Authentication Flow

1. **Login**: Users enter username/password to access the site
2. **Registration**: New users can create accounts with email, username, and hero class
3. **Password Reset**: Users can reset passwords by entering their email
4. **Session Management**: Users remain logged in until they logout

## 🎨 Design Features

- **Marvel Theme**: Red and black color scheme with superhero aesthetics
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Custom Fonts**: Avengeance font family for authentic Marvel feel

## 📱 Franchises Included

- Avengers
- Thor
- Spider-Man
- Iron Man
- Captain America
- Doctor Strange
- Black Panther
- Captain Marvel
- Hulk
- Black Widow

## 🛡️ Security Features

- Password hashing with bcrypt
- Prepared statements to prevent SQL injection
- Session-based authentication
- Input validation and sanitization
- Secure logout functionality

## 📝 Development Notes

- All PHP files return JSON responses for frontend communication
- Frontend uses Fetch API for asynchronous requests
- LocalStorage used for client-side session persistence
- GSAP library for smooth animations
- Custom CSS for unique Marvel styling

## 🎉 Usage

1. Visit the login page
2. Create an account or login
3. Browse MCU movies by franchise
4. View detailed movie information
5. Enjoy the Marvel cinematic experience!

## 🤝 Contributing

This is a personal project. Feel free to fork and modify for your own use.

## 📄 License

This project is for educational/personal use.