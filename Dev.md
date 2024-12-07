# Developer Instructions

## Technology Stack for Server Side

**Backend Framework:** Use Express.js with Node.js for the server-side framework.  
**Database:** Use MongoDB for storing user data, course content, and metadata.

## Implementing the Video Streaming System

### Use HLS (HTTP Live Streaming):

- **Segmentation:** Convert your videos into small .ts (Transport Stream) files.
- **Playlist:** Create an .m3u8 playlist file that points to these .ts segments.
- **Security:** Use signed URLs that expire after a certain time to control access. This can be implemented using a middleware in Express.js.

## Key Features to Implement

### User Authentication and Authorization

- Use JWT (JSON Web Tokens) for secure user sessions.

### Course Creation and Management

- Instructors can create courses and upload content.
- Store course metadata and content URLs in MongoDB.

### Payment Integration

- Use a payment gateway like Stripe to handle course payments.

### Access Control

- After payment, provide students with signed URLs that expire.
- Implement video playback limits using session tracking.

### Prevent Downloads

- Serve video content using HLS.
- Configure your media server to prevent direct downloads.

## Example Implementation Steps for Video Streaming

### Convert Videos to HLS

Use a tool like FFmpeg to convert videos into .ts segments and generate an .m3u8 playlist.  
Example FFmpeg command:
ffmpeg -i input.mp4 -hls_time 10 -hls_playlist_type vod output.m3u8

### Set Up Express Route for Serving HLS Content

1. Install the required dependencies:
   
```
const express = require('express');
const app = express();
const path = require('path');
const { sign, verify } = require('jsonwebtoken');

app.use('/videos', express.static(path.join(__dirname, 'videos')));

app.get('/generate-signed-url', (req, res) => {
  const videoPath = 'path/to/video.m3u8';
  const token = sign({ videoPath }, 'your-secret-key', { expiresIn: '3h' });
  res.json({ url: `/videos/${token}` });
});

app.get('/videos/:token', (req, res) => {
  const { token } = req.params;
  try {
    const { videoPath } = verify(token, 'your-secret-key');
    res.sendFile(path.join(__dirname, videoPath));
  } catch (error) {
    res.status(403).send('Unauthorized');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

Implement Frontend Video Player:

Use a React video player component like react-player to play the HLS streams.
```
import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }) => (
  <ReactPlayer url={url} controls playing />
);

export default VideoPlayer;
```
