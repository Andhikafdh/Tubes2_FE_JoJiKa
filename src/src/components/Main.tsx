import WikipediaIcon from "./WikipediaIcon";
import { Link } from "react-scroll";

const Main = () => {
  return (
    <>
      <div className="container border-x-2 h-[calc(100vh-80px)] border-black mx-10">
        <div className="w-1/2 flex flex-col items-center h-full justify-center">
          <h2 className="text-6xl leading-loose mb-20">
            MAKE{" "}
            <span className="bg-[rgb(255,91,25)] text-black px-4">
              WIKIRACE
            </span>{" "}
            GREAT AGAIN
          </h2>
          <ul className="flex space-x-10 text-xl mt-10">
            <li>
              <p className=" hover:underline cursor-pointer">
                <a href="#About">About us</a>
              </p>
            </li>
            <li>
              <p className="hover:underline cursor-pointer">
                <Link to="Game" smooth={true} spy={true} duration={500}>
                  Wikirace
                </Link>
              </p>
            </li>
          </ul>
        </div>
        <div className="absolute top-80 right-56">
          <WikipediaIcon />
        </div>
      </div>
    </>
  );
};

export default Main;
