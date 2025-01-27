const a=t=>{const e=Number(t);if(!e||e<1||e>Date.now())return new Date;const s=365.25*24*60*60*1e3*3,n=Date.now()-s;return n>e?new Date(n):new Date(e)};export{a as p};
