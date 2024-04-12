import { useState } from "react";
import axios from "axios";

export default function useLoader(currentValue = true) {
  // call useState, "reserve piece of state"
  const [isLoading, setisLoading] = useState(currentValue);
  const toggleJoke = () => {
    setisLoading(currentValue => !currentValue);
  };

  // return piece of state AND a function to toggle it
  return [isLoading, toggleJoke];
}

export function useAxios() {
  const [jokes, setJokes] = useState([]);

  const addJokes = async (url) => {
    const response = await axios.get(url,{
      headers: {
        Accept: 'application/json'
      },
    });
    setJokes(joke => [ { ...response.data }]);
  };



  return {jokes,addJokes}

}
