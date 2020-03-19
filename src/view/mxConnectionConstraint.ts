import mxPoint from "../util/mxPoint";

/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
/**
 * Class: mxConnectionConstraint
 * 
 * Defines an object that contains the constraints about how to connect one
 * side of an edge to its terminal.
 * 
 * Constructor: mxConnectionConstraint
 * 
 * Constructs a new connection constraint for the given point and boolean
 * arguments.
 * 
 * Parameters:
 * 
 * point - Optional <mxPoint> that specifies the fixed location of the point
 * in relative coordinates. Default is null.
 * perimeter - Optional boolean that specifies if the fixed point should be
 * projected onto the perimeter of the terminal. Default is true.
 */

export default class mxConnectionConstraint {


    /**
     * Variable: point
     * 
     * <mxPoint> that specifies the fixed location of the connection point.
     */
    point: mxPoint;

    /**
     * Variable: perimeter
     * 
     * Boolean that specifies if the point should be projected onto the perimeter
     * of the terminal.
     */
    perimeter: boolean = false;

    /**
     * Variable: name
     * 
     * Optional string that specifies the name of the constraint.
     */
    name: string | null;

    /**
     * Variable: dx
     * 
     * Optional float that specifies the horizontal offset of the constraint.
     */
    dx: number;

    /**
     * Variable: dy
     * 
     * Optional float that specifies the vertical offset of the constraint.
     */
    dy: number;

    constructor(point: mxPoint, perimeter = true, name: string | null, dx = 0, dy = 0) {
        this.point = point;
        this.perimeter = perimeter;
        this.name = name;
        this.dx = dx ? dx : 0;
        this.dy = dy ? dy : 0;
    }
}

