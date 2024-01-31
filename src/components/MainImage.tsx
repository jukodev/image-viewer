import { FC, useState } from "react";

const MainImage: FC<ImageProps> = (props: ImageProps) => {
	const [scale, setScale] = useState(1);

	function onScroll(event: React.WheelEvent<HTMLImageElement>) {
		if (event.deltaY < 0) {
			setScale(scale => scale + 0.05);
		} else if (event.deltaY > 0) {
			setScale(scale => scale - 0.05);
		}

		setScale(scale => Math.max(0.05, scale));
		setScale(scale => Math.min(10, scale));
	}

	return (
		<img
			onWheel={onScroll}
			width={100 * scale + "%"}
			src={props.imageSrc}
			alt="Loaded"
		/>
	);
};

type ImageProps = {
	imageSrc: string;
};

export default MainImage;
