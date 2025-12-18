import YoutubePlayer from "youtube-player"

const VIDEO_ID = "Ej8RhiSv2-4";

const player = YoutubePlayer("player", {
    "videoId": VIDEO_ID,
    "playerVars": {
        "controls": 0,
        "autoplay": 0,
        "loop": 0,
    },
});

player.setVolume(25);

export { player };