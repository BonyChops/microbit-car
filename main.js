let microBitBle,
  gpioPort = {};

async function connect() {
  microBitBle = await microBitBleFactory.connect();
  msg.innerHTML = "micro:bit BLE接続しました。";
  var gpioAccess = await microBitBle.requestGPIOAccess();
  var mbGpioPorts = gpioAccess.ports;
  gpioPort[0] = mbGpioPorts.get(0);
  gpioPort[1] = mbGpioPorts.get(1);
  gpioPort[2] = mbGpioPorts.get(2);
  gpioPort[8] = mbGpioPorts.get(8);
  await gpioPort[0].export("out"); //port0 out
  await gpioPort[1].export("out"); //port1 out
  await gpioPort[2].export("out"); //port1 out
  await gpioPort[8].export("out"); //port1 out
}

async function disconnect() {
  await microBitBle.disconnect();
  msg.innerHTML = "micro:bit BLE接続を切断しました。";
}

async function motorControl(motorCtrl) {
  if (motorCtrl === "fwd") {
    await gpioPort[0].write(1);
    await gpioPort[1].write(0);
    await gpioPort[2].write(1);
    await gpioPort[8].write(0);
  } else if (motorCtrl === "rev") {
    await gpioPort[0].write(0);
    await gpioPort[1].write(1);
    await gpioPort[2].write(0);
    await gpioPort[8].write(1);
  } else {
    await gpioPort[0].write(0);
    await gpioPort[1].write(0);
    await gpioPort[2].write(0);
    await gpioPort[8].write(0);
  }
  msg.innerHTML = "モーター駆動状態 : " + motorCtrl;
}
