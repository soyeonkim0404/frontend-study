import "./App.scss";
import Controls from "./components/Controls/Controls";
import PlayList from "./components/PlayList/PlayList";
import ProgressArea from "./components/ProgrssArea/ProgressArea";
import SongDetail from "./components/SongDetail/SongDetail";
import React, { useRef } from "react";

function App() {
  const audioRef = useRef();
  const onPlay = () => {
    audioRef.current.play();
  };
  const onPause = () => {
    audioRef.current.pause();
  };
  const changeVolume = (volume) => {
    audioRef.current.changeVolume(volume);
  };
  return (
    <div className="App">
      <div className="container">
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls play={onPlay} pause={onPause} changeVolume={changeVolume} />
        <PlayList />
      </div>
    </div>
  );
}

export default App;
