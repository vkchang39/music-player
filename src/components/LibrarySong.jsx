import React from "react";

const LibrarySong = ({
	song,
	setCurrentSong,
	songs,
	audioRef,
	isPlaying,
	setSongs,
}) => {
	const songSelectHandler = async () => {
		await setCurrentSong(song);
		const newSongs = songs.map((s) =>
			s.id === song.id ? { ...s, active: true } : { ...s, active: false }
		);
		setSongs(newSongs);
		if (isPlaying) audioRef.current.play();
	};
	return (
		<div
			onClick={songSelectHandler}
			className={`library-song ${song.active ? "selected" : ""}`}
		>
			<img src={song.cover} alt="cover" />
			<div className="song-description">
				<h3>{song.name}</h3>
				<h4>{song.artist} </h4>
			</div>
		</div>
	);
};

export default LibrarySong;
