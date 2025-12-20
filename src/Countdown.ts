import $ from "./$";
import { player } from "./Player";
import { errorMessage, getDate } from "./TimeControls";

const timeCode = 60 + 60 + 27 + 0.35;

const $startBtn = $("#start");

$startBtn.addEventListener("click", () => {
    const targetDateTime = getDate();
    
    if (targetDateTime.getTime() <= Date.now()) {
        console.log("Too late!");
        errorMessage("Target time cannot be in the past");
    } else {
        const startTime = targetDateTime.getTime() - timeCode * 1000;

        console.log("Starting playback at", new Date(startTime));
    
        const poller = setInterval(async () => {
            if (Date.now() >= startTime) clearInterval(poller);
            else return;
    
            const offset = (Date.now() - startTime) / 1000;
            console.log(offset);
            player.setLoop(false);
            player.seekTo(offset, true);
            player.playVideo();
        });
    }
});