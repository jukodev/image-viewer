import { useEffect, useState } from "react";
import "./App.css";
import { invoke } from "@tauri-apps/api/tauri";
import Draggable from "./components/Draggable";
import MainImage from "./components/Image";

function App() {
	const [imageSrc, setImageSrc] = useState("");
	const [error, setError] = useState(false);

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

	useEffect(() => {
		loadImage();
		window.addEventListener("wheel", event => event.preventDefault(), {
			passive: false,
		});
	}, []);

	return (
		<>
			{(error && <h2>Failed to load image</h2>) || (
				<Draggable>
					{imageSrc ? (
						<MainImage imageSrc={imageSrc} />
					) : (
						<p>Loading...</p>
					)}
				</Draggable>
			)}
		</>
	);
}

export default App;
