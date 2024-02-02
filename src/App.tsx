import { useEffect, useState } from "react";
import "./App.css";
import { invoke } from "@tauri-apps/api/tauri";
import Draggable from "./components/Draggable";
import MainImage from "./components/MainImage";
import { Slider } from "./components/ui/slider";
import {
	Menubar,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarItem,
	MenubarSeparator,
} from "./components/ui/menubar";
import { MenubarShortcut } from "./components/ui/menubar";

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
			<Menubar className="absolute top-0 left-0">
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							New Tab <MenubarShortcut>STRG+T</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>New Window</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Share</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Print</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Edit</MenubarTrigger>
					<MenubarContent>
						<MenubarItem onClick={() => setScale(1)}>
							Reset Zoom
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Convert</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>To PNG</MenubarItem>
						<MenubarItem>To JPEG</MenubarItem>
						<MenubarItem>To WEBP</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
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
