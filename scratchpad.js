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
    var fibDiv = document.getElementById('fibonacci-section');
    fibDiv.appendChild(fibHTML);
  
    var pellDiv = document.getElementById('pell-section');
    pellDiv.appendChild(pellHTML);
    
    var tribDiv = document.getElementById('tribonacci-section');
    tribDiv.appendChild(tribHTML);
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

/*********************************************************************
 *                       EXECUTED JAVASCRIPT:                        *
 *********************************************************************/
 
addCallGraphs(calcFibonacci(11).div, calcPell(11).div, calcTribonacci(11).div);

//----------------------------------------------------------
//
//  Update each of the three sliders button value when the 
//  slider value changes.
//
//----------------------------------------------------------
var sliders = document.getElementsByClassName('slider');
for(var i = 0; i < sliders.length; i++)
{
    sliders[i].onchange = function() {
        var prefix = '';
        switch(this.id){
            case "fib-slider":
                prefix = 'Fib';
                break;
            case "pell-slider":
                prefix = 'Pell';
                break;
            case "trib-slider":
                prefix = 'Trib';
                break;
        }
    	var form = this.parentNode;
    	var button = form.querySelector('button');
    	button.textContent = prefix + '(' + this.value + ')';
    };
}