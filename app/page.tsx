'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Droplet, Heart, Users, TrendingUp, Clock, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-context'

export default function Home() {
  const router = useRouter()
  const { isLoggedIn, userType } = useAuth()

  const handleDonorCTA = () => {
    if (isLoggedIn && userType === 'donor') {
      router.push('/donor-dashboard')
    } else {
      router.push('/register')
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-muted">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent/10 to-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-slideInUp">
              <div className="space-y-2">
                <p className="text-primary font-semibold text-sm tracking-widest uppercase">Verified Blood Donation Network</p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight gradient-text">
                  Life Flows Through Giving
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground text-balance leading-relaxed">
                Connect with verified donors, request urgent blood supplies, and save lives. Timely, secure, and trusted blood donation matching platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" onClick={handleDonorCTA} className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold rounded-full glow-effect transition-all duration-300">
                  {isLoggedIn && userType === 'donor' ? 'Go to Dashboard' : 'Become a Donor'}
                </Button>
                <Button size="lg" variant="outline" asChild className="border-2 border-primary text-primary hover:bg-primary/5 rounded-full">
                  <Link href="/request">Request Blood Now</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">50K+</p>
                  <p className="text-sm text-muted-foreground">Active Donors</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">100%</p>
                  <p className="text-sm text-muted-foreground">Verified</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Support</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:flex items-center justify-center animate-slideInUp [animation-delay:0.2s]">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl animate-pulse"></div>
                <div className="relative glass rounded-3xl p-8 flex flex-col items-center justify-center space-y-6 border-2 border-white/30">
                  <div className="relative w-32 h-32 flex items-center justify-center animate-float">
                    <Droplet className="w-32 h-32 text-primary/30" />
                    <Heart className="w-20 h-20 text-gradient-text absolute fill-primary" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-bold text-lg">One Donation</p>
                    <p className="text-sm text-muted-foreground">Can save up to 3 lives</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive blood donation solutions designed for donors, patients, and healthcare providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Droplet className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-lg">Easy Registration</h3>
                  <p className="text-sm text-muted-foreground">
                    Quick eligibility assessment and health questionnaire to become a verified donor.
                  </p>
                </div>
              </div>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-lg">Real-Time Matching</h3>
                  <p className="text-sm text-muted-foreground">
                    Instant alerts for urgent blood requests matching your blood group and location.
                  </p>
                </div>
              </div>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-lg">Secure & Safe</h3>
                  <p className="text-sm text-muted-foreground">
                    HIPAA compliant platform with verified healthcare providers and secure data handling.
                  </p>
                </div>
              </div>
            </Card>

            {/* Feature 4 */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-lg">Doctor Verified</h3>
                  <p className="text-sm text-muted-foreground">
                    All blood requests are verified by licensed medical professionals.
                  </p>
                </div>
              </div>
            </Card>

            {/* Feature 5 */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-lg">24/7 Availability</h3>
                  <p className="text-sm text-muted-foreground">
                    Round-the-clock support for emergency blood requests and donor coordination.
                  </p>
                </div>
              </div>
            </Card>

            {/* Feature 6 */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-lg">Track Your Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor your donations and see how you're making a difference.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Blood Type Section */}
      <section id="compatibility" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Blood Type Compatibility</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understand how different blood types work and who can donate to whom.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Compatibility Chart */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((blood) => (
                  <div
                    key={blood}
                    className="p-4 rounded-lg border-2 border-primary bg-primary/5 text-center font-semibold text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                  >
                    {blood}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Click on a blood type to learn about donors and recipients.
              </p>
            </div>

            {/* Educational Content */}
            <Card className="p-8 bg-card border-2 border-primary/20">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Universal Donor</h3>
                  <p className="text-sm text-muted-foreground">
                    O- (O negative) blood type is the universal donor. Anyone can receive it in emergencies.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Universal Recipient</h3>
                  <p className="text-sm text-muted-foreground">
                    AB+ (AB positive) blood type is the universal recipient. They can receive from any blood type.
                  </p>
                </div>
                <Button asChild className="w-full bg-primary hover:bg-accent text-primary-foreground">
                  <Link href="/compatibility">Learn More</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Make a Difference?</h2>
          <p className="text-lg opacity-90">
            Join thousands of verified donors who are saving lives every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild variant="secondary">
              <Link href="/register">Start Donating Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
