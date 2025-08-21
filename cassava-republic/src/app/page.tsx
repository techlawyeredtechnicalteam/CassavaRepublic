import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LatestTitle from "@/components/LatestTitle";
import ForthcomingTitle from "@/components/ForthcomingTitle";
import Categories from "@/components/Cateogries";
import PrideCollection from "@/components/PrideCollection";
import NonFiction from "@/components/NonFiction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <LatestTitle />
        <ForthcomingTitle />
        <PrideCollection />
        <NonFiction />
        <Footer />       
      </main>
    </>
  );
}
// This is the main page of the application, which includes the Header, Hero section, and Forthcoming Titles.
