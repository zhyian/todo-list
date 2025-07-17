import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';

import { BlockEditorProvider, BlockList, WritingFlow } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

registerBlockType( metadata.name, {
	edit: () => {
		const content = '<!-- wp:paragraph --><p>Test!</p> <!-- /wp:paragraph -->'
		const [blocks, setBlocks] = useState(parse(content));
		const containerRef = useRef();
		const { selectionChange } = useDispatch('core/block-editor');

		const handleBlocksChange = (newBlocks) => {
			setBlocks(newBlocks);
		};

		useEffect(() => {
			const container = containerRef.current;
			if (!container) return;

			const handlePaste = (event) => {
				const target = event.target;
				const isWithinNestedEditor = container.contains(target);

				if (isWithinNestedEditor) {
					const blockElement = target.closest('[data-block]');
					if (blockElement) {
						const blockId = blockElement.getAttribute('data-block');
						selectionChange(
							{ clientId: blockId, attributeKey: 'content', offset: 0 },
							{ clientId: blockId, attributeKey: 'content', offset: 0 }
						);
					}
				}
			};

			container.addEventListener('paste', handlePaste, true);
			return () => container.removeEventListener('paste', handlePaste, true);
		}, [selectionChange]);

		return (
			<div ref={containerRef}>
				<BlockEditorProvider
					value={blocks}
					onInput={handleBlocksChange}
					onChange={handleBlocksChange}
				>
					<WritingFlow>
						<BlockList />
					</WritingFlow>
				</BlockEditorProvider>
			</div>
		);
	}
} );
