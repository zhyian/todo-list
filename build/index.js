(()=>{"use strict";const e=window.React,t=window.wp.blocks,o=JSON.parse('{"UU":"create-block/todo-list"}'),r=window.wp.blockEditor,n=window.wp.element;(0,t.registerBlockType)(o.UU,{edit:()=>{const[o,l]=(0,n.useState)((0,t.parse)("\x3c!-- wp:paragraph --\x3e<p>Test!</p> \x3c!-- /wp:paragraph --\x3e")),a=e=>{l(e)};return(0,e.createElement)(r.BlockEditorProvider,{value:o,onInput:a,onChange:a},(0,e.createElement)(r.WritingFlow,null,(0,e.createElement)(r.BlockList,null)))}})})();