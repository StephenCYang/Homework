var selector = d3.select("#selDataset")
var sampleMetadata = d3.select("#sample-metadata")

d3.json("samples.json").then(function(data){
    var testSubjectID = data.names;
    var metadata = data.metadata;
    var samples = data.samples;
    
    
    sampleMetadata.html(""); //Good old inner HTML
    Object.entries(metadata[0]).forEach(function([key, value]){
        sampleMetadata.append("p").text(`${key}: ${value}`)});

    initializeBarChart(samples[0]);
    initializeBubbleChart(samples[0]);
    initializeGauge(metadata[0]);

    testSubjectID.forEach(function(subject, index){
        var subjectSelection = selector.append("option")
        subjectSelection.attr("value", index).text(subject)});
    
    selector.on("change",updateChart);

    function updateChart(event){
        var selectValues = selector.property("value");
        sampleMetadata.html("");
        Object.entries(metadata[selectValues]).forEach(function([key, value]){
            sampleMetadata.append("p").text(`${key}: ${value}`)});
        
        updateBarChart(samples[selectValues]);
        updateBubbleChart(samples[selectValues]);
        updateGauge(metadata[selectValues]);
    };});

    function initializeBarChart(selectedSubjectID){
        // Display the first 10 OTUs found in that individual. I can't figure out how to combine 
        // these into a bunch of records/objects/whatever to do a proper sort.
        var barLabels = selectedSubjectID.otu_ids.slice(0,10);
        var barValues = selectedSubjectID.sample_values.slice(0,10);
        var barText = selectedSubjectID.otu_labels.slice(0,10);
        
        var barChartData = {
            x : barValues.reverse(),
            y : barLabels.map(data=>`OTU-${data}`).reverse(),
            text: barText.reverse(),
            type : "bar",
            orientation : "h"
        };
        
        var bar_data = [barChartData];
        var layout = {
            title: `Top 10 Microbial Species Found`,
            xaxis:{title:"Amount Found"},
            yaxis:{title: "OTU ID"}
        };
        var config = {responsive: true};
        Plotly.newPlot("bar", bar_data, layout, config);
    };

    function updateBarChart(selectedSubjectID){
        var barLabels = selectedSubjectID.otu_ids.slice(0,10);
        var barValues = selectedSubjectID.sample_values.slice(0,10);
        var barText = selectedSubjectID.otu_labels.slice(0,10);
        var update = { title: `Top 10 Microbial Species Found`};

        Plotly.restyle("bar","x",[barValues.reverse()]);
        Plotly.restyle("bar","y",[barLabels.map(data=>`OTU-${data}`).reverse()]);
        Plotly.restyle("bar","text",[barText.reverse()]);
        Plotly.relayout("bar",update)
    };

    function initializeBubbleChart(selectedSubjectID){
        var bubbleOtuID = selectedSubjectID.otu_ids;
        var bubbleValues = selectedSubjectID.sample_values;
        var bubbleLabels = selectedSubjectID.otu_labels;
        
        var trace = {
            x : bubbleOtuID,
            y : bubbleValues,
            mode: "markers",
            marker: {
                color: bubbleOtuID,
                colorscale: "Rainbow",
                size: bubbleValues
            },
            text: bubbleLabels
        };

        var layout = {
            width:"1100",
            height: "600",
            title: `<b>Microbial Species Found Per Sample</b>`,
            showlegend: false,  xaxis:{title:"OTU ID"},
            yaxis:{title: "Amount Per Sample"}
        };

        var bubble_data = [trace];
        var config = {responsive: true};
        Plotly.newPlot("bubble",bubble_data,layout,config);
    };

    function updateBubbleChart(selectedSubjectID){
        var bubbleOtuID = selectedSubjectID.otu_ids;
        var bubbleValues = selectedSubjectID.sample_values;
        var bubbleLabels = selectedSubjectID.otu_labels;
        var update = {title: `<b>Microbial Species Found Per Sample</b>`};
        
        Plotly.restyle("bubble","x",[bubbleOtuID]);
        Plotly.restyle("bubble","y",[bubbleValues]);
        Plotly.restyle("bubble","marker",[{
            size: bubbleValues,
            color: bubbleOtuID,
            colorscale: "Rainbow"}
        ]),
        Plotly.restyle("bubble","text",[bubbleLabels]);
        Plotly.relayout("bubble",update);
    };

    // I have no idea how to get an indicator needle!!
    function initializeGauge(selectedSubjectID) {
        //Check for nulls.
		var wfreq = 0;
        if (selectedSubjectID.wfreq !== null){wfreq=selectedSubjectID.wfreq};
        var data = [
            {
            type: "indicator",
            mode: "gauge+number",
            //domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "Belly Button Washing Frequency" },
            gauge: {
                axis: { range: [0, 9]},
                steps: [ { range: [0, 1] },
                    { range: [2, 3] },
                    { range: [4, 5] },
                    { range: [6, 7] },
                    { range: [8, 9] }
                ]} }
            ];

        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);
    };    

    // This was such a PITA. I had to do a newPlot to get it to refresh the gauge...
    function updateGauge(selectedSubjectID) {
        var wfreq = 0;
        if (selectedSubjectID.wfreq !== null){wfreq=selectedSubjectID.wfreq};
        console.log(wfreq);
        var update = [
            { type: "indicator",
              value: wfreq,
              mode: "gauge+number",
              gauge: {
                axis: { range: [0, 9]},
                steps: [ { range: [0, 1] },
                    { range: [2, 3] },
                    { range: [4, 5] },
                    { range: [6, 7] },
                    { range: [8, 9] }
                ]} } 
            ];

        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', update, layout );
        //Plotly.relayout('gauge', dataUpdate)
    

    };