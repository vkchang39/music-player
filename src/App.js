import { useRef, useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
	const audioRef = useRef(null);

	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		animationPercentage: 0,
	});
	const [libraryStatus, setLibraryStatus] = useState(false);

	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		const roundedCurrent = Math.round(current);
		const roundedDuration = Math.round(duration);
		const animationPercentage = Math.round(
			(roundedCurrent / roundedDuration) * 100
		);
		setSongInfo({
			...songInfo,
			currentTime: current,
			duration,
			animationPercentage,
		});
	};

	const songEndHandler = async () => {
		let currentIndex = songs.findIndex((s) => s.id === currentSong.id);
		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		if (isPlaying) audioRef.current.play();
	};
	return (
		<div className={`App ${libraryStatus ? "library-active" : ""}`}>
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} />
			<Player
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				audioRef={audioRef}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				songs={songs}
				setCurrentSong={setCurrentSong}
				setSongs={setSongs}
			/>
			<Library
				songs={songs}
				setCurrentSong={setCurrentSong}
				audioRef={audioRef}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				setSongs={setSongs}
				libraryStatus={libraryStatus}
			/>
			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				onEnded={songEndHandler}
				ref={audioRef}
				src={currentSong.audio}
			></audio>
		</div>
	);
}

export default App;
