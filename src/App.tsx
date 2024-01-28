import { useEffect, useState } from "react";
import "./App.css";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
	const [imageSrc, setImageSrc] = useState("");

	async function loadImage() {
		try {
			const base64Image: React.SetStateAction<string> = await invoke(
				"read_image",
				{
					filePath:
						"C:\\Users\\theju\\Pictures\\Screenshots\\gumos.png",
				}
			);
			setImageSrc(base64Image);
		} catch (error) {
			console.error("Failed to load image", error);
		}
	}

	useEffect(() => {
		loadImage();
	}, []);

	return (
		<div>
			{imageSrc ? <img src={imageSrc} alt="Loaded" /> : <p>Loading...</p>}
		</div>
	);
}

export default App;
