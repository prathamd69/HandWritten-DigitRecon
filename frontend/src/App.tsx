import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
	const [vid, setVid] = useState<MediaStream | undefined>(undefined);
	const videoRef = useRef<HTMLVideoElement>(null);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then((stream) => {
				setVid(stream);
			})
			.catch((err) => {
				console.error("Camera access restricted", err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	useEffect(() => {
		if (videoRef.current && vid) {
			videoRef.current.srcObject = vid;
		}
	}, [vid]);

	return (
		<>
			<div className="container">
				<h1>Digit Recognition</h1>
				<div>
					<video
						autoPlay
						playsInline
						ref={videoRef}
						className={`${isLoading ? "skeleton" : "loaded"}`}
					/>
					<img />
				</div>
				<button>Capture</button>
				<p>Predicted Number : ~</p>
			</div>
		</>
	);
}

export default App;
