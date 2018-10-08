var app = require('express')();
var server = require('http').Server(app);

server.listen(4567);

var Papa = require('papaparse');
var fs = require('fs');

var bigFile = fs.readFileSync('./Data+campus_challenge_FINAL/Individuals-Table 1.csv').toString().split('\n');

var bigObject = {
  users: []
};

/*for (var i = 0; i < bigFile.length; i+27) {
  for (var j = 0; j < 27; j++) {
    if (bigFile[i].split(',')[0] == '1000') {
      bigObject.users.push(bigFile[i]);
    }
  }
}*/
// console.log(bigObject);

// console.log(bigFile[0]);

var file = fs.readFileSync('./Data+campus_challenge_FINAL/Individuals-Table 1.csv').toString();
var today = new Date();

Papa.parse(file, {
  header: true,
	complete: function(results) {
    var test = { 
      updated: (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear(),
    };

    for (var i = 0; i < results.data.length; i++) {
      if (results.data[i].Indnum == '1') {
        var activity = results.data[i].Activity;

        test.User = results.data[i].Indnum;

        test[activity] = {
          'Group': results.data[i].Group,
          'Activity': activity,
          'Units': results.data[i].Units,
          'Consumption': results.data[1].Consumption,
          'Quality_of_Life_Importance__1_10': results.data[i].Quality_of_Life_Importance__1_10,
          'solar_powered__water_heater': results.data[i].solar_powered__water_heater,
          'gas_water_heater': results.data[i].gas_water_heater,
          'electric_water_heater___peak_hou': results.data[i].electric_water_heater___peak_hou,
          'electric_water_heater___off_peak': results.data[i].electric_water_heater___off_peak,
          'gas': results.data[i].gas,
          'natural_gas': results.data[i].natural_gas,
          'hybrid': results.data[i].hybrid,
          'electric___peak_hours': results.data[i].electric___peak_hours,
          'electric___off_peak_hours': results.data[i].electric___off_peak_hours,
          'jetfuel': results.data[i].jetfuel
        };
      }
    }

    console.log(Object.keys(test));

    console.log(test);

    fs.writeFile("./test.json", JSON.stringify(test, null, 4), (err) => {
      if (err) {
          console.error(err);
          return;
      };
      console.log("File has been created");
    });
	}
});
