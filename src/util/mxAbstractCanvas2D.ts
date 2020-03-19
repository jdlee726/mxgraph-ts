import mxUrlConverter from "./mxUrlConverter";
import { mxConstants } from "./mxConstants";
import { mxUtils } from "./mxUtils";
import mxPoint from "./mxPoint";

/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
/**
 * Class: mxAbstractCanvas2D
 *
 * Base class for all canvases. A description of the public API is available in <mxXmlCanvas2D>.
 * All color values of <mxConstants.NONE> will be converted to null in the state.
 * 
 * Constructor: mxAbstractCanvas2D
 *
 * Constructs a new abstract canvas.
 */
export type TCanvasState = ReturnType<typeof mxAbstractCanvas2D.prototype.createState>;
export default class mxAbstractCanvas2D {

    /**
     * Variable: state
     * 
     * Holds the current state.
     */
    state: TCanvasState;

    /**
     * Variable: states
     * 
     * Stack of states.
     */
    states: TCanvasState[];

    /**
     * Variable: path
     * 
     * Holds the current path as an array.
     */
    path: (number | string)[];

    /**
     * Variable: rotateHtml
     * 
     * Switch for rotation of HTML. Default is false.
     */
    rotateHtml = true;

    /**
     * Variable: lastX
     * 
     * Holds the last x coordinate.
     */
    lastX = 0;

    /**
     * Variable: lastY
     * 
     * Holds the last y coordinate.
     */
    lastY = 0;

    /**
     * Variable: moveOp
     * 
     * Contains the string used for moving in paths. Default is 'M'.
     */
    moveOp = 'M';

    /**
     * Variable: lineOp
     * 
     * Contains the string used for moving in paths. Default is 'L'.
     */
    lineOp = 'L';

    /**
     * Variable: quadOp
     * 
     * Contains the string used for quadratic paths. Default is 'Q'.
     */
    quadOp = 'Q';

    /**
     * Variable: curveOp
     * 
     * Contains the string used for bezier curves. Default is 'C'.
     */
    curveOp = 'C';

    /**
     * Variable: closeOp
     * 
     * Holds the operator for closing curves. Default is 'Z'.
     */
    closeOp = 'Z';

    /**
     * Variable: pointerEvents
     * 
     * Boolean value that specifies if events should be handled. Default is false.
     */
    pointerEvents = false;

    converter: mxUrlConverter;


    constructor() {
        /**
         * Variable: converter
         * 
         * Holds the <mxUrlConverter> to convert image URLs.
         */
        this.converter = this.createUrlConverter();
        this.reset();
    }


    /**
     * Function: createUrlConverter
     * 
     * Create a new <mxUrlConverter> and returns it.
     */
    createUrlConverter() {
        return new mxUrlConverter();
    };

    /**
     * Function: reset
     * 
     * Resets the state of this canvas.
     */
    reset(...args: any[]){
        this.state = this.createState();
        this.states = [];
    };

    /**
     * Function: createState
     * 
     * Creates the state of the this canvas.
     */
    createState() {
        return {
            dx: 0,
            dy: 0,
            scale: 1,
            alpha: 1,
            fillAlpha: 1,
            strokeAlpha: 1,
            fillColor: null as string | null,
            gradientFillAlpha: 1,
            gradientColor: null as string | null,
            gradientAlpha: 1,
            gradientDirection: null as string | null,
            strokeColor: null as string | null,
            strokeWidth: 1,
            dashed: false,
            dashPattern: '3 3',
            fixDash: false,
            lineCap: 'flat',
            lineJoin: 'miter',
            miterLimit: 10,
            fontColor: '#000000' as string | null,
            fontBackgroundColor: null as string | null,
            fontBorderColor: null as string | null,
            fontSize: mxConstants.DEFAULT_FONTSIZE,
            fontFamily: mxConstants.DEFAULT_FONTFAMILY,
            fontStyle: 0,
            shadow: false,
            shadowColor: mxConstants.SHADOWCOLOR as string | null,
            shadowAlpha: mxConstants.SHADOW_OPACITY,
            shadowDx: mxConstants.SHADOW_OFFSET_X,
            shadowDy: mxConstants.SHADOW_OFFSET_Y,
            rotation: 0,
            rotationCx: 0,
            rotationCy: 0,
            transform: null as string | null,
        };
    };

    /**
     * Function: format
     * 
     * Rounds all numbers to integers.
     */
    format (value: number | string) {
        return Math.round(parseFloat('' + value));
    };

    /**
     * Function: addOp
     * 
     * Adds the given operation to the path.
     */
    addOp(...args: any[]) {
        if (this.path != null) {
            this.path.push(args[0]);

            if (args.length > 2) {
                var s = this.state;

                for (var i = 2; i < args.length; i += 2) {
                    this.lastX = args[i - 1];
                    this.lastY = args[i];

                    this.path.push(this.format((this.lastX + s.dx) * s.scale));
                    this.path.push(this.format((this.lastY + s.dy) * s.scale));
                }
            }
        }
    };

    /**
     * Function: rotatePoint
     * 
     * Rotates the given point and returns the result as an <mxPoint>.
     */
    rotatePoint(x: number, y: number, theta: number, cx: number, cy: number) {
        var rad = theta * (Math.PI / 180);

        return mxUtils.getRotatedPoint(new mxPoint(x, y), Math.cos(rad),
            Math.sin(rad), new mxPoint(cx, cy));
    };

    /**
     * Function: save
     * 
     * Saves the current state.
     */
    save() {
        this.states.push(this.state);
        this.state = mxUtils.clone(this.state);
    };

    /**
     * Function: restore
     * 
     * Restores the current state.
     */
    restore() {
        if (this.states.length > 0) {
            this.state = this.states.pop()!;
        }
    };

    /**
     * Function: setLink
     * 
     * Sets the current link. Hook for subclassers.
     */
    setLink(link: string | null) {
        // nop
    };

    /**
     * Function: scale
     * 
     * Scales the current state.
     */
    scale(value: number) {
        this.state.scale *= value;
        this.state.strokeWidth *= value;
    };

    /**
     * Function: translate
     * 
     * Translates the current state.
     */
    translate(dx: number, dy: number) {
        this.state.dx += dx;
        this.state.dy += dy;
    };

    /**
     * Function: rotate
     * 
     * Rotates the current state.
     */
    rotate(theta: number, flipH: boolean, flipV: boolean, cx: number, cy: number) {
        // nop
    };

    /**
     * Function: setAlpha
     * 
     * Sets the current alpha.
     */
    setAlpha(value: number) {
        this.state.alpha = value;
    };

    /**
     * Function: setFillAlpha
     * 
     * Sets the current solid fill alpha.
     */
    setFillAlpha(value: number) {
        this.state.fillAlpha = value;
    };

    /**
     * Function: setStrokeAlpha
     * 
     * Sets the current stroke alpha.
     */
    setStrokeAlpha(value: number) {
        this.state.strokeAlpha = value;
    };

    /**
     * Function: setFillColor
     * 
     * Sets the current fill color.
     */
    setFillColor(value: string | null) {
        if (value == mxConstants.NONE) {
            value = null;
        }

        this.state.fillColor = value;
        this.state.gradientColor = null;
    };

    /**
     * Function: setGradient
     * 
     * Sets the current gradient.
     */
    setGradient(color1: string | null, color2: string | null, x: number, y: number, w: number, h: number, direction: string | null, alpha1: number | null = null, alpha2: number | null = null) {
        var s = this.state;
        s.fillColor = color1;
        s.gradientFillAlpha = (alpha1 != null) ? alpha1 : 1;
        s.gradientColor = color2;
        s.gradientAlpha = (alpha2 != null) ? alpha2 : 1;
        s.gradientDirection = direction;
    };

    /**
     * Function: setStrokeColor
     * 
     * Sets the current stroke color.
     */
    setStrokeColor(value: string | null) {
        if (value == mxConstants.NONE) {
            value = null;
        }

        this.state.strokeColor = value;
    };

    /**
     * Function: setStrokeWidth
     * 
     * Sets the current stroke width.
     */
    setStrokeWidth(value: number) {
        this.state.strokeWidth = value;
    };

    /**
     * Function: setDashed
     * 
     * Enables or disables dashed lines.
     */
    setDashed(value: boolean, fixDash: boolean = false) {
        this.state.dashed = value;
        this.state.fixDash = fixDash;
    };

    /**
     * Function: setDashPattern
     * 
     * Sets the current dash pattern.
     */
    setDashPattern(value: string) {
        this.state.dashPattern = value;
    };

    /**
     * Function: setLineCap
     * 
     * Sets the current line cap.
     */
    setLineCap(value: string) {
        this.state.lineCap = value;
    };

    /**
     * Function: setLineJoin
     * 
     * Sets the current line join.
     */
    setLineJoin(value: string) {
        this.state.lineJoin = value;
    };

    /**
     * Function: setMiterLimit
     * 
     * Sets the current miter limit.
     */
    setMiterLimit(value: number) {
        this.state.miterLimit = value;
    };

    /**
     * Function: setFontColor
     * 
     * Sets the current font color.
     */
    setFontColor(value: string | null) {
        if (value == mxConstants.NONE) {
            value = null;
        }

        this.state.fontColor = value;
    };

    /**
     * Function: setFontColor
     * 
     * Sets the current font color.
     */
    setFontBackgroundColor(value: string | null) {
        if (value == mxConstants.NONE) {
            value = null;
        }

        this.state.fontBackgroundColor = value;
    };

    /**
     * Function: setFontColor
     * 
     * Sets the current font color.
     */
    setFontBorderColor(value: string | null) {
        if (value == mxConstants.NONE) {
            value = null;
        }

        this.state.fontBorderColor = value;
    };

    /**
     * Function: setFontSize
     * 
     * Sets the current font size.
     */
    setFontSize(value: number) {
        this.state.fontSize = parseFloat('' + value);
    };

    /**
     * Function: setFontFamily
     * 
     * Sets the current font family.
     */
    setFontFamily(value: string) {
        this.state.fontFamily = value;
    };

    /**
     * Function: setFontStyle
     * 
     * Sets the current font style.
     */
    setFontStyle(value: number | null) {
        if (value == null) {
            value = 0;
        }

        this.state.fontStyle = value;
    };

    /**
     * Function: setShadow
     * 
     * Enables or disables and configures the current shadow.
     */
    setShadow(enabled: boolean) {
        this.state.shadow = enabled;
    };

    /**
     * Function: setShadowColor
     * 
     * Enables or disables and configures the current shadow.
     */
    setShadowColor(value: string | null) {
        if (value == mxConstants.NONE) {
            value = null;
        }

        this.state.shadowColor = value;
    };

    /**
     * Function: setShadowAlpha
     * 
     * Enables or disables and configures the current shadow.
     */
    setShadowAlpha(value: number) {
        this.state.shadowAlpha = value;
    };

    /**
     * Function: setShadowOffset
     * 
     * Enables or disables and configures the current shadow.
     */
    setShadowOffset(dx: number, dy: number) {
        this.state.shadowDx = dx;
        this.state.shadowDy = dy;
    };

    /**
     * Function: begin
     * 
     * Starts a new path.
     */
    begin() {
        this.lastX = 0;
        this.lastY = 0;
        this.path = [];
    };

    /**
     * Function: moveTo
     * 
     *  Moves the current path the given coordinates.
     */
    moveTo(x: number, y: number) {
        this.addOp(this.moveOp, x, y);
    };

    /**
     * Function: lineTo
     * 
     * Draws a line to the given coordinates. Uses moveTo with the op argument.
     */
    lineTo(x: number, y: number) {
        this.addOp(this.lineOp, x, y);
    };

    /**
     * Function: quadTo
     * 
     * Adds a quadratic curve to the current path.
     */
    quadTo(x1: number, y1: number, x2: number, y2: number) {
        this.addOp(this.quadOp, x1, y1, x2, y2);
    };

    /**
     * Function: curveTo
     * 
     * Adds a bezier curve to the current path.
     */
    curveTo(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        this.addOp(this.curveOp, x1, y1, x2, y2, x3, y3);
    };

    /**
     * Function: arcTo
     * 
     * Adds the given arc to the current path. This is a synthetic operation that
     * is broken down into curves.
     */
    arcTo(rx: number, ry: number, angle: number, largeArcFlag: number, sweepFlag: number, x: number, y: number) {
        var curves = mxUtils.arcToCurves(this.lastX, this.lastY, rx, ry, angle, largeArcFlag, sweepFlag, x, y);

        if (curves != null) {
            for (var i = 0; i < curves.length; i += 6) {
                this.curveTo(curves[i], curves[i + 1], curves[i + 2],
                    curves[i + 3], curves[i + 4], curves[i + 5]);
            }
        }
    };

    /**
     * Function: close
     * 
     * Closes the current path.
     */
    close(x1?: number, y1?: number, x2?: number, y2?: number, x3?: number, y3?: number) {
        this.addOp(this.closeOp);
    };

    /**
     * Function: end
     * 
     * Empty implementation for backwards compatibility. This will be removed.
     */
    end() { };
}

