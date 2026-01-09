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
  'it': 'Italian (Italiano)',
  'fr': 'French (Français)',
  'de': 'German (Deutsch)',
  'he': 'Hebrew (עברית)',
  'ar': 'Arabic (العربية)',
  'cs': 'Czech (Česky)',
  'da': 'Danish (Dansk)',
  'el': 'Greek (Ελληνικά)',
  'es': 'Spanish (Español)',
  'et': 'Estonian (Eesti)',
  'fa': 'Persian (فارسی)',
  'hr': 'Croatian (Hrvatski)',
  'hu': 'Hungarian (Magyar)',
  'is': 'Icelandic (Íslenska)',
  'ja': 'Japanese (日本語)',
  'ko': 'Korean (한국어)',
  'mk': 'Macedonian (Македонски)',
  'ms': 'Malay (Bahasa Melayu)',
  'nb': 'Norwegian (Norsk Bokmål)',
  'nl': 'Dutch (Nederlands)',
  'pl': 'Polish (Polski)',
  'pt-br': 'Portuguese (Português)',
  'ro': 'Romanian (Română)',
  'ru': 'Russian (Русский)',
  'sk': 'Slovak (Slovenčina)',
  'sv': 'Swedish (Svenska)',
  'ta': 'Tamil (தமிழ்)',
  'th': 'Thai (ภาษาไทย)',
  'tr': 'Turkish (Türkçe)',
  'uk': 'Ukrainian (Українська)',
  'vi': 'Vietnamese (Tiếng Việt)',
  'zh-hans': 'Chinese Simplified (简体中文)',
  'zh-hant': 'Chinese Traditional (正體中文)',
  'az': 'Azerbaijani (Azərbaycanca)',
  'be': 'Belarusian (Беларуская)',
  'bg': 'Bulgarian (Български)',
  'fi': 'Finnish (Suomi)',
  'hi': 'Hindi (हिन्दी)',
  'hy': 'Armenian (Հայերեն)',
  'id': 'Indonesian (Bahasa Indonesia)',
  'ig': 'Igbo (Igbo)',
  'kn': 'Kannada (ಕನ್ನಡ)',
  'lo': 'Lao (ລາວ)',
  'lt': 'Lithuanian (Lietuvių)',
  'lv': 'Latvian (Latviešu)',
  'sl': 'Slovenian (Slovenščina)',
  'sq': 'Albanian (Shqip)',
  'sr': 'Serbian (Српски)',
  'tl': 'Filipino (Filipino)',
  'yo': 'Yoruba (Yorùbá)'
};

Code.LANGUAGE_NAME_originalList = {
  'ar': 'العربية',
  'be-tarask': 'Taraškievica',
  'br': 'Brezhoneg',
  'ca': 'Català',
  'cs': 'Česky',
  'da': 'Dansk',
  'de': 'Deutsch',
  'el': 'Ελληνικά',
  'en': 'English',
  'es': 'Español',
  'et': 'Eesti',
  'fa': 'فارسی',
  'fr': 'Français',
  'he': 'עברית',
  'hr': 'Hrvatski',
  'hrx': 'Hunsrik',
  'hu': 'Magyar',
  'ia': 'Interlingua',
  'is': 'Íslenska',
  'it': 'Italiano',
  'ja': '日本語',
  'kab': 'Kabyle',
  'ko': '한국어',
  'mk': 'Македонски',
  'ms': 'Bahasa Melayu',
  'nb': 'Norsk Bokmål',
  'nl': 'Nederlands, Vlaams',
  'oc': 'Lenga d\'òc',
  'pl': 'Polski',
  'pms': 'Piemontèis',
  'pt-br': 'Português Brasileiro',
  'ro': 'Română',
  'ru': 'Русский',
  'sc': 'Sardu',
  'sk': 'Slovenčina',
  'sr': 'Српски',
  'sv': 'Svenska',
  'ta': 'தமிழ்',
  'th': 'ภาษาไทย',
  'tlh': 'tlhIngan Hol',
  'tr': 'Türkçe',
  'uk': 'Українська',
  'vi': 'Tiếng Việt',
  'zh-hans': '简体中文',
  'zh-hant': '正體中文'
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
 * holder for data sent via httpRequests. Avoid potential issues with deallocationg the resource before sending
 */
Code.formData = null;

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
Code.TABS_ = ['blocks', 'log', 'xml', 'text'];

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
  //remove codemirror
  disposeCodeMirrorChildren();
  document.getElementById('codeMirrorContainer').style.visibility = 'hidden';


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
  } else if (content.id == 'content_log') {
	Code.runJS(); //upload the code so we get the clean version back
	setTimeout(() => {
	  Code.loadLog(); // wait to give time to the server to parse the code
	}, 1000);

  } else if (content.id == 'content_text') {
	var textTabTextarea = document.getElementById('content_text');
	   textTabTextarea.value =convertBlocksToTextIndented(Blockly.getMainWorkspace());		
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
	
	// switch toolboxes according to version toolboxV1 or toolboxV2
	var toolboxVersion=Code.getStringParamFromUrl('version', 'ver1');
	const selectedToolbox = document.getElementById('toolbox_'+toolboxVersion);
	selectedToolbox.id = 'toolbox'; // Rename
	versionSelect.value = toolboxVersion;
	
	// On change, reload with selected version
	  versionSelect.addEventListener('change', function () {
	    window.location.search = '?version=' + this.value;
	  });
	
	
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
      function() {Code.discard(); Code.renderContent(); location.reload()});
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
  setTimeout(Code.loadExamplesList, 500);  // speed up loading of main page. Wait loading the examples

  //setUpModalForShowingExamples();

  Code.serverNeedsUpdate=true;
  Code.workspace.addChangeListener(setServerNeedsUpdate);
  window.onkeypress =handleKeyboardShortcuts;
    Code.workspace.addChangeListener(blockClickedEventHandler) 
    //Code.workspace.addChangeListener(fieldDropDownResetListEventHandler) 
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
			var outxml ="";
		    try {
	 			outxml = Blockly.Xml.textToDom(reader.result);
	 		} catch (e) {
	 			window.alert("ERROR: "+e);
		    }
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

		   var code = Blockly.Python.workspaceToCode(Code.workspace);
		   var xmlCodeDom = Blockly.Xml.workspaceToDom(Code.workspace);
		   var xmlCode = Blockly.Xml.domToText(xmlCodeDom);
		   var host='http://'+ Code.remoteHost; 	   
		   var hpath=host+'/EXE';
		   
		   //postToServer('/EXE', {'EXECODE': code});
		   //postToServer(playerName, host+':'+port+'/EXE', {'EXECODE': code , 'Playername':playerName});
		   Code.formData = new FormData();
		   Code.formData.append('EXECODE', code);
		   Code.formData.append('XMLCODE', xmlCode);
		   Code.formData.append('Playername', playerName);
		   Code.formData.append('langsel', Code.getLanguage());


		   
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
		   xhr.send(Code.formData);	   
		   
		   //window.alert(MSG['info_deploySuccess'].replace('%1', host).replace('%2', playerName)+" ("+port+")");
		   //location.reload(); // force reload of page
	    
   }
};


function disposeCodeMirrorChildren() {
  const container = document.getElementById('codeMirrorContainer');
  const keep = document.getElementById('content_log');

  // Loop through children and remove everything except #content_log
  Array.from(container.children).forEach(child => {
    if (child !== keep) {
      container.removeChild(child);
    }
  });
}


Code.loadLog = function() {
	var codeMirrorContainer=document.getElementById('codeMirrorContainer');
	var content_blocks=document.getElementById('content_blocks');
	codeMirrorContainer.style.top = content_blocks.style.top;
	codeMirrorContainer.style.width = content_blocks.style.width;
	codeMirrorContainer.style.height = content_blocks.style.height;
	codeMirrorContainer.style.visibility = 'visible';


	var nameField=document.getElementById('playernamefield');
	var playerName=nameField.value.trim();
	var logTextarea = document.getElementById('content_log');
	var host='http://'+ Code.remoteHost; 	   
	var hpath=host+'/LOG';
	Code.formData = new FormData(); 
	Code.formData.append('Playername', playerName);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", hpath, true); 
	xhr.timeout = 5000; 
	xhr.onload=function(event){
		logTextarea.value =xhr.responseText; 
	}; 
	xhr.onerror=function(event){ 
	   logTextarea.value ='ERROR Connecting server\n'+xhr.responseText+"\n\nRaw code is\n"+Blockly.Python.workspaceToCode(Code.workspace);
       console.log('ERROR Connecting server\n'+xhr.responseText)


	}; 
	xhr.ontimeout = function (e) {
	   logTextarea.value ="TIMEOUT Connecting server\n  "+xhr.responseText; 
       console.log('TIMEOUT Connecting server\n'+xhr.responseText)
	};
 	
	 // track completion: both successful or not
	 xhr.onloadend = function() {
	   if (xhr.status == 200) {

		var editor=CodeMirror.fromTextArea(logTextarea, {
		    mode: "python",
		    lineNumbers: true,
		    readOnly: true,
		    theme: "default"
		  });
		editor.getWrapperElement().style.height = "100%";
		editor.refresh();
	    } else {
	      console.log("error uploading " + this.status);
	    }
	  };
	logTextarea.value ='Loading log file'; 
	xhr.send(Code.formData);  
};

Code.loadExamplesList = function() {
	var host='http://'+ Code.remoteHost; 	      
	var hpath=host+'/EXL';
	Code.formData = new FormData(); 
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
	xhr.send(Code.formData);	   
};

Code.loadExampleXML = function(xmlFile) {
	var host='http://'+ Code.remoteHost; 
	var hpath=host+'/EXF?EF='+xmlFile;
	Code.formData = new FormData(); 
	var xhr = new XMLHttpRequest();
	xhr.open("POST", hpath, true); 
	xhr.timeout = 2000; 
	xhr.onload=function(event){
		var outxml ="";
	    try {
 			outxml = Blockly.Xml.textToDom(xhr.responseText);
 		} catch (e) {
 			window.alert("ERROR: "+e);
	    }
	
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
	xhr.send(Code.formData);	   
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
		const ALGORITHMS_FOLDER='algorithms';
		for (var i = 0; i < nrExampleGroups; i++) {
			var firstExampleName=exampleGroupsArr[i];
				//console.log("file>"+firstExampleName+"<");
			if(firstExampleName!=null && firstExampleName.length>0){
				var parentExampleFolder=firstExampleName.substring(firstExampleName.indexOf('/')+1);
				var exampleFolder=parentExampleFolder.substring(0, parentExampleFolder.indexOf('/'));
				//console.log("folder>"+exampleFolder+"<");
				var table=null;
			    if(exampleFolder==ALGORITHMS_FOLDER){
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
	      img.src = 'http://'+ Code.remoteHost +'/EXF?EF='+exampleName+".png";
		  var parentExampleFolder=exampleName.substring(exampleName.indexOf('/')+1);
		  var basicName=parentExampleFolder.substring(parentExampleFolder.indexOf('/')+1);
		  var title=basicName.replace(/^[0-9]*/, ""); //remove digits at the beginning used for ordering the files
		  title=title.replace(/-.*/, ""); //remove anything after a dash. Typically the creation date 
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
window.onblur = function () {
  setTimeout(function () {
    if (Code.serverNeedsUpdate) {
      Code.runJS();
	  document.getElementById('playernamefield').onblur = function() {
	  	Code.serverNeedsUpdate=true;
	  }
	 }

  }, 1000); // 1 second
};



// DRAWING HANDLING




function shiftRowsDownAndCloneSelectedBlockRow(block) {
    const itemCount = block.itemCount_; // Get the current number of rows
    //console.log(`Initial item count: ${itemCount}`);

    // Step 1: Identify the currently selected block
    const selectedBlock = getFirstInRow(Blockly.selected); // Get the currently selected block

    if (!selectedBlock) {
        //console.log('No block is currently selected');
        return;
    }

    //console.log(`Selected block: ${selectedBlock.type}`);

    // Step 2: Find the row that contains the selected block
    let startingRowIndex = -1;
    for (let i = 0; i < itemCount; i++) {
        const inputName = 'ADD' + i;
        const connection = block.getInput(inputName)?.connection;
        const connectedBlock = connection?.targetBlock();

        if (connectedBlock === selectedBlock) {
            startingRowIndex = i;
            //console.log(`Selected block is in row ${i} (${inputName})`);
            break;
        }
    }

    if (startingRowIndex === -1) {
        //console.log('Selected block is not connected to this list block');
        return;
    }

    // Step 3: Clone the block from the selected row
    const cloneRowInputName = 'ADD' + startingRowIndex;
    const cloneConnection = block.getInput(cloneRowInputName)?.connection;
    const cloneBlock = cloneConnection?.targetBlock();

    if (!cloneBlock) {
        //console.log(`No block found in the selected row to clone`);
        return;
    }

    // Serialize the block to XML and then create a new block from it
    const xml = Blockly.Xml.blockToDom(cloneBlock);
    const clonedBlock = Blockly.Xml.domToBlock(xml, block.workspace);
    //console.log(`Cloned block from row ${startingRowIndex}: ${clonedBlock.type}`);

    // Step 4: Add a new row at the end to make space
    const newInputName = 'ADD' + itemCount;
    block.appendValueInput(newInputName)
        .setCheck(null);
    block.itemCount_ += 1;

    //console.log(`Added new row: ${newInputName}, Total rows after adding: ${block.itemCount_}`);
	var currentInputName;
    // Step 5: Shift each row starting from the row with the selected block
    for (let i = itemCount; i > startingRowIndex; i--) { // Shift rows starting from the row with the selected block
        currentInputName = 'ADD' + (i - 1);
        const nextInputName = 'ADD' + i;

        //console.log(`Shifting row ${i - 1} (${currentInputName}) to row ${i} (${nextInputName})`);

        // Get the block connected to the current row
        const currentConnection = block.getInput(currentInputName)?.connection;
        const connectedBlock = currentConnection?.targetBlock();

        // If there's a block connected to the current row, move it down to the next row
        if (connectedBlock) {
            //console.log(`Moving block from row ${i - 1} (${currentInputName}) to row ${i} (${nextInputName})`);

            const nextConnection = block.getInput(nextInputName)?.connection;
            nextConnection.connect(connectedBlock.outputConnection); // Move the block to the next row

            //console.log(`Block moved to ${nextInputName}`);

            //currentConnection.disconnect(); // Clear the original connection
            //console.log(`Cleared original connection at row ${i - 1} (${currentInputName})`);
        } else {
            //console.log(`No block connected to row ${i - 1} (${currentInputName})`);
        }
    }

    // Step 6: Move the cloned block to the new row
    const newConnection = block.getInput(currentInputName)?.connection;
    newConnection.connect(clonedBlock.outputConnection);
    //console.log(`Moved cloned block to new row ${newInputName}`);

    //console.log('Shift operation completed');
}



function deleteRowContainingSelectedBlock(block) {
    // Step 1: Identify the currently selected block
    var selectedBlock = Blockly.selected; // Get the currently selected block

    if (!selectedBlock) {
        //console.log('No block is currently selected');
        return;
    }
	selectedBlock=getFirstInRow(selectedBlock); 
    //console.log(`Selected block: ${selectedBlock.type}`);

    // Step 2: Find the row that contains the selected block
    let rowIndex = -1;
    const itemCount = block.itemCount_; // Get the current number of rows

    for (let i = 0; i < itemCount; i++) {
        const inputName = 'ADD' + i;
        const connection = block.getInput(inputName)?.connection;
        const connectedBlock = connection?.targetBlock();

        if (connectedBlock === selectedBlock) {
            rowIndex = i;
            //console.log(`Selected block is in row ${i} (${inputName})`);
            break;
        }
    }

    if (rowIndex === -1) {
        //console.log('Selected block is not connected to this list block');
        return;
    }

    // Step 3: Disconnect the block from the input
    const inputNameToDelete = 'ADD' + rowIndex;
    const connectionToDelete = block.getInput(inputNameToDelete)?.connection;
    const blockToDelete = connectionToDelete?.targetBlock();

    if (blockToDelete) {
        //console.log(`Disconnecting block from row ${rowIndex} (${inputNameToDelete})`);
        connectionToDelete.disconnect(); // Disconnect the block
        blockToDelete.dispose(); // Disconnect the block
    }

    // Step 4: Shift each row up starting from the row below the deleted row
    for (let i = rowIndex + 1; i <= itemCount; i++) {
        const currentInputName = 'ADD' + i;
        const previousInputName = 'ADD' + (i - 1);

        //console.log(`Shifting row ${i} (${currentInputName}) to row ${i - 1} (${previousInputName})`);

        const currentConnection = block.getInput(currentInputName)?.connection;
        const connectedBlock = currentConnection?.targetBlock();

        if (connectedBlock) {
            const previousConnection = block.getInput(previousInputName)?.connection;
            previousConnection.connect(connectedBlock.outputConnection); // Move the block up
            //console.log(`Moved block from row ${i} to row ${i - 1}`);
        }
    }

    // Step 5: Remove the input for the deleted row and adjust item count
    //block.removeInput(inputNameToDelete);
    block.itemCount_ -= 1; // Decrease the item count
	//Code.workspace.render(); // Re-render the workspace
	//block.bumpNeighbours(); // Ensure connections are correctly updated
	//block.render();
	//block.workspace.resizeContents();
	window.location.reload(); //nothing else works

    //console.log(`Removed row ${rowIndex}, Total rows after deletion: ${block.itemCount_}`);
}


// Function to define the custom context menu
function addCustomContextMenuToDrawingBlocks(block, options) {
    // Clear the default options
    options.length = 0; // This removes any default options Blockly might add

    // Insert row option
    var insertRowOption = {
        text: "Insert Row (I)",
        enabled: true,
        callback: function() {
            console.log('Insert Row clicked');
            shiftRowDown(block); // Calls the refactored function for row insertion
        }
    };
    options.push(insertRowOption);

    // Delete row option
    var deleteRowOption = {
        text: "Delete Row (D)",
        enabled: true,
        callback: function() {
            console.log('Delete Row clicked');
            deleteRow(block); // Calls the refactored function for row deletion
        }
    };
    options.push(deleteRowOption);

    // Insert column option
    var insertColumnOption = {
        text: "Insert Column (i)",
        enabled: true,
        callback: function() {
            console.log('Insert Column clicked');
            handleColumnInsertOrDelete('i', block); // Calls the refactored function to insert column
        }
    };
    options.push(insertColumnOption);

    // Delete column option
    var deleteColumnOption = {
        text: "Delete Column (d)",
        enabled: true,
        callback: function() {
            console.log('Delete Column clicked');
            handleColumnInsertOrDelete('d', block); // Calls the refactored function to delete column
        }
    };
    options.push(deleteColumnOption);

    // Draw line option
    var drawLineOption = {
        text: "Draw Line (l)",
        enabled: true,
        callback: function() {
            console.log('Draw Line clicked');
            handleShapeDrawing('l', block); // Calls the refactored function to draw a line
        }
    };
    options.push(drawLineOption);

    // Draw rectangle option
    var drawRectangleOption = {
        text: "Draw Rectangle (r)",
        enabled: true,
        callback: function() {
            console.log('Draw Rectangle clicked');
            handleShapeDrawing('b', block); // Calls the refactored function to draw a rectangle
        }
    };
    options.push(drawRectangleOption);

    // Draw circle option
    var drawCircleOption = {
        text: "Draw Circle (c)",
        enabled: true,
        callback: function() {
            console.log('Draw Circle clicked');
            handleShapeDrawing('c', block); // Calls the refactored function to draw a circle
        }
    };
    options.push(drawCircleOption);

    // Fill block option
    var fillBlockOption = {
        text: "Fill Block (f)",
        enabled: true,
        callback: function() {
            console.log('Fill Block clicked');
            handleShapeDrawing('f', block); // Calls the refactored function to fill the block
        }
    };
    options.push(fillBlockOption);
}

// Main function handling keyboard shortcuts
function handleKeyboardShortcuts(event) {
    var pressedKey = event.key;
    var selected = Blockly.selected;

    if (selected != null && selected.type.startsWith('m_draw_')) {
        handleDrawingBlockActions(pressedKey, selected);
    }
}

// Handles actions for drawing blocks
function handleDrawingBlockActions(pressedKey, selected) {
    if (isColorKey(pressedKey)) {
        setDrawingBlock(selected, pressedKey);
    } else if (pressedKey == 'I') {
        shiftRowDown(selected);
    } else if (pressedKey == 'D') {
        deleteRow(selected);
    } else if (pressedKey == 'i' || pressedKey == 'd') {
        handleColumnInsertOrDelete(pressedKey, selected);
    } else if (lastSelectedDrawColBlock != null && lastSelectedDrawColBlock.type.startsWith('m_draw_')) {
        handleShapeDrawing(pressedKey, selected);
    }
}

// Checks if the pressed key is a valid color key
function isColorKey(key) {
    return (key >= '0' && key <= '9');
}

// Shifts rows down starting from the row containing the selected block
function shiftRowDown(selected) {
    var mainList = getContainingList(selected);
    shiftRowsDownAndCloneSelectedBlockRow(mainList);
}

// Deletes the row containing the selected block
function deleteRow(selected) {
    var mainList = getContainingList(selected);
    deleteRowContainingSelectedBlock(mainList);
}

// Handles inserting or deleting a column
function handleColumnInsertOrDelete(pressedKey, selected) {
    var coord = getDrawingBlockCoordinate(selected);
    var mainList = getContainingList(selected);

    if (coord != null) {
        processColumnChange(pressedKey, coord.x, mainList);
    }
}

// Processes column insertion or deletion
function processColumnChange(pressedKey, xCoord, mainList) {
    var nLines = mainList.childBlocks_.length;
    var yPos = 0;

    for (var y = 0; y < nLines && yPos < 200; ) { // Limit to 200 loops to avoid infinite loop
        var inBlock = getDrawingBlockByCoordinate(mainList, xCoord, yPos);
        if (inBlock != null) {
            y++;
            if (pressedKey == 'd') {
                deleteDrawingBlock(inBlock);
            } else {
                insertDrawingBlock(inBlock);
            }
        }
        yPos++;
    }
}

// Handles drawing shapes like lines, rectangles, circles, and filled blocks
function handleShapeDrawing(pressedKey, selected) {
    var coordStart = getDrawingBlockCoordinate(lastSelectedDrawColBlock);
    var coordEnd = getDrawingBlockCoordinate(selected);
    var mainList = getContainingList(selected);
    var id = lastSelectedDrawColBlock.type.substring('m_draw_'.length);

    if (coordStart != null && coordEnd != null) {
        if (pressedKey == 'l') {
            drawLine(coordStart, coordEnd, mainList, id);
        } else if (pressedKey == 'b') {
            drawRectangle(coordStart, coordEnd, mainList, id);
        } else if (pressedKey == 'c') {
            drawCircle(coordStart, coordEnd, mainList, id);
        } else if (pressedKey == 'f') {
            fillBlock(coordStart, coordEnd, mainList, id);
        }
    }
}

// Draws a line using Bresenham's algorithm
function drawLine(coordStart, coordEnd, mainList, id) {
    bresenham_draw_line(coordStart.x, coordStart.y, coordEnd.x, coordEnd.y, mainList, id);
}

// Draws a rectangle by connecting four lines
function drawRectangle(coordStart, coordEnd, mainList, id) {
    bresenham_draw_line(coordStart.x, coordStart.y, coordEnd.x, coordStart.y, mainList, id);
    bresenham_draw_line(coordStart.x, coordStart.y, coordStart.x, coordEnd.y, mainList, id);
    bresenham_draw_line(coordStart.x, coordEnd.y, coordEnd.x, coordEnd.y, mainList, id);
    bresenham_draw_line(coordEnd.x, coordStart.y, coordEnd.x, coordEnd.y, mainList, id);
}

// Draws a circle using Bresenham's algorithm for circles
function drawCircle(coordStart, coordEnd, mainList, id) {
    var dx = Math.abs(coordEnd.x - coordStart.x);
    var dy = Math.abs(coordEnd.y - coordStart.y);
    var radiusExp2 = dx * dx + dy * dy;
    var radius = Math.sqrt(radiusExp2);
    var prevY = 0;

    for (var x = coordStart.x - radius + 1; x <= coordStart.x + radius; x += 1) {
        var y = Math.sqrt(radiusExp2 - Math.pow(x - coordStart.x, 2));
        bresenham_draw_line(x - 1, Math.round(coordStart.y + prevY), x, Math.round(coordStart.y + y), mainList, id);
        bresenham_draw_line(x - 1, Math.round(coordStart.y - prevY), x, Math.round(coordStart.y - y), mainList, id);
        prevY = y;
    }
}

// Fills a block by drawing multiple horizontal lines
function fillBlock(coordStart, coordEnd, mainList, id) {
    if (coordStart.y < coordEnd.y) {
        for (var i = coordStart.y; i <= coordEnd.y; i++) {
            bresenham_draw_line(coordStart.x, i, coordEnd.x, i, mainList, id);
        }
    } else {
        for (var i = coordEnd.y; i <= coordStart.y; i++) {
            bresenham_draw_line(coordStart.x, i, coordEnd.x, i, mainList, id);
        }
    }
}

function setDrawingBlock(selected, key) { 
	var oldType=selected.type;
	selected.type='m_draw_'+key;
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
	//window.alert(x +","+ 	parent.getInputWithBlock(block).name);
	return coord;
}

function getContainingList(block){
	var parent=block.getParent();
	while (parent!=null && parent.type.startsWith('m_draw_')) {
		parent=parent.getParent();
	}
	return parent;
}

function getFirstInRow(block){
	var parent=block.getParent();
	while (parent!=null && parent.type.startsWith('m_draw_')) {
		block=parent;
		parent=parent.getParent();
	}
	return block;
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
		//console.log(lastSelectedDrawColBlockColour);
				  lastSelectedDrawColBlock.setColour(Blockly.utils.colour.blend(lastSelectedDrawColBlockColour, '#ffffff', .5));
			  }
			  currentlySelectedDrawColBlock=selected;
		  }
	  }
}

class FieldDropdownWithSearch extends Blockly.FieldDropdown {
    constructor(options) {
        super(options);
        this.searchInput = null;
        this.dropdownDiv = null;
    }

    showEditor_() {
        super.showEditor_();

        // Get the dropdown div created by Blockly
        this.dropdownDiv = Blockly.DropDownDiv.getContentDiv();

        // Create and inject the search input at the top of the dropdown
        this.searchInput = document.createElement('input');
        this.searchInput.setAttribute('type', 'text');
        this.searchInput.setAttribute('placeholder', 'Search...');
        this.searchInput.style.width = '95%';
        this.searchInput.style.marginBottom = '5px';
        this.dropdownDiv.insertBefore(this.searchInput, this.dropdownDiv.firstChild);

        // Add event listener to the search input for filtering
        this.searchInput.addEventListener('input', (e) => {
            this.filterOptions(e.target.value);
        });

        // Ensure the search input is focused after a small delay
        setTimeout(() => {
            this.searchInput.focus();
        }, 100); // Small delay to avoid focus interruption
    }

    filterOptions(query) {
        const normalizedQuery = query.toLowerCase();
        const filteredOptions = this.getOptions(true) // Get current options
            .filter(option => option[0].toLowerCase().includes(normalizedQuery));

        // Remove all options from dropdown and re-add the filtered ones
        const contentDiv = Blockly.DropDownDiv.getContentDiv();
        contentDiv.innerHTML = ''; // Clear previous options
        contentDiv.appendChild(this.searchInput); // Keep the search input

        filteredOptions.forEach((option) => {
            const optionDiv = document.createElement('div');
            optionDiv.innerText = option[0];
            optionDiv.className = 'blocklyDropdownMenuItem';
            optionDiv.style.padding = '5px';
            optionDiv.addEventListener('click', () => {
                this.setValue(option[1]); // Set the value on click
                Blockly.DropDownDiv.hideIfOwner(this);
            });
            contentDiv.appendChild(optionDiv);
        });
        setTimeout(() => {
            this.searchInput.focus();
        }, 100); // Small delay to avoid focus interruption

    }
}

