var csv = require('fast-csv');
var mongoose = require('mongoose');
var SomeData = require('./data');

exports.post = function (req, res) {
	if (!req.files)
		return res.status(400).send('No files were uploaded.');
	
	var dataFile = req.files.file;

	var dataStuff = [];
		
	csv
	 .fromString(dataFile.data.toString(), {
		 headers: true,
		 ignoreEmpty: true
	 })
	 .on("data", function(data){
		 data['_id'] = new mongoose.Types.ObjectId();
		 
		 dataStuff.push(data);
	 })
	 .on("end", function(){
		 SomeData.create(dataStuff, function(err, documents) {
			if (err) throw err;
			
			res.send(dataStuff.length + ' data has been successfully uploaded.');
		 });
	 });
};