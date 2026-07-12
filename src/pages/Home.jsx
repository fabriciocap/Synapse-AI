import React from "react";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import HowItWorks from "@/components/HowItWorks";
import Team from "@/components/Team";
import Demo from "@/components/Demo";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Problems />
      <HowItWorks />
      <Team />
      <Demo />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTASection />
    </>
  );
}
