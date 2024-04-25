import Navbar from "./components/Navbar";
// import Main from "./components/Main";
import Main from "./components/Main";
import Game from "./components/Game";
import AboutUs from "./components/AboutUs";

function App() {
  return (
    <>
      <div className="min-h-screen font-poppins">
        <Navbar />
        <Main />
        <Game />
        <AboutUs />
      </div>
    </>
  );
}

export default App;
