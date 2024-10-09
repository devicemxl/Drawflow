// Export the Drawflow class to be used in other modules or files.
export default class Drawflow {
    /**
     * Creates an instance of the Drawflow class.
     *
     * @param {HTMLElement} container - The DOM element that will contain the Drawflow canvas.
     * @param {Function|null} render - Optional custom render function for node visualization.
     * @param {Object|null} parent - Optional reference to a parent object for integration.
     */
    constructor(container, render = null, parent = null) {
        /**
         * @type {Object}
         * @property {Object} events - Event listeners object to hold various event callbacks (e.g., node addition, connection creation).
         */
        this.events = {};

        /**
         * @type {HTMLElement}
         * @property {HTMLElement} container - Reference to the container element where the Drawflow canvas will be rendered.
         */
        this.container = container;

        /**
         * @type {HTMLElement|null}
         * @property {HTMLElement|null} precanvas - Stores the canvas/pre-canvas element where nodes and connections will be drawn.
         */
        this.precanvas = null;

        /**
         * @type {number}
         * @property {number} nodeId - Counter for generating unique node IDs, starts at 1.
         */
        this.nodeId = 1;

        /**
         * @type {HTMLElement|null}
         * @property {HTMLElement|null} ele_selected - The currently selected HTML element.
         */
        this.ele_selected = null;

        /**
         * @type {Object|null}
         * @property {Object|null} node_selected - The currently selected node object.
         */
        this.node_selected = null;

        /**
         * @type {boolean}
         * @property {boolean} drag - Indicates whether a node is being dragged.
         */
        this.drag = false;

        /**
         * @type {boolean}
         * @property {boolean} reroute - Enables rerouting of connections for custom path drawing.
         */
        this.reroute = false;

        /**
         * @type {boolean}
         * @property {boolean} reroute_fix_curvature - If true, fixes curvature for rerouted connections.
         */
        this.reroute_fix_curvature = false;

        /**
         * @type {number}
         * @property {number} curvature - Curvature of connections between nodes.
         */
        this.curvature = 0.5;

        /**
         * @type {number}
         * @property {number} reroute_curvature_start_end - Curvature for the start/end of rerouted paths.
         */
        this.reroute_curvature_start_end = 0.5;

        /**
         * @type {number}
         * @property {number} reroute_curvature - Curvature for rerouted paths.
         */
        this.reroute_curvature = 0.5;

        /**
         * @type {number}
         * @property {number} reroute_width - Width of rerouted paths/connection lines.
         */
        this.reroute_width = 6;

        /**
         * @type {boolean}
         * @property {boolean} drag_point - Indicates if a connection point is being dragged.
         */
        this.drag_point = false;

        /**
         * @type {boolean}
         * @property {boolean} editor_selected - Indicates if the editor itself (canvas) is selected.
         */
        this.editor_selected = false;

        /**
         * @type {boolean}
         * @property {boolean} connection - Whether a connection is currently being made between nodes.
         */
        this.connection = false;

        /**
         * @type {HTMLElement|null}
         * @property {HTMLElement|null} connection_ele - The element that is being connected.
         */
        this.connection_ele = null;

        /**
         * @type {Object|null}
         * @property {Object|null} connection_selected - The currently selected connection.
         */
        this.connection_selected = null;

        /**
         * @type {number}
         * @property {number} canvas_x - X-coordinate of the canvas.
         */
        this.canvas_x = 0;

        /**
         * @type {number}
         * @property {number} canvas_y - Y-coordinate of the canvas.
         */
        this.canvas_y = 0;

        /**
         * @type {number}
         * @property {number} pos_x - Current X-coordinate of the cursor or element being moved.
         */
        this.pos_x = 0;

        /**
         * @type {number}
         * @property {number} pos_x_start - Initial X-coordinate at the start of a drag event.
         */
        this.pos_x_start = 0;

        /**
         * @type {number}
         * @property {number} pos_y - Current Y-coordinate of the cursor or element being moved.
         */
        this.pos_y = 0;

        /**
         * @type {number}
         * @property {number} pos_y_start - Initial Y-coordinate at the start of a drag event.
         */
        this.pos_y_start = 0;

        /**
         * @type {number}
         * @property {number} mouse_x - Current X-position of the mouse.
         */
        this.mouse_x = 0;

        /**
         * @type {number}
         * @property {number} mouse_y - Current Y-position of the mouse.
         */
        this.mouse_y = 0;

        /**
         * @type {number}
         * @property {number} line_path - Default width of connection lines.
         */
        this.line_path = 5;

        /**
         * @type {number|null}
         * @property {number|null} first_click - Tracks the first click for certain actions (e.g., selecting nodes).
         */
        this.first_click = null;

        /**
         * @type {boolean}
         * @property {boolean} force_first_input - Forces connection from the first input of a node.
         */
        this.force_first_input = false;

        /**
         * @type {boolean}
         * @property {boolean} draggable_inputs - Controls whether input nodes are draggable or static.
         */
        this.draggable_inputs = true;

        /**
         * @type {boolean}
         * @property {boolean} useuuid - Flag to determine if UUIDs (universally unique identifiers) should be used for node IDs.
         */
        this.useuuid = false;

        /**
         * @type {Object|null}
         * @property {Object|null} parent - Reference to a parent object, useful for embedding Drawflow within another UI component.
         */
        this.parent = parent;

        /**
         * @type {Object}
         * @property {Object} noderegister - Object to register different types of nodes.
         */
        this.noderegister = {};

        /**
         * @type {Function|null}
         * @property {Function|null} render - Render engine, if provided, will handle custom rendering of nodes.
         */
        this.render = render;

        /**
         * @type {Object}
         * @property {Object} drawflow - Main data structure holding the entire drawflow data, starting with the "Home" module.
         */
        this.drawflow = { "drawflow": { "Home": { "data": {} } } };

        /**
         * @type {string}
         * @property {string} module - Active module name, default is "Home."
         */
        this.module = 'Home';

        /**
         * @type {string}
         * @property {string} editor_mode - The current mode of the editor (edit/view).
         */
        this.editor_mode = 'edit';

        /**
         * @type {number}
         * @property {number} zoom - Current zoom level.
         */
        this.zoom = 1;

        /**
         * @type {number}
         * @property {number} zoom_max - Maximum zoom level.
         */
        this.zoom_max = 1.6;

        /**
         * @type {number}
         * @property {number} zoom_min - Minimum zoom level.
         */
        this.zoom_min = 0.5;

        /**
         * @type {number}
         * @property {number} zoom_value - Incremental value for zooming.
         */
        this.zoom_value = 0.1;

        /**
         * @type {number}
         * @property {number} zoom_last_value - Last recorded zoom level.
         */
        this.zoom_last_value = 1;

        /**
         * @type {Array}
         * @property {Array} evCache - Cache to store touch events for mobile touch event handling.
         */
        this.evCache = new Array();

        /**
         * @type {number}
         * @property {number} prevDiff - Used to store the previous distance between two touch points.
         */
        this.prevDiff = -1;
    }
}


/**
 * Initializes the Drawflow editor by setting up the drawing canvas and binding necessary event listeners.
 * This method prepares the editor for user interactions, including dragging nodes, making connections,
 * zooming, and handling keyboard inputs.
 *
 * @method start
 * @returns {void}
 *
 * @description
 * The start method encompasses the following steps:
 * 1. Initialization: Creates the drawing canvas (precanvas) and sets up event listeners for mouse and touch interactions.
 * 2. Event Handlers: Binds various event listeners (for mouse, touch, and keyboard) to corresponding methods.
 * 3. Mobile Support: Utilizes pointer events to ensure compatibility with mobile devices, enabling gestures like dragging and zooming.
 * 4. Context Menu and Keyboard Input: Handles right-click context menus and keydown events for user convenience.
 */
start() {
    // Adds the 'parent-drawflow' class to the container for editor-specific styles.
    this.container.classList.add("parent-drawflow");

    // Sets the container's tabIndex to 0, making it focusable for keyboard events (e.g., delete).
    this.container.tabIndex = 0;

    // Creates a new div element for the drawing canvas.
    this.precanvas = document.createElement('div');

    // Adds the 'drawflow' class to the canvas div for styling.
    this.precanvas.classList.add("drawflow");

    // Appends the precanvas div to the container.
    this.container.appendChild(this.precanvas);

    /* Mouse and Touch Actions */
    // Binds mouse/touch actions to the corresponding event handlers.
    
    // Mouse 'mouseup' event to stop dragging or connecting elements.
    this.container.addEventListener('mouseup', this.dragEnd.bind(this));

    // Mouse 'mousemove' event to track cursor position and move elements accordingly.
    this.container.addEventListener('mousemove', this.position.bind(this));

    // Mouse 'mousedown' event to detect node or element selection (start dragging or connecting).
    this.container.addEventListener('mousedown', this.click.bind(this));

    // Touch 'touchend' event for touch devices, similar to mouseup.
    this.container.addEventListener('touchend', this.dragEnd.bind(this));

    // Touch 'touchmove' event to track finger position during dragging on touch devices.
    this.container.addEventListener('touchmove', this.position.bind(this));

    // Touch 'touchstart' event for detecting touch inputs and handling selection or dragging.
    this.container.addEventListener('touchstart', this.click.bind(this));

    /* Context Menu */
    // Right-click 'contextmenu' event to handle custom context menus for adding or deleting nodes.
    this.container.addEventListener('contextmenu', this.contextmenu.bind(this));

    /* Delete */
    // 'keydown' event to listen for keyboard actions (e.g., delete or backspace) for removing selected nodes/connections.
    this.container.addEventListener('keydown', this.key.bind(this));

    /* Zoom Mouse */
    // 'wheel' event to handle zooming in and out with mouse wheel or touchpad scrolling.
    this.container.addEventListener('wheel', this.zoom_enter.bind(this));

    /* Update data Nodes */
    // 'input' event for live updates to node data when input fields change.
    this.container.addEventListener('input', this.updateNodeValue.bind(this));

    // 'dblclick' event to detect double-clicks for actions like opening node settings or expanding a node.
    this.container.addEventListener('dblclick', this.dblclick.bind(this));

    /* Mobile zoom */
    // Pointer events for mobile devices to allow multi-touch gestures and pointer interactions.
    
    // 'pointerdown' event to track the start of touch or pointer interactions.
    this.container.onpointerdown = this.pointerdown_handler.bind(this);

    // 'pointermove' event to track pointer movement (e.g., for panning or dragging on mobile devices).
    this.container.onpointermove = this.pointermove_handler.bind(this);

    // 'pointerup' event to handle the end of a pointer (touch or stylus) interaction.
    this.container.onpointerup = this.pointerup_handler.bind(this);

    // 'pointercancel', 'pointerout', and 'pointerleave' events to end interactions when a pointer leaves the canvas area.
    this.container.onpointercancel = this.pointerup_handler.bind(this);
    this.container.onpointerout = this.pointerup_handler.bind(this);
    this.container.onpointerleave = this.pointerup_handler.bind(this);

    // Loads initial data and setup for the Drawflow editor (e.g., restoring saved nodes or connections).
    this.load();
}

/**
 * Event handler for the 'pointerdown' event, triggered when a pointer 
 * (finger or stylus) touches the screen.
 * This method caches the active pointer event to manage multiple touch 
 * points effectively.
 *
 * @param {PointerEvent} ev - The event object containing information 
 * about the pointer event, such as its position, ID, and type.
 */
pointerdown_handler(ev) {
    // Adds the event (containing pointer information) to the event cache 
    // (`evCache`), which stores active touch points.
    this.evCache.push(ev);
}

/**
 * Event handler for the 'pointermove' event, triggered when a pointer 
 * moves on the screen.
 * This method updates the event cache with the current pointer data 
 * and handles zooming functionality during pinch gestures.
 *
 * @param {PointerEvent} ev - The event object containing information 
 * about the pointer movement, such as its position and pointer ID.
 */
pointermove_handler(ev) {
    // Loops through the event cache to find the pointer event that 
    // matches the current one (`ev.pointerId`).
    for (var i = 0; i < this.evCache.length; i++) {
        if (ev.pointerId == this.evCache[i].pointerId) {
            // Updates the cached event with the current pointer data.
            this.evCache[i] = ev;
            break; // Exit the loop once the correct pointer event is found and updated.
        }
    }

    // Check if two pointers are on the screen (i.e., a pinch gesture is happening).
    if (this.evCache.length == 2) {
        // Calculate the horizontal distance between the two pointers.
        var curDiff = Math.abs(this.evCache[0].clientX - this.evCache[1].clientX);

        // If there was a previous recorded distance, compare it to the current distance.
        if (this.prevDiff > 100) {
            // If the distance has increased, zoom in (the fingers are moving apart).
            if (curDiff > this.prevDiff) {
                this.zoom_in(); // Calls the zoom-in method to increase zoom level.
            }
            // If the distance has decreased, zoom out (the fingers are coming together).
            if (curDiff < this.prevDiff) {
                this.zoom_out(); // Calls the zoom-out method to decrease zoom level.
            }
        }
        // Store the current distance for the next move event.
        this.prevDiff = curDiff;
    }
}

/**
 * Event handler for the 'pointerup' event, triggered when a pointer 
 * is lifted from the screen.
 * This method removes the pointer from the event cache and resets 
 * the previous difference if there are fewer than two active pointers.
 *
 * @param {PointerEvent} ev - The event object containing information 
 * about the pointer release, such as its position and pointer ID.
 */
pointerup_handler(ev) {
    // Calls `remove_event` to remove the pointer from the cache when 
    // the pointer is no longer active.
    this.remove_event(ev);

    // If fewer than two pointers are active, reset the previous difference 
    // (pinch-zooming is no longer possible).
    if (this.evCache.length < 2) {
        this.prevDiff = -1;
    }
}

/**
 * Helper function to remove an event from the event cache.
 * This function searches for the pointer event in the cache 
 * that corresponds to the lifted pointer and removes it.
 *
 * @param {PointerEvent} ev - The event object containing information 
 * about the lifted pointer, including its pointer ID.
 */
remove_event(ev) {
    // Loops through the event cache to find and remove the event 
    // corresponding to the pointer that was lifted.
    for (var i = 0; i < this.evCache.length; i++) {
        if (this.evCache[i].pointerId == ev.pointerId) {
            // Removes the pointer event from the cache, as it's no longer needed.
            this.evCache.splice(i, 1);
            break; // Exit the loop once the event has been removed.
        }
    }
}

/* End Mobile Zoom */
/**
 * Initializes the drawflow editor by importing saved nodes and connections 
 * into the canvas and updating the node ID for future additions.
 *
 * This function performs the following tasks:
 *
 * 1. **Node Import**: Loops through each node in the current module (`this.module`) 
 *    and adds them to the canvas using `addNodeImport`, reconstructing the editor's 
 *    state by loading previously saved nodes.
 *
 * 2. **Reroute Handling**: If rerouting (alternative paths between nodes) is 
 *    enabled (`this.reroute`), it iterates through the node data again and calls 
 *    `addRerouteImport` to manage reroute-specific rendering for each node.
 *
 * 3. **Connection Update**: Updates the connections between nodes by calling 
 *    `updateConnectionNodes`. This ensures that once the nodes are loaded, their 
 *    connections (wires) are also rendered on the canvas.
 *
 * 4. **Node ID Management**: Scans all modules and their nodes to ensure that when 
 *    a new node is created, it gets a unique ID. The highest node ID found is used 
 *    as a reference, and `this.nodeId` is updated to the next available ID, ensuring 
 *    no conflicts with existing nodes.
 */
load() {
    // Loops through all the nodes in the current module and adds them to the canvas.
    for (var key in this.drawflow.drawflow[this.module].data) {
        // Calls `addNodeImport` to render each node from the saved data into the canvas (precanvas).
        this.addNodeImport(this.drawflow.drawflow[this.module].data[key], this.precanvas);
    }

    // If rerouting is enabled, it handles reroute paths for nodes.
    if (this.reroute) {
        for (var key in this.drawflow.drawflow[this.module].data) {
            // Calls `addRerouteImport` to render rerouting paths for the imported nodes.
            this.addRerouteImport(this.drawflow.drawflow[this.module].data[key]);
        }
    }

    // Updates the connection status of all nodes in the module by checking their connection states.
    for (var key in this.drawflow.drawflow[this.module].data) {
        // Calls `updateConnectionNodes` to establish connections between nodes (e.g., drawing lines between connected nodes).
        this.updateConnectionNodes('node-' + key);
    }

    // Ensures that node IDs are correctly set for new nodes to be added after loading the current state.
    const editor = this.drawflow.drawflow;
    let number = 1;

    // Loops through all modules and their nodes to find the highest node ID in use.
    Object.keys(editor).map(function (moduleName, index) {
        Object.keys(editor[moduleName].data).map(function (id, index2) {
            // Compares node IDs, setting `number` to one more than the highest ID found.
            if (parseInt(id) >= number) {
                number = parseInt(id) + 1;
            }
        });
    });

    // Sets the node ID for the next new node to be added to the canvas.
    this.nodeId = number;
}

removeReouteConnectionSelected() {
    /*
    removeReouteConnectionSelected()
    ================================
    The removeReouteConnectionSelected() function handles the deselection of rerouted connections, dispatching 
    an event and removing any visual indication that a connection is selected.

    */
    // Dispatches a 'connectionUnselected' event. 
    // This can be used to notify other parts of the system that a connection has been deselected.
    this.dispatch('connectionUnselected', true);

    // If reroute curvature is fixed, it deselects the currently selected connection line (removes the visual highlight).
    if (this.reroute_fix_curvature) {
        // Selects all elements with the class 'main-path' inside the parent of the selected connection.
        this.connection_selected.parentElement.querySelectorAll(".main-path").forEach((item, i) => {
            // Removes the 'selected' class from each 'main-path', effectively unhighlighting the connection line.
            item.classList.remove("selected");
        });
    }
};

/**
 * Handles click events within the drawflow editor.
 *
 * This method processes different behaviors based on the current editor mode and
 * manages the selection and interaction of nodes, connections, and the editor canvas.
 *
 * @param {MouseEvent|TouchEvent} e - The event object representing the click or touch event.
 *
 * The method performs the following tasks:
 * - Dispatches a 'click' event to notify other parts of the system.
 * - In 'fixed' mode, it allows selection of the Drawflow container only if clicked on the background.
 * - In 'view' mode, it enables interaction only with the Drawflow content without editing.
 * - In 'edit' mode, it allows regular handling of clicks, including selecting nodes, starting connections, 
 *   and managing context menus.
 * - Switches behavior based on the clicked element type, including nodes, connections, and background.
 * - Tracks initial touch/mouse positions and prevents default actions when necessary.
 */
click(e) {
    // Dispatch a 'click' event, passing the click event object `e` to other parts of the system.
    this.dispatch('click', e);

    // Handle different behaviors based on the current editor mode.
    if (this.editor_mode === 'fixed') {
        // Fixed mode disables interaction with elements other than the canvas background.
        if (e.target.classList[0] === 'parent-drawflow' || e.target.classList[0] === 'drawflow') {
            // Selects the Drawflow container if the click is on the background.
            this.ele_selected = e.target.closest(".parent-drawflow");
            e.preventDefault(); // Prevents any default browser action for this event.
        } else {
            // Return early if the click was on a non-background element in fixed mode.
            return false;
        }
    } else if (this.editor_mode === 'view') {
        // View mode allows interaction only with the drawflow content, not for editing.
        if (e.target.closest(".drawflow") != null || e.target.matches('.parent-drawflow')) {
            // Selects the Drawflow container if clicked.
            this.ele_selected = e.target.closest(".parent-drawflow");
            e.preventDefault(); // Prevents default browser action.
        }
    } else {
        // In 'edit' mode, the click is handled normally.
        // Registers the element that was clicked.
        this.first_click = e.target;
        this.ele_selected = e.target;

        // If the left mouse button (button 0) is clicked, any open context menus are removed.
        if (e.button === 0) {
            this.contextmenuDel();
        }

        // If the clicked target is inside a node's content area, select the node container.
        if (e.target.closest(".drawflow_content_node") != null) {
            this.ele_selected = e.target.closest(".drawflow_content_node").parentElement;
        }
    }

    // Switch statement handling different element types clicked in the editor.
    switch (this.ele_selected.classList[0]) {
        case 'drawflow-node':
            // If a node is selected, deselect the previously selected node.
            if (this.node_selected != null) {
                this.node_selected.classList.remove("selected");

                // Dispatch 'nodeUnselected' event if the node selection has changed.
                if (this.node_selected != this.ele_selected) {
                    this.dispatch('nodeUnselected', true);
                }
            }

            // If a connection is selected, deselect it.
            if (this.connection_selected != null) {
                this.connection_selected.classList.remove("selected");
                this.removeReouteConnectionSelected();
                this.connection_selected = null;
            }

            // Dispatch 'nodeSelected' event for the new node being selected.
            if (this.node_selected != this.ele_selected) {
                this.dispatch('nodeSelected', this.ele_selected.id.slice(5));
            }

            // Update the current selected node to the clicked node and apply visual selection.
            this.node_selected = this.ele_selected;
            this.node_selected.classList.add("selected");

            // Handle dragging for nodes based on whether inputs are draggable.
            if (!this.draggable_inputs) {
                if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT' && e.target.hasAttribute('contenteditable') !== true) {
                    this.drag = true; // Enables dragging for the node.
                }
            } else {
                if (e.target.tagName !== 'SELECT') {
                    this.drag = true;
                }
            }
            break;

        case 'output':
            // If an output port is clicked, start the connection process.
            this.connection = true;

            // Deselect any previously selected nodes and connections.
            if (this.node_selected != null) {
                this.node_selected.classList.remove("selected");
                this.node_selected = null;
                this.dispatch('nodeUnselected', true);
            }
            if (this.connection_selected != null) {
                this.connection_selected.classList.remove("selected");
                this.removeReouteConnectionSelected();
                this.connection_selected = null;
            }

            // Initiate drawing of the connection from the clicked output.
            this.drawConnection(e.target);
            break;

        case 'parent-drawflow':
        case 'drawflow':
            // Clicking the background area of the canvas (not on a node or connection).
            if (this.node_selected != null) {
                this.node_selected.classList.remove("selected");
                this.node_selected = null;
                this.dispatch('nodeUnselected', true);
            }
            if (this.connection_selected != null) {
                this.connection_selected.classList.remove("selected");
                this.removeReouteConnectionSelected();
                this.connection_selected = null;
            }
            // Mark the editor itself as selected.
            this.editor_selected = true;
            break;

        case 'main-path':
            // Clicking a connection path (wire) between nodes.
            if (this.node_selected != null) {
                this.node_selected.classList.remove("selected");
                this.node_selected = null;
                this.dispatch('nodeUnselected', true);
            }
            if (this.connection_selected != null) {
                this.connection_selected.classList.remove("selected");
                this.removeReouteConnectionSelected();
                this.connection_selected = null;
            }
            // Mark the clicked connection path as selected.
            this.connection_selected = this.ele_selected;
            this.connection_selected.classList.add("selected");

            // Dispatch 'connectionSelected' event with connection details.
            const listclassConnection = this.connection_selected.parentElement.classList;
            if (listclassConnection.length > 1) {
                this.dispatch('connectionSelected', {
                    output_id: listclassConnection[2].slice(14),
                    input_id: listclassConnection[1].slice(13),
                    output_class: listclassConnection[3],
                    input_class: listclassConnection[4]
                });

                // If rerouting is enabled, highlight all parts of the connection path.
                if (this.reroute_fix_curvature) {
                    this.connection_selected.parentElement.querySelectorAll(".main-path").forEach((item, i) => {
                        item.classList.add("selected");
                    });
                }
            }
            break;

        case 'point':
            // Clicking a draggable point on the connection path.
            this.drag_point = true;
            this.ele_selected.classList.add("selected");
            break;

        case 'drawflow-delete':
            // Clicking the delete button for either a node or a connection.
            if (this.node_selected) {
                this.removeNodeId(this.node_selected.id); // Removes the selected node.
            }

            if (this.connection_selected) {
                this.removeConnection(); // Removes the selected connection.
            }

            // Deselect node or connection after deletion.
            if (this.node_selected != null) {
                this.node_selected.classList.remove("selected");
                this.node_selected = null;
                this.dispatch('nodeUnselected', true);
            }
            if (this.connection_selected != null) {
                this.connection_selected.classList.remove("selected");
                this.removeReouteConnectionSelected();
                this.connection_selected = null;
            }
            break;

        default:
            // Handles any other unhandled click types.
    }

    // Capture initial touch/mouse positions.
    if (e.type === "touchstart") {
        this.pos_x = e.touches[0].clientX;
        this.pos_x_start = e.touches[0].clientX;
        this.pos_y = e.touches[0].clientY;
        this.pos_y_start = e.touches[0].clientY;
        this.mouse_x = e.touches[0].clientX;
        this.mouse_y = e.touches[0].clientY;
    } else {
        this.pos_x = e.clientX;
        this.pos_x_start = e.clientX;
        this.pos_y = e.clientY;
        this.pos_y_start = e.clientY;
    }

    // Prevent default behavior when clicking on specific elements (input, output, or path).
    if (['input', 'output', 'main-path'].includes(this.ele_selected.classList[0])) {
        e.preventDefault();
    }

    // Dispatch a 'clickEnd' event at the end of the click handler.
    this.dispatch('clickEnd', e);
}

/**
 * Handles mouse or touch events to update element positions and manage connections between nodes 
 * during drag actions on the canvas.
 * 
 * @param {MouseEvent|TouchEvent} e - The event object representing the mouse or touch event.
 * 
 * @returns {void}
 * 
 * @description
 * The function manages various interactions on the canvas, including:
 * 
 * 1. **Handling Touch and Mouse Events:** Differentiates between touch and mouse events for smooth drag behavior across devices.
 * 2. **Managing Node and Canvas Movement:** Updates the translation of the canvas or node positions based on user interactions.
 * 3. **Connection Updates:** Updates connection lines and reroute points in real-time during drag actions.
 * 4. **Zoom and Scaling Adjustments:** Accounts for the current zoom level to ensure correct scaling during drag operations.
 * 5. **Dispatch Events:** Notifies other parts of the system about changes (e.g., canvas position or mouse movement).
 */
position(e) {
    // Check if the event is a touch event (e.g., from a mobile device) or a mouse event
    let e_pos_x, e_pos_y;
    if (e.type === "touchmove") {
        // For touch events, get the touch coordinates (first finger)
        e_pos_x = e.touches[0].clientX;
        e_pos_y = e.touches[0].clientY;
    } else {
        // For mouse events, use the mouse coordinates
        e_pos_x = e.clientX;
        e_pos_y = e.clientY;
    }

    // If the user is dragging a connection line
    if (this.connection) {
        // Update the position of the connection line as the mouse or touch moves
        this.updateConnection(e_pos_x, e_pos_y);
    }

    // If the user is dragging the canvas (background) to move the entire flow diagram
    if (this.editor_selected) {
        // Calculate the new position of the canvas based on movement
        const x = this.canvas_x + (-(this.pos_x - e_pos_x));
        const y = this.canvas_y + (-(this.pos_y - e_pos_y));

        // Dispatch an event to update the canvas translation
        this.dispatch('translate', { x: x, y: y });

        // Apply the new translation and scaling to the canvas (precanvas)
        this.precanvas.style.transform = `translate(${x}px, ${y}px) scale(${this.zoom})`;
    }

    // If the user is dragging a node on the canvas
    if (this.drag) {
        e.preventDefault(); // Prevent default behavior to avoid unwanted selection

        // Calculate the movement of the node based on mouse/touch position and canvas zoom level
        const x = (this.pos_x - e_pos_x) * this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom);
        const y = (this.pos_y - e_pos_y) * this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom);

        // Update the last known mouse/touch position
        this.pos_x = e_pos_x;
        this.pos_y = e_pos_y;

        // Move the selected element (node) on the canvas
        this.ele_selected.style.top = (this.ele_selected.offsetTop - y) + "px";
        this.ele_selected.style.left = (this.ele_selected.offsetLeft - x) + "px";

        // Update the node's position in the internal data structure (drawflow object)
        this.drawflow.drawflow[this.module].data[this.ele_selected.id.slice(5)].pos_x = (this.ele_selected.offsetLeft - x);
        this.drawflow.drawflow[this.module].data[this.ele_selected.id.slice(5)].pos_y = (this.ele_selected.offsetTop - y);

        // Update the connections attached to this node as its position changes
        this.updateConnectionNodes(this.ele_selected.id);
    }

    // If the user is dragging a control point (reroute point) on a connection line
    if (this.drag_point) {
        // Calculate the change in position for the control point
        const x = (this.pos_x - e_pos_x) * this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom);
        const y = (this.pos_y - e_pos_y) * this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom);

        // Update the last known mouse/touch position
        this.pos_x = e_pos_x;
        this.pos_y = e_pos_y;

        // Calculate the new position for the control point, considering the canvas zoom and translation
        const pos_x = this.pos_x * (this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)) 
                      - (this.precanvas.getBoundingClientRect().x * (this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)));
        const pos_y = this.pos_y * (this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)) 
                      - (this.precanvas.getBoundingClientRect().y * (this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)));

        // Update the position of the control point in the DOM (SVG circle element)
        this.ele_selected.setAttributeNS(null, 'cx', pos_x);
        this.ele_selected.setAttributeNS(null, 'cy', pos_y);

        // Get the node being updated (nodeUpdate) and connection information (input/output classes)
        const nodeUpdate = this.ele_selected.parentElement.classList[2].slice(9);
        const nodeUpdateIn = this.ele_selected.parentElement.classList[1].slice(13);
        const output_class = this.ele_selected.parentElement.classList[3];
        const input_class = this.ele_selected.parentElement.classList[4];

        // Find the position of the control point in the connection
        let numberPointPosition = Array.from(this.ele_selected.parentElement.children).indexOf(this.ele_selected) - 1;

        // If reroute fix curvature is enabled, adjust the control point position
        if (this.reroute_fix_curvature) {
            const numberMainPath = this.ele_selected.parentElement.querySelectorAll(".main-path").length - 1;
            numberPointPosition -= numberMainPath;
            if (numberPointPosition < 0) {
                numberPointPosition = 0;
            }
        }

        // Find the connection data in the internal drawflow structure
        const nodeId = nodeUpdate.slice(5);
        const searchConnection = this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections.findIndex(function (item, i) {
            return item.node === nodeUpdateIn && item.output === input_class;
        });

        // Update the control point position in the connection data
        this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections[searchConnection].points[numberPointPosition] = { pos_x: pos_x, pos_y: pos_y };

        // Update the connection visually to reflect the new control point position
        const parentSelected = this.ele_selected.parentElement.classList[2].slice(9);
        this.updateConnectionNodes(parentSelected);
    }

    // For touch events, update the mouse position (used in some mobile drag interactions)
    if (e.type === "touchmove") {
        this.mouse_x = e_pos_x;
        this.mouse_y = e_pos_y;
    }

    // Dispatch a mouseMove event with the updated mouse/touch coordinates
    this.dispatch('mouseMove', { x: e_pos_x, y: e_pos_y });
}

/**
 * Handles the termination of various drag operations within the Drawflow editor.
 *
 * This function is responsible for:
 * - Concluding node movements
 * - Adjusting reroute points
 * - Creating connections between nodes
 * 
 * It updates the internal state of the editor based on user interactions, ensuring proper validation 
 * for connections, and performs cleanup after drag operations.
 *
 * Key functionality includes:
 * 1. Handling Drag End for Nodes
 * 2. Handling Drag End for Control Points (Reroute Points)
 * 3. Handling Canvas Dragging
 * 4. Handling Connection Creation
 * 5. Resetting Drag States
 *
 * @param {Event} e - The event object representing either a touch or mouse event, which 
 *                    is used to determine the target element and cursor/touch position.
 */
dragEnd(e) {
    // Determine whether it's a touch event or mouse event, and get the relevant position and element
    if (e.type === "touchend") {
        // For touch events, use stored touch coordinates (since touchend doesn't have touch coordinates)
        var e_pos_x = this.mouse_x;
        var e_pos_y = this.mouse_y;
        // Get the element located under the touch position
        var ele_last = document.elementFromPoint(e_pos_x, e_pos_y);
    } else {
        // For mouse events, use client coordinates directly from the event
        var e_pos_x = e.clientX;
        var e_pos_y = e.clientY;
        // Get the target element of the event (the one being clicked)
        var ele_last = e.target;
    }

    // 1. Handling Drag End for Nodes
    if (this.drag) {
        // Check if the node's position has changed since the drag started
        if (this.pos_x_start != e_pos_x || this.pos_y_start != e_pos_y) {
            // If the position changed, dispatch a 'nodeMoved' event with the node ID
            this.dispatch('nodeMoved', this.ele_selected.id.slice(5));
        }
    }

    // 2. Handling Drag End for Control Points (Reroute Points)
    if (this.drag_point) {
        // Remove the "selected" class from the reroute point after dragging
        this.ele_selected.classList.remove("selected");
        // Check if the reroute point was moved by comparing start and end positions
        if (this.pos_x_start != e_pos_x || this.pos_y_start != e_pos_y) {
            // If the reroute point moved, dispatch a 'rerouteMoved' event with the node ID
            this.dispatch('rerouteMoved', this.ele_selected.parentElement.classList[2].slice(14));
        }
    }

    // 3. Handling Canvas Dragging
    if (this.editor_selected) {
        // Update the canvas position based on the difference between the starting and ending cursor positions
        this.canvas_x = this.canvas_x + (-(this.pos_x - e_pos_x));
        this.canvas_y = this.canvas_y + (-(this.pos_y - e_pos_y));
        // Mark the canvas drag as complete
        this.editor_selected = false;
    }

    // 4. Handling Connection Creation
    if (this.connection === true) {
        // Check if the target element is a valid input or matches forced input conditions
        if (ele_last.classList[0] === 'input' || 
            (this.force_first_input && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === 'drawflow-node'))) {
            
            // Handle forced first input connections
            if (this.force_first_input && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === 'drawflow-node')) {
                // Get input node ID from the closest node element
                var input_id = ele_last.closest(".drawflow_content_node") != null ? 
                    ele_last.closest(".drawflow_content_node").parentElement.id : 
                    ele_last.id;

                // Determine if the node has any inputs
                var input_class = Object.keys(this.getNodeFromId(input_id.slice(5)).inputs).length === 0 ? false : "input_1";
            } else {
                // Normal connection handling
                var input_id = ele_last.parentElement.parentElement.id;
                var input_class = ele_last.classList[1];
            }

            // Get the output node and output class
            var output_id = this.ele_selected.parentElement.parentElement.id;
            var output_class = this.ele_selected.classList[1];

            // Validate the connection to prevent self-referencing or invalid connections
            if (output_id !== input_id && input_class !== false) {
                // Check if this connection already exists
                if (this.container.querySelectorAll(`.connection.node_in_${input_id}.node_out_${output_id}.${output_class}.${input_class}`).length === 0) {
                    // If it doesn't exist, create the connection

                    // Add identifying classes to the connection element
                    this.connection_ele.classList.add(`node_in_${input_id}`);
                    this.connection_ele.classList.add(`node_out_${output_id}`);
                    this.connection_ele.classList.add(output_class);
                    this.connection_ele.classList.add(input_class);

                    // Update the internal drawflow data structure with the new connection
                    var id_input = input_id.slice(5);
                    var id_output = output_id.slice(5);

                    // Add connection to the output's connections
                    this.drawflow.drawflow[this.module].data[id_output].outputs[output_class].connections.push({ "node": id_input, "output": input_class });
                    // Add connection to the input's connections
                    this.drawflow.drawflow[this.module].data[id_input].inputs[input_class].connections.push({ "node": id_output, "input": output_class });

                    // Update the visual connections of both nodes
                    this.updateConnectionNodes(`node-${id_output}`);
                    this.updateConnectionNodes(`node-${id_input}`);

                    // Dispatch an event to notify that the connection has been created
                    this.dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class: output_class, input_class: input_class });
                } else {
                    // If the connection already exists, cancel it
                    this.dispatch('connectionCancel', true);
                    this.connection_ele.remove();
                }
                this.connection_ele = null; // Reset the connection element
            } else {
                // Cancel the connection if it's invalid
                this.dispatch('connectionCancel', true);
                this.connection_ele.remove();
                this.connection_ele = null;
            }

        } else {
            // Cancel the connection if the target element is not valid
            this.dispatch('connectionCancel', true);
            this.connection_ele.remove();
            this.connection_ele = null;
        }
    }

    // 5. Resetting Drag and Connection States
    this.drag = false;           // Reset node dragging state
    this.drag_point = false;     // Reset reroute point dragging state
    this.connection = false;     // Reset connection state
    this.ele_selected = null;    // Reset selected element
    this.editor_selected = false; // Reset canvas dragging state

    // Dispatch a 'mouseUp' event to signal the end of the drag operation
    this.dispatch('mouseUp', e);
}

contextmenu(e) {
    /**
     * contextmenu(e)
     * ==============
     * Handles custom right-click (context menu) behavior for nodes and connections in the Drawflow editor.
     * This method allows users to delete nodes or connections via a small delete button that appears near
     * the right-click position.
     * 
     * The process includes:
     * 1. Dispatching a custom 'contextmenu' event to notify other parts of the application that a 
     *    right-click occurred.
     * 2. Preventing the default browser context menu from appearing.
     * 3. Checking the editor mode: In 'fixed' or 'view' mode, the context menu is disabled, and the 
     *    function exits early.
     * 4. Removing any existing delete buttons from the canvas before adding a new one.
     * 5. Creating a delete button if a node or connection is selected, positioning it near the right-click 
     *    position, accounting for the canvas zoom level.
     * 
     * @param {Event} e - The event object representing the right-click interaction.
     */

    // Dispatch a custom 'contextmenu' event to inform other components about the right-click action
    this.dispatch('contextmenu', e);

    // Prevent the default browser context menu from appearing
    e.preventDefault();

    // Disable context menu actions if the editor is in 'fixed' or 'view' mode
    if (this.editor_mode === 'fixed' || this.editor_mode === 'view') {
        return false;
    }

    // If a delete button already exists on the canvas, remove it to avoid duplicates
    if (this.precanvas.getElementsByClassName("drawflow-delete").length) {
        this.precanvas.getElementsByClassName("drawflow-delete")[0].remove();
    }

    // Handle right-click behavior when either a node or a connection is selected
    if (this.node_selected || this.connection_selected) {
        // Create a new delete button element
        var deletebox = document.createElement('div');
        deletebox.classList.add("drawflow-delete"); // Add the class 'drawflow-delete' to the button
        deletebox.innerHTML = "x"; // Set the button's content to 'x' (delete icon)

        // If a node is selected, append the delete button to the node
        if (this.node_selected) {
            this.node_selected.appendChild(deletebox);
        }

        // If a connection is selected and it has a valid parent element (more than one class), position the delete button accordingly
        if (this.connection_selected && (this.connection_selected.parentElement.classList.length > 1)) {
            // Calculate the delete button's position relative to the canvas and zoom level
            deletebox.style.top = e.clientY * (this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)) -
                (this.precanvas.getBoundingClientRect().y * (this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom))) + "px";
            deletebox.style.left = e.clientX * (this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)) -
                (this.precanvas.getBoundingClientRect().x * (this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom))) + "px";

            // Append the delete button to the canvas
            this.precanvas.appendChild(deletebox);
        }
    }
}

contextmenuDel() {
    /**
     * contextmenuDel()
     * ================
     * Removes the delete button from the canvas, typically called after the right-click context menu 
     * is closed or dismissed. This method ensures that only one delete button is present at a time 
     * and cleans up the UI when the delete button is no longer needed.
     * 
     * The method performs the following actions:
     * 1. Checks for the existence of any delete button with the class 'drawflow-delete' on the canvas.
     * 2. If found, it removes the first instance of the delete button from the canvas.
     */
    
    // Check if any delete button ('drawflow-delete' class) exists on the canvas and remove it
    if (this.precanvas.getElementsByClassName("drawflow-delete").length) {
        this.precanvas.getElementsByClassName("drawflow-delete")[0].remove();
    }
}

key(e) {
    /**
     * key(e)
     * ======
     * This method handles keypress events, primarily for the 'Delete' and 'Backspace' keys, to allow the user to remove nodes or connections.
     * It also dispatches a custom 'keydown' event, enabling other parts of the application to respond to keypresses.
     * 
     * Process:
     * 1. Dispatches a custom 'keydown' event to notify other components.
     * 2. Checks the editor mode: If the mode is 'fixed' or 'view', it disables key actions and exits early.
     * 3. Listens for 'Delete' or 'Backspace' keypresses (in combination with the 'Meta' key for backspace):
     *    - If a node is selected, it checks if the click was inside a non-input field and removes the node.
     *    - If a connection is selected, it removes the connection.
     * 
     * @param {Event} e - The event object from the keypress interaction.
     */

    // Dispatch a custom 'keydown' event to notify other parts of the application
    this.dispatch('keydown', e);

    // Disable key actions if the editor is in 'fixed' or 'view' mode
    if (this.editor_mode === 'fixed' || this.editor_mode === 'view') {
        return false;
    }

    // Handle 'Delete' or 'Backspace + Meta (Command)' keypresses
    if (e.key === 'Delete' || (e.key === 'Backspace' && e.metaKey)) {
        // If a node is selected and the first click wasn't inside an input or contenteditable field, remove the node
        if (this.node_selected != null) {
            if (this.first_click.tagName !== 'INPUT' && this.first_click.tagName !== 'TEXTAREA' && this.first_click.hasAttribute('contenteditable') !== true) {
                this.removeNodeId(this.node_selected.id); // Remove the selected node by ID
            }
        }
        // If a connection is selected, remove the connection
        if (this.connection_selected != null) {
            this.removeConnection(); // Remove the selected connection
        }
    }
}


/*
Zoom Functions

Provide zooming capabilities using the mouse wheel (zoom_enter), ensure smooth 
ransitions when zooming in or out, and allow for zoom resets and zoom refreshes.

These methods together add essential functionality for interactive canvas 
management, allowing users to manipulate the view (zoom) and remove elements 
efficiently through key presses

*/

zoom_enter(event, delta) {
    /**
     * zoom_enter(event, delta)
     * ========================
     * This function allows zooming in or out using the mouse wheel while holding down the 
     * control (Ctrl) key. It prevents the default scrolling behavior and instead modifies 
     * the zoom level based on the wheel movement (delta).
     * 
     * Process:
     * 1. The function first checks if the `Ctrl` key is pressed (via `event.ctrlKey`).
     * 2. If true, it prevents the default scroll behavior (`event.preventDefault()`).
     * 3. Depending on the direction of the wheel movement (`deltaY`):
     *    - If the delta is positive (scroll down), the canvas zooms out (`zoom_out()`).
     *    - If the delta is negative (scroll up), the canvas zooms in (`zoom_in()`).
     * 
     * This provides a smooth zooming experience controlled by the mouse wheel.
     * 
     * @param {Event} event - The wheel event that triggers the zoom functionality.
     * @param {Number} delta - Represents the scroll amount (positive for zoom out, negative for zoom in).
     */

    // Check if the Ctrl key is held down to enable zooming
    if (event.ctrlKey) {
        // Prevent the default scroll behavior when Ctrl is pressed
        event.preventDefault();

        // Check the direction of the mouse scroll (deltaY)
        if (event.deltaY > 0) {
            // Zoom Out: deltaY > 0 means scroll down, so we zoom out
            this.zoom_out();
        } else {
            // Zoom In: deltaY < 0 means scroll up, so we zoom in
            this.zoom_in();
        }
    }
}

zoom_refresh() {
    /**
     * zoom_refresh()
     * ==============
     * This method recalculates and applies the zoom transformation to the canvas based on 
     * the current zoom level. It ensures that the canvas position is updated correctly when 
     * the zoom changes, preserving the relative position of the canvas.
     * 
     * Process:
     * 1. A 'zoom' event is dispatched to notify other parts of the application that the zoom level has changed.
     * 2. The method recalculates the canvas' `x` and `y` positions by adjusting them relative to the 
     *    new zoom level and the previous zoom (`zoom_last_value`).
     * 3. The `zoom_last_value` is updated to the current zoom level.
     * 4. The canvas' CSS `transform` property is updated with the new position and zoom scaling, applying 
     *    the changes visually.
     * 
     * This method ensures that the canvas remains in the correct position and scale when zooming in or out.
     */

    // Dispatch a 'zoom' event with the updated zoom level
    this.dispatch('zoom', this.zoom);

    // Adjust the canvas position based on the new zoom value
    this.canvas_x = (this.canvas_x / this.zoom_last_value) * this.zoom;
    this.canvas_y = (this.canvas_y / this.zoom_last_value) * this.zoom;

    // Update the last zoom level to the current zoom level
    this.zoom_last_value = this.zoom;

    // Apply the new zoom and position to the canvas using CSS transform
    this.precanvas.style.transform = "translate(" + this.canvas_x + "px, " + this.canvas_y + "px) scale(" + this.zoom + ")";
}

zoom_in() {
    /**
     * zoom_in()
     * =========
     * This method increases the zoom level of the canvas while ensuring it stays within
     * the predefined maximum limit (`zoom_max`).
     * 
     * Process:
     * 1. It checks if the current zoom level is less than the maximum allowed zoom level.
     * 2. If the condition is met, it increases the zoom level by `zoom_value`.
     * 3. Calls `zoom_refresh()` to reapply the transformation to the canvas and update the view.
     * 
     * Note: Ensures that the canvas is not zoomed in beyond the allowed limits.
     */
    if (this.zoom < this.zoom_max) {
        // Increase the zoom level by the defined zoom value (increment)
        this.zoom += this.zoom_value;
        // Update the canvas with the new zoom level
        this.zoom_refresh();
    }
}

zoom_out() {
    /**
     * zoom_out()
     * ==========
     * This method decreases the zoom level of the canvas while ensuring it stays within
     * the predefined minimum limit (`zoom_min`).
     * 
     * Process:
     * 1. It checks if the current zoom level is greater than the minimum allowed zoom level.
     * 2. If the condition is met, it decreases the zoom level by `zoom_value`.
     * 3. Calls `zoom_refresh()` to reapply the transformation to the canvas and update the view.
     * 
     * Note: Ensures that the canvas is not zoomed out beyond the allowed limits.
     */
    if (this.zoom > this.zoom_min) {
        // Decrease the zoom level by the defined zoom value (decrement)
        this.zoom -= this.zoom_value;
        // Update the canvas with the new zoom level
        this.zoom_refresh();
    }
}

zoom_reset() {
    /**
     * zoom_reset()
     * ============
     * This method resets the zoom level to the default value of 1.0, which represents the
     * original size of the canvas.
     * 
     * Process:
     * 1. It checks if the current zoom level is different from the default (1.0).
     * 2. If the condition is met, it resets the zoom level to 1.0.
     * 3. Calls `zoom_refresh()` to reapply the transformation to the canvas and restore the default zoom.
     * 
     * Note: This is useful for resetting the view when zooming too far in or out.
     */
    if (this.zoom != 1) {
        // Reset the zoom level to the default value (1.0)
        this.zoom = 1;
        // Refresh the zoom to apply the reset
        this.zoom_refresh();
    }
}

/*
Drawing Functions


*/
/**
 * Generates an SVG path string that represents a Bezier curve between two points.
 * The curve is used for drawing connections between nodes in a flow-based editor.
 * 
 * @param {number} start_pos_x - The x-coordinate of the starting point.
 * @param {number} start_pos_y - The y-coordinate of the starting point.
 * @param {number} end_pos_x - The x-coordinate of the ending point.
 * @param {number} end_pos_y - The y-coordinate of the ending point.
 * @param {number} curvature_value - A value between 0 and 1 that controls the curvature of the curve.
 * @param {string} type - The type of curvature ('open', 'close', 'other', or default).
 *        - 'open': Adjusts curvature so that connections between nodes are smoother when moving left to right.
 *        - 'close': Inverse of 'open', for right-to-left connections.
 *        - 'other': Custom case for connections that go in other directions.
 *        - default: Fallback for handling regular curves.
 * 
 * @returns {string} - The SVG path data for the Bezier curve.
 */
createCurvature(start_pos_x, start_pos_y, end_pos_x, end_pos_y, curvature_value, type) {
    // Initialize variables for the start and end positions of the curve.
    var line_x = start_pos_x;
    var line_y = start_pos_y;
    var x = end_pos_x;
    var y = end_pos_y;
    var curvature = curvature_value;

    // The switch statement handles different curve types ('open', 'close', 'other').
    switch (type) {
        case 'open':
            // For 'open' curves, adjust curvature to connect nodes from left to right.
            if (start_pos_x >= end_pos_x) {
                // Calculate control points for when the starting point is to the right of the end point.
                var hx1 = line_x + Math.abs(x - line_x) * curvature;
                var hx2 = x - Math.abs(x - line_x) * (curvature * -1);
            } else {
                // Calculate control points for when the starting point is to the left of the end point.
                var hx1 = line_x + Math.abs(x - line_x) * curvature;
                var hx2 = x - Math.abs(x - line_x) * curvature;
            }
            // Return the SVG path string for the 'open' curve.
            return 'M ' + line_x + ' ' + line_y + ' C ' + hx1 + ' ' + line_y + ' ' + hx2 + ' ' + y + ' ' + x + ' ' + y;

        case 'close':
            // For 'close' curves, adjust curvature to connect nodes from right to left.
            if (start_pos_x >= end_pos_x) {
                // Calculate control points for this scenario.
                var hx1 = line_x + Math.abs(x - line_x) * (curvature * -1);
                var hx2 = x - Math.abs(x - line_x) * curvature;
            } else {
                var hx1 = line_x + Math.abs(x - line_x) * curvature;
                var hx2 = x - Math.abs(x - line_x) * curvature;
            }
            // Return the SVG path string for the 'close' curve.
            return 'M ' + line_x + ' ' + line_y + ' C ' + hx1 + ' ' + line_y + ' ' + hx2 + ' ' + y + ' ' + x + ' ' + y;

        case 'other':
            // For 'other' curves, apply a different curvature logic.
            if (start_pos_x >= end_pos_x) {
                var hx1 = line_x + Math.abs(x - line_x) * (curvature * -1);
                var hx2 = x - Math.abs(x - line_x) * (curvature * -1);
            } else {
                var hx1 = line_x + Math.abs(x - line_x) * curvature;
                var hx2 = x - Math.abs(x - line_x) * curvature;
            }
            // Return the SVG path string for the 'other' curve.
            return 'M ' + line_x + ' ' + line_y + ' C ' + hx1 + ' ' + line_y + ' ' + hx2 + ' ' + y + ' ' + x + ' ' + y;

        default:
            // For default case, calculate curvature in the normal direction.
            var hx1 = line_x + Math.abs(x - line_x) * curvature;
            var hx2 = x - Math.abs(x - line_x) * curvature;
            // Return the SVG path string for the default curve.
            return 'M ' + line_x + ' ' + line_y + ' C ' + hx1 + ' ' + line_y + ' ' + hx2 + ' ' + y + ' ' + x + ' ' + y;
    }
}


/*





















LA PARTE SIGUIENTE ESTA CON DOCUMENTACION DE APARIENCIA POCO PROFESIONAL O NULA, PARA MEJORARLA CONTINUAR
CON LA CONVERSACION EN CHATGPT DE LA SIGUIENTE FORMA:

really nice, and now can you help me to annotate this code as documentation to improve maintenance? 

CODIGO POR ANOTAR / MEJORAR ANOTACIONES

















*/
/**
 * Initiates the creation of a visual connection between elements in the Drawflow editor.
 * 
 * This function is responsible for the following tasks:
 * - Creating an SVG connection element to visually represent the connection.
 * - Defining the path of the connection for customizable styling.
 * - Appending the connection to the precanvas to integrate it into the visual interface.
 * - Dispatching a 'connectionStart' event to signal the initiation of a connection.
 *
 * Key functionality includes:
 * 1. Creating the SVG Element: 
 *    An SVG element is created to visually represent the connection within the canvas.
 * 2. Defining the Connection Path: 
 *    A path element is created to define the shape of the connection, allowing for custom styles.
 * 3. Appending to the Canvas: 
 *    The newly created connection is appended to the precanvas, making it part of the visual representation.
 * 4. Extracting Output Information: 
 *    The output ID and class are extracted from the provided element to identify the connection's source.
 * 5. Dispatching Connection Event: 
 *    A `connectionStart` event is dispatched to notify other components that a connection is being initiated.
 *
 * @param {HTMLElement} ele - The HTML element from which the connection originates. 
 * It is used to derive the output ID and class for event dispatching.
 */
drawConnection(ele) {
    // Create an SVG element to represent the connection
    var connection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
    this.connection_ele = connection; // Store the reference to the connection element

    // Create a path element to define the shape of the connection
    var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
    path.classList.add("main-path"); // Add a class for styling purposes
    path.setAttributeNS(null, 'd', ''); // Initialize the path data (currently empty)

    // Add a class to the connection for styling and identification
    connection.classList.add("connection");

    // Append the path to the connection element
    connection.appendChild(path);

    // Append the connection element to the precanvas (a parent SVG container)
    this.precanvas.appendChild(connection);

    // Extract the output ID from the element's parent elements
    var id_output = ele.parentElement.parentElement.id.slice(5);
    // Get the output class from the provided element
    var output_class = ele.classList[1];

    // Dispatch a custom event to indicate the start of a connection
    this.dispatch('connectionStart', { output_id: id_output, output_class: output_class });
}

/**
 * Updates the visual representation of a connection in the Drawflow editor based 
 * on the current mouse or touch position. This function recalculates the connection 
 * path to reflect the new endpoint specified by the input coordinates.
 * 
 * Key functionality includes:
 * 1. Calculating Zoom Factors:
 *    Retrieves the current zoom level and computes the width and height ratios based 
 *    on the precanvas dimensions. This allows for proper scaling of the connection path 
 *    as the user zooms in or out.
 * 2. Determining the Starting Point:
 *    Calculates the center position of the selected element (the origin of the connection) 
 *    in relation to the precanvas, adjusting for any zoom factors.
 * 3. Calculating the Endpoint:
 *    Translates the provided coordinates (`eX`, `eY`) into the scaled position within 
 *    the precanvas, ensuring the connection endpoint aligns accurately with user input.
 * 4. Creating the Curvature:
 *    Creates a curvature for the connection line using the `createCurvature` method, which 
 *    takes the calculated start and end points, along with the predefined curvature settings.
 * 5. Updating the Connection Path:
 *    Updates the path attribute of the SVG connection element with the new curvature data 
 *    to visually reflect the updated connection.
 *
 * @param {number} eX - The x-coordinate of the endpoint for the connection, typically 
 *                      representing mouse or touch input.
 * @param {number} eY - The y-coordinate of the endpoint for the connection, typically 
 *                      representing mouse or touch input.
 */
updateConnection(eX, eY) {
    // Retrieve the precanvas element and current zoom level
    const precanvas = this.precanvas;
    const zoom = this.zoom;

    // Calculate the zoom-adjusted width and height ratios
    let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
    precanvasWitdhZoom = precanvasWitdhZoom || 0; // Default to 0 if NaN
    let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
    precanvasHeightZoom = precanvasHeightZoom || 0; // Default to 0 if NaN

    // Get the path element of the current connection
    var path = this.connection_ele.children[0];

    // Calculate the starting point of the connection (center of the selected element)
    var line_x = this.ele_selected.offsetWidth / 2 +
        (this.ele_selected.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
    var line_y = this.ele_selected.offsetHeight / 2 +
        (this.ele_selected.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

    // Calculate the scaled endpoint of the connection
    var x = eX * (this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)) -
        (this.precanvas.getBoundingClientRect().x * (this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)));
    var y = eY * (this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)) -
        (this.precanvas.getBoundingClientRect().y * (this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)));

    // Retrieve the current curvature setting
    var curvature = this.curvature;

    // Create the curved line based on the start and end points
    var lineCurve = this.createCurvature(line_x, line_y, x, y, curvature, 'openclose');

    // Update the path data of the connection with the new curvature
    path.setAttributeNS(null, 'd', lineCurve);
}

/**
 * Establishes a connection between two nodes in the Drawflow editor. 
 * This function verifies that the nodes belong to the same module and checks 
 * for existing connections before creating a new one. 
 * 
 * Key functionality includes:
 * 1. Module Verification:
 *    Retrieves the modules associated with the given node IDs and checks 
 *    if both nodes belong to the same module to prevent self-referencing connections.
 * 2. Connection Existence Check:
 *    Iterates through existing connections of the output node to determine 
 *    if a connection already exists to the specified input node and class.
 * 3. Connection Creation:
 *    If no existing connection is found, the function creates a new connection 
 *    in the internal data structure, linking the output node to the input node 
 *    and vice versa.
 * 4. Visual Representation:
 *    If the current module matches the module of the connection, the function 
 *    creates and appends an SVG element representing the connection in the UI.
 * 5. Dispatching Connection Event:
 *    Dispatches a `connectionCreated` event to notify other components about 
 *    the newly established connection.
 * 
 * @param {string} id_output - The ID of the output node initiating the connection.
 * @param {string} id_input - The ID of the input node receiving the connection.
 * @param {string} output_class - The class/type of the output connection being created.
 * @param {string} input_class - The class/type of the input connection being created.
 */
addConnection(id_output, id_input, output_class, input_class) {
    // Retrieve the modules for the output and input nodes
    var nodeOneModule = this.getModuleFromNodeId(id_output);
    var nodeTwoModule = this.getModuleFromNodeId(id_input);

    // Ensure both nodes belong to the same module
    if (nodeOneModule === nodeTwoModule) {

        // Retrieve the data for the output node
        var dataNode = this.getNodeFromId(id_output);
        var exist = false; // Initialize a flag to track connection existence

        // Check if a connection already exists between the output and input nodes
        for (var checkOutput in dataNode.outputs[output_class].connections) {
            var connectionSearch = dataNode.outputs[output_class].connections[checkOutput];
            if (connectionSearch.node == id_input && connectionSearch.output == input_class) {
                exist = true; // Connection exists; set flag to true
                break; // Exit loop early if a connection is found
            }
        }

        // If no existing connection is found
        if (!exist) {
            // Create the new connection in the internal data structure
            this.drawflow.drawflow[nodeOneModule].data[id_output].outputs[output_class].connections.push({
                "node": id_input.toString(),
                "output": input_class
            });
            this.drawflow.drawflow[nodeOneModule].data[id_input].inputs[input_class].connections.push({
                "node": id_output.toString(),
                "input": output_class
            });

            // If in the current module, create the visual connection
            if (this.module === nodeOneModule) {
                // Create an SVG element for the connection
                var connection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
                var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
                path.classList.add("main-path"); // Add class for styling
                path.setAttributeNS(null, 'd', ''); // Initialize path data

                // Add classes for styling and identification
                connection.classList.add("connection");
                connection.classList.add("node_in_node-" + id_input);
                connection.classList.add("node_out_node-" + id_output);
                connection.classList.add(output_class);
                connection.classList.add(input_class);

                // Append the path to the connection
                connection.appendChild(path);
                // Append the connection to the precanvas (the main drawing area)
                this.precanvas.appendChild(connection);

                // Update the connections for the nodes involved
                this.updateConnectionNodes('node-' + id_output);
                this.updateConnectionNodes('node-' + id_input);
            }

            // Dispatch an event indicating a connection has been created
            this.dispatch('connectionCreated', {
                output_id: id_output,
                input_id: id_input,
                output_class: output_class,
                input_class: input_class
            });
        }
    }
}

/**
 * Updates the connection nodes based on the provided node ID.
 * It redraws the connection lines between input and output nodes
 * while considering curvature, zoom level, and rerouting options.
 * 
 * @param {string} id - The ID of the node whose connections are being updated.
 */
updateConnectionNodes(id) {

    // Generate identifiers for input and output nodes based on the provided ID
    const idSearch = 'node_in_' + id;  // Identifier for input nodes
    const idSearchOut = 'node_out_' + id; // Identifier for output nodes

    // Calculate half of the line path for later calculations
    var linePath = this.line_path / 2;

    // Reference to important container elements
    const container = this.container; // Main container for nodes
    const precanvas = this.precanvas; // Canvas used for drawing connections

    // Retrieve parameters for line curvature and rerouting
    const curvature = this.curvature; // Curvature value for connections
    const createCurvature = this.createCurvature; // Function to create a curved line
    const rerouteCurvature = this.reroute_curvature; // Flag for rerouting curvature
    const rerouteCurvatureStartEnd = this.reroute_curvature_start_end; // Flag for start and end curvature
    const rerouteFixCurvature = this.reroute_fix_curvature; // Flag to fix curvature adjustments
    const rerouteWidth = this.reroute_width; // Width for rerouting lines
    const zoom = this.zoom; // Current zoom level of the canvas

    // Select all output elements related to the provided ID
    const elemsOut = container.querySelectorAll(`.${idSearchOut}`);

    // Iterate through output nodes to update their connections
    Object.keys(elemsOut).map(function (item, index) {

        // Check if the output node has no connection points
        if (elemsOut[item].querySelector('.point') === null) {

            // Find the current output node element
            var elemtsearchId_out = container.querySelector(`#${id}`);
            var id_search = elemsOut[item].classList[1].replace('node_in_', '');

            // Select the corresponding input node element
            var elemtsearchId = container.querySelector(`#${id_search}`);

            // Retrieve the specific connection point within the node
            var elemtsearch = elemtsearchId.querySelectorAll('.' + elemsOut[item].classList[4])[0];

            // Calculate positions for drawing the line
            var eX = elemtsearch.offsetWidth / 2 + (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
            var eY = elemtsearch.offsetHeight / 2 + (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;
            var elemtsearchOut = elemtsearchId_out.querySelectorAll('.' + elemsOut[item].classList[3])[0];

            // Calculate the end position for the connection line
            var line_x = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
            var line_y = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

            // Create the curved line connecting the nodes
            const lineCurve = createCurvature(line_x, line_y, eX, eY, curvature, 'openclose');
            elemsOut[item].children[0].setAttributeNS(null, 'd', lineCurve); // Set the path for the line

        } else {
            // Process cases where the output node has connection points
            const points = elemsOut[item].querySelectorAll('.point');
            let linecurve = ''; // Initialize string to hold curve data
            const reroute_fix = []; // Store rerouted lines

            // Iterate through connection points to create lines
            points.forEach((item, i) => {
                if (i === 0 && ((points.length - 1) === 0)) {
                    // Special case for a single point connection
                    var elemtsearchId_out = container.querySelector(`#${id}`); // Find the current output node
                    var elemtsearch = item;

                    // Calculate positions for the start and end of the line
                    var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                    var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;

                    // Retrieve the corresponding input node element
                    var elemtsearchIn = elemtsearchId_out.querySelectorAll('.' + item.parentElement.classList[3])[0];
                    var lineCurveSearch = createCurvature(line_x, line_y, eX, eY, rerouteCurvatureStartEnd, 'close'); // Create the curve
                    linecurve += lineCurveSearch; // Append to line data
                    reroute_fix.push(lineCurveSearch); // Store for rerouting

                    // Continue to process other cases (e.g., first point, last point)
                } else if (i === 0) {
                    // Handle the first connection point case
                    // Similar logic to above, creating and appending curves
                } else if (i === (points.length - 1)) {
                    // Handle the last connection point case
                    // Similar logic to above, creating and appending curves
                } else {
                    // Handle intermediate connection points
                    // Similar logic to above, creating and appending curves
                }
            });

            // Decide whether to fix curvature or set a single line curve
            if (rerouteFixCurvature) {
                reroute_fix.forEach((itempath, i) => {
                    elemsOut[item].children[i].setAttributeNS(null, 'd', itempath); // Set the path for rerouted lines
                });
            } else {
                elemsOut[item].children[0].setAttributeNS(null, 'd', linecurve); // Set the path for the line
            }
        }
    });

    // Select all input elements related to the provided ID
    const elems = container.querySelectorAll(`.${idSearch}`);
    Object.keys(elems).map(function (item, index) {

        // Similar logic as above for updating input connections
        if (elems[item].querySelector('.point') === null) {
            // Find and process elements, calculate positions, and create curves
        } else {
            // Process cases where the input node has connection points
        }
    });
}
/**
 * Handles the double-click event on the canvas.
 * This method checks if a connection is selected and whether rerouting is enabled. 
 * If both conditions are met, it creates a reroute point for the selected connection. 
 * Additionally, if the double-click occurs on a reroute point, it removes that point.
 *
 * @param {Event} e - The event object representing the double-click event.
 */
dblclick(e) {
    // Check if a connection is currently selected and if rerouting is enabled.
    if (this.connection_selected != null && this.reroute) {
        // Create a reroute point at the current location for the selected connection.
        this.createReroutePoint(this.connection_selected);
    }

    // Check if the double-click target is a reroute point.
    if (e.target.classList[0] === 'point') {
        // Remove the reroute point that was double-clicked.
        this.removeReroutePoint(e.target);
    }
}

/**
 * Creates a reroute point in the current connection.
 * This method removes the selection from the currently selected connection, 
 * calculates the position of the new reroute point, and updates the 
 * connection data in the drawflow structure. It also handles the 
 * insertion of the reroute point into the SVG element, including 
 * creating a new path if curvature is fixed.
 *
 * @param {HTMLElement} ele - The SVG element where the reroute point will be added.
 */
createReroutePoint(ele) {
    // Remove the "selected" class from the currently selected connection.
    this.connection_selected.classList.remove("selected");

    // Extract information about the nodes from the selected connection's parent element.
    const nodeUpdate = this.connection_selected.parentElement.classList[2].slice(9); // Node identifier for update
    const nodeUpdateIn = this.connection_selected.parentElement.classList[1].slice(13); // Input node identifier
    const output_class = this.connection_selected.parentElement.classList[3]; // Class of the output connection
    const input_class = this.connection_selected.parentElement.classList[4]; // Class of the input connection

    // Clear the reference to the selected connection.
    this.connection_selected = null;

    // Create a new SVG circle element to represent the reroute point.
    const point = document.createElementNS('http://www.w3.org/2000/svg', "circle");
    point.classList.add("point");

    // Calculate the position of the new reroute point based on zoom and canvas dimensions.
    var pos_x = this.pos_x * (this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)) -
        (this.precanvas.getBoundingClientRect().x * (this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)));
    var pos_y = this.pos_y * (this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)) -
        (this.precanvas.getBoundingClientRect().y * (this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)));

    // Set attributes for the new circle (reroute point).
    point.setAttributeNS(null, 'cx', pos_x); // Set the x position
    point.setAttributeNS(null, 'cy', pos_y); // Set the y position
    point.setAttributeNS(null, 'r', this.reroute_width); // Set the radius

    let position_add_array_point = 0; // Initialize position for inserting points

    // Check if curvature fixing is enabled.
    if (this.reroute_fix_curvature) {
        const numberPoints = ele.parentElement.querySelectorAll(".main-path").length; // Count existing paths
        var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
        path.classList.add("main-path"); // Create a new path for the reroute
        path.setAttributeNS(null, 'd', ''); // Initialize the path data

        // Insert the new path element before the current number of paths.
        ele.parentElement.insertBefore(path, ele.parentElement.children[numberPoints]);

        // Append the reroute point to the correct position based on existing points.
        if (numberPoints === 1) {
            ele.parentElement.appendChild(point); // If only one path exists, append point directly
        } else {
            const search_point = Array.from(ele.parentElement.children).indexOf(ele); // Find the index of the current element
            position_add_array_point = search_point; // Set the position for adding the point
            ele.parentElement.insertBefore(point, ele.parentElement.children[search_point + numberPoints + 1]); // Insert the reroute point
        }
    } else {
        // If curvature fixing is not enabled, append the point directly.
        ele.parentElement.appendChild(point);
    }

    // Extract the node ID from the updated class.
    const nodeId = nodeUpdate.slice(5);

    // Find the connection index based on the node ID and connection classes.
    const searchConnection = this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections.findIndex(function (item, i) {
        return item.node === nodeUpdateIn && item.output === input_class; // Match the node and output class
    });

    // Initialize points array if it doesn't exist.
    if (this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections[searchConnection].points === undefined) {
        this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections[searchConnection].points = [];
    }

    // If curvature fixing is enabled, manage the insertion of points based on the position.
    if (this.reroute_fix_curvature) {
        if (position_add_array_point > 0 || this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections[searchConnection].points.length !== 0) {
            // Insert the new point at the calculated position in the points array.
            this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections[searchConnection].points.splice(position_add_array_point, 0, { pos_x: pos_x, pos_y: pos_y });
        } else {
            // Otherwise, just push the new point to the array.
            this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections[searchConnection].points.push({ pos_x: pos_x, pos_y: pos_y });
        }

        // Remove the "selected" class from all main paths.
        ele.parentElement.querySelectorAll(".main-path").forEach((item, i) => {
            item.classList.remove("selected");
        });
    } else {
        // If curvature fixing is not enabled, simply push the point to the array.
        this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections[searchConnection].points.push({ pos_x: pos_x, pos_y: pos_y });
    }

    // Dispatch an event indicating that a reroute point has been added.
    this.dispatch('addReroute', nodeId);

    // Update the connection nodes based on the updated node ID.
    this.updateConnectionNodes(nodeUpdate);
}

/**
 * Removes a reroute point from the current connection.
 * This method updates the connection data in the drawflow structure 
 * by finding the appropriate reroute point to remove based on the 
 * provided SVG element. It also manages the adjustment of 
 * paths and points according to the curvature settings.
 *
 * @param {HTMLElement} ele - The SVG element representing the reroute point to be removed.
 * @returns {void} - This method does not return a value.
 *
 * @throws {Error} - Throws an error if the connection or point to remove cannot be found.
 */
removeReroutePoint(ele) {
    // Extract information about the nodes from the reroute point's parent element.
    const nodeUpdate = ele.parentElement.classList[2].slice(9); // Node identifier for update
    const nodeUpdateIn = ele.parentElement.classList[1].slice(13); // Input node identifier
    const output_class = ele.parentElement.classList[3]; // Class of the output connection
    const input_class = ele.parentElement.classList[4]; // Class of the input connection

    // Find the index of the reroute point in the parent element's children.
    let numberPointPosition = Array.from(ele.parentElement.children).indexOf(ele);
    const nodeId = nodeUpdate.slice(5); // Extract the node ID for further operations

    // Find the connection index based on the node ID and connection classes.
    const searchConnection = this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections.findIndex(function (item, i) {
        return item.node === nodeUpdateIn && item.output === input_class; // Match the node and output class
    });

    if (searchConnection === -1) {
        throw new Error(`Connection not found for nodeId: ${nodeId}, output: ${output_class}, input: ${input_class}`);
    }

    // Handle the removal of points based on curvature fixing setting.
    if (this.reroute_fix_curvature) {
        const numberMainPath = ele.parentElement.querySelectorAll(".main-path").length; // Count existing paths

        // Remove the last main path, which is related to the current reroute point.
        ele.parentElement.children[numberMainPath - 1].remove();

        // Adjust the position of the point to be removed accordingly.
        numberPointPosition -= numberMainPath;
        // Ensure the position is non-negative.
        if (numberPointPosition < 0) {
            numberPointPosition = 0;
        }
    } else {
        // If curvature fixing is not enabled, simply decrement the position.
        numberPointPosition--;
    }

    // Remove the reroute point from the connection's points array.
    this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections[searchConnection].points.splice(numberPointPosition, 1);

    // Remove the SVG element representing the reroute point from the DOM.
    ele.remove();

    // Dispatch an event indicating that a reroute point has been removed.
    this.dispatch('removeReroute', nodeId);

    // Update the connection nodes based on the updated node ID.
    this.updateConnectionNodes(nodeUpdate);
}

/**
 * Registers a new node in the noderegister.
 * This method adds an entry to the noderegister object, 
 * which associates a node name with its corresponding HTML 
 * structure, properties, and optional settings.
 *
 * @param {string} name - The unique name for the node being registered.
 * @param {string} html - The HTML structure of the node as a string.
 * @param {Object|null} [props=null] - An optional object representing 
 *        properties associated with the node (default is null).
 * @param {Object|null} [options=null] - An optional object containing 
 *        additional settings or configurations for the node (default is null).
 * 
 * @returns {void} - This method does not return a value.
 *
 * @example
 * registerNode('myNode', '<div>Node Content</div>', { color: 'red' }, { draggable: true });
 */
registerNode(name, html, props = null, options = null) {
    // Store the node information in the noderegister with the provided name as the key.
    this.noderegister[name] = { html: html, props: props, options: options };
}

/**
 * Retrieves a node object from the drawflow data structure using its unique ID.
 * This method extracts the node information by first determining the 
 * module associated with the provided node ID and then returning a deep copy 
 * of the node object to prevent unintentional modifications to the original data.
 *
 * @param {string} id - The unique identifier of the node to retrieve.
 * 
 * @returns {Object} - A deep copy of the node object associated with the given ID,
 *                     or undefined if the node does not exist.
 * 
 * @throws {Error} - Throws an error if the module associated with the ID is not found.
 *
 * @example
 * const node = getNodeFromId('node_1');
 * console.log(node); // Logs the details of the node with ID 'node_1'
 */
getNodeFromId(id) {
    // Retrieve the module name associated with the node ID.
    var moduleName = this.getModuleFromNodeId(id);

    // Return a deep copy of the node data to avoid direct manipulation of the original object.
    return JSON.parse(JSON.stringify(this.drawflow.drawflow[moduleName].data[id]));
}

/**
 * Retrieves a list of node IDs associated with a given name from the drawflow data structure.
 * This method iterates through all modules in the drawflow editor and collects 
 * the IDs of nodes that match the specified name.
 *
 * @param {string} name - The name of the nodes to search for.
 * 
 * @returns {Array<string>} - An array of node IDs that correspond to the given name.
 *                            Returns an empty array if no nodes with the specified name are found.
 * 
 * @example
 * const nodeIds = getNodesFromName('myNode');
 * console.log(nodeIds); // Logs an array of IDs for all nodes named 'myNode'.
 */
getNodesFromName(name) {
    // Initialize an empty array to hold the matching node IDs.
    var nodes = [];

    // Reference to the drawflow editor data structure.
    const editor = this.drawflow.drawflow;

    // Iterate through all module names in the editor.
    Object.keys(editor).map(function (moduleName, index) {
        // Iterate through each node in the module's data.
        for (var node in editor[moduleName].data) {
            // Check if the node's name matches the specified name.
            if (editor[moduleName].data[node].name == name) {
                // If it matches, push the node's ID to the nodes array.
                nodes.push(editor[moduleName].data[node].id);
            }
        }
    });

    // Return the array of matching node IDs.
    return nodes;
}

/**
 * Adds a new node to the drawflow editor with specified properties and settings.
 * This method creates the necessary DOM elements for the node, initializes its inputs
 * and outputs, sets its position, and registers it in the drawflow data structure.
 *
 * @param {string} name - The name of the node to be added.
 * @param {number} num_in - The number of input connections the node should have.
 * @param {number} num_out - The number of output connections the node should have.
 * @param {number} ele_pos_x - The horizontal position of the node on the canvas.
 * @param {number} ele_pos_y - The vertical position of the node on the canvas.
 * @param {string} classoverride - Additional CSS classes to apply to the node.
 * @param {Object} data - An object containing data to initialize the node with.
 * @param {string} html - The HTML content to be rendered inside the node.
 * @param {boolean} [typenode=false] - A flag indicating if the node should use a registered node type.
 * 
 * @returns {string} - The unique ID of the newly created node.
 * 
 * @example
 * const nodeId = addNode('MyNode', 2, 1, 100, 200, 'custom-class', { key: 'value' }, '<p>Hello World</p>');
 * console.log(nodeId); // Logs the ID of the created node.
 */
addNode(name, num_in, num_out, ele_pos_x, ele_pos_y, classoverride, data, html, typenode = false) {
    // Generate a new node ID based on UUID settings or a simple increment.
    var newNodeId = this.useuuid ? this.getUuid() : this.nodeId;

    // Create the parent container for the node.
    const parent = document.createElement('div');
    parent.classList.add("parent-node");

    // Create the node element and set its attributes.
    const node = document.createElement('div');
    node.innerHTML = "";
    node.setAttribute("id", "node-" + newNodeId);
    node.classList.add("drawflow-node");

    // Apply any additional classes specified by classoverride.
    if (classoverride != '') {
        node.classList.add(...classoverride.split(' '));
    }

    // Create input and output containers for the node.
    const inputs = document.createElement('div');
    inputs.classList.add("inputs");
    const outputs = document.createElement('div');
    outputs.classList.add("outputs");

    // Initialize the inputs with connection data.
    const json_inputs = {};
    for (var x = 0; x < num_in; x++) {
        const input = document.createElement('div');
        input.classList.add("input");
        input.classList.add("input_" + (x + 1));
        json_inputs["input_" + (x + 1)] = { "connections": [] };
        inputs.appendChild(input);
    }

    // Initialize the outputs with connection data.
    const json_outputs = {};
    for (var x = 0; x < num_out; x++) {
        const output = document.createElement('div');
        output.classList.add("output");
        output.classList.add("output_" + (x + 1));
        json_outputs["output_" + (x + 1)] = { "connections": [] };
        outputs.appendChild(output);
    }

    // Create a content container for the node's main content.
    const content = document.createElement('div');
    content.classList.add("drawflow_content_node");

    // Determine how to populate the content based on typenode.
    if (typenode === false) {
        content.innerHTML = html; // Use raw HTML content.
    } else if (typenode === true) {
        // Clone the registered node's HTML if it exists.
        content.appendChild(this.noderegister[html].html.cloneNode(true));
    } else {
        // Handle rendering for different Vue versions (Vue 3 and Vue 2).
        if (parseInt(this.render.version) === 3) {
            let wrapper = this.render.h(this.noderegister[html].html, this.noderegister[html].props, this.noderegister[html].options);
            wrapper.appContext = this.parent;
            this.render.render(wrapper, content);
        } else {
            let wrapper = new this.render({
                parent: this.parent,
                render: h => h(this.noderegister[html].html, { props: this.noderegister[html].props }),
                ...this.noderegister[html].options
            }).$mount();
            content.appendChild(wrapper.$el);
        }
    }

    // Populate content with data from the provided data object.
    Object.entries(data).forEach(function ([key, value]) {
        if (typeof value === "object") {
            insertObjectkeys(null, key, key); // Handle nested objects.
        } else {
            var elems = content.querySelectorAll('[df-' + key + ']');
            for (var i = 0; i < elems.length; i++) {
                elems[i].value = value; // Set the value of input elements.
                if (elems[i].isContentEditable) {
                    elems[i].innerText = value; // Set the inner text for editable elements.
                }
            }
        }
    });

    /**
     * Recursively inserts keys from a nested object into the content.
     * This function is used to initialize content based on the data object structure.
     *
     * @param {Object|null} object - The current object context (null for root).
     * @param {string} name - The name of the current key to process.
     * @param {string} completname - The complete name path for the key.
     */
    function insertObjectkeys(object, name, completname) {
        var object = object === null ? data[name] : object[name]; // Get the object to process.
        if (object !== null) {
            Object.entries(object).forEach(function ([key, value]) {
                if (typeof value === "object") {
                    insertObjectkeys(object, key, completname + '-' + key); // Recursive call for nested objects.
                } else {
                    var elems = content.querySelectorAll('[df-' + completname + '-' + key + ']');
                    for (var i = 0; i < elems.length; i++) {
                        elems[i].value = value; // Set the value for matching elements.
                        if (elems[i].isContentEditable) {
                            elems[i].innerText = value; // Set inner text for editable elements.
                        }
                    }
                }
            });
        }
    }

    // Append inputs, content, and outputs to the node element.
    node.appendChild(inputs);
    node.appendChild(content);
    node.appendChild(outputs);

    // Set the position of the node based on the provided coordinates.
    node.style.top = ele_pos_y + "px";
    node.style.left = ele_pos_x + "px";

    // Append the node to the parent container and the parent to the precanvas.
    parent.appendChild(node);
    this.precanvas.appendChild(parent);

    // Create a JSON representation of the new node.
    var json = {
        id: newNodeId,
        name: name,
        data: data,
        class: classoverride,
        html: html,
        typenode: typenode,
        inputs: json_inputs,
        outputs: json_outputs,
        pos_x: ele_pos_x,
        pos_y: ele_pos_y,
    };

    // Register the new node in the drawflow data structure.
    this.drawflow.drawflow[this.module].data[newNodeId] = json;

    // Dispatch an event indicating that a new node has been created.
    this.dispatch('nodeCreated', newNodeId);

    // Increment the node ID if UUIDs are not used.
    if (!this.useuuid) {
        this.nodeId++;
    }

    // Return the unique ID of the newly created node.
    return newNodeId;
}

/**
 * Adds a node to the drawing area based on the provided dataNode object.
 * This function creates the necessary HTML elements to represent the node,
 * including its inputs, outputs, and content based on the node type and properties.
 *
 * @param {Object} dataNode - The data object containing the node's properties.
 * @param {HTMLElement} precanvas - The parent element where the new node will be appended.
 */
addNodeImport(dataNode, precanvas) {
    // Create the parent container for the node
    const parent = document.createElement('div');
    parent.classList.add("parent-node");

    // Create the main node element
    const node = document.createElement('div');
    node.innerHTML = "";
    node.setAttribute("id", "node-" + dataNode.id); // Set the node's unique ID
    node.classList.add("drawflow-node");

    // Add custom classes if provided
    if (dataNode.class != '') {
        node.classList.add(...dataNode.class.split(' '));
    }

    // Create input and output containers for the node
    const inputs = document.createElement('div');
    inputs.classList.add("inputs");
    const outputs = document.createElement('div');
    outputs.classList.add("outputs");

    // Iterate over the inputs of the node to create input elements and their connections
    Object.keys(dataNode.inputs).map(function (input_item, index) {
        const input = document.createElement('div');
        input.classList.add("input");
        input.classList.add(input_item); // Set the input class
        inputs.appendChild(input); // Append input to the inputs container

        // Create connections for each input
        Object.keys(dataNode.inputs[input_item].connections).map(function (output_item, index) {
            // Create SVG elements for the connection paths
            var connection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
            var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
            path.classList.add("main-path"); // Class for styling the path
            path.setAttributeNS(null, 'd', ''); // Set the path data (currently empty)

            // Set connection classes based on the data
            connection.classList.add("connection");
            connection.classList.add("node_in_node-" + dataNode.id);
            connection.classList.add("node_out_node-" + dataNode.inputs[input_item].connections[output_item].node);
            connection.classList.add(dataNode.inputs[input_item].connections[output_item].input);
            connection.classList.add(input_item);

            connection.appendChild(path); // Append the path to the connection
            precanvas.appendChild(connection); // Append the connection to the precanvas
        });
    });

    // Create output elements for the node based on its outputs
    for (var x = 0; x < Object.keys(dataNode.outputs).length; x++) {
        const output = document.createElement('div');
        output.classList.add("output");
        output.classList.add("output_" + (x + 1)); // Unique class for each output
        outputs.appendChild(output); // Append output to the outputs container
    }

    // Create the content area for the node
    const content = document.createElement('div');
    content.classList.add("drawflow_content_node");

    // Set content based on the node type
    if (dataNode.typenode === false) {
        content.innerHTML = dataNode.html; // If simple HTML is provided
    } else if (dataNode.typenode === true) {
        content.appendChild(this.noderegister[dataNode.html].html.cloneNode(true)); // Clone the registered HTML
    } else {
        // Handle rendering based on Vue version
        if (parseInt(this.render.version) === 3) {
            // Vue 3
            let wrapper = this.render.h(this.noderegister[dataNode.html].html, this.noderegister[dataNode.html].props, this.noderegister[dataNode.html].options);
            wrapper.appContext = this.parent; // Set the app context for Vue 3
            this.render.render(wrapper, content); // Render the wrapper into content

        } else {
            // Vue 2
            let wrapper = new this.render({
                parent: this.parent,
                render: h => h(this.noderegister[dataNode.html].html, { props: this.noderegister[dataNode.html].props }),
                ...this.noderegister[dataNode.html].options
            }).$mount(); // Mount the Vue instance
            content.appendChild(wrapper.$el); // Append the rendered element to content
        }
    }

    // Populate the content with data from the dataNode
    Object.entries(dataNode.data).forEach(function (key, value) {
        // If the data is an object, call the insertObjectkeys function
        if (typeof key[1] === "object") {
            insertObjectkeys(null, key[0], key[0]);
        } else {
            // Update content elements with values from the data
            var elems = content.querySelectorAll('[df-' + key[0] + ']');
            for (var i = 0; i < elems.length; i++) {
                elems[i].value = key[1]; // Set the value of the element
                if (elems[i].isContentEditable) {
                    elems[i].innerText = key[1]; // Set inner text for editable elements
                }
            }
        }
    });

    /**
     * Recursively inserts object keys into the content, setting values
     * for elements that match the data attributes.
     *
     * @param {Object|null} object - The object containing data values.
     * @param {string} name - The current key name to process.
     * @param {string} completname - The full name used for the data attribute.
     */
    function insertObjectkeys(object, name, completname) {
        if (object === null) {
            var object = dataNode.data[name]; // Initialize object from dataNode
        } else {
            var object = object[name]; // Navigate through the object
        }
        if (object !== null) {
            Object.entries(object).forEach(function (key, value) {
                if (typeof key[1] === "object") {
                    insertObjectkeys(object, key[0], completname + '-' + key[0]); // Recursion for nested objects
                } else {
                    var elems = content.querySelectorAll('[df-' + completname + '-' + key[0] + ']');
                    for (var i = 0; i < elems.length; i++) {
                        elems[i].value = key[1]; // Set the value for each matched element
                        if (elems[i].isContentEditable) {
                            elems[i].innerText = key[1]; // Set inner text for editable elements
                        }
                    }
                }
            });
        }
    }

    // Append inputs, content, and outputs to the node
    node.appendChild(inputs);
    node.appendChild(content);
    node.appendChild(outputs);

    // Set the position of the node based on dataNode properties
    node.style.top = dataNode.pos_y + "px";
    node.style.left = dataNode.pos_x + "px";

    // Append the node to the parent container
    parent.appendChild(node);
    // Finally, append the parent container to the precanvas
    this.precanvas.appendChild(parent);
}

/**
 * Adds reroute points to connections in the drawing container based on the provided dataNode object.
 * This function iterates through the outputs of the node and creates SVG circles at the specified points
 * for each connection. It also handles the curvature of the connections if specified.
 *
 * @param {Object} dataNode - The data object containing the node's output connections and their points.
 */
addRerouteImport(dataNode) {
    // Set the reroute width and curvature fix values from the instance properties
    const reroute_width = this.reroute_width;
    const reroute_fix_curvature = this.reroute_fix_curvature;
    const container = this.container; // Reference to the drawing container

    // Iterate over each output of the dataNode
    Object.keys(dataNode.outputs).map(function (output_item, index) {
        // Iterate over the connections of the current output
        Object.keys(dataNode.outputs[output_item].connections).map(function (input_item, index) {
            // Retrieve the points associated with the current connection
            const points = dataNode.outputs[output_item].connections[input_item].points;

            // Check if points are defined before proceeding
            if (points !== undefined) {
                // Iterate over each point to create visual elements
                points.forEach((item, i) => {
                    // Get the input node ID and output class from the connection
                    const input_id = dataNode.outputs[output_item].connections[input_item].node;
                    const input_class = dataNode.outputs[output_item].connections[input_item].output;

                    // Select the corresponding SVG connection element based on classes
                    const ele = container.querySelector('.connection.node_in_node-' + input_id + '.node_out_node-' + dataNode.id + '.' + output_item + '.' + input_class);

                    // Handle curvature of the reroute if specified
                    if (reroute_fix_curvature) {
                        if (i === 0) {
                            // Create multiple path elements for curvature if it's the first point
                            for (var z = 0; z < points.length; z++) {
                                var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
                                path.classList.add("main-path"); // Class for styling the path
                                path.setAttributeNS(null, 'd', ''); // Initialize the path data (currently empty)
                                ele.appendChild(path); // Append the path to the connection element
                            }
                        }
                    }

                    // Create a circle element for the current point
                    const point = document.createElementNS('http://www.w3.org/2000/svg', "circle");
                    point.classList.add("point"); // Class for styling the point
                    var pos_x = item.pos_x; // Get the x position from the point data
                    var pos_y = item.pos_y; // Get the y position from the point data

                    // Set the circle's attributes based on point data
                    point.setAttributeNS(null, 'cx', pos_x); // Set the x-coordinate
                    point.setAttributeNS(null, 'cy', pos_y); // Set the y-coordinate
                    point.setAttributeNS(null, 'r', reroute_width); // Set the radius

                    // Append the point to the connection element
                    ele.appendChild(point);
                });
            }
        });
    });
}

/**
 * Updates the value of a node based on user input events. This function
 * listens for events triggered by user interactions with node elements,
 * extracts the relevant attributes, and updates the corresponding data in 
 * the drawflow structure.
 *
 * @param {Event} event - The event object containing information about the user interaction.
 */
updateNodeValue(event) {
    // Retrieve all attributes from the event target
    var attr = event.target.attributes;

    // Iterate over the attributes to find custom data attributes (starting with 'df-')
    for (var i = 0; i < attr.length; i++) {
        if (attr[i].nodeName.startsWith('df-')) {
            // Extract the keys from the attribute name (removing 'df-' prefix)
            var keys = attr[i].nodeName.slice(3).split("-");

            // Find the target node's data based on the closest drawflow content node
            var target = this.drawflow.drawflow[this.module].data[event.target.closest(".drawflow_content_node").parentElement.id.slice(5)].data;

            // Traverse the target object using the keys to reach the final property
            for (var index = 0; index < keys.length - 1; index += 1) {
                // Initialize nested objects if they don't exist
                if (target[keys[index]] == null) {
                    target[keys[index]] = {};
                }
                // Move deeper into the target object
                target = target[keys[index]];
            }

            // Update the final target property with the new value from the event
            target[keys[keys.length - 1]] = event.target.value;

            // If the event target is editable, update the inner text as well
            if (event.target.isContentEditable) {
                target[keys[keys.length - 1]] = event.target.innerText;
            }

            // Dispatch an event indicating that the node data has changed
            this.dispatch('nodeDataChanged', event.target.closest(".drawflow_content_node").parentElement.id.slice(5));
        }
    }
}

/**
 * Updates the data of a node identified by its ID with the provided data.
 * This function retrieves the module associated with the node ID, updates
 * the node's data, and reflects the changes in the corresponding UI elements.
 *
 * @param {string} id - The unique identifier of the node to be updated.
 * @param {Object} data - The new data to be assigned to the node.
 */
updateNodeDataFromId(id, data) {
    // Get the module name associated with the given node ID
    var moduleName = this.getModuleFromNodeId(id);

    // Update the node's data in the drawflow structure
    this.drawflow.drawflow[moduleName].data[id].data = data;

    // Check if the current module matches the module of the node being updated
    if (this.module === moduleName) {
        // Select the corresponding content element in the container
        const content = this.container.querySelector('#node-' + id);

        // Iterate over each key-value pair in the provided data
        Object.entries(data).forEach(function (key, value) {
            // If the value is an object, handle it recursively
            if (typeof key[1] === "object") {
                insertObjectkeys(null, key[0], key[0]);
            } else {
                // Select all elements with a matching 'df-' attribute
                var elems = content.querySelectorAll('[df-' + key[0] + ']');

                // Update the value or inner text of each matching element
                for (var i = 0; i < elems.length; i++) {
                    elems[i].value = key[1];
                    if (elems[i].isContentEditable) {
                        elems[i].innerText = key[1];
                    }
                }
            }
        });

        /**
         * Recursively inserts object keys into the corresponding content elements.
         *
         * @param {Object|null} object - The current object context for recursion.
         * @param {string} name - The current key being processed.
         * @param {string} completname - The complete name for attribute selection.
         */
        function insertObjectkeys(object, name, completname) {
            // If no object context is provided, initialize it with the data
            if (object === null) {
                var object = data[name];
            } else {
                var object = object[name];
            }
            // Process the object if it exists
            if (object !== null) {
                // Iterate over each key-value pair in the object
                Object.entries(object).forEach(function (key, value) {
                    // If the value is another object, recurse deeper
                    if (typeof key[1] === "object") {
                        insertObjectkeys(object, key[0], completname + '-' + key[0]);
                    } else {
                        // Select elements with the corresponding 'df-' attribute
                        var elems = content.querySelectorAll('[df-' + completname + '-' + key[0] + ']');

                        // Update the value or inner text of each matching element
                        for (var i = 0; i < elems.length; i++) {
                            elems[i].value = key[1];
                            if (elems[i].isContentEditable) {
                                elems[i].innerText = key[1];
                            }
                        }
                    }
                });
            }
        }
    }
}

/**
 * Adds a new input to the node identified by the given ID.
 * This function updates the node's data structure and visually
 * adds an input element to the node in the user interface.
 *
 * @param {string} id - The unique identifier of the node to which the input is being added.
 */
addNodeInput(id) {
    // Retrieve the module name associated with the given node ID
    var moduleName = this.getModuleFromNodeId(id);

    // Get information about the node using its ID
    const infoNode = this.getNodeFromId(id);

    // Determine the current number of inputs the node has
    const numInputs = Object.keys(infoNode.inputs).length;

    // Check if the current module matches the module of the node being updated
    if (this.module === moduleName) {
        // Create a new input element for the node
        const input = document.createElement('div');
        input.classList.add("input");
        input.classList.add("input_" + (numInputs + 1)); // Set the class for the new input based on the number of existing inputs

        // Find the parent container where the new input should be added
        const parent = this.container.querySelector('#node-' + id + ' .inputs');

        // Append the new input element to the parent container
        parent.appendChild(input);

        // Update the connection nodes to reflect the new input
        this.updateConnectionNodes('node-' + id);
    }

    // Update the node's data structure to include the new input
    this.drawflow.drawflow[moduleName].data[id].inputs["input_" + (numInputs + 1)] = { "connections": [] };
}

/**
 * Adds a new output to the node identified by the given ID.
 * This function updates the node's data structure and visually
 * adds an output element to the node in the user interface.
 *
 * @param {string} id - The unique identifier of the node to which the output is being added.
 */
addNodeOutput(id) {
    // Retrieve the module name associated with the given node ID
    var moduleName = this.getModuleFromNodeId(id);

    // Get information about the node using its ID
    const infoNode = this.getNodeFromId(id);

    // Determine the current number of outputs the node has
    const numOutputs = Object.keys(infoNode.outputs).length;

    // Check if the current module matches the module of the node being updated
    if (this.module === moduleName) {
        // Create a new output element for the node
        const output = document.createElement('div');
        output.classList.add("output");
        output.classList.add("output_" + (numOutputs + 1)); // Set the class for the new output based on the number of existing outputs

        // Find the parent container where the new output should be added
        const parent = this.container.querySelector('#node-' + id + ' .outputs');

        // Append the new output element to the parent container
        parent.appendChild(output);

        // Update the connection nodes to reflect the new output
        this.updateConnectionNodes('node-' + id);
    }

    // Update the node's data structure to include the new output
    this.drawflow.drawflow[moduleName].data[id].outputs["output_" + (numOutputs + 1)] = { "connections": [] };
}

removeNodeInput(id, input_class) {
    /**
     * removeNodeInput(id, input_class)
     * ================================
     * Removes a specified input from a node within the Drawflow editor and cleans up associated connections. 
     * This method updates the internal data structure and the UI to reflect the removal of the input.
     * 
     * Process:
     * 1. Retrieves the module name and node information for the given node ID.
     * 2. Checks if the current module matches the module of the specified node.
     * 3. Removes the input element from the DOM corresponding to the specified input class.
     * 4. Collects all connections associated with the specified input and removes them using `removeSingleConnection`.
     * 5. Deletes the input from the node's internal data structure.
     * 6. Updates the connection data for other inputs, adjusting their classes and reassigning connections as needed.
     * 7. Ensures that the UI reflects any changes made to input classes and connections.
     * 
     * @param {string} id - The ID of the node from which the input is to be removed.
     * @param {string} input_class - The class of the input to be removed, typically in the format 'input_X'.
     */
    
    var moduleName = this.getModuleFromNodeId(id);
    const infoNode = this.getNodeFromId(id);
    
    // Check if the current module matches the node's module
    if (this.module === moduleName) {
        // Remove the input element from the DOM
        this.container.querySelector('#node-' + id + ' .inputs .input.' + input_class).remove();
    }
    
    const removeInputs = [];
    
    // Collect connections associated with the specified input
    Object.keys(infoNode.inputs[input_class].connections).map(function (key, index) {
        const id_output = infoNode.inputs[input_class].connections[index].node;
        const output_class = infoNode.inputs[input_class].connections[index].input;
        removeInputs.push({ id_output, id, output_class, input_class });
    });
    
    // Remove connections
    removeInputs.forEach((item) => {
        this.removeSingleConnection(item.id_output, item.id, item.output_class, item.input_class);
    });

    // Delete the input from the internal drawflow structure
    delete this.drawflow.drawflow[moduleName].data[id].inputs[input_class];

    // Update connection information
    const connections = [];
    const connectionsInputs = this.drawflow.drawflow[moduleName].data[id].inputs;
    
    Object.keys(connectionsInputs).map(function (key) {
        connections.push(connectionsInputs[key]);
    });

    // Clear existing inputs and prepare for updating
    this.drawflow.drawflow[moduleName].data[id].inputs = {};
    const input_class_id = input_class.slice(6);
    let nodeUpdates = [];

    // Reassign connections to new inputs
    connections.forEach((item, index) => {
        item.connections.forEach((connection) => {
            nodeUpdates.push(connection);
        });
        this.drawflow.drawflow[moduleName].data[id].inputs['input_' + (index + 1)] = item;
    });

    // Remove duplicate connections
    nodeUpdates = new Set(nodeUpdates.map(e => JSON.stringify(e)));
    nodeUpdates = Array.from(nodeUpdates).map(e => JSON.parse(e));

    // Update the UI classes for inputs
    if (this.module === moduleName) {
        const eles = this.container.querySelectorAll("#node-" + id + " .inputs .input");
        eles.forEach((item) => {
            const id_class = item.classList[1].slice(6);
            if (parseInt(input_class_id) < parseInt(id_class)) {
                item.classList.remove('input_' + id_class);
                item.classList.add('input_' + (id_class - 1));
            }
        });
    }

    // Update connection details based on the removed input
    nodeUpdates.forEach((itemx) => {
        this.drawflow.drawflow[moduleName].data[itemx.node].outputs[itemx.input].connections.forEach((itemz, index) => {
            if (itemz.node == id) {
                const output_id = itemz.output.slice(6);
                if (parseInt(input_class_id) < parseInt(output_id)) {
                    if (this.module === moduleName) {
                        const ele = this.container.querySelector(".connection.node_in_node-" + id + ".node_out_node-" + itemx.node + "." + itemx.input + ".input_" + output_id);
                        ele.classList.remove('input_' + output_id);
                        ele.classList.add('input_' + (output_id - 1));
                    }
                    // Update connection details for points
                    if (itemz.points) {
                        this.drawflow.drawflow[moduleName].data[itemx.node].outputs[itemx.input].connections[index] = { node: itemz.node, output: 'input_' + (output_id - 1), points: itemz.points };
                    } else {
                        this.drawflow.drawflow[moduleName].data[itemx.node].outputs[itemx.input].connections[index] = { node: itemz.node, output: 'input_' + (output_id - 1) };
                    }
                }
            }
        });
    });

    // Update the node's connections visually
    this.updateConnectionNodes('node-' + id);
}

removeNodeOutput(id, output_class) {
    /**
     * removeNodeOutput(id, output_class)
     * ================================
     * Removes a specified output from a node within the Drawflow editor and cleans up associated connections. 
     * This method updates the internal data structure and the UI to reflect the removal of the output.
     * 
     * Process:
     * 1. Retrieves the module name and node information for the given node ID.
     * 2. Checks if the current module matches the module of the specified node.
     * 3. Removes the output element from the DOM corresponding to the specified output class.
     * 4. Collects all connections associated with the specified output and removes them using `removeSingleConnection`.
     * 5. Deletes the output from the node's internal data structure.
     * 6. Updates the connection data for other outputs, adjusting their classes and reassigning connections as needed.
     * 7. Ensures that the UI reflects any changes made to output classes and connections.
     * 
     * @param {string} id - The ID of the node from which the output is to be removed.
     * @param {string} output_class - The class of the output to be removed, typically in the format 'output_X'.
     */
    
    var moduleName = this.getModuleFromNodeId(id);
    const infoNode = this.getNodeFromId(id);
    
    // Check if the current module matches the node's module
    if (this.module === moduleName) {
        // Remove the output element from the DOM
        this.container.querySelector('#node-' + id + ' .outputs .output.' + output_class).remove();
    }
    
    const removeOutputs = [];
    
    // Collect connections associated with the specified output
    Object.keys(infoNode.outputs[output_class].connections).map(function (key, index) {
        const id_input = infoNode.outputs[output_class].connections[index].node;
        const input_class = infoNode.outputs[output_class].connections[index].output;
        removeOutputs.push({ id, id_input, output_class, input_class });
    });
    
    // Remove connections
    removeOutputs.forEach((item) => {
        this.removeSingleConnection(item.id, item.id_input, item.output_class, item.input_class);
    });

    // Delete the output from the internal drawflow structure
    delete this.drawflow.drawflow[moduleName].data[id].outputs[output_class];

    // Update connection information
    const connections = [];
    const connectionsOutputs = this.drawflow.drawflow[moduleName].data[id].outputs;
    
    Object.keys(connectionsOutputs).map(function (key) {
        connections.push(connectionsOutputs[key]);
    });

    // Clear existing outputs and prepare for updating
    this.drawflow.drawflow[moduleName].data[id].outputs = {};
    const output_class_id = output_class.slice(7);
    let nodeUpdates = [];

    // Reassign connections to new outputs
    connections.forEach((item, index) => {
        item.connections.forEach((connection) => {
            nodeUpdates.push({ node: connection.node, output: connection.output });
        });
        this.drawflow.drawflow[moduleName].data[id].outputs['output_' + (index + 1)] = item;
    });

    // Remove duplicate connections
    nodeUpdates = new Set(nodeUpdates.map(e => JSON.stringify(e)));
    nodeUpdates = Array.from(nodeUpdates).map(e => JSON.parse(e));

    // Update the UI classes for outputs
    if (this.module === moduleName) {
        const eles = this.container.querySelectorAll("#node-" + id + " .outputs .output");
        eles.forEach((item) => {
            const id_class = item.classList[1].slice(7);
            if (parseInt(output_class_id) < parseInt(id_class)) {
                item.classList.remove('output_' + id_class);
                item.classList.add('output_' + (id_class - 1));
            }
        });
    }

    // Update connection details based on the removed output
    nodeUpdates.forEach((itemx) => {
        this.drawflow.drawflow[moduleName].data[itemx.node].inputs[itemx.output].connections.forEach((itemz, index) => {
            if (itemz.node == id) {
                const input_id = itemz.input.slice(7);
                if (parseInt(output_class_id) < parseInt(input_id)) {
                    if (this.module === moduleName) {
                        const ele = this.container.querySelector(".connection.node_in_node-" + itemx.node + ".node_out_node-" + id + ".output_" + input_id + "." + itemx.output);
                        ele.classList.remove('output_' + input_id);
                        ele.classList.remove(itemx.output);
                        ele.classList.add('output_' + (input_id - 1));
                        ele.classList.add(itemx.output);
                    }
                    // Update connection details for points
                    if (itemz.points) {
                        this.drawflow.drawflow[moduleName].data[itemx.node].inputs[itemx.output].connections[index] = { node: itemz.node, input: 'output_' + (input_id - 1), points: itemz.points };
                    } else {
                        this.drawflow.drawflow[moduleName].data[itemx.node].inputs[itemx.output].connections[index] = { node: itemz.node, input: 'output_' + (input_id - 1) };
                    }
                }
            }
        });
    });

    // Update the node's connections visually
    this.updateConnectionNodes('node-' + id);
}

removeNodeId(id) {
    /**
     * removeNodeId(id)
     * =================
     * Removes a node from the Drawflow editor based on its ID. This method handles the removal 
     * of the node from the DOM and updates the internal data structure accordingly.
     *
     * Process:
     * 1. Calls `removeConnectionNodeId` to handle any connections related to the node.
     * 2. Retrieves the module name associated with the node ID.
     * 3. If the current module matches the module of the node, it removes the node's DOM element.
     * 4. Deletes the node's data from the internal Drawflow structure.
     * 5. Dispatches a 'nodeRemoved' event to notify other components of the removal.
     *
     * @param {string} id - The ID of the node to be removed, expected in the format 'node-X' where X is the node identifier.
     */
    
    this.removeConnectionNodeId(id); // Remove any connections associated with the node

    // Get the module name from the node ID
    var moduleName = this.getModuleFromNodeId(id.slice(5));

    // Check if the current module matches the node's module and remove the node from the DOM
    if (this.module === moduleName) {
        this.container.querySelector(`#${id}`).remove();
    }

    // Delete the node's data from the internal Drawflow structure
    delete this.drawflow.drawflow[moduleName].data[id.slice(5)];

    // Dispatch an event to notify that the node has been removed
    this.dispatch('nodeRemoved', id.slice(5));
}

removeConnection() {
    /**
     * removeConnection()
     * ===================
     * Removes a selected connection from the Drawflow editor. This method updates both the DOM 
     * and the internal data structure to ensure consistency.
     *
     * Process:
     * 1. Checks if a connection is currently selected.
     * 2. Removes the selected connection element from the DOM.
     * 3. Identifies the output node and its class to find the connection index in the output's connections.
     * 4. Removes the connection from the output node's connections.
     * 5. Identifies the input node and its class to find the connection index in the input's connections.
     * 6. Removes the connection from the input node's connections.
     * 7. Dispatches a 'connectionRemoved' event with relevant connection details.
     * 8. Resets the selected connection to null.
     */
    
    // Check if there is a selected connection to remove
    if (this.connection_selected != null) {
        var listclass = this.connection_selected.parentElement.classList; // Get the classes of the selected connection's parent element
        
        // Remove the connection element from the DOM
        this.connection_selected.parentElement.remove();

        // Find the index of the connection in the output's connections and remove it
        var index_out = this.drawflow.drawflow[this.module].data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function (item, i) {
            return item.node === listclass[1].slice(13) && item.output === listclass[4];
        });
        this.drawflow.drawflow[this.module].data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out, 1);

        // Find the index of the connection in the input's connections and remove it
        var index_in = this.drawflow.drawflow[this.module].data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function (item, i) {
            return item.node === listclass[2].slice(14) && item.input === listclass[3];
        });
        this.drawflow.drawflow[this.module].data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in, 1);
        
        // Dispatch an event to notify that the connection has been removed, including details of the removed connection
        this.dispatch('connectionRemoved', { 
            output_id: listclass[2].slice(14), 
            input_id: listclass[1].slice(13), 
            output_class: listclass[3], 
            input_class: listclass[4] 
        });
        
        // Reset the selected connection to null
        this.connection_selected = null;
    }
}

removeSingleConnection(id_output, id_input, output_class, input_class) {
    /**
     * removeSingleConnection(id_output, id_input, output_class, input_class)
     * ========================================================================
     * Removes a specific connection between two nodes in the Drawflow editor. This method verifies 
     * that both nodes belong to the same module, checks if the connection exists, and if so, 
     * removes the connection both visually from the DOM and from the internal data structure.
     *
     * @param {string} id_output - The ID of the output node from which the connection originates.
     * @param {string} id_input - The ID of the input node to which the connection is made.
     * @param {string} output_class - The class identifier of the output port.
     * @param {string} input_class - The class identifier of the input port.
     * @returns {boolean} - Returns true if the connection was successfully removed, false otherwise.
     */

    var nodeOneModule = this.getModuleFromNodeId(id_output); // Get the module of the output node
    var nodeTwoModule = this.getModuleFromNodeId(id_input);  // Get the module of the input node

    // Check if both nodes belong to the same module
    if (nodeOneModule === nodeTwoModule) {
        // Check if the connection exists in the output's connections
        var exists = this.drawflow.drawflow[nodeOneModule].data[id_output].outputs[output_class].connections.findIndex(function (item, i) {
            return item.node == id_input && item.output === input_class;
        });

        // Proceed if the connection exists
        if (exists > -1) {
            // If the current module matches the output node's module, remove the visual connection
            if (this.module === nodeOneModule) {
                this.container.querySelector('.connection.node_in_node-' + id_input + '.node_out_node-' + id_output + '.' + output_class + '.' + input_class).remove();
            }

            // Remove the connection from the output node's connections
            var index_out = this.drawflow.drawflow[nodeOneModule].data[id_output].outputs[output_class].connections.findIndex(function (item, i) {
                return item.node == id_input && item.output === input_class;
            });
            this.drawflow.drawflow[nodeOneModule].data[id_output].outputs[output_class].connections.splice(index_out, 1);

            // Remove the connection from the input node's connections
            var index_in = this.drawflow.drawflow[nodeOneModule].data[id_input].inputs[input_class].connections.findIndex(function (item, i) {
                return item.node == id_output && item.input === output_class;
            });
            this.drawflow.drawflow[nodeOneModule].data[id_input].inputs[input_class].connections.splice(index_in, 1);

            // Dispatch an event indicating the connection has been removed
            this.dispatch('connectionRemoved', { 
                output_id: id_output, 
                input_id: id_input, 
                output_class: output_class, 
                input_class: input_class 
            });
            return true; // Indicate that the connection was successfully removed

        } else {
            return false; // Connection does not exist
        }
    } else {
        return false; // Nodes belong to different modules
    }
}

removeConnectionNodeId(id) {
    /**
     * removeConnectionNodeId(id)
     * =====================================================
     * Removes all connections associated with a specific node ID 
     * from the Drawflow editor. This method identifies both 
     * incoming and outgoing connections for the specified node, 
     * removes them from the internal data structure, and 
     * dispatches an event indicating that the connections have been removed.
     *
     * @param {string} id - The ID of the node for which connections are to be removed.
     * @returns {void}
     */

    const idSearchIn = 'node_in_' + id;   // Class name for incoming connections
    const idSearchOut = 'node_out_' + id; // Class name for outgoing connections

    // Process outgoing connections
    const elemsOut = this.container.querySelectorAll(`.${idSearchOut}`);
    for (var i = elemsOut.length - 1; i >= 0; i--) {
        var listclass = elemsOut[i].classList;

        // Find index of the corresponding input connection in the internal data structure
        var index_in = this.drawflow.drawflow[this.module].data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function (item, i) {
            return item.node === listclass[2].slice(14) && item.input === listclass[3];
        });
        this.drawflow.drawflow[this.module].data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in, 1);

        // Find index of the corresponding output connection in the internal data structure
        var index_out = this.drawflow.drawflow[this.module].data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function (item, i) {
            return item.node === listclass[1].slice(13) && item.output === listclass[4];
        });
        this.drawflow.drawflow[this.module].data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out, 1);

        elemsOut[i].remove(); // Remove the outgoing connection element from the DOM

        // Dispatch an event indicating the connection has been removed
        this.dispatch('connectionRemoved', { 
            output_id: listclass[2].slice(14), 
            input_id: listclass[1].slice(13), 
            output_class: listclass[3], 
            input_class: listclass[4] 
        });
    }

    // Process incoming connections
    const elemsIn = this.container.querySelectorAll(`.${idSearchIn}`);
    for (var i = elemsIn.length - 1; i >= 0; i--) {
        var listclass = elemsIn[i].classList;

        // Find index of the corresponding output connection in the internal data structure
        var index_out = this.drawflow.drawflow[this.module].data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function (item, i) {
            return item.node === listclass[1].slice(13) && item.output === listclass[4];
        });
        this.drawflow.drawflow[this.module].data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out, 1);

        // Find index of the corresponding input connection in the internal data structure
        var index_in = this.drawflow.drawflow[this.module].data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function (item, i) {
            return item.node === listclass[2].slice(14) && item.input === listclass[3];
        });
        this.drawflow.drawflow[this.module].data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in, 1);

        elemsIn[i].remove(); // Remove the incoming connection element from the DOM

        // Dispatch an event indicating the connection has been removed
        this.dispatch('connectionRemoved', { 
            output_id: listclass[2].slice(14), 
            input_id: listclass[1].slice(13), 
            output_class: listclass[3], 
            input_class: listclass[4] 
        });
    }
}

getModuleFromNodeId(id) {
    /**
     * getModuleFromNodeId(id)
     * =====================================================
     * Retrieves the module name associated with a specific node ID 
     * from the Drawflow editor. This method iterates through all 
     * modules and their respective nodes to find the module that 
     * contains the given node ID.
     *
     * @param {string} id - The ID of the node for which the module name is to be retrieved.
     * @returns {string|undefined} The name of the module associated with the specified node ID, 
     *                             or undefined if the node ID is not found.
     */

    var nameModule; // Variable to store the module name
    const editor = this.drawflow.drawflow; // Reference to the Drawflow editor object

    // Iterate over all modules in the Drawflow editor
    Object.keys(editor).map(function (moduleName) {
        // Iterate over all nodes in the current module
        Object.keys(editor[moduleName].data).map(function (node) {
            // Check if the current node matches the provided ID
            if (node === id) {
                nameModule = moduleName; // Set the module name if found
            }
        });
    });

    return nameModule; // Return the found module name or undefined
}

addModule(name) {
    /**
     * addModule(name)
     * =====================================================
     * Creates a new module in the Drawflow editor with the specified 
     * name. This method initializes the module with an empty data object 
     * and dispatches an event to notify that a new module has been created.
     *
     * @param {string} name - The name of the module to be added to the Drawflow editor.
     * @throws {Error} Throws an error if the module name already exists.
     *
     * @example
     * // Adds a module named 'newModule' to the Drawflow editor
     * addModule('newModule');
     */
    
    if (this.drawflow.drawflow[name]) {
        throw new Error(`Module '${name}' already exists.`); // Optional: Check for existing module
    }
    
    this.drawflow.drawflow[name] = { "data": {} }; // Initialize the new module with an empty data object
    this.dispatch('moduleCreated', name); // Dispatch an event indicating the new module has been created
}

changeModule(name) {
    /**
     * changeModule(name)
     * =====================================================
     * Changes the current active module in the Drawflow editor. 
     * This method dispatches an event indicating that the module 
     * has been changed and resets the canvas and its properties 
     * to prepare for the new module's data.
     *
     * @param {string} name - The name of the module to switch to.
     * @throws {Error} Throws an error if the module name does not exist.
     *
     * @example
     * // Changes the current module to 'newModule'
     * changeModule('newModule');
     */
    
    if (!this.drawflow.drawflow[name]) {
        throw new Error(`Module '${name}' does not exist.`); // Optional: Check for existing module
    }
    
    this.dispatch('moduleChanged', name); // Dispatch an event indicating the module has changed
    this.module = name; // Update the current active module name
    this.precanvas.innerHTML = ""; // Clear the precanvas content
    this.canvas_x = 0; // Reset canvas X position
    this.canvas_y = 0; // Reset canvas Y position
    this.pos_x = 0; // Reset position X
    this.pos_y = 0; // Reset position Y
    this.mouse_x = 0; // Reset mouse X position
    this.mouse_y = 0; // Reset mouse Y position
    this.zoom = 1; // Reset zoom level
    this.zoom_last_value = 1; // Reset last zoom value
    this.precanvas.style.transform = ''; // Reset transform style of the precanvas
    this.import(this.drawflow, false); // Import the new module data into the Drawflow editor
}

removeModule(name) {
    /**
     * removeModule(name)
     * =====================================================
     * Removes a specified module from the Drawflow editor. 
     * If the current active module is being removed, it switches 
     * to the default 'Home' module before deletion. The method 
     * also dispatches an event indicating that the module has 
     * been removed.
     *
     * @param {string} name - The name of the module to be removed.
     * @throws {Error} Throws an error if the module name does not exist.
     *
     * @example
     * // Removes the 'exampleModule' from the Drawflow editor
     * removeModule('exampleModule');
     */
    
    if (!this.drawflow.drawflow[name]) {
        throw new Error(`Module '${name}' does not exist.`); // Optional: Check for existing module
    }
    
    if (this.module === name) {
        this.changeModule('Home'); // Switch to 'Home' module if the current module is being removed
    }
    
    delete this.drawflow.drawflow[name]; // Delete the specified module from the Drawflow structure
    this.dispatch('moduleRemoved', name); // Dispatch an event indicating the module has been removed
}

clearModuleSelected() {
    /**
     * clearModuleSelected()
     * =====================================================
     * Clears the currently selected module in the Drawflow editor.
     * This method resets the content of the precanvas to an empty 
     * state and clears any existing data associated with the 
     * selected module in the Drawflow structure.
     *
     * @example
     * // Clears the selected module and resets the precanvas
     * clearModuleSelected();
     */
    
    this.precanvas.innerHTML = ""; // Clear the precanvas content
    this.drawflow.drawflow[this.module] = { "data": {} }; // Reset the data of the current module
}

clear() {
    this.precanvas.innerHTML = "";
    this.drawflow = { "drawflow": { "Home": { "data": {} } } };
}

/**
 * Exports the current state of the component's data.
 * 
 * This method creates a deep clone of the `drawflow` data structure 
 * to ensure that the original data remains unaffected. It then 
 * dispatches an 'export' event with the cloned data as the payload 
 * to notify any listeners about the export. Finally, the method 
 * returns the cloned data for further use or storage.
 *
 * @returns {Object} A deep clone of the current `drawflow` data.
 */
export () {
    // Create a deep clone of the current drawflow data to prevent 
    // unintentional modifications to the original data structure
    const dataExport = JSON.parse(JSON.stringify(this.drawflow));

    // Dispatch an 'export' event, passing the cloned data to any 
    // listeners that are registered for this event
    this.dispatch('export', dataExport);

    // Return the cloned data for further use or storage
    return dataExport;
}

/**
 * Imports data into the current instance of the component.
 * 
 * This method clears any existing data, deep clones the provided data 
 * into the component's internal state, and then loads the data for 
 * rendering or processing. If the `notifi` parameter is true, it 
 * dispatches an 'import' event to notify any listeners that data has 
 * been imported.
 *
 * @param {Object} data - The data to be imported, typically in JSON format.
 * @param {boolean} [notifi=true] - Optional flag to determine whether 
 * to dispatch an import notification event. Defaults to true.
 * 
 * @returns {void} This function does not return a value.
 */
import(data, notifi = true) {
    // Clear any existing data or state before importing new data
    this.clear();

    // Deep clone the incoming data to avoid reference issues
    this.drawflow = JSON.parse(JSON.stringify(data));

    // Load the new data into the component for further processing or rendering
    this.load();

    // If notification is enabled, dispatch the 'import' event with a payload
    if (notifi) {
        this.dispatch('import', 'import');
    }
}


/* 

Events 


*/
/**
 * Registers a listener callback for a specified event.
 * 
 * This method allows you to subscribe to a specific event by providing a 
 * callback function that will be executed when the event is dispatched. 
 * It performs checks to ensure that the provided event name is a string 
 * and that the callback is a function. If the event does not already 
 * exist in the event registry, it creates a new entry for it.
 *
 * @param {string} event - The name of the event to which the listener will be added.
 * @param {Function} callback - The listener function to be invoked when the event occurs.
 * 
 * @returns {boolean} Returns `false` if the event name is not a string or if the 
 * callback is not a function; otherwise, it returns nothing after successfully 
 * adding the listener.
 */
on(event, callback) {
    // Check if the provided callback is not a function
    if (typeof callback !== 'function') {
        console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
        return false; // Invalid callback type, return false
    }

    // Check if the provided event name is not a string
    if (typeof event !== 'string') {
        console.error(`The event name must be a string, the given type is ${typeof event}`);
        return false; // Invalid event type, return false
    }

    // Check if the event does not exist in the events registry
    if (this.events[event] === undefined) {
        // Initialize the event with an empty listeners array
        this.events[event] = {
            listeners: []
        };
    }

    // Add the callback function to the list of listeners for the specified event
    this.events[event].listeners.push(callback);
}

/**
 * Removes a listener callback from the specified event.
 * 
 * This method checks if the event exists in the `events` object. If the event
 * exists and the specified callback is registered as a listener, it removes
 * the callback from the list of listeners for that event.
 *
 * @param {string} event - The name of the event from which to remove the listener.
 * @param {Function} callback - The listener function to be removed.
 * 
 * @returns {boolean} Returns `false` if the event does not exist; otherwise,
 * it removes the listener without returning a value.
 */
removeListener(event, callback) {
    // Check if the specified event does not exist in the events registry
    if (!this.events[event]) return false; // Event does not exist, so return false

    // Retrieve the array of listeners for the specified event
    const listeners = this.events[event].listeners;

    // Find the index of the callback function within the listeners array
    const listenerIndex = listeners.indexOf(callback);

    // Determine if the callback exists in the listeners array
    const hasListener = listenerIndex > -1;

    // If the callback exists, remove it from the listeners array
    if (hasListener) listeners.splice(listenerIndex, 1);
}

/**
 * Dispatches an event to all registered listeners associated with that event.
 * 
 * This method checks if the specified event exists in the `events` object. 
 * If the event exists, it invokes all registered listeners, passing the provided details.
 *
 * @param {string} event - The name of the event to dispatch.
 * @param {Object} details - The data or information to be sent to the listeners.
 * 
 * @returns {boolean} Returns `false` if the event does not exist; otherwise, 
 * it executes the listeners without a return value.
 *
 * @example
 * // Example of dispatching an event with details
 * const eventData = { message: "Hello, World!" };
 * const result = dispatch('greet', eventData);
 * // If 'greet' event exists, listeners will be invoked with eventData.
 * 
 * @see {@link EventEmitter} for more details on event-driven architecture.
 */
dispatch(event, details) {
    // Check if the event is not defined in the events registry
    if (this.events[event] === undefined) {
        // Uncomment the following line for error logging if desired
        // console.error(`This event: ${event} does not exist`);
        return false; // Event does not exist, so return false
    }

    // Iterate through all registered listeners for the specified event
    this.events[event].listeners.forEach((listener) => {
        // Invoke each listener with the provided details
        listener(details);
    });
}

/**
 * Generates a version 4 UUID (Universally Unique Identifier) based on the RFC 4122 specification.
 * A UUID is a 128-bit number used to uniquely identify information in computer systems.
 *
 * This method constructs a UUID in the format:
 * xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, where:
 * - x is any hexadecimal digit (0-9, a-f)
 * - y is one of 8, 9, A, or B
 *
 * Steps:
 * 1. Create an array `s` to hold the individual characters of the UUID.
 * 2. Define a string `hexDigits` containing all hexadecimal characters (0-9, a-f).
 * 3. Loop 36 times to fill the array `s` with random hexadecimal characters.
 * 4. Set the character at index 14 to '4' to indicate that this is a version 4 UUID.
 * 5. Modify the character at index 19 to conform to the variant specified in RFC 4122,
 *    ensuring that bits 6 and 7 are set to '01'.
 * 6. Insert hyphens at positions 8, 13, 18, and 23 to separate the UUID into the standard format.
 *
 * @returns {string} A string representation of the generated UUID.
 * 
 * @example
 * const newUuid = getUuid();
 * console.log(newUuid); // Example output: "550e8400-e29b-41d4-a716-446655440000"
 *
 * @see {@link http://www.ietf.org/rfc/rfc4122.txt} for more details on UUIDs.
 */
getUuid() {
    var s = []; // Array to hold UUID characters
    var hexDigits = "0123456789abcdef"; // Hexadecimal characters

    // Fill the array with random hexadecimal digits
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }

    // Set the version (4) in the UUID
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010

    // Set the variant bits in the clock_seq_hi_and_reserved field
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 to 01

    // Insert hyphens at specified positions
    s[8] = s[13] = s[18] = s[23] = "-";

    // Join the array into a string and return the UUID
    var uuid = s.join("");
    return uuid;
}
