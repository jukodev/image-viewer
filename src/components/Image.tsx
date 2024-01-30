import { FC, useState } from "react";

const Image: FC<ImageProps> = (props: ImageProps) => {
	const [scale, setScale] = useState(1);

	function onScroll(event: React.WheelEvent<HTMLImageElement>) {
		if (scale <= 0.1) return;
		if (event.deltaY < 0) {
			setScale(scale => scale + 0.05);
		} else if (event.deltaY > 0) {
			setScale(scale => scale - 0.05);
		}
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

export default Image;
