"""Static production checks. Does not substitute for rendered browser QA."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse,unquote
import gzip,json
root=Path('dist')
routes=['/','/about','/projects','/skills','/experience','/contact','/projects/supplylens','/projects/treasuryflow','/projects/argus-ai']
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.ids=[];self.links=[];self.h1=0;self.assets=[];self.labels=[];self.inputs=[];self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id'in a:self.ids.append(a['id'])
  if tag=='h1':self.h1+=1
  if tag=='a':self.links.append(a.get('href',''))
  if tag=='script' and a.get('src'):self.assets.append(a['src'])
  if tag=='link' and a.get('href','').startswith('/assets/'):self.assets.append(a['href'])
  if tag=='label' and a.get('for'):self.labels.append(a['for'])
pages={route:Page((root/route.strip('/')/'index.html').read_text()) for route in routes}
for route,page in pages.items():
 assert page.h1==1,(route,'expected one H1')
 assert len(page.ids)==len(set(page.ids)),(route,'duplicate IDs')
 assert 'main'in page.ids
 for asset in page.assets:assert (root/asset.lstrip('/')).exists(),asset
 for href in page.links:
  assert href and href!='#',(route,'empty link')
  parsed=urlparse(href)
  if parsed.scheme or parsed.netloc:continue
  dest=parsed.path or route
  assert dest in pages,(route,'unknown route',href)
  if parsed.fragment:assert unquote(parsed.fragment)in pages[dest].ids,(route,'missing anchor',href)
 for label in page.labels:assert label in page.ids,(route,'missing label target',label)
for anchor in ['home','projects','about','skills','journey','contact']:assert anchor in pages['/'].ids,anchor
sizes={p.name:{'bytes':p.stat().st_size,'gzip':len(gzip.compress(p.read_bytes()))} for p in (root/'assets').glob('*.js')}
assert len([k for k in sizes if k.startswith('index-')])==1, 'stale initial bundles'
initial=next(v for k,v in sizes.items() if k.startswith('index-'))
assert not any(k.startswith('three-scene-') for k in sizes), 'unexpected 3D runtime'
assert initial['gzip']<100_000,sizes

print('PASS: 9 prerendered routes, original anchors, unique IDs, H1 structure, internal links, asset references, form labels and JS budgets.')
print(json.dumps(sizes,indent=2))

# Ronin restoration: preserve the original image pair and font, not the superseded film.
hero=(root/'index.html').read_text()
assert 'hf_20260831_115955_2a9adb39-5e9b-4ced-96e2-6900eabe3de9' in hero
assert 'hf_20260831_123709_183f0065-efb2-4bb2-a849-13aaa5af2f3f' in hero
assert 'Orbitron-Medium' in hero
assert 'Project overview' in hero
assert 'Unseal sculpture' not in hero
assert '/previews/supplylens.webp' in hero
assert 'DEVELOPER UNIVERSE' not in (root/'skills/index.html').read_text()
for slug in ['supplylens','treasuryflow','argus-ai']: assert (root/'previews'/f'{slug}.webp').exists()
assert 'hf_20261005_143740' not in hero
print('PASS: original Ronin artwork, typography, accessible project controls and no superseded film.')
