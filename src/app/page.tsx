import CategoriesSection from "../components/main/CategoriesSection";

export default function Home() {
  return (
    <div>
      <h1 className="text-6xl">Welcome to Celestial Fusion</h1>
      <p>This website contains informations about Destiny PSOBB's new features, from items to quests, as well as guides to help players in need.</p>
      <CategoriesSection/>
    </div>
  );
}
