var chart;
nv.addGraph(function() {
  chart = nv.models.scatterChart()
                .showDistX(true)
                .showDistY(true)
                .useVoronoi(true)
                .color(d3.scale.category10().range())
                .transitionDuration(300)
                ;

 chart.xAxis.tickFormat();
 chart.yAxis.tickFormat();
  /*chart.xAxis.tickFormat(
      function(d) {
          return d3.time.format('%y-%m-%d')(d);
      });
  chart.yAxis.tickFormat(
      function(d) {
          return d3.time.format('%y-%m-%d')(d);
      });*/
  chart.tooltipContent(function(key) {
      return '<h2>' + key + '</h2>';
  });

    d3.json("data/startdata.json", function(error, root) {
        d3.select('#infochart1 svg')
            .datum(randomData(root))
            .call(chart);

        nv.utils.windowResize(chart.update);

        chart.dispatch.on('stateChange', function(e) { ('New State:', JSON.stringify(e)); });

        return chart;
    });
});


//function randomData(groups, points) 
function randomData(root){
  var data = [],
      shapes = ['circle'],
      random = d3.random.normal();
  var arrAgencyCode=[];

  for(var i=0; i< root.length; i++){
      if(!exist(arrAgencyCode, root[i]["Agency Name and Code"])){
         arrAgencyCode.push(root[i]["Agency Name and Code"]);
      }
  }

            for (var i = 0; i < arrAgencyCode.length; i++) {
                data.push({
                    key: arrAgencyCode[i],
                    values: []
                });

                for(var k=0; k< root.length; k++){
                    if( root[k]["Agency Name and Code"] == arrAgencyCode[i]){
                        data[i].values.push({
                            x: root[k]["Start Date"].replace("-","").replace("-",""),   // start
                            y: root[k]["Completion Date (B1)"].replace("-","").replace("-",""),  // complete
                            size: root[k]["Lifecycle Cost"],
                            shape:shapes[0]
                         });
                    }
                }
            }

        return data;

}

function exist(arr, value){
    var blFlag = false;
    for(var i=0; i<arr.length; i++){
        if(arr[i] == value){
            blFlag=true;
            i==arr.length;
        }
    }

    return blFlag;
}