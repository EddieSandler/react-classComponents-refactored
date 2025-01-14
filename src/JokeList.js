import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

const JokeList = ({ numJokesToGet = 5 }) => {
    const [jokes, setJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getJokes();
    }, []); // Equivalent to componentDidMount

    const getJokes = async () => {
        try {
            let jokesArr = [];
            let seenJokes = new Set();

            while (jokesArr.length < numJokesToGet) {
                const res = await axios.get("https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                });
                const joke = res.data;

                if (!seenJokes.has(joke.id)) {
                    seenJokes.add(joke.id);
                    jokesArr.push({ ...joke, votes: 0 });
                } else {
                    console.log("duplicate found!");
                }
            }

            setJokes(jokesArr);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const generateNewJokes = () => {
        setIsLoading(true);
        getJokes();
    };

    const vote = (id, delta) => {
        setJokes(jokes =>
            jokes.map(j =>
                j.id === id ? { ...j, votes: j.votes + delta } : j
            )
        );
    };

    if (isLoading) {
        return (
            <div className="loading">
                <i className="fas fa-4x fa-spinner fa-spin" />
            </div>
        );
    }

    const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

    return (
        <div className="JokeList">
            <button className="JokeList-getmore" onClick={generateNewJokes}>
                Get New Jokes
            </button>
            {sortedJokes.map(j => (
                <Joke
                    text={j.joke}
                    key={j.id}
                    id={j.id}
                    votes={j.votes}
                    vote={vote}
                />
            ))}
        </div>
    );
};

export default JokeList;
