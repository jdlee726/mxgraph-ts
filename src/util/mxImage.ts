/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
/**
 * Class: mxImage
 *
 * Encapsulates the URL, width and height of an image.
 * 
 * Constructor: mxImage
 * 
 * Constructs a new image.
 */
export default class mxImage {
    /**
 * Variable: src
 *
 * String that specifies the URL of the image.
 */
    src: string | null = null;

    /**
     * Variable: width
     *
     * Integer that specifies the width of the image.
     */
   width: number | null = null;

    /**
     * Variable: height
     *
     * Integer that specifies the height of the image.
     */
    height:  number | null = null;

    constructor(src: string | null, width: number | null, height: number | null) {
        this.src = src;
        this.width = width;
        this.height = height;
    }
}

