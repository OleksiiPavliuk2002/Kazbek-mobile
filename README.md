# Kazbek Mobile - Georgian Cuisine Booking App

A full-stack mobile application for restaurant table bookings and menu browsing, built with React Native (Expo) for the frontend and Express.js with Sequelize ORM for the backend.

The project looks like:

<img src="./kazbek/assets/kazbek.gif" alt="kazbek" width="200" height="400" />


## 📱 Project Structure

```
kazbek-mobile/
├── kazbek/              # React Native mobile app (Expo)
└── server/              # Express.js API server
```

## 🚀 Features

- **Mobile App (kazbek/)**
  - Browse Georgian restaurant menu with categories
  - View menu items with prices, portions, and emojis
  - Book restaurant tables with date, time, and guest count
  - Contact management
  - Bottom tab navigation for easy access

- **Backend Server (server/)**
  - RESTful API for menu management
  - Booking system with status tracking
  - SQLite database with Sequelize ORM
  - CORS-enabled for mobile app access

## 🛠 Tech Stack

### Mobile App
- **Framework**: React Native 0.81.5 with Expo 54
- **Navigation**: React Navigation (Bottom Tabs)
- **Forms**: React Hook Form
- **UI Components**: Expo Vector Icons, Expo Linear Gradient

### Server
- **Runtime**: Node.js
- **Framework**: Express.js 5.2
- **ORM**: Sequelize 6
- **Database**: SQLite3
- **Other**: CORS, dotenv

## 📋 Prerequisites

- Node.js >= 18
- npm or yarn
- Expo CLI (for mobile development): `npm install -g expo-cli`
- Android Studio/Xcode (for native builds - optional)

## ⚙️ Installation

### 1. Clone and Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install mobile app dependencies
cd ../kazbek
npm install
```

### 2. Environment Setup

Create a `.env` file in the server directory:

```bash
cd server
cp .env.example .env
```

Edit `.env` and configure:
```env
PORT=5000
DB_PATH=./kazbek.db
```

## 🚀 Getting Started

### Start the Backend Server

```bash
cd server

# Seed the database with sample menu items
node seed.js

# Start the Express server
npm start
# or
node index.js
```

The server will run on `http://localhost:5000`

### Start the Mobile App

```bash
cd kazbek

# Start Expo development server
npm start

# Run on specific platform:
npm run android    # Android Emulator
npm run ios        # iOS Simulator
npm run web        # Web Browser
```

## 📡 API Endpoints

### Menu Management
- `GET /api/menu` - Get all available menu items
  - Query param: `?type=CategoryName` - Filter by category
- `GET /api/menu/types` - Get all menu categories
- `GET /api/menu/:id` - Get specific menu item
- `POST /api/menu` - Add new menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

### Booking Management
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id` - Update booking status

### Health Check
- `GET /api/health` - Server status

## 📁 Directory Structure

### Mobile App (kazbek/)
```
kazbek/
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── MenuScreen.js
│   │   ├── BookingScreen.js
│   │   ├── CuisineScreen.js
│   │   └── ContactsScreen.js
│   ├── hooks/
│   │   └── useApi.js
│   └── constants/
│       └── index.js
├── assets/
├── App.js
├── app.json
└── package.json
```

### Server (server/)
```
server/
├── models/
│   ├── index.js         # Sequelize instance
│   ├── MenuItem.js      # Menu item model
│   └── Booking.js       # Booking model
├── routes/
│   ├── menu.js          # Menu endpoints
│   └── bookings.js      # Booking endpoints
├── config/
│   └── db.js            # Database configuration
├── seed.js              # Database seeding script
├── index.js             # Express app entry point
├── package.json
└── .env
```

## 📦 Database Schema

### menu_items
```sql
CREATE TABLE menu_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  portion TEXT NOT NULL,
  price REAL NOT NULL,
  emoji TEXT DEFAULT '🍽',
  available BOOLEAN DEFAULT true,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### bookings
```sql
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  guests INTEGER DEFAULT 2,
  comment TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔄 Workflow

1. **Initialize Database**: Run `npm run seed` in server directory
2. **Start Server**: `npm start` in server directory
3. **Connect Mobile App**: Update API base URL in mobile app if needed
4. **Launch Mobile App**: `npm start` in kazbek directory