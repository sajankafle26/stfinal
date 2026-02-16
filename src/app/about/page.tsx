import About from '@/components/About'
import React from 'react'

function page() {
  return (
   <>
   <section className="bg-gray-100 py-12">
   <About/>
   <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
  Leading IT Training <br />
  <span className="text-sangalo-900">Institute in Nepal</span>
</h2>
    </section>
   </>
  )
}

export default page