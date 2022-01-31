console.log('Hello world!');


const container = document.getElementsByClassName('container')[0];
const [hoursRow, minutesRow, secondsRow] = container.children;

const setBinary = (row, decimalValue) => {
  const children = [...row.children];
  const lights = children.slice(0, row.children.length - 2);
  const displayValue = children[row.children.length - 1];
  const binaryString = decimalValue.toString(2 /* base */);
  // go backwards in-case there aren't enough lights
  displayValue.innerText = `${decimalValue} (${binaryString})`;
  for (let i = lights.length - 1; i >= 0; i--) {
    const binaryStringIndex = binaryString.length - (lights.length - i);
    const isOn = binaryStringIndex >= 0 && binaryString[binaryStringIndex] === '1';
    const light = lights[i].classList;
    light.remove('on', 'off');
    light.add(isOn ? 'on' : 'off');
  }
}

const updateTime = () => {
  // e.g. '9:37:04 PM'
  const time = new Date().toLocaleTimeString();
  const [, hours, minutes, seconds ] = time.match(/^(\d+):(\d+):(\d+)/);
  setBinary(hoursRow, parseInt(hours, 10));
  setBinary(minutesRow, parseInt(minutes, 10));
  setBinary(secondsRow, parseInt(seconds, 10));
}

updateTime();
window.setInterval(updateTime, 1000);
