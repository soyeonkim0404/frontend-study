import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import "./ProgressArea.scss";
import { playMusic, stopMusic } from "../../store/musicPlayerReducer";
import music1 from "../../music/music-1.mp3";

function ProgressArea(props, ref) {
  const audio = useRef();
  const progressBar = useRef();
  const dispatch = useDispatch();
  const [currentTime, setcurrentTime] = useState("00:00");
  const [duration, setduration] = useState("00:00");
  useImperativeHandle(ref, () => ({
    play: () => {
      audio.current.play();
    },
    pause: () => {
      audio.current.pause();
    },
    changeVolume: (volume) => {
      audio.current.volume = volume;
    },
  }));

  const onPlay = () => {
    dispatch(playMusic());
  };

  const getTime = (time) => {
    const minutes = `0${parseInt(time / 60)}`;
    const seconds = `0${parseInt(time % 60)}`;
    return `${minutes}:${seconds.slice(-2)}`;
  };

  const onClickProgress = (event) => {
    const progressBarWidth = event.currentTarget.clientWidth;
    const offsetX = event.nativeEvent.offsetX;
    const duration = audio.current.duration;
    audio.current.currentTime = (offsetX / progressBarWidth) * duration;
  };

  const onTimeUpdate = (event) => {
    if (event.target.readyState === 0) return;
    const currentTime = event.target.currentTime;
    const duration = event.target.duration; // 총시간
    const progressBarWidth = (currentTime / duration) * 100;
    progressBar.current.style.width = `${progressBarWidth}%`;
    setcurrentTime(getTime(currentTime));
    setduration(getTime(duration));
  };

  const onPause = () => {
    dispatch(stopMusic());
  };
  return (
    <div className="progress-area" onMouseDown={onClickProgress}>
      <div className="progress-bar" ref={progressBar}>
        <audio
          autoPlay
          ref={audio}
          onPlay={onPlay}
          onTimeUpdate={onTimeUpdate}
          onPause={onPause}
          src={music1}
        />
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}

export default forwardRef(ProgressArea);
