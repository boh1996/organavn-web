var renderer = {

    /**
     * The jQuery HTML element
     * to assign this property with the correct value, call renderer.initialize
     * @type {Object}
     */
    canvas : null,

    /**
     * The height in pixels that each letter is
     * @type {Number}
     */
    lineHeight : 30,

    /**
     * The canvas  2D rendering context,
     * to assign this property with the correct value, call renderer.initialize
     * @type {Object}
     */
    context : null,

    /**
     * The pixel width of the canvas element
     * @type {Number}
     */
    width : null,

    /**
     * If the canvas is activated
     * @type {Boolean}
     */
    active : true,

    /**
     * The pixel height of the canvas element
     * @type {Number}
     */
    height : null,

    /**
     * The left and right canvas padding
     * @type {Number}
     */
    padding : 50,

    /**
     * The max letter height in pixels
     * @type {Number}
     */
    maxLineHeight : 30,

    /**
     * The max number of rows to render
     * @type {Number}
     */
    rows : 10,

    /**
     * The pixel width of the lines between each letter
     * @type {Number}
     */
    lineWidth : 40,

    /**
     * This function should be called when the document is loaded
     */
    initialize : function () {
        renderer.canvas = $("#canvas");
        renderer.context = renderer.canvas.get(0).getContext("2d");
        renderer.width = renderer.canvas.width();
        renderer.height = renderer.canvas.height();
    },

    /**
     * This function should be called on load and on resize,
     * and it resizes the renderer.canvas and sets the HTML attributes
     * so the cordinates fits the cnavas size
     */
    canvasResize : function () {
        if (renderer.active == true) {
            renderer.canvas.attr("width","");
            renderer.canvas.attr("height","");

            renderer.width = renderer.canvas.width();
            renderer.height = renderer.canvas.height();

            renderer.lineHeight = renderer.width/renderer.rows;

            if (renderer.lineHeight > renderer.maxLineHeight) {
                renderer.lineHeight = renderer.maxLineHeight;
            }

            renderer.canvas.attr("width",renderer.width);
            renderer.canvas.attr("height",renderer.height);

            renderer.context.textAlign = 'center';
            renderer.context.font = renderer.lineHeight+'px Calibri';
            renderer.context.fillStyle = 'blue';
        }
    },

    /**
     * This function removes everything that has been rendered on the renderer.canvas
     */
    clearcanvas : function () {
        if (renderer.active == true) {
            i = renderer.context.createImageData(renderer.canvas.width(), renderer.canvas.height());
            renderer.context.putImageData(i, 0, 0);
        }
    },

    /**
     * This function disables the canvas and rendering pipeline
     */
    disable : function () {
        renderer.active = false;
        renderer.canvas.css("display","none");
    },

    /**
     * This function activates the rendering process again
     */
    activate : function () {
        renderer.active = true;
        renderer.canvas.css("display","");
        renderer.canvasResize();
        renderer.render();
    },

    /**
     * This function calculates how many rows and columns that is being rendered,
     * and the result is used to calculate starting and ending x and y cordinates
     * @param  {object} data The data to calculate from
     * @param  {integer} lineWidthSize The width of the seperating lines
     * @param  {integer} extra         An extra amount to add
     * @return {object}      An object containing "rows" and "columns"
     * @todo Measuere text
     */
    calculateSize : function (data,lineWidthSize,extra) {
        var widthCalculated = 1;
        var heightCalculated = 0;
        var lineWidthSize = lineWidthSize || renderer.lineWidth;
        var extra = extra || 20;
        var centering = {
            "top" : renderer.lineHeight,
            "bottom" : 0
        }

        for (var i = 0; i < data.length; i++) {
            var object = data[i];
            object.text = renderer.encodeText(object.text);

            if (typeof object.text != "undefined") {
                widthCalculated += renderer.context.measureText(object.text).width + lineWidthSize + extra;
                heightCalculated += renderer.lineHeight;
            }

            if (typeof object.childs != "undefined" && object.childs.length > 0) {
                for (var x = 0; x < object.childs.length; x++) {
                    var child = object.childs[x];
                    child.text = renderer.encodeText(child.text);
                    if (typeof child.text != "undefined") {
                        if (typeof child.placement != "undefined") {
                            switch (child.placement) {
                                case "left" || "right": 
                                    widthCalculated += renderer.context.measureText(child.text).width + renderer.lineWidth;
                                break;

                                case "top" || "bottom" :
                                    heightCalculated += renderer.lineHeight + renderer.lineWidth + 4;
                                break; 
                            }
                            if (child.placement == "top") {
                                centering.top += renderer.lineHeight + renderer.lineWidth + 4;
                            } else if (child.placement == "bottom") {
                                centering.bottom += renderer.lineHeight + renderer.lineWidth + 4;
                            }
                        }
                    }

                    if (typeof child.childs != "undefined" && child.childs.length > 0) {
                        var childsReturn = renderer.calculateSize(child.childs,lineWidthSize,extra);
                        widthCalculated += childsReturn.width;
                        heightCalculated += childsReturn.height;
                        centering.top += childsReturn.centering.top + renderer.lineWidth+4;
                        centering.bottom += childsReturn.centering.bottom;
                    }
                };
            }
        }
        return {
            "width" : widthCalculated - renderer.lineWidth,
            "height" : heightCalculated,
            "centering" : centering,
        };
    },

    /**
     * This function is called when the canvas should be rerendered
     */
    render : function () {
        if (renderer.active == true) {
            renderer.clearcanvas();
            if (generator.lastResult != null) {
                renderer.lines(generator.lastResult);
            }
        }
    },

    /**
     * This function encodes text  with superscript , subscripts etc.
     * @param  {string} input The text with the template tags
     * @return {string}
     */
    encodeText : function (input) {
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
                        result = result + String.fromCharCode(settings.superscripts[string[i]]);
                    }
                break;
            }
            output = output.replace($.trim(matches[0]),result);
        }
        return output;
    },

    /**
     * This function renders a line
     * @param  {object} start The start cordinate
     * @param  {object} end   The end cordinate
     */
    line : function (start, end) {
        renderer.context.beginPath();
        renderer.context.moveTo(start.x, start.y);
        renderer.context.lineWidth = 2;
        renderer.context.strokeStyle = 'black';
        renderer.context.lineTo(end.x,end.y);
        renderer.context.stroke();
    },

    /**
     * This function is used to generate random id values
     * @param  {integer} string_length The length of the string
     * @return {string}
     */
    randomString : function ( string_length ) {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = string_length || 8;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    },

    /**
     * This function renders the main line
     * @param  {object} data The different element objects
     */
    lines : function (data) {
        // The width and height of the data to be rendered
        var propotions = renderer.calculateSize(data);

        //The width of the rendered data
        var renderWidth = propotions.width;

        var renderHeight = propotions.height;

        var scale = {
            "x" : 1,
            "y" : 1
        };
        
        //If the renderer.canvas is to small, then calculate and scale the cordinate system
        if (renderWidth > (renderer.width-renderer.padding*2)) {
            scale.x = 1 - (100-(100/(renderWidth+renderer.padding*2)*(renderer.width)))/100;
            renderWidth = renderWidth * scale.x;
        }

        if (renderHeight > (renderer.height-50)) {
            scale.y = 1 - (100-(100/(renderHeight+50)*(renderer.height)))/100;
            renderHeight = renderHeight * scale.y;
        }

        renderer.context.scale(scale.x,scale.y);

        //Find the center of the cordinate system
        var center = {
            "x" : (renderer.width/2),
            "y" : ((renderer.height - renderHeight) / 2) + (renderHeight/2)
        }; 

        //Find the starting point
        var left = center.x - (renderWidth/2);

        //The last rendered position
        var lastX = left;

        for (var i = 0; i < data.length; i++) {

            //The data object to render now
            var object = data[i];

            //The position of the point to render
            var pos = {
                "x" : lastX+(renderer.context.measureText(object.text).width/2),
                "y" : center.y,
                "width" : renderer.context.measureText(object.text).width
            }

            //Render the text
            renderer.context.fillText(object.text,pos.x,pos.y);

            var lineY = pos.y;
            var lineX = pos.x;

            //If the point isn't the last point, render the split line
            if (i != data.length-1 && typeof object.line_type != "undefined") {
                switch (object.line_type) {
                    case "single" :
                        var y = lineY-(renderer.lineHeight/4);
                        renderer.line({
                            "x" : lineX+(pos.width/2)+5,
                            "y" : y
                        },{
                            "x" : lineX+pos.width+renderer.lineWidth-5,
                            "y" : y
                        });
                    break;

                    case "double" :
                        for (var l = 0; l <= 2; l++) {
                            var y = lineY-((renderer.lineHeight-10)/(2*l));
                            renderer.line({
                                "x" : lineX+(pos.width/2)+5,
                                "y" : y
                            },{
                                "x" : lineX+pos.width+renderer.lineWidth-5,
                                "y" : y
                            });
                         }; 
                    break;

                    case "triple" :
                        var dividers = [2,3,5];
                        for (var l = 0; l <= 3; l++) {
                            var y = lineY-(renderer.lineHeight/dividers[l]);
                            renderer.line({
                                "x" : lineX+(pos.width/2)+5,
                                "y" : y
                            },{
                                "x" : lineX+pos.width+renderer.lineWidth-5,
                                "y" : y
                            });
                         }; 
                    break;
                } 
                lastX = pos.x + pos.width + renderer.lineWidth;
            } else {
                lastX = pos.x + pos.width + renderer.lineWidth;
            }
            renderer.renderChilds(object.childs,pos);
        };
    },

    /**
     * This function render text and lines to a parent point
     * @param  {Array} childs The objects to render
     * @param  {object} pos    The parent point
     */
    renderChilds : function (childs,pos) {
        if (typeof childs != "undefined" && childs.length > 0) {
            for (var x = 0; x <= childs.length-1; x++) {
                var child = childs[x];
                child.text = renderer.encodeText(child.text);

                var childPos = {"x": 0, "y": 0};

                childPos.x = pos.x;

                switch (child.placement) {
                    case "top" : 
                        childPos.y = pos.y - renderer.lineHeight - renderer.lineWidth;
                        renderer.context.fillText(child.text,childPos.x,childPos.y);
                        switch (child.line_type) {
                            case "single" :
                                renderer.line({
                                    "x" : childPos.x,
                                    "y" : childPos.y + (renderer.lineHeight/2),
                                },{
                                    "x" : childPos.x,
                                    "y" : childPos.y + renderer.lineWidth
                                });
                            break;

                            case "double" :
                                for (var i = 0; i <= 2; i++) {
                                    if (i == 1) {
                                        var x = childPos.x - 4;
                                    } else {
                                        var x = childPos.x + 4;
                                    }
                                    renderer.line({
                                        "x" : x,
                                        "y" : childPos.y + (renderer.lineHeight/2),
                                    },{
                                        "x" : x,
                                        "y" : childPos.y + renderer.lineWidth
                                    });  
                                };
                            break;

                            case "triple" :
                                for (var i = 0; i <= 3; i++) {
                                    if (i == 1) {
                                        var x = childPos.x - 5;
                                    } else if (i == 2) {
                                        var x = childPos.x;
                                    } else {
                                        var x = childPos.x + 5;
                                    }
                                    renderer.line({
                                        "x" : x,
                                        "y" : childPos.y + (renderer.lineHeight/2),
                                    },{
                                        "x" : x,
                                        "y" : childPos.y + renderer.lineWidth
                                    });  
                                };
                            break;
                        }
                    break;

                    case "bottom" :
                        childPos.y = pos.y + renderer.lineHeight + renderer.lineWidth;
                        renderer.context.fillText(child.text,childPos.x,childPos.y);

                        switch (child.line_type) {
                            case "single" :
                                renderer.line({
                                    "x" : childPos.x,
                                    "y" : childPos.y - renderer.lineHeight,
                                },{
                                    "x" : childPos.x,
                                    "y" : childPos.y - renderer.lineWidth - (renderer.lineHeight/2)
                                });
                            break;

                            case "double" :
                                for (var i = 0; i <= 2; i++) {
                                    if (i == 1) {
                                        var x = childPos.x - 4;
                                    } else {
                                        var x = childPos.x + 4;
                                    }
                                    renderer.line({
                                        "x" : x,
                                        "y" : childPos.y - renderer.lineHeight,
                                    },{
                                        "x" : x,
                                        "y" : childPos.y - renderer.lineWidth - (renderer.lineHeight/2)
                                    });  
                                };
                            break;

                            case "triple" :
                                for (var i = 0; i <= 3; i++) {
                                    if (i == 1) {
                                        var x = childPos.x - 5;
                                    } else if (i == 2) {
                                        var x = childPos.x;
                                    } else {
                                        var x = childPos.x + 5;
                                    }
                                    renderer.line({
                                        "x" : x,
                                        "y" : childPos.y - renderer.lineHeight,
                                    },{
                                        "x" : x,
                                        "y" : childPos.y - renderer.lineWidth - (renderer.lineHeight/2)
                                    });  
                                };
                            break;
                        }
                    break;

                }
                renderer.renderChilds(child.childs,childPos);
            };
        }
    },

    /**
     * This function calculates the scaling of a circle used with benzen and cyclo elements
     * @param  {object} size             The renderer.canvas sizes
     * @param  {object} center           The center of the cicle
     * @param  {integer} numberOfElements The number of elements to render
     * @return {object}                  An object containing a scale and a fontSizse
     */
    calculateCircleSize : function (size,center,numberOfElements) {

        var scale = (size.width + size.height) * 0.16;

        if ((Math.sin(6.28) * scale + center.y + (renderer.lineHeight * 2)) > size.height) {
            scale = (size.width + (size.height - (50 + (renderer.lineHeight*2) * 8))) * 0.16;
        }

        if ((Math.cos(6.28) * scale + center.x) > size.height) {
            scale = ((size.width - (50 + (renderer.lineHeight*2) * 8)) + size.height) * 0.16;
        }

        var fontSizeHeight = (size.height/numberOfElements > 30) ? 30 : size.height/numberOfElements;
        var fontSizeWidth = (size.width/numberOfElements > 30) ? 30 : size.width/numberOfElements;
        if (fontSizeWidth > fontSizeHeight) {
            var fontSize = fontSizeHeight;
        } else {
            var fontSize = fontSizeWidth;
        }

        return {
            "fontSize" : fontSize,
            "scale" : scale
        };
    }
}

function cyclo () {
    var  center = {"x" : width/2,"y":height/2};
    var numberOfElements = 3;
    var degreeesPerElement = 360/numberOfElements;
    var radiansPerElement = degreeesPerElement * (Math.PI/180);
    var currentElementRadians = 0;
    var size = {"height" : height,"width" : width}

    var scaling = calculateCircleSize(size, center, numberOfElements); 

    renderer.context.font = scaling.fontSize+'px Calibri';

    var firstElement, lastRenderedElement;

    for (var i = 0; i <= numberOfElements -1; i++) {

        var text = "CH";

        var x = Math.cos(currentElementRadians) * scaling.scale + center.x;
        var y = Math.sin(currentElementRadians) * scaling.scale + center.y;

        currentElementRadians += radiansPerElement;

        renderer.context.fillText(text,x,y);

        var linePos = {
            "x" : x,
            "y" : y
        }; 

        if (i != 0) {
            renderer.line({
                "x" : linePos.x,
                "y" : linePos.y
            },{
                "x" : lastRenderedElement.x1,
                "y" : lastRenderedElement.y1
            });
        }

        if (i == 0) {
            firstElement = {
                "x" : x,
                "y" : y
            };
        }

        lastRenderedElement = {
            //Side
            "x1" : linePos.x,
            "y1" : linePos.y,
            
            //Bottom
            "x2" : x,
            "y2" : y, 
        };

    };
}