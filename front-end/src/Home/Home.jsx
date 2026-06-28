import { useState } from 'react';
import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import InteractiveDemo from '../components/home/InteractiveDemo';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import Faq from '../components/home/Faq';
import Footer from '../components/home/Footer';
import LoginOptionsModal from '../components/home/LoginOptionsModal';

export default function Home() {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative min-h-screen text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white bg-slate-50/40 overflow-x-hidden">
      
      {/* Cinematic Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Blob 1 */}
        <div className="absolute top-10 left-10 md:left-20 w-72 md:w-96 h-72 md:h-96 rounded-full bg-blue-300/20 blur-3xl animate-pulse duration-[8000ms]"></div>
        {/* Blob 2 */}
        <div className="absolute top-[40%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-indigo-200/20 blur-3xl animate-pulse duration-[10000ms]"></div>
        {/* Blob 3 */}
        <div className="absolute bottom-[20%] left-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-violet-200/20 blur-3xl animate-pulse duration-[12000ms]"></div>
      </div>

      {/* Navbar */}
      <Navbar onSignUpClick={() => setShowOptions(true)} />

      {/* Main content grid / stack */}
      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <Hero onGetStarted={() => setShowOptions(true)} />

        {/* Stats Panel */}
        <Stats />

        {/* Features Showcase */}
        <Features />

        {/* Live Drag-and-Drop / State interactive Workspace Demo */}
        <InteractiveDemo />

        {/* Testimonials */}
        <Testimonials />

        {/* FAQs Accordion */}
        <Faq />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sign Up / Login Options Dialog */}
      <LoginOptionsModal isOpen={showOptions} onClose={() => setShowOptions(false)} />
    </div>
  );
}
