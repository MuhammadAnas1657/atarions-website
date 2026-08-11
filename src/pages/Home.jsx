import { Suspense, lazy } from "react";
import Seo from "../components/Seo";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import Hero from "../features/Hero";
import StatsBar from "../features/StatsBar";
import Approach from "../features/Approach";
import Services from "../features/Services";
import LazyMount from "../components/LazyMount";
import SectionErrorBoundary from "../components/SectionErrorBoundary";

// Below-the-fold sections are code-split so the initial bundle only pays
// for what's visible first, and each is wrapped in LazyMount so it doesn't
// even mount (run its animations/effects) until it's about to scroll into
// view — these load and animate in parallel while the user reads the
// hero/services above, not all at once on page load. Each section also
// gets its own error boundary + Suspense so one failed chunk (bad network,
// missing asset) can't take down the sections around it.
const Industries = lazy(() => import("../features/Industries"));
const Process = lazy(() => import("../features/Process"));
const EcosystemWheel = lazy(() => import("../features/EcosystemWheel"));
const Projects = lazy(() => import("../features/Projects"));
const Team = lazy(() => import("../features/Team"));
const Testimonials = lazy(() => import("../features/Testimonials"));
const Blog = lazy(() => import("../features/Blog"));
const Contact = lazy(() => import("../features/Contact"));

function DeferredSection({ children }) {
  return (
    <SectionErrorBoundary>
      <Suspense fallback={null}>
        <LazyMount>{children}</LazyMount>
      </Suspense>
    </SectionErrorBoundary>
  );
}

export default function Home() {
  return (
    <div className="bg-void">
      <Seo
        description="Atarion Solutions builds secure, accessible, and intelligent software — blending creativity with technical excellence across web, AI, and data."
        path="/"
      />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Approach />
        <Services />
        <DeferredSection><Industries /></DeferredSection>
        <DeferredSection><Process /></DeferredSection>
        <DeferredSection><EcosystemWheel /></DeferredSection>
        <DeferredSection><Projects /></DeferredSection>
        <DeferredSection><Team /></DeferredSection>
        <DeferredSection><Testimonials /></DeferredSection>
        <DeferredSection><Blog /></DeferredSection>
        <DeferredSection><Contact /></DeferredSection>
      </main>
      <Footer />
    </div>
  );
}
