import Footer from "@/components/Footer";
import LandingSection from "@/components/LandingSection";
import GamesSection from "@/components/GamesSection";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center gap-5 bg-mainBg-300 p-4 md:p-10 rounded-md w-full">
        <LandingSection />
        <GamesSection />
      </div>
      <Footer />
    </>
  );
}
