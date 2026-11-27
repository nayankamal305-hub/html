import assert from 'node:assert/strict';
import {itemTotal,plannedTotal,categoryTotals,remainingBudget} from './calculator.js';
const items=[{name:'Rice',qty:2,price:60,category:'Grocery'},{name:'Milk',qty:3,price:30,category:'Dairy'}];
assert.equal(itemTotal(items[0]),120);
assert.equal(plannedTotal(items),210);
assert.deepEqual(categoryTotals(items),{Grocery:120,Dairy:90});
assert.equal(remainingBudget(500,items),290);
console.log('4 calculator checks passed');