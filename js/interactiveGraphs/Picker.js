
var testLength = [];

var testData = [];
function randomFromInterval(min,max)
{
    return (Math.random()*(max-min))+min
}

//testData.push({date: 'today'});
//testData.push('test1');

$(function () {
    var width = 1300,
        height = 500;


    // START: boilerplate code from http://bl.ocks.org/mbostock/3902569
    var parseDate = d3.time.format("%d-%b-%y").parse, /*DD-mon-YYYY*/
        bisectDate = d3.bisector(function (d) { return d.date; }).left,
        formatValue = d3.format(",.2f"),
        formatCurrency = function (d) { return "$" + formatValue(d); };

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.close); });

    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "svg");


    /*d3.select('.svg').append('div')
        .attr('class', 'container')
        .append('div')
        .attr('class', 'intro-text')
        .append('div')
        .attr('class', 'intro-heading')
        .append('p')
        .text('Volos Portfolio Solutions');*/


    // Make my own data instead of reading a TSV like in the example. 
    // Simple 100 day brownian motion

var paths = 10;
var steps = 150;
var length = [];
var path = [];
var data = [];

for (p=0; p<paths; p++){
    data.push([]);
    testData.push([])
}

var today = new Date();
        //var close = 100;


    //j value is the number of lines
    for (j=0; j<paths; j++) {

        var close = 100;

        for (var i = 0; i < steps; i++) {
            var dateString = today.toDateString();
            var splitDate = dateString.split(" ");

            mu = 0.01;
            sigma = 0.2;
            //test_gbm = close * Math.exp(((mu + (0.5 * Math.pow(sigma, 2))) * (1 / 252)) + sigma * NormSInv(Math.random()));
            close = (Math.random() < 0.0001) ? (close + Math.random() * 10) : close * Math.exp(((mu + (0.5 * Math.pow(sigma, 2))) * (1 / 252)) + sigma * Math.sqrt(i/252) * NormSInv(Math.random()));
            data[j].push({
                date: splitDate[2] + '-' + splitDate[1] + '-' + splitDate[3].slice(-2),
                close: close.toFixed(2)
            });
            today.setDate(today.getDate() + 1);

            testData[j].push({
                date: splitDate[2] + '-' + splitDate[1] + '-' + splitDate[3].slice(-2),
                close: close.toFixed(2)
            });

        }
        data[j].forEach(function (d) {
            d.date = parseDate(d.date);
            d.close = +d.close;
        });


        x.domain([data[j][0].date, data[j][data[j].length - 1].date]);
        y.domain(d3.extent(data[j], function (d) {
            return d.close;
        }));


        svg.append("path")
            .datum(data[j])
            .attr("class", "line"+j)
            .attr("d", line)
            .style({'fill': 'none', 'stroke-width': 3+'px', 'stroke-opacity': randomFromInterval(.3, .6)})
            .style({'stroke':function() {
                if (j<paths/3) {
                    return 'lightgray'
                } else if (j<paths*2/3) {
                    return 'lightblue'
                } else {
                    return 'lightgreen'
                }
                /*if (j<paths/3) {
                    return '#707280'
                } else if (j<paths*2/3) {
                    return '#6B0000'
                } else {
                    return '#096098 '
                }*/
                /*function() {
                if (j<paths/4) {
                    return '#FFFF00'
                } else if (j<paths/2) {
                    return '#00C397 '
                } else if (j<paths*3/4) {
                    return '#FF6200 '
                } else {
                    return '#8205C7 '
                }*/
                }
            });

        path = document.querySelector('.line'+j);
        length.push(path.getTotalLength());
        testLength.push(path.getTotalLength());

        d3.select('.line'+j)
            .style({'stroke-dasharray': length[j], 'stroke-dashoffset': length[j]});

        /*svg.selectAll('circle')
        .data(data[j])
        .enter().append('circle')
        .attr('cx', function(d) {return x(d['date'])})
        .attr('cy', function(d) {return y(d['close'])})
        .attr('r', 1)
        .attr('class', 'point')*/

    }


});

function NormSInv(p) {
    var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
    var a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
    var b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
    var b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
    var c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
    var c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
    var d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
    var p_low = 0.02425, p_high = 1 - p_low;
    var q, r;
    var retVal;

    if ((p < 0) || (p > 1))
    {
        alert("NormSInv: Argument out of range.");
        retVal = 0;
    }
    else if (p < p_low)
    {
        q = Math.sqrt(-2 * Math.log(p));
        retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
    else if (p <= p_high)
    {
        q = p - 0.5;
        r = q * q;
        retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    }
    else
    {
        q = Math.sqrt(-2 * Math.log(1 - p));
        retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }

    return retVal;
}

