import{j as n,a as t,Q as s}from"./index-55816554.js";import{useCountState as r,useCountPlus1StateValue as o}from"./count-e2a558db.js";function i(){const[d,l]=r(),c=o();return n("div",{children:[t("table",{className:"ds-table w-full border-2",children:n("tbody",{children:[n("tr",{children:[t("td",{children:"countState"}),t("td",{children:d})]}),n("tr",{children:[t("td",{children:"countPlus1State"}),t("td",{children:c})]})]})}),n(s.div,{class:"mt-4 flex gap-2",children:[t(s.button,{class:"ds-btn ds-btn-secondary ds-btn-square flex-1",onClick:()=>l(e=>e+1),children:"+1"}),t(s.button,{class:"ds-btn ds-btn-info ds-btn-square flex-1",onClick:()=>l(e=>e-1),children:"-1"})]})]})}export{i as default};
