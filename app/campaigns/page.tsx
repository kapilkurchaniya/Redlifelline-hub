"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Heart } from "lucide-react"
import { RequestCampaignModal } from "@/components/request-campaign-modal"
import { useRouter } from "next/navigation"

interface Campaign {
  id: number
  title: string
  image: string
  date: string
  time: string
  location: string
  description: string
  expectedDonors: number
}

const CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    title: "Save Lives Campaign 2025",
    image: "/blood-donation-campaign-drive.jpg",
    date: "December 15, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "RGPV University, Bhopal",
    description:
      "Join us for a mega blood donation drive at RGPV University. Help save up to 300 lives with your donation!",
    expectedDonors: 300,
  },
  {
    id: 2,
    title: "Emergency Blood Supply Drive",
    image: "/emergency-blood-donation.jpg",
    date: "December 20, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "Arera Colony Medical Center, Bhopal",
    description: "Critical blood shortage alert. We urgently need blood donors to support emergency medical cases.",
    expectedDonors: 150,
  },
  {
    id: 3,
    title: "Youth Blood Donation Marathon",
    image: "/youth-donation-marathon-event.jpg",
    date: "December 28, 2025",
    time: "8:00 AM - 6:00 PM",
    location: "City Sports Complex, Indore",
    description: "A youth-focused blood donation event combining fitness awareness with life-saving donations.",
    expectedDonors: 250,
  },
  {
    id: 4,
    title: "Corporate Social Responsibility Drive",
    image: "/corporate-blood-donation-event.jpg",
    date: "January 5, 2026",
    time: "9:30 AM - 4:00 PM",
    location: "IT Park, Bangalore",
    description:
      "Tech companies unite for blood donation. Part of our corporate wellness and community care initiative.",
    expectedDonors: 200,
  },
  {
    id: 5,
    title: "College Blood Donation Initiative",
    image: "/college-blood-donation-campaign.jpg",
    date: "January 10, 2026",
    time: "9:00 AM - 2:00 PM",
    location: "Delhi University Campus",
    description: "Students leading the way in blood donation. Raise awareness among young professionals.",
    expectedDonors: 180,
  },
  {
    id: 6,
    title: "Community Health & Blood Camp",
    image: "/community-health-blood-donation.jpg",
    date: "January 15, 2026",
    time: "7:00 AM - 7:00 PM",
    location: "Mumbai Civic Center",
    description: "Free health checkups with blood donation. Comprehensive wellness program for the community.",
    expectedDonors: 350,
  },
]

export default function CampaignsPage() {
  const [showRequestModal, setShowRequestModal] = useState(false)
  const router = useRouter()

  const handleDonateNow = () => {
    router.push("/register")
  }

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Blood Donation Campaigns</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Be part of our ongoing blood donation campaigns and make a real difference in your community. Every drop
            counts.
          </p>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CAMPAIGNS.map((campaign) => (
            <Card
              key={campaign.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:border-primary flex flex-col"
            >
              {/* Campaign Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <img
                  src={campaign.image || "/placeholder.svg"}
                  alt={campaign.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Campaign Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-2">{campaign.title}</h3>

                {/* Campaign Details */}
                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{campaign.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{campaign.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{campaign.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-accent" />
                    <span>{campaign.expectedDonors} expected donors</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{campaign.description}</p>

                {/* CTA Button */}
                <Button
                  onClick={handleDonateNow}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Donate Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Request Campaign CTA Section */}
        <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-accent/5 to-background border-2 border-primary/20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/5 rounded-full -ml-30 -mb-30"></div>

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-block p-3 bg-primary/10 rounded-lg">
              <Heart className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold">Request a Blood Donation Campaign</h2>
              <p className="text-muted-foreground text-lg">
                Request a blood donation campaign in your college, school, office, or locality. Help save lives in your
                community!
              </p>
            </div>

            <Button
              size="lg"
              onClick={() => setShowRequestModal(true)}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground rounded-full px-8"
            >
              Request a Campaign Today
            </Button>
          </div>
        </Card>

        {/* Why Join Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Heart className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">Save Lives</h3>
            <p className="text-sm text-muted-foreground">
              One donation can save up to 3 lives. Join our campaigns and make a real difference.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Users className="w-6 h-6 text-accent" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">Community Impact</h3>
            <p className="text-sm text-muted-foreground">
              Be part of a movement that connects communities and builds a stronger society.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">Stay Healthy</h3>
            <p className="text-sm text-muted-foreground">
              Regular blood donation has health benefits. Get free health checkups at our camps.
            </p>
          </Card>
        </div>
      </div>

      {/* Request Campaign Modal */}
      <RequestCampaignModal isOpen={showRequestModal} onClose={() => setShowRequestModal(false)} />
    </main>
  )
}
