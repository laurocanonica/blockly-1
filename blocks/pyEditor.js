Blockly.Blocks['python_code_snippet'] = {
  init: function () {
    this.jsonInit({
      "type": "python_code_snippet",
      "message0": Blockly.Msg.MC_cmd_minecraft_python_code + "%1 %2",
      "args0": [
        {
          "type": "field_multilinetext",
          "name": "CODE",
          "text": "# " + Blockly.Msg.MC_cmd_minecraft_python_code
        },
        {
          "type": "input_dummy"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "",
      "helpUrl": ""
    });

    var self = this;
    this.setOnChange(function () {
      if (!self.editorAttached && self.workspace && self.rendered) {
        self.attachEditorListener();
        self.editorAttached = true;
      }
    });
  },

  attachEditorListener: function () {
    var block = this;
    var field = this.getField('CODE');

    field.showEditor_ = function () {
      // Hide default textarea
      var originalTextarea = document.querySelector('.blocklyHtmlInput');
      if (originalTextarea) originalTextarea.style.display = 'none';

      // Get Blockly workspace area
      var workspaceDiv = Blockly.getMainWorkspace().getParentSvg().parentNode;
      var workspaceRect = workspaceDiv.getBoundingClientRect();

      // Create fullscreen overlay over workspace
      var overlay = document.createElement('div');
	  overlay.style.position = 'fixed';
	  overlay.style.left = '0';
	  overlay.style.top = '0';
	  overlay.style.width = '100vw';
	  overlay.style.height = '100vh';
	  overlay.style.zIndex = 10000;
	  overlay.style.backgroundColor = '#ffffff';
	  overlay.style.border = 'none';
	  overlay.style.overflow = 'auto';
	  overlay.style.padding = '0';
	  overlay.style.margin = '0';
      document.body.appendChild(overlay);

      // Load previous scroll/cursor state
      var lastState = field._lastEditorState || {};

      // Create CodeMirror
      var cm = CodeMirror(overlay, {
        value: field.getValue(),
        mode: 'python',
        lineNumbers: false,
        indentUnit: 2,
        autofocus: true,
        theme: 'default',
        extraKeys: {
          "Ctrl-Space": "autocomplete",
          "Ctrl-F": "findPersistent",
          "Ctrl-H": "replace",
          "Esc": function () { closeEditor(); }
        },
        matchBrackets: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
        smartIndent: true,
        indentWithTabs: true
      });

      // Restore scroll + cursor
      if (lastState.cursor) cm.setCursor(lastState.cursor);
      if (lastState.scroll) cm.scrollTo(lastState.scroll.x, lastState.scroll.y);

      // Grammar help tooltips
      var grammarHelp = {
		// --- Position / Camera Control ---
		"movePositionRelative":
		  "🧩 Syntax:\nvm.movePositionRelative(steps, direction)\nExample: vm.movePositionRelative(1, 'UP')\n\nMoves the current position in the specified direction by a number of steps. Directions: FORWARD, BACKWARD, LEFT, RIGHT, UP, DOWN.",
		"movePositionAbsolute":
		  "🧩 Syntax:\nvm.movePositionAbsolute(coordSystem, x_radius, y_theta, z_phi)\nExample: vm.movePositionAbsolute('SPHERICAL', 5, 45, 90)\n\nMoves the current position using polar, spherical, or Cartesian coordinates.",
		"moveToViewTarget":
		  "🧩 Syntax:\nvm.moveToViewTarget()\nExample: vm.moveToViewTarget()\n\nMoves the position to where the player is looking (raycast target).",
		"moveToPlayer":
		  "🧩 Syntax:\nvm.moveToPlayer()\nExample: vm.moveToPlayer()\n\nMoves the position to the player's current location.",
		"resetPosition":
		  "🧩 Syntax:\nvm.resetPosition()\nExample: vm.resetPosition()\n\nResets the position to the initial starting point.",
		"moveToLastMark":
		  "🧩 Syntax:\nvm.moveToLastMark()\nExample: vm.moveToLastMark()\n\nMoves to the last marked position.",
		"moveToNextSolidBlock":
		  "🧩 Syntax:\nvm.moveToNextSolidBlock()\nExample: vm.moveToNextSolidBlock()\n\nMoves forward until a solid block is found.",
		"rotateYawRelative":
		  "🧩 Syntax:\nvm.rotateYawRelative(angle)\nExample: vm.rotateYawRelative(90)\n\nRotates the current view horizontally (yaw) by a relative angle in degrees.",
		"rotateYawAbsolute":
		  "🧩 Syntax:\nvm.rotateYawAbsolute(direction)\nExample: vm.rotateYawAbsolute('E')\n\nSets the absolute yaw direction (PLAYER_YAW, N, S, E, W).",
		"setPitchAbsolute":
		  "🧩 Syntax:\nvm.setPitchAbsolute(angle)\nExample: vm.setPitchAbsolute(30)\n\nSets the vertical pitch to an absolute angle.",
		"setPitchRelative":
		  "🧩 Syntax:\nvm.setPitchRelative(angle)\nExample: vm.setPitchRelative(-15)\n\nRotates the pitch (vertical) by a relative amount.",

		// --- Geometry / Primitives ---
		"createBlock":
		  "🧩 Syntax:\nvm.createBlock(blocks)\nExample: vm.createBlock('minecraft:stone')\n\nPlaces a block or block pattern at the current location.",
		"createRectangle":
		  "🧩 Syntax:\nvm.createRectangle(width, height, filled, blocks)\nExample: vm.createRectangle(5, 3, true, 'minecraft:oak_planks')\n\nCreates a rectangle in the X/Y plane.",
		"createPolygon":
		  "🧩 Syntax:\nvm.createPolygon(sides, radiusX, radiusY, arcAngle, filled, blocks)\nExample: vm.createPolygon(6, 5, 5, 360, true, 'minecraft:glass')\n\nCreates a regular polygon or circular arc.",
		"createStar":
		  "🧩 Syntax:\nvm.createStar(points, innerRadius, outerRadius, filled, blocks)\nExample: vm.createStar(5, 3, 6, false, 'minecraft:gold_block')\n\nCreates a star pattern centered at the current position.",
		"createLine":
		  "🧩 Syntax:\nvm.createLine(length, blocks)\nExample: vm.createLine(10, 'minecraft:cobblestone')\n\nCreates a line extending forward by a specified length.",
		"connectPositions":
		  "🧩 Syntax:\nvm.connectPositions(blocks)\nExample: vm.connectPositions('minecraft:stone_bricks')\n\nConnects previously marked positions with lines.",
		"markPosition":
		  "🧩 Syntax:\nvm.markPosition()\nExample: vm.markPosition()\n\nMarks the current location for later reference.",
		"createText":
		  "🧩 Syntax:\nvm.createText(text, fontSize, filled, blocks)\nExample: vm.createText('Hi', 3, true, 'minecraft:wool')\n\nRenders a string as block-based text.",
		"createDrawing":
		  "🧩 Syntax:\nvm.createDrawing(blockList, blockMaterials, matIndex, origin)\nExample: vm.createDrawing([...], [...], 0, 'CENTER')\n\nCreates a 2D pixel-art drawing using block characters and materials.",
		"createChest":
		  "🧩 Syntax:\nvm.createChest(blocks)\nExample: vm.createChest('minecraft:diamond_block')\n\nCreates a chest containing the specified blocks.",

		// --- Player / Entity Interaction ---
		"giveToPlayer":
		  "🧩 Syntax:\nvm.giveToPlayer(equipMode, blocks)\nExample: vm.giveToPlayer('MAIN_HAND', 'minecraft:iron_sword')\n\nGives a block or item to the player in a chosen equipment slot.",
		"isCurrentBlockOfType":
		  "🧩 Syntax:\nvm.isCurrentBlockOfType(blocks)\nExample: vm.isCurrentBlockOfType('minecraft:gold_block')\n\nChecks if the current block matches the specified block types.",
		"isPlayerHolding":
		  "🧩 Syntax:\nvm.isPlayerHolding(blocks)\nExample: vm.isPlayerHolding('minecraft:torch')\n\nChecks if the player is holding a block of the given type.",
		"hasPlayerItem":
		  "🧩 Syntax:\nvm.hasPlayerItem(blocks)\nExample: vm.hasPlayerItem('minecraft:stick')\n\nChecks if the player has a block or item of the given type in inventory.",
		"isPlayerInteractingWith":
		  "🧩 Syntax:\nvm.isPlayerInteractingWith(blocks)\nExample: vm.isPlayerInteractingWith('minecraft:door')\n\nChecks if the player is hitting or interacting with a specified block type.",

		// --- Events / Logic ---
		"onEvent":
		  "🧩 Syntax:\nvm.onEvent(eventType, functionToCall)\nExample: vm.onEvent('blockBreak', 'onBreak')\n\nRegisters a function callback for a given game event.",
		"clearEvents":
		  "🧩 Syntax:\nvm.clearEvents()\nExample: vm.clearEvents()\n\nCancels all registered event callbacks.",
		"callFunction":
		  "🧩 Syntax:\nvm.callFunction(functionName, playerName, param1)\nExample: vm.callFunction('greet', 'Steve', 'hello')\n\nCalls a function in the scripting engine with parameters."
      };

      // Tooltip setup
      var tooltip = document.createElement('div');
      tooltip.style.position = 'absolute';
      tooltip.style.background = 'rgba(50,50,50,0.9)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '5px 8px';
      tooltip.style.borderRadius = '4px';
      tooltip.style.fontSize = '12px';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.zIndex = 20001;
      tooltip.style.display = 'none';
      tooltip.style.whiteSpace = 'pre-line';
      document.body.appendChild(tooltip);

      cm.getWrapperElement().addEventListener('mousemove', function (e) {
        var rect = cm.getWrapperElement().getBoundingClientRect();
        var pos = cm.coordsChar({ left: e.clientX, top: e.clientY });
        var token = cm.getTokenAt(pos);
        var word = token.string;

        if (grammarHelp[word]) {
          tooltip.innerHTML = grammarHelp[word];
          tooltip.style.left = (e.pageX + 10) + 'px';
          tooltip.style.top = (e.pageY + 10) + 'px';
          tooltip.style.display = 'block';
        } else {
          tooltip.style.display = 'none';
        }
      });

      cm.getWrapperElement().addEventListener('mouseleave', function () {
        tooltip.style.display = 'none';
      });

      // Custom autocomplete
      function myPythonHints(cm) {
        var cur = cm.getCursor();
        var token = cm.getTokenAt(cur);
        var start = token.start;
        var end = cur.ch;
        var line = cm.getLine(cur.line);
        var word = '';
        var i = end - 1;
        while (i >= 0 && /[a-zA-Z0-9_.]/.test(line.charAt(i))) {
          word = line.charAt(i) + word;
          i--;
        }
        start = i + 1;

		// Your custom keyword list
		var list_python = [
		  "print", "len", "range", "def", "class", "import", "for", "while",
		  "return", "if", "elif", "else", "try", "except", "with", "as",
		  "from", "True", "False", "None"		  
		];
		var materials = getMaterials().map(function(item) {
		  return item[1];
		});
		var entities = getEntities().map(function(item) {
		  return item[1];
		});
		var items = getItems().map(function(item) {
		  return item[1];
		});
        var visualmodderFunctions = [
				  "vm.movePositionRelative",
				  "vm.movePositionAbsolute",
				  "vm.moveToViewTarget",
				  "vm.moveToPlayer",
				  "vm.resetPosition",
				  "vm.moveToLastMark",
				  "vm.moveToNextSolidBlock",
				  "vm.rotateYawRelative",
				  "vm.rotateYawAbsolute",
				  "vm.setPitchAbsolute",
				  "vm.setPitchRelative",
				  "vm.createBlock",
				  "vm.createRectangle",
				  "vm.createRectangle(4, 4, False, [\"b.grass_block\"]);",
				  "vm.createRectangle(10, 10, True, [\"b.gold_block\"]);",
				  "vm.createPolygon",
				  "vm.createStar",
				  "vm.createLine",
				  "vm.connectPositions",
				  "vm.markPosition",
				  "vm.createText",
				  "vm.createDrawing",
				  "vm.createChest",
				  "vm.giveToPlayer",
				  "vm.isCurrentBlockOfType",
				  "vm.isPlayerHolding",
				  "vm.hasPlayerItem",
				  "vm.isPlayerInteractingWith",
				  "vm.onEvent",
				  "vm.clearEvents",
				  "vm.callFunction"
			];

			var list=list_python.concat(materials.concat(entities.concat(items.concat(visualmodderFunctions))));
			var filtered = [];
			 for (var j = 0; j < list.length; j++) {
			   if (list[j].indexOf(word) === 0) {
			     filtered.push(list[j]);
			   }
			 }

			 var hints = [];
			 for (var k = 0; k < filtered.length; k++) {
			   (function (hintText) {
			     hints.push({
			       text: hintText,
			       displayText: hintText,
			       render: function (el, self, data) {
			         el.textContent = data.displayText;
			         if (data.displayText.indexOf('(') !== -1) {
			           el.style.color = 'green';
			           el.style.paddingLeft = '20px';
			         } else {
			           el.style.color = '#000';
			           el.style.fontWeight = 'bold';
			         }
			       }
			     });
			   })(filtered[k]);
			 }

        return {
          list: hints,
          from: CodeMirror.Pos(cur.line, start),
          to: CodeMirror.Pos(cur.line, end)
        };
      }

      cm.on("inputRead", function (cm, change) {
        if (change.text[0] && /[a-zA-Z_.]/.test(change.text[0])) {
          cm.showHint({ hint: myPythonHints, completeSingle: false, container: document.body });
        }
      });

      // Auto resize to workspace
	  function resizeCM() {
	    cm.setSize(window.innerWidth + 'px', window.innerHeight + 'px');
	    cm.refresh();
	  }

	  window.addEventListener('resize', resizeCM);
	  resizeCM();
	  
      // Save state on move
	  // Save position on close
	  function saveEditorState() {
	    var pos = cm.getCursor();
	    var scrollInfo = cm.getScrollInfo();
	    field._lastCursor = pos;
	    field._lastScroll = scrollInfo;
	    field.setValue(cm.getValue());
	  }

	  // Restore position on open
	  if (field._lastCursor) {
	    cm.setCursor(field._lastCursor);
	  }
	  if (field._lastScroll) {
	    cm.scrollTo(field._lastScroll.left, field._lastScroll.top);
	  }
	  
	  // Close when pressing ESC
	  window.addEventListener('keydown', function(e) {
	    if (e.key === 'Escape') {
	      closeEditor();
	    }
	  });
	  
	  // 🧹 Close & cleanup
	  function closeEditor(e) {
	      saveEditorState();
	      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
	      document.removeEventListener('mousedown', closeEditor);
	  }


	  // 🧭 Toolbar close button
	  var toolbar = document.createElement('div');
	  toolbar.style.position = 'absolute';
	  toolbar.style.top = '1px';
	  toolbar.style.right = '16px';
	  toolbar.style.zIndex = '10001';

	  var btn = document.createElement('button');
	  btn.textContent = ' X ';
	  btn.style.padding = '4px 8px';
	  btn.style.border = '1px solid #ccc';
	  btn.style.background = '#ff8888';
	  btn.onclick = closeEditor; 
	  toolbar.appendChild(btn);
	  overlay.appendChild(toolbar);
    };
  }
};
