import { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";

type Suggestion = {
  title: string;
  description?: string;
  thumbnail?: string;
};

type SearchBarProps = {
  onValueChange: Dispatch<SetStateAction<string>>;
};

const SearchBar = ({ onValueChange }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleClickSuggestions = (suggestion: Suggestion) => {
    setInputValue(suggestion.title);
    setSuggestions([]);
    onValueChange(suggestion.title);
  };

  useEffect(() => {
    if (inputValue) {
      axios
        .get(
          `https://en.wikipedia.org/w/api.php?origin=*&action=query&generator=prefixsearch&gpssearch=${inputValue}&gpslimit=5&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=50&format=json`
        )
        .then((response) => {
          const pages = response.data.query.pages;
          const newSuggestions = Object.keys(pages).map((key) => ({
            title: pages[key].title,
            description: pages[key].terms?.description?.[0],
            thumbnail: pages[key].thumbnail?.source,
          }));
          setSuggestions(newSuggestions);
        });
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <div className="relative">
      <Input
        className="border-2 border-black transition-colors w-full bg-white text-[#FF5B19] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none text-base"
        autoComplete="off"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
      />
      {isInputFocused && inputValue !== "" && (
        <div className="absolute top-full left-0 w-full z-10">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.title}
              className="flex space-x-2 w-full border-2 bg-white border-b-black border-x-black hover:bg-black group"
              onClick={() => handleClickSuggestions(suggestion)}
            >
              <img
                className="w-16 h-16 bg-[#E5E3D2]"
                src={
                  suggestion.thumbnail
                    ? suggestion.thumbnail
                    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                }
                alt={suggestion.title}
              />
              <div>
                <div className="font-bold text-black text-sm group-hover:text-[#FF5B19]">
                  {suggestion.title}
                </div>
                <div className="text-sm text-black group-hover:text-[#FF5B19]">
                  {suggestion.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
