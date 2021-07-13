// Reading data from JSON
var filePath='data/samples.json'
d3.json(filePath).then(function(data){
    // console.log(data)  // Test to ensure file was read in correctly
    dropDown(data);
});

// Populate information for dropdown
function dropDown(sampleData){
    sampleData['names'].forEach(name=>{
        var newOption = d3.select('#selDataset').append('option');
        newOption.text(name);
        newOption.property('value', name) });
};

// Set data to new selection
function optionChanged(selected){
    makeBar(selected);
    makeBubble(selected);
    makeTable(selected);
    makeGauge(selected);
};

// Creating Bar Chart of data
function makeBar(sample){
    //console.log(sample);   // Test to see if info was read in correctly
    d3.json(filePath).then(function(data){
        var samples = data['samples'];
        var selectedSamples = samples.filter(bio=>bio['id'] ==sample) [0];
        //console.log(currentSample)  // Test for info being read
        var traceBar={
            x: selectedSamples['sample_values'].slice(0,10),
            y: selectedSamples['otu_ids'].map(otu_id=>'OTU ' +otu_id).slice(0,10),
            type: 'bar',
            text: selectedSamples['otu_labels'].slice(0,10),
            orientation: 'h'
        };
        var layout ={
            title: "Microbe Abundance",
            xaxis: { title: "Abundance" },
        };
        Plotly.newPlot('bar', [traceBar], layout);
    });
};

// Creating Bubble Chart of data
function makeBubble(sample){
    d3.json(filePath).then(function(data){
        var samples = data['samples'];
        var selectedSamples = samples.filter(bug=>bug['id'] ==sample) [0];
        var traceBubble={
            x: selectedSamples['otu_ids'],
            y: selectedSamples['sample_values'],
            mode: 'markers',
            text: selectedSamples['otu_labels'],
            marker: {
                size: selectedSamples['sample_values'].map(sample_value=>sample_value/2),
                color: selectedSamples['otu_ids'],
                colorscale: 'Earth'
            }
        };
        var layout ={
            title: "Microbe Abundance",
            xaxis: { title: "OTU ID" }
        };
        Plotly.newPlot('bubble', [traceBubble], layout);
    });
};

// Building metadata table
function makeTable(sample){
    d3.json(filePath).then(function(data){
        var samples = data['metadata'];
        var selectedSamples = samples.filter(bio=>bio['id'] ==sample) [0];
        var panel = d3.select('#sample-metadata');
        //console.log(Object.entries(selectedSamples));  // Test to ensure data was read
        panel.html('');
        Object.entries(selectedSamples).forEach(([sample_key, sample_value])=>{
            panel.append('h5').text(`${sample_key}: ${sample_value}`)
        });
    });
};

// Bonus: Creating Gauge Chart for weekly washing frequency
// Adapted from https://plot.ly/javascript/gauge-charts/

function makeGauge(sample){
	d3.json(filePath).then(function(data){
		var metadata = data.metadata;
		var values = metadata.filter(val=>val['id'] ==sample);
		var freqValue = values[0].wfreq;

	var gPlot = [{
		domain: { x: [0, 1], y: [0, 1] },
    	type: "indicator",
		mode: "gauge+number",
		delta: { reference: 0 },
		title: { text: "<b>Belly Button Washing Frequency<b><br> Scrubs per Week", font: { size: 20 } },
		value: freqValue,
    	gauge: {
        	axis: { 
				range: [0, 9], 
				tickwidth: 1, 
				tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
				ticks: ''},
			borderwidth: 0,
			bar: { color: "darkred" },
        	steps: [
            	{ range: [0, 1], color: '#FEFAEF' },
            	{ range: [1, 2], color: "F1EEE4" },
            	{ range: [2, 3], color: "DEE0D1" },
            	{ range: [3, 4], color: "E9EDCC" },
            	{ range: [4, 5], color: "E0EE75" }, 
            	{ range: [5, 6], color: "A8BE5C" },
            	{ range: [6, 7], color: "6CB93E" },
            	{ range: [7, 8], color: "5EA931" },
				{ range: [8, 9], color: "4B8D23" } ],
      } }]; 
  
  var layout = {
    width: 500,
    height: 400,
    margin: { t: 25, r: 25, l: 25, b: 25 },
 };
  
  Plotly.newPlot('gauge', gPlot, layout);
});
};