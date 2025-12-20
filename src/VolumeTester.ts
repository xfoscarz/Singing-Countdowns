import $ from "./$";
import { player } from "./Player";

const $modals = $(".modals");
const $volumeTesterModal = $("#volume-tester");

$("#volume-test").addEventListener("click", async () => {
    $volumeTesterModal.style.display = "flex";
    $modals.classList.add("active");
    $("#slider").style.setProperty("--progress", (await player.getVolume() / 100).toString());
    player.pauseVideo();
    player.seekTo(0, true);
    player.setLoop(true);
});

$("#close-modal").addEventListener("click", () => {
    player.pauseVideo();
    player.setLoop(false);
    $volumeTesterModal.style.display = "none";
    $modals.classList.remove("active");
    $("#test-play").classList.remove("slider__play--playing");
});

$("#test-play").addEventListener("click", event => {
    const btn = event.target as HTMLDivElement;
    if (btn.classList.contains("slider__play--playing")) {
        player.pauseVideo();
        btn.classList.remove("slider__play--playing");
    } else {
        player.playVideo();
        btn.classList.add("slider__play--playing");
    }
});

const drag = {
    dragging: false,
    
    setter(event: MouseEvent) {
        drag.dragging = true;
        drag.handle(event);
    },

    unsetter(_event: MouseEvent) {
        drag.dragging = false;
    },

    handle(event: MouseEvent) {
        if (!drag.dragging) return;
        let w2;
        const { x, width: w1 } = $(".slider__fill").getBoundingClientRect();
        w2 = $(".slider__track").getBoundingClientRect().width;

        const progress = (event.clientX - x) / (w1 + w2);
        
        $("#slider").style.setProperty("--progress", progress.toString());
        player.setVolume(progress * 100);
    }
};

$(".slider__fill").addEventListener("mousedown", drag.setter);
$(".slider__thumb").addEventListener("mousedown", drag.setter);
$(".slider__track").addEventListener("mousedown", drag.setter);

window.addEventListener("mouseup", drag.unsetter);
window.addEventListener("mousemove", drag.handle);