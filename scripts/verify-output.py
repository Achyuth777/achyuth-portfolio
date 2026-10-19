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
three=next(v for k,v in sizes.items() if k.startswith('three-scene-'))
assert initial['gzip']<100_000,sizes
assert three['gzip']<180_000,sizes
print('PASS: 9 prerendered routes, original anchors, unique IDs, H1 structure, internal links, asset references, form labels and JS budgets.')
print(json.dumps(sizes,indent=2))

# Cinematic revision: verify the actual specified media and bundled font binaries.
hero=(root/'index.html').read_text()
assert 'hf_20261005_143740_52dbf3ef-ea20-4594-a1ad-91d6c2970159.mp4' in hero
assert '<video' in hero and ('playsInline' in hero or 'playsinline' in hero)
for weight in ['regular','bold']:
 font=root/'assets'/f'au-grotesk-{weight}.woff2'
 assert font.read_bytes()[:4]==b'wOF2',font
print('PASS: specified hero film and both real WOFF2 font files.')
