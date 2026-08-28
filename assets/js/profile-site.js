async function loadSite(){
  const response=await fetch('/content/site.json',{cache:'no-store'});
  if(!response.ok) return;
  const data=await response.json(),p=data.profile;
  document.querySelectorAll('[data-name]').forEach(el=>el.textContent=p.name);
  document.querySelectorAll('[data-initials]').forEach(el=>el.textContent=p.initials);
  document.querySelectorAll('[data-name-en]').forEach(el=>el.textContent=p.nameEn);
  document.querySelectorAll('[data-bio]').forEach(el=>el.textContent=p.bio);
  document.querySelectorAll('[data-role]').forEach(el=>el.textContent=p.role);
  document.querySelectorAll('[data-org]').forEach(el=>el.textContent=p.organization);
  document.querySelectorAll('[data-location]').forEach(el=>el.textContent=`⌖ ${p.location}`);
  document.querySelectorAll('[data-surname]').forEach(el=>el.textContent=p.name.slice(0,1));
  document.querySelectorAll('[data-email-link]').forEach(el=>el.href=`mailto:${p.email}`);
  document.querySelectorAll('[data-email]').forEach(el=>el.textContent=p.email);
  document.querySelector('#interest-chips').innerHTML=p.interests.map(x=>`<span>${x}</span>`).join('');
  document.querySelector('#research-topics').innerHTML=data.research.map((x,i)=>`<div class="topic"><strong>${String(i+1).padStart(2,'0')}</strong><span>${x}</span></div>`).join('');
  document.querySelector('#experience-list').innerHTML=(data.experience||[]).map((x,i)=>`<article><div class="timelineMarker"><span>${String(i+1).padStart(2,'0')}</span></div><p class="years">${x.years}</p><div><h3>${x.title}</h3><strong>${x.place}</strong><p>${x.note||''}</p></div></article>`).join('')||'<p class="emptyHint">教育与工作经历待补充。</p>';
  document.querySelector('#publication-list').innerHTML=(data.publications||[]).map((x,i)=>`<article><div class="pubNo">${String(i+1).padStart(2,'0')}<span>${x.year}</span></div><div class="pubBody"><p class="pubType">${x.type||'PUBLICATION'}</p><h3>${x.title}</h3><p>${x.authors||''}</p><strong>${x.venue||''}</strong><div class="chips">${(x.tags||[]).map(t=>`<span>${t}</span>`).join('')}</div></div><a href="${x.href||'#'}" aria-label="查看论文">↗</a></article>`).join('');
  document.querySelector('#publication-empty').hidden=(data.publications||[]).length>0;
  document.querySelector('#updates-list').innerHTML=(data.updates||[]).map((x,i)=>`<article class="${i===0?'featuredNote':''}"><div class="noteDate"><strong>${x.date}</strong><span>${x.year||''}</span></div><div><span class="noteKind">${x.kind||'动态'}</span><p>${x.text}</p><small>${x.meta||''}</small></div></article>`).join('');
  document.querySelector('#updates-empty').hidden=(data.updates||[]).length>0;
  document.querySelector('#social-links').innerHTML=p.links.map(x=>`<a href="${x.href}">${x.label} ↗</a>`).join('');
}
loadSite().catch(()=>{});
