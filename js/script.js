var canvas = $("#canvas");
var lineHeight = 30;
var context = canvas.get(0).getContext("2d");
var width = canvas.width();
var height = canvas.height();
var padding = 50;
var maxLineHeight = 30;
var rows = 10;
var lineWidth = 40;

/**
 * This function should be called on load and on resize,
 * and it resizes the canvas and sets the HTML attributes
 * so the cordinates fits the cnavas size
 */
function canvasResize () {
    canvas.attr("width","");
    canvas.attr("height","");

    width = canvas.width();
    height = canvas.height();

    lineHeight = width/rows;

    if (lineHeight > maxLineHeight) {
        lineHeight = maxLineHeight;
    }

    canvas.attr("width",width);
    canvas.attr("height",height);

    context.textAlign = 'center';
    context.font = lineHeight+'px Calibri';
    context.fillStyle = 'blue';
}

$(document).ready(function () {
    canvasResize();
    render();
});

/**
 * This function removes everything that has been rendered on the canvas
 */
function clearCanvas () {
    i = context.createImageData(canvas.width(), canvas.height());
    context.putImageData(i, 0, 0);
}

/**
 * This function calculates how many rows and columns that is being rendered,
 * and the result is used to calculate starting and ending x and y cordinates
 * @param  {object} data The data to calculate from
 * @param  {integer} lineWidthSize The width of the seperating lines
 * @param  {integer} extra         An extra amount to add
 * @return {object}      An object containing "rows" and "columns"
 * @todo Measuere text
 */
function calculateSize (data,lineWidthSize,extra) {
    var widthCalculated = 1;
    var heightCalculated = 0; //Can be bugged
    var lineWidthSize = lineWidthSize || lineWidth;
    var extra = extra || 20;

    for (var i = 0; i < data.length; i++) {
        var object = data[i];
        object.text = encodeText(object.text);

        widthCalculated += context.measureText(object.text).width + lineWidthSize + extra;

        /*if (typeof object.childs != "undefined" && object.childs.length > 0) {
            for (var x = 0; x < object.childs.length; x++) {
                var child = object.childs[x];
                child.text = encodeText(child.text);
                if (typeof child.placement != "undefined") {
                    switch (child.placement) {
                        case "left" || "right": 
                            widthCalculated += context.measureText(child.text).width + lineWidth;
                        break;

                        case "top" || "bottom" :
                            if (rowsCalculated != 2) {
                                rowsCalculated = 2;
                            }
                        break; 
                    }
                }

                if (typeof child.childs != "undefined" && child.childs.length > 0) {
                    //Add levels
                    var childsReturn = calculateSize(child.childs);
                    columnsCalculated += childsReturn.width;
                }
            };
        }*/
    }
    return {
        "width" : widthCalculated - lineWidth,
        //"height" : columnsCalculated
    };
}

function render () {
    clearCanvas();
    var data = [
        {
            "line_type": "single/couble/triple",
            "text": "CH{sub}1{/sub}",
            "childs": [
                {
                    "text": "CH{sup}4{/sup}>",
                    "line_type": "single/double/triple",
                    "placement": "right/left/top/bottom",
                    "childs": [
                        {}
                    ]
                }
            ]
        },
        {
            "line_type": "single/couble/triple",
            "text": "CH{sub}9{/sub}",
            "childs": [
                {
                    "text": "CH{sup}4{/sup}>",
                    "line_type": "single/double/triple",
                    "placement": "right/left/top/bottom",
                    "childs": [
                        {}
                    ]
                }
            ]
        },

        /*{
            "line_type": "single/couble/triple",
            "text": "CH{sub}3{/sub}"
        }*/
    ];
    lines(data);
}

$(window).resize(function () {
    canvasResize();
    render(); 
});

/**
 * This function encodes text  with superscript , subscripts etc.
 * @param  {string} input The text with the template tags
 * @return {string}
 */
function encodeText (input) {
    var regex = /\{([a-zA-Z]*)\}([0-9]*)\{\/([a-zA-Z]*)\}/g,
    matches;

    var output = input;

    while (matches = regex.exec(input)) {
        var result = "";
        var string = matches[2];
        var i = string.length;
        switch (matches[1]) {
            case "sub" :
                while (i--) {
                    result = result + String.fromCharCode(settings.subscripts[string[i]]);
                }
            break;

            case "sup" : 
                while (i--) {
                    console.log(string[i]);
                    result = result + String.fromCharCode(settings.superscripts[string[i]]);
                }
            break;
        }
        output = output.replace($.trim(matches[0]),result);
    }
    return output;
}

function lines (data,parent) {
    var propotions = calculateSize(data); // The width and height of the data to be rendered
    var renderWidth = propotions.width; //The width of the rendered data
    
    //If the canvas is to small, then calculate and scale the cordinate system
    if (renderWidth > (width-padding*2)) {
        var scale = 1 - (100-(100/(renderWidth+padding*2)*(width)))/100;
        context.scale(scale,1);
        renderWidth = renderWidth * scale;
    }

    //Find the center of the cordinate system
    var center = (width/2); 

    //Find the starting point
    var left = center - (renderWidth/2);

    //The last rendered position
    var lastX = left;

    for (var i = 0; i < data.length; i++) {

        //The data object to render now
        var object = data[i];

        //The position of the point to render
        var pos = {
            "x" : lastX+(context.measureText(object.text).width/2),
            "y" : height/2,
            "width" : context.measureText(object.text).width
        }

        //Render the text
        context.fillText(object.text,pos.x,pos.y);

        //If the point isn't the last point, render the split line
        if (i != data.length-1) {
            var y = pos.y-(lineHeight/4);
            context.beginPath();
            context.moveTo(pos.x+(pos.width/2), pos.y-(lineHeight/4));
            context.lineWidth = 2;
            context.strokeStyle = 'black';
            context.lineTo(pos.x+pos.width+lineWidth,y);
            context.stroke();
            lastX = pos.x + pos.width + lineWidth;
        } else {
            lastX = pos.x + pos.width + lineWidth;
        }

        /*if (typeof object.childs != "undefined" && object.childs.length > 0) {
            for (var x = 0; x < object.childs.length; x++) {
                var child = object.childs[x];
                child.parent_id = object.id;
                console.log(child);
            };
        }*/
    };

    context.translate(200, 200);

}

/**
 * This function is used to generate random id values
 * @param  {integer} string_length The length of the string
 * @return {string}
 */
function randomString ( string_length ) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = string_length || 8;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
}