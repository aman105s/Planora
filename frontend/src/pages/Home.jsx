import React from 'react';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import AuthCTA from '../components/AuthCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <Experience />
      <Portfolio />
      <Process />
      <Testimonials />
      <AuthCTA />
      <Footer />
    </div>
  );
}
