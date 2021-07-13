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
