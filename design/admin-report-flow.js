/* Reference report snapshots, kept separate from the order-management demo. */
const salesSnapshot=[
 {reference:'ORD-1791525091463',amount:320,delivery:0,status:'Paid',date:'2026-10-09',time:'11:21'},
 {reference:'ORD-1791524757216',amount:470,delivery:0,status:'Paid',date:'2026-10-09',time:'11:15'},
 {reference:'ORD-1791373113745',amount:170,delivery:0,status:'Paid',date:'2026-10-07',time:'17:08'}
];
const farmSnapshot=[
 {farm:'Solmarka Farm',sales:3,amount:640,payout:480,tax:46.33,share:60,commission:128,combined:160,commissionTax:32},
 {farm:'Hagshult Grasslands',sales:2,amount:320,payout:240,tax:18.11,share:40,commission:64,combined:80,commissionTax:16}
];
reporting.mode='custom';reporting.date='2026-10-09';reporting.farm='';
const reportFarmOptions=['Almas Dairy','Bjare Chicken Farm','EcoRoots Farm','Green Harvest Organics','Hagshult Grasslands','Pleasant Valley','Solmarka Farm'];
reportBounds=function(){if(state.report==='Monthly report'){const [y,m]=reporting.month.split('-').map(Number);return [reporting.month+'-01',reporting.month+'-'+new Date(y,m,0).getDate()];}return [reporting.from,reporting.to];};
const reportPresentation={view:'list',query:''};
const reportMoney=n=>new Intl.NumberFormat('sv-SE',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n)+' kr';
function flowRows(){
 const [start,end]=reportBounds();
 if(state.report==='Sales report')return salesSnapshot.filter(r=>r.date>=start&&r.date<=end&&r.reference.toLowerCase().includes(reportPresentation.query.toLowerCase()));
 if(state.report==='Monthly report')return reporting.month==='2026-10'?farmSnapshot:[];
 return start<='2026-10-07'&&end>='2026-10-09'?farmSnapshot.filter(r=>!reporting.farm||r.farm===reporting.farm):[];
}
function flowColumns(){
 return state.report==='Sales report'?[['Reference #','reference'],['Total amount','amount'],['Delivery fee','delivery'],['Status','status'],['Order date','date']]
 :[['Farm name','farm'],['Total sales','sales'],['Total amount','amount'],['Payout','payout'],...(state.report==='Monthly report'?[['Tax','tax'],['Commission %','share']]:[]),['Commission','commission'],...(state.report==='Monthly report'?[['Commission + tax','combined'],['Commission tax','commissionTax']]:[])];
}
function flowValue(row,key){
 if(['amount','delivery','payout','tax','commission','combined','commissionTax'].includes(key))return reportMoney(row[key]);
 if(key==='share')return row[key]+'%';
 if(key==='date')return row.date+' '+(row.time||'');
 return String(row[key]);
}
function readableReportChart(rows,start,end,daily){
 const formatDate=date=>new Date(date+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'});
 const points=daily?(()=>{const result=[];for(let d=new Date(start+'T12:00:00');reportISO(d)<=end;d.setDate(d.getDate()+1)){
  const date=reportISO(d),matches=rows.filter(r=>r.date===date);
  result.push({label:formatDate(date),value:matches.reduce((s,r)=>s+r.amount,0),count:matches.length});
  if(result.length>=366)break;
 }return result;})():rows.map(r=>({label:r.farm,value:r.amount,count:r.sales}));
 const peak=Math.max(0,...points.map(p=>p.value)),ceiling=Math.max(100,Math.ceil(peak/100)*100);
 const active=points.filter(p=>p.value>0),total=points.reduce((s,p)=>s+p.value,0);
 const peakPoint=points.find(p=>p.value===peak);
 return `<div class="clear-chart">
 <div class="clear-chart-heading"><div><h3>${daily?'Sales by day':'Sales by farm'}</h3><p>${daily?`${formatDate(start)} – ${formatDate(end)} ${end.slice(0,4)}`:'Total sales for the selected period'} · Amounts in Swedish kronor (SEK)</p></div><span class="chart-legend"><i></i>Total sales</span></div>
 <div class="chart-takeaway"><strong>${reportMoney(total)}</strong><span>${daily?`across ${active.length} days with sales`:`across ${points.length} farms`}${peak?` · ${daily?'Highest day':'Top farm'}: ${esc(peakPoint.label)} (${reportMoney(peak)})`:''}</span></div>
 <div class="clear-chart-layout"><div class="chart-scale" aria-hidden="true">${[4,3,2,1,0].map(n=>`<span>${Math.round(ceiling*n/4)} kr</span>`).join('')}</div><div class="clear-chart-scroll" tabindex="0" aria-label="Sales chart, scroll horizontally to see every ${daily?'day':'farm'}"><div class="clear-chart-plot" style="min-width:${points.length*(daily?76:180)}px" role="img" aria-label="${daily?'Daily':'Farm'} sales. Exact amounts are also listed below.">${points.map(p=>`<div class="clear-chart-column"><div class="clear-chart-track"><div class="clear-chart-bar ${p.value?'':'zero'}" style="height:${p.value/ceiling*100}%"><span>${p.value?reportMoney(p.value):'0'}</span></div></div><div class="clear-chart-date">${esc(p.label)}</div></div>`).join('')}</div></div></div>
 <p class="clear-chart-help">${daily?'Each bar represents one day. A zero means no sales that day.':'Each bar shows the total sales for one farm.'}${points.length>10?' Scroll sideways to see the full period.':''}</p>
 <div class="chart-breakdown"><h4>${daily?'Days with sales':'Farm breakdown'}</h4><div class="chart-breakdown-grid">${active.map(p=>`<div class="chart-breakdown-item"><div><strong>${esc(p.label)}</strong><small>${p.count} ${daily?(p.count===1?'transaction':'transactions'):(p.count===1?'sale':'sales')}</small></div><strong>${reportMoney(p.value)}</strong></div>`).join('')}</div></div>
 </div>`;
}
reportsView=function(){
 const sale=state.report==='Sales report',monthly=state.report==='Monthly report';
 const rows=flowRows(),columns=flowColumns(),[start,end]=reportBounds();
 const total=rows.reduce((s,r)=>s+r.amount,0),payout=sale?null:rows.reduce((s,r)=>s+r.payout,0);
 const controls=`<div class="report-inline-filters">${monthly?`<label>Month<input id="report-month" type="month" value="${reporting.month}"></label>`:`${!sale?`<label>Farm<select id="report-farm"><option value="">All farms</option>${reportFarmOptions.map(name=>`<option value="${esc(name)}" ${reporting.farm===name?'selected':''}>${esc(name)}</option>`).join('')}</select></label>`:''}<label>Start date<input id="report-from" type="date" value="${reporting.from}" max="${reporting.to}"></label><label>End date<input id="report-to" type="date" value="${reporting.to}" min="${reporting.from}"></label>`} </div>`;
 const totals=Object.fromEntries(columns.filter(([,k])=>!['farm','reference','date','status'].includes(k)).map(([,k])=>[k,rows.reduce((s,r)=>s+r[k],0)]));
 const list=`<div class="table-wrap"><table class="settlement-table"><thead><tr>${columns.map(([l])=>`<th>${l}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${columns.map(([,k])=>`<td>${k==='status'?badge(r.status):esc(flowValue(r,k))}</td>`).join('')}</tr>`).join('')}</tbody>${!sale&&rows.length?`<tfoot><tr>${columns.map(([,k],i)=>`<td>${i===0?'Total':flowValue(totals,k)}</td>`).join('')}</tr></tfoot>`:''}</table></div>`;
 const chart=readableReportChart(monthly?salesSnapshot:rows,start,end,sale||monthly);
 shell(header('Reports','Sales and farm settlements, clearly in view.',`<button class="btn" id="flow-export">${icon('download')} Export report</button>`)+`<section class="panel report-tabs-panel report-navigation"><div class="tabs">${['Sales report','Sales summary','Monthly report'].map(t=>`<button data-action="report:${t}" class="${state.report===t?'active':''}" aria-pressed="${state.report===t}">${t}</button>`).join('')}</div>${controls}</section><div class="stats report-flow-stats">${[['Total amount',reportMoney(total)], [sale?'Transactions':'Total sales',sale?rows.length:rows.reduce((s,r)=>s+r.sales,0)], [sale?'Delivery fees':'Payout',reportMoney(sale?rows.reduce((s,r)=>s+r.delivery,0):payout)], [sale?'Paid amount':'Commission',reportMoney(sale?total:rows.reduce((s,r)=>s+r.commission,0))]].map(([l,v])=>`<div class="stat"><div class="stat-label">${l}</div><div class="stat-value">${v}</div><small>Selected period</small></div>`).join('')}</div><section class="panel"><div class="panel-title"><h2>${state.report}</h2><div class="report-view-switch" aria-label="Report display">${['list','chart'].map(v=>`<button class="btn small ${reportPresentation.view===v?'primary':''}" data-report-view="${v}" aria-pressed="${reportPresentation.view===v}">${icon(v==='list'?'menu':'reports')}${v==='list'?'List':'Chart'}</button>`).join('')}</div></div>${sale?`<div class="toolbar"><label class="report-search">${icon('search')}<input id="flow-search" type="search" placeholder="Search reference…" aria-label="Search sales reference" value="${esc(reportPresentation.query)}"></label><small class="end">${rows.length} transactions</small></div>`:''}${rows.length?(reportPresentation.view==='list'?list:chart):`<div class="empty">${state.report==='Sales summary'&&!(start<='2026-10-07'&&end>='2026-10-09')?'No daily farm breakdown is available for this range in the reference data. Choose a range covering 7–9 October 2026.':'No report data for the selected filters.'}</div>`}<div class="report-source-note">October 2026 reference data · ${sale?'3 payment transactions in the supplied report.':'5 farm sales in the supplied settlement report.'}${monthly?' Commission percentages are reproduced from the reference; they are not used to calculate fees.':''}</div></section>`,'Reports');
};
document.addEventListener('click',e=>{
 const view=e.target.closest('[data-report-view]');if(view){reportPresentation.view=view.dataset.reportView;reportsView();}
 if(e.target.closest('#flow-export'))exportCSV(flowRows().map(r=>Object.fromEntries(flowColumns().map(([label,key])=>[label,flowValue(r,key)]))),'farm-to-table-'+state.report.toLowerCase().replaceAll(' ','-'));
});
document.addEventListener('input',e=>{if(e.target.id!=='flow-search')return;const pos=e.target.selectionStart;reportPresentation.query=e.target.value;reportsView();const input=document.getElementById('flow-search');input.focus();try{input.setSelectionRange(pos,pos)}catch{}});
if(state.page==='reports')reportsView();



document.addEventListener('change',e=>{if(e.target.id==='report-farm'){reporting.farm=e.target.value;reportsView();}});
