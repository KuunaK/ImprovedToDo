import Header from "./components/Header";
import Hero from "./components/Hero";

const App = () => {
  return (
    <div className="bg-gradient-to-bl from-slate-900 to-slate-900 via-slate-800 h-screen text-slate-100">
      <Header />
      {/* Main Content Section */}
      <Hero />
    </div>
  );
};

export default App;
