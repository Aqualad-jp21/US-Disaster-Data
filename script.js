const tabs = M.Tabs.init(document.querySelector('.tabs'));


//var dataArray;
var data;
let dataArray = [];

function test(data){
  let results = {};

  for (let i = 0; i < data.DisasterDeclarationsSummaries.length; ++i) { // loop over array

    if (!results.hasOwnProperty(data.DisasterDeclarationsSummaries[i].incidentType)){  // if key does not exist
      results[data.DisasterDeclarationsSummaries[i].incidentType] = 0;  // then make one
    }

    ++results[data.DisasterDeclarationsSummaries[i].incidentType];     // increment the frequency for that key
  }
  console.log(results);
  return results;
}


function buildChartData(){
  const data = [{
        name: 'Flood',
        y: dataArray.Flood, //396,
        sliced: true,
        selected: true
    }, {
        name: 'Earthquake',
        y: dataArray.Earthquake//13
    }, {
        name: 'Severe Storm(s)',
        y: dataArray["Severe Storm(s)"] //144
    }, {
        name: 'Hurricane',
        y: dataArray.Hurricane//208
    }, {
        name: 'Fire',
        y: dataArray.Fire//208
    }, {
        name: 'Tornado',
        y: dataArray.Tornado //56
    }, {
        name: 'Typhoon',
        y: dataArray.Typhoon //71
    }, {
        name: 'Drought',
        y: dataArray.Drought //30
    }, {
        name: 'Other',
        y: dataArray.Other //4
    }];

  return data;

}

function drawChart(data){
  // Radialize the colors
Highcharts.setOptions({
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    })
});

// Build the chart
Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Disaster Declerations'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                connectorColor: 'silver'
            }
        }
    },
    series: [{
        name: 'Disaster Declerations',
        data: data
    }]
});
     
}

/*function drawChart(data){
Highcharts.chart('container', {
   chart: {
       plotBackgroundColor: null,
       plotBorderWidth: null,
       plotShadow: false,
       type: 'pie'
   },
   title: {
       text: 'Disaster Declerations'
   },
   tooltip: {
       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
   },
   accessibility: {
       point: {
           valueSuffix: '%'
       }
   },
   plotOptions: {
       pie: {
           allowPointSelect: true,
           cursor: 'pointer',
           dataLabels: {
               enabled: true,
               format: '<b>{point.name}</b>: {point.percentage:.1f} %'
           }
       }
   },
   series: [{
       name: 'Disasters',
       colorByPoint: true,
       data: data
   }]
});
}
*/

async function getData(url){
  try{
    let response = await fetch(url);//1. Send http request and get response
    let result = await response.json();//2. Get data from response

    dataArray = test(result);

    data = buildChartData();

    drawChart(data);
    
    // console.log({dataArray});
  }catch(e){
      console.log(e);//catch and log any errors
  }
}


getData("https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries");



//---------------------------------------------------
var data2;
let dataArray2 = [];


function createArray2(data){
  let results = {};

  for (let i = 0; i < data.DisasterDeclarationsSummaries.length; ++i) { // loop over array

    if (data.DisasterDeclarationsSummaries[i].incidentType === "Flood"){
        if (!results[data.DisasterDeclarationsSummaries[i].state]){  // if key does not exist

        results[data.DisasterDeclarationsSummaries[i].state]=0;  // then make one

        }
        ++results[data.DisasterDeclarationsSummaries[i].state];     // increment the frequency for that key
    }
    
    
  }
  console.log(results);
  return results;
}

async function getData2(url){
  try{
    let response = await fetch(url);//1. Send http request and get response
    let result = await response.json();//2. Get data from response

    dataArray2 = createArray2(result);
    //dataArray = test(result);

    //data2 = 
    //data = buildChartData();
    drawChart2(dataArray2)
    //drawChart(data);
    
    // console.log({dataArray});
  }catch(e){
      console.log(e);//catch and log any errors
  }
}

getData2("https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries")


function drawChart2(dataArray2){

Highcharts.chart('container1', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Flood'
    },
    /*subtitle: {
        text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },*/
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Number of Floods'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y}'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
    },

    series: [
        {
            name: "States",
            colorByPoint: true,
            data: [
                {
                    name: "Texas",
                    y: dataArray2.TX//51,
                    //drilldown: "Chrome"
                },
                {
                    name: "Iowa",
                    y: dataArray2.IA //73,
                    //drilldown: "Firefox"
                },
                {
                    name: "Nebraska",
                    y: dataArray2.NE //41,
                    //drilldown: "Internet Explorer"
                },
                {
                    name: "California",
                    y:  dataArray2.CA //54,
                    //drilldown: "Safari"
                },
                {
                    name: "Idaho",
                    y: dataArray2.ID //18,
                    //drilldown: "Edge"
                },
                {
                    name: "Minnesota",
                    y: dataArray2.MN//22,
                    //drilldown: "Opera"
                },
                {
                    name: "Washington",
                    y: dataArray2.WA //17,
                    //drilldown: null
                }
            ]
        }
    ]
    
});


}


//----------------------------------------------------

var data3;
let dataArray3 = [];
let tornadoArray=[];
let hurricaneArray=[];


function createArray3(data){
  let results = {};

  for (let i = 0; i < data.DisasterDeclarationsSummaries.length; ++i) { // loop over array

    if (data.DisasterDeclarationsSummaries[i].incidentType === "Tornado"){
        if (!results[data.DisasterDeclarationsSummaries[i].state]){  // if key does not exist

        results[data.DisasterDeclarationsSummaries[i].state]=0;  // then make one

        }
      ++results[data.DisasterDeclarationsSummaries[i].state];     // increment the frequency for that key
    }
    
    
  }
  console.log(results);
  return results;
}

function createArray4(data){
  let results = {};

  for (let i = 0; i < data.DisasterDeclarationsSummaries.length; ++i) { // loop over array

    if (data.DisasterDeclarationsSummaries[i].incidentType === "Hurricane"){
        if (!results[data.DisasterDeclarationsSummaries[i].state]){  // if key does not exist

        results[data.DisasterDeclarationsSummaries[i].state]=0;  // then make one

        }
        ++results[data.DisasterDeclarationsSummaries[i].state];     // increment the frequency for that key
    }
    
    
  }
  console.log(results);
  return results;
}

async function getData3(url){
  try{
    let response = await fetch(url);//1. Send http request and get response
    let result = await response.json();//2. Get data from response

    //dataArray3 = createArray3(result);
    tornadoArray = createArray3(result);
    hurricaneArray = createArray4(result);

    //data2 = 
    //data = buildChartData();
    drawChart3(tornadoArray, hurricaneArray);
    //drawChart2(dataArray2)
    //drawChart(data);
    
    // console.log({dataArray});
  }catch(e){
      console.log(e);//catch and log any errors
  }
}

getData3("https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries")


function drawChart3(tornado, hurricane){
    Highcharts.chart('container2', {
    chart: {
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            viewDistance: 25,
            depth: 40
        }
    },

    title: {
        text: 'Tornado and Hurricane'
    },

    xAxis: {
        categories: ['Texas', 'Georgia', 'Mississippi', 'Massachusetts'],
        labels: {
            skew3d: true,
            style: {
                fontSize: '16px'
            }
        }
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Frequency of Disaster ',
            skew3d: true
        }
    },

    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
    },

    plotOptions: {
        column: {
            stacking: 'normal',
            depth: 40
        }
    },

    series: [{
        name: 'Tornado',
        data: [
          tornado.TX, 
          tornado.GA, 
          tornado.MS, 
          tornado.MA
          ],
        stack: 'male'
    }, {
        name: 'Hurricane',
        data: [
          hurricane.TX,
          hurricane.GA,
          hurricane.MS,
          hurricane.MA
        ],
        stack: 'female'
    }]
});

}
