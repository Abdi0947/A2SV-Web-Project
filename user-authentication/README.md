# 🔐 Task 8: User Authenticationion

A complete authentication flow built with **Next.js (App Router)** using **Better Auth** and **Prisma (PostgreSQL)**. The app supports email/password signup with **4‑digit OTP email verification**, **Google social signup/login**, and a **protected dashboard** that is accessible only to verified users.

--## ✨ Overview

👨‍💻 **Developer:** **Abdi Debela**

This application demonstrates a modern authentication system with:

* Secure signup and login
* Email verification using a 4‑digit OTP
* Google OAuth via Better Auth social providers
* Session‑based access control
* A gated dashboard showing sample job opportunities

Verified users are automatically redirected to the dashboard after successful authentication.

---

## 🚀 Features

* **Email & Password Signup**

  * Collects name, email, and password
  * Sends a 4‑digit OTP for email verification

* **Email Verification (OTP)**

  * Secure OTP hashing and expiration
  * Resend OTP with a 30‑second cooldown

* **Google Signup / Login**

  * Powered by Better Auth social providers

* **User Login**

  * Email/password authentication for existing users

* **Protected Dashboard**

  * Accessible only to authenticated and verified users
  * Displays sample job opportunities

* **Client‑Side Validation**

  * Email format validation
  * Password length and confirmation checks
  * OTP format validation with inline feedback

* **UI & Styling**

  * Poppins font
  * Clean, modern auth UI aligned with the provided reference

---
Screenshots

![alt text](image.png)

![alt text](image-1.png)

![alt text](image-2.png)

![alt text](image-3.png)

![alt text](image-4.png)

![alt text](image-5.png)


## 🗂️ Pages

| Route        | Description                                                                    |
| ------------ | ------------------------------------------------------------------------------ |
| `/`          | Landing page with CTA to authenticate                                          |
| `/auth`      | Combined Login & Sign Up page (includes Google auth and OTP verification step) |
| `/dashboard` | Protected dashboard (verified users only)                                      |

---

## 🔌 API Routes (App Router)

| Method | Endpoint                  | Description                                      |
| ------ | ------------------------- | ------------------------------------------------ |
| POST   | `/api/auth/signup`        | Create user account and send OTP                 |
| POST   | `/api/otp/request`        | Resend OTP                                       |
| POST   | `/api/otp/verify`         | Verify OTP, mark email as verified, sign user in |
| POST   | `/api/auth/login`         | Login existing user                              |
| GET    | `/api/auth/social/google` | Start Google OAuth signup/login                  |

---

## ⚙️ Environment Variables

Create a `.env.local` file and configure the following:

```env
DATABASE_URL=postgresql://user:pass@host:port/db

# OAuth Providers
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Email (SMTP)
SMTP_HOST=...
SMTP_PORT=465        # or 587
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM="Your App <no-reply@yourdomain.com>"

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note:** If SMTP is not configured in development, the OTP response may include a `devCode` for testing purposes.

---

## 📦 Installation & Running Locally

```bash
cd user-authentication
npm install
npm run dev
```

Open your browser and navigate to:

```
http://localhost:30### ✍️ Sign Up



### Sign Up

1. Visit `/autch to **Sign Up**.
2. Enter name, email, password, and confirm password.
3. (Optional) Use **Sign up with Google**.
4. After email signup, enter the **4‑digit OTP** sent to your email.
5. On successful verification, you are redirected to `/dashboard`.

-### 🔑 Loginogin

1. Visit `/auth`.
2. Enter emassword.
3. On success, you are redirected to `/dashboard`.

---

### O### 🔢 OTP Verificationnter the 4‑digit code recei expires after a fixed duration.
- Resend option becomes available after a **30‑second countdown**.

---

## ✅ Validation & Error Handling

- Client‑side validation for:
  - Email password confirmation match
  - 4‑digit OTP format

- Server‑side errors are surfaced as inline feedback in the UI.

---

## 🔒 Data & Security

- Passwords are securely handled by **Better Auth** and **Prisma**.
- Authentication via **HTTP‑only cookies**.
- OTPs are:
  - Hashed using **SHA‑256**
  - Stored with an expiration timestamp

---

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **React**
- **Better Auth**
- **Prisma ORM** (PostgreSQL)
- **Tailwind CSS**
- *TP email delivery






