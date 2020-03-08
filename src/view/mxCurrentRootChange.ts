import mxGraphView from "./mxGraphView";
import mxCell from "../model/mxCell";
import mxPoint from "../util/mxPoint";
import { mxEvent } from "../util/mxEvent";
import mxEventObject from "../util/mxEventObject";

/**
 * Class: mxCurrentRootChange
 *
 * Action to change the current root in a view.
 *
 * Constructor: mxCurrentRootChange
 *
 * Constructs a change of the current root in the given view.
 */
export default class mxCurrentRootChange {

    view: mxGraphView;
    root: mxCell;
    previous: mxCell;
    isUp: boolean;
    constructor(view: mxGraphView, root: mxCell) {
        this.view = view;
        this.root = root;
        this.previous = root;
        this.isUp = root == null;

        if (!this.isUp) {
            var tmp = this.view.currentRoot;
            var model = this.view.graph.getModel();

            while (tmp != null) {
                if (tmp == root) {
                    this.isUp = true;
                    break;
                }

                tmp = model.getParent(tmp);
            }
        }
    }



    /**
     * Function: execute
     *
     * Changes the current root of the view.
     */
    execute = () => {
        var tmp = this.view.currentRoot;
        this.view.currentRoot = this.previous;
        this.previous = tmp;

        var translate = this.view.graph.getTranslateForRoot(this.view.currentRoot);

        if (translate != null) {
            this.view.translate = new mxPoint(-translate.x, -translate.y);
        }

        if (this.isUp) {
            this.view.clear(this.view.currentRoot, true);
            this.view.validate();
        }
        else {
            this.view.refresh();
        }

        var name = (this.isUp) ? mxEvent.UP : mxEvent.DOWN;
        this.view.fireEvent(new mxEventObject(name,
            'root', this.view.currentRoot, 'previous', this.previous));
        this.isUp = !this.isUp;
    };

}
