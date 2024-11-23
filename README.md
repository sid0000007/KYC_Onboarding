# KYC Onboarding System

<img width="1439" alt="Screenshot 2024-11-24 at 2 17 20 AM" src="https://github.com/user-attachments/assets/d8129639-cc51-484c-b748-f10d14132baf">


This is a **multi-step progress form** project built with **Next.js** and **TypeScript**. It allows users to fill in details such as name, date of birth, dropdown options, and upload files. The project enhances the user experience with a visually appealing progress bar and step completion tracker. The backend uses **Turso (SQLite)**, **Drizzle ORM**, and **TypeScript** within a monorepo setup.

---

## Prerequisites

Before you begin, ensure you have the following environment variables configured in your `.env` file:

1. **Cloudinary API Key:**
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key for handling file uploads.
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.

2. **Database:**
   -  `NEXT_PUBLIC_TURSO_DATABASE_URL`: The URL to connect to your Turso SQLite database.
   - `NEXT_PUBLIC_TURSO_AUTH_TOKEN`: The token to authenticate with the Turso database.

---

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/multi-step-progress-form.git
   cd kyc_form

2.	Install dependencies:
    
    ```bash
    npm i

3. Run locally
   ```bash
   npm run dev
4. Go to Browser and access 
    ```bash
   localhost:3000


## Project Structure

<img width="576" alt="Screenshot 2024-11-24 at 2 17 46 AM" src="https://github.com/user-attachments/assets/3fb503bb-814e-4812-881d-205d3ca00612">

  
## 🛠️ Tech Stack

-   **Frontend**: Next.js
-   **Styling**: TailwindCSS + [shadcn](https://shadcn.dev/) etc.
-   **Backend**: TypeScript, Turso, Drizzle ORM
-   **Database**: SQLite

   


