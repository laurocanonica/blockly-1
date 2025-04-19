function getOwnBlockText(block) {
    let texts = [];

    for (const input of block.inputList) {
        let inputText = '';

        // Add field text (labels, dropdowns, etc.)
        for (const field of input.fieldRow) {
            inputText += field.getText() + ' ';
        }

        // If a value block is connected, include its top-level text too
        const target = input.connection && input.connection.targetBlock();
        if (target && input.type === Blockly.inputTypes.VALUE) {
            inputText += getOwnBlockText(target); // Shallow only
        }

        texts.push(inputText.trim());
    }

    return texts.join(' ').trim() || block.type;
}

function getBlockTextIndented(block, indent = 0) {
    const pad = '  '.repeat(indent);
    let text = pad + getOwnBlockText(block);

    // Recursively handle only STATEMENT (vertical stack) inputs
    for (const input of block.inputList) {
        const childBlock = input.connection && input.connection.targetBlock();
        if (childBlock && input.type === Blockly.inputTypes.STATEMENT) {
            text += '\n' + getBlockTextIndented(childBlock, indent + 1);
        }
    }

    // Follow the chain of next blocks
    const nextBlock = block.getNextBlock();
    if (nextBlock) {
        text += '\n' + getBlockTextIndented(nextBlock, indent);
    }

    return text;
}

function convertBlocksToTextIndented(workspace) {
    const topBlocks = workspace.getTopBlocks(true);
    const visibleBlockTexts = topBlocks.map(block => getBlockTextIndented(block));
    const content = visibleBlockTexts.join('\n\n');
    return content;

}
