import VideoJS from '@/component/video/Video'

const HLS_SRC = 'https://ik.imagekit.io/ikmedia/example_video_train.mp4/ik-master.m3u8?tr=sr-360_480_720_1080'

export default function VideoPage() {
    const videoJsOptions = {
        controls: true,
        autoplay: true,
        muted: true,
        preload: 'auto',
        responsive: true,
        fluid: true,
        sources: [{
            src: HLS_SRC,
            type: 'application/x-mpegURL'
        }]
    }

    return (
        <main style={{ maxWidth: 960, width: '100%', margin: '2rem auto' }}>
            <h1 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Uma musume sample intro video</h1>
            <VideoJS options={videoJsOptions} />
        </main>
    )
}
