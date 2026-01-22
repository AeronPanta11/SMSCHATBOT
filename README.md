
### About Sms Guardian

SMS Guardian

SMS Guardian is a React-based mobile-style SMS chatbot that analyzes messages for potential phishing or risky content. Built with Vite, React, and TailwindCSS, it provides a real-time, interactive chat experience with automatic highlighting of suspicious words.

### What SMS Guardian does
It highlights suspicious keywords like "urgent", "bank", "account", "login", and "password" to warn the user that a link or message may be unsafe.

### How it works

    User types a message.

    The bot scans for suspicious keywords.

    If risky words are detected:

    Keywords are highlighted in red.

    A bot message warns: “This message looks suspicious!! Please be cautious and avoid clicking any links or providing personal information.”

    If no risky words are found:

    Message is treated as safe with green border.

    Bot confirms: “This message seems safe.”

    This helps guide users to identify potentially malicious messages quickly and safely.
    
### Tech Stack

Frontend: React 18 + JSX

Styling: TailwindCSS 4.x

PostCSS: @tailwindcss/postcss + autoprefixer

Deployment :vercel

Icons: Lucide React





### Project link: https://smschatbot-bok9.vercel.app/