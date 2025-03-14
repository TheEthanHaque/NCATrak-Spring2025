NCATrak Spring 2025 - Capstone Project

This README provides step-by-step instructions to set up the environment, database, and initial application functionality for the Spring 2025 continuation of the NCATrak capstone project.

📖 Project Overview

This project continues the work started in Fall 2024, transitioning the interface from Tkinter to a more scalable front-end technology while implementing data tracking features like mouse movement and keylogging with AOI (Area of Interest) functionality.

⚙️ Setup Instructions

1️⃣ Clone the Repository

Ensure you have git installed, then run:

cd ~/repos  # Or your preferred directory
git clone https://github.com/TheEthanHaque/NCATrak-Spring2025.git
cd NCATrak-Spring2025

2️⃣ Open in VS Code

Open the project folder directly in Visual Studio Code:

code .

(Ethan prefers to open folders in VS Code before running commands in the built-in terminal.)

🛠️ Python Environment Setup

3️⃣ Create a Virtual Environment

From the root directory:

python3 -m venv venv
source venv/bin/activate

4️⃣ Install Dependencies

pip install -r requirements.txt

Ensure all dependencies are correctly installed before proceeding.

🆘 Troubleshooting Dependencies

If tkinter, psycopg2, faker, or faker_education are missing:

pip install tkcalendar psycopg2-binary faker faker-education sv_ttk

🗂️ Database Setup (PostgreSQL)

5️⃣ Install PostgreSQL

brew install postgresql@14
brew services start postgresql@14


7️⃣ Run Setup Wizard

cd app
python wizard.py

Follow the prompts:

Host: localhost

Database: ncatrak

Username: ethan

Password: securepassword

Then choose [1] Complete Install and generate 100 entries.

🖥️ Running the Application

8️⃣ Generate Prisma Client

npx prisma generate


🌐 Frontend Setup (React)

9️⃣ Create React App

cd frontend
npx create-react-app .
npm install web-vitals@^2.1.0 --force

🔍 Fix React Issues

If dependency conflicts occur, use:

npm install --legacy-peer-deps

🔔 Git Commit & Push

🔄 Update Dependencies

pip freeze > requirements.txt

📤 Commit Changes

git add .
git commit -m "Initial setup: Database, backend, frontend, and dependencies."
git push origin main

🚧 Next Steps

Build out front-end functionality with React.

Integrate Flask back-end API with React.

Implement AOI tracking features.

🔗 Reference: Fall 2024 README

This guide should help your collaborators replicate your current setup.

