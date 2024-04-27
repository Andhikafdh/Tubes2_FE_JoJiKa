import SearchBar from "./SearchBar";
import { useState } from "react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import Loading from "./Loading";

type Methods = "bfs" | "ids";

type Data = {
  path: ShowPage[];
  time: number;
} | null;

type ShowPage = {
  title: string;
  thumbnail: string;
  link: string;
};

const Game = () => {
  const [data, setData] = useState<Data>(null);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [method, setMethod] = useState<Methods>("bfs");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formattedStartLocation = startLocation.replace(/ /g, "_");
    const formattedEndLocation = endLocation.replace(/ /g, "_");

    setIsLoading(true);
    // console.log(method, formattedStartLocation, formattedEndLocation);

    try {
      const response = await fetch(
        `http://localhost:8080/api?method=${method}&start=${formattedStartLocation}&end=${formattedEndLocation}`
      );

      const data = await response.json();

      // add the first page to the path

      const updatedPath = method === "ids" ? [formattedStartLocation] : [];
      updatedPath.push(...data.path);

      const promises = updatedPath.map(async (url: string) => {
        const title = url.split("/wiki/").pop()?.replace(/_/g, "_");
        // console.log(title);
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=pageimages|pageterms&titles=${title}&pithumbsize=50`
        );
        const json = await res.json();
        const pageId = Object.keys(json.query.pages)[0];
        const page = json.query.pages[pageId];
        return {
          title: page.title,
          thumbnail: page.thumbnail
            ? page.thumbnail.source
            : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
          link: `https://en.wikipedia.org/wiki/${title}`,
        };
      });

      const pages = await Promise.all(promises);
      setData({ path: pages, time: data.time });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
                <p className="font-semibold">BFS</p>
                <Switch
                  onCheckedChange={(checked) =>
                    setMethod(checked ? "ids" : "bfs")
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
        <div className="w-1/4 h-5/6 flex items-center justify-center mt-10 ">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="mt-20 ml-4 w-64 overflow-y-auto max-h-screen">
                {data && (
                  <>
                    <h3 className="text-black text-3xl">Result: </h3>
                    {data.path.map((page, index) => (
                      <a
                        key={index}
                        className="flex items-center space-x-4 bg-black mb-2 p-1 rounded group"
                        href={page.link}
                        target="_blank"
                      >
                        {page.thumbnail && (
                          <img
                            src={page.thumbnail}
                            alt={page.title}
                            className="w-10 h-10"
                          />
                        )}
                        <p className="text-[rgb(255,91,25)]">{page.title}</p>
                      </a>
                    ))}
                    <p>Exec time: {data.time}</p>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Game;
