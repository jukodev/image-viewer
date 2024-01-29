import { useEffect, useState } from "react";
import "./App.css";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
	const [imageSrc, setImageSrc] = useState("");
	const [scale, setScale] = useState(1);
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [posOnClick, setPosOnClick] = useState({ x: 0, y: 0 });

	async function loadImage() {
		try {
			const base64Image: React.SetStateAction<string> = await invoke(
				"read_image"
			);
			setImageSrc(base64Image);
		} catch (error) {
			console.error("Failed to load image", error);
		}
	}

	function onScroll(event: React.WheelEvent<HTMLImageElement>) {
		if (scale <= 0.1) return;
		if (event.deltaY < 0) {
			setScale(scale => scale + 0.05);
		} else if (event.deltaY > 0) {
			setScale(scale => scale - 0.05);
		}
		console.log(scale);
	}

	function onMouseDown(event: React.MouseEvent<HTMLImageElement>) {
		setPosOnClick({ x: event.clientX, y: event.clientY });
	}

	function onMouseUp(event: React.MouseEvent<HTMLImageElement>) {
		const newPos = {
			x: pos.x + event.clientX - posOnClick.x,
			y: pos.y + event.clientY - posOnClick.y,
		};
		setPos(newPos);
	}

	useEffect(() => {
		loadImage();
	}, []);

	return (
		<div>
			{imageSrc ? (
				<img
					onWheel={onScroll}
					width={100 * scale + "%"}
					src={imageSrc}
					alt="Loaded"
					style={{ transform: `translate(${pos.x}, ${pos.y})` }}
					onMouseDown={onMouseDown}
					onMouseUp={onMouseUp}
				/>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

export default App;
