var subWorkspace;
var container;

(function() {
    console.log("Initializing Blockly...");

    var initializesubWorkspace = function(blockXmlText) {
        container = document.getElementById("blockly-container");
        if (!container) {
            console.error("Blockly container not found.");
            return;
        }

        // Initialize Blockly subWorkspace with the correct container
        subWorkspace = Blockly.inject(container, {
            toolbox: null, // No toolbox is needed as the XML is provided directly
            trashcan: true,
            move: {
                scrollbars: true,
                drag: true,
                wheel: true
            }
        });

        console.log("Blockly subWorkspace initialized.");

        try {
            // Parse the XML string into a DOM object
            var xmlDom = Blockly.Xml.textToDom(blockXmlText);
            // Load the block into the subWorkspace
            Blockly.Xml.domToWorkspace(xmlDom, subWorkspace);
            //subWorkspace.scrollCenter();
            subWorkspace.setScale(1); // Adjust scale for better visibility
            console.log("Block loaded into subWorkspace.");
        } catch (e) {
            console.error("Error loading block into subWorkspace:", e);
        }
    };

    // Wait for the document to fully load before initializing Blockly
    if (document.readyState === "complete") {
        var blockXmlText = window.blockXmlText || "";  // Get the block XML text from the global variable
        initializesubWorkspace(blockXmlText);
		screenshot();
    } else {
        window.addEventListener("load", function() {
            var blockXmlText = window.blockXmlText || "";  // Get the block XML text from the global variable
            initializesubWorkspace(blockXmlText);
			screenshot();
        });
    }
})();
function screenshot(){

setTimeout(function () {
        console.log('Starting screenshot capture.');
        var bbox = subWorkspace.getBlocksBoundingBox();
        // Adjust bounding box for padding
        bbox.left = 0;
        bbox.top = 0;
        bbox.width = bbox.right;
        bbox.height = bbox.bottom;

        // Use html2canvas to capture the subWorkspace
        html2canvas(container, {
            x: bbox.left,
            y: bbox.top,
            width: bbox.width,
            height: bbox.height
        }).then(function (canvas) {
            console.log('Screenshot captured.');

            // Convert canvas to PNG Blob
            canvas.toBlob(function (blob) {
                if (blob) {
                    var pngUrl = URL.createObjectURL(blob);
                    var downloadLink = document.createElement('a');
                    downloadLink.href = pngUrl;
                    downloadLink.download = 'block_screenshot.png';
                    downloadLink.click();
                    URL.revokeObjectURL(pngUrl);
                    console.log('PNG downloaded.');
                } else {
                    console.error('Failed to create PNG blob.');
                }
            }, 'image/png');
        }).catch(function (error) {
            console.error('Failed to capture screenshot:', error);
        });
    }, 1000);
}

