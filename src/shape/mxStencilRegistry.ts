import { IPlainObject } from "../util/mxConstants";
import mxStencil from "./mxStencil";

/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 * 
 * Code to add stencils.
 * 
 * (code)
 * var req = mxUtils.load('test/stencils.xml');
 * var root = req.getDocumentElement();
 * var shape = root.firstChild;
 * 
 * while (shape != null)
 * {
 * 	 if (shape.nodeType == mxConstants.NODETYPE_ELEMENT)
 *   {
 *     mxStencilRegistry.addStencil(shape.getAttribute('name'), new mxStencil(shape));
 *   }
 *   
 *   shape = shape.nextSibling;
 * }
 * (end)
 */
export const mxStencilRegistry =
{
	/**
	 * Class: mxStencilRegistry
	 * 
	 * A singleton class that provides a registry for stencils and the methods
	 * for painting those stencils onto a canvas or into a DOM.
	 */
    stencils: {} as IPlainObject,

	/**
	 * Function: addStencil
	 * 
	 * Adds the given <mxStencil>.
	 */
    addStencil: function (name: string, stencil: mxStencil) {
        mxStencilRegistry.stencils[name] = stencil;
    },

	/**
	 * Function: getStencil
	 * 
	 * Returns the <mxStencil> for the given name.
	 */
    getStencil: function (name: string) {
        return mxStencilRegistry.stencils[name];
    }

};
