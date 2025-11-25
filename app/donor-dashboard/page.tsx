"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Droplet, Bell, Calendar, Award, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-context"

export default function DonorDashboardPage() {
  const { userName, isLoggedIn, userEmail } = useAuth()
  const [donorName, setDonorName] = useState("")
  const [donorBloodType, setDonorBloodType] = useState("O+")
  const [donorCity, setDonorCity] = useState("Your City")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setDonorName(userData.userName || userData.fullName || userName || "Donor")
      setDonorBloodType(userData.bloodType || "O+")
      setDonorCity(userData.location || "Your City")
    } else {
      setDonorName(userName || "Donor")
    }
  }, [userName])

  const [notifications, setNotifications] = useState([
    { id: 1, type: "urgent", message: "O+ blood needed urgently at Central Hospital", time: "2 hours ago" },
    {
      id: 2,
      type: "reminder",
      message: "You are eligible to donate again. Schedule your appointment.",
      time: "1 day ago",
    },
    { id: 3, type: "info", message: "Thank you! Your last donation saved 3 lives.", time: "7 days ago" },
  ])

  const donationHistory = [
    { date: "Oct 15, 2025", location: "Central Blood Bank", units: 1, status: "Completed" },
    { date: "Jul 18, 2025", location: "Mobile Unit - Downtown", units: 1, status: "Completed" },
    { date: "Apr 22, 2025", location: "Central Blood Bank", units: 1, status: "Completed" },
  ]

  const nextEligibleDate = new Date(Date.now() + 56 * 24 * 60 * 60 * 1000)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {donorName}!</h1>
            <p className="text-muted-foreground">Your donor dashboard</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-2 border-primary/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-muted-foreground">Total Donations</h3>
                <Droplet className="w-5 h-5 text-primary fill-primary" />
              </div>
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground">Lives saved: 9</p>
            </div>
          </Card>

          <Card className="p-6 border-2 border-accent/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-muted-foreground">Eligibility Status</h3>
                <Award className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold text-accent">Eligible</p>
              <p className="text-sm text-muted-foreground">
                Next donation possible: {nextEligibleDate.toLocaleDateString()}
              </p>
            </div>
          </Card>

          <Card className="p-6 border-2 border-primary/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-muted-foreground">Blood Type</h3>
                <Droplet className="w-5 h-5 text-primary fill-primary" />
              </div>
              <p className="text-3xl font-bold text-primary">{donorBloodType}</p>
              <p className="text-sm text-muted-foreground">Common type, high demand</p>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Urgent Alert */}
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary rounded-lg">
                  <Bell className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Urgent Blood Request</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    O+ blood is urgently needed at Central Hospital for an emergency patient.
                  </p>
                  <Button className="bg-primary hover:bg-accent text-primary-foreground" size="sm">
                    Respond Now
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-accent/20">
              <h2 className="text-xl font-bold mb-4">Your Profile</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold">{donorName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p className="font-semibold">{donorBloodType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-semibold">{donorCity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold text-accent">Verified</p>
                </div>
              </div>
            </Card>

            {/* Donation History */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Recent Donations</h2>
              <div className="space-y-3">
                {donationHistory.map((donation, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">{donation.date}</p>
                        <p className="text-xs text-muted-foreground">{donation.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{donation.units} unit</p>
                      <p className="text-xs text-primary">{donation.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Schedule Appointment */}
            <Card className="p-6 border-2 border-primary/20">
              <h2 className="text-xl font-bold mb-4">Schedule Your Next Donation</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-border rounded-md bg-background" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Location</label>
                  <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                    <option>Central Blood Bank</option>
                    <option>Mobile Unit - Downtown</option>
                    <option>Hospital A</option>
                  </select>
                </div>
                <Button className="w-full bg-primary hover:bg-accent text-primary-foreground">
                  Schedule Appointment
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div>
            {/* Notifications */}
            <Card className="p-6 h-fit">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </h2>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="flex gap-2 mb-1">
                      <div
                        className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                          notif.type === "urgent"
                            ? "bg-primary"
                            : notif.type === "reminder"
                              ? "bg-accent"
                              : "bg-muted-foreground"
                        }`}
                      />
                      <p className="text-xs font-medium text-muted-foreground">{notif.time}</p>
                    </div>
                    <p className="text-xs text-foreground">{notif.message}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Donor Stats */}
            <Card className="p-6 mt-6">
              <h2 className="text-lg font-bold mb-4">Your Impact</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Lives Saved</span>
                  <span className="text-xl font-bold text-primary">9</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: "60%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">You're in the top 15% of donors!</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
