/**
 * @fileoverview Logic blocks for Blockly.
 * @author Lauro Canonica
 */
'use strict';

goog.provide('Blockly.Blocks.minecraft');

goog.require('Blockly.Blocks');

function compareMCobjects(a,b){
	if(a[0]==b[0]) {
		return 0;
	} else if(a[0]>b[0]) {
		return 1;
	} else {
		return -1;
	}
}


function getEntities() {
	var entList= [ 
 		   [ Blockly.Msg.e_allay, 'e.allay' ],
		   [ Blockly.Msg.e_armadillo, 'e.armadillo' ],
		   [ Blockly.Msg.e_armor_stand, 'e.armor_stand' ],
		   [ Blockly.Msg.e_axolotl, 'e.axolotl' ],
		   [ Blockly.Msg.e_bamboo_chest_raft, 'e.bamboo_chest_raft' ],
		   [ Blockly.Msg.e_bamboo_raft, 'e.bamboo_raft' ],
		   [ Blockly.Msg.e_bat, 'e.bat' ],
		   [ Blockly.Msg.e_bee, 'e.bee' ],
		   [ Blockly.Msg.e_birch_boat, 'e.birch_boat' ],
		   [ Blockly.Msg.e_birch_chest_boat, 'e.birch_chest_boat' ],
		   [ Blockly.Msg.e_blaze, 'e.blaze' ],
		   [ Blockly.Msg.e_block_display, 'e.block_display' ],
		   [ Blockly.Msg.e_bogged, 'e.bogged' ],
		   [ Blockly.Msg.e_breeze, 'e.breeze' ],
		   [ Blockly.Msg.e_camel, 'e.camel' ],
		   [ Blockly.Msg.e_cat, 'e.cat' ],
		   [ Blockly.Msg.e_cave_spider, 'e.cave_spider' ],
		   [ Blockly.Msg.e_cherry_boat, 'e.cherry_boat' ],
		   [ Blockly.Msg.e_cherry_chest_boat, 'e.cherry_chest_boat' ],
		   [ Blockly.Msg.e_chest_minecart, 'e.chest_minecart' ],
		   [ Blockly.Msg.e_chicken, 'e.chicken' ],
		   [ Blockly.Msg.e_cod, 'e.cod' ],
		   [ Blockly.Msg.e_copper_golem, 'e.copper_golem' ],
		   [ Blockly.Msg.e_cow, 'e.cow' ],
		   [ Blockly.Msg.e_creaking, 'e.creaking' ],
		   [ Blockly.Msg.e_creeper, 'e.creeper' ],
		   [ Blockly.Msg.e_dark_oak_boat, 'e.dark_oak_boat' ],
		   [ Blockly.Msg.e_dark_oak_chest_boat, 'e.dark_oak_chest_boat' ],
		   [ Blockly.Msg.e_dolphin, 'e.dolphin' ],
		   [ Blockly.Msg.e_donkey, 'e.donkey' ],
		   [ Blockly.Msg.e_drowned, 'e.drowned' ],
		   [ Blockly.Msg.e_egg, 'e.egg' ],
		   [ Blockly.Msg.e_elder_guardian, 'e.elder_guardian' ],
		   [ Blockly.Msg.e_end_crystal, 'e.end_crystal' ],
		   [ Blockly.Msg.e_enderman, 'e.enderman' ],
		   [ Blockly.Msg.e_endermite, 'e.endermite' ],
		   [ Blockly.Msg.e_evoker, 'e.evoker' ],
		   [ Blockly.Msg.e_evoker_fangs, 'e.evoker_fangs' ],
		   [ Blockly.Msg.e_eye_of_ender, 'e.eye_of_ender' ],
		   [ Blockly.Msg.e_firework_rocket, 'e.firework_rocket' ],
		   [ Blockly.Msg.e_fishing_bobber, 'e.fishing_bobber' ],
		   [ Blockly.Msg.e_fox, 'e.fox' ],
		   [ Blockly.Msg.e_frog, 'e.frog' ],
		   [ Blockly.Msg.e_furnace_minecart, 'e.furnace_minecart' ],
		   [ Blockly.Msg.e_ghast, 'e.ghast' ],
		   [ Blockly.Msg.e_glow_item_frame, 'e.glow_item_frame' ],
		   [ Blockly.Msg.e_glow_squid, 'e.glow_squid' ],
		   [ Blockly.Msg.e_goat, 'e.goat' ],
		   [ Blockly.Msg.e_guardian, 'e.guardian' ],
		   [ Blockly.Msg.e_happy_ghast, 'e.happy_ghast' ],
		   [ Blockly.Msg.e_hoglin, 'e.hoglin' ],
		   [ Blockly.Msg.e_horse, 'e.horse' ],
		   [ Blockly.Msg.e_husk, 'e.husk' ],
		   [ Blockly.Msg.e_illusioner, 'e.illusioner' ],
		   [ Blockly.Msg.e_iron_golem, 'e.iron_golem' ],
		   [ Blockly.Msg.e_item_frame, 'e.item_frame' ],
		   [ Blockly.Msg.e_jungle_boat, 'e.jungle_boat' ],
		   [ Blockly.Msg.e_jungle_chest_boat, 'e.jungle_chest_boat' ],
		   [ Blockly.Msg.e_lightning_bolt, 'e.lightning_bolt' ],
		   [ Blockly.Msg.e_llama, 'e.llama' ],
		   [ Blockly.Msg.e_magma_cube, 'e.magma_cube' ],
		   [ Blockly.Msg.e_mangrove_boat, 'e.mangrove_boat' ],
		   [ Blockly.Msg.e_mangrove_chest_boat, 'e.mangrove_chest_boat' ],
		   [ Blockly.Msg.e_mannequin, 'e.mannequin' ],
		   [ Blockly.Msg.e_marker, 'e.marker' ],
		   [ Blockly.Msg.e_minecart, 'e.minecart' ],
		   [ Blockly.Msg.e_mooshroom, 'e.mooshroom' ],
		   [ Blockly.Msg.e_mule, 'e.mule' ],
		   [ Blockly.Msg.e_oak_boat, 'e.oak_boat' ],
		   [ Blockly.Msg.e_oak_chest_boat, 'e.oak_chest_boat' ],
		   [ Blockly.Msg.e_ocelot, 'e.ocelot' ],
		   [ Blockly.Msg.e_painting, 'e.painting' ],
		   [ Blockly.Msg.e_pale_oak_boat, 'e.pale_oak_boat' ],
		   [ Blockly.Msg.e_pale_oak_chest_boat, 'e.pale_oak_chest_boat' ],
		   [ Blockly.Msg.e_panda, 'e.panda' ],
		   [ Blockly.Msg.e_parrot, 'e.parrot' ],
		   [ Blockly.Msg.e_phantom, 'e.phantom' ],
		   [ Blockly.Msg.e_pig, 'e.pig' ],
		   [ Blockly.Msg.e_piglin, 'e.piglin' ],
		   [ Blockly.Msg.e_piglin_brute, 'e.piglin_brute' ],
		   [ Blockly.Msg.e_pillager, 'e.pillager' ],
		   [ Blockly.Msg.e_polar_bear, 'e.polar_bear' ],
		   [ Blockly.Msg.e_pufferfish, 'e.pufferfish' ],
		   [ Blockly.Msg.e_rabbit, 'e.rabbit' ],
		   [ Blockly.Msg.e_ravager, 'e.ravager' ],
		   [ Blockly.Msg.e_salmon, 'e.salmon' ],
		   [ Blockly.Msg.e_sheep, 'e.sheep' ],
		   [ Blockly.Msg.e_shulker, 'e.shulker' ],
		   [ Blockly.Msg.e_silverfish, 'e.silverfish' ],
		   [ Blockly.Msg.e_skeleton, 'e.skeleton' ],
		   [ Blockly.Msg.e_skeleton_horse, 'e.skeleton_horse' ],
		   [ Blockly.Msg.e_slime, 'e.slime' ],
		   [ Blockly.Msg.e_sniffer, 'e.sniffer' ],
		   [ Blockly.Msg.e_snow_golem, 'e.snow_golem' ],
		   [ Blockly.Msg.e_spider, 'e.spider' ],
		   [ Blockly.Msg.e_spruce_boat, 'e.spruce_boat' ],
		   [ Blockly.Msg.e_spruce_chest_boat, 'e.spruce_chest_boat' ],
		   [ Blockly.Msg.e_squid, 'e.squid' ],
		   [ Blockly.Msg.e_stray, 'e.stray' ],
		   [ Blockly.Msg.e_strider, 'e.strider' ],
		   [ Blockly.Msg.e_tadpole, 'e.tadpole' ],
		   [ Blockly.Msg.e_text_display, 'e.text_display' ],
		   [ Blockly.Msg.e_trader_llama, 'e.trader_llama' ],
		   [ Blockly.Msg.e_trident, 'e.trident' ],
		   [ Blockly.Msg.e_tropical_fish, 'e.tropical_fish' ],
		   [ Blockly.Msg.e_turtle, 'e.turtle' ],
		   [ Blockly.Msg.e_vex, 'e.vex' ],
		   [ Blockly.Msg.e_villager, 'e.villager' ],
		   [ Blockly.Msg.e_vindicator, 'e.vindicator' ],
		   [ Blockly.Msg.e_wandering_trader, 'e.wandering_trader' ],
		   [ Blockly.Msg.e_wolf, 'e.wolf' ],
		   [ Blockly.Msg.e_zoglin, 'e.zoglin' ],
		   [ Blockly.Msg.e_zombie, 'e.zombie' ],
		   [ Blockly.Msg.e_zombie_horse, 'e.zombie_horse' ],
		   [ Blockly.Msg.e_zombie_villager, 'e.zombie_villager' ],
		   [ Blockly.Msg.e_zombified_piglin, 'e.zombified_piglin' ]

		].sort(compareMCobjects);
		return entList;
}


function getMaterials() {
	var obList= [  
		   [ Blockly.Msg.b_acacia_button, 'b.acacia_button' ],
		   [ Blockly.Msg.b_acacia_door, 'b.acacia_door' ],
		   [ Blockly.Msg.b_acacia_fence, 'b.acacia_fence' ],
		   [ Blockly.Msg.b_acacia_fence_gate, 'b.acacia_fence_gate' ],
		   [ Blockly.Msg.b_acacia_hanging_sign, 'b.acacia_hanging_sign' ],
		   [ Blockly.Msg.b_acacia_leaves, 'b.acacia_leaves' ],
		   [ Blockly.Msg.b_acacia_log, 'b.acacia_log' ],
		   [ Blockly.Msg.b_acacia_planks, 'b.acacia_planks' ],
		   [ Blockly.Msg.b_acacia_pressure_plate, 'b.acacia_pressure_plate' ],
		   [ Blockly.Msg.b_acacia_sapling, 'b.acacia_sapling' ],
		   [ Blockly.Msg.b_acacia_shelf, 'b.acacia_shelf' ],
		   [ Blockly.Msg.b_acacia_sign, 'b.acacia_sign' ],
		   [ Blockly.Msg.b_acacia_slab, 'b.acacia_slab' ],
		   [ Blockly.Msg.b_acacia_stairs, 'b.acacia_stairs' ],
		   [ Blockly.Msg.b_acacia_trapdoor, 'b.acacia_trapdoor' ],
		   [ Blockly.Msg.b_acacia_wall_hanging_sign, 'b.acacia_wall_hanging_sign' ],
		   [ Blockly.Msg.b_acacia_wall_sign, 'b.acacia_wall_sign' ],
		   [ Blockly.Msg.b_acacia_wood, 'b.acacia_wood' ],
		   [ Blockly.Msg.b_activator_rail, 'b.activator_rail' ],
		   [ Blockly.Msg.b_air, 'b.air' ],
		   [ Blockly.Msg.b_allium, 'b.allium' ],
		   [ Blockly.Msg.b_amethyst_block, 'b.amethyst_block' ],
		   [ Blockly.Msg.b_amethyst_cluster, 'b.amethyst_cluster' ],
		   [ Blockly.Msg.b_ancient_debris, 'b.ancient_debris' ],
		   [ Blockly.Msg.b_andesite, 'b.andesite' ],
		   [ Blockly.Msg.b_andesite_slab, 'b.andesite_slab' ],
		   [ Blockly.Msg.b_andesite_stairs, 'b.andesite_stairs' ],
		   [ Blockly.Msg.b_andesite_wall, 'b.andesite_wall' ],
		   [ Blockly.Msg.b_anvil, 'b.anvil' ],
		   [ Blockly.Msg.b_attached_melon_stem, 'b.attached_melon_stem' ],
		   [ Blockly.Msg.b_attached_pumpkin_stem, 'b.attached_pumpkin_stem' ],
		   [ Blockly.Msg.b_azalea, 'b.azalea' ],
		   [ Blockly.Msg.b_azalea_leaves, 'b.azalea_leaves' ],
		   [ Blockly.Msg.b_azure_bluet, 'b.azure_bluet' ],
		   [ Blockly.Msg.b_bamboo, 'b.bamboo' ],
		   [ Blockly.Msg.b_bamboo_block, 'b.bamboo_block' ],
		   [ Blockly.Msg.b_bamboo_button, 'b.bamboo_button' ],
		   [ Blockly.Msg.b_bamboo_door, 'b.bamboo_door' ],
		   [ Blockly.Msg.b_bamboo_fence, 'b.bamboo_fence' ],
		   [ Blockly.Msg.b_bamboo_fence_gate, 'b.bamboo_fence_gate' ],
		   [ Blockly.Msg.b_bamboo_hanging_sign, 'b.bamboo_hanging_sign' ],
		   [ Blockly.Msg.b_bamboo_mosaic, 'b.bamboo_mosaic' ],
		   [ Blockly.Msg.b_bamboo_mosaic_slab, 'b.bamboo_mosaic_slab' ],
		   [ Blockly.Msg.b_bamboo_mosaic_stairs, 'b.bamboo_mosaic_stairs' ],
		   [ Blockly.Msg.b_bamboo_planks, 'b.bamboo_planks' ],
		   [ Blockly.Msg.b_bamboo_pressure_plate, 'b.bamboo_pressure_plate' ],
		   [ Blockly.Msg.b_bamboo_sapling, 'b.bamboo_sapling' ],
		   [ Blockly.Msg.b_bamboo_shelf, 'b.bamboo_shelf' ],
		   [ Blockly.Msg.b_bamboo_sign, 'b.bamboo_sign' ],
		   [ Blockly.Msg.b_bamboo_slab, 'b.bamboo_slab' ],
		   [ Blockly.Msg.b_bamboo_stairs, 'b.bamboo_stairs' ],
		   [ Blockly.Msg.b_bamboo_trapdoor, 'b.bamboo_trapdoor' ],
		   [ Blockly.Msg.b_bamboo_wall_hanging_sign, 'b.bamboo_wall_hanging_sign' ],
		   [ Blockly.Msg.b_bamboo_wall_sign, 'b.bamboo_wall_sign' ],
		   [ Blockly.Msg.b_barrel, 'b.barrel' ],
		   [ Blockly.Msg.b_barrier, 'b.barrier' ],
		   [ Blockly.Msg.b_basalt, 'b.basalt' ],
		   [ Blockly.Msg.b_beacon, 'b.beacon' ],
		   [ Blockly.Msg.b_bedrock, 'b.bedrock' ],
		   [ Blockly.Msg.b_bee_nest, 'b.bee_nest' ],
		   [ Blockly.Msg.b_beehive, 'b.beehive' ],
		   [ Blockly.Msg.b_beetroots, 'b.beetroots' ],
		   [ Blockly.Msg.b_bell, 'b.bell' ],
		   [ Blockly.Msg.b_big_dripleaf, 'b.big_dripleaf' ],
		   [ Blockly.Msg.b_big_dripleaf_stem, 'b.big_dripleaf_stem' ],
		   [ Blockly.Msg.b_birch_button, 'b.birch_button' ],
		   [ Blockly.Msg.b_birch_door, 'b.birch_door' ],
		   [ Blockly.Msg.b_birch_fence, 'b.birch_fence' ],
		   [ Blockly.Msg.b_birch_fence_gate, 'b.birch_fence_gate' ],
		   [ Blockly.Msg.b_birch_hanging_sign, 'b.birch_hanging_sign' ],
		   [ Blockly.Msg.b_birch_leaves, 'b.birch_leaves' ],
		   [ Blockly.Msg.b_birch_log, 'b.birch_log' ],
		   [ Blockly.Msg.b_birch_planks, 'b.birch_planks' ],
		   [ Blockly.Msg.b_birch_pressure_plate, 'b.birch_pressure_plate' ],
		   [ Blockly.Msg.b_birch_sapling, 'b.birch_sapling' ],
		   [ Blockly.Msg.b_birch_shelf, 'b.birch_shelf' ],
		   [ Blockly.Msg.b_birch_sign, 'b.birch_sign' ],
		   [ Blockly.Msg.b_birch_slab, 'b.birch_slab' ],
		   [ Blockly.Msg.b_birch_stairs, 'b.birch_stairs' ],
		   [ Blockly.Msg.b_birch_trapdoor, 'b.birch_trapdoor' ],
		   [ Blockly.Msg.b_birch_wall_hanging_sign, 'b.birch_wall_hanging_sign' ],
		   [ Blockly.Msg.b_birch_wall_sign, 'b.birch_wall_sign' ],
		   [ Blockly.Msg.b_birch_wood, 'b.birch_wood' ],
		   [ Blockly.Msg.b_black_banner, 'b.black_banner' ],
		   [ Blockly.Msg.b_black_bed, 'b.black_bed' ],
		   [ Blockly.Msg.b_black_candle, 'b.black_candle' ],
		   [ Blockly.Msg.b_black_candle_cake, 'b.black_candle_cake' ],
		   [ Blockly.Msg.b_black_carpet, 'b.black_carpet' ],
		   [ Blockly.Msg.b_black_concrete, 'b.black_concrete' ],
		   [ Blockly.Msg.b_black_concrete_powder, 'b.black_concrete_powder' ],
		   [ Blockly.Msg.b_black_glazed_terracotta, 'b.black_glazed_terracotta' ],
		   [ Blockly.Msg.b_black_shulker_box, 'b.black_shulker_box' ],
		   [ Blockly.Msg.b_black_stained_glass, 'b.black_stained_glass' ],
		   [ Blockly.Msg.b_black_stained_glass_pane, 'b.black_stained_glass_pane' ],
		   [ Blockly.Msg.b_black_terracotta, 'b.black_terracotta' ],
		   [ Blockly.Msg.b_black_wool, 'b.black_wool' ],
		   [ Blockly.Msg.b_blackstone, 'b.blackstone' ],
		   [ Blockly.Msg.b_blackstone_slab, 'b.blackstone_slab' ],
		   [ Blockly.Msg.b_blackstone_stairs, 'b.blackstone_stairs' ],
		   [ Blockly.Msg.b_blackstone_wall, 'b.blackstone_wall' ],
		   [ Blockly.Msg.b_blast_furnace, 'b.blast_furnace' ],
		   [ Blockly.Msg.b_blue_banner, 'b.blue_banner' ],
		   [ Blockly.Msg.b_blue_bed, 'b.blue_bed' ],
		   [ Blockly.Msg.b_blue_candle, 'b.blue_candle' ],
		   [ Blockly.Msg.b_blue_candle_cake, 'b.blue_candle_cake' ],
		   [ Blockly.Msg.b_blue_carpet, 'b.blue_carpet' ],
		   [ Blockly.Msg.b_blue_concrete, 'b.blue_concrete' ],
		   [ Blockly.Msg.b_blue_concrete_powder, 'b.blue_concrete_powder' ],
		   [ Blockly.Msg.b_blue_glazed_terracotta, 'b.blue_glazed_terracotta' ],
		   [ Blockly.Msg.b_blue_ice, 'b.blue_ice' ],
		   [ Blockly.Msg.b_blue_orchid, 'b.blue_orchid' ],
		   [ Blockly.Msg.b_blue_shulker_box, 'b.blue_shulker_box' ],
		   [ Blockly.Msg.b_blue_stained_glass, 'b.blue_stained_glass' ],
		   [ Blockly.Msg.b_blue_stained_glass_pane, 'b.blue_stained_glass_pane' ],
		   [ Blockly.Msg.b_blue_terracotta, 'b.blue_terracotta' ],
		   [ Blockly.Msg.b_blue_wool, 'b.blue_wool' ],
		   [ Blockly.Msg.b_bone_block, 'b.bone_block' ],
		   [ Blockly.Msg.b_bookshelf, 'b.bookshelf' ],
		   [ Blockly.Msg.b_brain_coral, 'b.brain_coral' ],
		   [ Blockly.Msg.b_brain_coral_block, 'b.brain_coral_block' ],
		   [ Blockly.Msg.b_brain_coral_fan, 'b.brain_coral_fan' ],
		   [ Blockly.Msg.b_brain_coral_wall_fan, 'b.brain_coral_wall_fan' ],
		   [ Blockly.Msg.b_brewing_stand, 'b.brewing_stand' ],
		   [ Blockly.Msg.b_brick_slab, 'b.brick_slab' ],
		   [ Blockly.Msg.b_brick_stairs, 'b.brick_stairs' ],
		   [ Blockly.Msg.b_brick_wall, 'b.brick_wall' ],
		   [ Blockly.Msg.b_bricks, 'b.bricks' ],
		   [ Blockly.Msg.b_brown_banner, 'b.brown_banner' ],
		   [ Blockly.Msg.b_brown_bed, 'b.brown_bed' ],
		   [ Blockly.Msg.b_brown_candle, 'b.brown_candle' ],
		   [ Blockly.Msg.b_brown_candle_cake, 'b.brown_candle_cake' ],
		   [ Blockly.Msg.b_brown_carpet, 'b.brown_carpet' ],
		   [ Blockly.Msg.b_brown_concrete, 'b.brown_concrete' ],
		   [ Blockly.Msg.b_brown_concrete_powder, 'b.brown_concrete_powder' ],
		   [ Blockly.Msg.b_brown_glazed_terracotta, 'b.brown_glazed_terracotta' ],
		   [ Blockly.Msg.b_brown_mushroom, 'b.brown_mushroom' ],
		   [ Blockly.Msg.b_brown_mushroom_block, 'b.brown_mushroom_block' ],
		   [ Blockly.Msg.b_brown_shulker_box, 'b.brown_shulker_box' ],
		   [ Blockly.Msg.b_brown_stained_glass, 'b.brown_stained_glass' ],
		   [ Blockly.Msg.b_brown_stained_glass_pane, 'b.brown_stained_glass_pane' ],
		   [ Blockly.Msg.b_brown_terracotta, 'b.brown_terracotta' ],
		   [ Blockly.Msg.b_brown_wool, 'b.brown_wool' ],
		   [ Blockly.Msg.b_bubble_column, 'b.bubble_column' ],
		   [ Blockly.Msg.b_bubble_coral, 'b.bubble_coral' ],
		   [ Blockly.Msg.b_bubble_coral_block, 'b.bubble_coral_block' ],
		   [ Blockly.Msg.b_bubble_coral_fan, 'b.bubble_coral_fan' ],
		   [ Blockly.Msg.b_bubble_coral_wall_fan, 'b.bubble_coral_wall_fan' ],
		   [ Blockly.Msg.b_budding_amethyst, 'b.budding_amethyst' ],
		   [ Blockly.Msg.b_bush, 'b.bush' ],
		   [ Blockly.Msg.b_cactus, 'b.cactus' ],
		   [ Blockly.Msg.b_cactus_flower, 'b.cactus_flower' ],
		   [ Blockly.Msg.b_cake, 'b.cake' ],
		   [ Blockly.Msg.b_calcite, 'b.calcite' ],
		   [ Blockly.Msg.b_calibrated_sculk_sensor, 'b.calibrated_sculk_sensor' ],
		   [ Blockly.Msg.b_candle, 'b.candle' ],
		   [ Blockly.Msg.b_candle_cake, 'b.candle_cake' ],
		   [ Blockly.Msg.b_carrots, 'b.carrots' ],
		   [ Blockly.Msg.b_cartography_table, 'b.cartography_table' ],
		   [ Blockly.Msg.b_carved_pumpkin, 'b.carved_pumpkin' ],
		   [ Blockly.Msg.b_cauldron, 'b.cauldron' ],
		   [ Blockly.Msg.b_cave_air, 'b.cave_air' ],
		   [ Blockly.Msg.b_cave_vines, 'b.cave_vines' ],
		   [ Blockly.Msg.b_cave_vines_plant, 'b.cave_vines_plant' ],
		   [ Blockly.Msg.b_cherry_button, 'b.cherry_button' ],
		   [ Blockly.Msg.b_cherry_door, 'b.cherry_door' ],
		   [ Blockly.Msg.b_cherry_fence, 'b.cherry_fence' ],
		   [ Blockly.Msg.b_cherry_fence_gate, 'b.cherry_fence_gate' ],
		   [ Blockly.Msg.b_cherry_hanging_sign, 'b.cherry_hanging_sign' ],
		   [ Blockly.Msg.b_cherry_leaves, 'b.cherry_leaves' ],
		   [ Blockly.Msg.b_cherry_log, 'b.cherry_log' ],
		   [ Blockly.Msg.b_cherry_planks, 'b.cherry_planks' ],
		   [ Blockly.Msg.b_cherry_pressure_plate, 'b.cherry_pressure_plate' ],
		   [ Blockly.Msg.b_cherry_sapling, 'b.cherry_sapling' ],
		   [ Blockly.Msg.b_cherry_shelf, 'b.cherry_shelf' ],
		   [ Blockly.Msg.b_cherry_sign, 'b.cherry_sign' ],
		   [ Blockly.Msg.b_cherry_slab, 'b.cherry_slab' ],
		   [ Blockly.Msg.b_cherry_stairs, 'b.cherry_stairs' ],
		   [ Blockly.Msg.b_cherry_trapdoor, 'b.cherry_trapdoor' ],
		   [ Blockly.Msg.b_cherry_wall_hanging_sign, 'b.cherry_wall_hanging_sign' ],
		   [ Blockly.Msg.b_cherry_wall_sign, 'b.cherry_wall_sign' ],
		   [ Blockly.Msg.b_cherry_wood, 'b.cherry_wood' ],
		   [ Blockly.Msg.b_chest, 'b.chest' ],
		   [ Blockly.Msg.b_chipped_anvil, 'b.chipped_anvil' ],
		   [ Blockly.Msg.b_chiseled_bookshelf, 'b.chiseled_bookshelf' ],
		   [ Blockly.Msg.b_chiseled_copper, 'b.chiseled_copper' ],
		   [ Blockly.Msg.b_chiseled_deepslate, 'b.chiseled_deepslate' ],
		   [ Blockly.Msg.b_chiseled_nether_bricks, 'b.chiseled_nether_bricks' ],
		   [ Blockly.Msg.b_chiseled_polished_blackstone, 'b.chiseled_polished_blackstone' ],
		   [ Blockly.Msg.b_chiseled_quartz_block, 'b.chiseled_quartz_block' ],
		   [ Blockly.Msg.b_chiseled_red_sandstone, 'b.chiseled_red_sandstone' ],
		   [ Blockly.Msg.b_chiseled_resin_bricks, 'b.chiseled_resin_bricks' ],
		   [ Blockly.Msg.b_chiseled_sandstone, 'b.chiseled_sandstone' ],
		   [ Blockly.Msg.b_chiseled_stone_bricks, 'b.chiseled_stone_bricks' ],
		   [ Blockly.Msg.b_chiseled_tuff, 'b.chiseled_tuff' ],
		   [ Blockly.Msg.b_chiseled_tuff_bricks, 'b.chiseled_tuff_bricks' ],
		   [ Blockly.Msg.b_chorus_flower, 'b.chorus_flower' ],
		   [ Blockly.Msg.b_chorus_plant, 'b.chorus_plant' ],
		   [ Blockly.Msg.b_clay, 'b.clay' ],
		   [ Blockly.Msg.b_closed_eyeblossom, 'b.closed_eyeblossom' ],
		   [ Blockly.Msg.b_coal_block, 'b.coal_block' ],
		   [ Blockly.Msg.b_coal_ore, 'b.coal_ore' ],
		   [ Blockly.Msg.b_coarse_dirt, 'b.coarse_dirt' ],
		   [ Blockly.Msg.b_cobbled_deepslate, 'b.cobbled_deepslate' ],
		   [ Blockly.Msg.b_cobbled_deepslate_slab, 'b.cobbled_deepslate_slab' ],
		   [ Blockly.Msg.b_cobbled_deepslate_stairs, 'b.cobbled_deepslate_stairs' ],
		   [ Blockly.Msg.b_cobbled_deepslate_wall, 'b.cobbled_deepslate_wall' ],
		   [ Blockly.Msg.b_cobblestone, 'b.cobblestone' ],
		   [ Blockly.Msg.b_cobblestone_slab, 'b.cobblestone_slab' ],
		   [ Blockly.Msg.b_cobblestone_stairs, 'b.cobblestone_stairs' ],
		   [ Blockly.Msg.b_cobblestone_wall, 'b.cobblestone_wall' ],
		   [ Blockly.Msg.b_cobweb, 'b.cobweb' ],
		   [ Blockly.Msg.b_cocoa, 'b.cocoa' ],
		   [ Blockly.Msg.b_command_block, 'b.command_block' ],
		   [ Blockly.Msg.b_comparator, 'b.comparator' ],
		   [ Blockly.Msg.b_composter, 'b.composter' ],
		   [ Blockly.Msg.b_conduit, 'b.conduit' ],
		   [ Blockly.Msg.b_copper_bars, 'b.copper_bars' ],
		   [ Blockly.Msg.b_copper_block, 'b.copper_block' ],
		   [ Blockly.Msg.b_copper_bulb, 'b.copper_bulb' ],
		   [ Blockly.Msg.b_copper_chain, 'b.copper_chain' ],
		   [ Blockly.Msg.b_copper_chest, 'b.copper_chest' ],
		   [ Blockly.Msg.b_copper_door, 'b.copper_door' ],
		   [ Blockly.Msg.b_copper_golem_statue, 'b.copper_golem_statue' ],
		   [ Blockly.Msg.b_copper_grate, 'b.copper_grate' ],
		   [ Blockly.Msg.b_copper_lantern, 'b.copper_lantern' ],
		   [ Blockly.Msg.b_copper_ore, 'b.copper_ore' ],
		   [ Blockly.Msg.b_copper_torch, 'b.copper_torch' ],
		   [ Blockly.Msg.b_copper_trapdoor, 'b.copper_trapdoor' ],
		   [ Blockly.Msg.b_copper_wall_torch, 'b.copper_wall_torch' ],
		   [ Blockly.Msg.b_cornflower, 'b.cornflower' ],
		   [ Blockly.Msg.b_cracked_deepslate_bricks, 'b.cracked_deepslate_bricks' ],
		   [ Blockly.Msg.b_cracked_deepslate_tiles, 'b.cracked_deepslate_tiles' ],
		   [ Blockly.Msg.b_cracked_nether_bricks, 'b.cracked_nether_bricks' ],
		   [ Blockly.Msg.b_cracked_polished_blackstone_bricks, 'b.cracked_polished_blackstone_bricks' ],
		   [ Blockly.Msg.b_cracked_stone_bricks, 'b.cracked_stone_bricks' ],
		   [ Blockly.Msg.b_crafter, 'b.crafter' ],
		   [ Blockly.Msg.b_crafting_table, 'b.crafting_table' ],
		   [ Blockly.Msg.b_creaking_heart, 'b.creaking_heart' ],
		   [ Blockly.Msg.b_creeper_head, 'b.creeper_head' ],
		   [ Blockly.Msg.b_creeper_wall_head, 'b.creeper_wall_head' ],
		   [ Blockly.Msg.b_crimson_button, 'b.crimson_button' ],
		   [ Blockly.Msg.b_crimson_door, 'b.crimson_door' ],
		   [ Blockly.Msg.b_crimson_fence, 'b.crimson_fence' ],
		   [ Blockly.Msg.b_crimson_fence_gate, 'b.crimson_fence_gate' ],
		   [ Blockly.Msg.b_crimson_fungus, 'b.crimson_fungus' ],
		   [ Blockly.Msg.b_crimson_hanging_sign, 'b.crimson_hanging_sign' ],
		   [ Blockly.Msg.b_crimson_hyphae, 'b.crimson_hyphae' ],
		   [ Blockly.Msg.b_crimson_nylium, 'b.crimson_nylium' ],
		   [ Blockly.Msg.b_crimson_planks, 'b.crimson_planks' ],
		   [ Blockly.Msg.b_crimson_pressure_plate, 'b.crimson_pressure_plate' ],
		   [ Blockly.Msg.b_crimson_roots, 'b.crimson_roots' ],
		   [ Blockly.Msg.b_crimson_shelf, 'b.crimson_shelf' ],
		   [ Blockly.Msg.b_crimson_sign, 'b.crimson_sign' ],
		   [ Blockly.Msg.b_crimson_slab, 'b.crimson_slab' ],
		   [ Blockly.Msg.b_crimson_stairs, 'b.crimson_stairs' ],
		   [ Blockly.Msg.b_crimson_stem, 'b.crimson_stem' ],
		   [ Blockly.Msg.b_crimson_trapdoor, 'b.crimson_trapdoor' ],
		   [ Blockly.Msg.b_crimson_wall_hanging_sign, 'b.crimson_wall_hanging_sign' ],
		   [ Blockly.Msg.b_crimson_wall_sign, 'b.crimson_wall_sign' ],
		   [ Blockly.Msg.b_crying_obsidian, 'b.crying_obsidian' ],
		   [ Blockly.Msg.b_cut_copper, 'b.cut_copper' ],
		   [ Blockly.Msg.b_cut_copper_slab, 'b.cut_copper_slab' ],
		   [ Blockly.Msg.b_cut_copper_stairs, 'b.cut_copper_stairs' ],
		   [ Blockly.Msg.b_cut_red_sandstone, 'b.cut_red_sandstone' ],
		   [ Blockly.Msg.b_cut_red_sandstone_slab, 'b.cut_red_sandstone_slab' ],
		   [ Blockly.Msg.b_cut_sandstone, 'b.cut_sandstone' ],
		   [ Blockly.Msg.b_cut_sandstone_slab, 'b.cut_sandstone_slab' ],
		   [ Blockly.Msg.b_cyan_banner, 'b.cyan_banner' ],
		   [ Blockly.Msg.b_cyan_bed, 'b.cyan_bed' ],
		   [ Blockly.Msg.b_cyan_candle, 'b.cyan_candle' ],
		   [ Blockly.Msg.b_cyan_candle_cake, 'b.cyan_candle_cake' ],
		   [ Blockly.Msg.b_cyan_carpet, 'b.cyan_carpet' ],
		   [ Blockly.Msg.b_cyan_concrete, 'b.cyan_concrete' ],
		   [ Blockly.Msg.b_cyan_concrete_powder, 'b.cyan_concrete_powder' ],
		   [ Blockly.Msg.b_cyan_glazed_terracotta, 'b.cyan_glazed_terracotta' ],
		   [ Blockly.Msg.b_cyan_shulker_box, 'b.cyan_shulker_box' ],
		   [ Blockly.Msg.b_cyan_stained_glass, 'b.cyan_stained_glass' ],
		   [ Blockly.Msg.b_cyan_stained_glass_pane, 'b.cyan_stained_glass_pane' ],
		   [ Blockly.Msg.b_cyan_terracotta, 'b.cyan_terracotta' ],
		   [ Blockly.Msg.b_cyan_wool, 'b.cyan_wool' ],
		   [ Blockly.Msg.b_damaged_anvil, 'b.damaged_anvil' ],
		   [ Blockly.Msg.b_dandelion, 'b.dandelion' ],
		   [ Blockly.Msg.b_dark_oak_button, 'b.dark_oak_button' ],
		   [ Blockly.Msg.b_dark_oak_door, 'b.dark_oak_door' ],
		   [ Blockly.Msg.b_dark_oak_fence, 'b.dark_oak_fence' ],
		   [ Blockly.Msg.b_dark_oak_fence_gate, 'b.dark_oak_fence_gate' ],
		   [ Blockly.Msg.b_dark_oak_hanging_sign, 'b.dark_oak_hanging_sign' ],
		   [ Blockly.Msg.b_dark_oak_leaves, 'b.dark_oak_leaves' ],
		   [ Blockly.Msg.b_dark_oak_log, 'b.dark_oak_log' ],
		   [ Blockly.Msg.b_dark_oak_planks, 'b.dark_oak_planks' ],
		   [ Blockly.Msg.b_dark_oak_pressure_plate, 'b.dark_oak_pressure_plate' ],
		   [ Blockly.Msg.b_dark_oak_sapling, 'b.dark_oak_sapling' ],
		   [ Blockly.Msg.b_dark_oak_shelf, 'b.dark_oak_shelf' ],
		   [ Blockly.Msg.b_dark_oak_sign, 'b.dark_oak_sign' ],
		   [ Blockly.Msg.b_dark_oak_slab, 'b.dark_oak_slab' ],
		   [ Blockly.Msg.b_dark_oak_stairs, 'b.dark_oak_stairs' ],
		   [ Blockly.Msg.b_dark_oak_trapdoor, 'b.dark_oak_trapdoor' ],
		   [ Blockly.Msg.b_dark_oak_wall_hanging_sign, 'b.dark_oak_wall_hanging_sign' ],
		   [ Blockly.Msg.b_dark_oak_wall_sign, 'b.dark_oak_wall_sign' ],
		   [ Blockly.Msg.b_dark_oak_wood, 'b.dark_oak_wood' ],
		   [ Blockly.Msg.b_dark_prismarine, 'b.dark_prismarine' ],
		   [ Blockly.Msg.b_dark_prismarine_slab, 'b.dark_prismarine_slab' ],
		   [ Blockly.Msg.b_dark_prismarine_stairs, 'b.dark_prismarine_stairs' ],
		   [ Blockly.Msg.b_daylight_detector, 'b.daylight_detector' ],
		   [ Blockly.Msg.b_dead_brain_coral, 'b.dead_brain_coral' ],
		   [ Blockly.Msg.b_dead_brain_coral_block, 'b.dead_brain_coral_block' ],
		   [ Blockly.Msg.b_dead_brain_coral_fan, 'b.dead_brain_coral_fan' ],
		   [ Blockly.Msg.b_dead_brain_coral_wall_fan, 'b.dead_brain_coral_wall_fan' ],
		   [ Blockly.Msg.b_dead_bubble_coral, 'b.dead_bubble_coral' ],
		   [ Blockly.Msg.b_dead_bubble_coral_block, 'b.dead_bubble_coral_block' ],
		   [ Blockly.Msg.b_dead_bubble_coral_fan, 'b.dead_bubble_coral_fan' ],
		   [ Blockly.Msg.b_dead_bubble_coral_wall_fan, 'b.dead_bubble_coral_wall_fan' ],
		   [ Blockly.Msg.b_dead_bush, 'b.dead_bush' ],
		   [ Blockly.Msg.b_dead_fire_coral, 'b.dead_fire_coral' ],
		   [ Blockly.Msg.b_dead_fire_coral_block, 'b.dead_fire_coral_block' ],
		   [ Blockly.Msg.b_dead_fire_coral_fan, 'b.dead_fire_coral_fan' ],
		   [ Blockly.Msg.b_dead_fire_coral_wall_fan, 'b.dead_fire_coral_wall_fan' ],
		   [ Blockly.Msg.b_dead_horn_coral, 'b.dead_horn_coral' ],
		   [ Blockly.Msg.b_dead_horn_coral_block, 'b.dead_horn_coral_block' ],
		   [ Blockly.Msg.b_dead_horn_coral_fan, 'b.dead_horn_coral_fan' ],
		   [ Blockly.Msg.b_dead_horn_coral_wall_fan, 'b.dead_horn_coral_wall_fan' ],
		   [ Blockly.Msg.b_dead_tube_coral, 'b.dead_tube_coral' ],
		   [ Blockly.Msg.b_dead_tube_coral_block, 'b.dead_tube_coral_block' ],
		   [ Blockly.Msg.b_dead_tube_coral_fan, 'b.dead_tube_coral_fan' ],
		   [ Blockly.Msg.b_dead_tube_coral_wall_fan, 'b.dead_tube_coral_wall_fan' ],
		   [ Blockly.Msg.b_decorated_pot, 'b.decorated_pot' ],
		   [ Blockly.Msg.b_deepslate, 'b.deepslate' ],
		   [ Blockly.Msg.b_deepslate_brick_slab, 'b.deepslate_brick_slab' ],
		   [ Blockly.Msg.b_deepslate_brick_stairs, 'b.deepslate_brick_stairs' ],
		   [ Blockly.Msg.b_deepslate_brick_wall, 'b.deepslate_brick_wall' ],
		   [ Blockly.Msg.b_deepslate_bricks, 'b.deepslate_bricks' ],
		   [ Blockly.Msg.b_deepslate_coal_ore, 'b.deepslate_coal_ore' ],
		   [ Blockly.Msg.b_deepslate_copper_ore, 'b.deepslate_copper_ore' ],
		   [ Blockly.Msg.b_deepslate_diamond_ore, 'b.deepslate_diamond_ore' ],
		   [ Blockly.Msg.b_deepslate_emerald_ore, 'b.deepslate_emerald_ore' ],
		   [ Blockly.Msg.b_deepslate_gold_ore, 'b.deepslate_gold_ore' ],
		   [ Blockly.Msg.b_deepslate_iron_ore, 'b.deepslate_iron_ore' ],
		   [ Blockly.Msg.b_deepslate_lapis_ore, 'b.deepslate_lapis_ore' ],
		   [ Blockly.Msg.b_deepslate_redstone_ore, 'b.deepslate_redstone_ore' ],
		   [ Blockly.Msg.b_deepslate_tile_slab, 'b.deepslate_tile_slab' ],
		   [ Blockly.Msg.b_deepslate_tile_stairs, 'b.deepslate_tile_stairs' ],
		   [ Blockly.Msg.b_deepslate_tile_wall, 'b.deepslate_tile_wall' ],
		   [ Blockly.Msg.b_deepslate_tiles, 'b.deepslate_tiles' ],
		   [ Blockly.Msg.b_detector_rail, 'b.detector_rail' ],
		   [ Blockly.Msg.b_diamond_block, 'b.diamond_block' ],
		   [ Blockly.Msg.b_diamond_ore, 'b.diamond_ore' ],
		   [ Blockly.Msg.b_diorite, 'b.diorite' ],
		   [ Blockly.Msg.b_diorite_slab, 'b.diorite_slab' ],
		   [ Blockly.Msg.b_diorite_stairs, 'b.diorite_stairs' ],
		   [ Blockly.Msg.b_diorite_wall, 'b.diorite_wall' ],
		   [ Blockly.Msg.b_dirt, 'b.dirt' ],
		   [ Blockly.Msg.b_dirt_path, 'b.dirt_path' ],
		   [ Blockly.Msg.b_dispenser, 'b.dispenser' ],
		   [ Blockly.Msg.b_dragon_egg, 'b.dragon_egg' ],
		   [ Blockly.Msg.b_dragon_head, 'b.dragon_head' ],
		   [ Blockly.Msg.b_dragon_wall_head, 'b.dragon_wall_head' ],
		   [ Blockly.Msg.b_dried_ghast, 'b.dried_ghast' ],
		   [ Blockly.Msg.b_dried_kelp_block, 'b.dried_kelp_block' ],
		   [ Blockly.Msg.b_dripstone_block, 'b.dripstone_block' ],
		   [ Blockly.Msg.b_dropper, 'b.dropper' ],
		   [ Blockly.Msg.b_emerald_block, 'b.emerald_block' ],
		   [ Blockly.Msg.b_emerald_ore, 'b.emerald_ore' ],
		   [ Blockly.Msg.b_enchanting_table, 'b.enchanting_table' ],
		   [ Blockly.Msg.b_end_rod, 'b.end_rod' ],
		   [ Blockly.Msg.b_end_stone, 'b.end_stone' ],
		   [ Blockly.Msg.b_end_stone_brick_slab, 'b.end_stone_brick_slab' ],
		   [ Blockly.Msg.b_end_stone_brick_stairs, 'b.end_stone_brick_stairs' ],
		   [ Blockly.Msg.b_end_stone_brick_wall, 'b.end_stone_brick_wall' ],
		   [ Blockly.Msg.b_end_stone_bricks, 'b.end_stone_bricks' ],
		   [ Blockly.Msg.b_ender_chest, 'b.ender_chest' ],
		   [ Blockly.Msg.b_exposed_chiseled_copper, 'b.exposed_chiseled_copper' ],
		   [ Blockly.Msg.b_exposed_copper, 'b.exposed_copper' ],
		   [ Blockly.Msg.b_exposed_copper_bars, 'b.exposed_copper_bars' ],
		   [ Blockly.Msg.b_exposed_copper_bulb, 'b.exposed_copper_bulb' ],
		   [ Blockly.Msg.b_exposed_copper_chain, 'b.exposed_copper_chain' ],
		   [ Blockly.Msg.b_exposed_copper_chest, 'b.exposed_copper_chest' ],
		   [ Blockly.Msg.b_exposed_copper_door, 'b.exposed_copper_door' ],
		   [ Blockly.Msg.b_exposed_copper_golem_statue, 'b.exposed_copper_golem_statue' ],
		   [ Blockly.Msg.b_exposed_copper_grate, 'b.exposed_copper_grate' ],
		   [ Blockly.Msg.b_exposed_copper_lantern, 'b.exposed_copper_lantern' ],
		   [ Blockly.Msg.b_exposed_copper_trapdoor, 'b.exposed_copper_trapdoor' ],
		   [ Blockly.Msg.b_exposed_cut_copper, 'b.exposed_cut_copper' ],
		   [ Blockly.Msg.b_exposed_cut_copper_slab, 'b.exposed_cut_copper_slab' ],
		   [ Blockly.Msg.b_exposed_cut_copper_stairs, 'b.exposed_cut_copper_stairs' ],
		   [ Blockly.Msg.b_exposed_lightning_rod, 'b.exposed_lightning_rod' ],
		   [ Blockly.Msg.b_farmland, 'b.farmland' ],
		   [ Blockly.Msg.b_fern, 'b.fern' ],
		   [ Blockly.Msg.b_fire, 'b.fire' ],
		   [ Blockly.Msg.b_fire_coral, 'b.fire_coral' ],
		   [ Blockly.Msg.b_fire_coral_block, 'b.fire_coral_block' ],
		   [ Blockly.Msg.b_fire_coral_fan, 'b.fire_coral_fan' ],
		   [ Blockly.Msg.b_fire_coral_wall_fan, 'b.fire_coral_wall_fan' ],
		   [ Blockly.Msg.b_firefly_bush, 'b.firefly_bush' ],
		   [ Blockly.Msg.b_fletching_table, 'b.fletching_table' ],
		   [ Blockly.Msg.b_flower_pot, 'b.flower_pot' ],
		   [ Blockly.Msg.b_flowering_azalea, 'b.flowering_azalea' ],
		   [ Blockly.Msg.b_flowering_azalea_leaves, 'b.flowering_azalea_leaves' ],
		   [ Blockly.Msg.b_frogspawn, 'b.frogspawn' ],
		   [ Blockly.Msg.b_frosted_ice, 'b.frosted_ice' ],
		   [ Blockly.Msg.b_furnace, 'b.furnace' ],
		   [ Blockly.Msg.b_gilded_blackstone, 'b.gilded_blackstone' ],
		   [ Blockly.Msg.b_glass, 'b.glass' ],
		   [ Blockly.Msg.b_glass_pane, 'b.glass_pane' ],
		   [ Blockly.Msg.b_glow_lichen, 'b.glow_lichen' ],
		   [ Blockly.Msg.b_glowstone, 'b.glowstone' ],
		   [ Blockly.Msg.b_gold_block, 'b.gold_block' ],
		   [ Blockly.Msg.b_gold_ore, 'b.gold_ore' ],
		   [ Blockly.Msg.b_granite, 'b.granite' ],
		   [ Blockly.Msg.b_granite_slab, 'b.granite_slab' ],
		   [ Blockly.Msg.b_granite_stairs, 'b.granite_stairs' ],
		   [ Blockly.Msg.b_granite_wall, 'b.granite_wall' ],
		   [ Blockly.Msg.b_grass_block, 'b.grass_block' ],
		   [ Blockly.Msg.b_gravel, 'b.gravel' ],
		   [ Blockly.Msg.b_gray_banner, 'b.gray_banner' ],
		   [ Blockly.Msg.b_gray_bed, 'b.gray_bed' ],
		   [ Blockly.Msg.b_gray_candle, 'b.gray_candle' ],
		   [ Blockly.Msg.b_gray_candle_cake, 'b.gray_candle_cake' ],
		   [ Blockly.Msg.b_gray_carpet, 'b.gray_carpet' ],
		   [ Blockly.Msg.b_gray_concrete, 'b.gray_concrete' ],
		   [ Blockly.Msg.b_gray_concrete_powder, 'b.gray_concrete_powder' ],
		   [ Blockly.Msg.b_gray_glazed_terracotta, 'b.gray_glazed_terracotta' ],
		   [ Blockly.Msg.b_gray_shulker_box, 'b.gray_shulker_box' ],
		   [ Blockly.Msg.b_gray_stained_glass, 'b.gray_stained_glass' ],
		   [ Blockly.Msg.b_gray_stained_glass_pane, 'b.gray_stained_glass_pane' ],
		   [ Blockly.Msg.b_gray_terracotta, 'b.gray_terracotta' ],
		   [ Blockly.Msg.b_gray_wool, 'b.gray_wool' ],
		   [ Blockly.Msg.b_green_banner, 'b.green_banner' ],
		   [ Blockly.Msg.b_green_bed, 'b.green_bed' ],
		   [ Blockly.Msg.b_green_candle, 'b.green_candle' ],
		   [ Blockly.Msg.b_green_candle_cake, 'b.green_candle_cake' ],
		   [ Blockly.Msg.b_green_carpet, 'b.green_carpet' ],
		   [ Blockly.Msg.b_green_concrete, 'b.green_concrete' ],
		   [ Blockly.Msg.b_green_concrete_powder, 'b.green_concrete_powder' ],
		   [ Blockly.Msg.b_green_glazed_terracotta, 'b.green_glazed_terracotta' ],
		   [ Blockly.Msg.b_green_shulker_box, 'b.green_shulker_box' ],
		   [ Blockly.Msg.b_green_stained_glass, 'b.green_stained_glass' ],
		   [ Blockly.Msg.b_green_stained_glass_pane, 'b.green_stained_glass_pane' ],
		   [ Blockly.Msg.b_green_terracotta, 'b.green_terracotta' ],
		   [ Blockly.Msg.b_green_wool, 'b.green_wool' ],
		   [ Blockly.Msg.b_grindstone, 'b.grindstone' ],
		   [ Blockly.Msg.b_hanging_roots, 'b.hanging_roots' ],
		   [ Blockly.Msg.b_hay_block, 'b.hay_block' ],
		   [ Blockly.Msg.b_heavy_core, 'b.heavy_core' ],
		   [ Blockly.Msg.b_heavy_weighted_pressure_plate, 'b.heavy_weighted_pressure_plate' ],
		   [ Blockly.Msg.b_honey_block, 'b.honey_block' ],
		   [ Blockly.Msg.b_honeycomb_block, 'b.honeycomb_block' ],
		   [ Blockly.Msg.b_horn_coral, 'b.horn_coral' ],
		   [ Blockly.Msg.b_horn_coral_block, 'b.horn_coral_block' ],
		   [ Blockly.Msg.b_horn_coral_fan, 'b.horn_coral_fan' ],
		   [ Blockly.Msg.b_horn_coral_wall_fan, 'b.horn_coral_wall_fan' ],
		   [ Blockly.Msg.b_ice, 'b.ice' ],
		   [ Blockly.Msg.b_infested_chiseled_stone_bricks, 'b.infested_chiseled_stone_bricks' ],
		   [ Blockly.Msg.b_infested_cobblestone, 'b.infested_cobblestone' ],
		   [ Blockly.Msg.b_infested_cracked_stone_bricks, 'b.infested_cracked_stone_bricks' ],
		   [ Blockly.Msg.b_infested_deepslate, 'b.infested_deepslate' ],
		   [ Blockly.Msg.b_infested_mossy_stone_bricks, 'b.infested_mossy_stone_bricks' ],
		   [ Blockly.Msg.b_infested_stone, 'b.infested_stone' ],
		   [ Blockly.Msg.b_infested_stone_bricks, 'b.infested_stone_bricks' ],
		   [ Blockly.Msg.b_iron_bars, 'b.iron_bars' ],
		   [ Blockly.Msg.b_iron_block, 'b.iron_block' ],
		   [ Blockly.Msg.b_iron_chain, 'b.iron_chain' ],
		   [ Blockly.Msg.b_iron_door, 'b.iron_door' ],
		   [ Blockly.Msg.b_iron_ore, 'b.iron_ore' ],
		   [ Blockly.Msg.b_iron_trapdoor, 'b.iron_trapdoor' ],
		   [ Blockly.Msg.b_jack_o_lantern, 'b.jack_o_lantern' ],
		   [ Blockly.Msg.b_jigsaw, 'b.jigsaw' ],
		   [ Blockly.Msg.b_jukebox, 'b.jukebox' ],
		   [ Blockly.Msg.b_jungle_button, 'b.jungle_button' ],
		   [ Blockly.Msg.b_jungle_door, 'b.jungle_door' ],
		   [ Blockly.Msg.b_jungle_fence, 'b.jungle_fence' ],
		   [ Blockly.Msg.b_jungle_fence_gate, 'b.jungle_fence_gate' ],
		   [ Blockly.Msg.b_jungle_hanging_sign, 'b.jungle_hanging_sign' ],
		   [ Blockly.Msg.b_jungle_leaves, 'b.jungle_leaves' ],
		   [ Blockly.Msg.b_jungle_log, 'b.jungle_log' ],
		   [ Blockly.Msg.b_jungle_planks, 'b.jungle_planks' ],
		   [ Blockly.Msg.b_jungle_pressure_plate, 'b.jungle_pressure_plate' ],
		   [ Blockly.Msg.b_jungle_sapling, 'b.jungle_sapling' ],
		   [ Blockly.Msg.b_jungle_shelf, 'b.jungle_shelf' ],
		   [ Blockly.Msg.b_jungle_sign, 'b.jungle_sign' ],
		   [ Blockly.Msg.b_jungle_slab, 'b.jungle_slab' ],
		   [ Blockly.Msg.b_jungle_stairs, 'b.jungle_stairs' ],
		   [ Blockly.Msg.b_jungle_trapdoor, 'b.jungle_trapdoor' ],
		   [ Blockly.Msg.b_jungle_wall_hanging_sign, 'b.jungle_wall_hanging_sign' ],
		   [ Blockly.Msg.b_jungle_wall_sign, 'b.jungle_wall_sign' ],
		   [ Blockly.Msg.b_jungle_wood, 'b.jungle_wood' ],
		   [ Blockly.Msg.b_kelp, 'b.kelp' ],
		   [ Blockly.Msg.b_kelp_plant, 'b.kelp_plant' ],
		   [ Blockly.Msg.b_ladder, 'b.ladder' ],
		   [ Blockly.Msg.b_lantern, 'b.lantern' ],
		   [ Blockly.Msg.b_lapis_block, 'b.lapis_block' ],
		   [ Blockly.Msg.b_lapis_ore, 'b.lapis_ore' ],
		   [ Blockly.Msg.b_large_amethyst_bud, 'b.large_amethyst_bud' ],
		   [ Blockly.Msg.b_large_fern, 'b.large_fern' ],
		   [ Blockly.Msg.b_leaf_litter, 'b.leaf_litter' ],
		   [ Blockly.Msg.b_lectern, 'b.lectern' ],
		   [ Blockly.Msg.b_lever, 'b.lever' ],
		   [ Blockly.Msg.b_light, 'b.light' ],
		   [ Blockly.Msg.b_light_blue_banner, 'b.light_blue_banner' ],
		   [ Blockly.Msg.b_light_blue_bed, 'b.light_blue_bed' ],
		   [ Blockly.Msg.b_light_blue_candle, 'b.light_blue_candle' ],
		   [ Blockly.Msg.b_light_blue_candle_cake, 'b.light_blue_candle_cake' ],
		   [ Blockly.Msg.b_light_blue_carpet, 'b.light_blue_carpet' ],
		   [ Blockly.Msg.b_light_blue_concrete, 'b.light_blue_concrete' ],
		   [ Blockly.Msg.b_light_blue_concrete_powder, 'b.light_blue_concrete_powder' ],
		   [ Blockly.Msg.b_light_blue_glazed_terracotta, 'b.light_blue_glazed_terracotta' ],
		   [ Blockly.Msg.b_light_blue_shulker_box, 'b.light_blue_shulker_box' ],
		   [ Blockly.Msg.b_light_blue_stained_glass, 'b.light_blue_stained_glass' ],
		   [ Blockly.Msg.b_light_blue_stained_glass_pane, 'b.light_blue_stained_glass_pane' ],
		   [ Blockly.Msg.b_light_blue_terracotta, 'b.light_blue_terracotta' ],
		   [ Blockly.Msg.b_light_blue_wool, 'b.light_blue_wool' ],
		   [ Blockly.Msg.b_light_gray_banner, 'b.light_gray_banner' ],
		   [ Blockly.Msg.b_light_gray_bed, 'b.light_gray_bed' ],
		   [ Blockly.Msg.b_light_gray_candle, 'b.light_gray_candle' ],
		   [ Blockly.Msg.b_light_gray_candle_cake, 'b.light_gray_candle_cake' ],
		   [ Blockly.Msg.b_light_gray_carpet, 'b.light_gray_carpet' ],
		   [ Blockly.Msg.b_light_gray_concrete, 'b.light_gray_concrete' ],
		   [ Blockly.Msg.b_light_gray_concrete_powder, 'b.light_gray_concrete_powder' ],
		   [ Blockly.Msg.b_light_gray_glazed_terracotta, 'b.light_gray_glazed_terracotta' ],
		   [ Blockly.Msg.b_light_gray_shulker_box, 'b.light_gray_shulker_box' ],
		   [ Blockly.Msg.b_light_gray_stained_glass, 'b.light_gray_stained_glass' ],
		   [ Blockly.Msg.b_light_gray_stained_glass_pane, 'b.light_gray_stained_glass_pane' ],
		   [ Blockly.Msg.b_light_gray_terracotta, 'b.light_gray_terracotta' ],
		   [ Blockly.Msg.b_light_gray_wool, 'b.light_gray_wool' ],
		   [ Blockly.Msg.b_light_weighted_pressure_plate, 'b.light_weighted_pressure_plate' ],
		   [ Blockly.Msg.b_lightning_rod, 'b.lightning_rod' ],
		   [ Blockly.Msg.b_lilac, 'b.lilac' ],
		   [ Blockly.Msg.b_lily_of_the_valley, 'b.lily_of_the_valley' ],
		   [ Blockly.Msg.b_lily_pad, 'b.lily_pad' ],
		   [ Blockly.Msg.b_lime_banner, 'b.lime_banner' ],
		   [ Blockly.Msg.b_lime_bed, 'b.lime_bed' ],
		   [ Blockly.Msg.b_lime_candle, 'b.lime_candle' ],
		   [ Blockly.Msg.b_lime_candle_cake, 'b.lime_candle_cake' ],
		   [ Blockly.Msg.b_lime_carpet, 'b.lime_carpet' ],
		   [ Blockly.Msg.b_lime_concrete, 'b.lime_concrete' ],
		   [ Blockly.Msg.b_lime_concrete_powder, 'b.lime_concrete_powder' ],
		   [ Blockly.Msg.b_lime_glazed_terracotta, 'b.lime_glazed_terracotta' ],
		   [ Blockly.Msg.b_lime_shulker_box, 'b.lime_shulker_box' ],
		   [ Blockly.Msg.b_lime_stained_glass, 'b.lime_stained_glass' ],
		   [ Blockly.Msg.b_lime_stained_glass_pane, 'b.lime_stained_glass_pane' ],
		   [ Blockly.Msg.b_lime_terracotta, 'b.lime_terracotta' ],
		   [ Blockly.Msg.b_lime_wool, 'b.lime_wool' ],
		   [ Blockly.Msg.b_lodestone, 'b.lodestone' ],
		   [ Blockly.Msg.b_loom, 'b.loom' ],
		   [ Blockly.Msg.b_magenta_banner, 'b.magenta_banner' ],
		   [ Blockly.Msg.b_magenta_bed, 'b.magenta_bed' ],
		   [ Blockly.Msg.b_magenta_candle, 'b.magenta_candle' ],
		   [ Blockly.Msg.b_magenta_candle_cake, 'b.magenta_candle_cake' ],
		   [ Blockly.Msg.b_magenta_carpet, 'b.magenta_carpet' ],
		   [ Blockly.Msg.b_magenta_concrete, 'b.magenta_concrete' ],
		   [ Blockly.Msg.b_magenta_concrete_powder, 'b.magenta_concrete_powder' ],
		   [ Blockly.Msg.b_magenta_glazed_terracotta, 'b.magenta_glazed_terracotta' ],
		   [ Blockly.Msg.b_magenta_shulker_box, 'b.magenta_shulker_box' ],
		   [ Blockly.Msg.b_magenta_stained_glass, 'b.magenta_stained_glass' ],
		   [ Blockly.Msg.b_magenta_stained_glass_pane, 'b.magenta_stained_glass_pane' ],
		   [ Blockly.Msg.b_magenta_terracotta, 'b.magenta_terracotta' ],
		   [ Blockly.Msg.b_magenta_wool, 'b.magenta_wool' ],
		   [ Blockly.Msg.b_magma_block, 'b.magma_block' ],
		   [ Blockly.Msg.b_mangrove_button, 'b.mangrove_button' ],
		   [ Blockly.Msg.b_mangrove_door, 'b.mangrove_door' ],
		   [ Blockly.Msg.b_mangrove_fence, 'b.mangrove_fence' ],
		   [ Blockly.Msg.b_mangrove_fence_gate, 'b.mangrove_fence_gate' ],
		   [ Blockly.Msg.b_mangrove_hanging_sign, 'b.mangrove_hanging_sign' ],
		   [ Blockly.Msg.b_mangrove_leaves, 'b.mangrove_leaves' ],
		   [ Blockly.Msg.b_mangrove_log, 'b.mangrove_log' ],
		   [ Blockly.Msg.b_mangrove_planks, 'b.mangrove_planks' ],
		   [ Blockly.Msg.b_mangrove_pressure_plate, 'b.mangrove_pressure_plate' ],
		   [ Blockly.Msg.b_mangrove_propagule, 'b.mangrove_propagule' ],
		   [ Blockly.Msg.b_mangrove_roots, 'b.mangrove_roots' ],
		   [ Blockly.Msg.b_mangrove_shelf, 'b.mangrove_shelf' ],
		   [ Blockly.Msg.b_mangrove_sign, 'b.mangrove_sign' ],
		   [ Blockly.Msg.b_mangrove_slab, 'b.mangrove_slab' ],
		   [ Blockly.Msg.b_mangrove_stairs, 'b.mangrove_stairs' ],
		   [ Blockly.Msg.b_mangrove_trapdoor, 'b.mangrove_trapdoor' ],
		   [ Blockly.Msg.b_mangrove_wall_hanging_sign, 'b.mangrove_wall_hanging_sign' ],
		   [ Blockly.Msg.b_mangrove_wall_sign, 'b.mangrove_wall_sign' ],
		   [ Blockly.Msg.b_mangrove_wood, 'b.mangrove_wood' ],
		   [ Blockly.Msg.b_medium_amethyst_bud, 'b.medium_amethyst_bud' ],
		   [ Blockly.Msg.b_melon, 'b.melon' ],
		   [ Blockly.Msg.b_melon_stem, 'b.melon_stem' ],
		   [ Blockly.Msg.b_moss_block, 'b.moss_block' ],
		   [ Blockly.Msg.b_moss_carpet, 'b.moss_carpet' ],
		   [ Blockly.Msg.b_mossy_cobblestone, 'b.mossy_cobblestone' ],
		   [ Blockly.Msg.b_mossy_cobblestone_slab, 'b.mossy_cobblestone_slab' ],
		   [ Blockly.Msg.b_mossy_cobblestone_stairs, 'b.mossy_cobblestone_stairs' ],
		   [ Blockly.Msg.b_mossy_cobblestone_wall, 'b.mossy_cobblestone_wall' ],
		   [ Blockly.Msg.b_mossy_stone_brick_slab, 'b.mossy_stone_brick_slab' ],
		   [ Blockly.Msg.b_mossy_stone_brick_stairs, 'b.mossy_stone_brick_stairs' ],
		   [ Blockly.Msg.b_mossy_stone_brick_wall, 'b.mossy_stone_brick_wall' ],
		   [ Blockly.Msg.b_mossy_stone_bricks, 'b.mossy_stone_bricks' ],
		   [ Blockly.Msg.b_moving_piston, 'b.moving_piston' ],
		   [ Blockly.Msg.b_mud, 'b.mud' ],
		   [ Blockly.Msg.b_mud_brick_slab, 'b.mud_brick_slab' ],
		   [ Blockly.Msg.b_mud_brick_stairs, 'b.mud_brick_stairs' ],
		   [ Blockly.Msg.b_mud_brick_wall, 'b.mud_brick_wall' ],
		   [ Blockly.Msg.b_mud_bricks, 'b.mud_bricks' ],
		   [ Blockly.Msg.b_muddy_mangrove_roots, 'b.muddy_mangrove_roots' ],
		   [ Blockly.Msg.b_mushroom_stem, 'b.mushroom_stem' ],
		   [ Blockly.Msg.b_mycelium, 'b.mycelium' ],
		   [ Blockly.Msg.b_nether_brick_fence, 'b.nether_brick_fence' ],
		   [ Blockly.Msg.b_nether_brick_slab, 'b.nether_brick_slab' ],
		   [ Blockly.Msg.b_nether_brick_stairs, 'b.nether_brick_stairs' ],
		   [ Blockly.Msg.b_nether_brick_wall, 'b.nether_brick_wall' ],
		   [ Blockly.Msg.b_nether_bricks, 'b.nether_bricks' ],
		   [ Blockly.Msg.b_nether_gold_ore, 'b.nether_gold_ore' ],
		   [ Blockly.Msg.b_nether_quartz_ore, 'b.nether_quartz_ore' ],
		   [ Blockly.Msg.b_nether_sprouts, 'b.nether_sprouts' ],
		   [ Blockly.Msg.b_nether_wart, 'b.nether_wart' ],
		   [ Blockly.Msg.b_nether_wart_block, 'b.nether_wart_block' ],
		   [ Blockly.Msg.b_netherite_block, 'b.netherite_block' ],
		   [ Blockly.Msg.b_netherrack, 'b.netherrack' ],
		   [ Blockly.Msg.b_note_block, 'b.note_block' ],
		   [ Blockly.Msg.b_oak_button, 'b.oak_button' ],
		   [ Blockly.Msg.b_oak_door, 'b.oak_door' ],
		   [ Blockly.Msg.b_oak_fence, 'b.oak_fence' ],
		   [ Blockly.Msg.b_oak_fence_gate, 'b.oak_fence_gate' ],
		   [ Blockly.Msg.b_oak_hanging_sign, 'b.oak_hanging_sign' ],
		   [ Blockly.Msg.b_oak_leaves, 'b.oak_leaves' ],
		   [ Blockly.Msg.b_oak_log, 'b.oak_log' ],
		   [ Blockly.Msg.b_oak_planks, 'b.oak_planks' ],
		   [ Blockly.Msg.b_oak_pressure_plate, 'b.oak_pressure_plate' ],
		   [ Blockly.Msg.b_oak_sapling, 'b.oak_sapling' ],
		   [ Blockly.Msg.b_oak_shelf, 'b.oak_shelf' ],
		   [ Blockly.Msg.b_oak_sign, 'b.oak_sign' ],
		   [ Blockly.Msg.b_oak_slab, 'b.oak_slab' ],
		   [ Blockly.Msg.b_oak_stairs, 'b.oak_stairs' ],
		   [ Blockly.Msg.b_oak_trapdoor, 'b.oak_trapdoor' ],
		   [ Blockly.Msg.b_oak_wall_hanging_sign, 'b.oak_wall_hanging_sign' ],
		   [ Blockly.Msg.b_oak_wall_sign, 'b.oak_wall_sign' ],
		   [ Blockly.Msg.b_oak_wood, 'b.oak_wood' ],
		   [ Blockly.Msg.b_observer, 'b.observer' ],
		   [ Blockly.Msg.b_obsidian, 'b.obsidian' ],
		   [ Blockly.Msg.b_ochre_froglight, 'b.ochre_froglight' ],
		   [ Blockly.Msg.b_open_eyeblossom, 'b.open_eyeblossom' ],
		   [ Blockly.Msg.b_orange_banner, 'b.orange_banner' ],
		   [ Blockly.Msg.b_orange_bed, 'b.orange_bed' ],
		   [ Blockly.Msg.b_orange_candle, 'b.orange_candle' ],
		   [ Blockly.Msg.b_orange_candle_cake, 'b.orange_candle_cake' ],
		   [ Blockly.Msg.b_orange_carpet, 'b.orange_carpet' ],
		   [ Blockly.Msg.b_orange_concrete, 'b.orange_concrete' ],
		   [ Blockly.Msg.b_orange_concrete_powder, 'b.orange_concrete_powder' ],
		   [ Blockly.Msg.b_orange_glazed_terracotta, 'b.orange_glazed_terracotta' ],
		   [ Blockly.Msg.b_orange_shulker_box, 'b.orange_shulker_box' ],
		   [ Blockly.Msg.b_orange_stained_glass, 'b.orange_stained_glass' ],
		   [ Blockly.Msg.b_orange_stained_glass_pane, 'b.orange_stained_glass_pane' ],
		   [ Blockly.Msg.b_orange_terracotta, 'b.orange_terracotta' ],
		   [ Blockly.Msg.b_orange_tulip, 'b.orange_tulip' ],
		   [ Blockly.Msg.b_orange_wool, 'b.orange_wool' ],
		   [ Blockly.Msg.b_oxeye_daisy, 'b.oxeye_daisy' ],
		   [ Blockly.Msg.b_oxidized_chiseled_copper, 'b.oxidized_chiseled_copper' ],
		   [ Blockly.Msg.b_oxidized_copper, 'b.oxidized_copper' ],
		   [ Blockly.Msg.b_oxidized_copper_bars, 'b.oxidized_copper_bars' ],
		   [ Blockly.Msg.b_oxidized_copper_bulb, 'b.oxidized_copper_bulb' ],
		   [ Blockly.Msg.b_oxidized_copper_chain, 'b.oxidized_copper_chain' ],
		   [ Blockly.Msg.b_oxidized_copper_chest, 'b.oxidized_copper_chest' ],
		   [ Blockly.Msg.b_oxidized_copper_door, 'b.oxidized_copper_door' ],
		   [ Blockly.Msg.b_oxidized_copper_golem_statue, 'b.oxidized_copper_golem_statue' ],
		   [ Blockly.Msg.b_oxidized_copper_grate, 'b.oxidized_copper_grate' ],
		   [ Blockly.Msg.b_oxidized_copper_lantern, 'b.oxidized_copper_lantern' ],
		   [ Blockly.Msg.b_oxidized_copper_trapdoor, 'b.oxidized_copper_trapdoor' ],
		   [ Blockly.Msg.b_oxidized_cut_copper, 'b.oxidized_cut_copper' ],
		   [ Blockly.Msg.b_oxidized_cut_copper_slab, 'b.oxidized_cut_copper_slab' ],
		   [ Blockly.Msg.b_oxidized_cut_copper_stairs, 'b.oxidized_cut_copper_stairs' ],
		   [ Blockly.Msg.b_oxidized_lightning_rod, 'b.oxidized_lightning_rod' ],
		   [ Blockly.Msg.b_packed_ice, 'b.packed_ice' ],
		   [ Blockly.Msg.b_packed_mud, 'b.packed_mud' ],
		   [ Blockly.Msg.b_pale_hanging_moss, 'b.pale_hanging_moss' ],
		   [ Blockly.Msg.b_pale_moss_block, 'b.pale_moss_block' ],
		   [ Blockly.Msg.b_pale_moss_carpet, 'b.pale_moss_carpet' ],
		   [ Blockly.Msg.b_pale_oak_button, 'b.pale_oak_button' ],
		   [ Blockly.Msg.b_pale_oak_door, 'b.pale_oak_door' ],
		   [ Blockly.Msg.b_pale_oak_fence, 'b.pale_oak_fence' ],
		   [ Blockly.Msg.b_pale_oak_fence_gate, 'b.pale_oak_fence_gate' ],
		   [ Blockly.Msg.b_pale_oak_hanging_sign, 'b.pale_oak_hanging_sign' ],
		   [ Blockly.Msg.b_pale_oak_leaves, 'b.pale_oak_leaves' ],
		   [ Blockly.Msg.b_pale_oak_log, 'b.pale_oak_log' ],
		   [ Blockly.Msg.b_pale_oak_planks, 'b.pale_oak_planks' ],
		   [ Blockly.Msg.b_pale_oak_pressure_plate, 'b.pale_oak_pressure_plate' ],
		   [ Blockly.Msg.b_pale_oak_sapling, 'b.pale_oak_sapling' ],
		   [ Blockly.Msg.b_pale_oak_shelf, 'b.pale_oak_shelf' ],
		   [ Blockly.Msg.b_pale_oak_sign, 'b.pale_oak_sign' ],
		   [ Blockly.Msg.b_pale_oak_slab, 'b.pale_oak_slab' ],
		   [ Blockly.Msg.b_pale_oak_stairs, 'b.pale_oak_stairs' ],
		   [ Blockly.Msg.b_pale_oak_trapdoor, 'b.pale_oak_trapdoor' ],
		   [ Blockly.Msg.b_pale_oak_wall_hanging_sign, 'b.pale_oak_wall_hanging_sign' ],
		   [ Blockly.Msg.b_pale_oak_wall_sign, 'b.pale_oak_wall_sign' ],
		   [ Blockly.Msg.b_pale_oak_wood, 'b.pale_oak_wood' ],
		   [ Blockly.Msg.b_pearlescent_froglight, 'b.pearlescent_froglight' ],
		   [ Blockly.Msg.b_peony, 'b.peony' ],
		   [ Blockly.Msg.b_petrified_oak_slab, 'b.petrified_oak_slab' ],
		   [ Blockly.Msg.b_piglin_head, 'b.piglin_head' ],
		   [ Blockly.Msg.b_piglin_wall_head, 'b.piglin_wall_head' ],
		   [ Blockly.Msg.b_pink_banner, 'b.pink_banner' ],
		   [ Blockly.Msg.b_pink_bed, 'b.pink_bed' ],
		   [ Blockly.Msg.b_pink_candle, 'b.pink_candle' ],
		   [ Blockly.Msg.b_pink_candle_cake, 'b.pink_candle_cake' ],
		   [ Blockly.Msg.b_pink_carpet, 'b.pink_carpet' ],
		   [ Blockly.Msg.b_pink_concrete, 'b.pink_concrete' ],
		   [ Blockly.Msg.b_pink_concrete_powder, 'b.pink_concrete_powder' ],
		   [ Blockly.Msg.b_pink_glazed_terracotta, 'b.pink_glazed_terracotta' ],
		   [ Blockly.Msg.b_pink_petals, 'b.pink_petals' ],
		   [ Blockly.Msg.b_pink_shulker_box, 'b.pink_shulker_box' ],
		   [ Blockly.Msg.b_pink_stained_glass, 'b.pink_stained_glass' ],
		   [ Blockly.Msg.b_pink_stained_glass_pane, 'b.pink_stained_glass_pane' ],
		   [ Blockly.Msg.b_pink_terracotta, 'b.pink_terracotta' ],
		   [ Blockly.Msg.b_pink_tulip, 'b.pink_tulip' ],
		   [ Blockly.Msg.b_pink_wool, 'b.pink_wool' ],
		   [ Blockly.Msg.b_piston, 'b.piston' ],
		   [ Blockly.Msg.b_piston_head, 'b.piston_head' ],
		   [ Blockly.Msg.b_pitcher_crop, 'b.pitcher_crop' ],
		   [ Blockly.Msg.b_pitcher_plant, 'b.pitcher_plant' ],
		   [ Blockly.Msg.b_player_head, 'b.player_head' ],
		   [ Blockly.Msg.b_player_wall_head, 'b.player_wall_head' ],
		   [ Blockly.Msg.b_podzol, 'b.podzol' ],
		   [ Blockly.Msg.b_pointed_dripstone, 'b.pointed_dripstone' ],
		   [ Blockly.Msg.b_polished_andesite, 'b.polished_andesite' ],
		   [ Blockly.Msg.b_polished_andesite_slab, 'b.polished_andesite_slab' ],
		   [ Blockly.Msg.b_polished_andesite_stairs, 'b.polished_andesite_stairs' ],
		   [ Blockly.Msg.b_polished_basalt, 'b.polished_basalt' ],
		   [ Blockly.Msg.b_polished_blackstone, 'b.polished_blackstone' ],
		   [ Blockly.Msg.b_polished_blackstone_brick_slab, 'b.polished_blackstone_brick_slab' ],
		   [ Blockly.Msg.b_polished_blackstone_brick_stairs, 'b.polished_blackstone_brick_stairs' ],
		   [ Blockly.Msg.b_polished_blackstone_brick_wall, 'b.polished_blackstone_brick_wall' ],
		   [ Blockly.Msg.b_polished_blackstone_bricks, 'b.polished_blackstone_bricks' ],
		   [ Blockly.Msg.b_polished_blackstone_button, 'b.polished_blackstone_button' ],
		   [ Blockly.Msg.b_polished_blackstone_pressure_plate, 'b.polished_blackstone_pressure_plate' ],
		   [ Blockly.Msg.b_polished_blackstone_slab, 'b.polished_blackstone_slab' ],
		   [ Blockly.Msg.b_polished_blackstone_stairs, 'b.polished_blackstone_stairs' ],
		   [ Blockly.Msg.b_polished_blackstone_wall, 'b.polished_blackstone_wall' ],
		   [ Blockly.Msg.b_polished_deepslate, 'b.polished_deepslate' ],
		   [ Blockly.Msg.b_polished_deepslate_slab, 'b.polished_deepslate_slab' ],
		   [ Blockly.Msg.b_polished_deepslate_stairs, 'b.polished_deepslate_stairs' ],
		   [ Blockly.Msg.b_polished_deepslate_wall, 'b.polished_deepslate_wall' ],
		   [ Blockly.Msg.b_polished_diorite, 'b.polished_diorite' ],
		   [ Blockly.Msg.b_polished_diorite_slab, 'b.polished_diorite_slab' ],
		   [ Blockly.Msg.b_polished_diorite_stairs, 'b.polished_diorite_stairs' ],
		   [ Blockly.Msg.b_polished_granite, 'b.polished_granite' ],
		   [ Blockly.Msg.b_polished_granite_slab, 'b.polished_granite_slab' ],
		   [ Blockly.Msg.b_polished_granite_stairs, 'b.polished_granite_stairs' ],
		   [ Blockly.Msg.b_polished_tuff, 'b.polished_tuff' ],
		   [ Blockly.Msg.b_polished_tuff_slab, 'b.polished_tuff_slab' ],
		   [ Blockly.Msg.b_polished_tuff_stairs, 'b.polished_tuff_stairs' ],
		   [ Blockly.Msg.b_polished_tuff_wall, 'b.polished_tuff_wall' ],
		   [ Blockly.Msg.b_poppy, 'b.poppy' ],
		   [ Blockly.Msg.b_potatoes, 'b.potatoes' ],
		   [ Blockly.Msg.b_potted_acacia_sapling, 'b.potted_acacia_sapling' ],
		   [ Blockly.Msg.b_potted_allium, 'b.potted_allium' ],
		   [ Blockly.Msg.b_potted_azalea_bush, 'b.potted_azalea_bush' ],
		   [ Blockly.Msg.b_potted_azure_bluet, 'b.potted_azure_bluet' ],
		   [ Blockly.Msg.b_potted_bamboo, 'b.potted_bamboo' ],
		   [ Blockly.Msg.b_potted_birch_sapling, 'b.potted_birch_sapling' ],
		   [ Blockly.Msg.b_potted_blue_orchid, 'b.potted_blue_orchid' ],
		   [ Blockly.Msg.b_potted_brown_mushroom, 'b.potted_brown_mushroom' ],
		   [ Blockly.Msg.b_potted_cactus, 'b.potted_cactus' ],
		   [ Blockly.Msg.b_potted_cherry_sapling, 'b.potted_cherry_sapling' ],
		   [ Blockly.Msg.b_potted_closed_eyeblossom, 'b.potted_closed_eyeblossom' ],
		   [ Blockly.Msg.b_potted_cornflower, 'b.potted_cornflower' ],
		   [ Blockly.Msg.b_potted_crimson_fungus, 'b.potted_crimson_fungus' ],
		   [ Blockly.Msg.b_potted_crimson_roots, 'b.potted_crimson_roots' ],
		   [ Blockly.Msg.b_potted_dandelion, 'b.potted_dandelion' ],
		   [ Blockly.Msg.b_potted_dark_oak_sapling, 'b.potted_dark_oak_sapling' ],
		   [ Blockly.Msg.b_potted_dead_bush, 'b.potted_dead_bush' ],
		   [ Blockly.Msg.b_potted_fern, 'b.potted_fern' ],
		   [ Blockly.Msg.b_potted_flowering_azalea_bush, 'b.potted_flowering_azalea_bush' ],
		   [ Blockly.Msg.b_potted_jungle_sapling, 'b.potted_jungle_sapling' ],
		   [ Blockly.Msg.b_potted_lily_of_the_valley, 'b.potted_lily_of_the_valley' ],
		   [ Blockly.Msg.b_potted_mangrove_propagule, 'b.potted_mangrove_propagule' ],
		   [ Blockly.Msg.b_potted_oak_sapling, 'b.potted_oak_sapling' ],
		   [ Blockly.Msg.b_potted_open_eyeblossom, 'b.potted_open_eyeblossom' ],
		   [ Blockly.Msg.b_potted_orange_tulip, 'b.potted_orange_tulip' ],
		   [ Blockly.Msg.b_potted_oxeye_daisy, 'b.potted_oxeye_daisy' ],
		   [ Blockly.Msg.b_potted_pale_oak_sapling, 'b.potted_pale_oak_sapling' ],
		   [ Blockly.Msg.b_potted_pink_tulip, 'b.potted_pink_tulip' ],
		   [ Blockly.Msg.b_potted_poppy, 'b.potted_poppy' ],
		   [ Blockly.Msg.b_potted_red_mushroom, 'b.potted_red_mushroom' ],
		   [ Blockly.Msg.b_potted_red_tulip, 'b.potted_red_tulip' ],
		   [ Blockly.Msg.b_potted_spruce_sapling, 'b.potted_spruce_sapling' ],
		   [ Blockly.Msg.b_potted_torchflower, 'b.potted_torchflower' ],
		   [ Blockly.Msg.b_potted_warped_fungus, 'b.potted_warped_fungus' ],
		   [ Blockly.Msg.b_potted_warped_roots, 'b.potted_warped_roots' ],
		   [ Blockly.Msg.b_potted_white_tulip, 'b.potted_white_tulip' ],
		   [ Blockly.Msg.b_potted_wither_rose, 'b.potted_wither_rose' ],
		   [ Blockly.Msg.b_powder_snow, 'b.powder_snow' ],
		   [ Blockly.Msg.b_powder_snow_cauldron, 'b.powder_snow_cauldron' ],
		   [ Blockly.Msg.b_powered_rail, 'b.powered_rail' ],
		   [ Blockly.Msg.b_prismarine, 'b.prismarine' ],
		   [ Blockly.Msg.b_prismarine_brick_slab, 'b.prismarine_brick_slab' ],
		   [ Blockly.Msg.b_prismarine_brick_stairs, 'b.prismarine_brick_stairs' ],
		   [ Blockly.Msg.b_prismarine_bricks, 'b.prismarine_bricks' ],
		   [ Blockly.Msg.b_prismarine_slab, 'b.prismarine_slab' ],
		   [ Blockly.Msg.b_prismarine_stairs, 'b.prismarine_stairs' ],
		   [ Blockly.Msg.b_prismarine_wall, 'b.prismarine_wall' ],
		   [ Blockly.Msg.b_pumpkin, 'b.pumpkin' ],
		   [ Blockly.Msg.b_pumpkin_stem, 'b.pumpkin_stem' ],
		   [ Blockly.Msg.b_purple_banner, 'b.purple_banner' ],
		   [ Blockly.Msg.b_purple_bed, 'b.purple_bed' ],
		   [ Blockly.Msg.b_purple_candle, 'b.purple_candle' ],
		   [ Blockly.Msg.b_purple_candle_cake, 'b.purple_candle_cake' ],
		   [ Blockly.Msg.b_purple_carpet, 'b.purple_carpet' ],
		   [ Blockly.Msg.b_purple_concrete, 'b.purple_concrete' ],
		   [ Blockly.Msg.b_purple_concrete_powder, 'b.purple_concrete_powder' ],
		   [ Blockly.Msg.b_purple_glazed_terracotta, 'b.purple_glazed_terracotta' ],
		   [ Blockly.Msg.b_purple_shulker_box, 'b.purple_shulker_box' ],
		   [ Blockly.Msg.b_purple_stained_glass, 'b.purple_stained_glass' ],
		   [ Blockly.Msg.b_purple_stained_glass_pane, 'b.purple_stained_glass_pane' ],
		   [ Blockly.Msg.b_purple_terracotta, 'b.purple_terracotta' ],
		   [ Blockly.Msg.b_purple_wool, 'b.purple_wool' ],
		   [ Blockly.Msg.b_purpur_block, 'b.purpur_block' ],
		   [ Blockly.Msg.b_purpur_pillar, 'b.purpur_pillar' ],
		   [ Blockly.Msg.b_purpur_slab, 'b.purpur_slab' ],
		   [ Blockly.Msg.b_purpur_stairs, 'b.purpur_stairs' ],
		   [ Blockly.Msg.b_quartz_block, 'b.quartz_block' ],
		   [ Blockly.Msg.b_quartz_bricks, 'b.quartz_bricks' ],
		   [ Blockly.Msg.b_quartz_pillar, 'b.quartz_pillar' ],
		   [ Blockly.Msg.b_quartz_slab, 'b.quartz_slab' ],
		   [ Blockly.Msg.b_quartz_stairs, 'b.quartz_stairs' ],
		   [ Blockly.Msg.b_rail, 'b.rail' ],
		   [ Blockly.Msg.b_raw_copper_block, 'b.raw_copper_block' ],
		   [ Blockly.Msg.b_raw_gold_block, 'b.raw_gold_block' ],
		   [ Blockly.Msg.b_raw_iron_block, 'b.raw_iron_block' ],
		   [ Blockly.Msg.b_red_banner, 'b.red_banner' ],
		   [ Blockly.Msg.b_red_bed, 'b.red_bed' ],
		   [ Blockly.Msg.b_red_candle, 'b.red_candle' ],
		   [ Blockly.Msg.b_red_candle_cake, 'b.red_candle_cake' ],
		   [ Blockly.Msg.b_red_carpet, 'b.red_carpet' ],
		   [ Blockly.Msg.b_red_concrete, 'b.red_concrete' ],
		   [ Blockly.Msg.b_red_concrete_powder, 'b.red_concrete_powder' ],
		   [ Blockly.Msg.b_red_glazed_terracotta, 'b.red_glazed_terracotta' ],
		   [ Blockly.Msg.b_red_mushroom, 'b.red_mushroom' ],
		   [ Blockly.Msg.b_red_mushroom_block, 'b.red_mushroom_block' ],
		   [ Blockly.Msg.b_red_nether_brick_slab, 'b.red_nether_brick_slab' ],
		   [ Blockly.Msg.b_red_nether_brick_stairs, 'b.red_nether_brick_stairs' ],
		   [ Blockly.Msg.b_red_nether_brick_wall, 'b.red_nether_brick_wall' ],
		   [ Blockly.Msg.b_red_nether_bricks, 'b.red_nether_bricks' ],
		   [ Blockly.Msg.b_red_sand, 'b.red_sand' ],
		   [ Blockly.Msg.b_red_sandstone, 'b.red_sandstone' ],
		   [ Blockly.Msg.b_red_sandstone_slab, 'b.red_sandstone_slab' ],
		   [ Blockly.Msg.b_red_sandstone_stairs, 'b.red_sandstone_stairs' ],
		   [ Blockly.Msg.b_red_sandstone_wall, 'b.red_sandstone_wall' ],
		   [ Blockly.Msg.b_red_shulker_box, 'b.red_shulker_box' ],
		   [ Blockly.Msg.b_red_stained_glass, 'b.red_stained_glass' ],
		   [ Blockly.Msg.b_red_stained_glass_pane, 'b.red_stained_glass_pane' ],
		   [ Blockly.Msg.b_red_terracotta, 'b.red_terracotta' ],
		   [ Blockly.Msg.b_red_tulip, 'b.red_tulip' ],
		   [ Blockly.Msg.b_red_wool, 'b.red_wool' ],
		   [ Blockly.Msg.b_redstone_block, 'b.redstone_block' ],
		   [ Blockly.Msg.b_redstone_lamp, 'b.redstone_lamp' ],
		   [ Blockly.Msg.b_redstone_ore, 'b.redstone_ore' ],
		   [ Blockly.Msg.b_redstone_torch, 'b.redstone_torch' ],
		   [ Blockly.Msg.b_redstone_wall_torch, 'b.redstone_wall_torch' ],
		   [ Blockly.Msg.b_redstone_wire, 'b.redstone_wire' ],
		   [ Blockly.Msg.b_reinforced_deepslate, 'b.reinforced_deepslate' ],
		   [ Blockly.Msg.b_repeater, 'b.repeater' ],
		   [ Blockly.Msg.b_repeating_command_block, 'b.repeating_command_block' ],
		   [ Blockly.Msg.b_resin_block, 'b.resin_block' ],
		   [ Blockly.Msg.b_resin_brick_slab, 'b.resin_brick_slab' ],
		   [ Blockly.Msg.b_resin_brick_stairs, 'b.resin_brick_stairs' ],
		   [ Blockly.Msg.b_resin_brick_wall, 'b.resin_brick_wall' ],
		   [ Blockly.Msg.b_resin_bricks, 'b.resin_bricks' ],
		   [ Blockly.Msg.b_resin_clump, 'b.resin_clump' ],
		   [ Blockly.Msg.b_respawn_anchor, 'b.respawn_anchor' ],
		   [ Blockly.Msg.b_rooted_dirt, 'b.rooted_dirt' ],
		   [ Blockly.Msg.b_rose_bush, 'b.rose_bush' ],
		   [ Blockly.Msg.b_sand, 'b.sand' ],
		   [ Blockly.Msg.b_sandstone, 'b.sandstone' ],
		   [ Blockly.Msg.b_sandstone_slab, 'b.sandstone_slab' ],
		   [ Blockly.Msg.b_sandstone_stairs, 'b.sandstone_stairs' ],
		   [ Blockly.Msg.b_sandstone_wall, 'b.sandstone_wall' ],
		   [ Blockly.Msg.b_scaffolding, 'b.scaffolding' ],
		   [ Blockly.Msg.b_sculk, 'b.sculk' ],
		   [ Blockly.Msg.b_sculk_catalyst, 'b.sculk_catalyst' ],
		   [ Blockly.Msg.b_sculk_sensor, 'b.sculk_sensor' ],
		   [ Blockly.Msg.b_sculk_shrieker, 'b.sculk_shrieker' ],
		   [ Blockly.Msg.b_sculk_vein, 'b.sculk_vein' ],
		   [ Blockly.Msg.b_sea_lantern, 'b.sea_lantern' ],
		   [ Blockly.Msg.b_sea_pickle, 'b.sea_pickle' ],
		   [ Blockly.Msg.b_seagrass, 'b.seagrass' ],
		   [ Blockly.Msg.b_short_dry_grass, 'b.short_dry_grass' ],
		   [ Blockly.Msg.b_short_grass, 'b.short_grass' ],
		   [ Blockly.Msg.b_shroomlight, 'b.shroomlight' ],
		   [ Blockly.Msg.b_shulker_box, 'b.shulker_box' ],
		   [ Blockly.Msg.b_skeleton_skull, 'b.skeleton_skull' ],
		   [ Blockly.Msg.b_skeleton_wall_skull, 'b.skeleton_wall_skull' ],
		   [ Blockly.Msg.b_slime_block, 'b.slime_block' ],
		   [ Blockly.Msg.b_small_amethyst_bud, 'b.small_amethyst_bud' ],
		   [ Blockly.Msg.b_small_dripleaf, 'b.small_dripleaf' ],
		   [ Blockly.Msg.b_smithing_table, 'b.smithing_table' ],
		   [ Blockly.Msg.b_smoker, 'b.smoker' ],
		   [ Blockly.Msg.b_smooth_basalt, 'b.smooth_basalt' ],
		   [ Blockly.Msg.b_smooth_quartz, 'b.smooth_quartz' ],
		   [ Blockly.Msg.b_smooth_quartz_slab, 'b.smooth_quartz_slab' ],
		   [ Blockly.Msg.b_smooth_quartz_stairs, 'b.smooth_quartz_stairs' ],
		   [ Blockly.Msg.b_smooth_red_sandstone, 'b.smooth_red_sandstone' ],
		   [ Blockly.Msg.b_smooth_red_sandstone_slab, 'b.smooth_red_sandstone_slab' ],
		   [ Blockly.Msg.b_smooth_red_sandstone_stairs, 'b.smooth_red_sandstone_stairs' ],
		   [ Blockly.Msg.b_smooth_sandstone, 'b.smooth_sandstone' ],
		   [ Blockly.Msg.b_smooth_sandstone_slab, 'b.smooth_sandstone_slab' ],
		   [ Blockly.Msg.b_smooth_sandstone_stairs, 'b.smooth_sandstone_stairs' ],
		   [ Blockly.Msg.b_smooth_stone, 'b.smooth_stone' ],
		   [ Blockly.Msg.b_smooth_stone_slab, 'b.smooth_stone_slab' ],
		   [ Blockly.Msg.b_sniffer_egg, 'b.sniffer_egg' ],
		   [ Blockly.Msg.b_snow, 'b.snow' ],
		   [ Blockly.Msg.b_snow_block, 'b.snow_block' ],
		   [ Blockly.Msg.b_soul_campfire, 'b.soul_campfire' ],
		   [ Blockly.Msg.b_soul_fire, 'b.soul_fire' ],
		   [ Blockly.Msg.b_soul_lantern, 'b.soul_lantern' ],
		   [ Blockly.Msg.b_soul_sand, 'b.soul_sand' ],
		   [ Blockly.Msg.b_soul_soil, 'b.soul_soil' ],
		   [ Blockly.Msg.b_soul_torch, 'b.soul_torch' ],
		   [ Blockly.Msg.b_soul_wall_torch, 'b.soul_wall_torch' ],
		   [ Blockly.Msg.b_sponge, 'b.sponge' ],
		   [ Blockly.Msg.b_spore_blossom, 'b.spore_blossom' ],
		   [ Blockly.Msg.b_spruce_button, 'b.spruce_button' ],
		   [ Blockly.Msg.b_spruce_door, 'b.spruce_door' ],
		   [ Blockly.Msg.b_spruce_fence, 'b.spruce_fence' ],
		   [ Blockly.Msg.b_spruce_fence_gate, 'b.spruce_fence_gate' ],
		   [ Blockly.Msg.b_spruce_hanging_sign, 'b.spruce_hanging_sign' ],
		   [ Blockly.Msg.b_spruce_leaves, 'b.spruce_leaves' ],
		   [ Blockly.Msg.b_spruce_log, 'b.spruce_log' ],
		   [ Blockly.Msg.b_spruce_planks, 'b.spruce_planks' ],
		   [ Blockly.Msg.b_spruce_pressure_plate, 'b.spruce_pressure_plate' ],
		   [ Blockly.Msg.b_spruce_sapling, 'b.spruce_sapling' ],
		   [ Blockly.Msg.b_spruce_shelf, 'b.spruce_shelf' ],
		   [ Blockly.Msg.b_spruce_sign, 'b.spruce_sign' ],
		   [ Blockly.Msg.b_spruce_slab, 'b.spruce_slab' ],
		   [ Blockly.Msg.b_spruce_stairs, 'b.spruce_stairs' ],
		   [ Blockly.Msg.b_spruce_trapdoor, 'b.spruce_trapdoor' ],
		   [ Blockly.Msg.b_spruce_wall_hanging_sign, 'b.spruce_wall_hanging_sign' ],
		   [ Blockly.Msg.b_spruce_wall_sign, 'b.spruce_wall_sign' ],
		   [ Blockly.Msg.b_spruce_wood, 'b.spruce_wood' ],
		   [ Blockly.Msg.b_sticky_piston, 'b.sticky_piston' ],
		   [ Blockly.Msg.b_stone, 'b.stone' ],
		   [ Blockly.Msg.b_stone_brick_slab, 'b.stone_brick_slab' ],
		   [ Blockly.Msg.b_stone_brick_stairs, 'b.stone_brick_stairs' ],
		   [ Blockly.Msg.b_stone_brick_wall, 'b.stone_brick_wall' ],
		   [ Blockly.Msg.b_stone_bricks, 'b.stone_bricks' ],
		   [ Blockly.Msg.b_stone_button, 'b.stone_button' ],
		   [ Blockly.Msg.b_stone_pressure_plate, 'b.stone_pressure_plate' ],
		   [ Blockly.Msg.b_stone_slab, 'b.stone_slab' ],
		   [ Blockly.Msg.b_stone_stairs, 'b.stone_stairs' ],
		   [ Blockly.Msg.b_stonecutter, 'b.stonecutter' ],
		   [ Blockly.Msg.b_stripped_acacia_log, 'b.stripped_acacia_log' ],
		   [ Blockly.Msg.b_stripped_acacia_wood, 'b.stripped_acacia_wood' ],
		   [ Blockly.Msg.b_stripped_bamboo_block, 'b.stripped_bamboo_block' ],
		   [ Blockly.Msg.b_stripped_birch_log, 'b.stripped_birch_log' ],
		   [ Blockly.Msg.b_stripped_birch_wood, 'b.stripped_birch_wood' ],
		   [ Blockly.Msg.b_stripped_cherry_log, 'b.stripped_cherry_log' ],
		   [ Blockly.Msg.b_stripped_cherry_wood, 'b.stripped_cherry_wood' ],
		   [ Blockly.Msg.b_stripped_crimson_hyphae, 'b.stripped_crimson_hyphae' ],
		   [ Blockly.Msg.b_stripped_crimson_stem, 'b.stripped_crimson_stem' ],
		   [ Blockly.Msg.b_stripped_dark_oak_log, 'b.stripped_dark_oak_log' ],
		   [ Blockly.Msg.b_stripped_dark_oak_wood, 'b.stripped_dark_oak_wood' ],
		   [ Blockly.Msg.b_stripped_jungle_log, 'b.stripped_jungle_log' ],
		   [ Blockly.Msg.b_stripped_jungle_wood, 'b.stripped_jungle_wood' ],
		   [ Blockly.Msg.b_stripped_mangrove_log, 'b.stripped_mangrove_log' ],
		   [ Blockly.Msg.b_stripped_mangrove_wood, 'b.stripped_mangrove_wood' ],
		   [ Blockly.Msg.b_stripped_oak_log, 'b.stripped_oak_log' ],
		   [ Blockly.Msg.b_stripped_oak_wood, 'b.stripped_oak_wood' ],
		   [ Blockly.Msg.b_stripped_pale_oak_log, 'b.stripped_pale_oak_log' ],
		   [ Blockly.Msg.b_stripped_pale_oak_wood, 'b.stripped_pale_oak_wood' ],
		   [ Blockly.Msg.b_stripped_spruce_log, 'b.stripped_spruce_log' ],
		   [ Blockly.Msg.b_stripped_spruce_wood, 'b.stripped_spruce_wood' ],
		   [ Blockly.Msg.b_stripped_warped_hyphae, 'b.stripped_warped_hyphae' ],
		   [ Blockly.Msg.b_stripped_warped_stem, 'b.stripped_warped_stem' ],
		   [ Blockly.Msg.b_structure_block, 'b.structure_block' ],
		   [ Blockly.Msg.b_structure_void, 'b.structure_void' ],
		   [ Blockly.Msg.b_sugar_cane, 'b.sugar_cane' ],
		   [ Blockly.Msg.b_sunflower, 'b.sunflower' ],
		   [ Blockly.Msg.b_suspicious_gravel, 'b.suspicious_gravel' ],
		   [ Blockly.Msg.b_suspicious_sand, 'b.suspicious_sand' ],
		   [ Blockly.Msg.b_sweet_berry_bush, 'b.sweet_berry_bush' ],
		   [ Blockly.Msg.b_tall_dry_grass, 'b.tall_dry_grass' ],
		   [ Blockly.Msg.b_tall_grass, 'b.tall_grass' ],
		   [ Blockly.Msg.b_tall_seagrass, 'b.tall_seagrass' ],
		   [ Blockly.Msg.b_target, 'b.target' ],
		   [ Blockly.Msg.b_terracotta, 'b.terracotta' ],
		   [ Blockly.Msg.b_tinted_glass, 'b.tinted_glass' ],
		   [ Blockly.Msg.b_torch, 'b.torch' ],
		   [ Blockly.Msg.b_torchflower, 'b.torchflower' ],
		   [ Blockly.Msg.b_torchflower_crop, 'b.torchflower_crop' ],
		   [ Blockly.Msg.b_trapped_chest, 'b.trapped_chest' ],
		   [ Blockly.Msg.b_tripwire, 'b.tripwire' ],
		   [ Blockly.Msg.b_tripwire_hook, 'b.tripwire_hook' ],
		   [ Blockly.Msg.b_tube_coral, 'b.tube_coral' ],
		   [ Blockly.Msg.b_tube_coral_block, 'b.tube_coral_block' ],
		   [ Blockly.Msg.b_tube_coral_fan, 'b.tube_coral_fan' ],
		   [ Blockly.Msg.b_tube_coral_wall_fan, 'b.tube_coral_wall_fan' ],
		   [ Blockly.Msg.b_tuff, 'b.tuff' ],
		   [ Blockly.Msg.b_tuff_brick_slab, 'b.tuff_brick_slab' ],
		   [ Blockly.Msg.b_tuff_brick_stairs, 'b.tuff_brick_stairs' ],
		   [ Blockly.Msg.b_tuff_brick_wall, 'b.tuff_brick_wall' ],
		   [ Blockly.Msg.b_tuff_bricks, 'b.tuff_bricks' ],
		   [ Blockly.Msg.b_tuff_slab, 'b.tuff_slab' ],
		   [ Blockly.Msg.b_tuff_stairs, 'b.tuff_stairs' ],
		   [ Blockly.Msg.b_tuff_wall, 'b.tuff_wall' ],
		   [ Blockly.Msg.b_turtle_egg, 'b.turtle_egg' ],
		   [ Blockly.Msg.b_twisting_vines, 'b.twisting_vines' ],
		   [ Blockly.Msg.b_twisting_vines_plant, 'b.twisting_vines_plant' ],
		   [ Blockly.Msg.b_vault, 'b.vault' ],
		   [ Blockly.Msg.b_verdant_froglight, 'b.verdant_froglight' ],
		   [ Blockly.Msg.b_vine, 'b.vine' ],
		   [ Blockly.Msg.b_void_air, 'b.void_air' ],
		   [ Blockly.Msg.b_wall_torch, 'b.wall_torch' ],
		   [ Blockly.Msg.b_warped_button, 'b.warped_button' ],
		   [ Blockly.Msg.b_warped_door, 'b.warped_door' ],
		   [ Blockly.Msg.b_warped_fence, 'b.warped_fence' ],
		   [ Blockly.Msg.b_warped_fence_gate, 'b.warped_fence_gate' ],
		   [ Blockly.Msg.b_warped_fungus, 'b.warped_fungus' ],
		   [ Blockly.Msg.b_warped_hanging_sign, 'b.warped_hanging_sign' ],
		   [ Blockly.Msg.b_warped_hyphae, 'b.warped_hyphae' ],
		   [ Blockly.Msg.b_warped_nylium, 'b.warped_nylium' ],
		   [ Blockly.Msg.b_warped_planks, 'b.warped_planks' ],
		   [ Blockly.Msg.b_warped_pressure_plate, 'b.warped_pressure_plate' ],
		   [ Blockly.Msg.b_warped_roots, 'b.warped_roots' ],
		   [ Blockly.Msg.b_warped_shelf, 'b.warped_shelf' ],
		   [ Blockly.Msg.b_warped_sign, 'b.warped_sign' ],
		   [ Blockly.Msg.b_warped_slab, 'b.warped_slab' ],
		   [ Blockly.Msg.b_warped_stairs, 'b.warped_stairs' ],
		   [ Blockly.Msg.b_warped_stem, 'b.warped_stem' ],
		   [ Blockly.Msg.b_warped_trapdoor, 'b.warped_trapdoor' ],
		   [ Blockly.Msg.b_warped_wall_hanging_sign, 'b.warped_wall_hanging_sign' ],
		   [ Blockly.Msg.b_warped_wall_sign, 'b.warped_wall_sign' ],
		   [ Blockly.Msg.b_warped_wart_block, 'b.warped_wart_block' ],
		   [ Blockly.Msg.b_water, 'b.water' ],
		   [ Blockly.Msg.b_water_cauldron, 'b.water_cauldron' ],
		   [ Blockly.Msg.b_waxed_chiseled_copper, 'b.waxed_chiseled_copper' ],
		   [ Blockly.Msg.b_waxed_copper_bars, 'b.waxed_copper_bars' ],
		   [ Blockly.Msg.b_waxed_copper_block, 'b.waxed_copper_block' ],
		   [ Blockly.Msg.b_waxed_copper_bulb, 'b.waxed_copper_bulb' ],
		   [ Blockly.Msg.b_waxed_copper_chain, 'b.waxed_copper_chain' ],
		   [ Blockly.Msg.b_waxed_copper_chest, 'b.waxed_copper_chest' ],
		   [ Blockly.Msg.b_waxed_copper_door, 'b.waxed_copper_door' ],
		   [ Blockly.Msg.b_waxed_copper_golem_statue, 'b.waxed_copper_golem_statue' ],
		   [ Blockly.Msg.b_waxed_copper_grate, 'b.waxed_copper_grate' ],
		   [ Blockly.Msg.b_waxed_copper_lantern, 'b.waxed_copper_lantern' ],
		   [ Blockly.Msg.b_waxed_copper_trapdoor, 'b.waxed_copper_trapdoor' ],
		   [ Blockly.Msg.b_waxed_cut_copper, 'b.waxed_cut_copper' ],
		   [ Blockly.Msg.b_waxed_cut_copper_slab, 'b.waxed_cut_copper_slab' ],
		   [ Blockly.Msg.b_waxed_cut_copper_stairs, 'b.waxed_cut_copper_stairs' ],
		   [ Blockly.Msg.b_waxed_exposed_chiseled_copper, 'b.waxed_exposed_chiseled_copper' ],
		   [ Blockly.Msg.b_waxed_exposed_copper, 'b.waxed_exposed_copper' ],
		   [ Blockly.Msg.b_waxed_exposed_copper_bars, 'b.waxed_exposed_copper_bars' ],
		   [ Blockly.Msg.b_waxed_exposed_copper_bulb, 'b.waxed_exposed_copper_bulb' ],
		   [ Blockly.Msg.b_waxed_exposed_copper_chain, 'b.waxed_exposed_copper_chain' ],
		   [ Blockly.Msg.b_waxed_exposed_copper_chest, 'b.waxed_exposed_copper_chest' ],
		   [ Blockly.Msg.b_waxed_exposed_copper_door, 'b.waxed_exposed_copper_door' ],
		   [ Blockly.Msg.b_waxed_exposed_copper_golem_statue, 'b.waxed_exposed_copper_golem_statue' ],
		   [ Blockly.Msg.b_waxed_exposed_copper_grate, 'b.waxed_exposed_copper_grate' ],
		   [ Blockly.Msg.b_waxed_exposed_copper_lantern, 'b.waxed_exposed_copper_lantern' ],
		   [ Blockly.Msg.b_waxed_exposed_copper_trapdoor, 'b.waxed_exposed_copper_trapdoor' ],
		   [ Blockly.Msg.b_waxed_exposed_cut_copper, 'b.waxed_exposed_cut_copper' ],
		   [ Blockly.Msg.b_waxed_exposed_cut_copper_slab, 'b.waxed_exposed_cut_copper_slab' ],
		   [ Blockly.Msg.b_waxed_exposed_cut_copper_stairs, 'b.waxed_exposed_cut_copper_stairs' ],
		   [ Blockly.Msg.b_waxed_exposed_lightning_rod, 'b.waxed_exposed_lightning_rod' ],
		   [ Blockly.Msg.b_waxed_lightning_rod, 'b.waxed_lightning_rod' ],
		   [ Blockly.Msg.b_waxed_oxidized_chiseled_copper, 'b.waxed_oxidized_chiseled_copper' ],
		   [ Blockly.Msg.b_waxed_oxidized_copper, 'b.waxed_oxidized_copper' ],
		   [ Blockly.Msg.b_waxed_oxidized_copper_bars, 'b.waxed_oxidized_copper_bars' ],
		   [ Blockly.Msg.b_waxed_oxidized_copper_bulb, 'b.waxed_oxidized_copper_bulb' ],
		   [ Blockly.Msg.b_waxed_oxidized_copper_chain, 'b.waxed_oxidized_copper_chain' ],
		   [ Blockly.Msg.b_waxed_oxidized_copper_chest, 'b.waxed_oxidized_copper_chest' ],
		   [ Blockly.Msg.b_waxed_oxidized_copper_door, 'b.waxed_oxidized_copper_door' ],
		   [ Blockly.Msg.b_waxed_oxidized_copper_golem_statue, 'b.waxed_oxidized_copper_golem_statue' ],
		   [ Blockly.Msg.b_waxed_oxidized_copper_grate, 'b.waxed_oxidized_copper_grate' ],
		   [ Blockly.Msg.b_waxed_oxidized_copper_lantern, 'b.waxed_oxidized_copper_lantern' ],
		   [ Blockly.Msg.b_waxed_oxidized_copper_trapdoor, 'b.waxed_oxidized_copper_trapdoor' ],
		   [ Blockly.Msg.b_waxed_oxidized_cut_copper, 'b.waxed_oxidized_cut_copper' ],
		   [ Blockly.Msg.b_waxed_oxidized_cut_copper_slab, 'b.waxed_oxidized_cut_copper_slab' ],
		   [ Blockly.Msg.b_waxed_oxidized_cut_copper_stairs, 'b.waxed_oxidized_cut_copper_stairs' ],
		   [ Blockly.Msg.b_waxed_oxidized_lightning_rod, 'b.waxed_oxidized_lightning_rod' ],
		   [ Blockly.Msg.b_waxed_weathered_chiseled_copper, 'b.waxed_weathered_chiseled_copper' ],
		   [ Blockly.Msg.b_waxed_weathered_copper, 'b.waxed_weathered_copper' ],
		   [ Blockly.Msg.b_waxed_weathered_copper_bars, 'b.waxed_weathered_copper_bars' ],
		   [ Blockly.Msg.b_waxed_weathered_copper_bulb, 'b.waxed_weathered_copper_bulb' ],
		   [ Blockly.Msg.b_waxed_weathered_copper_chain, 'b.waxed_weathered_copper_chain' ],
		   [ Blockly.Msg.b_waxed_weathered_copper_chest, 'b.waxed_weathered_copper_chest' ],
		   [ Blockly.Msg.b_waxed_weathered_copper_door, 'b.waxed_weathered_copper_door' ],
		   [ Blockly.Msg.b_waxed_weathered_copper_golem_statue, 'b.waxed_weathered_copper_golem_statue' ],
		   [ Blockly.Msg.b_waxed_weathered_copper_grate, 'b.waxed_weathered_copper_grate' ],
		   [ Blockly.Msg.b_waxed_weathered_copper_lantern, 'b.waxed_weathered_copper_lantern' ],
		   [ Blockly.Msg.b_waxed_weathered_copper_trapdoor, 'b.waxed_weathered_copper_trapdoor' ],
		   [ Blockly.Msg.b_waxed_weathered_cut_copper, 'b.waxed_weathered_cut_copper' ],
		   [ Blockly.Msg.b_waxed_weathered_cut_copper_slab, 'b.waxed_weathered_cut_copper_slab' ],
		   [ Blockly.Msg.b_waxed_weathered_cut_copper_stairs, 'b.waxed_weathered_cut_copper_stairs' ],
		   [ Blockly.Msg.b_waxed_weathered_lightning_rod, 'b.waxed_weathered_lightning_rod' ],
		   [ Blockly.Msg.b_weathered_chiseled_copper, 'b.weathered_chiseled_copper' ],
		   [ Blockly.Msg.b_weathered_copper, 'b.weathered_copper' ],
		   [ Blockly.Msg.b_weathered_copper_bars, 'b.weathered_copper_bars' ],
		   [ Blockly.Msg.b_weathered_copper_bulb, 'b.weathered_copper_bulb' ],
		   [ Blockly.Msg.b_weathered_copper_chain, 'b.weathered_copper_chain' ],
		   [ Blockly.Msg.b_weathered_copper_chest, 'b.weathered_copper_chest' ],
		   [ Blockly.Msg.b_weathered_copper_door, 'b.weathered_copper_door' ],
		   [ Blockly.Msg.b_weathered_copper_golem_statue, 'b.weathered_copper_golem_statue' ],
		   [ Blockly.Msg.b_weathered_copper_grate, 'b.weathered_copper_grate' ],
		   [ Blockly.Msg.b_weathered_copper_lantern, 'b.weathered_copper_lantern' ],
		   [ Blockly.Msg.b_weathered_copper_trapdoor, 'b.weathered_copper_trapdoor' ],
		   [ Blockly.Msg.b_weathered_cut_copper, 'b.weathered_cut_copper' ],
		   [ Blockly.Msg.b_weathered_cut_copper_slab, 'b.weathered_cut_copper_slab' ],
		   [ Blockly.Msg.b_weathered_cut_copper_stairs, 'b.weathered_cut_copper_stairs' ],
		   [ Blockly.Msg.b_weathered_lightning_rod, 'b.weathered_lightning_rod' ],
		   [ Blockly.Msg.b_weeping_vines, 'b.weeping_vines' ],
		   [ Blockly.Msg.b_weeping_vines_plant, 'b.weeping_vines_plant' ],
		   [ Blockly.Msg.b_wet_sponge, 'b.wet_sponge' ],
		   [ Blockly.Msg.b_wheat, 'b.wheat' ],
		   [ Blockly.Msg.b_white_banner, 'b.white_banner' ],
		   [ Blockly.Msg.b_white_bed, 'b.white_bed' ],
		   [ Blockly.Msg.b_white_candle, 'b.white_candle' ],
		   [ Blockly.Msg.b_white_candle_cake, 'b.white_candle_cake' ],
		   [ Blockly.Msg.b_white_carpet, 'b.white_carpet' ],
		   [ Blockly.Msg.b_white_concrete, 'b.white_concrete' ],
		   [ Blockly.Msg.b_white_concrete_powder, 'b.white_concrete_powder' ],
		   [ Blockly.Msg.b_white_glazed_terracotta, 'b.white_glazed_terracotta' ],
		   [ Blockly.Msg.b_white_shulker_box, 'b.white_shulker_box' ],
		   [ Blockly.Msg.b_white_stained_glass, 'b.white_stained_glass' ],
		   [ Blockly.Msg.b_white_stained_glass_pane, 'b.white_stained_glass_pane' ],
		   [ Blockly.Msg.b_white_terracotta, 'b.white_terracotta' ],
		   [ Blockly.Msg.b_white_tulip, 'b.white_tulip' ],
		   [ Blockly.Msg.b_white_wool, 'b.white_wool' ],
		   [ Blockly.Msg.b_wildflowers, 'b.wildflowers' ],
		   [ Blockly.Msg.b_wither_rose, 'b.wither_rose' ],
		   [ Blockly.Msg.b_wither_skeleton_skull, 'b.wither_skeleton_skull' ],
		   [ Blockly.Msg.b_wither_skeleton_wall_skull, 'b.wither_skeleton_wall_skull' ],
		   [ Blockly.Msg.b_yellow_banner, 'b.yellow_banner' ],
		   [ Blockly.Msg.b_yellow_bed, 'b.yellow_bed' ],
		   [ Blockly.Msg.b_yellow_candle, 'b.yellow_candle' ],
		   [ Blockly.Msg.b_yellow_candle_cake, 'b.yellow_candle_cake' ],
		   [ Blockly.Msg.b_yellow_carpet, 'b.yellow_carpet' ],
		   [ Blockly.Msg.b_yellow_concrete, 'b.yellow_concrete' ],
		   [ Blockly.Msg.b_yellow_concrete_powder, 'b.yellow_concrete_powder' ],
		   [ Blockly.Msg.b_yellow_glazed_terracotta, 'b.yellow_glazed_terracotta' ],
		   [ Blockly.Msg.b_yellow_shulker_box, 'b.yellow_shulker_box' ],
		   [ Blockly.Msg.b_yellow_stained_glass, 'b.yellow_stained_glass' ],
		   [ Blockly.Msg.b_yellow_stained_glass_pane, 'b.yellow_stained_glass_pane' ],
		   [ Blockly.Msg.b_yellow_terracotta, 'b.yellow_terracotta' ],
		   [ Blockly.Msg.b_yellow_wool, 'b.yellow_wool' ],
		   [ Blockly.Msg.b_zombie_head, 'b.zombie_head' ],
		   [ Blockly.Msg.b_zombie_wall_head, 'b.zombie_wall_head' ]

   
    
    		].sort(compareMCobjects);
	return obList
}


function getParticles() {
	return [		
		
		[ Blockly.Msg.MC_particles+ ' ' + Blockly.Msg.b_tnt, 'p.explosion' ],
		[ Blockly.Msg.MC_particles+ ' ' + Blockly.Msg.i_music_disc_blocks, 'p.note' ],
		[ Blockly.Msg.MC_particles+ ' ' + Blockly.Msg.b_snow, 'p.item_snowball' ],
		[ Blockly.Msg.MC_particles+ ' ' + Blockly.Msg.e_witch, 'p.witch' ],
		[ Blockly.Msg.MC_particles+ ' ' + Blockly.Msg.b_torch, 'p.white_smoke' ],
		[ Blockly.Msg.MC_particles+ ' ' + Blockly.Msg.b_water, 'p.dripping_water' ],
		[ Blockly.Msg.MC_particles+ ' ' + Blockly.Msg.i_firework_star, 'p.firework' ],
		[ Blockly.Msg.MC_particles+ ' ' + Blockly.Msg.e_slime, 'p.item_slime' ],
		[ Blockly.Msg.MC_particles+ ' ' + Blockly.Msg.b_furnace, 'p.flame' ],
		[ Blockly.Msg.MC_particles+ ' ' + Blockly.Msg.b_lava, 'p.lava' ]

].sort(compareMCobjects)
}

function getItems() {
	return [				
		[ Blockly.Msg.i_acacia_boat, 'i.acacia_boat' ],
		[ Blockly.Msg.i_acacia_chest_boat, 'i.acacia_chest_boat' ],
		[ Blockly.Msg.i_amethyst_shard, 'i.amethyst_shard' ],
		[ Blockly.Msg.i_angler_pottery_sherd, 'i.angler_pottery_sherd' ],
		[ Blockly.Msg.i_apple, 'i.apple' ],
		[ Blockly.Msg.i_archer_pottery_sherd, 'i.archer_pottery_sherd' ],
		[ Blockly.Msg.i_armadillo_scute, 'i.armadillo_scute' ],
		[ Blockly.Msg.i_armor_stand, 'i.armor_stand' ],
		[ Blockly.Msg.i_arms_up_pottery_sherd, 'i.arms_up_pottery_sherd' ],
		[ Blockly.Msg.i_arrow, 'i.arrow' ],
		[ Blockly.Msg.i_axolotl_bucket, 'i.axolotl_bucket' ],
		[ Blockly.Msg.i_baked_potato, 'i.baked_potato' ],
		[ Blockly.Msg.i_bamboo_chest_raft, 'i.bamboo_chest_raft' ],
		[ Blockly.Msg.i_bamboo_raft, 'i.bamboo_raft' ],
		[ Blockly.Msg.i_beef, 'i.beef' ],
		[ Blockly.Msg.i_beetroot, 'i.beetroot' ],
		[ Blockly.Msg.i_beetroot_seeds, 'i.beetroot_seeds' ],
		[ Blockly.Msg.i_beetroot_soup, 'i.beetroot_soup' ],
		[ Blockly.Msg.i_birch_boat, 'i.birch_boat' ],
		[ Blockly.Msg.i_birch_chest_boat, 'i.birch_chest_boat' ],
		[ Blockly.Msg.i_black_bundle, 'i.black_bundle' ],
		[ Blockly.Msg.i_black_dye, 'i.black_dye' ],
		[ Blockly.Msg.i_black_harness, 'i.black_harness' ],
		[ Blockly.Msg.i_blade_pottery_sherd, 'i.blade_pottery_sherd' ],
		[ Blockly.Msg.i_blaze_powder, 'i.blaze_powder' ],
		[ Blockly.Msg.i_blaze_rod, 'i.blaze_rod' ],
		[ Blockly.Msg.i_blue_bundle, 'i.blue_bundle' ],
		[ Blockly.Msg.i_blue_dye, 'i.blue_dye' ],
		[ Blockly.Msg.i_blue_egg, 'i.blue_egg' ],
		[ Blockly.Msg.i_blue_harness, 'i.blue_harness' ],
		[ Blockly.Msg.i_bolt_armor_trim_smithing_template, 'i.bolt_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_bone, 'i.bone' ],
		[ Blockly.Msg.i_bone_meal, 'i.bone_meal' ],
		[ Blockly.Msg.i_book, 'i.book' ],
		[ Blockly.Msg.i_bow, 'i.bow' ],
		[ Blockly.Msg.i_bowl, 'i.bowl' ],
		[ Blockly.Msg.i_bread, 'i.bread' ],
		[ Blockly.Msg.i_breeze_rod, 'i.breeze_rod' ],
		[ Blockly.Msg.i_brewer_pottery_sherd, 'i.brewer_pottery_sherd' ],
		[ Blockly.Msg.i_brewing_stand, 'i.brewing_stand' ],
		[ Blockly.Msg.i_brick, 'i.brick' ],
		[ Blockly.Msg.i_brown_bundle, 'i.brown_bundle' ],
		[ Blockly.Msg.i_brown_dye, 'i.brown_dye' ],
		[ Blockly.Msg.i_brown_egg, 'i.brown_egg' ],
		[ Blockly.Msg.i_brown_harness, 'i.brown_harness' ],
		[ Blockly.Msg.i_brush, 'i.brush' ],
		[ Blockly.Msg.i_bucket, 'i.bucket' ],
		[ Blockly.Msg.i_bundle, 'i.bundle' ],
		[ Blockly.Msg.i_burn_pottery_sherd, 'i.burn_pottery_sherd' ],
		[ Blockly.Msg.i_carrot, 'i.carrot' ],
		[ Blockly.Msg.i_carrot_on_a_stick, 'i.carrot_on_a_stick' ],
		[ Blockly.Msg.i_cauldron, 'i.cauldron' ],
		[ Blockly.Msg.i_chainmail_boots, 'i.chainmail_boots' ],
		[ Blockly.Msg.i_chainmail_chestplate, 'i.chainmail_chestplate' ],
		[ Blockly.Msg.i_chainmail_helmet, 'i.chainmail_helmet' ],
		[ Blockly.Msg.i_chainmail_leggings, 'i.chainmail_leggings' ],
		[ Blockly.Msg.i_charcoal, 'i.charcoal' ],
		[ Blockly.Msg.i_cherry_boat, 'i.cherry_boat' ],
		[ Blockly.Msg.i_cherry_chest_boat, 'i.cherry_chest_boat' ],
		[ Blockly.Msg.i_chest_minecart, 'i.chest_minecart' ],
		[ Blockly.Msg.i_chicken, 'i.chicken' ],
		[ Blockly.Msg.i_chorus_fruit, 'i.chorus_fruit' ],
		[ Blockly.Msg.i_clay_ball, 'i.clay_ball' ],
		[ Blockly.Msg.i_clock, 'i.clock' ],
		[ Blockly.Msg.i_coal, 'i.coal' ],
		[ Blockly.Msg.i_coast_armor_trim_smithing_template, 'i.coast_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_cocoa_beans, 'i.cocoa_beans' ],
		[ Blockly.Msg.i_cod, 'i.cod' ],
		[ Blockly.Msg.i_cod_bucket, 'i.cod_bucket' ],
		[ Blockly.Msg.i_compass, 'i.compass' ],
		[ Blockly.Msg.i_cooked_beef, 'i.cooked_beef' ],
		[ Blockly.Msg.i_cooked_chicken, 'i.cooked_chicken' ],
		[ Blockly.Msg.i_cooked_cod, 'i.cooked_cod' ],
		[ Blockly.Msg.i_cooked_mutton, 'i.cooked_mutton' ],
		[ Blockly.Msg.i_cooked_porkchop, 'i.cooked_porkchop' ],
		[ Blockly.Msg.i_cooked_rabbit, 'i.cooked_rabbit' ],
		[ Blockly.Msg.i_cooked_salmon, 'i.cooked_salmon' ],
		[ Blockly.Msg.i_cookie, 'i.cookie' ],
		[ Blockly.Msg.i_copper_axe, 'i.copper_axe' ],
		[ Blockly.Msg.i_copper_boots, 'i.copper_boots' ],
		[ Blockly.Msg.i_copper_chestplate, 'i.copper_chestplate' ],
		[ Blockly.Msg.i_copper_helmet, 'i.copper_helmet' ],
		[ Blockly.Msg.i_copper_hoe, 'i.copper_hoe' ],
		[ Blockly.Msg.i_copper_horse_armor, 'i.copper_horse_armor' ],
		[ Blockly.Msg.i_copper_ingot, 'i.copper_ingot' ],
		[ Blockly.Msg.i_copper_leggings, 'i.copper_leggings' ],
		[ Blockly.Msg.i_copper_nugget, 'i.copper_nugget' ],
		[ Blockly.Msg.i_copper_pickaxe, 'i.copper_pickaxe' ],
		[ Blockly.Msg.i_copper_shovel, 'i.copper_shovel' ],
		[ Blockly.Msg.i_copper_sword, 'i.copper_sword' ],
		[ Blockly.Msg.i_creeper_banner_pattern, 'i.creeper_banner_pattern' ],
		[ Blockly.Msg.i_crossbow, 'i.crossbow' ],
		[ Blockly.Msg.i_cyan_bundle, 'i.cyan_bundle' ],
		[ Blockly.Msg.i_cyan_dye, 'i.cyan_dye' ],
		[ Blockly.Msg.i_cyan_harness, 'i.cyan_harness' ],
		[ Blockly.Msg.i_danger_pottery_sherd, 'i.danger_pottery_sherd' ],
		[ Blockly.Msg.i_dark_oak_boat, 'i.dark_oak_boat' ],
		[ Blockly.Msg.i_dark_oak_chest_boat, 'i.dark_oak_chest_boat' ],
		[ Blockly.Msg.i_debug_stick, 'i.debug_stick' ],
		[ Blockly.Msg.i_diamond, 'i.diamond' ],
		[ Blockly.Msg.i_diamond_axe, 'i.diamond_axe' ],
		[ Blockly.Msg.i_diamond_boots, 'i.diamond_boots' ],
		[ Blockly.Msg.i_diamond_chestplate, 'i.diamond_chestplate' ],
		[ Blockly.Msg.i_diamond_helmet, 'i.diamond_helmet' ],
		[ Blockly.Msg.i_diamond_hoe, 'i.diamond_hoe' ],
		[ Blockly.Msg.i_diamond_horse_armor, 'i.diamond_horse_armor' ],
		[ Blockly.Msg.i_diamond_leggings, 'i.diamond_leggings' ],
		[ Blockly.Msg.i_diamond_pickaxe, 'i.diamond_pickaxe' ],
		[ Blockly.Msg.i_diamond_shovel, 'i.diamond_shovel' ],
		[ Blockly.Msg.i_diamond_sword, 'i.diamond_sword' ],
		[ Blockly.Msg.i_dried_kelp, 'i.dried_kelp' ],
		[ Blockly.Msg.i_dune_armor_trim_smithing_template, 'i.dune_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_echo_shard, 'i.echo_shard' ],
		[ Blockly.Msg.i_egg, 'i.egg' ],
		[ Blockly.Msg.i_elytra, 'i.elytra' ],
		[ Blockly.Msg.i_emerald, 'i.emerald' ],
		[ Blockly.Msg.i_enchanted_book, 'i.enchanted_book' ],
		[ Blockly.Msg.i_enchanted_golden_apple, 'i.enchanted_golden_apple' ],
		[ Blockly.Msg.i_end_crystal, 'i.end_crystal' ],
		[ Blockly.Msg.i_ender_eye, 'i.ender_eye' ],
		[ Blockly.Msg.i_ender_pearl, 'i.ender_pearl' ],
		[ Blockly.Msg.i_experience_bottle, 'i.experience_bottle' ],
		[ Blockly.Msg.i_explorer_pottery_sherd, 'i.explorer_pottery_sherd' ],
		[ Blockly.Msg.i_eye_armor_trim_smithing_template, 'i.eye_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_feather, 'i.feather' ],
		[ Blockly.Msg.i_fermented_spider_eye, 'i.fermented_spider_eye' ],
		[ Blockly.Msg.i_field_masoned_banner_pattern, 'i.field_masoned_banner_pattern' ],
		[ Blockly.Msg.i_filled_map, 'i.filled_map' ],
		[ Blockly.Msg.i_fire_charge, 'i.fire_charge' ],
		[ Blockly.Msg.i_firework_rocket, 'i.firework_rocket' ],
		[ Blockly.Msg.i_firework_star, 'i.firework_star' ],
		[ Blockly.Msg.i_fishing_rod, 'i.fishing_rod' ],
		[ Blockly.Msg.i_flint, 'i.flint' ],
		[ Blockly.Msg.i_flint_and_steel, 'i.flint_and_steel' ],
		[ Blockly.Msg.i_flow_armor_trim_smithing_template, 'i.flow_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_flow_banner_pattern, 'i.flow_banner_pattern' ],
		[ Blockly.Msg.i_flow_pottery_sherd, 'i.flow_pottery_sherd' ],
		[ Blockly.Msg.i_flower_banner_pattern, 'i.flower_banner_pattern' ],
		[ Blockly.Msg.i_flower_pot, 'i.flower_pot' ],
		[ Blockly.Msg.i_friend_pottery_sherd, 'i.friend_pottery_sherd' ],
		[ Blockly.Msg.i_furnace_minecart, 'i.furnace_minecart' ],
		[ Blockly.Msg.i_ghast_tear, 'i.ghast_tear' ],
		[ Blockly.Msg.i_glass_bottle, 'i.glass_bottle' ],
		[ Blockly.Msg.i_glistering_melon_slice, 'i.glistering_melon_slice' ],
		[ Blockly.Msg.i_globe_banner_pattern, 'i.globe_banner_pattern' ],
		[ Blockly.Msg.i_glow_berries, 'i.glow_berries' ],
		[ Blockly.Msg.i_glow_ink_sac, 'i.glow_ink_sac' ],
		[ Blockly.Msg.i_glow_item_frame, 'i.glow_item_frame' ],
		[ Blockly.Msg.i_glowstone_dust, 'i.glowstone_dust' ],
		[ Blockly.Msg.i_goat_horn, 'i.goat_horn' ],
		[ Blockly.Msg.i_gold_ingot, 'i.gold_ingot' ],
		[ Blockly.Msg.i_gold_nugget, 'i.gold_nugget' ],
		[ Blockly.Msg.i_golden_apple, 'i.golden_apple' ],
		[ Blockly.Msg.i_golden_axe, 'i.golden_axe' ],
		[ Blockly.Msg.i_golden_boots, 'i.golden_boots' ],
		[ Blockly.Msg.i_golden_carrot, 'i.golden_carrot' ],
		[ Blockly.Msg.i_golden_chestplate, 'i.golden_chestplate' ],
		[ Blockly.Msg.i_golden_helmet, 'i.golden_helmet' ],
		[ Blockly.Msg.i_golden_hoe, 'i.golden_hoe' ],
		[ Blockly.Msg.i_golden_horse_armor, 'i.golden_horse_armor' ],
		[ Blockly.Msg.i_golden_leggings, 'i.golden_leggings' ],
		[ Blockly.Msg.i_golden_pickaxe, 'i.golden_pickaxe' ],
		[ Blockly.Msg.i_golden_shovel, 'i.golden_shovel' ],
		[ Blockly.Msg.i_golden_sword, 'i.golden_sword' ],
		[ Blockly.Msg.i_gray_bundle, 'i.gray_bundle' ],
		[ Blockly.Msg.i_gray_dye, 'i.gray_dye' ],
		[ Blockly.Msg.i_gray_harness, 'i.gray_harness' ],
		[ Blockly.Msg.i_green_bundle, 'i.green_bundle' ],
		[ Blockly.Msg.i_green_dye, 'i.green_dye' ],
		[ Blockly.Msg.i_green_harness, 'i.green_harness' ],
		[ Blockly.Msg.i_gunpowder, 'i.gunpowder' ],
		[ Blockly.Msg.i_guster_banner_pattern, 'i.guster_banner_pattern' ],
		[ Blockly.Msg.i_guster_pottery_sherd, 'i.guster_pottery_sherd' ],
		[ Blockly.Msg.i_heart_of_the_sea, 'i.heart_of_the_sea' ],
		[ Blockly.Msg.i_heart_pottery_sherd, 'i.heart_pottery_sherd' ],
		[ Blockly.Msg.i_heartbreak_pottery_sherd, 'i.heartbreak_pottery_sherd' ],
		[ Blockly.Msg.i_honey_bottle, 'i.honey_bottle' ],
		[ Blockly.Msg.i_honeycomb, 'i.honeycomb' ],
		[ Blockly.Msg.i_host_armor_trim_smithing_template, 'i.host_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_howl_pottery_sherd, 'i.howl_pottery_sherd' ],
		[ Blockly.Msg.i_ink_sac, 'i.ink_sac' ],
		[ Blockly.Msg.i_iron_axe, 'i.iron_axe' ],
		[ Blockly.Msg.i_iron_boots, 'i.iron_boots' ],
		[ Blockly.Msg.i_iron_chestplate, 'i.iron_chestplate' ],
		[ Blockly.Msg.i_iron_helmet, 'i.iron_helmet' ],
		[ Blockly.Msg.i_iron_hoe, 'i.iron_hoe' ],
		[ Blockly.Msg.i_iron_horse_armor, 'i.iron_horse_armor' ],
		[ Blockly.Msg.i_iron_ingot, 'i.iron_ingot' ],
		[ Blockly.Msg.i_iron_leggings, 'i.iron_leggings' ],
		[ Blockly.Msg.i_iron_nugget, 'i.iron_nugget' ],
		[ Blockly.Msg.i_iron_pickaxe, 'i.iron_pickaxe' ],
		[ Blockly.Msg.i_iron_shovel, 'i.iron_shovel' ],
		[ Blockly.Msg.i_iron_sword, 'i.iron_sword' ],
		[ Blockly.Msg.i_item_frame, 'i.item_frame' ],
		[ Blockly.Msg.i_jungle_boat, 'i.jungle_boat' ],
		[ Blockly.Msg.i_jungle_chest_boat, 'i.jungle_chest_boat' ],
		[ Blockly.Msg.i_knowledge_book, 'i.knowledge_book' ],
		[ Blockly.Msg.i_lapis_lazuli, 'i.lapis_lazuli' ],
		[ Blockly.Msg.i_lead, 'i.lead' ],
		[ Blockly.Msg.i_leather, 'i.leather' ],
		[ Blockly.Msg.i_leather_boots, 'i.leather_boots' ],
		[ Blockly.Msg.i_leather_chestplate, 'i.leather_chestplate' ],
		[ Blockly.Msg.i_leather_helmet, 'i.leather_helmet' ],
		[ Blockly.Msg.i_leather_horse_armor, 'i.leather_horse_armor' ],
		[ Blockly.Msg.i_leather_leggings, 'i.leather_leggings' ],
		[ Blockly.Msg.i_light_blue_bundle, 'i.light_blue_bundle' ],
		[ Blockly.Msg.i_light_blue_dye, 'i.light_blue_dye' ],
		[ Blockly.Msg.i_light_blue_harness, 'i.light_blue_harness' ],
		[ Blockly.Msg.i_light_gray_bundle, 'i.light_gray_bundle' ],
		[ Blockly.Msg.i_light_gray_dye, 'i.light_gray_dye' ],
		[ Blockly.Msg.i_light_gray_harness, 'i.light_gray_harness' ],
		[ Blockly.Msg.i_lime_bundle, 'i.lime_bundle' ],
		[ Blockly.Msg.i_lime_dye, 'i.lime_dye' ],
		[ Blockly.Msg.i_lime_harness, 'i.lime_harness' ],
		[ Blockly.Msg.i_lingering_potion, 'i.lingering_potion' ],
		[ Blockly.Msg.i_mace, 'i.mace' ],
		[ Blockly.Msg.i_magenta_bundle, 'i.magenta_bundle' ],
		[ Blockly.Msg.i_magenta_dye, 'i.magenta_dye' ],
		[ Blockly.Msg.i_magenta_harness, 'i.magenta_harness' ],
		[ Blockly.Msg.i_magma_cream, 'i.magma_cream' ],
		[ Blockly.Msg.i_mangrove_boat, 'i.mangrove_boat' ],
		[ Blockly.Msg.i_mangrove_chest_boat, 'i.mangrove_chest_boat' ],
		[ Blockly.Msg.i_map, 'i.map' ],
		[ Blockly.Msg.i_melon_seeds, 'i.melon_seeds' ],
		[ Blockly.Msg.i_melon_slice, 'i.melon_slice' ],
		[ Blockly.Msg.i_milk_bucket, 'i.milk_bucket' ],
		[ Blockly.Msg.i_minecart, 'i.minecart' ],
		[ Blockly.Msg.i_miner_pottery_sherd, 'i.miner_pottery_sherd' ],
		[ Blockly.Msg.i_mojang_banner_pattern, 'i.mojang_banner_pattern' ],
		[ Blockly.Msg.i_mourner_pottery_sherd, 'i.mourner_pottery_sherd' ],
		[ Blockly.Msg.i_mushroom_stew, 'i.mushroom_stew' ],
		[ Blockly.Msg.i_music_disc_blocks, 'i.music_disc_blocks' ],
		[ Blockly.Msg.i_music_disc_cat, 'i.music_disc_cat' ],
		[ Blockly.Msg.i_music_disc_chirp, 'i.music_disc_chirp' ],
		[ Blockly.Msg.i_music_disc_creator, 'i.music_disc_creator' ],
		[ Blockly.Msg.i_music_disc_creator_music_box, 'i.music_disc_creator_music_box' ],
		[ Blockly.Msg.i_music_disc_far, 'i.music_disc_far' ],
		[ Blockly.Msg.i_music_disc_lava_chicken, 'i.music_disc_lava_chicken' ],
		[ Blockly.Msg.i_music_disc_mall, 'i.music_disc_mall' ],
		[ Blockly.Msg.i_music_disc_mellohi, 'i.music_disc_mellohi' ],
		[ Blockly.Msg.i_music_disc_otherside, 'i.music_disc_otherside' ],
		[ Blockly.Msg.i_music_disc_pigstep, 'i.music_disc_pigstep' ],
		[ Blockly.Msg.i_music_disc_precipice, 'i.music_disc_precipice' ],
		[ Blockly.Msg.i_music_disc_relic, 'i.music_disc_relic' ],
		[ Blockly.Msg.i_music_disc_stal, 'i.music_disc_stal' ],
		[ Blockly.Msg.i_music_disc_strad, 'i.music_disc_strad' ],
		[ Blockly.Msg.i_music_disc_tears, 'i.music_disc_tears' ],
		[ Blockly.Msg.i_music_disc_wait, 'i.music_disc_wait' ],
		[ Blockly.Msg.i_music_disc_ward, 'i.music_disc_ward' ],
		[ Blockly.Msg.i_mutton, 'i.mutton' ],
		[ Blockly.Msg.i_name_tag, 'i.name_tag' ],
		[ Blockly.Msg.i_nautilus_shell, 'i.nautilus_shell' ],
		[ Blockly.Msg.i_nether_brick, 'i.nether_brick' ],
		[ Blockly.Msg.i_nether_star, 'i.nether_star' ],
		[ Blockly.Msg.i_nether_wart, 'i.nether_wart' ],
		[ Blockly.Msg.i_netherite_axe, 'i.netherite_axe' ],
		[ Blockly.Msg.i_netherite_boots, 'i.netherite_boots' ],
		[ Blockly.Msg.i_netherite_chestplate, 'i.netherite_chestplate' ],
		[ Blockly.Msg.i_netherite_helmet, 'i.netherite_helmet' ],
		[ Blockly.Msg.i_netherite_hoe, 'i.netherite_hoe' ],
		[ Blockly.Msg.i_netherite_ingot, 'i.netherite_ingot' ],
		[ Blockly.Msg.i_netherite_leggings, 'i.netherite_leggings' ],
		[ Blockly.Msg.i_netherite_pickaxe, 'i.netherite_pickaxe' ],
		[ Blockly.Msg.i_netherite_scrap, 'i.netherite_scrap' ],
		[ Blockly.Msg.i_netherite_shovel, 'i.netherite_shovel' ],
		[ Blockly.Msg.i_netherite_sword, 'i.netherite_sword' ],
		[ Blockly.Msg.i_netherite_upgrade_smithing_template, 'i.netherite_upgrade_smithing_template' ],
		[ Blockly.Msg.i_oak_boat, 'i.oak_boat' ],
		[ Blockly.Msg.i_oak_chest_boat, 'i.oak_chest_boat' ],
		[ Blockly.Msg.i_ominous_bottle, 'i.ominous_bottle' ],
		[ Blockly.Msg.i_ominous_trial_key, 'i.ominous_trial_key' ],
		[ Blockly.Msg.i_orange_bundle, 'i.orange_bundle' ],
		[ Blockly.Msg.i_orange_dye, 'i.orange_dye' ],
		[ Blockly.Msg.i_orange_harness, 'i.orange_harness' ],
		[ Blockly.Msg.i_painting, 'i.painting' ],
		[ Blockly.Msg.i_pale_oak_boat, 'i.pale_oak_boat' ],
		[ Blockly.Msg.i_pale_oak_chest_boat, 'i.pale_oak_chest_boat' ],
		[ Blockly.Msg.i_paper, 'i.paper' ],
		[ Blockly.Msg.i_phantom_membrane, 'i.phantom_membrane' ],
		[ Blockly.Msg.i_piglin_banner_pattern, 'i.piglin_banner_pattern' ],
		[ Blockly.Msg.i_pink_bundle, 'i.pink_bundle' ],
		[ Blockly.Msg.i_pink_dye, 'i.pink_dye' ],
		[ Blockly.Msg.i_pink_harness, 'i.pink_harness' ],
		[ Blockly.Msg.i_pitcher_plant, 'i.pitcher_plant' ],
		[ Blockly.Msg.i_pitcher_pod, 'i.pitcher_pod' ],
		[ Blockly.Msg.i_plenty_pottery_sherd, 'i.plenty_pottery_sherd' ],
		[ Blockly.Msg.i_poisonous_potato, 'i.poisonous_potato' ],
		[ Blockly.Msg.i_popped_chorus_fruit, 'i.popped_chorus_fruit' ],
		[ Blockly.Msg.i_porkchop, 'i.porkchop' ],
		[ Blockly.Msg.i_potato, 'i.potato' ],
		[ Blockly.Msg.i_potion, 'i.potion' ],
		[ Blockly.Msg.i_powder_snow_bucket, 'i.powder_snow_bucket' ],
		[ Blockly.Msg.i_prismarine_crystals, 'i.prismarine_crystals' ],
		[ Blockly.Msg.i_prismarine_shard, 'i.prismarine_shard' ],
		[ Blockly.Msg.i_prize_pottery_sherd, 'i.prize_pottery_sherd' ],
		[ Blockly.Msg.i_pufferfish, 'i.pufferfish' ],
		[ Blockly.Msg.i_pufferfish_bucket, 'i.pufferfish_bucket' ],
		[ Blockly.Msg.i_pumpkin_pie, 'i.pumpkin_pie' ],
		[ Blockly.Msg.i_pumpkin_seeds, 'i.pumpkin_seeds' ],
		[ Blockly.Msg.i_purple_bundle, 'i.purple_bundle' ],
		[ Blockly.Msg.i_purple_dye, 'i.purple_dye' ],
		[ Blockly.Msg.i_purple_harness, 'i.purple_harness' ],
		[ Blockly.Msg.i_quartz, 'i.quartz' ],
		[ Blockly.Msg.i_rabbit, 'i.rabbit' ],
		[ Blockly.Msg.i_rabbit_foot, 'i.rabbit_foot' ],
		[ Blockly.Msg.i_rabbit_hide, 'i.rabbit_hide' ],
		[ Blockly.Msg.i_rabbit_stew, 'i.rabbit_stew' ],
		[ Blockly.Msg.i_raiser_armor_trim_smithing_template, 'i.raiser_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_raw_copper, 'i.raw_copper' ],
		[ Blockly.Msg.i_raw_gold, 'i.raw_gold' ],
		[ Blockly.Msg.i_raw_iron, 'i.raw_iron' ],
		[ Blockly.Msg.i_recovery_compass, 'i.recovery_compass' ],
		[ Blockly.Msg.i_red_bundle, 'i.red_bundle' ],
		[ Blockly.Msg.i_red_dye, 'i.red_dye' ],
		[ Blockly.Msg.i_red_harness, 'i.red_harness' ],
		[ Blockly.Msg.i_redstone, 'i.redstone' ],
		[ Blockly.Msg.i_resin_brick, 'i.resin_brick' ],
		[ Blockly.Msg.i_resin_clump, 'i.resin_clump' ],
		[ Blockly.Msg.i_rib_armor_trim_smithing_template, 'i.rib_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_rotten_flesh, 'i.rotten_flesh' ],
		[ Blockly.Msg.i_saddle, 'i.saddle' ],
		[ Blockly.Msg.i_salmon, 'i.salmon' ],
		[ Blockly.Msg.i_salmon_bucket, 'i.salmon_bucket' ],
		[ Blockly.Msg.i_scrape_pottery_sherd, 'i.scrape_pottery_sherd' ],
		[ Blockly.Msg.i_scute, 'i.scute' ],
		[ Blockly.Msg.i_sentry_armor_trim_smithing_template, 'i.sentry_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_shaper_armor_trim_smithing_template, 'i.shaper_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_sheaf_pottery_sherd, 'i.sheaf_pottery_sherd' ],
		[ Blockly.Msg.i_shears, 'i.shears' ],
		[ Blockly.Msg.i_shelter_pottery_sherd, 'i.shelter_pottery_sherd' ],
		[ Blockly.Msg.i_shield, 'i.shield' ],
		[ Blockly.Msg.i_shulker_shell, 'i.shulker_shell' ],
		[ Blockly.Msg.i_sign, 'i.sign' ],
		[ Blockly.Msg.i_silence_armor_trim_smithing_template, 'i.silence_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_skull_banner_pattern, 'i.skull_banner_pattern' ],
		[ Blockly.Msg.i_skull_pottery_sherd, 'i.skull_pottery_sherd' ],
		[ Blockly.Msg.i_slime_ball, 'i.slime_ball' ],
		[ Blockly.Msg.i_smithing_template, 'i.smithing_template' ],
		[ Blockly.Msg.i_snort_pottery_sherd, 'i.snort_pottery_sherd' ],
		[ Blockly.Msg.i_snout_armor_trim_smithing_template, 'i.snout_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_snowball, 'i.snowball' ],
		[ Blockly.Msg.i_spectral_arrow, 'i.spectral_arrow' ],
		[ Blockly.Msg.i_spider_eye, 'i.spider_eye' ],
		[ Blockly.Msg.i_spire_armor_trim_smithing_template, 'i.spire_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_splash_potion, 'i.splash_potion' ],
		[ Blockly.Msg.i_spruce_boat, 'i.spruce_boat' ],
		[ Blockly.Msg.i_spruce_chest_boat, 'i.spruce_chest_boat' ],
		[ Blockly.Msg.i_spyglass, 'i.spyglass' ],
		[ Blockly.Msg.i_stick, 'i.stick' ],
		[ Blockly.Msg.i_stone_axe, 'i.stone_axe' ],
		[ Blockly.Msg.i_stone_hoe, 'i.stone_hoe' ],
		[ Blockly.Msg.i_stone_pickaxe, 'i.stone_pickaxe' ],
		[ Blockly.Msg.i_stone_shovel, 'i.stone_shovel' ],
		[ Blockly.Msg.i_stone_sword, 'i.stone_sword' ],
		[ Blockly.Msg.i_string, 'i.string' ],
		[ Blockly.Msg.i_sugar, 'i.sugar' ],
		[ Blockly.Msg.i_suspicious_stew, 'i.suspicious_stew' ],
		[ Blockly.Msg.i_sweet_berries, 'i.sweet_berries' ],
		[ Blockly.Msg.i_tadpole_bucket, 'i.tadpole_bucket' ],
		[ Blockly.Msg.i_tide_armor_trim_smithing_template, 'i.tide_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_tipped_arrow, 'i.tipped_arrow' ],
		[ Blockly.Msg.i_torchflower_seeds, 'i.torchflower_seeds' ],
		[ Blockly.Msg.i_totem_of_undying, 'i.totem_of_undying' ],
		[ Blockly.Msg.i_trial_key, 'i.trial_key' ],
		[ Blockly.Msg.i_trident, 'i.trident' ],
		[ Blockly.Msg.i_tropical_fish, 'i.tropical_fish' ],
		[ Blockly.Msg.i_tropical_fish_bucket, 'i.tropical_fish_bucket' ],
		[ Blockly.Msg.i_turtle_helmet, 'i.turtle_helmet' ],
		[ Blockly.Msg.i_turtle_scute, 'i.turtle_scute' ],
		[ Blockly.Msg.i_vex_armor_trim_smithing_template, 'i.vex_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_ward_armor_trim_smithing_template, 'i.ward_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_warped_fungus_on_a_stick, 'i.warped_fungus_on_a_stick' ],
		[ Blockly.Msg.i_water_bucket, 'i.water_bucket' ],
		[ Blockly.Msg.i_wayfinder_armor_trim_smithing_template, 'i.wayfinder_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_wheat, 'i.wheat' ],
		[ Blockly.Msg.i_wheat_seeds, 'i.wheat_seeds' ],
		[ Blockly.Msg.i_white_bundle, 'i.white_bundle' ],
		[ Blockly.Msg.i_white_dye, 'i.white_dye' ],
		[ Blockly.Msg.i_white_harness, 'i.white_harness' ],
		[ Blockly.Msg.i_wild_armor_trim_smithing_template, 'i.wild_armor_trim_smithing_template' ],
		[ Blockly.Msg.i_wind_charge, 'i.wind_charge' ],
		[ Blockly.Msg.i_wolf_armor, 'i.wolf_armor' ],
		[ Blockly.Msg.i_wooden_axe, 'i.wooden_axe' ],
		[ Blockly.Msg.i_wooden_hoe, 'i.wooden_hoe' ],
		[ Blockly.Msg.i_wooden_pickaxe, 'i.wooden_pickaxe' ],
		[ Blockly.Msg.i_wooden_shovel, 'i.wooden_shovel' ],
		[ Blockly.Msg.i_wooden_sword, 'i.wooden_sword' ],
		[ Blockly.Msg.i_writable_book, 'i.writable_book' ],
		[ Blockly.Msg.i_written_book, 'i.written_book' ],
		[ Blockly.Msg.i_yellow_bundle, 'i.yellow_bundle' ],
		[ Blockly.Msg.i_yellow_dye, 'i.yellow_dye' ],
		[ Blockly.Msg.i_yellow_harness, 'i.yellow_harness' ]


 
		
].sort(compareMCobjects)
}


function getItems_opOnly() {
	return [		
[ Blockly.Msg.i_tnt_minecart, 'i.tnt_minecart' ],


 
		
].sort(compareMCobjects)
}




Blockly.Blocks['minecraft_multiciplity'] = {
		init : function() {
			this.jsonInit({
				"type" : "minecraft_multiciplity",
				"message0" : Blockly.Msg.MC_cmd_minecraft_multiciplity,
				"args0" : [ {
					"type" : "field_number",
					"name" : "mutiplicity",
					"value" : 0,
					"min" : 1,
					"max" : 1000,
					"precision" : 1
				}, {
					"type" : "input_value",
					"name" : "singleblock",
					"check" : [ "Material" ]
				} ],
				"output" : "Material",
				"colour" : 330,
				"tooltip" : "",
				"helpUrl" : ""
			});
		}
	};
	
	
Blockly.Blocks['minecraft_multiciplity_var'] = {
		init : function() {
			this.jsonInit({
				  "type": "minecraft_multiciplity_var",
				  "message0" : Blockly.Msg.MC_cmd_minecraft_multiciplity,
				  "args0": [
				    {
				      "type": "field_variable",
				      "name": "mutiplicity",
				      "variable": "num"
				    },
				    {
				      "type": "input_value",
				      "name": "singleblock",
						"check" : [ "Material" ]
				    }
				  ],
				  "output": "Material",
				  "colour": 330,
				  "tooltip": "",
				  "helpUrl": ""
				});
		}
	};
Blockly.Blocks['minecraft_delay'] = {
		init : function() {
			this.jsonInit({
				"type" : "minecraft_delay",
				"message0" : Blockly.Msg.MC_cmd_minecraft_delay,
				"args0" : [ {
					"type" : "field_number",
					"name" : "delay",
					"value" : 0,
					"min" : 1,
					"max" : 1000,
					"precision" : 1
				}, {
					"type" : "input_value",
					"name" : "singleblock",
					"check" : [ "Material" ]
				} ],
				"output" : "Material",
				"colour" : 90,
				"tooltip" : "",
				"helpUrl" : ""
			});
		}
	};
	

Blockly.Blocks['minecraft_delay_var'] = {
		init : function() {
			this.jsonInit({
				  "type": "minecraft_delay_var",
				  "message0" : Blockly.Msg.MC_cmd_minecraft_delay,
				  "args0": [
				    {
				      "type": "field_variable",
				      "name": "delay",
				      "variable": "num"
				    },
				    {
				      "type": "input_value",
				      "name": "singleblock",
						"check" : [ "Material" ]
				    }
				  ],
				  "output": "Material",
				  "colour": 90,
				  "tooltip": "",
				  "helpUrl": ""
				});
		}
	};
	
	
	
Blockly.Blocks['minecraft_delay_random'] = {
		init : function() {
			this.jsonInit({
				"type" : "minecraft_delay_random",
				"message0" : Blockly.Msg.MC_cmd_minecraft_delay_random,
				"args0" : [ {
					"type" : "field_number",
					"name" : "min",
					"value" : 0,
					"min" : 1,
					"max" : 1000,
					"precision" : 1
				},{
					"type" : "field_number",
					"name" : "max",
					"value" : 0,
					"min" : 1,
					"max" : 1000,
					"precision" : 1
				}, {
					"type" : "input_value",
					"name" : "singleblock",
					"check" : [ "Material" ]
				} ],
				"output" : "Material",
				"colour" : 90,
				"tooltip" : "",
				"helpUrl" : ""
			});
		}
	};

Blockly.Blocks['minecraft_delay_random_var'] = {
		init : function() {
			this.jsonInit({
				"type" : "minecraft_delay_random_var",
				"message0" : Blockly.Msg.MC_cmd_minecraft_delay_random,
				"args0" : [ {
				      "type": "field_variable",
				      "name": "min",
				      "variable": "min"
				},{
				      "type": "field_variable",
				      "name": "max",
				      "variable": "max"
				}, {
					"type" : "input_value",
					"name" : "singleblock",
					"check" : [ "Material" ]
				} ],
				"output" : "Material",
				"colour" : 90,
				"tooltip" : "",
				"helpUrl" : ""
			});
		}
	};






Blockly.Blocks['minecraft_gotopos'] = {
		init : function() {
			this.jsonInit({
				  "type": "minecraft_gotopos",
				  "message0": eval('Blockly.Msg.MC_cmd_minecraft_gotopos'+'_'+GLOBAL_MESSAGE_VERSION),
				  
				  "args0": [
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "field_dropdown",
				      "name": "coordSystem",
				      "options": [
				        [
				          "x, y, z",
				          "CARTESIAN"
				        ],
				        [
					          "r, theta, z",
					          "CYLINDRICAL"
					        ],
				        [
					          "r, theta, phi",
					          "SPHERICAL"
					        ]
				      ]
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_value",
				      "name": "x",
				      "check": "Number"
				    },
				    {
				      "type": "input_value",
				      "name": "y",
				      "check": "Number"
				    },
				    {
				      "type": "input_value",
				      "name": "z",
				      "check": "Number"
				    }
				  ],
				  "inputsInline": true,
				  "previousStatement": null,
				  "nextStatement": null,
				  "colour": 230,
				  "tooltip": "put a number or a variable for the coordinates x,y,z",
				  "helpUrl": ""
				});
		}
	};



Blockly.Blocks['minecraft_polygon'] = {
		init : function() {
			this.jsonInit({
				  "type": "minecraft_polygon",
				  "message0": Blockly.Msg.MC_cmd_minecraft_polygon,
				  "args0": [
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "field_dropdown",
				      "name": "fill",
				      "options": [
				        [
				        	Blockly.Msg.MC_cmd_empty,
				          "false"
				        ],
				        [
				        	Blockly.Msg.MC_cmd_full,
				          "true"
				        ]
				      ]
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_value",
				      "name": "nr_sides",
				      "check": "Number"
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_value",
				      "name": "sideLength",
				      "check": "Number"
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_value",
				      "name": "NAME",
						"check" : [ "Material" ]
				    }
				  ],
				  "inputsInline": true,
				  "previousStatement": null,
				  "nextStatement": null,
				  "colour": 120,
				  "tooltip": "",
				  "helpUrl": ""
				});
		}
	};

Blockly.Blocks['minecraft_star'] = {
		init : function() {
			this.jsonInit({
				  "type": "minecraft_star",
				  "message0": Blockly.Msg.MC_cmd_minecraft_star,
				  "args0": [
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "field_dropdown",
				      "name": "fill",
				      "options": [
				        [
				        	Blockly.Msg.MC_cmd_empty,
				          "false"
				        ],
				        [
				        	Blockly.Msg.MC_cmd_full,
				          "true"
				        ]
				      ]
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_value",
				      "name": "nr_sides",
				      "check": "Number"
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_value",
				      "name": "innerRadius",
				      "check": "Number"
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_value",
				      "name": "outerRadius",
				      "check": "Number"
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_value",
				      "name": "NAME",
						"check" : [ "Material" ]
				    }
				  ],
				  "inputsInline": true,
				  "previousStatement": null,
				  "nextStatement": null,
				  "colour": 120,
				  "tooltip": "",
				  "helpUrl": ""
				});
		}
	};




Blockly.Blocks['minecraft_rectangle'] = {
			init : function() {
				this.jsonInit({
					  "type": "minecraft_rectangle",
					  "message0": Blockly.Msg.MC_cmd_minecraft_rectangle,
					  "args0": [
					    {
					      "type": "input_dummy"
					    },
					    {
					      "type": "field_dropdown",
					      "name": "fill",
					      "options": [
					        [
					        	Blockly.Msg.MC_cmd_empty,
					          "false"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_full,
					          "true"
					        ]
					      ]
					    },
					    {
					      "type": "input_dummy"
					    },
					    {
					      "type": "input_dummy"
					    },
					    {
					      "type": "input_value",
					      "name": "width",
					      "check": "Number"
					    },
					    {
					      "type": "input_dummy"
					    },
					    {
					      "type": "input_value",
					      "name": "height",
					      "check": "Number"
					    },
					    {
					      "type": "input_dummy"
					    },
					    {
					      "type": "input_value",
					      "name": "NAME",
							"check" : [ "Material" ]
					    }
					  ],
					  "inputsInline": true,
					  "previousStatement": null,
					  "nextStatement": null,
					  "colour": 120,
					  "tooltip": "",
					  "helpUrl": ""
					});
			}
		};

Blockly.Blocks['minecraft_ellipse'] = {
		init : function() {
			this.jsonInit({
				  "type": "minecraft_ellipse",
				  "message0": Blockly.Msg.MC_cmd_minecraft_ellipse,
				  "args0": [
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "field_dropdown",
				      "name": "fill",
				      "options": [
				        [
				        	Blockly.Msg.MC_cmd_empty,
				          "false"
				        ],
				        [
				        	Blockly.Msg.MC_cmd_full,
				          "true"
				        ]
				      ]
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_value",
				      "name": "width",
				      "check": "Number"
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_value",
				      "name": "height",
				      "check": "Number"
				    },
				    {
				      "type": "input_dummy"
				    },
				    {
				      "type": "input_value",
				      "name": "NAME",
						"check" : [ "Material" ]
				    }
				  ],
				  "inputsInline": true,
				  "previousStatement": null,
				  "nextStatement": null,
				  "colour": 120,
				  "tooltip": "",
				  "helpUrl": ""
				});
		}
	};



Blockly.Blocks['minecraft_sensing'] = {
		init : function() {
			this.jsonInit({
				  "type": "minecraft_sensing",
				  "message0": eval('Blockly.Msg.MC_cmd_minecraft_sensing'+'_'+GLOBAL_MESSAGE_VERSION),
				  "args0": [
				    {
				      "type": "input_value",
				      "name": "NAME",
						"check" : [ "Material" ]
				    }
				  ],
					"output" : "Boolean",
					"inputsInline": false,
					"colour" : 65,
					"tooltip" : "",
					"helpUrl" : ""
				});
		}
	};



Blockly.Blocks['minecraft_block'] = {
		init : function() {
			this.jsonInit({
				  "type": "minecraft_block",
				  "message0": Blockly.Msg.MC_cmd_minecraft_block,
				  "args0": [
				    {
				      "type": "input_value",
				      "name": "NAME",
						"check" : [ "Material" ]
				    }
				  ],
				  "inputsInline": false,
				  "previousStatement": null,
				  "nextStatement": null,
				  "colour": 120,
				  "tooltip": "",
				  "helpUrl": ""
				});
		}
	};


Blockly.Blocks['minecraft_line'] = {
	init : function() {
		this.jsonInit({
			  "type": "minecraft_line",
			  "message0": Blockly.Msg.MC_cmd_minecraft_line,
			  "args0": [
			    {
			      "type": "input_dummy"
			    },
			    {
			      "type": "input_value",
			      "name": "length",
			      "check": "Number"
			    },
			    {
			      "type": "input_dummy"
			    },
			    {
			      "type": "input_value",
			      "name": "NAME",
					"check" : [ "Material" ]
			    }
			  ],
			  "inputsInline": true,
			  "previousStatement": null,
			  "nextStatement": null,
			  "colour": 120,
			  "tooltip": "",
			  "helpUrl": ""
			});
	}
};

Blockly.Blocks['minecraft_connectPositions'] = {
		init : function() {
			this.jsonInit({
				  "type": "minecraft_connectPositions",
				  "message0": Blockly.Msg.MC_cmd_minecraft_connectPositions1+Blockly.Msg.MC_cmd_minecraft_connectPositions2,
				  "args0": [
				    {
				      "type": "input_value",
				      "name": "NAME",
						"check" : [ "Material" ]
				    }
				  ],
				  "inputsInline": true,
				  "previousStatement": null,
				  "nextStatement": null,
				  "colour": 120,
				  "tooltip": "",
				  "helpUrl": ""
				});
		}
	};



Blockly.Blocks['minecraft_holding'] = {
		init : function() {
			this.jsonInit({

				"type" : "minecraft_holding",
				"message0" : Blockly.Msg.MC_cmd_minecraft_holding,
				"args0" : [ {
					"type" : "input_value",
					"name" : "NAME",
					"check" : ["Material", "Item"]
				} ],
				"output" : "Boolean",
				"colour" : 65,
				"tooltip" : "",
				"helpUrl" : "http://www.example.com/"
			});
		}
	};

Blockly.Blocks['minecraft_playerHas'] = {
		init : function() {
			this.jsonInit({

				"type" : "minecraft_playerHas",
				"message0" : Blockly.Msg.MC_cmd_minecraft_playerHas,
				"args0" : [ {
					"type" : "input_value",
					"name" : "NAME",
					"check" : ["Material", "Item"]
				} ],
				"output" : "Boolean",
				"colour" : 65,
				"tooltip" : "",
				"helpUrl" : "http://www.example.com/"
			});
		}
	};


		


Blockly.Blocks['minecraft_splashpotion'] = {
  init: function() {
    this.jsonInit({
      "type": "minecraft_splashpotion",
      "message0": Blockly.Msg.i_splash_potion.toLowerCase() + " " + Blockly.Msg.MC_cmd_minecraft_splash_potion_function + " %1 %2",
      "args0": [
        {
		  "type": "field_input",
          "name": "functionName",
		  "text": ""
        },
        {
          "type": "input_value",
          "name": "name",
          "check": ["Item"]
        }
      ],
      "output": "Item",
      "colour": 30,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};


Blockly.Blocks['minecraft_sign'] = {
		init : function() {
			this.jsonInit({
				  "type": "minecraft_sign",
				  "message0": Blockly.Msg.i_sign.toLowerCase()+" "+Blockly.Msg.MC_cmd_minecraft_sign_with_text+" %1 %2",
				  "args0": [
				    {
				        "type": "field_variable",
				        "name": "varName",
				        "variable": "text"				    
				    },
				    {
				      "type": "input_value",
				      "name": "name",
						"check" : [ "Material" ]
				    }
				  ],
				  "output": "Material",
				  "colour": 285,
				  "tooltip": "",
				  "helpUrl": ""
				});
		}
	};

Blockly.Blocks['minecraft_sign_textfield'] = {
		init : function() {
			this.jsonInit({
				  "type": "minecraft_sign_textfield",
				  "message0": Blockly.Msg.i_sign.toLowerCase()+" "+Blockly.Msg.MC_cmd_minecraft_sign_with_text+" %1 %2",
				  "args0": [
				    {
				      "type": "field_input",
				      "name": "displayText",
				      "text": ""
				    },
				    {
				      "type": "input_value",
				      "name": "name",
						"check" : [ "Material" ]
				    }
				  ],
				  "output": "Material",
				  "colour": 285,
				  "tooltip": "",
				  "helpUrl": ""
				});
		}
	};


Blockly.Blocks['minecraft_hitting'] = {
	init : function() {
		this.jsonInit({
			"type" : "minecraft_hitting",
			"message0" : Blockly.Msg.MC_cmd_minecraft_hitting,
			"args0" : [ {
				"type" : "input_value",
				"name" : "NAME",
				"check" : [ "Material" ]
			} ],
			"output" : "Boolean",
			"colour" : 65,
			"tooltip" : "",
			"helpUrl" : "http://www.example.com/"
		});
	}
};


Blockly.Blocks['minecraft_team'] = {
		init : function() {
			this.jsonInit({
				"type" : "minecraft_team",
				"message0" : "%1 %2",
				"args0" : [ {
					"type" : "field_dropdown",
					"name" : "NAME",
					"options" : [ [ Blockly.Msg.MC_cmd_friendly_ver1, "FRIENDLY" ], [ Blockly.Msg.MC_cmd_enemy, "ENEMY" ] ]
				}, {
					"type" : "input_value",
					"name" : "singleblock",
					"check" : [ "Material" ]
				} ],
				"output" : "Material",
				"colour" : 180,
				"tooltip" : "",
				"helpUrl" : ""
			});
		}
	};


Blockly.Blocks['minecraft_team_ver2'] = {
		init : function() {
			this.jsonInit({
				"type" : "minecraft_team",
				"message0" : Blockly.Msg.MC_cmd_friendly_ver2,
				"args0" : [ {
					"type" : "input_value",
					"name" : "singleblock",
					"check" : [ "Material" ]
				} ],
				"output" : "Material",
				"colour" : 180,
				"tooltip" : "",
				"helpUrl" : ""
			});
		}
	};





		
	
	Blockly.Blocks['minecraft_leash'] = {
		init : function() {
			this.jsonInit({
				"type" : "minecraft_leash",
				"message0" : '%1 %2',
				"args0" : [ {
					"type" : "field_dropdown",
					"name" : "NAME",
					 "options": [
					        [
					        	Blockly.Msg.MC_cmd_player,
					          "MYSELF"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_mob,
					          "CREATED_MOB"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_mob_owner,
					          "OWNER_CREATED_MOB"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_nobody,
					          "NOBODY"
					        ]
					   ]
				}, {
					"type" : "input_value",
					"name" : "singleblock",
					"check" : [ "Material" ]
				} ],
				"output" : "Material",
				"colour" : 180,
				"tooltip" : "",
				"helpUrl" : ""
			});
		}
	};
	

Blockly.Blocks['minecraft_direction'] = {
		init : function() {
			this.jsonInit({
				"type" : "minecraft_direction",
				"message0" : '%1%2',
				"args0" : [ {
					"type" : "field_dropdown",
					"name" : "NAME",
					 "options": [
					        [
					        	Blockly.Msg.MC_cmd_facing_left,
					          "LEFT"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_facing_right,
					          "RIGHT"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_facing_forward,
					          "FW"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_facing_backwards,
					          "BW"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_facing_up,
					          "UP"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_facing_down,
					          "DOWN"
					        ]
					   ]
				}, {
					"type" : "input_value",
					"name" : "singleblock",
					"check" : [ "Material" ]
				} ],
				"output" : "Material",
				"colour" : 330,
				"tooltip" : "",
				"helpUrl" : ""
			});
		}
	};
Blockly.Blocks['minecraft_upper_lower_part'] = {
		init : function() {
			this.jsonInit({
				"type" : "minecraft_upper_lower_part",
				"message0" : '%1 %2',
				"args0" : [ {
					"type" : "field_dropdown",
					"name" : "NAME",
					 "options": [
					        [
					        	Blockly.Msg.MC_cmd_side_up,
					          "UP"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_side_down,
					          "DOWN"
					        ]
					   ]
				}, {
					"type" : "input_value",
					"name" : "singleblock",
					"check" : [ "Material" ]
				} ],
				"output" : "Material",
				"colour" : 330,
				"tooltip" : "",
				"helpUrl" : ""
			});
		}
	};

Blockly.Blocks['minecraft_on_the_ground'] = {
		init : function() {
			this.jsonInit({
				"type" : "minecraft_on_the_ground",
				"message0" : Blockly.Msg.MC_cmd_ground,
				"args0" : [ {
					"type" : "input_value",
					"name" : "singleblock",
					"check" : [ "Material" ]
				} ],
				"output" : "Material",
				"colour" : 330,
				"tooltip" : "",
				"helpUrl" : ""
			});
		}
	};

Blockly.Blocks['minecraft_baby'] = {
		init : function() {
			this.jsonInit({
				"type" : "minecraft_baby",
				"message0" : Blockly.Msg.MC_cmd_baby,
				"args0" : [ {
					"type" : "input_value",
					"name" : "singleblock",
					"check" : [ "Material" ]
				} ],
				"output" : "Material",
				"colour" : 180,
				"tooltip" : "",
				"helpUrl" : ""
			});
		}
	};

Blockly.Blocks['minecraft_move_to_view_target'] = {
		init : function() {
			this.jsonInit( 	
						{
						  "type": "minecraft_move_to_view_target",
						  "message0": '%1',						  
						  "args0": [
							    {
							      "type": "field_dropdown",
							      "name": "viewer",
							      "options": [
							        [
							        	eval('Blockly.Msg.MC_cmd_minecraft_option_start_position'+'_'+GLOBAL_MESSAGE_VERSION),
							          "START_POS"
							        ],
							        [
							        	eval('Blockly.Msg.MC_cmd_minecraft_move_to_view_target'+'_'+GLOBAL_MESSAGE_VERSION),	
							          "ROBOT_EYES"
							        ],
							        [
										eval('Blockly.Msg.MC_cmd_minecraft_move_to_position_player'+'_'+GLOBAL_MESSAGE_VERSION),
							          "PLAYER_POS"
							        ],
							        [
							        	eval('Blockly.Msg.MC_cmd_minecraft_move_to_view_player'+'_'+GLOBAL_MESSAGE_VERSION),	
							          "PLAYER_EYES"
							        ],
							        
							        [
							        	eval('Blockly.Msg.MC_cmd_minecraft_option_lastmarked_position'+'_'+GLOBAL_MESSAGE_VERSION),
							          "MARKED_POS"
							        ]
								      
							        
							      ]
							    }
							  ],						  
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 180,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};



Blockly.Blocks['minecraft_move'] = {
		init : function() {
			this.jsonInit( 	
					{
					  "type": "minecraft_move",
					  "message0": eval('Blockly.Msg.MC_cmd_minecraft_move'+'_'+GLOBAL_MESSAGE_VERSION),
					  "args0": [
					    {
					      "type": "input_value",
					      "name": "times",
					      "check": "Number"
					    },
					    {
					      "type": "field_dropdown",
					      "name": "direction",
					      "options": [
					        [
					        	Blockly.Msg.MC_cmd_move_up,
					          "UP"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_move_down,
					          "DOWN"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_move_left,
					          "LEFT"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_move_right,
					          "RIGHT"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_move_forward,
					          "FW"
					        ],
					        [
					        	Blockly.Msg.MC_cmd_move_backwards,
					          "BW"
					        ]
					      ]
					    }
					  ],
					  "inputsInline": true,
					  "previousStatement": null,
					  "nextStatement": null,
					  "colour": 230,
					  "tooltip": "",
					  "helpUrl": ""
					});
		}
	};


Blockly.Blocks['minecraft_rotate'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_rotate",
						  "message0": eval('Blockly.Msg.MC_cmd_minecraft_rotate'+'_'+GLOBAL_MESSAGE_VERSION),
						  "args0": [
						    {
						      "type": "input_value",
						      "name": "angle",
						      "check": "Number"
						    }
						  ],
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 60,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};

Blockly.Blocks['minecraft_setrotation'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_setrotation",
						  "message0": '%1',
						  "args0": [
						    {
						      "type": "field_dropdown",
						      "name": "angle",
						      "options": [
						        [
									eval('Blockly.Msg.MC_cmd_south'+'_'+GLOBAL_MESSAGE_VERSION),
						          "SOUTH"
						        ],
						        [
									eval('Blockly.Msg.MC_cmd_north'+'_'+GLOBAL_MESSAGE_VERSION),
						          "NORTH"
						        ],
						        [
									eval('Blockly.Msg.MC_cmd_east'+'_'+GLOBAL_MESSAGE_VERSION),
						          "EAST"
						        ],
						        [
									eval('Blockly.Msg.MC_cmd_west'+'_'+GLOBAL_MESSAGE_VERSION),
						          "WEST"
						        ],
						        [
						        	eval('Blockly.Msg.MC_cmd_whereLook'+'_'+GLOBAL_MESSAGE_VERSION),
						          "SAME_AS_PLAYER"
						        ]
						      ]
						    }
						  ],
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 60,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};


Blockly.Blocks['minecraft_set_elevation'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_set_elevation",
						  "message0": eval('Blockly.Msg.MC_cmd_minecraft_set_elevation'+'_'+GLOBAL_MESSAGE_VERSION),
						  "args0": [
						    {
						      "type": "input_value",
						      "name": "angle",
						      "check": "Number"
						    }
						  ],
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 90,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};

Blockly.Blocks['minecraft_set_elevation_relative'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_set_elevation",
						  "message0": eval('Blockly.Msg.MC_cmd_minecraft_set_elevation_relative'+'_'+GLOBAL_MESSAGE_VERSION),
						  "args0": [
						    {
						      "type": "input_value",
						      "name": "angle",
						      "check": "Number"
						    }
						  ],
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 90,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};


Blockly.Blocks['minecraft_addevent'] = {
  init: function() {
    this.jsonInit({
      "type": "minecraft_addevent",
      "message0": '%1%2',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "eventType",
          "options": [
            [Blockly.Msg.MC_cmd_HITTING_ENTITY_EVENT, "HITTING_ENTITY_EVENT"],
            [Blockly.Msg.MC_cmd_HIT_BY_ENTITY_EVENT, "HIT_BY_ENTITY_EVENT"],
            [Blockly.Msg.MC_cmd_DIED_EVENT, "DIED_EVENT"],
            [Blockly.Msg.MC_cmd_DAMAGING_BLOCK_EVENT, "DAMAGING_BLOCK_EVENT"],
            [Blockly.Msg.MC_cmd_LEFT_CLICK_AIR_EVENT, "LEFT_CLICK_AIR"],
            [Blockly.Msg.MC_cmd_RIGHT_CLICK_AIR_EVENT, "RIGHT_CLICK_AIR"],
            [Blockly.Msg.MC_cmd_MOVED_EVENT, "MOVED_EVENT"]
          ]
        },
        {
	      "type": "input_value",
	      "name": "functionName",
	      "check": "String"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 160,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};



Blockly.Blocks['minecraft_comment'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_comment",
						  "message0": "# %1",
						  "args0": [
						    {
						      "type": "field_input",
						      "name": "comment",
						      "text": "comment"
						    }
						  ],
						  "inputsInline": true,
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 300,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};


Blockly.Blocks['minecraft_givetoplayer'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_givetoplayer",
						  "message0": Blockly.Msg.MC_cmd_minecraft_giveme,
						  "args0": [
						    {
						      "type": "input_value",
						      "name": "NAME",
						      "check": ["Item"]
						    }
						  ],
						  "inputsInline": true,
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 120,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};
	
Blockly.Blocks['minecraft_equipplayer'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_equipplayer",
						  "message0": Blockly.Msg.MC_cmd_minecraft_equipme,
						  "args0": [
						    {
						      "type": "input_value",
						      "name": "NAME",
						      "check": ["Item"]
						    }
						  ],
						  "inputsInline": true,
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 120,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};
	
Blockly.Blocks['minecraft_putinhand'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_putinhand",
						  "message0": '%1%2',
						  "args0": [
						    {
						      "type": "field_dropdown",
						      "name": "hand",
						      "options": [
							        [
							        	Blockly.Msg.MC_cmd_right_hand,
							          "RIGHT_HAND"
							        ],
							        [
							        	Blockly.Msg.MC_cmd_left_hand,
							          "LEFT_HAND"
							        ]
						      ]
						    },
						    {
						      "type": "input_value",
						      "name": "NAME",
						      "check": ["Item"]
						    }
						  ],
						  "inputsInline": true,
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 120,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};


Blockly.Blocks['minecraft_createchest'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_createchest",
						  "message0": Blockly.Msg.MC_cmd_minecraft_createchest,
						  "args0": [
						    {
						      "type": "input_value",
						      "name": "NAME",
						      "check": ["Item"]
						    }
						  ],
						  "inputsInline": true,
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 120,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};

Blockly.Blocks['minecraft_text'] = {
  init: function () {
    this.jsonInit({
      "type": "minecraft_text",
      "message0": Blockly.Msg.MC_cmd_minecraft_writetext,
      "args0": [
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "inputText",
          "check": ["String", "Number"]
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "fontPoints",
          "check": "Number"
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "field_dropdown",
          "name": "fill",
          "options": [
            [
              Blockly.Msg.MC_cmd_full,
              "false"
            ],
            [
              Blockly.Msg.MC_cmd_empty,
              "true"
            ]
          ]
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "NAME",
          "check": ["Material"]
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};


Blockly.Blocks['minecraft_mark'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_mark",
						  "message0": eval('Blockly.Msg.MC_cmd_minecraft_mark_position'+'_'+GLOBAL_MESSAGE_VERSION),
						  "inputsInline": true,
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 180,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};

Blockly.Blocks['minecraft_gotomark'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_gotomark",
						  "message0": '%1 %2',
						  "args0": [
						    {
						      "type": "input_dummy"
						    },
						    {
						      "type": "field_dropdown",
						      "name": "origin",
						      "options": [
						        [
						        	Blockly.Msg.MC_cmd_minecraft_option_reset_start_position_ver1,
						          "START_POS"
						        ],
						        [
						        	Blockly.Msg.MC_cmd_minecraft_option_reset_lastmarked_position_ver1,
						          "MARKED_POS"
						        ]
						      ]
						    }
						  ],
						  "inputsInline": true,
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 180,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};
	
	
	
Blockly.Blocks['minecraft_drawing_version2'] = {
  init: function() {
    this.appendValueInput("matlist")
        .setCheck("Array")
        .appendField(Blockly.Msg.MC_cmd_minecraft_draw_version2);

    this.appendValueInput("index_material")
        .setCheck("Number")
        .appendField(Blockly.Msg.MC_cmd_minecraft_draw_index);

    this.appendDummyInput("origin")
        .appendField(new Blockly.FieldDropdown([
          [Blockly.Msg.MC_cmd_minecraft_draw_from_center, "CENTER"],
          [Blockly.Msg.MC_cmd_minecraft_draw_from_bottomleft, "LEFT"]
        ]), "origin");

    // Initialize block with the first two draw choices.
    this.appendValueInput("blockchoice0")
		.setCheck([ "Material", "Array" ])
        .appendField(new Blockly.FieldImage("drawcol_icons/drawcol0.jpg", 15, 15, "*"))
        .appendField("0");

    this.appendValueInput("blockchoice1")
		.setCheck([ "Material", "Array" ])
        .appendField(new Blockly.FieldImage("drawcol_icons/drawcol1.jpg", 15, 15, "*"))
        .appendField("1");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
	this.setInputsInline(false);


    this.extraChoiceCount = 2; // Start with two draw choices visible.
    this.registerKeyboardEvents_(); // Register keyboard events.
  },

  // Persist the number of extra draw choices.
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('extra_choice_count', this.extraChoiceCount);
    return container;
  },

  // Restore the number of extra draw choices.
  domToMutation: function(xmlElement) {
    this.extraChoiceCount = parseInt(xmlElement.getAttribute('extra_choice_count'), 10);
    this.updateShape_();
  },

  getCode : function(i) {
		if(i>=10){
			var iChar=String.fromCharCode("z".charCodeAt(0)-i+10);
			return iChar
		} else return(""+i)
  },

  // Add or remove inputs based on the number of choices.
  updateShape_: function() {
    // Remove all extra draw choices.
    for (var i = 2; i < 20; i++) {
     if (this.getInput("blockchoice" + this.getCode(i))) {
        this.removeInput("blockchoice" + this.getCode(i));
      }
    }

    // Add only the extra choices that are currently needed.
    for (var i = 2; i < this.extraChoiceCount; i++) {
    this.appendValueInput("blockchoice" + this.getCode(i))
		.setCheck([ "Material", "Array" ])
        .appendField(new Blockly.FieldImage("drawcol_icons/drawcol" + this.getCode(i) + ".jpg", 15, 15, "*"))
        .appendField(this.getCode(i));

    }
  },

  // Register 'i' keypress event for this block.
  registerKeyboardEvents_: function() {
    var self = this;
    Blockly.bindEventWithChecks_(document, 'keydown', null, function(event) {
      if (event.key === 'i' && Blockly.selected === self) {
        if (self.extraChoiceCount < 20) {
          self.extraChoiceCount++;
          self.updateShape_();
        }
      }
    });
  }
};



Blockly.Blocks['minecraft_drawing'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_drawing",
						  "message0": Blockly.Msg.MC_cmd_minecraft_draw,
						  "args0": [
							  
						    {
						      "type": "input_value",
						      "name": "matlist",
						      "check": "Array"
						    },
						    {
						        "type": "field_image",
						        "src": "drawcol_icons/drawcol0.jpg",
						        "width": 15,
						        "height": 15,
						        "alt": "*",
						        "flipRtl": false
						    },
						    {
						      "type": "input_value",
						      "name": "blockchoice0",
						      
								"check" : [ "Material", "Array" ]
						    },
						    {
						        "type": "field_image",
						        "src": "drawcol_icons/drawcol1.jpg",
						        "width": 15,
						        "height": 15,
						        "alt": "*",
						        "flipRtl": false
							    },
							    {
							      "type": "input_value",
							      "name": "blockchoice1",
									"check" : [ "Material", "Array" ]
						    },

						    {
						        "type": "field_image",
						        "src": "drawcol_icons/drawcol2.jpg",
						        "width": 15,
						        "height": 15,
						        "alt": "*",
						        "flipRtl": false
						    },
						    {
						      "type": "input_value",
						      "name": "blockchoice2",
								"check" : [ "Material", "Array" ]
						    },
						    {
						        "type": "field_image",
						        "src": "drawcol_icons/drawcol3.jpg",
						        "width": 15,
						        "height": 15,
						        "alt": "*",
						        "flipRtl": false
						    },
						    {
						      "type": "input_value",
						      "name": "blockchoice3",
								"check" : [ "Material", "Array" ]
						    },
						    {
						        "type": "field_image",
						        "src": "drawcol_icons/drawcol4.jpg",
						        "width": 15,
						        "height": 15,
						        "alt": "*",
						        "flipRtl": false
						    },
						    {
						      "type": "input_value",
						      "name": "blockchoice4",
								"check" : [ "Material", "Array" ]
						    },
						    {
						        "type": "field_image",
						        "src": "drawcol_icons/drawcol5.jpg",
						        "width": 15,
						        "height": 15,
						        "alt": "*",
						        "flipRtl": false
						    },
						    {
						      "type": "input_value",
						      "name": "blockchoice5",
								"check" : [ "Material", "Array" ]
						    },
						    {
						        "type": "field_image",
						        "src": "drawcol_icons/drawcol6.jpg",
						        "width": 15,
						        "height": 15,
						        "alt": "*",
						        "flipRtl": false
							    },
							    {
							      "type": "input_value",
							      "name": "blockchoice6",
									"check" : [ "Material", "Array" ]
							    },
							    {
							        "type": "field_image",
							        "src": "drawcol_icons/drawcol7.jpg",
							        "width": 15,
							        "height": 15,
							        "alt": "*",
							        "flipRtl": false
								    },
								    {
								      "type": "input_value",
								      "name": "blockchoice7",
										"check" : [ "Material", "Array" ]
								    },
								    {
								        "type": "field_image",
								        "src": "drawcol_icons/drawcol8.jpg",
								        "width": 15,
								        "height": 15,
								        "alt": "*",
								        "flipRtl": false
									    },
									    {
									      "type": "input_value",
									      "name": "blockchoice8",
											"check" : [ "Material", "Array" ]
									    },
									    {
									        "type": "field_image",
									        "src": "drawcol_icons/drawcol9.jpg",
									        "width": 15,
									        "height": 15,
									        "alt": "*",
									        "flipRtl": false
										    },
										    {
										      "type": "input_value",
										      "name": "blockchoice9",
										      "check": [
										    	  "Material" ]
										    },
										    {
											      "type": "input_value",
											      "name": "index_material",
											      "check": "Number"
											    },
											    						    
						    {
						      "type": "field_dropdown",
						      "name": "origin",
						      "options": [
						        [
						        	Blockly.Msg.MC_cmd_minecraft_draw_from_center,
						          "CENTER"
						        ],
						        [
						        	Blockly.Msg.MC_cmd_minecraft_draw_from_bottomleft,
						          "LEFT"
						        ]
						      ]
						    }
											    
						  ],
						  "inputsInline": false,
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 230,
						  "tooltip": "",
						  "helpUrl": ""
						}
);
		}
	};




Blockly.Blocks['m_draw_0'] = {
		init : function() {
			this.jsonInit( 	
			{
			  "type": "m_draw_0",
			  "message0": " %1",
			  "args0": [{"type": "input_value", "name": "child", "check" : [ "drawPixel" ]}],
			  "output": "drawPixel",
			  "colour": getColorForDrawCol('0'), // defined in code.js
			  "tooltip": "",
			  "helpUrl": "",
			});this.setMovable(false); this.customContextMenu = function(options) { addCustomContextMenuToDrawingBlocks(this, options);};
			
		}
	};

Blockly.Blocks['m_draw_1'] = {
	init : function() {
		this.jsonInit( 	
		{
		  "type": "m_draw_1",
		  "message0": " %1",
		  "args0": [{"type": "input_value", "name": "child", "check" : [ "drawPixel" ]}],
		  "output": "drawPixel",
		  "colour": getColorForDrawCol('1'), // defined in code.js
		  "tooltip": "",
		  "helpUrl": ""
		});this.setMovable(false); this.customContextMenu = function(options) { addCustomContextMenuToDrawingBlocks(this, options);};
	}
};

Blockly.Blocks['m_draw_2'] = {
		init : function() {
			this.jsonInit( 	
			{
			  "type": "m_draw_2",
			  "message0": " %1",
			  "args0": [{"type": "input_value", "name": "child", "check" : [ "drawPixel" ]}],
			  "output": "drawPixel",
			  "colour": getColorForDrawCol('2'), // defined in code.js
			  "tooltip": "",
			  "helpUrl": ""
			});this.setMovable(false); this.customContextMenu = function(options) { addCustomContextMenuToDrawingBlocks(this, options);};
		}
	};
Blockly.Blocks['m_draw_3'] = {
		init : function() {
			this.jsonInit( 	
			{
			  "type": "m_draw_3",
			  "message0": " %1",
			  "args0": [{"type": "input_value", "name": "child", "check" : [ "drawPixel" ]}],
			  "output": "drawPixel",
			  "colour": getColorForDrawCol('3'), // defined in code.js
			  "tooltip": "",
			  "helpUrl": ""
			});this.setMovable(false); this.customContextMenu = function(options) { addCustomContextMenuToDrawingBlocks(this, options);};
		}
	};
Blockly.Blocks['m_draw_4'] = {
		init : function() {
			this.jsonInit( 	
			{
			  "type": "m_draw_4",
			  "message0": " %1",
			  "args0": [{"type": "input_value", "name": "child", "check" : [ "drawPixel" ]}],
			  "output": "drawPixel",
			  "colour": getColorForDrawCol('4'), // defined in code.js
			  "tooltip": "",
			  "helpUrl": ""
			});this.setMovable(false); this.customContextMenu = function(options) { addCustomContextMenuToDrawingBlocks(this, options);};
		}
	};
Blockly.Blocks['m_draw_5'] = {
		init : function() {
			this.jsonInit( 	
			{
			  "type": "m_draw_5",
			  "message0": " %1",
			  "args0": [{"type": "input_value", "name": "child", "check" : [ "drawPixel" ]}],
			  "output": "drawPixel",
			  "colour": getColorForDrawCol('5'), // defined in code.js
			  "tooltip": "",
			  "helpUrl": ""
			});this.setMovable(false); this.customContextMenu = function(options) { addCustomContextMenuToDrawingBlocks(this, options);};
		}
	};
Blockly.Blocks['m_draw_6'] = {
		init : function() {
			this.jsonInit( 	
			{
			  "type": "m_draw_6",
			  "message0": " %1",
			  "args0": [{"type": "input_value", "name": "child", "check" : [ "drawPixel" ]}],
			  "output": "drawPixel",
			  "colour": getColorForDrawCol('6'), // defined in code.js
			  "tooltip": "",
			  "helpUrl": ""
			});this.setMovable(false); this.customContextMenu = function(options) { addCustomContextMenuToDrawingBlocks(this, options);};
		}
	};
Blockly.Blocks['m_draw_7'] = {
		init : function() {
			this.jsonInit( 	
			{
			  "type": "m_draw_7",
			  "message0": " %1",
			  "args0": [{"type": "input_value", "name": "child", "check" : [ "drawPixel" ]}],
			  "output": "drawPixel",
			  "colour": getColorForDrawCol('7'), // defined in code.js
			  "tooltip": "",
			  "helpUrl": ""
			});this.setMovable(false); this.customContextMenu = function(options) { addCustomContextMenuToDrawingBlocks(this, options);};
		}
	};
Blockly.Blocks['m_draw_8'] = {
		init : function() {
			this.jsonInit( 	
			{
			  "type": "m_draw_8",
			  "message0": " %1",
			  "args0": [{"type": "input_value", "name": "child", "check" : [ "drawPixel" ]}],
			  "output": "drawPixel",
			  "colour": getColorForDrawCol('8'), // defined in code.js
			  "tooltip": "",
			  "helpUrl": ""
			});this.setMovable(false); this.customContextMenu = function(options) { addCustomContextMenuToDrawingBlocks(this, options);};
		}
	};
Blockly.Blocks['m_draw_9'] = {
		init : function() {
			this.jsonInit( 	
			{
			  "type": "m_draw_9",
			  "message0": " %1",
			  "args0": [{"type": "input_value", "name": "child", "check" : [ "drawPixel" ]}],
			  "output": "drawPixel",
			  "colour": getColorForDrawCol('9'), // defined in code.js
			  "tooltip": "",
			  "helpUrl": ""
			});this.setMovable(false); this.customContextMenu = function(options) { addCustomContextMenuToDrawingBlocks(this, options);};
		}
	};


Blockly.Blocks['minecraft_cancelEvents'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_cancelEvents",
						  "message0": Blockly.Msg.MC_cmd_minecraft_cancel_events,
						  "inputsInline": true,
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 180,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};
	

Blockly.Blocks['minecraft_executecommand'] = {
		init : function() {
			this.jsonInit( 	
					{
						  "type": "minecraft_executecommand",
						  "message0": Blockly.Msg.MC_cmd_minecraft_execute_command,
						  "args0": [
						    {
						      "type": "input_value",
						      "name": "fn"
						    },
						    {
						      "type": "input_value",
						      "name": "player"
						    },
						    {
						      "type": "input_value",
						      "name": "param1"
						    }
						  ],
						  "inputsInline": true,
						  "previousStatement": null,
						  "nextStatement": null,
						  "colour": 180,
						  "tooltip": "",
						  "helpUrl": ""
						});
		}
	};


Blockly.Blocks['minecraft_talking'] = {
		init : function() {
			this.jsonInit({
				  "type": "minecraft_talking",
				  "message0" : Blockly.Msg.MC_cmd_minecraft_talking,
				  "args0": [
				    {
				      "type": "field_variable",
				      "name": "text",
				      "variable": "text"
				    },
				    {
				      "type": "input_value",
				      "name": "singleblock",
						"check" : [ "Material" ]
				    }
				  ],
				  "output": "Material",
				  "colour": 180,
				  "tooltip": "",
				  "helpUrl": ""
				});
		}
	};


Blockly.Blocks['minecraft_materialNothing'] = {
		init : function() {
			this.jsonInit({
				  "type": "minecraft_materialNothing",
				  "message0": Blockly.Msg.MC_cmd_minecraft_nothing,
				  "args0": [
				    {
				      "type": "input_value",
				      "name": "singleblock",
					  "check" : [ "Material" ]
				    }
				  ],
				  "output": null,
				  "colour": 285,
				  "tooltip": "",
				  "helpUrl": ""
				});
		}
	};
	
	
	
Blockly.Blocks['shape_block'] = {
  init: function() {
    this.splitBlockLabel = Blockly.Msg.MC_cmd_minecraft_shape_start.split('%');
    //console.log(this.splitBlockLabel);
  
    // Add a dropdown for "empty" or "full" first
    this.appendDummyInput('START')
        .appendField(this.splitBlockLabel[0]);

    this.appendDummyInput('FILL_TYPE')
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MC_cmd_empty_shape, "EMPTY"], [Blockly.Msg.MC_cmd_full_shape, "FULL"]]), "FILL");

    // Define the dropdown field for shape selection
    this.appendDummyInput('SHAPE_INPUT')
        .appendField(new Blockly.FieldDropdown(
          [
            [Blockly.Msg.MC_cmd_minecraft_shape_square, "SQUARE"],
            [Blockly.Msg.MC_cmd_minecraft_shape_circle, "CIRCLE"],
            [Blockly.Msg.MC_cmd_minecraft_shape_block, "BLOCK"],
            [Blockly.Msg.MC_cmd_minecraft_shape_line, "LINE"],
            [Blockly.Msg.MC_cmd_minecraft_shape_connection, "CONNECTION"],
            [Blockly.Msg.MC_cmd_minecraft_shape_rectangle, "RECTANGLE"],
            [Blockly.Msg.MC_cmd_minecraft_shape_polygon, "POLYGON"],
            [Blockly.Msg.MC_cmd_minecraft_shape_ellipse, "ELLIPSE"],
            [Blockly.Msg.MC_cmd_minecraft_shape_arc, "ARC"],
            [Blockly.Msg.MC_cmd_minecraft_shape_star, "STAR"]
          ],
 
  
          function(newShape) {
            var block = this.getSourceBlock();
            block.updateShape_(newShape);
          }), "SHAPE");
          if(this.splitBlockLabel[1]>this.splitBlockLabel[2]){ //allow inverting the fill_type and shape fields if the string contains "%2%1" instead of "%1%2"
			this.moveInputBefore('SHAPE_INPUT', 'FILL_TYPE');
		  }
    

    // Add an initial input for the material
    this.appendValueInput('MATERIAL')
        .setCheck('Material')
        .appendField(this.splitBlockLabel[this.splitBlockLabel.length-1].slice(1))
        .setAlign(Blockly.ALIGN_RIGHT);

    // Set basic block properties
    this.setColour(120);
    this.setHelpUrl("");

    // Enable connection handles
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);

    // Initialize the shape to SQUARE by default
    this.updateShape_('SQUARE');
  },

  updateShape_: function(newShape) {
    // Safely remove previous shape-related inputs
    if (this.getInput('RADIUS')) {
      this.removeInput('RADIUS');
    }
    if (this.getInput('WIDTH')) {
      this.removeInput('WIDTH');
    }
    if (this.getInput('HEIGHT')) {
      this.removeInput('HEIGHT');
    }
    if (this.getInput('SIDES')) {
      this.removeInput('SIDES');
    }
    if (this.getInput('RADIUS1')) {
      this.removeInput('RADIUS1');
    }
    if (this.getInput('RADIUS2')) {
      this.removeInput('RADIUS2');
    }
    if (this.getInput('POINTS')) {
      this.removeInput('POINTS');
    }
    if (this.getInput('LENGTH')) {
      this.removeInput('LENGTH');
    }
    if (this.getInput('INNER_RADIUS')) {
      this.removeInput('INNER_RADIUS');
    }
    if (this.getInput('OUTER_RADIUS')) {
      this.removeInput('OUTER_RADIUS');
    }
	if (this.getInput('POLYGON_RADIUS')) {
	  this.removeInput('POLYGON_RADIUS');
	}
	if (this.getInput('ANGLE')) {
	  this.removeInput('ANGLE');
	}

    // Add inputs based on the selected shape
      this.getInput("FILL_TYPE").setVisible(true);   
      switch (newShape) {
      case "BLOCK":
       this.getInput("FILL_TYPE").setVisible(false);
       break;

      case "CIRCLE":
        this.appendValueInput('RADIUS')
            .setCheck('Number')
            .appendField(Blockly.Msg.MC_cmd_minecraft_shape_circle_param)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('RADIUS', 4);
        break;
      case "SQUARE":
        this.appendValueInput('WIDTH')
            .setCheck('Number')
            .appendField(Blockly.Msg.MC_cmd_minecraft_shape_square_param)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('WIDTH', 4);
        break;
      case "LINE":
       this.getInput("FILL_TYPE").setVisible(false);
       this.appendValueInput('LENGTH')
            .setCheck('Number')
            .appendField(Blockly.Msg.MC_cmd_minecraft_shape_line_param)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('LENGTH', 1);
        break;
      case "CONNECTION":
       this.getInput("FILL_TYPE").setVisible(false);
       break;

      case "RECTANGLE":
        this.splitBlockLabel = Blockly.Msg.MC_cmd_minecraft_shape_rectangle_param.split('%');
        this.appendValueInput('WIDTH')
            .setCheck('Number')
            .appendField(this.splitBlockLabel[0])
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('WIDTH', 4);
        
        this.appendValueInput('HEIGHT')
            .setCheck('Number')
            .appendField(this.splitBlockLabel[1].slice(1))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('HEIGHT', 4);
        break;
      case "POLYGON":
        this.splitBlockLabel = Blockly.Msg.MC_cmd_minecraft_shape_polygon_param.split('%');
        this.appendValueInput('SIDES')
            .setCheck('Number')
            .appendField(this.splitBlockLabel[0])
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('SIDES', 4); 
       this.appendValueInput('POLYGON_RADIUS')
            .setCheck('Number')
            .appendField(this.splitBlockLabel[1].slice(1))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('POLYGON_RADIUS', 4);        
        break;

      case "ELLIPSE":
        this.splitBlockLabel = Blockly.Msg.MC_cmd_minecraft_shape_ellipse_param.split('%');
        this.appendValueInput('RADIUS1')
            .setCheck('Number')
            .appendField(this.splitBlockLabel[0])
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('RADIUS1', 4);
        
        this.appendValueInput('RADIUS2')
            .setCheck('Number')
            .appendField(this.splitBlockLabel[1].slice(1))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('RADIUS2', 4);
           break;

      case "ARC":
        this.splitBlockLabel = Blockly.Msg.MC_cmd_minecraft_shape_arc_param.split('%');
        this.appendValueInput('RADIUS1')
            .setCheck('Number')
            .appendField(this.splitBlockLabel[0])
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('RADIUS1', 4);
        
        this.appendValueInput('RADIUS2')
            .setCheck('Number')
            .appendField(this.splitBlockLabel[1].slice(1))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('RADIUS2', 4);
        
        this.appendValueInput('ANGLE')
            .setCheck('Number')
            .appendField(this.splitBlockLabel[2].slice(1))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('ANGLE', 180);
           break;

      case "STAR":
        this.splitBlockLabel = Blockly.Msg.MC_cmd_minecraft_shape_star_param.split('%');
        this.appendValueInput('SIDES')
            .setCheck('Number')
            .appendField(this.splitBlockLabel[0])
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('SIDES', 5); // Default to 5 for a star
 
        this.appendValueInput('INNER_RADIUS')
            .setCheck('Number')
            .appendField(this.splitBlockLabel[1].slice(1))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('INNER_RADIUS', 4);
        this.appendValueInput('OUTER_RADIUS')
            .setCheck('Number')
            .appendField(this.splitBlockLabel[2].slice(1))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.createShadowBlock('OUTER_RADIUS', 11);

        break;
    }

    // Ensure inputs are inline
    this.setInputsInline(true);
    this.moveInputBefore('MATERIAL', null);
	this.moveInputBefore('FILL_TYPE', 'MATERIAL');
  },

  createShadowBlock: function(inputName, defaultValue) {
    var shadowBlock = this.workspace.newBlock('math_number');
    shadowBlock.setFieldValue(defaultValue, 'NUM');
    shadowBlock.setShadow(true);
    shadowBlock.initSvg();
    shadowBlock.render();
    this.getInput(inputName).connection.connect(shadowBlock.outputConnection);
  }
};
	

Blockly.Blocks['minecraft_materialbockOnlyOne'] = {
    init: function() {
         this.appendValueInput('singleblock')
            .setCheck("Material")
            .appendField(new FieldDropdownWithSearch(getMaterials()), 'NAME');
        this.setColour(285);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setOutput(true, "Material");
    }
};


Blockly.Blocks['minecraft_particleOnlyOne'] = {
    init: function() {
         this.appendValueInput('singleblock')
            .setCheck("Material") //
            .appendField(new FieldDropdownWithSearch(getParticles()), 'NAME'); //
        this.setColour(285); //
        this.setTooltip('');
        this.setHelpUrl('');
        this.setOutput(true, "Material");//
    }
};




Blockly.Blocks['minecraft_item'] = {
    init: function() {
         this.appendValueInput('singleblock')
            .setCheck("Item") //
            .appendField(new FieldDropdownWithSearch(getItems()), 'NAME'); //
        this.setColour(20); //
        this.setTooltip('');
        this.setHelpUrl('');
        this.setOutput(true, "Item");//
    }
};


Blockly.Blocks['minecraft_entity'] = {
    init: function() {
         this.appendValueInput('singleblock')
            .setCheck("Material") //
            .appendField(new FieldDropdownWithSearch(getEntities()), 'NAME'); //
        this.setColour(210); //
        this.setTooltip('');
        this.setHelpUrl('');
        this.setOutput(true, "Material");//
    }
};



// Define a loading ... placeholder for 'image_select'
Blockly.Blocks['image_select'] = {
		init : function() {
			this.jsonInit({
				  "type": "image_select",
				  "message0": 'Images not available %1',
				  "args0": [
				    {
				      "type": "input_value",
				      "name": "singleblock",
					  "check" : [ "Material" ]
				    }
				  ],
				  "output": null,
				  "colour": 285,
				  "tooltip": "",
				  "helpUrl": ""
				});
		}
	};
// Create an instance of the ImageSelectBlock class
var imageSelectBlock = new ImageSelectBlock();


// After data is loaded, redefine the block
imageSelectBlock.ensureDataLoaded(function() {
  Blockly.Blocks['image_select'] = {
    init: function() {
      this.appendValueInput('singleblock').setCheck([ "Material" ])
          .appendField(Blockly.Msg.MC_cmd_minecraft_customimage_ver2)
          .appendField(new Blockly.FieldDropdown(function() {
            return imageSelectBlock.getFirstMenuOptions();
          }), "FIRST_MENU")
          .appendField(new Blockly.FieldDropdown(function() {
            return imageSelectBlock.getSecondMenuOptions(this);
          }.bind(this)), "SECOND_MENU");
      this.setColour(330);
      this.setTooltip("Two dependent dropdowns");
      this.setHelpUrl("");

	    // Set the output on the left
	    this.setOutput(true, "Material"); // Ensure block outputs a value
      this.setOnChange(function(event) {
        imageSelectBlock.handleMenuInteraction(this, event);
      }.bind(this));
    }
  };

  // Wait for the toolbox to load, then refresh it
  if (Blockly.mainWorkspace && Blockly.mainWorkspace.toolbox_) {
    Blockly.mainWorkspace.updateToolbox();
  } else {
    // Fallback if toolbox is not ready yet
    setTimeout(function() {
      if (Blockly.mainWorkspace) {
        Blockly.mainWorkspace.updateToolbox();
      }
    }, 1000);
  }

});


Blockly.Blocks['minecraft_velocity'] = {
		init : function() {
			this.jsonInit({
				"type" : "minecraft_velocity",
				"message0" : Blockly.Msg.MC_cmd_minecraft_velocity,
				"args0" : [ {
					"type" : "field_number",
					"name" : "velocity",
					"value" : 1,
					"min" : -5,
					"max" : 5,
					"precision" : .01
				},{
					"type" : "field_number",
					"name" : "yaw",
					"value" : 0,
					"min" : 0,
					"max" : 359,
					"precision" : .01
				},{
					"type" : "field_number",
					"name" : "pitch",
					"value" : 0,
					"min" : 0,
					"max" : 180,
					"precision" : .01
				}, {
					"type" : "input_value",
					"name" : "singleblock",
					"check" : [ "Material" ]
				} ],
				"output" : "Material",
				"colour" : 180,
				"tooltip" : "",
				"helpUrl" : ""
			});
		}
	};
	
Blockly.Blocks['minecraft_unicode_grid_selector'] = {
  init: function() {
var symbols = [
  // Star-like and decorative symbols
  ['★', '☆', '✦', '✧', '✪', '✫', '✬', '✭', '✮', '✯'],
  ['✰', '✱', '✲', '✳', '✴', '✵', '✶', '✷', '✸', '✹'],
  ['✺', '✻', '✼', '✽', '✾', '✿', '❀', '❁', '❂', '❃'],
  ['✢', '✣', '✤', '✥'],
  ['❦', '❧', '❖', '❋', '❉', '❊'],
  ['❇', '❈', '❍', '❏', '❐', '❑', '❒'],
  ['⚒', '⚓', '⚔', '⚕', '⚖', '⚗', '⚘', '⚙', '⚛', '⚜'],

  // Chess symbols
  ['♔', '♕', '♖', '♗', '♘', '♙'],
  ['♚', '♛', '♜', '♝', '♞', '♟'],
  ['♠', '♣', '♥', '♦'],

  // Weather symbols
  ['☀', '☁', '☂', '☃', '☄', '☇', '☈', '☉', '☊', '☋'],
  ['☌', '☍', '☎', '☏', '☑', '☒', '☓', '☕', '☘', '☠', '☢'],
  ['♀', '♂', '⚡', '🌪', '🌤', '🌦', '🌧'],
  ['🌥', '🌩', '🌬', '🌨'],

   // Pointing hands
  ['☚', '☛', '☜', '☞', '☟', '☝', '👇', '👆', '👉', '👈'],

// General warning and prohibition signs
  ['⛔', '🚫', '⚠️', '🔞', '🚷', '🚯', '🚳', '🚱'],


  // Musical
  ['♩', '♪', '♫', '♬', '♭', '♯', '♮', '𝄞']
];
    
    this.appendDummyInput()
        .appendField(new FieldUnicodeGrid(symbols), 'SYMBOL');
    this.setOutput(true, 'String');
    this.setColour(230);
    this.setTooltip('Select a Unicode symbol');
    this.setHelpUrl('');
  }
};




	
