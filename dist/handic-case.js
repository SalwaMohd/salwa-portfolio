(() => {
  const keys=['handic','acupoint','kiwi','scheid','atmos','org'];
  const routes=['handic.html','sanda.html','kiwi.html','scheid.html','atmos.html','org.html'];
  const dialog=document.createElement('dialog');
  dialog.className='hc-dialog'; dialog.setAttribute('aria-labelledby','hc-title');
  const viewer=document.createElement('dialog');viewer.className='hc-viewer';viewer.setAttribute('aria-label','Project image viewer');
  viewer.innerHTML='<header><span id="hc-image-title"></span><div class="hc-viewer-tools"><button type="button" data-zoom aria-pressed="false">Actual size</button><button type="button" data-viewer-close>× Close</button></div></header><img class="hc-viewer-image" alt="">';
  document.body.append(dialog,viewer);
  let returnFocus,savedY=0,oldStyle='',pushed=false;
  function openCase(key,trigger,fromHistory=false){
    const index=keys.indexOf(key),template=document.getElementById(key+'-case-content');
    if(index<0||!template)return;
    if(!dialog.open){
      returnFocus=trigger||document.querySelector('a[href="'+routes[index]+'"]');savedY=window.scrollY;oldStyle=document.body.getAttribute('style')||'';
      Object.assign(document.body.style,{position:'fixed',top:`-${savedY}px`,width:'100%',overflow:'hidden'});
      if(!fromHistory){history.pushState({portfolioCase:true},'','#'+key);pushed=true;}
    }else if(!fromHistory)history.replaceState(history.state,'','#'+key);
    if(viewer.open)viewer.close();
    dialog.dataset.project=key;
    dialog.innerHTML='<header class="hc-bar"><button type="button" data-hc-close>← <span>Back to selected work</span></button><span class="hc-count">'+String(index+1).padStart(2,'0')+' / 06</span><nav aria-label="Project navigation">'+(index?'<button type="button" data-case="'+keys[index-1]+'">← Previous</button>':'')+(index<5?'<button type="button" data-case="'+keys[index+1]+'">Next →</button>':'')+'</nav><button type="button" class="hc-close" data-hc-close aria-label="Close case study">× <span>Close</span></button></header>'+template.innerHTML;
    if(!dialog.open)dialog.showModal();
    dialog.scrollTo({top:0,behavior:'instant'});dialog.querySelector('[data-hc-close]').focus({preventScroll:true});
  }
  function closeCase(fromHistory=false){
    if(!dialog.open)return;if(viewer.open)viewer.close();dialog.close();document.body.setAttribute('style',oldStyle);
    window.scrollTo({top:savedY,behavior:'instant'});returnFocus?.focus({preventScroll:true});
    if(!fromHistory){if(pushed)history.back();else history.replaceState(null,'','#work');}pushed=false;
  }
  document.addEventListener('click',e=>{
    const link=e.target.closest('a');if(!link||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;
    const index=routes.indexOf(link.getAttribute('href'));if(index<0)return;e.preventDefault();openCase(keys[index],link);
  });
  dialog.addEventListener('click',e=>{
    if(e.target.closest('[data-hc-close]')){closeCase();return;}
    const next=e.target.closest('[data-case]');if(next){openCase(next.dataset.case);return;}
    const view=e.target.closest('[data-case-image]');if(view){
      const img=viewer.querySelector('img'),zoom=viewer.querySelector('[data-zoom]');
      img.onload=()=>img.style.setProperty('--image-width',img.naturalWidth+'px');
      img.src=view.dataset.caseImage;img.alt=view.dataset.imageTitle||'Project image';img.classList.remove('zoomed');
      viewer.querySelector('#hc-image-title').textContent=img.alt;zoom.textContent='Actual size';zoom.setAttribute('aria-pressed','false');
      viewer.showModal();viewer.scrollTo({top:0,left:0,behavior:'instant'});viewer.querySelector('[data-viewer-close]').focus({preventScroll:true});
    }
    if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeCase();}
  });
  dialog.addEventListener('cancel',e=>{e.preventDefault();closeCase();});
  viewer.addEventListener('click',e=>{
    if(e.target.closest('[data-viewer-close]'))viewer.close();
    const zoom=e.target.closest('[data-zoom]');if(zoom){const on=viewer.querySelector('img').classList.toggle('zoomed');zoom.textContent=on?'Fit width':'Actual size';zoom.setAttribute('aria-pressed',String(on));}
  });
  window.addEventListener('popstate',()=>{const key=location.hash.slice(1);if(keys.includes(key))openCase(key,null,true);else closeCase(true);});
  const key=location.hash.slice(1);if(keys.includes(key))openCase(key,null,true);
})();
