
/*=======This function is modified from
http://nvd3.org/ghpages/pie.html ===========*/
nv.addGraph(function() {
    var width = 1000,
        height = 1000;

    var chart = nv.models.pieChart()
        .x(function(d) { return d["Agency Name and Code"] })
        .y(function(d) { return d["Lifecycle Cost"] })
        .color(d3.scale.category20().range())
        .width(width)
        .height(height);

/* ======read data from json file======*/
    d3.json("data/lifecycle_cost_data.json", function(json) {
      d3.select("#chart")
        .datum(json)
        .transition().duration(1200)
          .attr('width', width)
          .attr('height', height)
          .call(chart);
    });

    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

    return chart;
});