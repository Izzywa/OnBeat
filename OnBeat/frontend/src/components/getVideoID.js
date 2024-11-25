export default function getVideoID(url) {
    let videoID = '';
            if (url) {
                if (url.startsWith('https://www.youtube.com')) {
                    videoID = url.split('v=')[1].split('&')[0]
                } else {
                    videoID = url.split('.be/')[1].split('?')[0]
                }
            }
        return videoID
}