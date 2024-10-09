import { css, LitElement, html } from 'lit-element';
import { style } from '../dist/drawflow.style';
import '../dist/drawflow.min';

/**
 * `DrawflowElement` is a custom web component that integrates the Drawflow library.
 * It provides a visual interface for creating and managing flow diagrams.
 *
 * @extends LitElement
 */
class DrawflowElement extends LitElement {
  /**
   * Styles for the DrawflowElement.
   * Combines imported styles with component-specific styles.
   *
   * @returns {Array} An array of styles for the component.
   */
  static get styles() {
    return [
      style,
      css`
        #drawflow {
          display: block;      // Makes the drawflow container a block-level element
          position: relative;  // Allows for absolute positioning of child elements
          width: 100%;        // Full width of the parent container
          height: 800px;      // Fixed height for the drawflow area
        }
      `
    ];
  }

  /**
   * Renders the HTML template for the DrawflowElement.
   *
   * @returns {TemplateResult} The rendered HTML template.
   */
  render() {
    return html`
      <div id="drawflow"></div>  // Container for the Drawflow editor
    `;
  }

  /**
   * Lifecycle method called after the element is first updated.
   * Initializes the Drawflow editor and adds default nodes and connections.
   */
  firstUpdated() {
    const container = this.shadowRoot?.getElementById('drawflow'); // Get the drawflow container
    const editor = new Drawflow(container); // Initialize the Drawflow editor

    editor.reroute = true; // Enable rerouting of connections
    editor.reroute_fix_curvature = true; // Enable fixing of curvature when rerouting

    editor.start(); // Start the Drawflow editor

    const data = {
      name: '' // Placeholder for node data
    };

    // Add nodes to the Drawflow editor
    editor.addNode('foo', 1, 1, 100, 200, 'foo', data, 'Foo'); // Node with id 'foo'
    editor.addNode('bar', 1, 1, 400, 100, 'bar', data, 'Bar A'); // Node with id 'bar'
    editor.addNode('bar', 1, 1, 400, 300, 'bar', data, 'Bar B'); // Another node with id 'bar'

    // Establish connections between nodes
    editor.addConnection(1, 2, "output_1", "input_1"); // Connect output_1 of node 1 to input_1 of node 2
    editor.addConnection(1, 3, "output_1", "input_1"); // Connect output_1 of node 1 to input_1 of node 3
  }
}

// Define the custom element 'drawflow-element' using the DrawflowElement class
customElements.define("drawflow-element", DrawflowElement);
