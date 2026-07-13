# 📱 PhoneTone - AI-Powered Smartphone E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**PhoneTone** is a modern, full-stack e-commerce platform designed to revolutionize how users discover and purchase smartphones. Leveraging **Google Gemini AI**, the platform automatically generates detailed, accurate product specifications from just a phone name, eliminating manual data entry. Built with a strict TypeScript codebase, role-based access control, and a hybrid serverless architecture.

🔗 **Live Demo:** [https://phone-tone-client.vercel.app](https://phone-tone-client.vercel.app)
🔗 **Backend Repo:** [https://github.com/Kawsar37/phone-tone-server](https://github.com/Kawsar37/phone-tone-server)

---

## ✨ Key Features

- 🤖 **AI-Powered Product Onboarding:** Admins can add new phones by name; Google Gemini AI instantly generates strict JSON specs (price, display, camera, battery, etc.).
- 🔐 **Secure Role-Based Authentication:** Custom JWT-based auth with HttpOnly cookies, protected routes via Next.js Edge Middleware, and distinct User/Admin dashboards.
- 🛒 **Real-Time E-commerce Flow:** Dynamic cart management, real-time stock validation, and seamless checkout with order history tracking.
- 📊 **Advanced Admin Dashboard:** Real-time revenue analytics, order status management, user moderation (block/unblock), and inventory control.
- 🎨 **Modern UI/UX:** Fully responsive, mobile-first design built with Tailwind CSS, featuring skeleton loaders, toast notifications, and smooth transitions.
- ⚡ **Optimized Performance:** Server Components for instant initial loads, client-side caching, and zero "flash of unauthenticated content".

---

## 🛠️ Tech Stack

| Category       | Technologies                                             |
| -------------- | -------------------------------------------------------- |
| **Frontend**   | Next.js 14 (App Router), React, TypeScript, Tailwind CSS |
| **State/API**  | React Context, Axios, React Hook Form                    |
| **UI/UX**      | Sonner (Toasts), Recharts (Analytics), React Icons       |
| **Backend**    | Node.js, Express.js, MongoDB, Mongoose, Google Gemini AI |
| **Deployment** | Vercel (Frontend), Render (Backend)                      |

---

## 🔑 Demo Credentials

Use these credentials to test the role-based dashboards on the live site:

| Role      | Email                 | Password    | Access                                                                     |
| --------- | --------------------- | ----------- | -------------------------------------------------------------------------- |
| **Admin** | `admin@phonetone.com` | `Admin123!` | Full access to Admin Dashboard, AI Phone Generation, Order/User Management |
| **User**  | `user@phonetone.com`  | `User123!`  | Browse, Cart, Checkout, Personal Order History                             |

_(Note: You can also register a new account directly on the site!)_

---

## 📂 Project Structure

```text
phone-tone-client/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth layout group (Login, Register)
│   ├── (dashboard)/            # Protected dashboard layouts
│   │   ├── admin/              # Admin routes (Overview, Orders, Phones, Users)
│   │   └── user/               # User routes (Profile, Orders)
│   ├── phones/                 # Public phone routes (List, [id] Details)
│   ├── cart/                   # Shopping cart page
│   ├── checkout/               # Checkout flow
│   ├── layout.tsx              # Root layout with AuthProvider & Toaster
│   └── page.tsx                # Home page
├── components/                 # Reusable UI components
│   ├── shared/                 # Navbar, Footer, PhoneCard, etc.
│   └── ui/                     # Base UI elements (Input, Button)
├── lib/                        # Utility functions (e.g., server-side session helper)
├── providers/                  # React Context providers (AuthProvider)
├── types/                      # Strict TypeScript interfaces (IPhone, IUser, IOrder)
├── utils/                      # API clients (Axios instance with credentials)
├── public/                     # Static assets
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
└── tailwind.config.ts          # Tailwind CSS configuration
```

## 🚀 Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Kawsar37/phone-tone-client.git
cd phone-tone-client
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and add the following:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> **Note:** Ensure your backend server is running on **http://localhost:5000**. If you're using a deployed backend (e.g., Render), replace the URL with your live API endpoint.

### 4. Run the Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser to view the application.

---

## 🌐 Deployment

The project is optimized for modern cloud deployment.

- **Frontend:** Deployed on **Vercel** for fast Edge Network delivery, automatic HTTPS, and seamless GitHub CI/CD.
- **Backend:** Deployed on **Render** for reliable server uptime, AI processing, and long-running tasks without serverless cold starts.

---

## 🤝 Contributing

Contributions are welcome!

If you'd like to improve this project:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to your fork.
5. Open a Pull Request.

For major changes, please open an issue first to discuss your proposed changes.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ❤️ Author

Built with ❤️ by **Kawsar Ali**

_Empowering e-commerce with Artificial Intelligence._
