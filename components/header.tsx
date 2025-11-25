"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplet } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { WelcomeMessage } from "@/components/welcome-message"

export function Header() {
  const { isLoggedIn, userType, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 glass border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-primary hover:text-accent transition-colors"
          >
            <Droplet className="w-6 h-6 fill-primary" />
            <div className="hidden sm:flex flex-col">
              <span className="leading-none">RedLifeline Hub</span>
              <span className="text-xs text-muted-foreground font-normal">Foundation</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {isLoggedIn && userType === "donor" && (
              <>
                <Link href="#features" className="text-foreground hover:text-primary transition-colors">
                  Services
                </Link>
                <Link href="/hospitals" className="text-foreground hover:text-primary transition-colors">
                  Hospitals
                </Link>
                <Link href="/campaigns" className="text-foreground hover:text-primary transition-colors">
                  Campaigns
                </Link>
                <Link href="#compatibility" className="text-foreground hover:text-primary transition-colors">
                  Blood Types
                </Link>
                <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/user-guide" className="text-foreground hover:text-primary transition-colors">
                  Guide
                </Link>
                <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </>
            )}

            {isLoggedIn && userType === "hospital" && (
              <>
                <Link href="/campaign-requests" className="text-foreground hover:text-primary transition-colors">
                  Campaign Requests
                </Link>
                <Link href="/hospitals" className="text-foreground hover:text-primary transition-colors">
                  Hospitals
                </Link>
                <Link href="/inventory" className="text-foreground hover:text-primary transition-colors">
                  Blood Inventory
                </Link>
              </>
            )}
          </nav>
          {/* </CHANGE> */}

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <WelcomeMessage />
                <span className="text-sm text-muted-foreground">
                  ({userType.charAt(0).toUpperCase() + userType.slice(1)})
                </span>
                <Button size="sm" variant="outline" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <div className="hidden sm:block">
                  <Button
                    size="sm"
                    variant="ghost"
                    asChild
                    className="text-xs text-muted-foreground hover:text-primary"
                  >
                    <Link href="/blood-centre-login">Centre Login</Link>
                  </Button>
                </div>
                <Button size="sm" asChild className="bg-primary hover:bg-accent text-primary-foreground">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
