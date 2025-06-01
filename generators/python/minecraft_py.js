/**
 * @fileoverview Generating JavaScript for logic blocks.
 * @author Lauro Canonica
 */
'use strict';

function addDictionaryEntry(inText){
	var outText="";
	if(inText!=""){
		outText+=", ";
		outText+=inText.substring(2); // remove leading '[{'
	} else {
		outText="}]";
	}
	return outText;
}




function closeDictionaryEntry(inText){ // after a TYPE definitions we begin a new dictionary
	var outText="";
	if(inText!=""){
		outText+="},  ";
		outText+=inText.substring(1); // remove leading '['
	} else {
		outText="}]";
	}
	return outText;
}

var TAB_SPACES ='  ';
function optimizeMaterialList(value_name) {
	var materialList='';
	if(value_name.includes(', "TYPE"')){ //else when we have simple {"TYPE":"b.acacia_fence_gate"} we transform it in a string
		materialList= '\n'+TAB_SPACES+value_name;		
	} else { // transform all occurences of {"TYPE":"b.acacia_fence_gate"} into "b.acacia_fence_gate"
		materialList=value_name.replaceAll(TAB_SPACES, '').replaceAll('{"TYPE":', '').replaceAll('}', '').replaceAll('\n', ' ');
	}
	if(!materialList.includes('},')){ // if there is only one dictionary block, write it on one line
		materialList=materialList.replaceAll("\n", "").replaceAll(TAB_SPACES, '');
	} 
	
	return materialList;
}


function sanitizePythonFunctionName(name) {
  // change to underscore all characters except letters, digits, and underscores
  var clean = name.replace(/[^a-zA-Z0-9_]/g, '_');

  // If it starts with a digit, prefix with an underscore
  if (/^[0-9]/.test(clean)) {
    clean = 'my_' + clean;
  }

  return clean;
}


function addReplaceCommasAndSemicolons(){ // to be deleted
		return'.replaceAll(",","&#44").replaceAll(";","&#59")'; // replace commas and semicolumns
	};

Blockly.Python['minecraft_multiciplity'] = function(block) {
	var number_mutiplicity = block.getFieldValue('mutiplicity');
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"AMOUNT":"'+number_mutiplicity+'"'+addDictionaryEntry(value_singleblock);
	return [ code, Blockly.Python.ORDER_NONE ];
};

Blockly.Python['minecraft_multiciplity_var'] = function(block) {
	var variable_mutiplicity = Blockly.Python.variableDB_.getName(block.getFieldValue('mutiplicity'), Blockly.Variables.NAME_TYPE);
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"AMOUNT":'+variable_mutiplicity+addDictionaryEntry(value_singleblock);
	return [ code, Blockly.Python.ORDER_NONE ];
};

Blockly.Python['minecraft_delay'] = function(block) {
	var number_delay = block.getFieldValue('delay');
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"DELAY":"'+number_delay+'"'+addDictionaryEntry(value_singleblock);
	return [ code, Blockly.Python.ORDER_NONE ];
};

Blockly.Python['minecraft_delay_var'] = function(block) {
	var variable_delay = Blockly.Python.variableDB_.getName(block.getFieldValue('delay'), Blockly.Variables.NAME_TYPE);
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"DELAY":'+variable_delay+addDictionaryEntry(value_singleblock);
	return [ code, Blockly.Python.ORDER_NONE ];
};

Blockly.Python['minecraft_delay_random'] = function(block) {
	var min = block.getFieldValue('min');
	var max = block.getFieldValue('max');
	var number_delay = min+', '+max;
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"DELAY":"'+number_delay+'"'+addDictionaryEntry(value_singleblock);
	return [ code, Blockly.Python.ORDER_NONE ];
};

Blockly.Python['minecraft_delay_random_var'] = function(block) {
	var min = Blockly.Python.variableDB_.getName(block.getFieldValue('min'), Blockly.Variables.NAME_TYPE);
	var max = Blockly.Python.variableDB_.getName(block.getFieldValue('max'), Blockly.Variables.NAME_TYPE);
	var number_delay ="str("+min+")"+'+", "+ str('+max+")";
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"DELAY":'+number_delay+addDictionaryEntry(value_singleblock);
	return [ code, Blockly.Python.ORDER_NONE ];
};


Blockly.Python['minecraft_delay_reset_random'] = function(block) {
	  var number_seed = block.getFieldValue('seed');
	  var code = "vm.setTimeRandomSeed(" + number_seed + ");\n";
	  return code;
	};




Blockly.Python['minecraft_item'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};

Blockly.Python['minecraft_item_op'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};


Blockly.Python['minecraft_polygon'] = function(block) {
	var dropdown_fill = block.getFieldValue('fill');
	var value_nr_sides = Blockly.Python.valueToCode(block, 'nr_sides', Blockly.Python.ORDER_NONE);
	var value_sidelength = Blockly.Python.valueToCode(block, 'sideLength', Blockly.Python.ORDER_NONE);
	var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	var code = 'vm.createPolygon(';
	code += value_nr_sides + ", ";
	code += value_sidelength + ", ";
	code += value_sidelength + ", ";
	code += "360, ";
	code += convertFillToBoolean(dropdown_fill) + ", ";
	code += optimizeMaterialList(value_name);
	code += ");\n";
	return code;
};

Blockly.Python['minecraft_star'] = function(block) {
	var dropdown_fill = block.getFieldValue('fill');
	var value_nr_sides = Blockly.Python.valueToCode(block, 'nr_sides', Blockly.Python.ORDER_NONE);
	var value_innerRadius = Blockly.Python.valueToCode(block, 'innerRadius', Blockly.Python.ORDER_NONE);
	var value_outerRadius = Blockly.Python.valueToCode(block, 'outerRadius', Blockly.Python.ORDER_NONE);
	var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	var code = 'vm.createStar(';
	code += value_nr_sides + ", ";
	code += value_innerRadius + ", ";
	code += value_outerRadius + ", ";
	code += convertFillToBoolean(dropdown_fill) + ", ";
	code += optimizeMaterialList(value_name);
	code += ");\n";
	return code;
};

	Blockly.Python['minecraft_rectangle'] = function(block) {
		  var dropdown_fill = block.getFieldValue('fill');
		  var value_width = Blockly.Python.valueToCode(block, 'width', Blockly.Python.ORDER_NONE);
		  var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_NONE);
		  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
			var code = 'vm.createRectangle(';
			code += value_width + ", ";
			code += value_height + ", ";
			code += convertFillToBoolean(dropdown_fill) + ", ";
			code += optimizeMaterialList(value_name);
			code += ");\n";
			return code;
		};
		
	Blockly.Python['minecraft_ellipse'] = function(block) {
		  var dropdown_fill = block.getFieldValue('fill');
		  var radiusX = Blockly.Python.valueToCode(block, 'width', Blockly.Python.ORDER_NONE);
		  var radiusY = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_NONE);
		  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
			var code = 'vm.createPolygon(100, ';
			code += radiusX + ", ";
			code += radiusY + ", ";
			code += "360, ";
			code += convertFillToBoolean(dropdown_fill) + ", ";
			code += optimizeMaterialList(value_name);
			code += ");\n";
			return code;
		}; 




// Generator for Circle shape
Blockly.Python['minecraft_circle_shape'] = function(block) {
  var dropdown_fill = block.getFieldValue('FILL');
  var value_radius = Blockly.Python.valueToCode(block, 'RADIUS', Blockly.Python.ORDER_NONE);
  var value_name = Blockly.Python.valueToCode(block, 'MATERIAL', Blockly.Python.ORDER_NONE);
  var code = 'vm.createPolygon(100, ';
  code += value_radius + ", None, ";
  code += "360, ";
  code += convertFillToBoolean(dropdown_fill) + ", ";
  code += optimizeMaterialList(value_name);
  code += ");\n";
  return code;
};

// Generator for Square shape
Blockly.Python['minecraft_square_shape'] = function(block) {
  var dropdown_fill = block.getFieldValue('FILL');
  var value_sideLength = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_NONE);
  var value_name = Blockly.Python.valueToCode(block, 'MATERIAL', Blockly.Python.ORDER_NONE);
  var code = 'vm.createRectangle(';
  code += value_sideLength + ", None, ";
  code += convertFillToBoolean(dropdown_fill) + ", ";
  code += optimizeMaterialList(value_name);
  code += ");\n";
  return code;
};

// Generator for Line shape
Blockly.Python['minecraft_line_shape'] = function(block) {
  var value_length = Blockly.Python.valueToCode(block, 'LENGTH', Blockly.Python.ORDER_NONE);
  var value_name = Blockly.Python.valueToCode(block, 'MATERIAL', Blockly.Python.ORDER_NONE);
  var code = 'vm.createLine(';
  code += value_length + ", ";
  code += optimizeMaterialList(value_name);
  code += ");\n";
  return code;
};

Blockly.Python['minecraft_connection_shape'] = function(block) {
	var value_name = Blockly.Python.valueToCode(block, 'MATERIAL', Blockly.Python.ORDER_NONE);
	var code = 'vm.connectPositions(';
	code += optimizeMaterialList(value_name);
	code += ");\n";
	return code;
};

// Generator for Rectangle shape
Blockly.Python['minecraft_rectangle_shape'] = function(block) {
  var dropdown_fill = block.getFieldValue('FILL');
  var value_width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.Python.ORDER_NONE);
  var value_height = Blockly.Python.valueToCode(block, 'HEIGHT', Blockly.Python.ORDER_NONE);
  var value_name = Blockly.Python.valueToCode(block, 'MATERIAL', Blockly.Python.ORDER_NONE);
  var code = 'vm.createRectangle(';
  code += value_width + ", ";
  code += value_height + ", ";
  code += convertFillToBoolean(dropdown_fill) + ", ";
  code += optimizeMaterialList(value_name);
  code += ");\n";
  return code;
};

// Generator for Polygon shape
Blockly.Python['minecraft_polygon_shape'] = function(block) {
  var dropdown_fill = block.getFieldValue('FILL');
  var value_nr_sides = Blockly.Python.valueToCode(block, 'SIDES', Blockly.Python.ORDER_NONE);
  var value_polygon_radius = Blockly.Python.valueToCode(block, 'POLYGON_RADIUS', Blockly.Python.ORDER_NONE);
  var value_name = Blockly.Python.valueToCode(block, 'MATERIAL', Blockly.Python.ORDER_NONE);
  var code = 'vm.createPolygon(';
  code += value_nr_sides + ", ";
  code += value_polygon_radius + ", ";
  code += value_polygon_radius + ", "; // Assuming the side length is same as the radius for simplicity
  code += "360, ";
  code += convertFillToBoolean(dropdown_fill) + ", ";
  code += optimizeMaterialList(value_name);
  code += ");\n";
  return code;
};

// Generator for Ellipse shape
Blockly.Python['minecraft_ellipse_shape'] = function(block) {
  var dropdown_fill = block.getFieldValue('FILL');
  var radiusX = Blockly.Python.valueToCode(block, 'RADIUS1', Blockly.Python.ORDER_NONE);
  var radiusY = Blockly.Python.valueToCode(block, 'RADIUS2', Blockly.Python.ORDER_NONE);
  var value_name = Blockly.Python.valueToCode(block, 'MATERIAL', Blockly.Python.ORDER_NONE);
  var code = 'vm.createPolygon(100, ';
  code += radiusX + ", ";
  code += radiusY + ", ";
  code += "360, ";
  code += convertFillToBoolean(dropdown_fill) + ", ";
  code += optimizeMaterialList(value_name);
  code += ");\n";
  return code;
};

// Generator for Ellipse shape
Blockly.Python['minecraft_arc_shape'] = function(block) {
  var dropdown_fill = block.getFieldValue('FILL');
  var radiusX = Blockly.Python.valueToCode(block, 'RADIUS1', Blockly.Python.ORDER_NONE);
  var radiusY = Blockly.Python.valueToCode(block, 'RADIUS2', Blockly.Python.ORDER_NONE);
  var angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_NONE);
  var value_name = Blockly.Python.valueToCode(block, 'MATERIAL', Blockly.Python.ORDER_NONE);
  var code = 'vm.createPolygon(100, ';
  code += radiusX + ", ";
  code += radiusY + ", ";
  code += angle + ", ";
  code += convertFillToBoolean(dropdown_fill) + ", ";
  code += optimizeMaterialList(value_name);
  code += ");\n";
  return code;
};

// Generator for Star shape
Blockly.Python['minecraft_star_shape'] = function(block) {
  var dropdown_fill = block.getFieldValue('FILL');
  var value_nr_sides = Blockly.Python.valueToCode(block, 'SIDES', Blockly.Python.ORDER_NONE);
  var value_innerRadius = Blockly.Python.valueToCode(block, 'INNER_RADIUS', Blockly.Python.ORDER_NONE);
  var value_outerRadius = Blockly.Python.valueToCode(block, 'OUTER_RADIUS', Blockly.Python.ORDER_NONE);
  var value_name = Blockly.Python.valueToCode(block, 'MATERIAL', Blockly.Python.ORDER_NONE);
  var code = 'vm.createStar(';
  code += value_nr_sides + ", ";
  code += value_innerRadius + ", ";
  code += value_outerRadius + ", ";
  code += convertFillToBoolean(dropdown_fill) + ", ";
  code += optimizeMaterialList(value_name);
  code += ");\n";
  return code;
};

Blockly.Python['minecraft_block_shape'] = function(block) {
	var value_name = Blockly.Python.valueToCode(block, 'MATERIAL', Blockly.Python.ORDER_NONE);
	var code = 'vm.createBlock(';
	code += optimizeMaterialList(value_name);
	code += ")\n";
	return code;
};


// Shape Block JavaScript Generator
Blockly.Python['shape_block'] = function(block) {
  var dropdown_shape = block.getFieldValue('SHAPE');
  
  // Initialize an empty code variable to store the generated code
  var code = '';

  // Determine which shape was selected and call the corresponding generator
  switch (dropdown_shape) {
    case 'BLOCK':
      code = Blockly.Python['minecraft_block_shape'](block);
      break;
    case 'CIRCLE':
      code = Blockly.Python['minecraft_circle_shape'](block);
      break;
    case 'SQUARE':
      code = Blockly.Python['minecraft_square_shape'](block);
      break;
    case 'LINE':
      code = Blockly.Python['minecraft_line_shape'](block);
      break;
    case 'CONNECTION':
      code = Blockly.Python['minecraft_connection_shape'](block);
      break;
    case 'RECTANGLE':
      code = Blockly.Python['minecraft_rectangle_shape'](block);
      break;
    case 'POLYGON':
      code = Blockly.Python['minecraft_polygon_shape'](block);
      break;
    case 'ELLIPSE':
      code = Blockly.Python['minecraft_ellipse_shape'](block);
      break;
    case 'ARC':
      code = Blockly.Python['minecraft_arc_shape'](block);
      break;
    case 'STAR':
      code = Blockly.Python['minecraft_star_shape'](block);
      break;
    default:
      throw new Error('Unknown shape: ' + dropdown_shape);
  }
  
  // Return the generated code
  return code;
};


// Helper to convert fill type to boolean
function convertFillToBoolean(fill) {
  return (fill === 'FULL' || fill === 'true') ? 'True' : 'False';
}

// Helper to convert directions to the java enumeration
function convertDirectionToJavaEnum(direction) {
	if(direction==='FW'){
		return 'FORWARD'
	} else if(direction==='BW'){
		return 'BACKWARD'
	} else {
		return direction
	}
}

















Blockly.Python['minecraft_sensing'] = function(block) {
	var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	var code = 'vm.isCurrentBlockOfType(';
	code += optimizeMaterialList(value_name);
	code += ")";
	return [ code, Blockly.Python.ORDER_NONE ];
};




Blockly.Python['minecraft_block'] = function(block) {
	var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	var code = 'vm.createBlock(';
	code += optimizeMaterialList(value_name);
	code += ")\n";
	return code;
};




// Generator for Line shape
Blockly.Python['minecraft_line'] = function(block) {
  var value_length = Blockly.Python.valueToCode(block, 'length', Blockly.Python.ORDER_NONE);
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
  var code = 'vm.createLine(';
  code += value_length + ", ";
  code += optimizeMaterialList(value_name);
  code += ")\n";
  return code;
};



Blockly.Python['minecraft_connectPositions'] = function(block) {
	var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	var code = 'vm.connectPositions(';
	code += optimizeMaterialList(value_name);
	code += ")\n";
	return code;
};





Blockly.Python['minecraft_gotopos'] = function(block) {
	var dropdown_coordsystem = block.getFieldValue('coordSystem');
	var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
	var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
	var value_z = Blockly.Python.valueToCode(block, 'z', Blockly.Python.ORDER_NONE);
	var code = "vm.movePositionAbsolute(";
	code += '"'+dropdown_coordsystem.toUpperCase() + '", ';
	code += value_x + ", ";
	code += value_y + ", ";
	code += value_z + ")\n";
	return code;
};


Blockly.Python['minecraft_move'] = function(block) {
	var value_times = Blockly.Python.valueToCode(block, 'times', Blockly.Python.ORDER_NONE);
	var dropdown_direction = block.getFieldValue('direction');
	var code = "vm.movePositionRelative(" + value_times + ", \'" + convertDirectionToJavaEnum(dropdown_direction) + "\')\n";
	return code;
};

Blockly.Python['minecraft_move_to_view_target'] = function(block) {
	  var dropdown_viewer = block.getFieldValue('viewer');
	  var code = "";
	  switch(dropdown_viewer){
	  case 'PLAYER_EYES':
		  code+="vm.moveToViewTarget()\n";
		  break;
	  case 'PLAYER_POS':
		  code+="vm.moveToPlayer()\n";
		  break;
 	  case 'ROBOT_EYES':
 		  code+="vm.moveToNextSolidBlock()\n";
 		  break;
	  case 'START_POS':
 	  	code = 'vm.resetPosition()\n';
 		  break;
	  case 'MARKED_POS':
 		  code = 'vm.moveToLastMark()\n';		   
 		  break;
 	  default:
 	      console.log("Invalid option for minecraft_move_to_view_target:"+dropdown_viewer);
 	  }
	return code;
};


Blockly.Python['minecraft_setrotation'] = function(block) {
	  var dropdown_angle = block.getFieldValue('angle');
		var code = "vm.rotateYawAbsolute(\'" + dropdown_angle + "\')\n";
	  return code;
	};
	
Blockly.Python['minecraft_rotate'] = function(block) {
	  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_NONE);
		var code = "vm.rotateYawRelative(" + value_angle + ")\n";
		return code;
	};
	
	
	Blockly.Python['minecraft_set_elevation'] = function(block) {
		  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_NONE);
		  var code = "vm.setPitchAbsolute(" + value_angle + ")\n";
		  return code;
		};

	Blockly.Python['minecraft_set_elevation_relative'] = function(block) {
		  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_NONE);
		  var code = "vm.setPitchRelative(" + value_angle + ")\n";
		  return code;
		};
		
		
		
		Blockly.Python['minecraft_splashpotion'] = function(block) {
			  var text_functionname = block.getFieldValue('functionName');
			  text_functionname=sanitizePythonFunctionName(text_functionname);
			  var value_singleblock = Blockly.Python.valueToCode(block, 'name', Blockly.Python.ORDER_NONE);
				var code = '[{"POTION":"'+text_functionname+'", "TYPE":"i.splash_potion"'+closeDictionaryEntry(value_singleblock);
				return [ code, Blockly.Python.ORDER_NONE ];
			};


		Blockly.Python['minecraft_sign'] = function(block) {
			  var variable_varname = Blockly.Python.variableDB_.getName(block.getFieldValue('varName'), Blockly.Variables.NAME_TYPE);
			  variable_varname=variable_varname.replaceAll('"',"'"); // prevent quotes breaking code
			  var value_singleblock = Blockly.Python.valueToCode(block, 'name', Blockly.Python.ORDER_NONE);
				var code = '[{"SIGN":"'+variable_varname+'", "TYPE":"b.acacia_sign"'+closeDictionaryEntry(value_singleblock);
				return [ code, Blockly.Python.ORDER_NONE ];
			};

		Blockly.Python['minecraft_sign_textfield'] = function(block) {
			  var displayText = block.getFieldValue('displayText');
			displayText=displayText.replaceAll('"',"'"); // prevent quotes breaking code
			  var value_singleblock = Blockly.Python.valueToCode(block, 'name', Blockly.Python.ORDER_NONE);
				var code = '[{"SIGN":"'+displayText+'", "TYPE":"b.acacia_sign"'+closeDictionaryEntry(value_singleblock);
				return [ code, Blockly.Python.ORDER_NONE ];
			};

		
function minecraft_materialbockOnlyOne_fn(block){
	var dropdown_name = block.getFieldValue('NAME');
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"TYPE":"'+dropdown_name+'"'+closeDictionaryEntry(value_singleblock);

	return [ code, Blockly.Python.ORDER_NONE ];
}

Blockly.Python['minecraft_materialbockOnlyOne'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};

Blockly.Python['minecraft_materialbockOnlyOne_op'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};

Blockly.Python['minecraft_particleOnlyOne'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};


Blockly.Python['minecraft_entity'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};

Blockly.Python['minecraft_entity_op'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};


Blockly.Python['minecraft_team'] = function(block) {
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"TEAM":"FRIENDLY"'+addDictionaryEntry(value_singleblock);
	return [ code, Blockly.Python.ORDER_NONE ];
};


Blockly.Python['minecraft_team_ver2'] = function(block) {
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"TEAM":"FRIENDLY"'+addDictionaryEntry(value_singleblock);
	return [ code, Blockly.Python.ORDER_NONE ];
};


Blockly.Python['minecraft_direction'] = function(block) {
	var dropdown_name = block.getFieldValue('NAME');
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"DIRECTION":"'+dropdown_name+'"'+addDictionaryEntry(value_singleblock);
	return [ code, Blockly.Python.ORDER_NONE ];
};

Blockly.Python['minecraft_leash'] = function(block) {
	var dropdown_name = block.getFieldValue('NAME');
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"LE":"'+dropdown_name+'"'+addDictionaryEntry(value_singleblock);
	return [ code, Blockly.Python.ORDER_NONE ];
};

Blockly.Python['minecraft_upper_lower_part'] = function(block) {
	var dropdown_name = block.getFieldValue('NAME');
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"PART":"'+dropdown_name+'"'+addDictionaryEntry(value_singleblock);
	return [ code, Blockly.Python.ORDER_NONE ];
};


Blockly.Python['minecraft_on_the_ground'] = function(block) {
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"GROUND":"g"'+addDictionaryEntry(value_singleblock);
	return [ code, Blockly.Python.ORDER_NONE ];
};

Blockly.Python['minecraft_baby'] = function(block) {
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"BABY":"b"'+addDictionaryEntry(value_singleblock);
	return [ code, Blockly.Python.ORDER_NONE ];
};


Blockly.Python['minecraft_hitting'] = function(block) {
	var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	var code = "vm.isPlayerInteractingWith(" + optimizeMaterialList(value_name) + ")";
	return [ code, Blockly.Python.ORDER_NONE ];
};

Blockly.Python['minecraft_holding'] = function(block) {
	var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	var code = "vm.isPlayerHolding(" + optimizeMaterialList(value_name) + ")";
	return [ code, Blockly.Python.ORDER_NONE ];
};

Blockly.Python['minecraft_playerHas'] = function(block) {
	var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	var code = "vm.hasPlayerItem(" + optimizeMaterialList(value_name) + ")";
	return [ code, Blockly.Python.ORDER_NONE ];
};


	
Blockly.Python['minecraft_addevent'] = function(block) {
  var dropdown_eventtype = block.getFieldValue('eventType');
  var functionName = block.getFieldValue('functionName') || '';
  
  if (functionName === '') {
    functionName = "''";  // empty string in Python code
  } else {
    // Optionally sanitize function name here if needed
    // e.g. remove invalid chars or wrap in quotes depending on usage
    functionName = "'" + sanitizePythonFunctionName(functionName) + "'";
  }

  var code = "vm.onEvent('" + dropdown_eventtype + "', " + functionName + ");\n";
  return code;
};	

	
Blockly.Python['minecraft_comment'] = function(block) {
	  var text_comment = block.getFieldValue('comment');
	  var code = '# '+text_comment+'\n';
	  return code;
	};
		

		
Blockly.Python['minecraft_givetoplayer'] = function(block) {
	  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	  var code = "vm.giveToPlayer('INVENTORY', " + optimizeMaterialList(value_name) + ")\n";
	  return code;
	};
	
	
	
Blockly.Python['minecraft_equipplayer'] = function(block) {
	  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	  var code = "vm.giveToPlayer('EQUIP', " + optimizeMaterialList(value_name) + ")\n";
	  return code;
	};
	
Blockly.Python['minecraft_putinhand'] = function(block) {
	  var dropdown_hand = block.getFieldValue('hand');
	  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	  var code = "vm.giveToPlayer('"+dropdown_hand+"', " + optimizeMaterialList(value_name) + ")\n";
	  return code;
	};
	
	
Blockly.Python['minecraft_createchest'] = function(block) {
	  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	  var code = "vm.createChest("+optimizeMaterialList(value_name)+")\n";
	  return code;
	};
		
Blockly.Python['minecraft_text'] = function(block) {
	  var value_inputtext = Blockly.Python.valueToCode(block, 'inputText', Blockly.Python.ORDER_NONE);
	  var value_fontpoints = Blockly.Python.valueToCode(block, 'fontPoints', Blockly.Python.ORDER_NONE);
	  var dropdown_fill = block.getFieldValue('fill');
	  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	  var code = "vm.createText(";
	  code+= value_inputtext+", ";
	  code+= value_fontpoints+", ";
	  code+= convertFillToBoolean(dropdown_fill)+", ";
	  code+= optimizeMaterialList(value_name);
	  code+= ");\n";
	  return code;
	};
	
Blockly.Python['minecraft_mark'] = function(block) {
	  var code = 'vm.markPosition();\n';
	  return code;
};

Blockly.Python['minecraft_gotomark'] = function(block) {
  var dropdown_origin = block.getFieldValue('origin');
  var code;
  if(dropdown_origin=='START_POS') {
	code = 'vm.resetPosition()\n';

  } else {
	code = 'vm.moveToLastMark()\n';	   
  }
  return code;
};

function validateBlockchoice(block, blockChoice) {
	var choice = Blockly.Python.valueToCode(block, blockChoice, Blockly.Python.ORDER_NONE);
//	choice=removeNulls(choice);
	choice=optimizeMaterialList(choice);
	if (choice==""){
		var emptyMaterial=optimizeMaterialList('[{"TYPE":"X.EMPTY"}]')
		return('  '+emptyMaterial+',\n');
	} else {
		return('  '+choice+',\n');
	}
}

function removeNulls(valMatList) {
	  //alert("*"+valMatList);
	  valMatList=valMatList.replace(new RegExp('null, ', "g"), "");
	  valMatList=valMatList.replace(new RegExp(', null', "g"), "");
	  return(valMatList);
}



Blockly.Python['minecraft_drawing_version2'] = function(block) {
	return prepareDrawingBlocks(block);
};
Blockly.Python['minecraft_drawing'] = function(block) {
	return prepareDrawingBlocks(block);
};
Blockly.Python['minecraft_drawing_extended'] = function(block) {
	return prepareDrawingBlocks(block);
};
	
	function prepareDrawingBlocks(block){
		var value_matlist = Blockly.Python.valueToCode(block, 'matlist', Blockly.Python.ORDER_NONE);
		console.log(value_matlist);
		var index_material = Blockly.Python.valueToCode(block, 'index_material', Blockly.Python.ORDER_NONE);
		var drawOrigin = block.getFieldValue('origin');
		if(index_material=="" || index_material==undefined){
			index_material=1; 
		}

		value_matlist=removeNulls(value_matlist);
		  var matString ="";

		//window.alert(value_matlist);
		matString= value_matlist.replace(/]/,"],\n[");
		  
		//window.alert(matString);
		  
		  var code = 'vm.createDrawing(\n';

		  code += matString;
		  code += '\n'+validateBlockchoice(block, "blockchoice0");
		  code += validateBlockchoice(block, "blockchoice1");
		  code += validateBlockchoice(block, "blockchoice2");
		  code += validateBlockchoice(block, "blockchoice3");
		  code += validateBlockchoice(block, "blockchoice4");
		  code += validateBlockchoice(block, "blockchoice5");
		  code += validateBlockchoice(block, "blockchoice6");
		  code += validateBlockchoice(block, "blockchoice7");
		  code += validateBlockchoice(block, "blockchoice8");
		  code += validateBlockchoice(block, "blockchoice9");
		  code += validateBlockchoice(block, "blockchoicez");
		  code += validateBlockchoice(block, "blockchoicey");
		  code += validateBlockchoice(block, "blockchoicex");
		  code += validateBlockchoice(block, "blockchoicew");
		  code += validateBlockchoice(block, "blockchoicev");
		  code += validateBlockchoice(block, "blockchoiceu");
		  code += validateBlockchoice(block, "blockchoicet");
		  code += validateBlockchoice(block, "blockchoices");
		  code += validateBlockchoice(block, "blockchoicer");
		  code += validateBlockchoice(block, "blockchoiceq");
		  code=code.substring(code, code.length-2); // remove last comma
		  code +="\n], ";
		  code +=index_material;
		  code +=", '";
		  code +=drawOrigin;
		  code += "');\n";
		  return code; 
		
	}
	
	function getColor(block, id) {
		  var value_child = Blockly.Python.valueToCode(block, 'child', Blockly.Python.ORDER_NONE);
		  var code = "";
		  if(value_child!=''){
		    	code +='"'+id+';"'
				code += '+'+value_child;
		  } else {
		    	code +='"'+id+'"\n'

		  }
		  return [code, Blockly.Python.ORDER_NONE];
	}

	
	Blockly.Python['m_draw_0'] = function(block) {
		  return getColor(block, 0);
	};
		
	Blockly.Python['m_draw_1'] = function(block) {
		  return getColor(block, 1);
	};
	
	Blockly.Python['m_draw_2'] = function(block) {
		  return getColor(block, 2);
	};
	
	Blockly.Python['m_draw_3'] = function(block) {
		  return getColor(block, 3);
	};
	
	Blockly.Python['m_draw_4'] = function(block) {
		  return getColor(block, 4);
	};
	
	Blockly.Python['m_draw_5'] = function(block) {
		  return getColor(block, 5);
	};
	
	Blockly.Python['m_draw_6'] = function(block) {
		  return getColor(block, 6);
	};
	
	Blockly.Python['m_draw_7'] = function(block) {
		  return getColor(block, 7);
	};
	
	Blockly.Python['m_draw_8'] = function(block) {
		  return getColor(block, 8);
	};
	
	Blockly.Python['m_draw_9'] = function(block) {
		  return getColor(block, 9);
	};
	Blockly.Python['m_draw_z'] = function(block) {
		  return getColor(block, 10);
	};
	Blockly.Python['m_draw_y'] = function(block) {
		  return getColor(block, 11);
	};
	Blockly.Python['m_draw_x'] = function(block) {
		  return getColor(block, 12);
	};
	Blockly.Python['m_draw_w'] = function(block) {
		  return getColor(block, 13);
	};
	Blockly.Python['m_draw_v'] = function(block) {
		  return getColor(block, 14);
	};
	Blockly.Python['m_draw_u'] = function(block) {
		  return getColor(block, 15);
	};
	Blockly.Python['m_draw_t'] = function(block) {
		  return getColor(block, 16);
	};
	Blockly.Python['m_draw_s'] = function(block) {
		  return getColor(block, 17);
	};
	Blockly.Python['m_draw_r'] = function(block) {
		  return getColor(block, 18);
	};
	Blockly.Python['m_draw_q'] = function(block) {
		  return getColor(block, 19);
	};
		
	
		

	
	Blockly.Python['minecraft_cancelEvents'] = function(block) {
		  var code = 'vm.clearEvents();\n';
		  return code;
	};
	

	Blockly.Python['minecraft_executecommand'] = function(block) {
		  var value_fn = Blockly.Python.valueToCode(block, 'fn', Blockly.Python.ORDER_ATOMIC);
		  var value_player = Blockly.Python.valueToCode(block, 'player', Blockly.Python.ORDER_ATOMIC);
		  var value_param1 = Blockly.Python.valueToCode(block, 'param1', Blockly.Python.ORDER_ATOMIC);
		  var code = "vm.callFunction(";
		  code += value_fn +", ";
		  code += value_player;
		  code += ', "'+value_param1.replaceAll('"', "'"); //invert quotes to avoid conflicts in block definitions
		  code += '");\n';
		  return code;
		};
		
		
		
		Blockly.Python['minecraft_talking'] = function(block) {
			var variable_text = Blockly.Python.variableDB_.getName(block.getFieldValue('text'), Blockly.Variables.NAME_TYPE);
			var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
			var code = '[{"TALK":'+variable_text+''+addDictionaryEntry(value_singleblock);
			return [ code, Blockly.Python.ORDER_NONE ];
		};
		
		Blockly.Python['minecraft_materialNothing'] = function(block) {
			var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
			var code = '[{"TYPE":"X.EMPTY"'+closeDictionaryEntry(value_singleblock);
			return [ code, Blockly.Python.ORDER_NONE ];
		}

		
		// Define the JavaScript generator for the block in ES5
		Blockly.Python['image_select'] = function(block) {
		  // Get selected values from the menus
		  var firstMenuValue = block.getFieldValue('FIRST_MENU');
		  var secondMenuValue = block.getFieldValue('SECOND_MENU');
		
		  // Generate JavaScript code
		  var code = "handleImageSelection('" + firstMenuValue + "', '" + secondMenuValue + "');\n";
		  //var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
		  // Check if there is a block connected to the right input
		  var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
		  var code = '[{"IMAGE":"'+secondMenuValue+'", "TYPE":"e.item_frame"'+closeDictionaryEntry(value_singleblock);
	
		   return [ code, Blockly.Python.ORDER_NONE ];
		};	
	
	
Blockly.Python['minecraft_velocity'] = function(block) {
	var velocity = block.getFieldValue('velocity');
	var yaw = block.getFieldValue('yaw');
	var pitch = block.getFieldValue('pitch');
	var value_singleblock = Blockly.Python.valueToCode(block, 'singleblock', Blockly.Python.ORDER_NONE);
	var code = '[{"VELOCITY":'+velocity+', "VELOCITY_YAW":'+yaw+', "VELOCITY_PITCH":'+pitch+addDictionaryEntry(value_singleblock);

	return [ code, Blockly.Python.ORDER_NONE ];
};

Blockly.Python['minecraft_unicode_grid_selector'] = function(block) {
  var symbol = block.getFieldValue('SYMBOL');
  var code = '"' + symbol + '"';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['python_code_snippet'] = function(block) {
  var code = block.getFieldValue('CODE') || '';
  return code+"\n";
};
