var selector = d3.select("#selDataset")
var sampleMetadata = d3.select("#sample-metadata")

d3.json("samples.json").then(function(data){
    var testSubjectID = data.names;
    var metadata = data.metadata;
    var samples = data.samples;
    
    // Initial loading of the data to dashboard
    sampleMetadata.html("");
    Object.entries(metadata[0]).forEach(function([key, value]){
        sampleMetadata.append("p").text(`${key}: ${value}`)});

    initializeBarChart(samples[0]);
    initializeBubbleChart(samples[0]);
    initializeGauge(metadata[0]);

    // User selection
    testSubjectID.forEach(function(subject, index){
        var subjectSelection = selector.append("option")
        subjectSelection.attr("value", index).text(subject)});
    
    // Updates based on user selection
    selector.on("change",updateChart);

    function updateChart(event){
        var selectValues = selector.property("value");
        console.log(selectValues);
        console.log(samples[selectValues]);
        console.log(metadata[selectValues]);
        
        sampleMetadata.html("");
        Object.entries(metadata[selectValues]).forEach(function([key, value]){
            sampleMetadata.append("p").text(`${key}: ${value}`)});
        
        updateBarChart(samples[selectValues]);
        updateBubbleChart(samples[selectValues]);
        updateGauge(metadata[selectValues]);
    };});

    function initializeBarChart(selected_sample){
        // Display the first 10 OTUs found in that individual
        var bar_labels = selected_sample.otu_ids.slice(0,10);
        var bar_values = selected_sample.sample_values.slice(0,10);
        var bar_hovertext = selected_sample.otu_labels.slice(0,10);
        
        var trace1 = {
            x : bar_values.reverse(),
            y : bar_labels.map(data=>`OTU-${data}`).reverse(),
            text: bar_hovertext.reverse(),
            type : "bar",
            orientation : "h"
        };
        
        var bar_data = [trace1];
        var layout = {
            title: `<b>Top 10 Microbial Species Found</b>`,
            xaxis:{title:"Amount Found"},
            yaxis:{title: "OTU ID"}
        };
        var config = {responsive: true};
        Plotly.newPlot("bar", bar_data, layout, config);
    };

    function updateBarChart(selected_sample){
        var bar_labels = selected_sample.otu_ids.slice(0,10);
        var bar_values = selected_sample.sample_values.slice(0,10);
        var bar_hovertext = selected_sample.otu_labels.slice(0,10);
        var update = { title: `<b>Top 10 Microbial Species Found</b>`};

        Plotly.restyle("bar","x",[bar_values.reverse()]);
        Plotly.restyle("bar","y",[bar_labels.map(data=>`OTU-${data}`).reverse()]);
        Plotly.restyle("bar","text",[bar_hovertext.reverse()]);
        Plotly.relayout("bar",update)
    };

    function initializeBubbleChart(selected_sample){
        var bubble_otu_id = selected_sample.otu_ids;
        var bubble_value = selected_sample.sample_values;
        var bubble_text_values = selected_sample.otu_labels;
        
        var trace = {
            x : bubble_otu_id,
            y : bubble_value,
            mode: "markers",
            marker: {
                size: bubble_value,
                color: bubble_otu_id,
                colorscale: "Rainbow"
            },
            text: bubble_text_values
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

    function updateBubbleChart(selected_sample){
        var bubble_otu_id = selected_sample.otu_ids;
        var bubble_value = selected_sample.sample_values;
        var bubble_text_values = selected_sample.otu_labels;
        var update = {title: `<b>Microbial Species Found Per Sample</b>`};
        
        Plotly.restyle("bubble","x",[bubble_otu_id]);
        Plotly.restyle("bubble","y",[bubble_value]);
        Plotly.restyle("bubble","marker",[{
            size: bubble_value,
            color: bubble_otu_id,
            colorscale: "Rainbow"}
        ]),
        Plotly.restyle("bubble","text",[bubble_text_values]);
        Plotly.relayout("bubble",update);
    };

    // I have no idea how to get an indicator needle!!
    function initializeGauge(selected_sample) {
        var wfreq = 0;
        if (selected_sample.wfreq !== null){wfreq=selected_sample.wfreq};
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
    function updateGauge(selected_sample) {
        var wfreq = 0;
        if (selected_sample.wfreq !== null){wfreq=selected_sample.wfreq};
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