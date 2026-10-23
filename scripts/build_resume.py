"""Generate the portfolio resume using ReportLab (pip install reportlab)."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/resume/achyuth-pv-resume.pdf'
for name,file in [('Resume','DejaVuSans.ttf'),('ResumeBold','DejaVuSans-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name,'/usr/share/fonts/truetype/dejavu/'+file))
pdfmetrics.registerFontFamily('Resume',normal='Resume',bold='ResumeBold',italic='Resume',boldItalic='ResumeBold')
W,H=595.276,841.89
c=canvas.Canvas(str(OUT),pagesize=(W,H))
c.setTitle('Achyuth PV | Software & Fintech Projects')
c.setAuthor('Achyuth PV')
L=40; R=W-40; y=H-40
ink='#18232D'; muted='#42515E'; accent='#234E65'
style=ParagraphStyle('body',fontName='Resume',fontSize=9,leading=12.6,textColor=HexColor(ink),spaceAfter=0)
def para(text,size=9,leading=12.6,color=ink,gap=4):
    global y
    st=ParagraphStyle('line',parent=style,fontSize=size,leading=leading,textColor=HexColor(color))
    p=Paragraph(text,st); _,h=p.wrap(R-L,800); p.drawOn(c,L,y-h); y-=h+gap

def section(title):
    global y
    y-=8
    c.setStrokeColor(HexColor('#CAD3D9'));c.setLineWidth(.5);c.line(L,y,R,y)
    y-=17
    c.setFont('ResumeBold',9);c.setFillColor(HexColor(accent));c.drawString(L,y,title)
    y-=8

def entry(title,date):
    global y
    c.setFont('ResumeBold',9.6);c.setFillColor(HexColor(ink));c.drawString(L,y-10,title)
    c.setFont('Resume',8.5);c.setFillColor(HexColor(muted));c.drawRightString(R,y-10,date)
    y-=17

def link(label,url): return f'<a href="{url}" color="{accent}"><u>{label}</u></a>'
def bullet(text): para('• '+text,gap=3)
para('<b>ACHYUTH PV</b>',25,29,gap=4)
para('B.Tech IT Student | Software, Fintech &amp; Web3 Projects',10.5,14,accent,gap=7)
para('Chennai, India  |  '+link('+91 9363225545','tel:+919363225545')+'  |  '+link('achyuth.web3@gmail.com','mailto:achyuth.web3@gmail.com'),8.8,12,gap=4)
para(link('achyuth.tech','https://achyuth.tech')+'  /  '+link('GitHub: Achyuth777','https://github.com/Achyuth777')+'  /  '+link('LinkedIn: Achyuth PV','https://www.linkedin.com/in/achyuth-pv-78653528a/'),8.8,12,gap=8)
para('IT undergraduate interested in how software handles inventory, payments and financial risk. Building AI-assisted web projects alongside experience in growth marketing and Web3 community leadership. Seeking software or fintech internship opportunities.',9.2,13,gap=2)
section('EDUCATION')
entry('B.Tech, Information Technology','2024 - 2028 (expected)')
para('SRM Institute of Science and Technology, Ramapuram, Chennai | IT-A',9,12,gap=1)
section('SELECTED PROJECTS')
para('AI-assisted development projects. Links include source code and portfolio case studies.',8.4,11.5,muted,gap=5)
entry('SupplyLens | Supply-chain planning','Oct 2026 showcase')
para('<b>React, TypeScript, Drizzle ORM, Cloudflare Workers / D1, Zod</b>  |  '+link('Code','https://github.com/Achyuth777/SupplyLens')+' · '+link('Case study','https://achyuth.tech/projects/supplylens'),8,11,gap=4)
bullet('Connects demand forecasts and inventory runway to purchase orders; uses exponential smoothing and supplier-delay scenarios to support planning.')
bullet('Includes revision checks and duplicate-receipt guards for inventory updates. Database-backed MVP with synthetic starting data.')
entry('TreasuryFlow | Corporate payment workflows','Oct 2026 showcase')
para('<b>React, TypeScript, Java, Spring Boot, PostgreSQL, Solidity</b>  |  '+link('Code','https://github.com/Achyuth777/treasuryflow')+' · '+link('Demo','https://treasuryflow-smoky.vercel.app'),8,11,gap=4)
bullet('Models payment requests, threshold-based approvals and local EVM settlement, with idempotent requests and event-based reconciliation for interrupted workflows.')
bullet('Separates approval, settlement and ledger states. Educational local-chain implementation; the browser demo simulates payments and moves no real funds.')
entry('Argus AI | Solana DeFi risk simulator','Oct 2026 showcase')
para('<b>Next.js, React, TypeScript, Tailwind CSS, Solana tooling</b>  |  '+link('Code','https://github.com/Achyuth777/argus-ai')+' · '+link('Demo','https://argus-ai-mu.vercel.app'),8,11,gap=4)
bullet('Explores modeled health factors, liquidation buffers and target repayments under collateral stress; includes simulated protection rules and optional Gemini explanations.')
bullet('Uses demo positions with explicit model assumptions. Protection actions are simulated; no live lending indexing or autonomous execution.')
section('EXPERIENCE & LEADERSHIP')
entry('Growth Marketing Intern | Kodeus AI','2026')
para('Worked on growth marketing, exploring how people discover a product and understand its value.',9,12,gap=4)
entry('Web3 Lead | CodeKrafters, SRM Ramapuram','Appointed Aug 2025')
para('Joined the Web3 leadership team and helped host Launchpad, introducing the club and its domains.',9,12,gap=4)
entry('Social Media Manager | The 333 Collective','Mar - May 2025')
para('Managed posting schedules, collaborated on campaign ideas and reviewed performance metrics to refine social media content.',9,12,gap=3)
section('TECHNICAL EXPOSURE & CERTIFICATIONS')
para('<b>Project stack:</b> React, Next.js, TypeScript, Tailwind CSS, Java / Spring Boot, SQL / PostgreSQL, Solidity, Git / GitHub; MongoDB with Python coursework.',8.8,12,gap=5)
para('<b>Aug 2025</b> · Solidity Smart Contract Development, Cyfrin Updraft<br/><b>Jun 2025</b> · Using MongoDB with Python, MongoDB',8.8,12,gap=0)
assert y>27, f'Resume exceeds page: y={y}'
c.save()
print(f'{OUT} | remaining bottom space: {y:.1f}pt')
