function FieldUnicodeGrid(symbolGrid) {
  // Flatten grid into dropdown-compatible options
  var flatOptions = [];
  for (var i = 0; i < symbolGrid.length; i++) {
    for (var j = 0; j < symbolGrid[i].length; j++) {
      flatOptions.push([symbolGrid[i][j], symbolGrid[i][j]]);
    }
  }
  Blockly.FieldDropdown.call(this, flatOptions);
  this.symbolGrid_ = symbolGrid;
}
FieldUnicodeGrid.prototype = Object.create(Blockly.FieldDropdown.prototype);
FieldUnicodeGrid.prototype.constructor = FieldUnicodeGrid;

FieldUnicodeGrid.prototype.showEditor_ = function() {
  Blockly.FieldDropdown.prototype.showEditor_.call(this);
  var self = this;
  setTimeout(function() {
    var menu = document.querySelector('.blocklyMenu');
    if (!menu) return;
    menu.innerHTML = ''; // Clear default list

    for (var i = 0; i < self.symbolGrid_.length; i++) {
      var rowDiv = document.createElement('div');
      rowDiv.style.display = 'flex';
      rowDiv.style.margin = '2px 0';

      for (var j = 0; j < self.symbolGrid_[i].length; j++) {
        (function(symbol) {
          var item = document.createElement('div');
          item.textContent = symbol;
          item.style.padding = '2px 2px';
          item.style.fontSize = '48px';
          item.style.cursor = 'pointer';
          item.style.border = '1px solid #ccc';
          item.style.marginRight = '4px';
          item.style.borderRadius = '4px';

          item.onclick = function() {
            self.setValue(symbol);
            Blockly.DropDownDiv.hideIfOwner(self);
          };

          rowDiv.appendChild(item);
        })(self.symbolGrid_[i][j]);
      }
      menu.appendChild(rowDiv);
    }
  }, 1);
};
