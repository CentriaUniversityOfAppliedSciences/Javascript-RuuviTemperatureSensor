function onInit() 
{
  var ow = new OneWire(5); 
  device = ow.search()[0];
  if (device===undefined)
        print("No OneWire devices found");
  
  var sensor = require("DS18B20").connect(ow);

  var Ruuvitag = require("Ruuvitag");
  Ruuvitag.setEnvOn(true);

  setInterval(function() 
  {
    var tempO = (sensor.getTemp().toFixed(1)*10);
    var humidity = (Ruuvitag.getEnvData().humidity.toFixed(0));
    var battery = NRF.getBattery().toFixed(2)*100;

    require("ble_eddystone").advertise("hel.io/"+tempO+""+""+humidity+""+battery);

  }, 1000);
}
save();