import { useEffect, useState, useRef } from "react";
import "./App.css";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
	const [imageSrc, setImageSrc] = useState("");
	const [scale, setScale] = useState(1);
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const imageRef = useRef<HTMLImageElement>(null);

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

	function onMove(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
		if (event.buttons !== 1) return;
		const x = event.clientX - pos.x;
		const y = event.clientY - pos.y;
		imageRef.current!.style.transform = `translate(${x}px, ${y}px)`;
		setPos({ x, y });
	}

	useEffect(() => {
		loadImage();
	}, []);

	return (
		<div>
			{imageSrc ? (
				<img
					ref={imageRef}
					onWheel={onScroll}
					width={100 * scale + "%"}
					src={imageSrc}
					alt="Loaded"
					onMouseDown={event => {
						setPos({ x: event.clientX, y: event.clientY });
					}}
					onMouseMove={onMove}
				/>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

export default App;
