import mxShape from "./mxShape";
import { mxConstants } from "../util/mxConstants";
import { mxUtils } from "../util/mxUtils";
import mxPoint from "../util/mxPoint";
import mxSvgCanvas2D, { TCanvas2D } from "../util/mxSvgCanvas2D";

/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
/**
 * Class: mxPolyline
 *
 * Extends <mxShape> to implement a polyline (a line with multiple points).
 * This shape is registered under <mxConstants.SHAPE_POLYLINE> in
 * <mxCellRenderer>.
 * 
 * Constructor: mxPolyline
 *
 * Constructs a new polyline shape.
 * 
 * Parameters:
 * 
 * points - Array of <mxPoints> that define the points. This is stored in
 * <mxShape.points>.
 * stroke - String that defines the stroke color. Default is 'black'. This is
 * stored in <stroke>.
 * strokewidth - Optional integer that defines the stroke width. Default is
 * 1. This is stored in <strokewidth>.
 */
export default class mxPolyline extends mxShape {
    points: mxPoint[];
    stroke: string | null;
    constructor(points: mxPoint[], stroke: string | null, strokewidth: number = 1) {
        super();
        this.points = points;
        this.stroke = stroke;
        this.strokewidth = strokewidth;
    }


    /**
     * Function: getRotation
     * 
     * Returns 0.
     */
    getRotation() {
        return 0;
    };

    /**
     * Function: getShapeRotation
     * 
     * Returns 0.
     */
    getShapeRotation() {
        return 0;
    };

    /**
     * Function: isPaintBoundsInverted
     * 
     * Returns false.
     */
    isPaintBoundsInverted() {
        return false;
    };

    /**
     * Function: paintEdgeShape
     * 
     * Paints the line shape.
     */
    paintEdgeShape(c: mxSvgCanvas2D, pts: mxPoint[]) {
        var prev = c.pointerEventsValue;
        c.pointerEventsValue = 'stroke';

        if (this.style == null || this.style[mxConstants.STYLE_CURVED] != 1) {
            this.paintLine(c, pts, this.isRounded);
        }
        else {
            this.paintCurvedLine(c, pts);
        }

        c.pointerEventsValue = prev;
    };

    /**
     * Function: paintLine
     * 
     * Paints the line shape.
     */
    paintLine(c: TCanvas2D, pts: mxPoint[], rounded: boolean = false) {
        var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
        c.begin();
        this.addPoints(c, pts, rounded, arcSize, false);
        c.stroke();
    };

    /**
     * Function: paintLine
     * 
     * Paints the line shape.
     */
    paintCurvedLine(c: TCanvas2D, pts: mxPoint[]) {
        c.begin();

        var pt = pts[0];
        var n = pts.length;

        c.moveTo(pt.x, pt.y);

        for (var i = 1; i < n - 2; i++) {
            var p0 = pts[i];
            var p1 = pts[i + 1];
            var ix = (p0.x + p1.x) / 2;
            var iy = (p0.y + p1.y) / 2;

            c.quadTo(p0.x, p0.y, ix, iy);
        }

        var p0 = pts[n - 2];
        var p1 = pts[n - 1];

        c.quadTo(p0.x, p0.y, p1.x, p1.y);
        c.stroke();
    };
}


