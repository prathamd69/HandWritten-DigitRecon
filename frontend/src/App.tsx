import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
	const [vid, setVid] = useState<MediaStream | undefined>(undefined);
	const videoRef = useRef<HTMLVideoElement>(null);

	const [isLoading, setIsLoading] = useState(true);
	const [enableVid, setEnableVid] = useState(true);

	useEffect(() => {
		requestVideoStream();
	}, []);

	const requestVideoStream = () => {
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
	};

	const toggleVideoStream = () => {
		if (enableVid) {
			setVid(undefined);
			setEnableVid(false);
		} else {
			requestVideoStream();
			setEnableVid(true);
		}
	};

	useEffect(() => {
		if (videoRef.current && vid && enableVid) {
			videoRef.current.srcObject = vid;
		}
	}, [vid, enableVid]);

	return (
		<>
			<div className="container">
				<h1>Digit Recognition</h1>
				<div>
					{enableVid && (
						<video
							autoPlay
							playsInline
							ref={videoRef}
							className={`${isLoading ? "skeleton" : "loaded"}`}
						/>
					)}
					<img />
				</div>
				<button>Capture</button>
				<button onClick={toggleVideoStream}>
					{enableVid ? "Disable" : "Enable"} Stream
				</button>
				<p>Predicted Number : ~</p>
			</div>
		</>
	);
}

export default App;
