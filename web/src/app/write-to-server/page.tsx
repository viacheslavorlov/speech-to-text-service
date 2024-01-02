'use client';

import React, { useState } from 'react';
import {AudioRecorder} from 'react-audio-voice-recorder';
import axios from 'axios';

const RecorderComponent = () => {
	const [audioData, setAudioData] = useState(null);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);

	const handleAudioData = (data: any) => {
		setAudioData(data);
	};

	const handleSubmit = async () => {
		try {
			const response = await axios.post('http://localhost:4000/recognize', audioData, {
				headers: {
					'Content-Type': 'audio/wav',
				},
			});
			setResult(response.data);
		} catch (error: any) {
			setError(error.message);
		}
	};
	return (
		<div>
			<AudioRecorder onRecordingComplete={handleAudioData} />
			<button onClick={handleSubmit}>Submit</button>
			{result && <p>{result}</p>}
			{error && <p>{error}</p>}
		</div>
	);
};

export default RecorderComponent
