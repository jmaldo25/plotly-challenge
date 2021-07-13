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


