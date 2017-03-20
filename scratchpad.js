/*********************************************************************
 *                           FUNCTIONS                               *
 *********************************************************************/

//------------------------------------------------------------------------
//
//  add divs to the DOM (body) to hold the recursive function call graphs
//
//      fibHTML, pellHTML, tribHTML: 
//          expected to be HTML element containing resulting call graph of 
//          the respective series/recursive function
//
//------------------------------------------------------------------------
function addCallGraphs(fibHTML, pellHTML, tribHTML)
{
    var fibDiv = document.createElement('div');
    fibDiv.id = "fibonacci-section";
    var fibH2 = document.createElement('h2');
    fibH2.textContent = "Call Graph for Fibonacci Sequence:";
    fibDiv.appendChild(fibH2);
    fibDiv.appendChild(fibHTML);
    
    var pellDiv = document.createElement('div');
    pellDiv.id = "pell-section";
    var pellH2 = document.createElement('h2');
    pellH2.textContent = "Call Graph for Pell Sequence:";
    pellDiv.appendChild(pellH2);
    pellDiv.appendChild(pellHTML);
    
    var tribDiv = document.createElement('div');
    tribDiv.id = "tribonacci-section";
    var tribH2 = document.createElement('h2');
    tribH2.textContent = "Call Graph for Tribonacci Sequence:";
    tribDiv.appendChild(tribH2);
    tribDiv.appendChild(tribHTML);
    
    var callGraphDiv = document.createElement('div');
    callGraphDiv.id = "call-graphs";
    callGraphDiv.appendChild(fibDiv);
    callGraphDiv.appendChild(pellDiv);
    callGraphDiv.appendChild(tribDiv);
    document.body.appendChild(callGraphDiv);
}

//--------------------------------------------------------------------
//
//  Fibonacci Sequence:
//      Recursively calculate the nth number in the fibonacci sequence 
//      while building an HTML call-graph of the recursive function.
//
//--------------------------------------------------------------------
function calcFibonacci(n)
{
    var val;
    var currDiv = document.createElement('div');
    var p = document.createElement('p');
    currDiv.className = "fib";
    
    if(n < 2)
    {
        if(n === 0){ 
            val = 0;
        }
        else if (n===1){ 
            val = 1;
        }
        p.textContent = "fib(" + n + ") = " + val;
        currDiv.appendChild(p);
        return {'value': val, 'div': currDiv};
    }
    
    var left = calcFibonacci(n - 1);
    var right = calcFibonacci(n - 2);
    val = left.value + right.value;
    
    p.textContent = "fib(" + n + ") = " + val;
    left.div.className += " fib-left";
    right.div.className += " fib-right";
    
    currDiv.appendChild(p);
    currDiv.appendChild(left.div);
    currDiv.appendChild(right.div);
    
    return {'value': val, 'div': currDiv};
}

//--------------------------------------------------------------------
//
//  Pell Sequence:
//      Recursively calculate the nth number in the pell sequence 
//      while building an HTML call-graph of the recursion.
//
//--------------------------------------------------------------------
function calcPell(n)
{
    var val;
    var currDiv = document.createElement('div');
    var p = document.createElement('p');
    currDiv.className = "pell";
    
    if(n < 2)
    {
        if(n === 0){ 
            val = 0;
        }
        else if (n === 1){ 
            val = 1;
        }
        p.textContent = "pell(" + n + ") = " + val;
        currDiv.appendChild(p);
        return {'value': val, 'div': currDiv};
    }
    
    var left = calcPell(n - 1);
    var right = calcPell(n - 2);
    val = 2*left.value + right.value;
    
    p.textContent = "pell(" + n + ") = " + val;
    left.div.className += " pell-left";
    right.div.className += " pell-right";
    
    currDiv.appendChild(p);
    currDiv.appendChild(left.div);
    currDiv.appendChild(right.div);
    
    return {'value': val, 'div': currDiv};
}

//--------------------------------------------------------------------
//
//  Tribonacci Sequence:
//      Recursively calculate the nth number in the tribonacci sequence 
//      while building an HTML call-graph of the recursive function.
//
//--------------------------------------------------------------------
function calcTribonacci(n)
{
    var val;
    var currDiv = document.createElement('div');
    var p = document.createElement('p');
    currDiv.className = "trib";
    
    if(n < 3)
    {
        if(n === 0)
        { 
            val = 0;
        }
        else if (n === 1)
        { 
            val = 0;
        }
        else if (n === 2)
        {
            val = 1;
        }
        p.textContent = "trib(" + n + ") = " + val;
        currDiv.appendChild(p);
        return {'value': val, 'div': currDiv};
    }
    
    var left = calcTribonacci(n - 1);
    var middle = calcTribonacci(n - 2);
    var right = calcTribonacci(n - 3);
    val = left.value + middle.value + right.value;
    
    p.textContent = "trib(" + n + ") = " + val;
    left.div.className += " trib-left";
    middle.div.className += " trib-middle";
    right.div.className += " trib-right";
    
    currDiv.appendChild(p);
    currDiv.appendChild(left.div);
    currDiv.appendChild(middle.div);
    currDiv.appendChild(right.div);
    
    return {'value': val, 'div': currDiv};
}

//------------------------------------------------------------------------------
//
//  Function factory for creating functions to inject a specific series' info
//  above the call graph:
//      seriesName      - name of the series 
//                              (must be how it appears elswhere in document)
//      seriesFunction  - a string of the mathematical function for the series
//      seriesLink      - hyperlink to a webpage with more info on the series
//
//------------------------------------------------------------------------------
function seriesInfoDivMakerFactory(seriesName, seriesFunction, seriesLink)
{
    return function()
    {
        var div = document.createElement('div');
        div.setAttribute('class', 'series-info');
        div.innerHTML  = '<p>The ' + seriesName + ' sequence is represented by the following function: <i>' + seriesFunction + '</i></p>';
        div.innerHTML += '<p>For more details about the ' + seriesName + ' sequence, <a href="' + seriesLink + '">go here to learn more.</a>';
        var parent = document.getElementById(seriesName + '-section');
        parent.insertBefore(div, parent.firstChild.nextSibling);
    };
}

//Function to inject fibonocci sequence info above call graph
var addFibInfo = seriesInfoDivMakerFactory( 'fibonacci', 
                                            'F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1', 
                                            'https://oeis.org/A000045'
                                            );
//Function to inject pell sequence info above call graph
var addPellInfo = seriesInfoDivMakerFactory('pell', 
                                            'a(0) = 0, a(1) = 1; for n > 1, a(n) = 2*a(n-1) + a(n-2)', 
                                            'https://oeis.org/A000129'
                                            );
 //Function to inject tribonacci sequence info above call graph
var addTribInfo = seriesInfoDivMakerFactory('tribonacci',
                                            'a(n) = a(n-1) + a(n-2) + a(n-3) with a(0)=a(1)=0, a(2)=1',
                                            'https://oeis.org/A000073'
                                            );

//-----------------------------------------------------------------------
//
//  Adds series info and hyperlinks for each series to the webpage 
//
//-----------------------------------------------------------------------
function addAllSeriesInfo()
{
    addFibInfo();
    addPellInfo();
    addTribInfo();
}

/*********************************************************************
 *                       EXECUTED JAVASCRIPT:                        *
 *********************************************************************/
 
addCallGraphs(calcFibonacci(11).div, calcPell(11).div, calcTribonacci(11).div);
addAllSeriesInfo();