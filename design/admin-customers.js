function customersView(){
 const records=[
  {name:'Technical Support',email:'tech@inspirepro.eu',phone:'9876543210',created:'2026-09-21'},
  {name:'Suresh Palanisamy',email:'sureshpalanisamy105@gmail.com',phone:'565656565656',created:'2026-09-17'},
  {name:'Suresh Palanisamy',email:'sds@gmail.com',phone:'1234567891',created:'2026-09-17'},
  {name:'Sds Sdv',email:'sdvsdv@gmail.com',phone:'5674658544',created:'2026-09-10'},
  {name:'Suresh Palanisamy',email:'sfsdv@gmail.com',phone:'2332423423',created:'2026-09-10'},
  {name:'Suresh Palanisamy',email:'sureshpalanisafsfsfmy105@gmail.com',phone:'1212121212',created:'2026-09-09'}
 ];
 const list=records.filter(o=>Object.values(o).join(' ').toLowerCase().includes(state.query.toLowerCase()));
 shell(header('Customers','Customer profiles and contact details, together in one place.')+`<section class="panel"><div class="toolbar">${search('Search customers, email or phone…')}<small class="end">${list.length} customers</small></div><div class="table-wrap"><table class="contact-directory"><thead><tr><th>Customer</th><th>Email</th><th>Phone</th><th>Status</th><th>Created at</th></tr></thead><tbody>${list.map(o=>`<tr><td><strong>${esc(o.name)}</strong></td><td>${esc(o.email)}</td><td>${esc(o.phone)}</td><td>${badge('Active')}</td><td>${o.created}</td></tr>`).join('')}</tbody></table>${!list.length?'<div class="empty">No matching customers.</div>':''}</div></section>`,'Customers');
}
