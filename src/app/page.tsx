import About from '@/components/About'
import Blog from '@/components/Blog'
import ContactForm from '@/components/ContactForm'
import Hero from '@/components/Hero'
import InternshipHub from '@/components/InternshipHub'
import Products from '@/components/Products'
import Programs from '@/components/Programs'
import React from 'react'
import SuccessGallery from '@/components/SuccessGallery'
import TechStack from '@/components/TechStack'
import Testimonials from '@/components/Testimonials'
import TrustedBy from '@/components/TrustedBy'
import UpcomingBatches from '@/components/UpcomingBatches'
import VideoMarketplace from '@/components/VideoMarketplace'
import WhyJoin from '@/components/WhyJoin'

function page() {
  return (
    <>
      <Hero />
      <UpcomingBatches />
      <About />
      <Programs />
      <WhyJoin />
      <VideoMarketplace />
      <InternshipHub />
      <SuccessGallery />
      <TechStack />
      <Products />
      <Testimonials />
      <Blog />
      <ContactForm />
      <TrustedBy />
    </>
  )
}

export default page