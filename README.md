# 🌐 VERA Frontend by Urbane Digital Assets

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Wagmi](https://img.shields.io/badge/Wagmi-black?style=for-the-badge&logo=wagmi&logoColor=white)](https://wagmi.sh/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

### Infrastructure, Reimagined.

**Smart Contracts:** [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0x5a53fB9862021a8e6468fa47CF6a49cA858C8C87)

---

This is the official frontend application for **VERA**, a decentralized protocol that transforms municipal revenue bonds into transparent, liquid, and globally accessible digital assets.

This dApp provides a complete, end-to-end user journey, from discovery and verification to investment and portfolio management.

### **Core Features**

-   **Professional UI/UX:** A sleek, modern, and fully responsive dark-themed interface built for a professional fintech experience. It also has a breathing background
-   **Privacy-Preserving KYC:** A cutting-edge compliance layer using **World ID** for "Proof of Personhood," demonstrating a real-world, privacy-first approach to user verification.
-   **The "Executive" Dashboard:** A powerful portfolio overview that provides users with a high-level summary of their total investments, blended APY, asset allocation, and detailed breakdowns of each holding.
-   **The "Glass Cockpit":** Radical transparency with direct links to Etherscan for all projects, transactions, and assets, providing irrefutable on-chain proof.
-   **Real-Time Oracle Updates:** The dashboard listens for on-chain events, allowing features like "Total Project Revenue" to update live on the screen, demonstrating a true connection between off-chain data and on-chain state.

### **Tech Stack**

-   **Framework:** Next.js (App Router)
-   **Language:** TypeScript
-   **Web3:** Wagmi, viem, RainbowKit
-   **Styling:** Inline CSS-in-JS & Global CSS
-   **Compliance:** World ID (`IDKit`)
-   **Deployment:** Vercel

### **Running the Project Locally**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/adityar2705/vera-frontend.git
    ```

2.  **Install dependencies:**
    ```bash
    cd vera-frontend
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file and add your Alchemy RPC URL.
    ```bash
    NEXT_PUBLIC_ALCHEMY_RPC_URL=...
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---
*A project by Aditya Ranjan for ETHOnline 2025.*
