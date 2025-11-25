'use client'

import Link from 'next/link'
import { Droplet, Heart, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 fill-background" />
              <span className="font-bold text-lg">RedLifeline Hub</span>
            </div>
            <p className="text-sm opacity-90">
              Connecting life-saving blood donations with those in need.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/donate" className="hover:underline">Become a Donor</Link></li>
              <li><Link href="/request" className="hover:underline">Request Blood</Link></li>
              <li><Link href="/compatibility" className="hover:underline">Blood Types</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div className="space-y-3">
            <h3 className="font-semibold">Information</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (800) RED-LIFE</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@redlifelinehub.org</span>
              </li>
            </ul>
            <div className="flex gap-3 pt-2">
              <Link href="#" className="text-background hover:opacity-80 transition-opacity">
                <Heart className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-background hover:opacity-80 transition-opacity">
                <Droplet className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 text-center text-sm">
          <p>&copy; 2025 RedLifeline Hub Foundation. All rights reserved. Saving lives, one donation at a time.</p>
        </div>
      </div>
    </footer>
  )
}
