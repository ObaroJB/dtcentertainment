import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tickets from "@/components/Tickets";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Tickets />
      <div id="team">
        <Team />
      </div>
      <Footer />
    </>
  );
}
