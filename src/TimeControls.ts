import $ from "./$";
import * as Time from "./Time"

const $time = $<HTMLInputElement>("#time");
const $day = $<HTMLSelectElement>("#day");

window.addEventListener("load", () => {
    $time.value = Time.currentTimeString();
    
    $<HTMLButtonElement>(".form__time-input-adjustment", button => {
        const LONG_PRESS_ACTIVATION_TIME = 300;
        let longPress = 0;
        let longPressActivation = 0;
        let pressAction: () => void = () => {};
    
        button.addEventListener("mousedown", () => {
            const [ interval, unit ]: string[] = (button.getAttribute("amount") || ",s").split(",");
            if (!unit) return;
    
            if (unit == "r") {
                $time.value = Time.currentTimeString();
            } else {
                if (unit == "+s") {
                    pressAction = () => 
                        $time.value = Time.addTime($time.value, `00:00:${interval}`);
                } else if (unit == "+m") {
                    pressAction = () => 
                        $time.value = Time.addTime($time.value, `00:${interval}:00`);
                } else if (unit == "-s") {
                    pressAction = () => 
                        $time.value = Time.subtractTime($time.value, `00:00:${interval}`);
                } else if (unit == "-m") {
                    pressAction = () => 
                        $time.value = Time.subtractTime($time.value, `00:${interval}:00`);
                }
    
                pressAction();
    
                longPressActivation = setTimeout(() => 
                    longPress = setInterval(pressAction, 50),
                    LONG_PRESS_ACTIVATION_TIME
                );
    
            }
    
        });
    
        function releasePress() {
            if (longPressActivation) clearTimeout(longPressActivation);
            if (longPress) clearInterval(longPress);
        }
    
        button.addEventListener("mouseleave", releasePress);
        button.addEventListener("mouseup", releasePress);
    });
});

export function getDate() {
    const dayMs = 1000 * 60 * 60 * 24;
    const dayOffset = Number($day.value);
    const date = new Date(Time.parse($time.value) + dayOffset * dayMs);
    return date;
}

export function errorMessage(message: string) {
    const msg = document.createElement("span");
    msg.textContent = message;
    $("#time-errors").appendChild(msg);

    setTimeout(() => msg.remove(), 5000);
}