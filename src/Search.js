import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
export default function Search() {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  let url = `https://pixabay.com/api/?key=41271222-39fc4a9804779f5befddd0ae3&q=${search}&image_type=photo`;
  const [isSearching, setIsSearching] = useState(false);

  const SearchAPIGetFunction = async () => {
    setIsSearching(true);
    setSearchData([]);

    try {
      const response = await axios.get(url);

      if (response) {
        const data = response.data.hits.map((x, i) => {
          return {
            userImageURL: x.largeImageURL,
            id: x?.id,
            tags: x.tags,
          };
        });

        setSearchData(data);
        // setSearch("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearch("");
    } finally {
      setIsSearching(false);
    }
  };
  return (
    <div>
      {/* {JSON.stringify(search)} */}
      <div className="GoogleTitle">
        <span className="G">G</span>
        <span className="o">o</span>
        <span className="oo">o</span>
        <span className="g">g</span>
        <span className="l">l</span>
        <span className="e">e</span>
      </div>
      {/* {JSON.stringify(search)} */}
      <Input
        className="boxshow"
        placeholder="Search Google or type a pictures"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Button
        rightIcon={<IoIosSearch size={25} />}
        colorScheme="teal"
        variant="outline"
        className="btnR"
        isDisabled={search === ""}
        onClick={() => {
          // setSearch("");
          SearchAPIGetFunction();
        }}
      >
        Search
      </Button>

      <br />
      <br />
      <br />
      <div className="pictureView">
        {isSearching ? (
          <span className="mc">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </span>
        ) : searchData.length === 0 ? (
          <span className="mc">No results found.</span>
        ) : (
          searchData.map((e) => (
            <div key={e.id} className="column">
              <img src={e.userImageURL} alt={`User ${e.id}`} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
