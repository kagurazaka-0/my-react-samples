import{R as e,a as i,c as s,b as n}from"./index.d8552539.js";const t=e({key:"todoListState",default:[{title:"\u3072\u304D\u8089\u8CB7\u3046"},{title:"\u3007\u3007\u3055\u3093\u304B\u3089\u306ESlack\u78BA\u8A8D\u3059\u308B"},{title:"\u3007\u3007\u306E\u4FEE\u6B63\u5BFE\u5FDC\u3059\u308B",isDone:!0}]}),x=()=>i(t),a=s({key:"todoListTextState",get:({get:u})=>`\u672A\u5B8C\u4E86: ${u(t).filter(({isDone:o})=>!o).length}\u4EF6`}),B=()=>n(a);export{x as useTodoListState,B as useTodoListTextStateValue};