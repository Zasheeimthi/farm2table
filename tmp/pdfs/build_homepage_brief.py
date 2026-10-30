from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader

OUT=Path('output/pdf'); OUT.mkdir(parents=True,exist_ok=True)
QA=Path('tmp/pdfs/homepage-qa'); QA.mkdir(parents=True,exist_ok=True)
pdfmetrics.registerFont(TTFont('Arial','C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialBold','C:/Windows/Fonts/arialbd.ttf'))
styles={
 'title':ParagraphStyle('title',fontName='ArialBold',fontSize=25,leading=30,spaceAfter=16,textColor=HexColor('#000000')),
 'h':ParagraphStyle('h',fontName='ArialBold',fontSize=17,leading=22,spaceAfter=12,textColor=HexColor('#000000')),
 'sub':ParagraphStyle('sub',fontName='ArialBold',fontSize=11,leading=15,spaceBefore=5,spaceAfter=3),
 'body':ParagraphStyle('body',fontName='Arial',fontSize=10,leading=14,spaceAfter=7),
 'copy':ParagraphStyle('copy',fontName='Arial',fontSize=10.5,leading=14,spaceAfter=5,textColor=HexColor('#163f33')),
 'small':ParagraphStyle('small',fontName='Arial',fontSize=9,leading=13,spaceAfter=7,textColor=HexColor('#505b57'))}
story=[]; md=[]
def p(t,kind='body'):
 story.append(Paragraph(escape(t),styles[kind])); md.append(('## ' if kind in ['title','h'] else '### ' if kind=='sub' else '')+t+'\n')
def page(title):
 if story: story.append(PageBreak()); md.append('\n---\n')
 p(title,'h')
def copy(label,t): p(label,'sub'); p(t,'copy')
def note(t): p('Developer note: '+t,'small')

p('Farm to Table homepage content handoff','title')
p('Swedish website copy and implementation guidance','sub')
p('Prepared 22 October 2026 | Homepage only | Client review version','small')
p('Replace the homepage messaging with a producer-focused story based on the client brochure. Keep a visible shopping route for consumers. This document gives the developer a complete section plan, ready-to-use Swedish copy, button labels and publishing checks.')
p('Recommended direction','sub')
p('Lead with “Från din gård till fler bord.” Explain how a producer can sell through a personal shop link and a shared marketplace, then show the practical tools and the role of pre-sales. The existing consumer shopping experience should remain accessible through “Handla från gårdar”.')
p('What the live homepage currently communicates','sub')
p('The homepage is predominantly consumer-facing: product search, delivery location, categories, producer cards, shopping steps, farm visits and delivery reviews. The brochure is predominantly producer-facing: easier sales, customer relationships, administration, payments, inventory, statistics and pre-sales. Copy changes alone will not resolve this mismatch; several existing sections need a new purpose.')
p('How to use this document','sub')
p('Green text is proposed website copy in Swedish. English text is implementation guidance and must not appear on the website. Brochure wording is retained where appropriate; supporting paragraphs, FAQs and navigation labels are editorial extensions for this homepage.')
p('Approval boundary','sub')
p('The producer-first structure is a recommendation inferred from the brochure. Obtain client approval for that positioning and confirm feature availability before publishing the relevant claims. Do not interpret brochure mockup statistics or anonymous quotes as verified performance evidence.')
p('Sources','sub')
p('Live homepage reviewed in the browser: https://farm-to-table-dev-web-ezvhr.ondigitalocean.app/','small')
p('Client source: WhatsApp Image 2026-10-21 at 3.45.03 PM.jpeg, supplied in this conversation. The brochure is the authority for the proposed brand language. No changes have been made to the live website.','small')

page('1  Current sections and replacement plan')
p('The following mapping covers the homepage sections observed during the review. The new order is specified by section number below.','body')
for title,t in [
('Header and hero','Current: “Färskt. Naturligt. Levererat till dig.” Replace with producer-focused hero, two audience routes and brochure tagline. Move the large shopper search into the marketplace section. New sections 2 and 3.'),
('Category discovery','Current: “Hitta dina gårdsfavoriter.” Keep as a secondary shopping module; translate the English category labels. New section 7.'),
('Producer cards','Current: “Möt dina producenter.” Keep dynamic cards in the marketplace module. Do not invent farm descriptions, addresses or categories. New section 7.'),
('Why choose Farm to Table','Current: consumer health and sustainability benefits. Replace with a clear introduction to the producer platform and its six tools. New section 4.'),
('How it works','Current: location, farm, products, fast delivery. Replace with the producer onboarding journey. New section 5.'),
('Our farms image section','Current: “Våra Gårdar”. Reuse the image and text layout for the shared marketplace story, avoiding a duplicate producer section. New section 7.'),
('Nature and sustainability','Current: pesticide-free growing, traceability and reusable boxes. Replace this block with practical producer benefits. New section 6.'),
('Family farm visits','Current: “Besök med barn.” Remove from this homepage and reuse its layout for pre-sales and crowdfunding. New section 6. Retain farm-visit content elsewhere only if it is a real service.'),
('Review carousel','Current: 4.9, 3 442 reviews, “VERIFIERADE KÖPARE”. Replace with the non-testimonial brand statement in section 8 until evidence and permissions are available.'),
('FAQ','Replace shopper and delivery questions with producer questions, plus a clear shopping route. New section 8.'),
('Footer and newsletter','Replace description, badge words and newsletter text. Verify contact details and legal destinations. Add a final producer enquiry CTA above it. New section 9.')]:
 p(title,'sub'); p(t)

page('2  Header and brand language')
p('Use the brochure identity consistently across the homepage. Use a proper approved logo asset; do not crop it from the brochure or use the speckled generated white version.','body')
copy('Brand name','Farm to Table')
copy('Brand tagline','Lokal mat. Större möjligheter.')
copy('Recommended navigation','Så fungerar det  ·  Funktioner  ·  Förhandsförsäljning  ·  Handla från gårdar  ·  Vanliga frågor')
copy('Header primary button','Bli producent')
copy('Account link','Logga in')
note('Use anchors #sa-fungerar-det, #funktioner, #forhandsforsaljning and #vanliga-fragor. “Handla från gårdar” can use the existing /farms route, observed on the live homepage. “Bli producent” should open a producer enquiry destination, not the shopper signup flow. Route names for new destinations must be agreed with the developer.')
p('Vocabulary to use throughout','sub')
p('Use producent / lokala producenter for the business audience; gård when discussing an individual farm. Use egen digital butik, butikslänk, gemensam marknadsplats, lagerhantering, beställningar, betalningar, statistik, förhandsförsäljning and kundrelationer consistently.')
p('Language corrections','sub')
p('Use Swedish sentence case for headings. Keep Farm to Table as three words in copy. Avoid inconsistent “FarmToTable” branding outside approved logo artwork. Replace the unnatural “småskaligt, näringsrikt livsmedel” and “Sällsynt och bekämpningsmedelsfritt” with the copy supplied in this brief.')
p('Claims to remove from generic homepage copy','sub')
p('Remove “Kemikaliefritt”, blanket “Hälsosamt och säkert”, “Inga mellanhänder”, “Snabb leverans”, “Bra för naturen”, and the “EKO” badge unless each claim is supported by the actual service and relevant products. Replace broad promises with concrete information about tools, producer identity and product availability.')
p('Recommended page sequence','sub')
p('Hero → Platform and tools → How it works → Producer benefits → Pre-sales → Marketplace and producers → Brand statement → FAQ → Final enquiry → Footer.')

page('3  Hero')
p('Replace the existing consumer hero while retaining a prominent route to the marketplace. The headline is taken directly from the brochure.','body')
copy('Eyebrow','Ett digitalt verktyg för lokala producenter')
copy('H1','Från din gård till fler bord.')
copy('Supporting text','Sälj dina produkter direkt till kunder genom din egen butikslänk och vår gemensamma marknadsplats. Samla försäljning, beställningar och kundkontakter på ett ställe, så att du får mer tid till det som verkligen räknas.')
copy('Primary button','Bli producent')
copy('Secondary button','Handla från gårdar')
copy('Short supporting line','Enklare försäljning. Starkare kundrelationer. En framtid för lokal mat.')
note('Primary button → producer enquiry section or confirmed onboarding destination. Secondary button → /farms. Do not use “Börja gratis”, pricing, a free-trial promise or immediate activation unless approved. Keep one H1 only.')
p('Search placement','sub')
p('Move the current search and delivery-location controls out of the producer hero and into the marketplace module. Preserve their existing functionality. This keeps the main message clear without removing access for shoppers.')
copy('Marketplace search placeholder','Sök produkter, gårdar och kategorier')
copy('Location control','Välj leveransplats')
copy('Search button','Sök')
note('Confirm what the existing search actually searches before keeping all three nouns. The location selector must show only real supported options.')
p('Image direction','sub')
p('Use a real producer with products or an authentic farm scene. An approved interface screenshot can support the tool message farther down the page. Avoid showing invented revenue, order totals or growth percentages as real results.')
copy('Suggested image alt text when the image matches','Producent med nyskördade grönsaker på gården')

page('4  Platform introduction and features')
copy('Eyebrow','Allt på ett ställe')
copy('H2','Mer tid för det som verkligen räknas')
copy('Introduction','Farm to Table hjälper dig att samla den digitala delen av din försäljning. Gör dina produkter tillgängliga för fler kunder och få bättre överblick över butik, beställningar och lager i samma verktyg.')
for title,t in [
('Egen digital butik','Få en egen butikslänk som du kan dela med dina kunder. Presentera din gård, visa dina produkter och gör det enklare att handla direkt från dig.'),
('Gemensam marknadsplats','Låt nya kunder upptäcka din gård via Farm to Table. Din egen butik och den gemensamma marknadsplatsen ger kunderna fler vägar till dina produkter.'),
('Lagerhantering','Håll ordning på produkter och lagersaldo. Se vad som finns tillgängligt och uppdatera sortimentet när säsongen förändras.'),
('Beställningar','Samla beställningar, leveranser och kundkommunikation. Få överblick över vad som ska förberedas och vilka kunder som väntar på sina varor.'),
('Betalningar','Hantera betalningar online och följ betalningsstatus tillsammans med dina beställningar.'),
('Statistik','Följ din försäljning och se vilka produkter som efterfrågas. Använd överblicken som stöd när du planerar nästa steg.')]:
 copy(title,t)
note('These six feature areas come from the brochure; the explanatory sentences are expanded copy. Validate each feature in the producer product before publishing. If a feature is planned, hide its card or clearly label it “Kommer snart”. Do not present a mockup as proof that it is available.')
copy('Optional image caption','Mindre administration. Mer tid på gården.')

page('5  How producers get started')
copy('Eyebrow','Från gården till kunden')
copy('H2','Så kommer du igång')
copy('Introduction','Gör det enklare för kunder att hitta din gård och handla från dig. Börja med att berätta om din verksamhet och bygg vidare med dina produkter.')
for title,t in [
('1  Presentera din gård','Berätta vilka ni är, var ni finns och vad ni producerar. En tydlig presentation hjälper kunderna att lära känna människorna bakom maten.'),
('2  Lägg upp dina produkter','Beskriv ditt sortiment och ange priser och tillgänglighet. Håll informationen uppdaterad när utbudet förändras.'),
('3  Dela din butik','Dela din butikslänk med befintliga kunder och låt fler upptäcka dina produkter via den gemensamma marknadsplatsen.'),
('4  Följ dina beställningar','Samla beställningar och betalningsstatus och håll kunderna informerade. Använd försäljningsöversikten som stöd för din planering.')]: copy(title,t)
copy('Button','Jag vill bli producent')
note('This is an editorial onboarding explanation, not a verified account-creation sequence. Match it to the actual producer onboarding before publication. Do not promise instant approval, specific setup times, automatic delivery services or automatic stock synchronisation unless implemented.')
p('Implementation details','sub')
p('Keep four numbered cards. Use short headings, one paragraph per card and consistent icons. Display them in a clear reading order on mobile. The button must use the same producer enquiry destination as the hero.')
p('Delivery wording','sub')
p('The brochure discusses handling deliveries but does not establish a universal home-delivery service, speed guarantee, cold-chain process or delivery-day selection. Move operational delivery details to verified farm, checkout or help content. Remove prototype language such as “kassans förhandsvisning” from customer-facing copy.')

page('6  Benefits and pre sales')
copy('Benefits eyebrow','För din vardag som producent')
copy('Benefits H2','Spara tid. Skapa fler försäljningsmöjligheter. Få bättre kontroll.')
copy('Spara tid','Samla information och återkommande uppgifter i ett verktyg. Mindre administration ger mer utrymme för arbetet på gården.')
copy('Nå fler kunder','Gör det enklare för befintliga kunder att handla igen och för nya kunder att upptäcka ditt sortiment.')
copy('Planera med bättre överblick','Följ lager, beställningar och försäljning. Använd efterfrågan som stöd när du planerar produktion och utbud.')
note('The brochure says “Öka intäkterna”. This version expresses the opportunity without promising a revenue outcome. Do not add percentages, savings estimates or guaranteed results.')
copy('Pre-sales eyebrow','Förhandsförsäljning och crowdfunding')
copy('Pre-sales H2','Finansiera din nästa skörd eller slakt')
copy('Pre-sales body','Låt dina kunder vara en del av resan. Med förhandsförsäljning och crowdfunding kan du bjuda in kunder att stötta kommande produktion, nästa skörd, slakt eller en ny satsning på gården.')
copy('Supporting text','Beskriv vad du planerar, vad kunden får och när det är tänkt att bli klart. Förhandsbeställningar kan ge en tydligare bild av efterfrågan och ett bättre underlag för planeringen.')
copy('Button','Prata med oss om förhandsförsäljning')
note('Publish only after confirming that this offer is available and its terms are defined. Button → an enquiry with topic “Förhandsförsäljning”. Do not imply guaranteed funding, investment returns or specific payment timing. Keep the platform and producer responsibilities clear in the actual terms.')
note('Do not reuse “Nötköttslåda Höst 2025”, 82% funded or 48 customers as live data. Use a real campaign with live data and dates, or an illustration visibly labelled “Illustration av förhandsförsäljning”. If the offer is not available, omit the section until a confirmed launch or approved waitlist exists.')

page('7  Marketplace and producer discovery')
p('Keep this consumer module below the producer proposition. It is both a shopping entry point and an example of how producers are discovered.','body')
copy('Eyebrow','Lokal mat. Nära dig.')
copy('H2','Upptäck maten och människorna bakom den')
copy('Body','På vår gemensamma marknadsplats kan kunder upptäcka lokala producenter och deras sortiment. Utforska gårdarna, läs deras berättelser och se vilka produkter som finns tillgängliga.')
copy('Main button','Utforska alla gårdar')
copy('Category heading','Hitta dina gårdsfavoriter')
copy('Category introduction','Utforska sortimentet efter kategori och hitta produkter från gårdar du vill lära känna.')
p('Category label mapping','sub')
for t in ['Dairy → Mejeriprodukter','Meat → Kött','Vegetables → Grönsaker','Fruits → Frukt','Nuts → Nötter','Honey → Honung','Herbs → Örter, only if active','Grains → Spannmål, only if active']: p(t)
copy('Producer cards heading','Möt våra producenter')
copy('Producer cards introduction','God mat har en historia. Lär känna människorna bakom den.')
copy('Card button','Besök gårdens butik')
note('Keep farm name, location, image and category tags dynamic. Translate category labels through the category system, not by changing category IDs. Only show categories that are active and relevant. Do not rename actual businesses through this copy update.')
note('The inspected cards repeated a generic delivery description, all showed Stockholm, and Bjare Chicken Farm showed Vegetables / Fruits. Validate these records with the owner; do not infer corrections from names. Prefer a genuine producer description. If none exists, omit that paragraph rather than inventing credentials or delivery promises.')
copy('Search with no results','Vi hittade inga matchningar. Prova ett annat sökord eller utforska alla gårdar.')

page('8  Trust and frequently asked questions')
copy('Replace the review carousel with this H2','Närproducerat blir starkare tillsammans')
copy('Brand statement','Bakom varje produkt finns människor, kunskap och arbete. Farm to Table vill göra det enklare för lokala producenter och kunder att hitta varandra och bygga långsiktiga relationer kring lokal mat.')
note('This is brand copy, not a customer quote. Remove stars, “verifierade köpare”, the 4.9 rating, 3 442 reviews and relative dates unless backed by actual review records. The anonymous brochure quote also needs permission and a verified source before use as a testimonial.')
copy('FAQ H2','Vanliga frågor')
copy('FAQ introduction','Här hittar du svar om att sälja via Farm to Table och hur kunder kan upptäcka din gård.')
for q,a in [
('Vem är Farm to Table till för?','Farm to Table är ett digitalt verktyg för lokala producenter som vill sälja direkt till kunder och samla sin försäljning på ett ställe. Kunder kan använda marknadsplatsen för att upptäcka producenter och deras produkter.'),
('Vad är skillnaden mellan min butik och marknadsplatsen?','Din egen butikslänk leder kunder till din gård och ditt sortiment. På den gemensamma marknadsplatsen kan kunder upptäcka flera producenter och hitta vidare till din butik.'),
('Kan jag samla beställningar och lager på samma ställe?','Verktyget samlar produkter, lagersaldo, beställningar, betalningsstatus och försäljningsstatistik. Det ger dig en tydligare överblick över den digitala försäljningen.'),
('Hur fungerar förhandsförsäljning?','Förhandsförsäljning innebär att kunder beställer inför kommande produktion. Erbjudandet behöver tydligt beskriva vad kunden får, planerad leverans och vilka villkor som gäller. Kontakta oss om du vill veta hur det kan passa din verksamhet.'),
('Hur kommer jag igång och vad kostar det?','Kontakta oss och berätta om din verksamhet. Vi går igenom hur du kan komma igång och vilka priser och villkor som gäller innan du bestämmer dig.'),
('Jag vill handla lokal mat. Var börjar jag?','Välj ”Handla från gårdar” för att utforska producenter och deras sortiment. Läs informationen i gårdens butik och kontrollera vilka alternativ som gäller för din beställning.')]:
 copy(q,a)
note('Feature answers depend on the availability checks in section 4. The pricing answer requires a staffed enquiry route and approved pricing information. If pre-sales is omitted, omit its FAQ too. No shipping, cooling, refund or payment-method promise should be added without confirmed operational details.')

page('9  Final enquiry and footer')
copy('Final H2','Ta nästa steg för din gård')
copy('Final paragraph','Vill du göra det enklare för kunder att hitta och handla från dig? Berätta om din verksamhet, så pratar vi om hur Farm to Table kan passa din gård.')
copy('Primary button','Kontakta oss om att bli producent')
copy('Secondary link','Jag vill handla från gårdar')
p('Recommended producer enquiry form','sub')
p('Use this form only if an existing approved enquiry route is unavailable. Connect it to a monitored destination and show a real success state; do not leave a decorative form or promise a response time.')
copy('Form field labels','Namn · Gård eller företag · E-postadress · Telefonnummer (valfritt) · Berätta kort om din verksamhet')
copy('Submit label','Skicka förfrågan')
copy('Privacy helper','Läs hur vi hanterar dina personuppgifter i vår integritetspolicy.')
copy('Success message','Tack för din förfrågan. Vi återkommer till dig via de kontaktuppgifter du har angett.')
copy('Error message','Det gick inte att skicka din förfrågan. Försök igen om en stund.')
copy('Footer description','Farm to Table kopplar samman lokala producenter och kunder genom egna digitala butiker och en gemensam marknadsplats. Lokal mat. Större möjligheter.')
copy('Footer links','Så fungerar det · Funktioner · Handla från gårdar · Bli producent · Kontakt · Villkor · Integritetspolicy')
copy('Newsletter heading','Nyheter för dig som producerar lokal mat')
copy('Newsletter body','Få nyheter om Farm to Table och inspiration för din digitala försäljning.')
copy('Newsletter field and button','Din e-postadress · Prenumerera')
note('Keep the newsletter only if subscription handling and privacy requirements are implemented. Do not subscribe producer enquiries automatically. Verify the displayed address “77 Market Street”, phone “+46 8 345 5678” and email “support@farmtotable.com”; do not carry unverified contact details into production. Keep social links only when they lead to approved profiles.')
copy('Footer brand line replacing EKO LOKALT FÄRSKT','Lokal mat. Större möjligheter.')

page('10  Search metadata and publishing checks')
copy('Suggested SEO title','Farm to Table | Digital försäljning för lokala producenter')
copy('Suggested meta description','Sälj direkt till kunder med egen butikslänk och gemensam marknadsplats. Samla produkter, beställningar och betalningar med Farm to Table.')
copy('Social sharing title','Från din gård till fler bord | Farm to Table')
copy('Social sharing description','Enklare försäljning och starkare kundrelationer för lokala producenter. Upptäck hur Farm to Table kan stödja din gårds digitala försäljning.')
p('Keyword placement','sub')
p('Primary concepts: digital försäljning för lokala producenter, sälja direkt till kunder, egen digital butik, lokal mat. Supporting concepts: butikslänk, marknadsplats för lokal mat, lagerhantering, beställningar, förhandsförsäljning and crowdfunding. These are editorial themes from the brochure, not search-volume research. Use them naturally; do not add keyword lists to visible copy or a meta-keywords tag.')
p('Developer acceptance checklist','sub')
for t in [
'Confirm producer-first positioning and the enquiry destination with the client. Preserve the existing marketplace and cart flows.',
'Implement every section in the proposed sequence; remove duplicate farm introductions and the unrelated farm-visit block.',
'Use the supplied Swedish copy, one H1 and logical H2 / H3 headings. Set Swedish page language and preserve å, ä and ö.',
'Confirm feature availability and pre-sales terms. Remove unavailable features and related FAQ answers together.',
'Use genuine farm records and active categories. Do not hard-code the brochure mockup data, review counts or campaign examples.',
'Test every CTA, anchor, search field, location selector, FAQ and form on mobile and desktop. Check empty, error and success states.',
'Update footer and metadata. Confirm real contact details, legal links, social accounts and subscription handling.',
'Use approved logo assets and actual product screenshots. Give meaningful alt text to informative images and empty alt text to decorative ones.',
'Have the client review Swedish wording and factual claims, then compare the finished homepage section by section with this handoff.'
]: p('• '+t)
p('Scope for the developer','sub')
p('This handoff changes the homepage content and its section purposes. It does not authorise changes to pricing, transaction terms, product data, account permissions or checkout behaviour. New enquiry handling is an implementation dependency, not an assumed existing feature.')

def footer(c,d):
 c.setFont('Arial',8); c.setFillColor(HexColor('#607068'))
 c.drawString(46,28,'Farm to Table  |  Homepage content handoff')
 c.drawRightString(549,28,str(d.page))
doc=SimpleDocTemplate(str(OUT/'Farm_to_Table_Homepage_Content_Handoff.pdf'),pagesize=(595.28,841.89),rightMargin=46,leftMargin=46,topMargin=42,bottomMargin=48,title='Farm to Table homepage content handoff',author='')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
(OUT/'Farm_to_Table_Homepage_Copy.md').write_text('\n'.join(md),encoding='utf-8')
pdf=PdfReader(OUT/'Farm_to_Table_Homepage_Content_Handoff.pdf')
print('Pages:',len(pdf.pages))
print('PDF:',OUT/'Farm_to_Table_Homepage_Content_Handoff.pdf')


