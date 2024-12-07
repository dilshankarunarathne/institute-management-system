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
