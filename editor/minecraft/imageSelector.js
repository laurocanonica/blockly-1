Blockly.FieldImageDropdown = class extends Blockly.FieldDropdown {
  /**
   * @param {Array|Function} menuGenerator Array of dropdown options or function that generates them.
   * @param {Function=} opt_validator Optional validator function.
   */
  constructor(menuGenerator, opt_validator) {
    super(menuGenerator, opt_validator);
    this.menuGenerator_ = menuGenerator;
  }

  /**
   * Validates the input value against the dropdown options.
   * @param {string} newValue The new value to validate.
   * @returns {string|null} The validated value, or null if invalid.
   */
  doClassValidation_(newValue) {
    let options = this.menuGenerator_;

    // If options is a function, call it to get the array
    if (typeof options === "function") {
      options = options();
    }

    // Validate that options is an array of arrays
    if (Array.isArray(options)) {
      for (const option of options) {
        if (Array.isArray(option) && option[1] === newValue) {
          return newValue; // Valid value found
        }
      }
    }

    // If no match, return null to indicate invalid value
    return null;
  }

  /**
   * Renders a custom dropdown menu with images.
   */
showEditor_() {
  console.log("showEditor_ triggered");

  const options = typeof this.menuGenerator_ === "function" ? this.menuGenerator_() : this.menuGenerator_;

  // Create dropdown container
  const dropdown = document.createElement("div");
  dropdown.style.position = "absolute";
  dropdown.style.backgroundColor = "white";
  dropdown.style.border = "1px solid gray";
  dropdown.style.zIndex = "1000";
  dropdown.style.padding = "5px";
  dropdown.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
  dropdown.style.cursor = "pointer";

  console.log("Dropdown created");

  // Add options to the dropdown
  options.forEach(([label, imageUrl]) => {
    console.log(`Adding option: ${label}, Image: ${imageUrl}`);

    const optionDiv = document.createElement("div");
    optionDiv.style.display = "flex";
    optionDiv.style.alignItems = "center";
    optionDiv.style.margin = "5px 0";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.style.width = "32px";
    img.style.height = "32px";
    img.style.marginRight = "8px";

    const text = document.createElement("span");
    text.textContent = label;

    optionDiv.appendChild(img);
    optionDiv.appendChild(text);

    // Set value and remove the dropdown when an option is clicked
	optionDiv.addEventListener("click", () => {
	  console.log(`Option clicked: ${label}`);
	  this.setValue(imageUrl); // Set the selected value in the field
	  if (document.body.contains(dropdown)) {
	    document.body.removeChild(dropdown); // Close the dropdown
	  }
	});

    dropdown.appendChild(optionDiv);
  });

  // Add the dropdown to the body
  document.body.appendChild(dropdown);
  console.log("Dropdown added to the body");

  // Position the dropdown near the field
  const boundingBox = this.getSvgRoot().getBoundingClientRect();
  dropdown.style.left = `${boundingBox.left + window.scrollX}px`;
  dropdown.style.top = `${boundingBox.bottom + window.scrollY}px`;
  console.log(`Dropdown positioned at (${dropdown.style.left}, ${dropdown.style.top})`);

  // Prevent closing when clicking inside the dropdown
  dropdown.addEventListener("click", function (e) {
    console.log("Click inside dropdown, stopping propagation");
    e.stopPropagation(); // Prevent click from propagating to the body
  });

  // Function to remove dropdown when clicking outside
  const removeDropdown = (e) => {
  console.log("Body clicked, checking if outside dropdown");
  // Check if the click is outside the dropdown
  if (!dropdown.contains(e.target)) {
    if (document.body.contains(dropdown)) { // Ensure dropdown is in the DOM
      console.log("Click outside detected, removing dropdown");
      document.body.removeChild(dropdown); // Remove the dropdown
    } else {
      console.warn("Dropdown not found in body, skipping removeChild");
    }
    document.body.removeEventListener("click", removeDropdown); // Clean up listener
  } else {
    console.log("Click inside dropdown, not removing dropdown");
  }
};


  // Use setTimeout to delay adding the event listener for clicks outside
  // This ensures the dropdown is fully rendered before we start listening for clicks
  setTimeout(() => {
    document.body.addEventListener("click", removeDropdown);
    console.log("Added body event listener to remove dropdown on outside click");
  }, 0); // Ensure this runs after the current call stack has cleared
}



};
