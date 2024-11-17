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
   * Fetch categories and images dynamically from the server
   */
  fetchCategoriesAndImages() {
    return new Promise((resolve, reject) => {
      fetch('/api/images')  // HTTP endpoint that will serve category and image data
        .then(response => response.json())
        .then(data => resolve(data))  // Resolves with the fetched data
        .catch(error => reject(error));  // Reject if there's an error
    });
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
  async showEditor_() {
    console.log("showEditor_ triggered");

    try {
      // Fetch categories and images from the server
      const categoriesAndImages = await this.fetchCategoriesAndImages();
      const categories = categoriesAndImages.categories;
      const imagesByCategory = categoriesAndImages.imagesByCategory;

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

      // Add categories to the dropdown
      categories.forEach(([label, categoryImage]) => {
        console.log(`Adding category: ${label}, Image: ${categoryImage}`);

        const categoryDiv = document.createElement("div");
        categoryDiv.style.display = "flex";
        categoryDiv.style.alignItems = "center";
        categoryDiv.style.margin = "5px 0";

        const img = document.createElement("img");
        img.src = categoryImage;
        img.style.width = "32px";
        img.style.height = "32px";
        img.style.marginRight = "8px";

        const text = document.createElement("span");
        text.textContent = label;

        categoryDiv.appendChild(img);
        categoryDiv.appendChild(text);

        // Set value and remove the dropdown when a category is clicked
        categoryDiv.addEventListener("click", () => {
          console.log(`Category clicked: ${label}`);
          this.setValue(categoryImage); // Set the selected category
          this.updateImages(imagesByCategory[categoryImage]); // Update images based on category
          if (document.body.contains(dropdown)) {
            document.body.removeChild(dropdown); // Close the dropdown
          }
        });

        dropdown.appendChild(categoryDiv);
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
        if (!dropdown.contains(e.target)) {
          if (document.body.contains(dropdown)) {
            console.log("Click outside detected, removing dropdown");
            document.body.removeChild(dropdown); // Remove the dropdown
          }
          document.body.removeEventListener("click", removeDropdown); // Clean up listener
        }
      };

      setTimeout(() => {
        document.body.addEventListener("click", removeDropdown);
        console.log("Added body event listener to remove dropdown on outside click");
      }, 0);

    } catch (error) {
      console.error("Error fetching categories and images:", error);
    }
  }

  /**
   * Updates the images based on the selected category
   */
  updateImages(images) {
    // Logic to update images dropdown based on selected category
    console.log("Updating images based on selected category:", images);
    // Here, you would need to re-render the images dropdown with the new images.
  }
};
