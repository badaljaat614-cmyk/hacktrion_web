import WhatIsHacktrion from "@/components/home/WhatIsHacktrion"
import Hero from "../components/home/Hero"
import WhyHacktrion from "@/components/home/WhyHacktrion"
import HowItWorks from "@/components/home/HowItWorks"
import FeaturedExperience from "@/components/home/FeaturedExperience"
import Faq from "@/components/home/Faq"
export default function Home(){
  return (
    <div>
      <Hero />
      <WhatIsHacktrion/>
      <WhyHacktrion/>
      <HowItWorks/>
      <FeaturedExperience/>
      <Faq/>
    </div>
  )
}