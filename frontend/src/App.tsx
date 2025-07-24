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
			setEnableVid(false);
		} else {
			requestVideoStream();
			setEnableVid(true);
		}
	};

	const captureImage = () => {
		if (videoRef.current) {
			const video = videoRef.current;
			const canvas = document.getElementById("canvas") as HTMLCanvasElement;
			if (!canvas) return;
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			const context = canvas.getContext("2d");
			if (context) {
				context.drawImage(video, 0, 0, canvas.width, canvas.height);
				const dataURL = canvas.toDataURL("image/png");
				const preview = document.getElementById("preview") as HTMLImageElement;
				preview.src = dataURL;
			}
		}
	};

	const uploadImage = () => {
		const canvas = document.getElementById("canvas") as HTMLCanvasElement;

		const imageData = canvas.toDataURL("image/png");

		fetch("http://localhost:5000/predict", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ image: imageData }),
		})
			.then((res) => res.json())
			.then((data) => {
				alert(data);
			})
			.catch((err) => {
				console.error("Prediction error:", err);
			});
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
				<div className="inner-container">
					{enableVid && (
						<video
							autoPlay
							playsInline
							ref={videoRef}
							className={`${isLoading ? "skeleton" : "loaded"}`}
						/>
					)}
					<canvas id="canvas" style={{ display: "none" }} />
					<img id="preview" />
				</div>
				<div className="btns">
					<button
						onClick={() => {
							captureImage();
						}}>
						Capture
					</button>
					<button onClick={toggleVideoStream}>
						{enableVid ? "Disable" : "Enable"} Stream
					</button>
					<button disabled={false} onClick={uploadImage}>
						Predict
					</button>
				</div>
				<p>Predicted Number : ~</p>
			</div>
		</>
	);
}

export default App;
