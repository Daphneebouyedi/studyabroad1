// app/page.js
import AnnonceCarteVue from "./_components/AnnonceCarteVue";

export default function Home() {
  return (
    <main>
      <div className="p-10">
        <AnnonceCarteVue categorie='Location'/>
      </div>
      </main>
  );
}
