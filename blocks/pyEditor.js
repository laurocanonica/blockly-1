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
      var svgRoot = this.getSvgRoot();
      var fieldRect = svgRoot.getBoundingClientRect();

      var originalTextarea = document.querySelector('.blocklyHtmlInput');
      if (originalTextarea) {
        originalTextarea.style.display = 'none';
      }
	  var marge=20; // avoid displayng scrollbars in codemirror
      var overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.left = fieldRect.left + window.scrollX + 'px';
      overlay.style.top = fieldRect.top + window.scrollY + 'px';
	  overlay.style.width = fieldRect.width +marge+ 'px';
	  overlay.style.height = fieldRect.height +marge+ 'px';
	  overlay.style.zIndex = 10000;
      overlay.style.backgroundColor = '#fff';
      overlay.style.border = '1px solid #ccc';
      overlay.style.resize = 'both';
      overlay.style.overflow = 'auto';
      overlay.style.minWidth = fieldRect.width +marge+ 'px';
      overlay.style.minHeight = fieldRect.height +marge+ 'px';
      overlay.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      overlay.style.padding = '0';
      overlay.style.boxSizing = 'border-box';
      document.body.appendChild(overlay);

	  // Load previous scroll/cursor state
	  var lastState = field._lastEditorState || {};

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
		    "Ctrl-H": "replace"
		  },
		  autoMatchParens: true,
		  styleActiveLine: true,      
		  matchBrackets: true,        
		  autoCloseBrackets: true,
		  smartIndent: true,
		  indentWithTabs: false

      });

	  // Restore scroll + cursor
	   if (lastState.cursor) cm.setCursor(lastState.cursor);
	   if (lastState.scroll) cm.scrollTo(lastState.scroll.x, lastState.scroll.y);
	  
	  
	  // 🧠 Define grammar / syntax help text
	  var grammarHelp = {

	  "movePositionRelative":
	  "🧩 Syntax:\nvm.movePositionRelative(steps, direction)\n\nMoves the current position relative to the player's orientation.\nsteps: number of blocks to move.\ndirection: one of FORWARD, BACKWARD, LEFT, RIGHT, UP, DOWN.",

	  "movePositionAbsolute":
	  "🧩 Syntax:\nvm.movePositionAbsolute(coordSystem, x, y, z)\n\nMoves the current position using absolute coordinates.\ncoordSystem: CARTESIAN, CYLINDRICAL, or SPHERICAL.\nx: x-value or radius.\ny: y-value or theta.\nz: z-value or phi.",

	  "moveToViewTarget":
	  "🧩 Syntax:\nvm.moveToViewTarget()\n\nMoves the position to the block the player is currently looking at.",

	  "moveToPlayer":
	  "🧩 Syntax:\nvm.moveToPlayer()\n\nMoves the current position to the player's own location.",

	  "resetPosition":
	  "🧩 Syntax:\nvm.resetPosition()\n\nResets the current position to the session's initial starting point.",

	  "moveToLastMark":
	  "🧩 Syntax:\nvm.moveToLastMark()\n\nMoves the cursor to the last saved marker position.",

	  "moveToNextSolidBlock":
	  "🧩 Syntax:\nvm.moveToNextSolidBlock()\n\nMoves forward until a solid (non-air) block is found.",

	  "rotateYawRelative":
	  "🧩 Syntax:\nvm.rotateYawRelative(angle)\n\nRotates the horizontal facing direction by a relative angle.\nangle: degrees to rotate (positive or negative).",

	  "rotateYawAbsolute":
	  "🧩 Syntax:\nvm.rotateYawAbsolute(direction)\n\nSets the yaw to an absolute direction.\ndirection: N, S, E, W, or PLAYER_YAW.",

	  "setPitchAbsolute":
	  "🧩 Syntax:\nvm.setPitchAbsolute(angle)\n\nSets the vertical pitch angle absolutely.\nangle: pitch value in degrees.",

	  "setPitchRelative":
	  "🧩 Syntax:\nvm.setPitchRelative(angle)\n\nChanges the pitch by a relative angle.\nangle: degrees to adjust pitch.",

	  "createBlock":
	  "🧩 Syntax:\nvm.createBlock(blocks)\n\nPlaces a block or patterned block at the current position.\nblocks: a block/material descriptor Value.",

	  "createSquare":
	  "🧩 Syntax:\nvm.createSquare(width, filled, blocks)\n\nCreates a square in the X/Y plane.\nwidth: side length.\nfilled: true for solid, false for outline.\nblocks: material(s) to use.",

	  "createRectangle":
	  "🧩 Syntax:\nvm.createRectangle(width, height, filled, blocks)\n\nCreates a rectangle in the X/Y plane.\nwidth: rectangle width.\nheight: rectangle height.\nfilled: true for solid, false for outline.\nblocks: material(s) to use.",

	  "createPolygon":
	  "🧩 Syntax:\nvm.createPolygon(sides, radiusX, radiusY, arcAngle, filled, blocks)\n\nCreates a regular polygon or arc.\nsides: number of sides for polygon.\nradiusX: horizontal radius.\nradiusY: vertical radius (null for circle).\narcAngle: visible arc angle (0–360).\nfilled: true for solid, false for outline.\nblocks: material(s) to use.",

	  "createArc":
	  "🧩 Syntax:\nvm.createArc(radiusX, radiusY, arcAngle, filled, blocks)\n\nCreates a circular or elliptical arc.\nradiusX: horizontal radius.\nradiusY: vertical radius.\narcAngle: arc angle (0–360).\nfilled: true for solid, false for outline.\nblocks: material(s) to use.",

	  "createEllipse":
	  "🧩 Syntax:\nvm.createEllipse(radiusX, radiusY, filled, blocks)\n\nCreates a complete ellipse.\nradiusX: x-radius.\nradiusY: y-radius.\nfilled: true for solid, false for outline.\nblocks: material(s) to use.",

	  "createCircle":
	  "🧩 Syntax:\nvm.createCircle(radius, filled, blocks)\n\nCreates a perfect circle.\nradius: circle radius.\nfilled: true for solid, false for outline.\nblocks: material(s) to use.",

	  "createStar":
	  "🧩 Syntax:\nvm.createStar(points, innerRadius, outerRadius, filled, blocks)\n\nCreates a star shape.\npoints: number of star points.\ninnerRadius: inner radius.\nouterRadius: outer radius.\nfilled: true for solid, false for outline.\nblocks: material(s) to use.",

	  "createLine":
	  "🧩 Syntax:\nvm.createLine(length, blocks)\n\nCreates a straight line extending forward.\nlength: number of blocks.\nblocks: material(s) to use.",

	  "connectPositions":
	  "🧩 Syntax:\nvm.connectPositions(blocks)\n\nConnects all marked positions with straight lines.\nblocks: material(s) to use.",

	  "markPosition":
	  "🧩 Syntax:\nvm.markPosition()\n\nMarks the current position for later reference.",

	  "createText":
	  "🧩 Syntax:\nvm.createText(text, fontSize, filled, blocks)\n\nRenders text as block-based characters.\ntext: string to draw.\nfontSize: size of rendered characters.\nfilled: true for filled letters, false for outline.\nblocks: material(s) to use.",

	  "createDrawing":
	  "🧩 Syntax:\nvm.createDrawing(blockList, blockMaterials, matIndex, origin)\n\nCreates 2D pixel-art using encoded block lists.\nblockList: encoded pixel rows.\nblockMaterials: material palette.\nmatIndex: material selection.\norigin: origin mode ('CENTER', etc).",

	  "createChest":
	  "🧩 Syntax:\nvm.createChest(blocks)\n\nCreates a chest containing the specified items.\nblocks: item/block list.",

	  "giveToPlayer":
	  "🧩 Syntax:\nvm.giveToPlayer(equipMode, blocks)\n\nGives an item/block to the player.\nequipMode: target equipment slot (MAIN_HAND, OFF_HAND, ARMOR, etc).\nblocks: item/block descriptor.",

	  "isCurrentBlockOfType":
	  "🧩 Syntax:\nvm.isCurrentBlockOfType(blocks)\n\nChecks if the block at the current position matches one of the given types.\nblocks: block(s) to test.\nReturns: true or false.",

	  "isPlayerHolding":
	  "🧩 Syntax:\nvm.isPlayerHolding(blocks)\n\nChecks if the player is currently holding the specified block or item.\nblocks: block(s) to test.\nReturns: true or false.",

	  "hasPlayerItem":
	  "🧩 Syntax:\nvm.hasPlayerItem(blocks)\n\nChecks if the player has the specified material in their inventory.\nblocks: item/block descriptor.\nReturns: true or false.",

	  "isPlayerInteractingWith":
	  "🧩 Syntax:\nvm.isPlayerInteractingWith(blocks)\n\nChecks if the player is interacting with or hitting a given block type.\nblocks: item/block descriptor.\nReturns: true or false.",

	  "onEvent":
	  "🧩 Syntax:\nvm.onEvent(eventType, functionName)\n\nRegisters a callback for a specific event.\neventType: name of event (e.g., 'block_break', 'player_move').\nfunctionName: script function to run on event.",

	  "clearEvents":
	  "🧩 Syntax:\nvm.clearEvents()\n\nRemoves all event callbacks registered for this session.",

	  "callFunction":
	  "🧩 Syntax:\nvm.callFunction(functionName, playerName, param1)\n\nCalls a scripting engine function with parameters.\nfunctionName: name of function.\nplayerName: player executing the call.\nparam1: argument passed to the function."
	  };



	  // Create tooltip element
	  var tooltip = document.createElement('div');
	  tooltip.style.position = 'absolute';
	  tooltip.style.background = 'rgba(50,50,50,0.9)';
	  tooltip.style.color = 'white';
	  tooltip.style.padding = '5px 8px';
	  tooltip.style.borderRadius = '4px';
	  tooltip.style.fontSize = '12px';
	  tooltip.style.pointerEvents = 'none';
	  tooltip.style.zIndex = 20001;  // higher than hints
	  tooltip.style.display = 'none';
	  tooltip.style.whiteSpace = 'pre-line';  // keeps \n as real line breaks
	  document.body.appendChild(tooltip);

	  // Track mouse movement
	  cm.getWrapperElement().addEventListener('mousemove', function(e) {
	    var rect = cm.getWrapperElement().getBoundingClientRect();
	    var x = e.clientX - rect.left;
	    var y = e.clientY - rect.top;
	    var pos = cm.coordsChar({ left: e.clientX, top: e.clientY });

	    var token = cm.getTokenAt(pos);
	    var word = token.string;

	    // Show tooltip if recognized keyword
	    if (grammarHelp[word]) {
	      tooltip.innerHTML = grammarHelp[word];
	      tooltip.style.left = (e.pageX + 10) + 'px';
	      tooltip.style.top = (e.pageY + 10) + 'px';
	      tooltip.style.display = 'block';
	    } else {
	      tooltip.style.display = 'none';
	    }
	  });

	  // Hide tooltip when mouse leaves the editor
	  cm.getWrapperElement().addEventListener('mouseleave', function() {
	    tooltip.style.display = 'none';
	  });


      // 🧠 Custom Python-like autocomplete (ES5)
	  function myPythonHints(cm) {
	    var cur = cm.getCursor();
	    var token = cm.getTokenAt(cur);
	    var start = token.start;
	    var end = cur.ch;
	    var line = cm.getLine(cur.line);
	    
	    // Get the word before cursor including dots
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
		  return item[1].toUpperCase().replace("B.", Globals.BLOCK_PYTHON_CLASSNAME); // same as in the bindings of the pythonManager class
		});
		var entities = getEntities().map(function(item) {
		  return item[1].toUpperCase().replace("E.", Globals.ENTITY_PYTHON_CLASSNAME);// same as in the bindings of the pythonManager class
		});
		var items = getItems().map(function(item) {
		  return item[1].toUpperCase().replace("B.", Globals.ITEM_PYTHON_CLASSNAME);// same as in the bindings of the pythonManager class
		});

		var items = getParticles().map(function(item) {
		  return item[1].toUpperCase().replace("P.", Globals.PARTICLE_PYTHON_CLASSNAME);// same as in the bindings of the pythonManager class
		});
		
		var nothingBlock ="block.nothing"; // the nothing block is handled as an exception

		var visualmodderFunctions= [
			Globals.DRAWINGSTARTPOSITION_PYTHON_CLASSNAME+Globals.DRAWINGSTARTPOSITION_CENTER,
			Globals.DRAWINGSTARTPOSITION_PYTHON_CLASSNAME+Globals.DRAWINGSTARTPOSITION_LEFT,
			Globals.LEASH_DICTIONARY_LABEL+"="+Globals.LEASH_PYTHON_CLASSNAME+Globals.LEASH_MYSELF,
			Globals.LEASH_DICTIONARY_LABEL+"="+Globals.LEASH_PYTHON_CLASSNAME+Globals.LEASH_CREATED_MOB,
			Globals.LEASH_DICTIONARY_LABEL+"="+Globals.LEASH_PYTHON_CLASSNAME+Globals.LEASH_OWNER_CREATED_MOB,
			Globals.LEASH_DICTIONARY_LABEL+"="+Globals.LEASH_PYTHON_CLASSNAME+Globals.LEASH_NOBODY,
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
		
		var list=list_python.concat(materials.concat(entities.concat(items.concat(visualmodderFunctions.concat(nothingBlock)))));

	    // Filter by prefix
	    var filtered = [];
	    for (var j = 0; j < list.length; j++) {
			if (list[j].indexOf(word) >= 0) {
				//if (list[j].indexOf(word) === 0) {
	        filtered.push(list[j]);
	      }
	    }

		var hints = filtered.map(function (hint) {
		    return {
		      text: hint,            // what gets inserted
		      displayText: hint,     // what gets shown in dropdown
		      render: function (el, self, data) {
		        el.textContent = data.displayText;

		        // Style depending on function signature
		        if (data.displayText.indexOf('(') !== -1) {
		          el.style.color = '#2b7bff'; // function = blue
				  el.style.paddingLeft = '20px'
		        } else {
		          el.style.fontWeight = 'bold';
		          el.style.color = '#000000'; // variable/field = black
		        }
		      }
		    };
		  });

		  return {
		    list: hints,
			from: CodeMirror.Pos(cur.line, start),
	        to: CodeMirror.Pos(cur.line, end)
	    };
	  }


	  

      // Automatically trigger autocomplete
      cm.on("inputRead", function (cm, change) {
		console.log("xx"+change.text[0])
        if (change.text[0] && /[a-zA-Z_\.\']/.test(change.text[0])) {
          cm.showHint({ hint: myPythonHints, completeSingle: false, container: document.body   });
        }
      });

      // Match Blockly scaling for font size
	  var fieldTextElement = field.textElement_ || field.getSvgRoot().querySelector("text");
	  var computedStyle = window.getComputedStyle(fieldTextElement);
      var fontFamily = computedStyle.fontFamily;
	  var fontSize = computedStyle.fontSize;
	  var cmLineHeight = Blockly.FieldMultilineInput.LINE_HEIGHT * fontSize + "px";
      var wrapper = cm.getWrapperElement();
      wrapper.style.fontSize = fontSize;
      wrapper.style.fontFamily = fontFamily;
	  wrapper.style.lineHeight = cmLineHeight;
	  cm.getScrollerElement().style.fontFamily = fontFamily;
	  cm.getScrollerElement().style.fontSize = fontSize;
	  cm.getScrollerElement().style.lineHeight = cmLineHeight;
	  cm.display.lineDiv.style.lineHeight = cmLineHeight;  // ensures internal lines match

      // Handle resizing and cleanup
      function resizeCM() {
        cm.setSize(overlay.clientWidth + 'px', overlay.clientHeight + 'px');
        cm.refresh();
      }

      resizeCM();
      setTimeout(resizeCM, 10);

      var observer = new MutationObserver(function () {
        resizeCM();
      });
      observer.observe(overlay, { attributes: true, attributeFilter: ['style'] });

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
	  
	  // Reposition overlay when page scrolls or workspace moves
	  function updateOverlayPosition() {
	    var rect = svgRoot.getBoundingClientRect();
	    overlay.style.left = (rect.left + window.scrollX) + "px";
	    overlay.style.top  = (rect.top  + window.scrollY) + "px";
	  }

	  // Track window scrolling
	  window.addEventListener("scroll", updateOverlayPosition, true);

	  // Track Blockly workspace panning/zooming
	  block.workspace.addChangeListener(function() {
	    updateOverlayPosition();
	  });
	  
	  overlay.addEventListener('focusout', function (event) {
	    // 🧠 Skip closing if focus is moving to a CodeMirror hint menu
	    var related = event.relatedTarget || document.activeElement;
	    var insideHints = related && related.closest && related.closest('.CodeMirror-hints');

	    if (insideHints) {
	      // Don't close overlay yet — wait until after hint click completes
	      setTimeout(function () {
	        cm.focus(); // return focus to CodeMirror after hint click
	      }, 150);
	      return; // Skip closing
	    }

	    // Otherwise, close normally after short delay
	    setTimeout(function () {
	      if (!overlay.contains(document.activeElement)) {
	        field.setValue(cm.getValue());
			saveEditorState();

	        observer.disconnect();
	        if (overlay.parentNode) {
	          overlay.parentNode.removeChild(overlay);
	        }
	        if (originalTextarea) {
	          originalTextarea.style.display = '';
	        }
	      }
	    }, 50);
	  });

	  
	  
    };
  }
};

function createLightPythonGenerator() {
  // Clone the main Python generator
  var MiniPython = Object.create(Blockly.Python);

  // Remove unwanted workspace scaffolding
  MiniPython.init = function(workspace) {
    // Call original init so blockToCode works
    Blockly.Python.init.call(this, workspace);

    // Then override everything that adds imports/globals
    this.definitions_ = Object.create(null);
    this.functions_ = Object.create(null);
    this.variableDB_ = null; // No variable declarations
    this.prefix_ = '';
    this.suffix_ = '';
  };

  MiniPython.finish = function(code) {
    // Do NOT add definitions, imports, or suffix
    return code;
  };

  return MiniPython;
}


function fixIndent(pythonCode) {

	// -----------------------------
	// FIX indentation dynamically
	// -----------------------------
	var lines = pythonCode.split("\n");

	// Find minimum indent > 0
	var minIndent = Infinity;
	for (var i = 0; i < lines.length; i++) {
	  var m = lines[i].match(/^(\s+)/);
	  if (m) {
	    var indent = m[1].length;
	    if (indent < minIndent) {
	      minIndent = indent;
	    }
	  }
	}

	// Remove the common indent
	if (minIndent !== Infinity && minIndent > 0) {
	  var re = new RegExp("^\\s{" + minIndent + "}");
	  for (var i = 0; i < lines.length; i++) {
	    lines[i] = lines[i].replace(re, "");

	  }
	}

	pythonCode = lines.join("\n");
	return pythonCode;

}

function convertToPython(funcBlock) {
  var workspace = funcBlock.workspace;

  var MiniPython = createLightPythonGenerator();

  // 1. Get blocks inside function
  var bodyInput = funcBlock.getInput("STACK");
  if (!bodyInput) {
    console.warn("Function has no STACK input.");
    return;
  }

  var firstChild = bodyInput.connection.targetBlock();
  if (!firstChild) {
    console.warn("Function body is empty.");
    return;
  }

  // 2. Initialize temporary python generator
  MiniPython.init(workspace);

  // 3. Generate python for the function’s body
  var pythonCode = MiniPython.statementToCode(funcBlock, "STACK");
  if (!pythonCode) pythonCode = "# (empty python)";
  pythonCode = MiniPython.finish(pythonCode);
  
  pythonCode = fixIndent(pythonCode);  // remove one indent level

  // --------------------------------------
  // 4. DELETE BLOCKS SAFELY (UNDOABLE!!)
  // --------------------------------------
  Blockly.Events.setGroup("convert_to_python");  // START UNDO GROUP
  var child = firstChild;
  while (child) {
    var next = child.getNextBlock();
    child.dispose(false);  // <-- add to trash/undo
    child = next;
  }

  // 5. Add python snippet block
  var pyBlock = workspace.newBlock("python_code_snippet");
  pyBlock.setFieldValue(pythonCode, "CODE");
  pyBlock.initSvg();
  pyBlock.render();

  // 6. Connect snippet block inside function
  bodyInput.connection.connect(pyBlock.previousConnection);
  
  // END UNDO GROUP
  Blockly.Events.setGroup(false);

  console.log("Python generated:\n" + pythonCode);
}

