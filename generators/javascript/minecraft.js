/**
 * @fileoverview Generating JavaScript for logic blocks.
 * @author Lauro Canonica
 */
'use strict';

goog.provide('Blockly.JavaScript.minecraft');

goog.require('Blockly.JavaScript');

function addPlusIfNotEmpty(inText){
	if (inText!=""){
		return "+"+inText;		
	} else {
		return inText;
	}
}
function addReplaceCommasAndSemicolons(){
		return'.replaceAll(",","&#44").replaceAll(";","&#59")'; // replace commas and semicolumns
	};

Blockly.JavaScript['minecraft_multiciplity'] = function(block) {
	var number_mutiplicity = block.getFieldValue('mutiplicity');
	var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
	var code = '"MU='+number_mutiplicity+',"'+addPlusIfNotEmpty(value_singleblock);
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};
Blockly.JavaScript['minecraft_multiciplity_var'] = function(block) {
	var variable_mutiplicity = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('mutiplicity'), Blockly.Variables.NAME_TYPE);
	var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
	var code = '"MU="+'+variable_mutiplicity+'+","'+addPlusIfNotEmpty(value_singleblock);
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};

Blockly.JavaScript['minecraft_delay'] = function(block) {
	var number_delay = block.getFieldValue('delay');
	var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
	var code = '"DE='+number_delay+',"'+addPlusIfNotEmpty(value_singleblock);
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};

Blockly.JavaScript['minecraft_delay_var'] = function(block) {
	var variable_delay = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('delay'), Blockly.Variables.NAME_TYPE);
	var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
	var code = '"DE="+'+variable_delay+'+","'+addPlusIfNotEmpty(value_singleblock);
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};

Blockly.JavaScript['minecraft_delay_random'] = function(block) {
	var min = block.getFieldValue('min');
	var max = block.getFieldValue('max');
	var number_delay = min+'-x-'+max;
	var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
	var code = '"DE='+number_delay+',"'+addPlusIfNotEmpty(value_singleblock);
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};

Blockly.JavaScript['minecraft_delay_random_var'] = function(block) {
	var min = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('min'), Blockly.Variables.NAME_TYPE);
	var max = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('max'), Blockly.Variables.NAME_TYPE);
	var number_delay =min+'+"-x-"+'+max;
	var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
	var code = '"DE="+'+number_delay+'+","'+addPlusIfNotEmpty(value_singleblock);
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};


Blockly.JavaScript['minecraft_delay_reset_random'] = function(block) {
	  var number_seed = block.getFieldValue('seed');
	  var code = "CMD.setDelayRandomGeneratorSeed(" + number_seed + ");\n";
	  return code;
	};







Blockly.JavaScript['minecraft_item'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};

Blockly.JavaScript['minecraft_item_op'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};

function cleanMaterialList(materialList) {
//	if(materialList!="[]" && // not an empty list
//			materialList.indexOf(",")>0){ // not a simple variable name
//		materialList='(' + materialList + ')'
//	}
	return materialList;
}


Blockly.JavaScript['minecraft_polygon'] = function(block) {
	var dropdown_fill = block.getFieldValue('fill');
	var value_nr_sides = Blockly.JavaScript.valueToCode(block, 'nr_sides', Blockly.JavaScript.ORDER_NONE);
	var value_sidelength = Blockly.JavaScript.valueToCode(block, 'sideLength', Blockly.JavaScript.ORDER_NONE);
	var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
	var code = 'CMD.createPolygon(nextLocation, ';
	code += value_nr_sides + ", ";
	code += value_sidelength + ", ";
	code += value_sidelength + ", ";
	code += dropdown_fill + ", ";
	code += cleanMaterialList(value_name);
	code += ", player, startCmdTime);\n";
	return code;
};

Blockly.JavaScript['minecraft_star'] = function(block) {
	var dropdown_fill = block.getFieldValue('fill');
	var value_nr_sides = Blockly.JavaScript.valueToCode(block, 'nr_sides', Blockly.JavaScript.ORDER_NONE);
	var value_innerRadius = Blockly.JavaScript.valueToCode(block, 'innerRadius', Blockly.JavaScript.ORDER_NONE);
	var value_outerRadius = Blockly.JavaScript.valueToCode(block, 'outerRadius', Blockly.JavaScript.ORDER_NONE);
	var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
	var code = 'CMD.createStar(nextLocation, ';
	code += value_nr_sides + ", ";
	code += value_innerRadius + ", ";
	code += value_outerRadius + ", ";
	code += dropdown_fill + ", ";
	code += cleanMaterialList(value_name);
	code += ", player, startCmdTime);\n";
	return code;
};

	Blockly.JavaScript['minecraft_rectangle'] = function(block) {
		  var dropdown_fill = block.getFieldValue('fill');
		  var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_NONE);
		  var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_NONE);
		  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
			var code = 'CMD.createRectangle(nextLocation, ';
			code += value_width + ", ";
			code += value_height + ", ";
			code += dropdown_fill + ", ";
			code += cleanMaterialList(value_name);
			code += ", player, startCmdTime);\n";
			return code;
		};
		
	Blockly.JavaScript['minecraft_ellipse'] = function(block) {
		  var dropdown_fill = block.getFieldValue('fill');
		  var radiusX = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_NONE);
		  var radiusY = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_NONE);
		  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
			var code = 'CMD.createPolygon(nextLocation, 100, ';
			code += radiusX + ", ";
			code += radiusY + ", ";
			code += dropdown_fill + ", ";
			code += cleanMaterialList(value_name);
			code += ", player, startCmdTime);\n";
			return code;
		}; 




// Generator for Circle shape
Blockly.JavaScript['minecraft_circle_shape'] = function(block) {
  var dropdown_fill = block.getFieldValue('FILL');
  var value_radius = Blockly.JavaScript.valueToCode(block, 'RADIUS', Blockly.JavaScript.ORDER_NONE);
  var value_name = Blockly.JavaScript.valueToCode(block, 'MATERIAL', Blockly.JavaScript.ORDER_NONE);
  var code = 'CMD.createCircle(nextLocation, ';
  code += value_radius + ", ";
  code += convertFillToBoolean(dropdown_fill) + ", ";
  code += cleanMaterialList(value_name);
  code += ", player, startCmdTime);\n";
  return code;
};

// Generator for Square shape
Blockly.JavaScript['minecraft_square_shape'] = function(block) {
  var dropdown_fill = block.getFieldValue('FILL');
  var value_sideLength = Blockly.JavaScript.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_NONE);
  var value_name = Blockly.JavaScript.valueToCode(block, 'MATERIAL', Blockly.JavaScript.ORDER_NONE);
  var code = 'CMD.createSquare(nextLocation, ';
  code += value_sideLength + ", ";
  code += convertFillToBoolean(dropdown_fill) + ", ";
  code += cleanMaterialList(value_name);
  code += ", player, startCmdTime);\n";
  return code;
};

// Generator for Line shape
Blockly.JavaScript['minecraft_line_shape'] = function(block) {
  var value_length = Blockly.JavaScript.valueToCode(block, 'LENGTH', Blockly.JavaScript.ORDER_NONE);
  var value_name = Blockly.JavaScript.valueToCode(block, 'MATERIAL', Blockly.JavaScript.ORDER_NONE);
  var code = 'CMD.createLine(nextLocation, ';
  code += value_length + ", ";
  code += cleanMaterialList(value_name);
  code += ", player, startCmdTime);\n";
  return code;
};

// Generator for Rectangle shape
Blockly.JavaScript['minecraft_rectangle_shape'] = function(block) {
  var dropdown_fill = block.getFieldValue('FILL');
  var value_width = Blockly.JavaScript.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_NONE);
  var value_height = Blockly.JavaScript.valueToCode(block, 'HEIGHT', Blockly.JavaScript.ORDER_NONE);
  var value_name = Blockly.JavaScript.valueToCode(block, 'MATERIAL', Blockly.JavaScript.ORDER_NONE);
  var code = 'CMD.createRectangle(nextLocation, ';
  code += value_width + ", ";
  code += value_height + ", ";
  code += convertFillToBoolean(dropdown_fill) + ", ";
  code += cleanMaterialList(value_name);
  code += ", player, startCmdTime);\n";
  return code;
};

// Generator for Polygon shape
Blockly.JavaScript['minecraft_polygon_shape'] = function(block) {
  var dropdown_fill = block.getFieldValue('FILL');
  var value_nr_sides = Blockly.JavaScript.valueToCode(block, 'SIDES', Blockly.JavaScript.ORDER_NONE);
  var value_polygon_radius = Blockly.JavaScript.valueToCode(block, 'POLYGON_RADIUS', Blockly.JavaScript.ORDER_NONE);
  var value_name = Blockly.JavaScript.valueToCode(block, 'MATERIAL', Blockly.JavaScript.ORDER_NONE);
  var code = 'CMD.createPolygon(nextLocation, ';
  code += value_nr_sides + ", ";
  code += value_polygon_radius + ", ";
  code += value_polygon_radius + ", "; // Assuming the side length is same as the radius for simplicity
  code += convertFillToBoolean(dropdown_fill) + ", ";
  code += cleanMaterialList(value_name);
  code += ", player, startCmdTime);\n";
  return code;
};

// Generator for Ellipse shape
Blockly.JavaScript['minecraft_ellipse_shape'] = function(block) {
  var dropdown_fill = block.getFieldValue('FILL');
  var radiusX = Blockly.JavaScript.valueToCode(block, 'RADIUS1', Blockly.JavaScript.ORDER_NONE);
  var radiusY = Blockly.JavaScript.valueToCode(block, 'RADIUS2', Blockly.JavaScript.ORDER_NONE);
  var value_name = Blockly.JavaScript.valueToCode(block, 'MATERIAL', Blockly.JavaScript.ORDER_NONE);
  var code = 'CMD.createPolygon(nextLocation, 100, ';
  code += radiusX + ", ";
  code += radiusY + ", ";
  code += convertFillToBoolean(dropdown_fill) + ", ";
  code += cleanMaterialList(value_name);
  code += ", player, startCmdTime);\n";
  return code;
};

// Generator for Star shape
Blockly.JavaScript['minecraft_star_shape'] = function(block) {
  var dropdown_fill = block.getFieldValue('FILL');
  var value_nr_sides = Blockly.JavaScript.valueToCode(block, 'SIDES', Blockly.JavaScript.ORDER_NONE);
  var value_innerRadius = Blockly.JavaScript.valueToCode(block, 'INNER_RADIUS', Blockly.JavaScript.ORDER_NONE);
  var value_outerRadius = Blockly.JavaScript.valueToCode(block, 'OUTER_RADIUS', Blockly.JavaScript.ORDER_NONE);
  var value_name = Blockly.JavaScript.valueToCode(block, 'MATERIAL', Blockly.JavaScript.ORDER_NONE);
  var code = 'CMD.createStar(nextLocation, ';
  code += value_nr_sides + ", ";
  code += value_innerRadius + ", ";
  code += value_outerRadius + ", ";
  code += convertFillToBoolean(dropdown_fill) + ", ";
  code += cleanMaterialList(value_name);
  code += ", player, startCmdTime);\n";
  return code;
};

Blockly.JavaScript['minecraft_block_shape'] = function(block) {
	var value_name = Blockly.JavaScript.valueToCode(block, 'MATERIAL', Blockly.JavaScript.ORDER_NONE);
	var code = 'CMD.createBlock(nextLocation,';
	code += cleanMaterialList(value_name);
	code += ", player, startCmdTime);\n";
	return code;
};


// Shape Block JavaScript Generator
Blockly.JavaScript['shape_block'] = function(block) {
  var dropdown_shape = block.getFieldValue('SHAPE');
  
  // Initialize an empty code variable to store the generated code
  var code = '';

  // Determine which shape was selected and call the corresponding generator
  switch (dropdown_shape) {
    case 'BLOCK':
      code = Blockly.JavaScript['minecraft_block_shape'](block);
      break;
    case 'CIRCLE':
      code = Blockly.JavaScript['minecraft_circle_shape'](block);
      break;
    case 'SQUARE':
      code = Blockly.JavaScript['minecraft_square_shape'](block);
      break;
    case 'LINE':
      code = Blockly.JavaScript['minecraft_line_shape'](block);
      break;
    case 'RECTANGLE':
      code = Blockly.JavaScript['minecraft_rectangle_shape'](block);
      break;
    case 'POLYGON':
      code = Blockly.JavaScript['minecraft_polygon_shape'](block);
      break;
    case 'ELLIPSE':
      code = Blockly.JavaScript['minecraft_ellipse_shape'](block);
      break;
    case 'STAR':
      code = Blockly.JavaScript['minecraft_star_shape'](block);
      break;
    default:
      throw new Error('Unknown shape: ' + dropdown_shape);
  }
  
  // Return the generated code
  return code;
};


// Helper to convert fill type to boolean
function convertFillToBoolean(fill) {
  return fill === 'FULL' ? true : false;
}
















Blockly.JavaScript['minecraft_sensing'] = function(block) {
	var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
	var code = 'CMD.isCurrentBlockMadeOf(nextLocation,';
	code += cleanMaterialList(value_name);
	code += ", player)\n";
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};


Blockly.JavaScript['minecraft_block'] = function(block) {
	var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
	var code = 'CMD.createBlock(nextLocation,';
	code += cleanMaterialList(value_name);
	code += ", player, startCmdTime);\n";
	return code;
};


Blockly.JavaScript['minecraft_line'] = function(block) {

	var value_length = Blockly.JavaScript.valueToCode(block, 'length', Blockly.JavaScript.ORDER_NONE);
	var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
	if(value_name[value_name.length-1]==','){  // remove dangling comma
		value_name='[' + value_name.substring(0, value_name.length-1) + ']';
	}

	var code = 'CMD.createLine(nextLocation, ';
	code += value_length;
	code += ", "+cleanMaterialList(value_name);
	code += ", player, startCmdTime);\n";
	return code;
};



Blockly.JavaScript['minecraft_connectPositions'] = function(block) {
	var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
	var code = 'CMD.connectPositions(markLocation, nextLocation,';
	code += cleanMaterialList(value_name);
	code += ", player, startCmdTime);\n";
	return code;
};



Blockly.JavaScript['minecraft_gotopos'] = function(block) {
	var dropdown_coordsystem = block.getFieldValue('coordSystem');
	var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_NONE);
	var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_NONE);
	var value_z = Blockly.JavaScript.valueToCode(block, 'z', Blockly.JavaScript.ORDER_NONE);
	var code = "nextLocation=CMD.movePosition(player, startLocation, ";
	code += "nextLocation.getYaw(), ";
	code += "nextLocation.getPitch(), ";
	code += '"'+dropdown_coordsystem + '", ';
	code += value_x + ", ";
	code += value_y + ", ";
	code += value_z + ");\n";
	return code;
};


Blockly.JavaScript['minecraft_move'] = function(block) {
	var value_times = Blockly.JavaScript.valueToCode(block, 'times', Blockly.JavaScript.ORDER_NONE);
	var dropdown_direction = block.getFieldValue('direction');
	var code = "nextLocation=CMD.movePosition(player, nextLocation, " + value_times + ", \'" + dropdown_direction + "\');\n";
	return code;
};

Blockly.JavaScript['minecraft_move_to_view_target'] = function(block) {
	  var dropdown_viewer = block.getFieldValue('viewer');
	  var code = "nextLocation=";
	  if(dropdown_viewer=='PLAYER_EYES'){
		  code+="CMD.movePosition(player);\n";
      } else {
		  code+="CMD.movePosition(player, nextLocation);\n";
      }
	code+="if(nextLocation==null) return;\n";
	return code;
};


Blockly.JavaScript['minecraft_setrotation'] = function(block) {
	  var dropdown_angle = block.getFieldValue('angle');
		var code = "nextLocation=CMD.rotatePositionAbsolute(player, nextLocation, \'" + dropdown_angle + "\');\n";
	  return code;
	};
	
Blockly.JavaScript['minecraft_rotate'] = function(block) {
	  var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
		var code = "nextLocation=CMD.rotatePositionRelative(player, nextLocation, " + value_angle + ");\n";
		return code;
	};
	
	Blockly.JavaScript['minecraft_set_elevation'] = function(block) {
		  var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
		  var code = "nextLocation=CMD.setVerticalAxisAbsolute(player, nextLocation, " + value_angle + ");\n";
		  return code;
		};

	Blockly.JavaScript['minecraft_set_elevation_relative'] = function(block) {
		  var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
		  var code = "nextLocation=CMD.setVerticalAxisRelative(player, nextLocation, " + value_angle + ");\n";
		  return code;
		};
		
		Blockly.JavaScript['minecraft_splashpotion'] = function(block) {
			  var text_functionname = block.getFieldValue('functionName');
			  var value_singleblock = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_NONE);
				var code = '"SP='+text_functionname+",TY=i.splash_potion;\""+addPlusIfNotEmpty(value_singleblock);
				return [ code, Blockly.JavaScript.ORDER_NONE ];
			};

		Blockly.JavaScript['minecraft_sign'] = function(block) {
			  var variable_varname = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('varName'), Blockly.Variables.NAME_TYPE);
			  var value_singleblock = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_NONE);
				var code = '"ST="+'+variable_varname+addReplaceCommasAndSemicolons()+'+",TY=b.acacia_sign;\"'+addPlusIfNotEmpty(value_singleblock);
				return [ code, Blockly.JavaScript.ORDER_NONE ];
			};

		
function minecraft_materialbockOnlyOne_fn(block){
	var dropdown_name = block.getFieldValue('NAME');
	var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
	var code = '"TY='+dropdown_name+';"'+addPlusIfNotEmpty(value_singleblock);
	return [ code, Blockly.JavaScript.ORDER_NONE ];
}


Blockly.JavaScript['minecraft_materialbockOnlyOne'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};

Blockly.JavaScript['minecraft_materialbockOnlyOne_op'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};

Blockly.JavaScript['minecraft_particleOnlyOne'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};


Blockly.JavaScript['minecraft_entity'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};

Blockly.JavaScript['minecraft_entity_op'] = function(block) {
	return minecraft_materialbockOnlyOne_fn(block);
};

Blockly.JavaScript['minecraft_team'] = function(block) {
	var dropdown_name = block.getFieldValue('NAME');
	var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
	var code = '"TE='+dropdown_name+',"'+addPlusIfNotEmpty(value_singleblock);
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};

Blockly.JavaScript['minecraft_direction'] = function(block) {
	var dropdown_name = block.getFieldValue('NAME');
	var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
	var code = '"DI='+dropdown_name+',"'+addPlusIfNotEmpty(value_singleblock);
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};

Blockly.JavaScript['minecraft_leash'] = function(block) {
	var dropdown_name = block.getFieldValue('NAME');
	var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
	var code = '"LE='+dropdown_name+',"'+addPlusIfNotEmpty(value_singleblock);
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};

Blockly.JavaScript['minecraft_upper_lower_part'] = function(block) {
	var dropdown_name = block.getFieldValue('NAME');
	var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
	var code = '"UD='+dropdown_name+',"'+addPlusIfNotEmpty(value_singleblock);
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};


Blockly.JavaScript['minecraft_on_the_ground'] = function(block) {
	var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
	var code = '"GR=g,"'+addPlusIfNotEmpty(value_singleblock);
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};

Blockly.JavaScript['minecraft_baby'] = function(block) {
	var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
	var code = '"BA=b,"'+addPlusIfNotEmpty(value_singleblock);
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};


Blockly.JavaScript['minecraft_hitting'] = function(block) {
	var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
	var code = "CMD.isPlayerHittingA(event, " + cleanMaterialList(value_name) + ")";
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};

Blockly.JavaScript['minecraft_holding'] = function(block) {
	var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
	var code = "CMD.isPlayerHoldingA(player, " + cleanMaterialList(value_name) + ")";
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};

Blockly.JavaScript['minecraft_playerHas'] = function(block) {
	var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
	var code = "CMD.hasPlayerA(player, " + cleanMaterialList(value_name) + ")";
	return [ code, Blockly.JavaScript.ORDER_NONE ];
};


Blockly.JavaScript['minecraft_addevent'] = function(block) {
	  var dropdown_eventtype = block.getFieldValue('eventType');
	  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
	  if (value_name==''){
		  value_name="''";
	  }
	  var code = "CMD.addEvent(player, '"+dropdown_eventtype+"', ";
	  code +=  value_name +");\n";
	  return code;
	};

	
Blockly.JavaScript['minecraft_comment'] = function(block) {
	  var text_comment = block.getFieldValue('comment');
	  var code = '/* '+text_comment+' */\n';
	  return code;
	};
		
Blockly.JavaScript['minecraft_printposition'] = function(block) {
  var code = '"x="+nextLocation.getX()+';
  code += '"   y="+nextLocation.getZ()+';
  code += '"   z="+nextLocation.getY()+';
  code += '"   yaw="+nextLocation.getYaw()+';
  code += '"   pitch="+nextLocation.getPitch()';
  return [ code, Blockly.JavaScript.ORDER_NONE ];
};
		
Blockly.JavaScript['minecraft_givetoplayer'] = function(block) {
	  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
	  var code = "CMD.giveToPlayer(player, " + cleanMaterialList(value_name) + ");\n";
	  return code;
	};
	
Blockly.JavaScript['minecraft_createchest'] = function(block) {
	  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
	  var code = "CMD.createChest(nextLocation, player, " + cleanMaterialList(value_name) + ", startCmdTime);\n";
	  return code;
	};
		
Blockly.JavaScript['minecraft_text'] = function(block) {
	  var value_inputtext = Blockly.JavaScript.valueToCode(block, 'inputText', Blockly.JavaScript.ORDER_NONE);
	  var dropdown_fontname = block.getFieldValue('fontName');
	  var dropdown_fontstyle = block.getFieldValue('fontStyle');
	  var value_fontpoints = Blockly.JavaScript.valueToCode(block, 'fontPoints', Blockly.JavaScript.ORDER_NONE);
	  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
	  var code = "CMD.convertTextToBlocks(nextLocation, player, ";
	  code+= cleanMaterialList(value_name)+", ";
	  code+= value_inputtext+", ";
	  code+= "\""+dropdown_fontname+"\", ";
	  code+= dropdown_fontstyle+", ";
	  code+= value_fontpoints;
	  code+= ", startCmdTime);\n";
	  return code;
	};
	
Blockly.JavaScript['minecraft_mark'] = function(block) {
	  var code = 'markLocation=CMD.copyLocation(nextLocation, nextLocation.getYaw(), nextLocation.getPitch());\n';
	  return code;
};


Blockly.JavaScript['minecraft_gotomark'] = function(block) {
  var dropdown_origin = block.getFieldValue('origin');
  var code;
  if(dropdown_origin=='0') {
	  code = 'nextLocation=CMD.copyLocation(startLocation, nextLocation.getYaw(), nextLocation.getPitch());\n';
  } else {
	  code = 'nextLocation=CMD.copyLocation(markLocation, nextLocation.getYaw(), nextLocation.getPitch());\n';		   
  }
  return code;
};

function validateBlockchoice(block, blockChoice) {
	var choice = Blockly.JavaScript.valueToCode(block, blockChoice, Blockly.JavaScript.ORDER_NONE);

	
	//if(choice!="") alert(choice);
	choice=removeNulls(choice);
	// transform lists into strings
	//choice = choice.replace(/\[/, ""); // replace the start list
	//choice = choice.replace(/\]/, ""); // replace the end list
//choice = choice.replace(/\), \(/g, "+ "); // replace the end list
	//choice = choice.replace(/\[.*?\(/g, ""); // replace the starting nulls
	//choice = choice.replace(/\).*\]/g, ""); // replace the ending nulls
	
	//choice = choice.replace(/\[\]/g, ""); // remove empty lists
/*	
	choice = choice.replace(/\[null\]/g, ""); // remove empty lists
	choice = choice.replace(/[\[\]]/g, ""); // remove square parenthesis left overs
	choice = choice.replace(/\(\"/g, "\""); // remove round parenthesis left overs
	choice = choice.replace(/\"\)/g, "\""); // remove round parenthesis left overs
	choice = choice.replace(/, /g, "+ "); // change commas with +
*/

	return("\t["+choice+"],\n");
}
function removeNulls(valMatList) {
	  //alert("*"+valMatList);
	  valMatList=valMatList.replace(new RegExp('null, ', "g"), "");
	  valMatList=valMatList.replace(new RegExp(', null', "g"), "");
	  return(valMatList);
}



Blockly.JavaScript['minecraft_drawing'] = function(block) {
	return prepareDrawingBlocks(block);
};
Blockly.JavaScript['minecraft_drawing_extended'] = function(block) {
	return prepareDrawingBlocks(block);
};
	
	function prepareDrawingBlocks(block){
		var value_matlist = Blockly.JavaScript.valueToCode(block, 'matlist', Blockly.JavaScript.ORDER_NONE);
		var index_material = Blockly.JavaScript.valueToCode(block, 'index_material', Blockly.JavaScript.ORDER_NONE);
		var drawOrigin = block.getFieldValue('origin');
		if(index_material=="" || index_material==undefined){
			index_material=1; 
		}

		value_matlist=removeNulls(value_matlist);
		  var matString ="";

		//window.alert(value_matlist);
		matString= value_matlist.replace(/]/,"],[");
		  
		//window.alert(matString);
		  
		  var code = 'CMD.createDrawing(nextLocation, ';
		  code += matString;
		  code += validateBlockchoice(block, "blockchoice0");
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
		  code +="],";
		  code +=index_material;
		  code +=", '";
		  code +=drawOrigin;
		  code += "' , player, startCmdTime);\n";
		  return code; 
		
	}
	
	function getColor(block, id) {
		  var value_child = Blockly.JavaScript.valueToCode(block, 'child', Blockly.JavaScript.ORDER_NONE);
		  var code = "";
		  if(value_child!=''){
		    	code +='"'+id+';"'
				code += '+'+value_child;
		  } else {
		    	code +='"'+id+'"\n'

		  }
		  return [code, Blockly.JavaScript.ORDER_NONE];
	}

	
	Blockly.JavaScript['m_draw_0'] = function(block) {
		  return getColor(block, 0);
	};
		
	Blockly.JavaScript['m_draw_1'] = function(block) {
		  return getColor(block, 1);
	};
	
	Blockly.JavaScript['m_draw_2'] = function(block) {
		  return getColor(block, 2);
	};
	
	Blockly.JavaScript['m_draw_3'] = function(block) {
		  return getColor(block, 3);
	};
	
	Blockly.JavaScript['m_draw_4'] = function(block) {
		  return getColor(block, 4);
	};
	
	Blockly.JavaScript['m_draw_5'] = function(block) {
		  return getColor(block, 5);
	};
	
	Blockly.JavaScript['m_draw_6'] = function(block) {
		  return getColor(block, 6);
	};
	
	Blockly.JavaScript['m_draw_7'] = function(block) {
		  return getColor(block, 7);
	};
	
	Blockly.JavaScript['m_draw_8'] = function(block) {
		  return getColor(block, 8);
	};
	
	Blockly.JavaScript['m_draw_9'] = function(block) {
		  return getColor(block, 9);
	};
	Blockly.JavaScript['m_draw_z'] = function(block) {
		  return getColor(block, 10);
	};
	Blockly.JavaScript['m_draw_y'] = function(block) {
		  return getColor(block, 11);
	};
	Blockly.JavaScript['m_draw_x'] = function(block) {
		  return getColor(block, 12);
	};
	Blockly.JavaScript['m_draw_w'] = function(block) {
		  return getColor(block, 13);
	};
	Blockly.JavaScript['m_draw_v'] = function(block) {
		  return getColor(block, 14);
	};
	Blockly.JavaScript['m_draw_u'] = function(block) {
		  return getColor(block, 15);
	};
	Blockly.JavaScript['m_draw_t'] = function(block) {
		  return getColor(block, 16);
	};
	Blockly.JavaScript['m_draw_s'] = function(block) {
		  return getColor(block, 17);
	};
	Blockly.JavaScript['m_draw_r'] = function(block) {
		  return getColor(block, 18);
	};
	Blockly.JavaScript['m_draw_q'] = function(block) {
		  return getColor(block, 19);
	};
		
	
	Blockly.JavaScript['minecraft_wait'] = function(block) {
		  var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_NONE);
		  var code = "CMD.programWait("+value_time+");\n";
		  return code;
		};

	Blockly.JavaScript['minecraft_movePos_To_Player'] = function(block) {
		  var value_playername = Blockly.JavaScript.valueToCode(block, 'playerName', Blockly.JavaScript.ORDER_ATOMIC);
			var code = "nextLocation=CMD.movePosition(player, nextLocation, ";
			code += value_playername + ");\n";
			return code;
		};
		
	Blockly.JavaScript['minecraft_getPlayerCoord'] = function(block) {
		  var coordName=block.getFieldValue('coordinateName');
		  var code = "CMD.getPlayerCoord(player, '";
		  code += coordName+ "')";
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};

	Blockly.JavaScript['minecraft_importobj'] = function(block) {
		  var value_filename = Blockly.JavaScript.valueToCode(block, 'filename', Blockly.JavaScript.ORDER_NONE);
		  var value_size = Blockly.JavaScript.valueToCode(block, 'size', Blockly.JavaScript.ORDER_NONE);
		  
		  var code = "CMD.createWaveFormObj(nextLocation, player, ";
		  code += value_filename+ ", ";
		  code += value_size+ ", startCmdTime);\n";
		  return code;
		};
	
	Blockly.JavaScript['minecraft_cancelEvents'] = function(block) {
		  var code = 'CMD.cancelAllEvents(player);\n';
		  return code;
	};
	

	Blockly.JavaScript['minecraft_executecommand'] = function(block) {
		  var value_fn = Blockly.JavaScript.valueToCode(block, 'fn', Blockly.JavaScript.ORDER_ATOMIC);
		  var value_player = Blockly.JavaScript.valueToCode(block, 'player', Blockly.JavaScript.ORDER_ATOMIC);
		  var value_param1 = Blockly.JavaScript.valueToCode(block, 'param1', Blockly.JavaScript.ORDER_ATOMIC);
		  var value_param2 = Blockly.JavaScript.valueToCode(block, 'param2', Blockly.JavaScript.ORDER_ATOMIC);
		  var value_param3 = Blockly.JavaScript.valueToCode(block, 'param3', Blockly.JavaScript.ORDER_ATOMIC);
		  var value_param4 = Blockly.JavaScript.valueToCode(block, 'param4', Blockly.JavaScript.ORDER_ATOMIC);
		  var value_param5 = Blockly.JavaScript.valueToCode(block, 'param5', Blockly.JavaScript.ORDER_ATOMIC);
		  var code = "CMD.callFunction(player, ";
		  code += value_fn +", ";
		  code += value_player;
		  code += ', "'+value_param1;
		  code += '", "'+value_param2;
		  code += '", "'+value_param3;
		  code += '", "'+value_param4;
		  code += '", "'+value_param5;
		  code += '");\n';
		  return code;
		};
		
		Blockly.JavaScript['customimage_var'] = function(block) {
			var variable_url = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('url'), Blockly.Variables.NAME_TYPE);
			var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
			var code = '"IM="+'+variable_url+'+",TY=e.item_frame;"'+addPlusIfNotEmpty(value_singleblock);

			return [ code, Blockly.JavaScript.ORDER_NONE ];
		};
		
		Blockly.JavaScript['minecraft_talking'] = function(block) {
			var variable_text = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('text'), Blockly.Variables.NAME_TYPE);
			var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
			var code = '"TA="+'+variable_text+addReplaceCommasAndSemicolons()+'+","'+addPlusIfNotEmpty(value_singleblock);
			return [ code, Blockly.JavaScript.ORDER_NONE ];
		};
		
		Blockly.JavaScript['minecraft_materialNothing'] = function(block) {
			var value_singleblock = Blockly.JavaScript.valueToCode(block, 'singleblock', Blockly.JavaScript.ORDER_NONE);
			var code = '"TY=X.EMPTY,"'+addPlusIfNotEmpty(value_singleblock);
			return [ code, Blockly.JavaScript.ORDER_NONE ];
		}

		Blockly.JavaScript['minecraft_group'] = function(block) {
		  var statements_codeblocks = Blockly.JavaScript.statementToCode(block, 'CodeBlocks');
		  return statements_codeblocks;
		};

		Blockly.JavaScript['minecraft_voronoi'] = function(block) {
		  var dropdown_fill = block.getFieldValue('fill');
		  var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
		  var value_length = Blockly.JavaScript.valueToCode(block, 'length', Blockly.JavaScript.ORDER_ATOMIC);
		  var value_points = Blockly.JavaScript.valueToCode(block, 'points', Blockly.JavaScript.ORDER_ATOMIC);
		  var value_materials = Blockly.JavaScript.valueToCode(block, 'materials', Blockly.JavaScript.ORDER_ATOMIC);
			var code = 'CMD.createVoronoi(nextLocation, ';
			code += dropdown_fill + ", ";
			code += value_width + ", ";
			code += value_length + ", ";
			code += value_points + ", ";
			code += cleanMaterialList(value_materials);
			code += ", player, startCmdTime);\n";
		  return code;
		};		
		
	