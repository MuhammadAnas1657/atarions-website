import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Seo from "../components/Seo";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import AmbientBlobs from "../components/AmbientBlobs";

export default function NotFound() {
  return (
    <div className="bg-void">
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist or has moved." noIndex />
      <Navbar />
      <main>
        <section className="relative bg-void py-40 overflow-hidden">
          <AmbientBlobs />
          <div className="relative max-w-2xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold tracking-widest text-pulse uppercase mb-4">
              404
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-cloud">
              This page went missing
            </h1>
            <p className="mt-4 text-cloud-dim">
              The page you're looking for doesn't exist or has moved.
            </p>
            <Link
              to="/"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_24px_2px_rgba(108,79,240,0.5)] hover:bg-electric/90"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
