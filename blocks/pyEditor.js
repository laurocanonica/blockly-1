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
	  var marge=30; // avoid displayng scrollbars in codemirror
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

	    gutters: ["CodeMirror-lint-markers"],
	    lint: {
	      getAnnotations: pythonSkulptValidator,
	      async: true
	    },

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

	    "moveTo":
	    "🧩 Syntax:\nvm.moveTo(steps, direction)\nvm.moveTo(coordSystem, x, y, z)\nvm.moveTo(position)\n\nMoves the cursor position.\n\nRelative movement:\nsteps: number of blocks to move.\ndirection: FORWARD, BACKWARD, LEFT, RIGHT, UP, DOWN.\n\nAbsolute coordinates:\ncoordSystem: CARTESIAN, CYLINDRICAL, SPHERICAL.\nx/y/z: system-specific values.\n\nPredefined positions:\nposition: START, NEXT_BLOCK, PLAYER, AIM, MARK.",

	    "changeDirection":
	    "🧩 Syntax:\nvm.changeDirection(angle)\n\nRotates the cursor yaw (horizontal direction) relative to the current orientation.\nangle: rotation in degrees.",

	    "setDirection":
	    "🧩 Syntax:\nvm.setDirection(direction)\n\nSets the cursor yaw to an absolute direction.\ndirection: PLAYER_YAW, N, S, E, W.",

	    "setInclination":
	    "🧩 Syntax:\nvm.setInclination(angle)\n\nSets the vertical pitch (up/down angle) absolutely.\nangle: pitch in degrees.",

	    "changeInclination":
	    "🧩 Syntax:\nvm.changeInclination(angle)\n\nAdjusts the vertical pitch relative to the current inclination.\nangle: pitch delta in degrees.",

	    "createBlock":
	    "🧩 Syntax:\nvm.createBlock(blocks...)\n\nPlaces one or more blocks at the cursor position.\nblocks: block names or block definitions.",

	    "createSquare":
	    "🧩 Syntax:\nvm.createSquare(width, filled, blocks...)\n\nCreates a square centered at the cursor.\nwidth: side length.\nfilled: true to fill the interior.\nblocks: block definitions.",

	    "createRectangle":
	    "🧩 Syntax:\nvm.createRectangle(width, height, filled, blocks...)\n\nCreates a rectangle centered at the cursor.\nwidth: rectangle width.\nheight: rectangle height.\nfilled: whether the interior is filled.\nblocks: block definitions.",

	    "createPolygon":
	    "🧩 Syntax:\nvm.createPolygon(sides, radiusX, radiusY, arcAngle, filled, blocks...)\n\nCreates a regular polygon or polygonal arc.\nsides: number of polygon sides.\nradiusX: horizontal radius.\nradiusY: vertical radius (null for circle).\narcAngle: 0–360 degrees.\nfilled: whether the interior is filled.\nblocks: block definitions.",

	    "createArc":
	    "🧩 Syntax:\nvm.createArc(radiusX, radiusY, arcAngle, filled, blocks...)\n\nCreates a circular or elliptical arc.\nradiusX: horizontal radius.\nradiusY: vertical radius.\narcAngle: visible arc in degrees.\nfilled: whether the interior is filled.\nblocks: block definitions.",

	    "createEllipse":
	    "🧩 Syntax:\nvm.createEllipse(radiusX, radiusY, filled, blocks...)\n\nCreates an ellipse centered at the cursor.\nradiusX: width radius.\nradiusY: height radius.\nfilled: whether the interior is filled.\nblocks: block definitions.",

	    "createCircle":
	    "🧩 Syntax:\nvm.createCircle(radius, filled, blocks...)\n\nCreates a circle centered at the cursor.\nradius: circle radius.\nfilled: whether the interior is filled.\nblocks: block definitions.",

	    "createStar":
	    "🧩 Syntax:\nvm.createStar(points, innerRadius, outerRadius, filled, blocks...)\n\nCreates a star shape.\npoints: number of star points.\ninnerRadius: inner radius.\nouterRadius: outer radius.\nfilled: whether the interior is filled.\nblocks: block definitions.",

	    "createLine":
	    "🧩 Syntax:\nvm.createLine(length, blocks...)\n\nCreates a straight line extending forward from the cursor.\nlength: number of blocks.\nblocks: block definitions.",

	    "connectPositions":
	    "🧩 Syntax:\nvm.connectPositions(blocks...)\n\nConnects all marked positions with straight lines.\nblocks: block definitions.",

	    "markPosition":
	    "🧩 Syntax:\nvm.markPosition()\n\nMarks the current cursor position for later reference.",

	    "createText":
	    "🧩 Syntax:\nvm.createText(text, fontSize, filled, blocks...)\n\nRenders text as block-based graphics.\ntext: text string to render.\nfontSize: scale of the font.\nfilled: whether letters are filled.\nblocks: block definitions.",

	    "createDrawing":
	    "🧩 Syntax:\nvm.createDrawing(blockList, blockMaterials, matIndex, origin)\n\nCreates a pixel-art drawing.\nblockList: array of strings representing rows.\nblockMaterials: mapping of characters to blocks.\nmatIndex: material set index.\norigin: CENTER, TOP_LEFT.",

	    "createChest":
	    "🧩 Syntax:\nvm.createChest(blocks...)\n\nCreates a chest and fills it with items or blocks.\nblocks: block or item definitions.",

	    "giveToPlayer":
	    "🧩 Syntax:\nvm.giveToPlayer(equipMode, blocks...)\n\nGives items or blocks to the player.\nequipMode: HAND, OFFHAND.\nblocks: block or item definitions.",

	    "isCurrentBlock":
	    "🧩 Syntax:\nvm.isCurrentBlock(blocks...)\n\nChecks if the block at the cursor matches any given type.\nblocks: expected block types.",

	    "isPlayerHolding":
	    "🧩 Syntax:\nvm.isPlayerHolding(blocks...)\n\nChecks if the player is holding a specific item or block.\nblocks: block or item types.",

	    "hasPlayerItem":
	    "🧩 Syntax:\nvm.hasPlayerItem(blocks...)\n\nChecks if the player has an item or block in their inventory.\nblocks: block or item types.",

	    "isPlayerInteractingWith":
	    "🧩 Syntax:\nvm.isPlayerInteractingWith(blocks...)\n\nChecks if the player is interacting with a specific block.\nblocks: block types.",

	    "onEvent":
	    "🧩 Syntax:\nvm.onEvent(eventType, functionName)\n\nRegisters a script function to run when an event occurs.\neventType: Minecraft event name.\nfunctionName: script function to call.",

		"clearEvents":
		"🧩 Syntax:\nvm.clearEvents()\n\nRemoves all registered event handlers for the current session.",

		"waitForBlockCreation":
		"🧩 Syntax:\nvm.waitForBlockCreation()\n\nStops program execution until all blocks have been generated by the server.",

	    "callFunction":
	    "🧩 Syntax:\nvm.callFunction(functionName, playerName, param)\n\nCalls a script function manually.\nfunctionName: function to invoke.\nplayerName: player context.\nparam: optional parameter."
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
	    while (i >= 0 && /[a-zA-Z0-9_\.=]/.test(line.charAt(i))) {
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
		  return item[1].toUpperCase().replace("I.", Globals.ITEM_PYTHON_CLASSNAME);// same as in the bindings of the pythonManager class
		});

		var particles = getParticles().map(function(item) {
		  return item[1].toUpperCase().replace("P.", Globals.PARTICLE_PYTHON_CLASSNAME);// same as in the bindings of the pythonManager class
		});
		

		var visualmodderFunctions= [
			Globals.DRAWINGSTARTPOSITION_PYTHON_CLASSNAME+Globals.DRAWINGSTARTPOSITION_CENTER,
			Globals.DRAWINGSTARTPOSITION_PYTHON_CLASSNAME+Globals.DRAWINGSTARTPOSITION_LEFT,
			Globals.LEASH_DICTIONARY_LABEL+"="+Globals.LEASH_PYTHON_CLASSNAME+Globals.LEASH_MYSELF,
			Globals.LEASH_DICTIONARY_LABEL+"="+Globals.LEASH_PYTHON_CLASSNAME+Globals.LEASH_CREATED_MOB,
			Globals.LEASH_DICTIONARY_LABEL+"="+Globals.LEASH_PYTHON_CLASSNAME+Globals.LEASH_OWNER_CREATED_MOB,
			Globals.LEASH_DICTIONARY_LABEL+"="+Globals.LEASH_PYTHON_CLASSNAME+Globals.LEASH_NOBODY,
			"AMOUNT=1",
			"AMOUNT=num",
			"DIRECTION=Direction.LEFT",
			"DIRECTION=Direction.RIGHT",
			"DIRECTION=Direction.UP",
			"DIRECTION=Direction.DOWN",
			"DIRECTION=Direction.FORWARD",
			"DIRECTION=Direction.BACKWARD",
			"SIDE=Side.UP",
			"GROUND=True",
			"TEAM=True",
			"BABY=True",
			"TALK=text",
			"VELOCITY=[1, 0, 0]",
			"DELAY=1",
			"DELAY=num",
			"DELAY=[1, 1]",
			"DELAY=[min2, max2]",
			"vm.createSquare(4, False, Block.STONE)",
			"vm.createCircle(4, False, Block.STONE)",
			"vm.createBlock(Block.STONE)",
			"vm.createLine(1, Block.STONE)",
			"vm.connectPositions(Block.STONE)",
			"vm.createRectangle(4, 4, False, Block.STONE)",
			"vm.createPolygon(4, 4, 4, 360, False, Block.STONE)",
			"vm.createEllipse(4, 4, False, Block.STONE)",
			"vm.createArc(4, 4, 180, False, Block.STONE)",
			"vm.createStar(5, 4, 11, False, Block.STONE)",
			"vm.createChest(Item.APPLE)",
			"vm.createText(str('abc'), 18, False, Block.STONE)",
			"vm.onEvent(Event.HITTING_ENTITY, 'my_function')",
			"vm.onEvent(Event.KILLED_ENTITY, 'my_function')",
			"vm.onEvent(Event.HIT_BY_ENTITY, 'my_function')",
			"vm.onEvent(Event.DIED, 'my_function')",
			"vm.onEvent(Event.DAMAGING_BLOCK, 'my_function')",
			"vm.onEvent(Event.LEFT_CLICK, 'my_function')",
			"vm.onEvent(Event.RIGHT_CLICK, 'my_function')",
			"vm.onEvent(Event.MOVED, 'my_function')",
			"vm.clearEvents()",
			"vm.waitForBlockCreation()",
			"vm.callFunction('my_function', 'pName', '0')",
			"vm.giveToPlayer(Equip.INVENTORY, Item.APPLE)",
			"vm.giveToPlayer(Equip.GARMENT, Item.DIAMOND_CHESTPLATE)",
			"vm.giveToPlayer(Equip.RIGHT_HAND, Item.DIAMOND_PICKAXE)",
			"vm.giveToPlayer(Equip.LEFT_HAND, Item.DIAMOND_PICKAXE)",
			"vm.moveTo(1, Direction.UP)",
			"vm.moveTo(1, Direction.DOWN)",
			"vm.moveTo(1, Direction.LEFT)",
			"vm.moveTo(1, Direction.RIGHT)",
			"vm.moveTo(1, Direction.FORWARD)",
			"vm.moveTo(1, Direction.BACKWARD)",
			"vm.moveTo(Coordinate.CARTESIAN, 0, 0, 0)",
			"vm.moveTo(Coordinate.CYLINDRICAL, 0, 0, 0)",
			"vm.moveTo(Coordinate.SPHERICAL, 0, 0, 0)",
			"vm.setDirection(Compass.SOUTH)",
			"vm.setDirection(Compass.NORTH)",
			"vm.setDirection(Compass.EAST)",
			"vm.setDirection(Compass.WEST)",
			"vm.setDirection(Compass.SAME_AS_PLAYER)",
			"vm.changeDirection(90)",
			"vm.setInclination(0)",
			"vm.changeInclination(45)",
			"vm.moveTo(Position.START)",
			"vm.moveTo(Position.NEXT_BLOCK)",
			"vm.moveTo(Position.PLAYER)",
			"vm.moveTo(Position.AIM)",
			"vm.moveTo(Position.MARK)",
			"vm.markPosition()",
			"vm.createSquare",
			"vm.createCircle",
			"vm.createBlock",
			"vm.createLine",
			"vm.connectPositions",
			"vm.createRectangle",
			"vm.createPolygon",
			"vm.createEllipse",
			"vm.createArc",
			"vm.createStar",
			"vm.createChest",
			"vm.createText",
			"vm.onEvent",
			"vm.clearEvents",
			"vm.callFunction",
			"vm.giveToPlayer",
			"vm.moveTo",
			"vm.setDirection",
			"vm.changeDirection",
			"vm.setInclination",
			"vm.changeInclination",
			"vm.markPosition",
			"dict(TYPE=Block.STONE)",
			"dict(POTION='my_function', TYPE=Item.SPLASH_POTION)",
			"dict(SIGN='my_text', TYPE=Block.ACACIA_SIGN)",
			"dict(SIGN=text, TYPE=Block.ACACIA_SIGN)",
			"dict(IMAGE='null', TYPE=Entity.ITEM_FRAME)",
			"vm.createSquare(4, False, dict(TYPE=Block.STONE))",
			"vm.createCircle(4, False, dict(TYPE=Block.STONE))",
			"vm.createBlock(dict(TYPE=Block.STONE))",
			"vm.createLine(1, dict(TYPE=Block.STONE))",
			"vm.connectPositions(dict(TYPE=Block.STONE))",
			"vm.createRectangle(4, 4, False, dict(TYPE=Block.STONE))",
			"vm.createPolygon(4, 4, 4, 360, False, dict(TYPE=Block.STONE))",
			"vm.createEllipse(4, 4, False, dict(TYPE=Block.STONE))",
			"vm.createArc(4, 4, 180, False, dict(TYPE=Block.STONE))",
			"vm.createStar(5, 4, 11, False, dict(TYPE=Block.STONE))",
			"vm.createChest(dict(TYPE=Item.APPLE))",
			"vm.createText(str('abc'), 18, False, dict(TYPE=Block.STONE))",
			"vm.giveToPlayer(Equip.INVENTORY, dict(TYPE=Item.APPLE))",
			Globals.BLOCK_NOTHING
				].sort();
		
		var list=list_python.concat(
			materials.concat(
				entities.concat(
					items.concat(
						particles.concat(
							visualmodderFunctions)))));

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
		//console.log("xx"+change.text[0])
        if (change.text[0] && /[a-zA-Z_=\.]/.test(change.text[0])) {
          cm.showHint({ hint: myPythonHints, completeSingle: false, container: document.body   });
        }
		//CodeMirror.signal(cm, "change", cm);// syntax check
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
	  
	  function closeEditorSafely() {
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
	  
	  overlay.addEventListener('focusout', function (event) {
	    var related = event.relatedTarget || document.activeElement;
	    var insideHints =
	      related && related.closest && related.closest('.CodeMirror-hints');

	    if (insideHints) {
	      setTimeout(function () {
	        cm.focus();
	      }, 150);
	      return;
	    }

	    setTimeout(function () {
	      if (!overlay.contains(document.activeElement)) {
	        closeEditorSafely();
	      }
	    }, 50);
	  });

	  window.addEventListener('blur', function () {
	    // Delay so CodeMirror hint clicks still work
	    setTimeout(closeEditorSafely, 0);
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


function pythonSkulptValidator(text, callback) {
  var annotations = [];
  var lines = text.split(/\r?\n/);

  try {
    Sk.parse("<input>", text);
  } catch (e) {
    var line = getErrorLine(e);
    var lineText = lines[line] || "";
    var prevLineText = lines[line - 1] || "";

    annotations.push({
      from: CodeMirror.Pos(line, 0),
      to: CodeMirror.Pos(line, Math.max(1, lineText.length)),
      message: improveMessage(e, lineText, prevLineText),
      severity: "error"
    });
  }

  callback(annotations);
}

function skulptErrorToLint(e) {
  var line = 0;
  var chStart = 0;
  var chEnd = 1;

  // Preferred: location object
  if (e.loc && typeof e.loc.first_line === "number") {
    line = e.loc.first_line - 1;
    chStart = e.loc.first_column || 0;
    chEnd = Math.max(
      e.loc.last_column || chStart + 1,
      chStart + 1
    );
  }
  // Fallback: lineno / colno
  else if (typeof e.lineno === "number") {
    line = e.lineno - 1;
    chStart = e.colno || 0;
    chEnd = chStart + 1;
  }
  // Last resort: try parsing message
  else {
    var m = /line (\d+)/i.exec(e.toString());
    if (m) {
      line = parseInt(m[1], 10) - 1;
    }
  }

  return {
    from: CodeMirror.Pos(line, chStart),
    to: CodeMirror.Pos(line, chEnd),
    message: e.toString(),
    severity: "error"
  };
}

function getErrorLine(e) {
	  var msg = e.toString();

	  // Match: "on line 7" or "line 7"
	  var m = msg.match(/line\s+(\d+)/i);
	  if (m) {
	    return Math.max(0, parseInt(m[1], 10) - 1);
	  }

	  return 0;
	}

function improveMessage(e, lineText, prevLineText) {
  var msg = e.toString();

  if (/bad input/i.test(msg)) {

    if (/^\s*(if|elif|while|for)\b/.test(lineText) &&
        !/:\s*$/.test(lineText)) {
      return "Missing ':' at end of statement";
    }

    if (/^\s*def\b/.test(lineText) &&
        !/:\s*$/.test(lineText)) {
      return "Missing ':' after function definition";
    }

    if (/^\s*class\b/.test(lineText) &&
        !/:\s*$/.test(lineText)) {
      return "Missing ':' after class definition";
    }

    if (/^\s*(else|finally|except)\b/.test(lineText)) {
      return "Missing ':' after '" + RegExp.$1 + "'";
    }

    if (prevLineText &&
        /:\s*$/.test(prevLineText) &&
        !/^\s+/.test(lineText)) {
      return "Expected indented block";
    }

    if (/\(/.test(lineText) && !/\)/.test(lineText)) {
      return "Unclosed '('";
    }

    if (/\[/.test(lineText) && !/\]/.test(lineText)) {
      return "Unclosed '['";
    }

    if (/\{/.test(lineText) && !/\}/.test(lineText)) {
      return "Unclosed '{'";
    }

    if (/["']/.test(lineText) &&
        (lineText.match(/["']/g) || []).length % 2 !== 0) {
      return "Unclosed string literal";
    }
  }

  return msg;
}


