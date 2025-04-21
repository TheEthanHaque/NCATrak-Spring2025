# NCATrak-Mock-System

## Introduction

This software aims to give professors at the [University of Oklahoma Health Science Center](https://www.ouhsc.edu/) a mock database where they can simulate tests on data input to improve the data validity and quality for child advocacy centers.

## System Requirements

- Node.js v18+ for the frontend and API
- Python 3.8+ for the data generation scripts
- PostgreSQL 14+ for the database

## Installation & Setup

### 1. Clone the Repository and Switch to API Branch

```bash
git clone https://github.com/TheEthanHaque/NCATrak-Spring2025.git
cd NCATrak-Spring2025/
git checkout api
```

### 2. Setting up WSL on Windows

If you're using Windows, you can set up the Windows Subsystem for Linux (WSL) to run the project in a Linux environment:

1. Open PowerShell as Administrator
2. Install WSL by running:
   ```powershell
   wsl --install
   ```
   This will install Ubuntu by default. If you want a different distro, you can specify it:
   ```powershell
   wsl --install -d Ubuntu-22.04
   ```
3. Restart your computer when prompted
4. After restart, WSL will finish the setup and prompt you to create a username and password
5. Once setup is complete, you can open your WSL terminal from the Start menu or by typing `wsl` in PowerShell

### 3. PostgreSQL Installation

```bash
# For Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# For Fedora/RHEL
sudo dnf install postgresql postgresql-server
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 4. PostgreSQL Configuration

After installation, configure PostgreSQL to accept local connections:

1. Edit the PostgreSQL client authentication configuration file:
   ```bash
   sudo nano /etc/postgresql/14/main/pg_hba.conf
   ```
   Note: Your PostgreSQL version may differ. Replace '14' with your installed version if needed.

2. Find the lines for local connections and change the authentication method from `peer` or `md5` to `trust` for development purposes:
   ```
   # IPv4 local connections:
   host    all             all             127.0.0.1/32            trust
   # IPv6 local connections:
   host    all             all             ::1/128                 trust
   # Local socket connections:
   local   all             all                                     trust
   ```

3. Save the file (Ctrl+O, then Enter, then Ctrl+X)

4. Restart PostgreSQL to apply changes:
   ```bash
   sudo systemctl restart postgresql
   ```

### 5. Testing PostgreSQL Connection

Test your PostgreSQL connection to ensure it's working correctly:

```bash
# Connect to PostgreSQL as postgres user
psql -U postgres

# Once connected, you should see a prompt like:
# postgres=#

# Test with some basic commands:
\l            # List all databases
\du           # List all users/roles

# Exit PostgreSQL
\q
```

If you can successfully connect, your PostgreSQL installation is working properly.

### 6. Install Dependencies

#### Backend Python Dependencies

```bash
# From the project root directory
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### API Dependencies

```bash
# From the project root directory
cd app/api
npm install

# Generate Prisma client
npx prisma generate

cd ..
```

#### Frontend Dependencies

```bash
# From the project root directory
cd app/frontend
npm install
cd ..
```

### 7. Database Setup Using Wizard

The project includes a wizard script that handles all database setup automatically:

```bash
# From the project root directory
# Make sure your virtual environment is activated
cd app
python wizard.py
```

When prompted:
1. Select option 1 for "Complete Install"
2. Enter the database information:
   - Host: localhost
   - Database name: ncatrak (or your preferred name)
   - Username: ncatrakuser (or your preferred username)
   - Password: your_secure_password

The wizard will:
- Create the database configuration files
- Create the database and user
- Set appropriate permissions
- Create all required tables
- Populate the tables with sample data

> Note: The wizard requires superuser access to PostgreSQL to create the database and user. Make sure you know the superuser credentials (usually `postgres`).

## Running the Application

### 1. Start the API Server

```bash
# From the project root directory
cd app/api
node index.js
```

The API will run on http://localhost:5000 by default.

### 2. Start the Frontend Application

```bash
# From the project root directory
cd app/frontend
npm start
```

The frontend will run on http://localhost:3000 and should automatically open in your browser.

## Project Structure

- `app/frontend`: React frontend application
- `app/api`: Prisma.io API server
- `app/database`: Database configuration and schema scripts
- `app/generator`: Mock data generation scripts

## Development

### API Development

- The Prisma.io API is defined in `app/api/index.js`
- API routes are defined in the `app/api/routes` directory
- Database models are defined in `app/api/prisma/schema.prisma`

### Frontend Development

- The React frontend is built using React Router and Material UI
- Main application entry point is `app/frontend/src/App.js`
- Components are stored in `app/frontend/src/components`
- API services are defined in `app/frontend/src/services/api.js`

## Testing

### API Tests

```bash
# From the project root directory
cd app/api
npm test
```

### Database Tests

You can check the database connection using:

```bash
# From the project root directory
cd app/api/tests
node check-database.js
```

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running: 
  - Run `sudo systemctl status postgresql`
- Verify the database connection by running a database test
- If you encounter issues with the wizard script:
  - Ensure your PostgreSQL superuser credentials are correct
  - Check PostgreSQL logs: `/var/log/postgresql/postgresql-14-main.log`

### API Connection Issues

- Check that the API is running on port 5000
- Verify CORS settings in `app/api/index.js` if you're having frontend-to-API connection issues
- Check your browser console for error messages

### Frontend Build Issues

- Make sure all dependencies are installed: `npm install`
- Clear node_modules and reinstall if needed:
  ```bash
  rm -rf node_modules
  npm install
  ```

## Additional Configuration

### Changing the API Port

Edit `app/api/index.js` and modify the `PORT` constant:

```javascript
const PORT = process.env.PORT || 5000;
```

### Changing the Frontend Port

Create a `.env` file in the `app/frontend` directory:

```
PORT=3001
```

## License

This software is provided as-is without any warranty. See LICENSE file for details.

## Contact

For support, please contact the project maintainers.
