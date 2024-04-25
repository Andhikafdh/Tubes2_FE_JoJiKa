import SearchBar from "./SearchBar";
import { useState } from "react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import Loading from "./Loading";

type Methods = "DFS" | "IDS";

const Game = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [method, setMethod] = useState<Methods>("DFS");
  const [isLoading, setIsLoading] = useState(false);

  // const handleInput = () => {
  //   console.log(startLocation);
  //   console.log(endLocation);
  //   console.log(method);
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formattedStartLocation = startLocation.replace(/ /g, "_");
    const formattedEndLocation = endLocation.replace(/ /g, "_");

    setIsLoading(true);

    setTimeout(() => {}, 10000);

    const response =
      method === "DFS"
        ? await fetch(
            `http://localhost:8080/api/bfs?start=${formattedStartLocation}&end=${formattedEndLocation}`
          )
        : await fetch(
            `http://localhost:8080/api/ids?start=${formattedStartLocation}&end=${formattedEndLocation}`
          );

    const data = await response.json();
    console.log(data);

    setIsLoading(false);
  };

  return (
    <>
      <div className="h-screen bg-[rgb(255,91,25)] flex" id="Game">
        <div className="w-3/4 h-full border-r-2 border-r-white flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-3/4">
            <div className="text-center mx-auto mt-36">
              <h2 className="text-7xl text-black ml-10">Let's Race!</h2>
            </div>
            <div className="flex justify-between">
              <div className="w-96 mt-20 ml-10">
                <SearchBar onValueChange={(value) => setStartLocation(value)} />
              </div>
              <div className="w-96 mt-20 ml-36">
                <SearchBar onValueChange={(value) => setEndLocation(value)} />
              </div>
            </div>
            <div
              className="flex items-center justify-between p-4 text-[rgb(255,91,25)] bg-white rounded-lg shadow-md w-96 border-2 border-black mt-96 ml-64"
              id="method"
            >
              <div className="flex items-center space-x-4">
                <p className="font-semibold">DFS</p>
                <Switch
                  onCheckedChange={(checked) =>
                    setMethod(checked ? "IDS" : "DFS")
                  }
                />
                <p className="font-semibold">IDS</p>
              </div>
              <Button className="bg-black text-[rgb(255,91,25)] px-4 py-2 rounded">
                Go!
              </Button>
            </div>
          </form>
        </div>
        <div className="w-1/4 h-full flex items-center justify-center">
          {isLoading ? <Loading /> : null}
        </div>
      </div>
    </>
  );
};

export default Game;
