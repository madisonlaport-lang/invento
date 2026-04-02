import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GuidedTour from "./components/GuidedTour";
import ItemManagement from "./components/ItemManagement";
import SmartPhotos from "./components/SmartPhotos";
import PDFReport from "./components/PDFReport";
import Templates from "./components/Templates";
import CloudStorage from "./components/CloudStorage";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <GuidedTour />
      <ItemManagement />
      <SmartPhotos />
      <PDFReport />
      <Templates />
      <CloudStorage />
      <Pricing />
      <Footer />
    </main>
  );
}
