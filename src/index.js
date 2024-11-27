import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';

import { BlockEditorProvider, BlockList, WritingFlow } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';
import { useState } from '@wordpress/element';

registerBlockType( metadata.name, {
	edit: () => {
		const content = '<!-- wp:paragraph --><p>Test!</p> <!-- /wp:paragraph -->'
		const [blocks, setBlocks] = useState(parse(content));
		const handleBlocksChange = (newBlocks) => {
			setBlocks(newBlocks);
		};

		return (
			<BlockEditorProvider
				value={blocks}
				onInput={handleBlocksChange}
				onChange={handleBlocksChange}
			>
				<WritingFlow>
					<BlockList />
				</WritingFlow>
			</BlockEditorProvider>
		);
	}
} );
