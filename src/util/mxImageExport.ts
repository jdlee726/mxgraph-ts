import { mxUtils } from "./mxUtils";
import mxShape from "../shape/mxShape";
import mxCellState from "../view/mxCellState";
import { TCanvas2D } from "./mxSvgCanvas2D";

/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
/**
 * Class: mxImageExport
 * 
 * Creates a new image export instance to be used with an export canvas. Here
 * is an example that uses this class to create an image via a backend using
 * <mxXmlExportCanvas>.
 * 
 * (code)
 * var xmlDoc = mxUtils.createXmlDocument();
 * var root = xmlDoc.createElement('output');
 * xmlDoc.appendChild(root);
 * 
 * var xmlCanvas = new mxXmlCanvas2D(root);
 * var imgExport = new mxImageExport();
 * imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);
 * 
 * var bounds = graph.getGraphBounds();
 * var w = Math.ceil(bounds.x + bounds.width);
 * var h = Math.ceil(bounds.y + bounds.height);
 * 
 * var xml = mxUtils.getXml(root);
 * new mxXmlRequest('export', 'format=png&w=' + w +
 * 		'&h=' + h + '&bg=#F9F7ED&xml=' + encodeURIComponent(xml))
 * 		.simulate(document, '_blank');
 * (end)
 * 
 * Constructor: mxImageExport
 * 
 * Constructs a new image export.
 */
export default class mxImageExport {

    /**
     * Variable: includeOverlays
     * 
     * Specifies if overlays should be included in the export. Default is false.
     */
    includeOverlays = false;
    constructor() {
        
    }



    /**
     * Function: drawState
     * 
     * Draws the given state and all its descendants to the given canvas.
     */
    drawState(state: mxCellState, canvas: TCanvas2D) {
        if (state != null) {
            this.visitStatesRecursive(state, canvas, () => {
                this.drawCellState(state, canvas);
            });

            // Paints the overlays
            if (this.includeOverlays) {
                this.visitStatesRecursive(state, canvas, () => {
                    this.drawOverlays(state, canvas);
                });
            }
        }
    };

    /**
     * Function: drawState
     * 
     * Draws the given state and all its descendants to the given canvas.
     */
    visitStatesRecursive(state: mxCellState, canvas: TCanvas2D, visitor: (state: mxCellState, canvas: TCanvas2D)=>void) {
        if (state != null) {
            visitor(state, canvas);

            var graph = state.view.graph;
            var childCount = graph.model.getChildCount(state.cell);

            for (var i = 0; i < childCount; i++) {
                var childState = graph.view.getState(graph.model.getChildAt(state.cell, i));
                this.visitStatesRecursive(childState, canvas, visitor);
            }
        }
    };

    /**
     * Function: getLinkForCellState
     * 
     * Returns the link for the given cell state and canvas. This returns null.
     */
    getLinkForCellState(state: mxCellState, canvas: TCanvas2D) {
        return null;
    };

    /**
     * Function: drawCellState
     * 
     * Draws the given state to the given canvas.
     */
    drawCellState(state: mxCellState, canvas: TCanvas2D) {
        // Experimental feature
        var link = this.getLinkForCellState(state, canvas);

        if (link != null) {
            canvas.setLink(link);
        }

        // Paints the shape and text
        this.drawShape(state, canvas);
        this.drawText(state, canvas);

        if (link != null) {
            canvas.setLink(null);
        }
    };

    /**
     * Function: drawShape
     * 
     * Draws the shape of the given state.
     */
    drawShape(state: mxCellState, canvas: TCanvas2D) {
        if (state.shape instanceof mxShape && state.shape.checkBounds()) {
            canvas.save();
            state.shape.paint(canvas);
            canvas.restore();
        }
    };

    /**
     * Function: drawText
     * 
     * Draws the text of the given state.
     */
    drawText(state: mxCellState, canvas: TCanvas2D) {
        if (state.text != null && state.text.checkBounds()) {
            canvas.save();
            state.text.paint(canvas);
            canvas.restore();
        }
    };

    /**
     * Function: drawOverlays
     * 
     * Draws the overlays for the given state. This is called if <includeOverlays>
     * is true.
     */
    drawOverlays(state: mxCellState, canvas: TCanvas2D) {
        if (state.overlays != null) {
            state.overlays.visit(function (id, shape) {
                if (shape instanceof mxShape) {
                    shape.paint(canvas);
                }
            });
        }
    };
}


