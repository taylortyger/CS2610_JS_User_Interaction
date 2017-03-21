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
        if(n == 0){ 
            val = 0;
        }
        else if (n == 1){ 
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
        if(n == 0){ 
            val = 0;
        }
        else if (n == 1){ 
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
        if(n == 0)
        { 
            val = 0;
        }
        else if (n == 1)
        { 
            val = 0;
        }
        else if (n == 2)
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

//----------------------------------------------------------
//
//  onchange event listener to update each of the three 
//  slider's button value when the slider value changes.
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

//----------------------------------------------------------------------------
//
//  onclick event listener to calculate and add call graph when corresponding
//  button is clicked.
//
//----------------------------------------------------------------------------
var buttons = document.getElementsByClassName('seq-button');
for(var button = 0; button < buttons.length; button++)
{
    buttons[button].onclick = function() {
        var val = this.parentNode.querySelector('input').value;
        var callGraph;
        var section;
        switch(this.id){
            case "fib-button":
                callGraph = calcFibonacci(val).div;
                section = document.getElementById('fibonacci-section');
                break;
            case "pell-button":
                callGraph = calcPell(val).div;
                section = document.getElementById('pell-section');
                break;
            case "trib-button":
                callGraph = calcTribonacci(val).div;
                section = document.getElementById('tribonacci-section');
                break;
        }
        if(section.querySelector('.'+callGraph.className))
        {
            section.removeChild(section.querySelector('.'+callGraph.className));
        }
        section.appendChild(callGraph);
    };
}