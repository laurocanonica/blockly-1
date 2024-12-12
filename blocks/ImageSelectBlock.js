(function(global) {
  function SharedBlockCache() {
    this.data = {
      categories: [],
      imagesByCategory: []
    };
    this.isLoading = false;
    this.hasLoaded = false;
  }

  SharedBlockCache.prototype.loadData = function(callback) {
    var self = this;
    if (self.hasLoaded) {
      if (callback) callback();
      return;
    }

    if (self.isLoading) {
      var interval = setInterval(function() {
        if (self.hasLoaded) {
          clearInterval(interval);
          if (callback) callback();
        }
      }, 100);
      return;
    }

    self.isLoading = true;
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/IMG", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          var response = JSON.parse(xhr.responseText);
          self.data.categories = response.categories || [];
          self.data.imagesByCategory = response.imagesByCategory || [];
          self.hasLoaded = true;
          self.isLoading = false;

          if (callback) callback();
        } catch (e) {
          console.error("Failed to parse service response:", e);
          self.isLoading = false;
        }
      }
    };

    xhr.send();
  };

  function ImageSelectBlock() {
    this.sharedCache = new SharedBlockCache();
  }

  ImageSelectBlock.prototype.ensureDataLoaded = function(callback) {
    this.sharedCache.loadData(callback);
  };

  ImageSelectBlock.prototype.getFirstMenuOptions = function() {
    var cache = this.sharedCache;
    if (!cache.hasLoaded) {
      return [["Loading...", "LOADING"]];
    }
    return cache.data.categories.map(function(category, index) {
      return [category, String(index)];
    });
  };

  ImageSelectBlock.prototype.getSecondMenuOptions = function(block) {
    var cache = this.sharedCache;
    if (!cache.hasLoaded) {
      return [["No options available", "NONE"]];
    }
    var firstMenuValue = block.getFieldValue("FIRST_MENU");
    if (!firstMenuValue || firstMenuValue === "LOADING") {
      return [["No options available", "NONE"]];
    }

    var index = parseInt(firstMenuValue, 10);
	var firstMenuField = block.getField('FIRST_MENU');
	var firstMenuOption=firstMenuField.getOptions()[index];
    var images = cache.data.imagesByCategory[index] || [];
    return images.map(function(image) {
      return [image, firstMenuOption[0]+'/'+image];
    });
  };

  ImageSelectBlock.prototype.handleMenuInteraction = function(block, event) {
    if (event && event.type === Blockly.Events.BLOCK_CHANGE && event.blockId === block.id) {
      var firstMenuValue = block.getFieldValue("FIRST_MENU");
      var secondMenuField = block.getField("SECOND_MENU");
      var newOptions = this.getSecondMenuOptions(block);
      var currentValue = secondMenuField.getValue();

      secondMenuField.menuGenerator_ = newOptions;

      var validOptionValues = newOptions.map(function(option) {
        return option[1];
      });
      if (validOptionValues.indexOf(currentValue) === -1) {
        secondMenuField.setValue(newOptions[0][1]);
      }
    }
  };

  global.ImageSelectBlock = ImageSelectBlock;
})(window);
