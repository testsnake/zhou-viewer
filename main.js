const flipSliderRainbow = isFlipped => {
    const element = document.querySelector('.sliderrainbow');
    if (!element) return;
    element.style.transform = isFlipped ? 'rotateY(180deg)' : '';
};

const slider = id => {
    const sliders = ["leftslider", "rightslider", "leftplusleft", "rightplusright", "inout", "outin"];
    sliders.forEach(slider => document.getElementById(slider).style.display = 'none');
    if (id >= 1 && id <= 6) {
        document.getElementById(sliders[id - 1]).style.display = 'block';
        flipSliderRainbow(id % 2 !== 0);
        document.querySelector('.sliderrainbow').style.filter = 'opacity(30%)';
    } else {
        document.querySelector('.sliderrainbow').style.filter = '';
    }
};

window.addEventListener("gamepadconnected", event => {
    let gamepad = event.gamepad;
    const intervalId = setInterval(() => {
        let rainbow = document.querySelector('.sliderrainbow');
        rainbow.style.display = gamepad ? 'block' : 'none';
        if (!gamepad) clearInterval(intervalId);
        gamepad = navigator.getGamepads()[gamepad.index];
        Array.from(gamepad.buttons).forEach((button, i) => {
            document.querySelectorAll(`#button-${i}, .button-${i}`).forEach(buttonElement => {
                const pressedElement = buttonElement.querySelector('.pressed');
                const unpressedElement = buttonElement.querySelector('.unpressed');
                const displayStyle = button.pressed ? 'block' : 'none';
                pressedElement.style.display = displayStyle;
                unpressedElement.style.display = displayStyle === 'block' ? 'none' : 'block';
            });
        });

        const buttonMap = {
            '1000': () => slider(1),
            '0100': () => slider(2),
            '0010': () => slider(1),
            '0001': () => slider(2),
            '1100': () => slider(5),
            '0110': () => slider(6),
            '0011': () => slider(5),
            '1010': () => slider(3),
            '0101': () => slider(4),
            '1001': () => slider(5),
            '0000': () => slider(0),
        };

        const buttonState = `${gamepad.buttons[4].pressed ? 1 : 0}${gamepad.buttons[5].pressed ? 1 : 0}${gamepad.buttons[6].pressed ? 1 : 0}${gamepad.buttons[7].pressed ? 1 : 0}`;

        try {
            buttonMap[buttonState]?.();
        } catch (e) {
            console.error(e);
            console.log(buttonState);
        }
    }, 1000/60);
});

document.addEventListener("DOMContentLoaded", () => slider(0));
