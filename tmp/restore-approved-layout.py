import subprocess
from pathlib import Path
files=['components/home/HomePage.jsx','components/layout/Header.jsx','components/layout/Footer.jsx','app/layout.js','app/contact/page.js','components/contact/ContactPage.jsx']
for f in files:
    Path(f).write_bytes(subprocess.check_output(['git','show','HEAD:'+f]))
def replace(f, pairs):
    p=Path(f); s=p.read_text(encoding='utf-8')
    for a,b in pairs:
        if a not in s: print('Missing:',a[:60])
        s=s.replace(a,b)
    p.write_text(s,encoding='utf-8')
replace('components/home/HomePage.jsx',[
('return <main>','return <main lang="sv">'),
('Choose delivery location','Välj leveransplats'),
('European farms and fresh farm produce','Gårdar och lokal mat från producenter'),
('Local farms. Premium produces.','Lokal mat. Större möjligheter.'),
('Fresh. Natural.<br /><em>Delivered to you.</em>','Från din gård<br /><em>till fler bord.</em>'),
('Discover small-scale, nutritious food sourced directly from farms you can actually know.','Upptäck lokal mat och människorna bakom den. Farm to Table förenar gårdarnas egna digitala butiker med en gemensam marknadsplats.'),
('Search Farms, Categories','Sök gårdar och kategorier'),('Search products, farms or categories','Sök produkter, gårdar eller kategorier'),
('>Explore <','>Utforska <'),('Good food starts here','Närproducerat börjar här'),('Find your farm favourites.','Hitta dina favoriter från gården.'),('Explore all farms','Utforska alla gårdar'),
('{tab.label}',"{({'meat-fish':'Kött, fågel & fisk',dairy:'Mejeri & ost',vegetables:'Grönsaker & rotfrukter',pantry:'Skafferi',drinks:'Drycker',kitchen:'Till köket'})[tab.id] || tab.label}"),
('Farmer holding fresh greens and milk from the farm','Producent med en korg av gårdens ostar'),
('Local roots. Clean delivery.','Enklare försäljning. Starkare kundrelationer.'),
('Why Choose Farm to Table?','Varför Farm to Table?'),
('We bring you the best from local farms. Pure, fresh and healthy products for your family.','Mer tid för det som verkligen räknas. Samla försäljning, beställningar och kundkontakt på ett ställe – och låt fler upptäcka din gård.'),
('From their farm to your home','Från gården till ditt bord'),('How it works','Så fungerar det'),('Fresh food. Four simple steps.','Lokal mat. Fyra enkla steg.'),
('Fresh & Clean','Smaker från våra producenter'),('View All Products','Visa alla produkter'),
('Our<br />Farms','Våra<br />gårdar'),
('Farm to Table connects homes with growers, dairies, butchers, and fishers who care about every step from field to delivery.','Bakom varje gård finns människor, kunskap och en egen berättelse. Lär känna våra lokala producenter och hitta mat med ett tydligt ursprung.'),
('Meet Our Farms','Upptäck våra gårdar'),('A family spending time together at the farm','Barn som möter en kalv på gården'),
('We Care for Nature','En framtid för lokal mat'),('Rare & pesticide-free','Närmare producenten'),('Small suppliers are chosen for clean growing and careful handling.','Lär känna människorna bakom maten och deras sätt att arbeta.'),
('Traceable origins','Tydligt ursprung'),('Each product clearly connects back to a named farm or producer.','Se vilken gård eller producent som står bakom varje produkt.'),
('Packed lightly','Starkare tillsammans'),('Fresh deliveries use reusable boxes and simple, responsible packaging.','Direkta kundrelationer skapar nya möjligheter för lokala verksamheter.'),
('Family visiting a farm garden','Barn på besök i gårdens grönska'),('Little adventures. Lasting memories.','Nära gården. Nära människorna.'),
('Visit with kids','Upptäck livet på gården'),
('Discover family visits with our farm partners. Contact us to ask about farm walks, meeting growers, and spending a day close to nature.','Låt nyfikenheten på maten börja där den produceras. Kontakta oss för att fråga vilka gårdar som erbjuder besök och aktiviteter för familjer.'),
('Guided walks','Möt producenterna'),('Meet growers and see the fields.','Fråga om gårdens arbete och livet på landet.'),
('Mini harvest','Följ säsongen'),('Pick seasonal greens with our team.','Upptäck vad som växer och skördas just nu.'),
('Animal care','Lär känna gården'),('Learn gentle farm routines up close.','Ta del av gårdens berättelse och vardag.'),
('Plan your visit','Fråga om gårdsbesök'),('Cows grazing in a sunny pasture','Kor som betar i en solig hage')])
replace('constants/home.jsx',[
('Choose Location','Välj plats'),('Enter your delivery location','Ange var du vill få din beställning'),('Select Farm','Välj gård'),('Browse farms near you','Upptäck producenter nära dig'),('Shop Products','Välj produkter'),('Add fresh products to cart','Lägg dina favoriter i varukorgen'),('Fast Delivery','Välj leverans'),('We deliver to your doorstep','Se tillgängliga alternativ i kassan'),
('Direct from Farms','Egen gårdsbutik'),('No middlemen','En egen länk till dina kunder'),('Farm Fresh','Gemensam marknadsplats'),('Picked with care','Låt fler hitta din gård'),('Healthy & Safe','Allt på ett ställe'),('Chemical free','Lager, order och betalningar'),('Sustainable','Bättre överblick'),('Good for nature','Statistik för din verksamhet')])
replace('components/home/FeaturedFarms.jsx',[
('Many farms. One fresh basket.','Många gårdar. En gemensam marknadsplats.'),('Meet your producers.','Möt våra producenter.'),('Good food has a story. Get to know the people behind yours.','Lokal mat har en berättelse. Lär känna människorna bakom din nästa måltid.'),('Explore all farms','Utforska alla gårdar'),('<FarmCard id={id}', '<FarmCard locale="sv" id={id}')])
replace('components/layout/Footer.jsx',[
('/storefront/footer-white.png','/brand/farm-to-table-brochure.png'),('Farm to Table home','Farm to Table startsida'),
('Fresh local produce, premium pantry goods, and trusted farms delivered with care.','Lokal mat. Större möjligheter. Egna digitala gårdsbutiker och en gemensam marknadsplats för producenter och kunder.'),
('>Contact<','>Kontakt<'),('Subscribe & Get Farm Notes','Nyheter från gårdarna'),('Enter your email','Ange din e-postadress'),('>Organic<','>Gårdar<'),('>Local<','>Lokalt<'),('>Fresh<','>Säsong<'),('All Rights Reserved.','Alla rättigheter förbehållna.'),('Terms & Conditions','Allmänna villkor'),('Privacy Policy','Integritetspolicy'),('Back to top','Tillbaka till toppen')])
# Keep the original styles and dimensions; only recolor the supplied logo for dark surfaces.
with Path('styles/refinements.css').open('a',encoding='utf-8') as f:
    f.write('\n/* Supplied brochure logo: white on the existing dark header and footer. */\n.brand-logo-white, .footer-logo-image { filter: brightness(0) invert(1); }\n')
