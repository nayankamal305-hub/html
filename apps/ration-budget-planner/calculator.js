export function toNumber(value){const n=Number(value);return Number.isFinite(n)&&n>0?n:0}
export function itemTotal(item){return Math.round(toNumber(item.qty)*toNumber(item.price)*100)/100}
export function plannedTotal(items){return items.reduce((sum,item)=>sum+itemTotal(item),0)}
export function categoryTotals(items){return items.reduce((map,item)=>{const key=item.category||'Other';map[key]=(map[key]||0)+itemTotal(item);return map}, {})}
export function remainingBudget(budget, items){return Math.round((toNumber(budget)-plannedTotal(items))*100)/100}