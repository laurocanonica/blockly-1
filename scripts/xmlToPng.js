(function() {
    console.log("Initializing Blockly...");

    var initializeWorkspace = function(blockXmlText) {
        var container = document.getElementById("blockly-container");
        if (!container) {
            console.error("Blockly container not found.");
            return;
        }

        // Initialize Blockly workspace with the correct container
        var workspace = Blockly.inject(container, {
            toolbox: null, // No toolbox is needed as the XML is provided directly
            trashcan: true,
            move: {
                scrollbars: true,
                drag: true,
                wheel: true
            }
        });

        console.log("Blockly workspace initialized.");

        try {
            // Parse the XML string into a DOM object
            var xmlDom = Blockly.Xml.textToDom(blockXmlText);
            // Load the block into the workspace
            Blockly.Xml.domToWorkspace(xmlDom, workspace);
            workspace.scrollCenter();
            workspace.setScale(1); // Adjust scale for better visibility
            console.log("Block loaded into workspace.");
        } catch (e) {
            console.error("Error loading block into workspace:", e);
        }
    };

    // Wait for the document to fully load before initializing Blockly
    if (document.readyState === "complete") {
        var blockXmlText = window.blockXmlText || "";  // Get the block XML text from the global variable
        initializeWorkspace(blockXmlText);
    } else {
        window.addEventListener("load", function() {
            var blockXmlText = window.blockXmlText || "";  // Get the block XML text from the global variable
            initializeWorkspace(blockXmlText);
        });
    }
})();
