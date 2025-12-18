import $ from "./$";
import * as Time from "./Time"

const $time = $<HTMLInputElement>("#time");

window.addEventListener("load", () => {
    $time.value = Time.currentTimeString();
    
    $<HTMLButtonElement>(".time-adjust", button => {
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