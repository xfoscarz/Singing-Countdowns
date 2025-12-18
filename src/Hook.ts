import $ from "./$";

const whatLaufeyCanCountDown = [
    "anything.",

    "a birthday.",
    "New Years!",
    "Christmas.",
    "your microwaved leftovers...",
    "the weekend!",
    "a classroom activity.",
    "the good old days.",
];

let randomInd = 0;

function randomItem() {
    randomInd++;

    if (randomInd == whatLaufeyCanCountDown.length) {
        randomInd = 0;
    }

    return whatLaufeyCanCountDown[randomInd];
}

const $hook = $("#hook");

function transition(text: string) {
    const currentContent = JSON.parse($hook.computedStyleMap().get("--after")?.toString() || "\"\"");
    $hook.style.setProperty("--before", JSON.stringify(currentContent));
    $hook.style.setProperty("--after", JSON.stringify(text));
    $hook.style.setProperty("--percent", "0");

    const deltaTime = 1000 / 60;
    let percent = 0;

    const easing: (x: number) => number =
        x => 0.5 * Math.sin(Math.PI * x - Math.PI / 2) + 0.5;

    const animation = setInterval(() => {
        percent += deltaTime;

        $hook.style.setProperty("--percent", String(easing(percent / 1000)));

        if (percent >= 1000) {
            clearInterval(animation);
            $hook.style.setProperty("--percent", "1");
        }
    }, deltaTime);
}

setInterval(() => {
    transition(randomItem());
}, 1000 * 5);