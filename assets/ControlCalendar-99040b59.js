import{v as D,b as N,u as i,q as f,n as j,j as t,g as h,K as v,S as y,G as w,T as F,U as L}from"./index-8707da13.js";import{p as C}from"./parseDate-629c4fe8.js";const S="_day_1fbih_1",T="_date_1fbih_15",E="_percFilled_1fbih_30",I="_perc_1fbih_30",R="_active_1fbih_50",r={day:S,date:T,percFilled:E,perc:I,active:R},W=s=>{const e=new Date,a=new Date(Number(s));return e.setHours(23),e.setMinutes(59),e.setSeconds(59),e.setMilliseconds(999),e.getTime()<a.getTime()},$=(s,e)=>{const a=new Date(Number(s)),n=new Date(Number(e));return a.getFullYear()===n.getFullYear()&&a.getMonth()===n.getMonth()&&a.getDate()===n.getDate()},k=({calendarDate:s,amount:e})=>{const a=D(),n=N(),c=i(f),{date:m}=j(),_=C(m),g=u=>{a(`/water/${u}`),n(v(u))},p=new Date(Number(s)).getDate(),l=c>0?Math.round(e/(c*1e3)*100):e,d=W(s),b=Math.round(l)<100,x=$(_,s),M=Math.round(l)>=100?"100%":`${l}%`;return t.jsxs("button",{className:h(r.day,{[r.disabled]:d}),disabled:d,onClick:()=>g(s),children:[t.jsx("div",{className:h(r.date,{[r.percFilled]:b,[r.active]:x}),children:p}),t.jsx("div",{className:r.perc,children:M})]})},A="_errorMessage_128uc_1",Y="_container_128uc_7",q="_calendarList_128uc_12",o={errorMessage:A,container:Y,calendarList:q},K=()=>{const s=i(y),e=i(w),a=i(F);return e?t.jsx(L,{}):a?t.jsx("div",{className:o.container,children:t.jsx("h2",{className:o.errorMessage,children:"Сталася помилка отримання даних води за місяць. Спробуйте пізніше."})}):t.jsx("div",{className:o.container,children:t.jsx("ul",{className:o.calendarList,children:s.map((n,c)=>t.jsx("li",{children:t.jsx(k,{index:c,calendarDate:n.date,amount:n.amount})},c))})})};export{K as default};
