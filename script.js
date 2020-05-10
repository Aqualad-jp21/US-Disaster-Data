const tabs = M.Tabs.init(document.querySelector('.tabs'));

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
        y: dataArray.Flood, 
        sliced: true,
        selected: true
    }, {
        name: 'Earthquake',
        y: dataArray.Earthquake
    }, {
        name: 'Severe Storm(s)',
        y: dataArray["Severe Storm(s)"] 
    }, {
        name: 'Hurricane',
        y: dataArray.Hurricane
    }, {
        name: 'Fire',
        y: dataArray.Fire
    }, {
        name: 'Tornado',
        y: dataArray.Tornado 
    }, {
        name: 'Typhoon',
        y: dataArray.Typhoon 
    }, {
        name: 'Drought',
        y: dataArray.Drought 
    }, {
        name: 'Other',
        y: dataArray.Other 
    }];

  return data;

}

function drawChart(data){
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
                [1, Highcharts.color(color).brighten(-0.3).get('rgb')] 
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
        text: 'Disaster Declerations Summary'
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

  for (let i = 0; i < data.DisasterDeclarationsSummaries.length; ++i) { 

    if (data.DisasterDeclarationsSummaries[i].incidentType === "Flood"){
        if (!results[data.DisasterDeclarationsSummaries[i].state]){  

        results[data.DisasterDeclarationsSummaries[i].state]=0;  

        }
        ++results[data.DisasterDeclarationsSummaries[i].state]; 
    }
    
    
  }
  console.log(results);
  return results;
}

async function getData2(url){
  try{
    let response = await fetch(url);
    let result = await response.json();

    dataArray2 = createArray2(result);
    drawChart2(dataArray2)
  
  }catch(e){
      console.log(e);
  }
}

getData2("https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries")


function drawChart2(dataArray2){

Highcharts.chart('container1', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Frequency of Floods in Seven States'
    },
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
            text: 'Frequency of Floods'
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
                    name: "North Dakota",
                    y: dataArray2.ND
                },
                {
                    name: "Iowa",
                    y: dataArray2.IA 
                },
                {
                    name: "Nebraska",
                    y: dataArray2.NE 
                },
                {
                    name: "California",
                    y:  dataArray2.CA 
                },
                {
                    name: "West Virginia",
                    y: dataArray2.WV 
                },
                {
                    name: "Minnesota",
                    y: dataArray2.MN
                },
                {
                    name: "Oregon",
                    y: dataArray2.OR 
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

  for (let i = 0; i < data.DisasterDeclarationsSummaries.length; ++i) { 

    if (data.DisasterDeclarationsSummaries[i].incidentType === "Tornado"){
        if (!results[data.DisasterDeclarationsSummaries[i].state]){ 

        results[data.DisasterDeclarationsSummaries[i].state]=0;  

        }
      ++results[data.DisasterDeclarationsSummaries[i].state];     
    }
    
    
  }
  console.log(results);
  return results;
}

function createArray4(data){
  let results = {};

  for (let i = 0; i < data.DisasterDeclarationsSummaries.length; ++i) { 

    if (data.DisasterDeclarationsSummaries[i].incidentType === "Hurricane"){
        if (!results[data.DisasterDeclarationsSummaries[i].state]){  

        results[data.DisasterDeclarationsSummaries[i].state]=0;  

        }
        ++results[data.DisasterDeclarationsSummaries[i].state];     
    }
    
    
  }
  console.log(results);
  return results;
}

async function getData3(url){
  try{
    let response = await fetch(url);
    let result = await response.json();

    tornadoArray = createArray3(result);
    hurricaneArray = createArray4(result);

    drawChart3(tornadoArray, hurricaneArray);
    
  }catch(e){
      console.log(e);
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
        text: 'Tornados and Hurricanes'
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
