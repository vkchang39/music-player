import React from "react";

const LibrarySong = ({ song, setCurrentSong, songs, id }) => {
	const songSelectHandler = () => {
		setCurrentSong(song);
	};
	return (
		<div onClick={songSelectHandler} className="library-song">
			<img src={song.cover} alt="cover" />
			<div className="song-description">
				<h3>{song.name}</h3>
				<h4>{song.artist} </h4>
			</div>
		</div>
	);
};

export default LibrarySong;