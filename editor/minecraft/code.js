/**
 * Blockly Demos: Code
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Code demo.
 * @author fraser@google.com (Neil Fraser)
 */


/**
 * Modifications for Visualmodder
 *
 * Copyright 2017 Visuamodder.org.
 * */

'use strict';

/**
 * Create a namespace for the application.
 */
var Code = {};

/**
 * Set the remote host for the http calls.  /can be hardcoded for debugging purposes
 */
  Code.remoteHost=window.location.host;
  //Code.remoteHost='localhost:10273'; 	// for debugging with localhost

/**
 * Lookup for names of supported languages.  Keys should be in ISO 639 format.
 */
Code.LANGUAGE_NAME = {
		  'en': 'English',
		  'it': 'Italiano'
};

Code.LANGUAGE_NAME_originalList = {
  'ar': 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©',
  'be-tarask': 'TaraÅ¡kievica',
  'br': 'Brezhoneg',
  'ca': 'CatalÃ ',
  'cs': 'ÄŒesky',
  'da': 'Dansk',
  'de': 'Deutsch',
  'el': 'Î•Î»Î»Î·Î½Î¹ÎºÎ¬',
  'en': 'English',
  'es': 'EspaÃ±ol',
  'et': 'Eesti',
  'fa': 'Ù�Ø§Ø±Ø³ÛŒ',
  'fr': 'FranÃ§ais',
  'he': '×¢×‘×¨×™×ª',
  'hrx': 'Hunsrik',
  'hu': 'Magyar',
  'ia': 'Interlingua',
  'is': 'Ã�slenska',
  'it': 'Italiano',
  'ja': 'æ—¥æœ¬èªž',
  'ko': 'í•œêµ­ì–´',
  'mk': 'ÐœÐ°ÐºÐµÐ´Ð¾Ð½Ñ�ÐºÐ¸',
  'ms': 'Bahasa Melayu',
  'nb': 'Norsk BokmÃ¥l',
  'nl': 'Nederlands, Vlaams',
  'oc': 'Lenga d\'Ã²c',
  'pl': 'Polski',
  'pms': 'PiemontÃ¨is',
  'pt-br': 'PortuguÃªs Brasileiro',
  'ro': 'RomÃ¢nÄƒ',
  'ru': 'Ð ÑƒÑ�Ñ�ÐºÐ¸Ð¹',
  'sc': 'Sardu',
  'sk': 'SlovenÄ�ina',
  'sr': 'Ð¡Ñ€Ð¿Ñ�ÐºÐ¸',
  'sv': 'Svenska',
  'ta': 'à®¤à®®à®¿à®´à¯�',
  'th': 'à¸ à¸²à¸©à¸²à¹„à¸—à¸¢',
  'tlh': 'tlhIngan Hol',
  'tr': 'TÃ¼rkÃ§e',
  'uk': 'Ð£ÐºÑ€Ð°Ñ—Ð½Ñ�ÑŒÐºÐ°',
  'vi': 'Tiáº¿ng Viá»‡t',
  'zh-hans': 'ç®€ä½“ä¸­æ–‡',
  'zh-hant': 'æ­£é«”ä¸­æ–‡'
};

/**
 * List of RTL languages.
 */
Code.LANGUAGE_RTL = ['ar', 'fa', 'he', 'lki'];

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Code.workspace = null;

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
Code.getStringParamFromUrl = function(name, defaultValue) {
  var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
  return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
Code.getLang = function() {
  var lang = Code.getStringParamFromUrl('lang', '');
  if (Code.LANGUAGE_NAME[lang] === undefined) {
    // Default to English.
    lang = 'en';
  }
  return lang;
};

/**
 * Is the current language (Code.LANG) an RTL language?
 * @return {boolean} True if RTL, false if LTR.
 */
Code.isRtl = function() {
  return Code.LANGUAGE_RTL.indexOf(Code.LANG) != -1;
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
Code.loadBlocks = function(defaultXml) {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch(e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
    // Language switching stores the blocks during the reload.
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(xml, Code.workspace);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(xml, Code.workspace);
  } else if ('BlocklyStorage' in window) {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
};


Code.getLanguage = function() {
	 var languageMenu = document.getElementById('languageMenu');
	 return encodeURIComponent(languageMenu.options[languageMenu.selectedIndex].value);
}


/**
 * Save the blocks and reload with a different language.
 */
Code.changeLanguage = function() {
  // Store the blocks for the duration of the reload.
  // MSIE 11 does not support sessionStorage on file:// URLs.
  if (window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(Code.workspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }

  var languageMenu = document.getElementById('languageMenu');
  var newLang = encodeURIComponent(
      languageMenu.options[languageMenu.selectedIndex].value);
  var search = window.location.search;
  if (search.length <= 1) {
    search = '?lang=' + newLang;
  } else if (search.match(/[?&]lang=[^&]*/)) {
    search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
  } else {
    search = search.replace(/\?/, '?lang=' + newLang + '&');
  }

  var playernamefield = document.getElementById('playernamefield');
  var newPlayer = encodeURIComponent(
      playernamefield.value);
  if (search.length <= 1) {
    search = '?lang=' + newLang;
  } else if (search.match(/[?&]player=[^&]*/)) {
    search = search.replace(/([?&]player=)[^&]*/, '$1' + newPlayer);
  } else {
    search = search.replace(/\?/, '?player=' + newPlayer + '&');
  }

  

  window.location = window.location.protocol + '//' +
       window.location.host + window.location.pathname + search;
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Code.bindClick = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  el.addEventListener('touchend', func, true);
};

/**
 * Load the Prettify CSS and JavaScript.
 */
Code.importPrettify = function() {
  var script = document.createElement('script');
  script.setAttribute('src', 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js');
  document.head.appendChild(script);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Code.getBBox_ = function(element) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  return {
    height: height,
    width: width,
    x: x,
    y: y
  };
};

/**
 * User's language (e.g. "en").
 * @type {string}
 */
Code.LANG = Code.getLang();

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['blocks', 'javascript', 'xml', 'log'];

Code.selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code.tabClick = function(clickedName) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
          window.confirm(MSG['badXml'].replace('%1', e));
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Code.workspace.clear();
      Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
    }
  }

  if (document.getElementById('tab_blocks').className == 'tabon') {
    Code.workspace.setVisible(false);
  }
  // Deselect all tabs and hide all panes.
  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.visibility = 'hidden';
  }

  // Select the active tab.
  Code.selected = clickedName;
  document.getElementById('tab_' + clickedName).className = 'tabon';
  // Show the selected pane.
  document.getElementById('content_' + clickedName).style.visibility =
      'visible';
  Code.renderContent();
  if (clickedName == 'blocks') {
    Code.workspace.setVisible(true);
  }
  Blockly.svgResize(Code.workspace);
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function() {
  var content = document.getElementById('content_' + Code.selected);
  // Initialize the pane.
  if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  } else if (content.id == 'content_javascript') {
    Code.attemptCodeGeneration(Blockly.JavaScript);
  } else if (content.id == 'content_log') {
    Code.loadLog();
  } 

  if (typeof PR == 'object') {
    PR.prettyPrint();
  }
};

/**
 * Attempt to generate the code and display it in the UI, pretty printed.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.attemptCodeGeneration = function(generator) {
  var content = document.getElementById('content_' + Code.selected);
  content.textContent = '';
  if (Code.checkAllGeneratorFunctionsDefined(generator)) {

    var code = generator.workspaceToCode(Code.workspace);
    content.textContent = code;
    // Remove the 'prettyprinted' class, so that Prettify will recalculate.
    content.className = content.className.replace('prettyprinted', '');
  }
};

/**
 * Check whether all blocks in use have generator functions.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.checkAllGeneratorFunctionsDefined = function(generator) {
  var blocks = Code.workspace.getAllBlocks(false);
  var missingBlockGenerators = [];
  for (var i = 0; i < blocks.length; i++) {
    var blockType = blocks[i].type;
    if (!generator[blockType]) {
      if (missingBlockGenerators.indexOf(blockType) == -1) {
        missingBlockGenerators.push(blockType);
      }
    }
  }

  var valid = missingBlockGenerators.length == 0;
  if (!valid) {
    var msg = 'The generator code for the following blocks not specified for ' +
        generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
    Blockly.alert(msg);  // Assuming synchronous. No callback.
  }
  return valid;
};

/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function() {
  Code.initLanguage();

  var rtl = Code.isRtl();
  var container = document.getElementById('content_area');
  var onresize = function(e) {
    var bBox = Code.getBBox_(container);
    for (var i = 0; i < Code.TABS_.length; i++) {
      var el = document.getElementById('content_' + Code.TABS_[i]);
      el.style.top = bBox.y + 'px';
      el.style.left = bBox.x + 'px';
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.
      el.style.height = bBox.height + 'px';
      el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
      el.style.width = bBox.width + 'px';
      el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
    }
    // Make the 'Blocks' tab line up with the toolbox.
    if (Code.workspace && Code.workspace.toolbox_.width) {
      document.getElementById('tab_blocks').style.minWidth =
          (Code.workspace.toolbox_.width - 38) + 'px';
          // Account for the 19 pixel margin and on each side.
    }
  };
  window.addEventListener('resize', onresize, false);

  // The toolbox XML specifies each category name using Blockly's messaging
  // format (eg. `<category name="%{BKY_CATLOGIC}">`).
  // These message keys need to be defined in `Blockly.Msg` in order to
  // be decoded by the library. Therefore, we'll use the `MSG` dictionary that's
  // been defined for each language to import each category name message
  // into `Blockly.Msg`.
  // TODO: Clean up the message files so this is done explicitly instead of
  // through this for-loop.
  for (var messageKey in MSG) {
    if (messageKey.indexOf('cat') == 0) {
      Blockly.Msg[messageKey.toUpperCase()] = MSG[messageKey];
    }
  }

  // Construct the toolbox XML, replacing translated variable names.
  var toolboxText = document.getElementById('toolbox').outerHTML;
  toolboxText = toolboxText.replace(/(^|[^%]){(\w+)}/g,
      function(m, p1, p2) {return p1 + MSG[p2];});
  var toolboxXml = Blockly.Xml.textToDom(toolboxText);

  Code.workspace = Blockly.inject('content_blocks',
      {grid:
          {spacing: 0,
           length: 3,
           colour: '#ccc',
           snap: false},
       media: '../../media/',
       rtl: rtl,
       toolbox: toolboxXml,
       
       zoom:
           {controls: true,
            wheel: false},
          move:{
               scrollbars: true,
               drag: true,
               wheel: true}
        
      });
  

  // Add to reserved word list: Local variables in execution environment (runJS)
  // and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

  Code.loadBlocks('');

  if ('BlocklyStorage' in window) {
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload(Code.workspace);
  }

  Code.tabClick(Code.selected);

  Code.bindClick('trashButton',
      function() {Code.discard(); Code.renderContent();});
  Code.bindClick('runButton', Code.runJS);
  
  


  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    Code.bindClick('tab_' + name,
        function(name_) {return function() {Code.tabClick(name_);};}(name));
  }
  onresize();
  Blockly.svgResize(Code.workspace);
  
  
  

  // save button ------------------------
  	      document.getElementById('saveButton').onclick = function(code) {
  		 	var inxml = Blockly.Xml.workspaceToDom(Code.workspace);
  			var inxml_text = Blockly.Xml.domToPrettyText(inxml);		
  			//window.alert("saving ..\n"+inxml_text);	
  			var saveLink=document.getElementById('saveButtonDownloadRef');
  			var fileName=window.prompt(document.getElementById('saveButton').title, "vmcode.txt");
  			if (fileName == null || fileName =='undefined' ||  fileName == '') {
  				fileName="vmcode.txt"
  			}
  			saveLink.download=fileName;
 			saveLink.href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(inxml_text); 
  			saveLink.click();
        };


  // read button ---------------------
	    document.getElementById('readButton').onclick = function(code) {
	    	var fileInput = document.getElementById('readButton1');
	    	fileInput.click();
	    };
  		var fileInput = document.getElementById('readButton1');
  		fileInput.addEventListener('change', function(e) {
  			Code.loadFile(fileInput.files);
  		});
  		


  // Lazy-load the syntax-highlighting.
  window.setTimeout(Code.importPrettify, 1);
  
  
  // CUSTOM initializations
  var player = Code.getStringParamFromUrl('player', 'Minecraft_player_name');

  document.getElementById('playernamefield').value= player;
  setTimeout(Code.loadExamplesList, 2000);  // speed up loading of main page. Wait loading the examples

  //setUpModalForShowingExamples();

  Code.serverNeedsUpdate=true;
  Code.workspace.addChangeListener(setServerNeedsUpdate);
  window.onkeypress =handleKeyboardShortcuts;
    Code.workspace.addChangeListener(blockClickedEventHandler) 
    Code.workspace.addChangeListener(fieldDropDownResetListEventHandler) 
document.getElementById('playernamefield').addEventListener('change', Code.changeLanguage);

  
};

Code.preventDefaults = function preventDefaults (e) {
		e.preventDefault(); // no default behaviour in drag and drop
  		e.stopPropagation();
  		e.dataTransfer.setData('Text', " "); // this to fix a bug in chrome
	}

Code.loadFile = function(files){
	var file = files[0];
	var textType = /text.*/;
	if (file!=undefined && file.type.match(textType)) {
		var reader = new FileReader();

		reader.onload = function(e) {
			//window.alert(reader.result);
			var outxml = Blockly.Xml.textToDom(reader.result);
			Blockly.Xml.domToWorkspace(outxml, Code.workspace);
			window.alert("loaded");
		}
		reader.readAsText(file);	
	} else {
		window.alert( "File type not supported or it is on a remote FTP drive")
	}
}

/**
 * Initialize the page language.
 */
Code.initLanguage = function() {
  // Set the HTML's language and direction.
  var rtl = Code.isRtl();
  document.dir = rtl ? 'rtl' : 'ltr';
  document.head.parentElement.setAttribute('lang', Code.LANG);

  // Sort languages alphabetically.
  var languages = [];
  for (var lang in Code.LANGUAGE_NAME) {
    languages.push([Code.LANGUAGE_NAME[lang], lang]);
  }
  var comp = function(a, b) {
    // Sort based on first argument ('English', 'Русский', '简体字', etc).
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  };
  languages.sort(comp);
  // Populate the language selection menu.
  var languageMenu = document.getElementById('languageMenu');
  languageMenu.options.length = 0;
  for (var i = 0; i < languages.length; i++) {
    var tuple = languages[i];
    var lang = tuple[tuple.length - 1];
    var option = new Option(tuple[0], lang);
    if (lang == Code.LANG) {
      option.selected = true;
    }
    languageMenu.options.add(option);
  }
  languageMenu.addEventListener('change', Code.changeLanguage, true);

  // Inject language strings.
  document.title = 'Visual Modder';
  document.getElementById('tab_blocks').textContent = MSG['blocks'];

  document.getElementById('readButton').title = MSG['t_readTooltip'];
  document.getElementById('saveButton').title = MSG['t_saveTooltip'];
  document.getElementById('runButton').title = MSG['runTooltip'];
  document.getElementById('trashButton').title = MSG['trashTooltip'];
};

/**
 * Execute the user's code.
 */
Code.runJS = function() {
	var nameField=document.getElementById('playernamefield');
	var playerName=nameField.value.trim();
	nameField.style.backgroundColor = "#FFFFFF"
   if(playerName=='Minecraft_player_name' || 
		   playerName=='' || 
		   playerName.length > 32 || 
		   playerName.indexOf(" ")>=0) {
	   nameField.style.backgroundColor = "red";
	   displayResultMessage(MSG['warn_entername'], "red");
   } else {
		   // protect from infinite loops
		   var MAX_LOOP_CYCLES=100000;	
		   var infiniteLoopMessage=MSG['infiniteLoopMessage'];
		   Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(infiniteLoopCounter>'+MAX_LOOP_CYCLES+') {return("'+infiniteLoopMessage+'")}else{(infiniteLoopCounter++)}\n';

		   var code = Blockly.JavaScript.workspaceToCode(Code.workspace);
		   var xmlCodeDom = Blockly.Xml.workspaceToDom(Code.workspace);
		   var xmlCode = Blockly.Xml.domToText(xmlCodeDom);
		   var host='http://'+ Code.remoteHost; 	   
		   var hpath=host+'/EXE';
		   
		   //postToServer('/EXE', {'EXECODE': code});
		   //postToServer(playerName, host+':'+port+'/EXE', {'EXECODE': code , 'Playername':playerName});
		   var formData = new FormData(); 
		   formData.append('EXECODE', code);
		   formData.append('XMLCODE', xmlCode);
		   formData.append('Playername', playerName);
		   formData.append('langsel', Code.getLanguage());


		   
		   var xhr = new XMLHttpRequest();
		   xhr.open("POST", hpath, true); 
		   xhr.timeout = 2000; 
		   xhr.onload=function(event){
			   if(event.target.response.substr(0, 2)=='OK'){
				   Code.serverNeedsUpdate=false;
				   displayResultMessage(MSG['info_deploySuccess'].replace('%2', playerName), "green"); 
			   } else if(event.target.response.substr(0, 2)=='WA'){ //Warning
				   Code.serverNeedsUpdate=false;
				   displayResultMessage(MSG['info_deploySuccessWithWarning'].replace('%2', playerName), "yellow"); 
			   } else if(event.target.response.substr(0, 7)=='UNKNOWN'){ //Warning
				   Code.serverNeedsUpdate=false;
				   displayResultMessage(MSG['info_deployUnknownPlayer'].replace('%2', playerName), "red"); 
			   } else {
				   displayResultMessage(xhr.responseText, "red"); 			   
			   }
				 //ga('send', 'pageview');
		   }; 
		   xhr.onerror=function(event){ 
			   displayResultMessage(xhr.responseText, "red"); 
		   }; 
		   xhr.ontimeout = function (e) {
			   displayResultMessage("Connection failed  "+xhr.responseText, "red"); 
			 };
		   xhr.send(formData);	   
		   
		   //window.alert(MSG['info_deploySuccess'].replace('%1', host).replace('%2', playerName)+" ("+port+")");
		   //location.reload(); // force reload of page
	    
   }
};


Code.loadLog = function() {
	var nameField=document.getElementById('playernamefield');
	var playerName=nameField.value.trim();
	var logTextarea = document.getElementById('content_log');
	var host='http://'+ Code.remoteHost; 	   
	var hpath=host+'/LOG';
	var formData = new FormData(); 
	formData.append('Playername', playerName);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", hpath, true); 
	xhr.timeout = 2000; 
	xhr.onload=function(event){
	   logTextarea.value =xhr.responseText;		   
	}; 
	xhr.onerror=function(event){ 
	   logTextarea.value ='ERROR Connecting server\n'+xhr.responseText; 
       console.log('ERROR Connecting server\n'+xhr.responseText)
	}; 
	xhr.ontimeout = function (e) {
	   logTextarea.value ="TIMEOUT Connecting server\n  "+xhr.responseText; 
       console.log('TIMEOUT Connecting server\n'+xhr.responseText)
	};
	xhr.send(formData);	   
};

Code.loadExamplesList = function() {
	var host='http://'+ Code.remoteHost; 	      
	var hpath=host+'/EXAMPLELIST';
	var formData = new FormData(); 
	var xhr = new XMLHttpRequest();
	xhr.open("POST", hpath, true); 
	xhr.timeout = 2000; 
	xhr.onload=function(event){
	   addExamplesToModal(xhr.responseText);	
	   setUpModalForShowingExamples();	   
	}; 
	xhr.onerror=function(event){ 
       console.log('ERROR Connecting server for loading list of examples\n'+xhr.responseText)
	}; 
	xhr.ontimeout = function (e) {
       console.log('TIMEOUT Connecting server for loading list of examples\n'+xhr.responseText)   
	};
	xhr.send(formData);	   
};

Code.loadExampleXML = function(xmlFile) {
	var host='http://'+ Code.remoteHost; 
	var hpath=host+'/EXAMPLENAME?ExampleFile='+xmlFile;
	var formData = new FormData(); 
	var xhr = new XMLHttpRequest();
	xhr.open("POST", hpath, true); 
	xhr.timeout = 2000; 
	xhr.onload=function(event){
		var outxml = Blockly.Xml.textToDom(xhr.responseText);
		Blockly.Xml.domToWorkspace(outxml, Code.workspace);
		var modal = document.getElementById('myModal');
		modal.style.display = "none";
	}; 
	xhr.onerror=function(event){ 
       console.log('ERROR Connecting server for loading example XML\n'+xhr.responseText)
	}; 
	xhr.ontimeout = function (e) {
       console.log('TIMEOUT Connecting server for loading example XML\n'+xhr.responseText)
	};
	xhr.send(formData);	   
};

function displayResultMessage(message, color){
	var subcolor="white";
	if (color=="green") {
		subcolor="#c6f1bc"
	} else 	if (color=="yellow") {
		subcolor="#f1d967"
	} else 	if (color=="red") {
		subcolor="#ffb6b6"
	}

	var modalDeployResultMessageText=document.getElementById('modalDeployResultMessageText');
	modalDeployResultMessageText.innerHTML = message;
	modalDeployResultMessageText.style.borderColor = color;
	modalDeployResultMessageText.style.backgroundColor = subcolor;
	modalDeployResultMessageText.style.display = "inline";

	window.onfocus = function() {
		modalDeployResultMessageText.style.display = "none";
	}

}






/**
 * Discard all blocks from the workspace.
 */
Code.discard = function() {
  var count = Code.workspace.getAllBlocks(false).length;
  if (count < 2 ||
      window.confirm(Blockly.Msg['DELETE_ALL_BLOCKS'].replace('%1', count))) {
    Code.workspace.clear();
    if (window.location.hash) {
      window.location.hash = '';
    }
  }
};


function addExamplesToModal(exampleNamesGroups){
		const exampleGroupsArr = exampleNamesGroups.split(";").sort();
		const nrExampleGroups=exampleGroupsArr.length;
		for (var i = 0; i < nrExampleGroups; i++) {
			var firstExampleName=exampleGroupsArr[i];
				//console.log("file>"+firstExampleName+"<");
			if(firstExampleName!=null && firstExampleName.length>0){
				var exampleFolder=firstExampleName.substring(0, firstExampleName.indexOf('/'));
				//console.log("folder>"+exampleFolder+"<");
				var table=null;
			    if(exampleFolder=='algorithms'){
		          table = document.getElementById('algorithmsModalTable');
				} else {
		          table = document.getElementById('defaultModalTable');
				}
				addExamplesToTable(exampleGroupsArr[i] , table);
			}
		}


}

function addExamplesToTable(exampleNames, table){
	const exampleArr = exampleNames.split(",").sort();
	const nrExamples=exampleArr.length;
	const nrCols=4;
	const MAXROWS=30;
	for (var i = 0; i < MAXROWS; i++) {
		if(i*nrCols>nrExamples){
			break
		}
	  var tr = document.createElement('tr');
		for (var j = 0; j < nrCols; j++) {
		if(i*nrCols+j>=nrExamples){
			break
		}
		  var exampleName=exampleArr[i*nrCols+j];
		  var td = document.createElement('td');
		  var p = document.createElement('p');
		  var img = document.createElement('img');
	      img.name = exampleName+".xml";
	      img.src = 'http://'+ Code.remoteHost +'/EXAMPLENAME?ExampleFile='+exampleName+".png";
		  var basicName=exampleName.substring(exampleName.indexOf('/')+1);
		  var title=basicName.replace(/^[0-9]*/, "");
	      img.title=title;
	      img.width=200;
	      img.height=130;
	      img.addEventListener('click', loadChosenExample);
		  tr.appendChild(td);
		  p.innerText=title;
		  p.classList.add('examplep');
	      p.addEventListener('click', loadChosenExample);
	      p.name = exampleName+".xml";
		  td.classList.add('exampletd');
		  td.appendChild(img);
		  td.appendChild(p);
	    }
	    table.appendChild(tr);
    } //for
}

function loadChosenExample(e) {
		  if(confirm(MSG['t_readTooltip']+' ?')){
 	         Code.loadExampleXML(e.target.name);	
			 hideAllModalTables();
		}
	}

function hideAllModalTables(){
	var mainModalDiv = document.getElementById('myModal');
	var defaultTable = document.getElementById('defaultModalTable');
	var algorithmsTable = document.getElementById('algorithmsModalTable');
		mainModalDiv.style.display = "none";
	    defaultTable.style.display = "none";
	    algorithmsTable.style.display = "none";
}

function setUpModalForShowingExamples(){
	document.getElementById('openModalButton').textContent = MSG['c_ExamplesMenu'];
	document.getElementById('openModalButtonExamples').textContent = MSG['c_Examples'];
	document.getElementById('defaultTitle').textContent = MSG['c_Examples'];
	document.getElementById('openModalButtonAlgorithms').textContent = MSG['c_Algorithms'];
	document.getElementById('algorithmsTitle').textContent = MSG['c_Algorithms'];
	
	
	//Get the modal
	var mainModalDiv = document.getElementById('myModal');
	var defaultTable = document.getElementById('defaultModalTable');
	var algorithmsTable = document.getElementById('algorithmsModalTable');
	
	
	// Get the button that opens the modal
	var examples_sel = document.getElementById("openModalButtonExamples");
	
	// When the user clicks on the button, open the modal 
	examples_sel.onclick = function() {
	    mainModalDiv.style.display = "block";
	    defaultTable.style.display = "table";
	}
	
	// Get the button that opens the modal
	var examples_algorithms = document.getElementById("openModalButtonAlgorithms");
	
	// When the user clicks on the button, open the modal 
	examples_algorithms.onclick = function() {
	    mainModalDiv.style.display = "block";
	    algorithmsTable.style.display = "table";
	}
	
	// Get the <span> element that closes the modal
	var closeDefault = document.getElementById("closeDefaultModalTable");
	
	// When the user clicks on <span> (x), close the modal
	closeDefault.onclick = function() {
		hideAllModalTables();
	}
	
	// Get the <span> element that closes the modal
	var closeAlgorithms = document.getElementById("closeAlgorithmsModalTable");
	
	// When the user clicks on <span> (x), close the modal
	closeAlgorithms.onclick = function() {
		hideAllModalTables();
	}
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == mainModalDiv || event.target.parentNode == mainModalDiv) {
	        hideAllModalTables();
	    }
	}
}




function setServerNeedsUpdate(event) {
	  if (event.type != Blockly.Events.UI) {
		  Code.serverNeedsUpdate=true;
	  }
	}

// Load the Code demo's language strings.
document.write('<script src="msg/' + Code.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="../../msg/js/' + Code.LANG + '.js"></script>\n');


window.addEventListener('load', Code.init);
window.onblur = function() {
	if(Code.serverNeedsUpdate){
		Code.runJS()
	}
	
document.getElementById('playernamefield').onblur = function() {
		Code.serverNeedsUpdate=true;
	}
	


}

// event handler that resets the content of the filter for dropdowns on any event
var fieldDropDownTypedLetters='';
function fieldDropDownResetListEventHandler(event){
	fieldDropDownTypedLetters='';
}

function getSingleDropDownField(block){
	//console.log(block.inputList[0].fieldRow[1].name);
	// only dropDownFields have a getOptions() function
	if(block.inputList!=null && 
	block.inputList[0].fieldRow!=null 
	){
		var row=block.inputList[0].fieldRow;
		for (var i = 0; i < row.length; i++) {		
			if(row [i]!=null && row[i].name=='NAME'){
				return row [i];
			}
		}
	} else{
		return null;
	}
}

function getDropDownField(block){
	var fieldToUse=getSingleDropDownField(block);		
	if(fieldToUse==null){ // if this is a dropdown
        // one of the children could be the dropdown
		var children=block.getChildren();
		for (var i = 0; i < children.length; i++) {
		    //console.log("type is "+children[i].type);
			fieldToUse=getSingleDropDownField(children[i]) ;
				//console.log("found "+children[i].inputList[0].fieldRow[0].name)
			if(fieldToUse!=null){
				break;					
			}
		}
	}
	return fieldToUse;
}
function refreshDynamicDropdownField(block, pressedKey) {
	if(pressedKey<'0' || pressedKey>'9'){ // ignore all numbers
		const NON_BREAKING_SPACE='\u00A0';
		if(block!=null){
			var field0 = getDropDownField(block);
		
			if(field0!=null){
				fieldDropDownTypedLetters+=pressedKey.replace(' ', NON_BREAKING_SPACE); // block prefix/postfix matching of blockly dropdowns
				//console.log("--->"+fieldDropDownTypedLetters+"<--");
				
				// store the data of the original dropdown 
				var input=field0.getParentInput();
				var options0=field0.getOptions(false);
				var name=field0.name;
				options0.sort(); // eset the order
				// remove and recreate the original dropdown to hide it
				input.removeField(name);
				field0.dispose();
			
				
				// select the options matching our string	
				var optionsFirst=[];
				var optionsSecond=[];
				var optionsThird=[];
				for (var i = 0; i < options0.length; i++) {
					var label=options0[i][0];
					label = label.replaceAll(' ', NON_BREAKING_SPACE); // block prefix/postfix matching of blockly dropdowns
					var newSingleOption=[label, options0[i][1]];
					var lowerLabel=label.toLowerCase();
					var labelPos=lowerLabel.indexOf(fieldDropDownTypedLetters);
					if(labelPos==0){ // starting with the typedletters	
						optionsFirst.push(newSingleOption);
					} else if (labelPos>0 && lowerLabel[labelPos-1]==NON_BREAKING_SPACE){ // has a word starting with typedletters
						optionsSecond.push(newSingleOption);			
					} else {
						optionsThird.push(newSingleOption);								
					}
				}
				for (var i = 0; i < optionsSecond.length; i++) {
						optionsFirst.push(optionsSecond[i]);
				}
				for (var i = 0; i < optionsThird.length; i++) {
						optionsFirst.push(optionsThird[i]);
				}
			 	// craete a new dropdown called NAME
				var field2=new Blockly.FieldDropdown(optionsFirst);
				input.appendField(field2, name);
		
			}
		}
	}
}

function handleKeyboardShortcuts(event) { // add a key 'r' that repeats the last used colour in the drawings
	var pressedKey=event.key.toLowerCase(); 
	var selected=Blockly.selected;
	refreshDynamicDropdownField(selected, pressedKey);
	if(selected!=null && selected.type.startsWith('m_draw_')) {
		if((pressedKey>='0' && pressedKey<='9')||(pressedKey>='q' && pressedKey<='z')) { // colour a block
			//getDrawingBlockCoordinate(Blockly.selected);
			//setDrawingBlockByCoordinate(getContainingList(Blockly.selected), 19, 19, pressedKey)
			//alert(pressedKey)
			setDrawingBlock(selected, pressedKey);
			//Blockly.Events.fire(new Blockly.Events.BlockChange(selected, 'field', 'tooltip', 'm_draw_0', 'm_draw_1'));
		}
		else if(pressedKey=='i' || pressedKey=='d' ) { // insert or delete a column
			var coord=getDrawingBlockCoordinate(selected)
			if(coord!=null){
				var mainList=getContainingList(selected);
				//alert(mainList.childBlocks_.length);
				var nLines=mainList.childBlocks_.length;
				var yPos = 0;
				for (var y = 0; y < nLines && yPos<200;) {  // 200 to avoid potential infinite loops
					//alert(coord.x+","+y);
					var inBlock=getDrawingBlockByCoordinate(mainList, coord.x, yPos);
					if(inBlock!=null){
						y++; //increment only when there is a subelement
						if(pressedKey=='d'){
							deleteDrawingBlock(inBlock);
						}else{
							insertDrawingBlock(inBlock);
						}
					}
					yPos++;
				}
			}
			//selected.setColour('#ff0000');
		}
		else if(lastSelectedDrawColBlock!=null && lastSelectedDrawColBlock.type.startsWith('m_draw_')){
			var coordStart=getDrawingBlockCoordinate(lastSelectedDrawColBlock);
			var coordEnd=getDrawingBlockCoordinate(selected);
			var mainList=getContainingList(selected)
			var id=lastSelectedDrawColBlock.type.substring('m_draw_'.length);
			if(coordStart!=null && coordEnd!=null){
				if(pressedKey=='l' ) { // draw line
						bresenham_draw_line (coordStart.x, coordStart.y, coordEnd.x, coordEnd.y, mainList, id);
				} else if(pressedKey=='b' ) { // draw rectangle
					bresenham_draw_line (coordStart.x, coordStart.y, coordEnd.x, coordStart.y, mainList, id);
					bresenham_draw_line (coordStart.x, coordStart.y, coordStart.x, coordEnd.y, mainList, id);
					bresenham_draw_line (coordStart.x, coordEnd.y, coordEnd.x, coordEnd.y, mainList, id);
					bresenham_draw_line (coordEnd.x, coordStart.y, coordEnd.x, coordEnd.y, mainList, id);
				} else if(pressedKey=='c' ) { // draw rectangle
					var dx=Math.abs(coordEnd.x - coordStart.x);
					var dy=Math.abs(coordEnd.y - coordStart.y);
					var radiusExp2=dx*dx+dy*dy;
					var radius=Math.sqrt(radiusExp2);
					var prevY=0;
					for (var x = coordStart.x-radius+1; x <= coordStart.x+radius; x+=1) {
						var y=Math.sqrt(radiusExp2-Math.pow(x-coordStart.x, 2));
						bresenham_draw_line (x-1, Math.round(coordStart.y+prevY), x, Math.round(coordStart.y+y), mainList, id);
						bresenham_draw_line (x-1, Math.round(coordStart.y-prevY), x, Math.round(coordStart.y-y), mainList, id);
				    	//setDrawingBlockByCoordinate(mainList, Math.round(x), Math.round(coordStart.y+y), id);
				    	//setDrawingBlockByCoordinate(mainList, Math.round(x), Math.round(coordStart.y-y), id);
				    	prevY=y;
				    	//window.alert(x +","+ y+",rad="+ radius +", start= "+coordStart.x +","+coordStart.y+'--->'+(radiusExp2-(x-coordStart.x)^2)+'-a->'+(x-coordStart.x)+'-b->'+Math.pow(x-coordStart.x,2)+'-xx>'+radiusExp2);	
					}
					
				} else if(pressedKey=='f' ) { // draw full block
					if(coordStart.y<coordEnd.y){
						for (var i = coordStart.y; i <= coordEnd.y; i++) {
							bresenham_draw_line (coordStart.x, i, coordEnd.x, i, mainList, id);						
						}
					} else {
						for (var i = coordEnd.y; i <= coordStart.y; i++) {
							bresenham_draw_line (coordStart.x, i, coordEnd.x, i, mainList, id);						
						}
						
					}
				} 
			}
		}
	}
}

function setDrawingBlock(selected, key) { 
	var oldType=selected.type;
	selected.type='m_draw_'+key;
	//selected.setColour(getColorForDrawCol(key));
	//alert(selected.type);
		currentlySelectedDrawColBlock=insertDrawingBlock(selected)
lastSelectedDrawColBlock=null; // global to keep track of the last selection
lastSelectedDrawColBlockColour=null;
		//lastSelectedDrawColBlockColour=lastSelectedDrawColBlock.getColour()
	    selected.type=oldType;
		deleteDrawingBlock(selected)
		

}

function insertDrawingBlock(selected) { 
	//var oldBlock=Code.workspace.getBlockById(event.blockId);
	var workspace=Code.workspace;
	var parent=selected.getParent();
	
	var newBlock = workspace.newBlock(selected.type);
	var coordinate = selected.getRelativeToSurfaceXY();
	newBlock.moveBy(coordinate.x, coordinate.y)

	//parent.setColour(23);
	//newBlock.setColour(100);
	newBlock.initSvg();
	newBlock.render();
	
	if(parent!=null) {
		var parentConnection = parent.getInputWithBlock(selected).connection;
		if(parentConnection!=null) {
			parentConnection.connect(newBlock.outputConnection);
		}
	}

	var newBlockchildConnection = newBlock.getInput('child').connection;
	newBlockchildConnection.connect(selected.outputConnection);
	return newBlock;	



}


function deleteDrawingBlock(selected) { 
	//var oldBlock=Code.workspace.getBlockById(event.blockId);
	var workspace=Code.workspace;
	var parent=selected.getParent();
	var child = selected.getInputTargetBlock('child');
	
	if(parent!=null && child!=null) {
		var parentConnection = parent.getInputWithBlock(selected).connection;
		if(parentConnection!=null) {
			parentConnection.connect(child.outputConnection);
		}
	}
	selected.dispose();		

}

function getDrawingBlockCoordinate(block){
	var x=0;
	var parent=block.getParent();
	while (parent!=null && parent.type.startsWith('m_draw_')) {
		x++;
		block=parent;
		parent=parent.getParent();
	}
	var coord=null;
	if(parent!=null){
		coord={'x':x, 'y':parseInt(parent.getInputWithBlock(block).name.substring(3))};
	}
	//window.alert(x +","+ 	parent.getInputWithBlock(block).name.substring(3));
	return coord;
}

function getContainingList(block){
	var parent=block.getParent();
	while (parent!=null && parent.type.startsWith('m_draw_')) {
		parent=parent.getParent();
	}
	return parent;
}

function setDrawingBlockByCoordinate(listBlock, x, y, id){
	//window.alert(x +","+ y);	
	var block = getDrawingBlockByCoordinate(listBlock, x, y)
	if(block!=null){
		setDrawingBlock(block, id);		
	}
}

function getDrawingBlockByCoordinate(listBlock, x, y){
	//window.alert(x +","+ y);	
	var block = listBlock.getInputTargetBlock('ADD'+y);
	for (var i = 0; i < x; i++) {
		if(block==null){
			break;
		}
		block=block.getInputTargetBlock('child');
	}
	return block;
}

function bresenham_draw_line (x1, y1, x2, y2, listBlock, id) {
	//alert(x1+','+y1+'    '+x2+','+y2)


    let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;

    // Calculate deltas
    dx = x2 - x1;
    dy = y2 - y1;

    // 
    dx1 = Math.abs(dx);
    dy1 = Math.abs(dy);

    // Calculate error intervals 
    px = 2 * dy1 - dx1;
    py = 2 * dx1 - dy1;

    // The line is X-axis dominant
    if (dy1 <= dx1) {

        // Line is drawn left to right
        if (dx >= 0) {
            x = x1; y = y1; xe = x2;
        } else { // Line is drawn right to left (swap )
            x = x2; y = y2; xe = x1;
        }

    	setDrawingBlockByCoordinate(listBlock, x, y, id)


        // Rasterize the line
        for (i = 0; x < xe; i++) {
            x = x + 1;

            // octants.
            if (px < 0) {
                px = px + 2 * dy1;
            } else {
                if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                    y = y + 1;
                } else {
                    y = y - 1;
                }
                px = px + 2 * (dy1 - dx1);
            }

        	setDrawingBlockByCoordinate(listBlock, x, y, id)
        }

    } else { //The line is Y-axis dominant

        //  bottom to top
        if (dy >= 0) {
            x = x1; y = y1; ye = y2;
        } else { // Line is drawn top to bottom
            x = x2; y = y2; ye = y1;
        }

    	setDrawingBlockByCoordinate(listBlock, x, y, id)

        // Rasterize 
        for (i = 0; y < ye; i++) {
            y = y + 1;

             if (py <= 0) {
                py = py + 2 * dx1;
            } else {
                if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
                    x = x + 1;
                } else {
                    x = x - 1;
                }
                py = py + 2 * (dx1 - dy1);
            }

        	setDrawingBlockByCoordinate(listBlock, x, y, id)
        }
    }
 }

function getColorForDrawCol(color){
	switch(color) {
	  case '0': return '#a9a9a9';
	    break;
	  case '1':
		  return '#e6194B';
	    break;
	  case '2':
		  return '#3cb44b';
	    break;
	  case '3':
		  return '#ffe119';
	    break;
	  case '4':
		  return '#4363d8';
	    break;
	  case '5':
		  return '#f58231';
	    break;
	  case '6':
		  return '#911eb4';
	    break;
	  case '7':
		  return '#42d4f4';
	    break;
	  case '8':
		  return '#f032e6';
	    break;
	  case '9':
		  return '#bfef45';
	    break;
	  case 'q':
		  return '#000000';
	    break;
	  case 'r':
		  return '#469990';
	    break;
	  case 's':
		  return '#dcbeff';
	    break;
	  case 't':
		  return '#9A6324';
	    break;
	  case 'u':
		  return '#fffac8';
	    break;
	  case 'v':
		  return '#800000';
	    break;
	  case 'w':
		  return '#aaffc3';
	    break;
	  case 'x':
		  return '#808000';
	    break;
	  case 'y':
		  return '#ffd8b1';
	    break;
	  case 'z':
		  return '#000075';
	    break;
	  default:
		  return '#000000';
	}
}


var lastSelectedDrawColBlock=null; // global to keep track of the last selection
var lastSelectedDrawColBlockColour=null;
var currentlySelectedDrawColBlock=null;
function blockClickedEventHandler(event){
	if (event.type == 'viewport_change' )return;
	  if (event.type == 'selected') {
		  var selected=Blockly.selected;
		  if(selected!=null && selected.type.startsWith('m_draw_')) {
			  if(lastSelectedDrawColBlock!=null){
				  lastSelectedDrawColBlock.setColour(lastSelectedDrawColBlockColour);				  
			  }
			  lastSelectedDrawColBlock=currentlySelectedDrawColBlock;
			  if(lastSelectedDrawColBlock!=null){
				  lastSelectedDrawColBlockColour=lastSelectedDrawColBlock.getColour();
		console.log(lastSelectedDrawColBlockColour);
				  lastSelectedDrawColBlock.setColour(Blockly.utils.colour.blend(lastSelectedDrawColBlockColour, '#ffffff', .5));
			  }
			  currentlySelectedDrawColBlock=selected;
		  }
	  }
}


