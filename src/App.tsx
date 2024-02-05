import { useEffect, useState } from "react";
import "./App.css";
import { invoke } from "@tauri-apps/api/tauri";
import Draggable from "./components/Draggable";
import MainImage from "./components/MainImage";
import { Slider } from "./components/ui/slider";
import { Menubar } from "./components/Menubar";

function App() {
	const [imageSrc, setImageSrc] = useState("");
	const [error, setError] = useState(false);
	const [scale, setScale] = useState(1);

	async function loadImage() {
		try {
			const base64Image: React.SetStateAction<string> = await invoke(
				"read_image"
			);
			setImageSrc(base64Image);
		} catch (error) {
			console.error("Failed to load image", error);
			setError(true);
		}
	}

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key === "ArrowRight" && !e.repeat) {
			changeImage("next_image");
		} else if (e.key === "ArrowLeft" && !e.repeat) {
			changeImage("prev_image");
		}
	}

	async function changeImage(command: string) {
		try {
			const base64Image: React.SetStateAction<string> = await invoke(
				command
			);
			setImageSrc(base64Image);
		} catch (error) {
			console.error("Failed to load image", error);
			setError(true);
		}
	}

	useEffect(() => {
		loadImage();
		window.addEventListener("wheel", event => event.preventDefault(), {
			passive: false,
		});
		window.addEventListener("keydown", handleKeyPress);
	}, []);

	return (
		<>
			{(error && <h2>Failed to load image</h2>) || (
				<Draggable>
					{imageSrc ? (
						<MainImage
							scale={scale}
							setScale={val => {
								setScale(val);
								console.log("val", val);
							}}
							imageSrc={imageSrc}
						/>
					) : (
						<p>Loading...</p>
					)}
				</Draggable>
			)}
			<Menubar />
			<Slider
				defaultValue={[1]}
				value={[scale]}
				max={10}
				step={0.05}
				min={0.05}
				className="absolute bottom-0 right-0 w-1/4 mx-4 mb-4"
				onValueChange={val => setScale(val[0])}
			/>
		</>
	);
}

export default App;
