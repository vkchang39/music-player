import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from "@fortawesome/free-solid-svg-icons";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
const Player = ({
	currentSong,
	isPlaying,
	setIsPlaying,
	audioRef,
	songInfo,
	setSongInfo,
	songs,
	setCurrentSong,
	setSongs,
}) => {
	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};

	const activeLibraryHandler = (nextprev) => {
		const newSongs = songs.map((s) =>
			s.id === nextprev.id ? { ...s, active: true } : { ...s, active: false }
		);
		setSongs(newSongs);
	};

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const skipTrackHandler = async (direction) => {
		let currentIndex = songs.findIndex((s) => s.id === currentSong.id);
		if (direction === "skip-forward") {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
			if (isPlaying) audioRef.current.play();
		}
		if (direction === "skip-back") {
			if ((currentIndex - 1) % songs.length === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				activeLibraryHandler(songs[songs.length - 1]);
				if (isPlaying) audioRef.current.play();
				return;
			}
			await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
			activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
		}
		if (isPlaying) audioRef.current.play();
	};

	const trackAnim = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	};
	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<div
					style={{
						background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
					}}
					className="track"
				>
					<input
						min={0}
						max={songInfo.duration || 0}
						onChange={dragHandler}
						value={songInfo.currentTime}
						type="range"
					/>
					<div style={trackAnim} className="animate-track"></div>
				</div>
				<p>{songInfo.duration ? getTime(songInfo.duration) : "0.00"}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-back")}
					className="skip-back"
					size="2x"
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					className="play"
					onClick={playSongHandler}
					size="2x"
					icon={isPlaying ? faPause : faPlay}
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-forward")}
					className="skip-forword"
					size="2x"
					icon={faAngleRight}
				/>
			</div>
		</div>
	);
};

export default Player;
