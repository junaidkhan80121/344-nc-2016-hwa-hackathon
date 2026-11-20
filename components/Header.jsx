"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Moon, ShoppingBag, Sun, User, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useCart } from "./CartProvider";
import { useAuth } from "./AuthProvider";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=bundles", label: "Bundles" },
  { href: "/shop?category=refills", label: "Refills" },
  { href: "/about", label: "Our story" },
];

export default function Header({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();
  const { count, setOpen: setCartOpen } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      {children}
      <div className="container header-inner">
        <button
          type="button"
          className="icon-btn mobile-only"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link href="/" className="brand" aria-label="ScentTrail Pods home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-text">
            Scent<span>Trail</span>
            <em>Pods</em>
          </span>
        </Link>

        <nav className={`main-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href.split("?")[0] && !link.href.includes("category=") ? "active" : undefined
              }
            >
              {link.label}
            </Link>
          ))}
          <div className="mobile-nav-extras">
            <Link href="/orders">My orders</Link>
            <Link href={user ? "/account" : "/login"}>{user ? "My account" : "Sign in"}</Link>
          </div>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href={user ? "/account" : "/login"} className="icon-btn account-btn" aria-label={user ? "My account" : "Sign in"}>
            <User size={18} />
            {user ? <span className="account-dot" aria-hidden="true" /> : null}
          </Link>
          <button type="button" className="cart-btn" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${count} items`}>
            <ShoppingBag size={18} />
            <span className="cart-btn-label">Cart</span>
            <span className={`cart-count ${count === 0 ? "is-empty" : ""}`}>{count}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
