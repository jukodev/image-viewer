import { FC, useRef, useState } from "react";

const Draggable: FC<DraggableProps> = ({ children }) => {
	const [pos, setPos] = useState<Vector2>({ x: 0, y: 0 });
	const [lastPos, setLastPos] = useState<Vector2>({ x: 0, y: 0 });
	const translateRef = useRef<HTMLImageElement>(null);

	function onMouseMove(
		event: React.MouseEvent<HTMLImageElement, MouseEvent>
	) {
		if (event.buttons !== 1) return;
		const x = pos.x + event.clientX - lastPos.x;
		const y = pos.y + event.clientY - lastPos.y;
		translateRef.current!.style.transform = `translate(${x}px, ${y}px)`;
		setPos({ x, y });
		setLastPos({ x: event.clientX, y: event.clientY });
	}

	function onMouseDown(
		event: React.MouseEvent<HTMLImageElement, MouseEvent>
	) {
		setLastPos({ x: event.clientX, y: event.clientY });
	}

	return (
		<div
			onMouseMove={onMouseMove}
			onMouseDown={onMouseDown}
			ref={translateRef}>
			{children}
		</div>
	);
};

export default Draggable;

type DraggableProps = {
	children: React.ReactNode;
};

type Vector2 = {
	x: number;
	y: number;
};
