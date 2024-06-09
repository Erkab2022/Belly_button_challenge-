// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
  const metadata = data.metadata;
  
    // Filter the metadata for the object with the desired sample number

  let sampleMetaData = metadata.filter(buildMetadata);  
    // Use d3 to select the panel with id of `#sample-metadata`
  const panel = d3.select("#sample-metadata");    

    // Use `.html("") to clear any existing metadata
  panel.html("");    

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(metadata).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });  
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
  const sampleData = data.samples;    

    // Filter the samples for the object with the desired sample number

let filtersample = sampleData.filter(buildCharts);
    // Get the otu_ids, otu_labels, and sample_values
    const barLayout = {
      title: "Top 10 OTUs",
      margin: { t: 30, l: 150 }
    };

    // Build a Bubble Chart
    Plotly.newPlot("bar", barData, barLayout);

    // Render the Bubble Chart
    const bubbleData = [{
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: "markers",
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids,
        colorscale: "Earth"
      }
    }];

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let bubbleLayout = {
      title: "OTUs in Sample",
      margin: { t: 30 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" }
    };

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    sliceData = bubbleLayout.slice(0,10);
    reversedData = sliceData.reverse();
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    const nameData = data.names; 

    // Use d3 to select the dropdown with id of `#selDataset`
    const selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    data.names.forEach((name) => {
      selector.append("option").text(name).property("value", name);
    });

    // Get the first sample from the list
    const firstSample = data.names[0];

    // Build charts and metadata panel with the first sample

    buildMetadata(firstSample);
    buildCharts(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();
