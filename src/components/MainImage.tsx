import { FC } from "react";

const MainImage: FC<ImageProps> = (props: ImageProps) => {
	function onScroll(event: React.WheelEvent<HTMLImageElement>) {
		let newScale = props.scale + event.deltaY / -2000;

		newScale = Math.max(0.05, newScale);
		newScale = Math.min(10, newScale);
		props.setScale(newScale);
	}

	return (
		<>
			<img
				onWheel={onScroll}
				width={100 * props.scale + "%"}
				max-width="1000%"
				src={props.imageSrc}
				alt="Loaded"
			/>
		</>
	);
};

type ImageProps = {
	imageSrc: string;
	scale: number;
	setScale: (scale: number) => void;
};

export default MainImage;
