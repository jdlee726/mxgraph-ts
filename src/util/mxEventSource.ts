import mxEventObject from "./mxEventObject";
import { IMxEventElement } from "./mxEvent";
/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
/**
 * Class: mxEventSource
 *
 * Base class for objects that dispatch named events. To create a subclass that
 * inherits from mxEventSource, the following code is used.
 *
 * (code)
 * function MyClass() { };
 *
 * MyClass.prototype = new mxEventSource();
 * MyClass.prototype.constructor = MyClass;
 * (end)
 *
 * Known Subclasses:
 *
 * <mxGraphModel>, <mxGraph>, <mxGraphView>, <mxEditor>, <mxCellOverlay>,
 * <mxToolbar>, <mxWindow>
 * 
 * Constructor: mxEventSource
 *
 * Constructs a new event source.
 */

export type TSender = IMxEventElement  | null; // mxEventSource | null |

export type mxEventHandler = (sender: TSender, evt: mxEventObject) => void;

export default class mxEventSource {


    /**
     * Variable: eventsEnabled
     *
     * Specifies if events can be fired. Default is true.
     */
    eventsEnabled = true;
    /**
     * Variable: eventListeners
     *
     * Holds the event names and associated listeners in an array. The array
     * contains the event name followed by the respective listener for each
     * registered listener.
     */
    eventListeners: any[];

    /**
     * Variable: eventSource
     *
     * Optional source for events. Default is null.
     */
    eventSource: TSender;
    constructor(eventSource: TSender = null) {
        this.setEventSource(eventSource);
    }


/**
* Function: isEventsEnabled
*
* Returns <eventsEnabled>.
*/
    isEventsEnabled = () => {
        return this.eventsEnabled;
    };

/**
* Function: setEventsEnabled
*
* Sets <eventsEnabled>.
*/
    setEventsEnabled =  (value: boolean) => {
        this.eventsEnabled = value;
    };


    /**
     * Function: getEventSource
     * 
     * Returns <eventSource>.
     */
    getEventSource = () => {
        return this.eventSource || null;
    };

    /**
     * Function: setEventSource
     * 
     * Sets <eventSource>.
     */
    setEventSource = (value: any) => {
        this.eventSource = value;
    };

    /**
 * Function: addListener
 *
 * Binds the specified function to the given event name. If no event name
 * is given, then the listener is registered for all events.
 * 
 * The parameters of the listener are the sender and an <mxEventObject>.
 */
    addListener = (name: string, funct: mxEventHandler) => {
        if (this.eventListeners == null) {
            this.eventListeners = [];
        }

        this.eventListeners.push(name);
        this.eventListeners.push(funct);
    };


    /**
     * Function: removeListener
     *
     * Removes all occurrences of the given listener from <eventListeners>.
     */
    removeListener =  (funct: mxEventHandler) => {
        if (this.eventListeners != null) {
            var i = 0;

            while (i < this.eventListeners.length) {
                if (this.eventListeners[i + 1] == funct) {
                    this.eventListeners.splice(i, 2);
                }
                else {
                    i += 2;
                }
            }
        }
    };

    /**
 * Function: fireEvent
 *
 * Dispatches the given event to the listeners which are registered for
 * the event. The sender argument is optional. The current execution scope
 * ("this") is used for the listener invocation (see <mxUtils.bind>).
 *
 * Example:
 *
 * (code)
 * fireEvent(new mxEventObject("eventName", key1, val1, .., keyN, valN))
 * (end)
 * 
 * Parameters:
 *
 * evt - <mxEventObject> that represents the event.
 * sender - Optional sender to be passed to the listener. Default value is
 * the return value of <getEventSource>.
 */
    fireEvent = (evt?: mxEventObject, sender: TSender = null) => {
        if (this.eventListeners != null && this.isEventsEnabled()) {
            if (evt == null) {
                evt = new mxEventObject();
            }

            if (sender == null) {
                sender = this.getEventSource();
            }

            if (sender == null) {
                // @ts-ignore
                sender = this;
            }

            var args = [sender, evt];

            for (var i = 0; i < this.eventListeners.length; i += 2) {
                var listen = this.eventListeners[i];

                if (listen == null || listen == evt.getName()) {
                    this.eventListeners[i + 1].apply(this, args);
                }
            }
        }
    };
}
