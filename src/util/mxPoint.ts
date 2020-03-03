import { mxUtils } from "./mxUtils";

/**
 * Class: mxPoint
 *
 * Implements a 2-dimensional vector with double precision coordinates.
 *
 * Constructor: mxPoint
 *
 * Constructs a new point for the optional x and y coordinates. If no
 * coordinates are given, then the default values for <x> and <y> are used.
 */
export default class mxPoint {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /**
    * Function: equals
    *
    * Returns true if the given object equals this point.
    */
    equals = (obj: mxPoint) =>{
        return obj != null && obj.x == this.x && obj.y == this.y;
    }

    /**
    * Function: clone
    *
    * Returns a clone of this <mxPoint>.
    */
    clone = () => {
        // Handles subclasses as well
        return mxUtils.clone(this);
    }
}