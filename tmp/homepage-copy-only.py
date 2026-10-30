from pathlib import Path
p=Path('components/home/FAQSection.jsx');s=p.read_text(encoding='utf-8')
for a,b in [('Customer clarity','Bra att veta'),('Frequently Asked Questions','Vanliga frågor och svar'),('Simple answers for ordering fresh local food, choosing farms, and receiving deliveries with confidence.','Här hittar du svar om gårdarna, marknadsplatsen och verktygen som gör lokal försäljning enklare.'),('Still have questions?','Har du fler frågor?'),('Talk to us','Kontakta oss')]: s=s.replace(a,b)
s=s[:s.index('export const faqItems =')]+'''export const faqItems = [
  ['Var kommer maten ifrån?', 'Varje produkt är kopplad till en gård eller producent. På gårdens sida kan du läsa mer om verksamheten, sortimentet och människorna bakom maten.'],
  ['Hur fungerar det att handla?', 'Välj plats, utforska gårdarna och lägg dina produkter i varukorgen. Kontrollera tillgängliga leveransalternativ och villkor innan du slutför din beställning.'],
  ['Vad får jag som producent?', 'En egen digital butikslänk och en plats på vår gemensamma marknadsplats. Verktyg för lager, beställningar, betalningar och statistik hjälper dig att samla arbetet och få bättre överblick. Kontakta oss för att komma igång.'],
  ['Vad innebär förhandsförsäljning och crowdfunding?', 'Låt kunderna vara med från början. Genom förhandsförsäljning kan du ta emot beställningar inför nästa skörd eller slakt. Crowdfunding kan ge kunder möjlighet att stötta en ny satsning. Kontakta oss för att prata om upplägg, villkor och leveransplan.']
];
''';p.write_text(s,encoding='utf-8')
p=Path('components/home/Reviews.jsx');s=p.read_text(encoding='utf-8')
for a,b in [('Real Reviews From Real Customers','Röster om lokal mat'),('Verified buyers','Exempelomdömen'),('Based on 3,442 fresh delivery reviews.','Illustration av kundomdömen. Betyget är exempeldata.'),('3 days ago','Exempel'),('Review carousel controls','Välj omdöme'),('Previous review','Föregående omdöme'),('Show review','Visa omdöme'),('Next review','Nästa omdöme'),('Excellent quality','Fin kvalitet'),('Everything arrived cold, clean, and beautifully packed.','Allt kom fram omsorgsfullt packat och var enkelt att ta hand om.'),('Trusted local farms','Nära lokala gårdar'),('I love seeing which farm each product comes from.','Jag uppskattar att kunna se vilken gård varje produkt kommer från.'),('Fresh and reliable','Smaker att återvända till'),('The vegetables and dairy feel premium every week.','Det är roligt att upptäcka grönsaker och mejeriprodukter från gårdarna.')]:s=s.replace(a,b)
p.write_text(s,encoding='utf-8')
p=Path('components/farm/FarmCard.jsx');s=p.read_text(encoding='utf-8').replace('  id\n','  id, locale = "en"\n')
s=s.replace('  const f = farmData[id];','''  const original = farmData[id];
  const swedish = {
    solmarka: { location: 'Blekede, Sverige', summary: 'Upptäck Solmarka Farms sortiment av mejeriprodukter och grönsaker. Läs mer om gården och hitta dina favoriter i gårdsbutiken.' },
    hagshult: { location: 'Småland, Sverige', summary: 'Lär känna Hagshult Grasslands och människorna bakom gården. Utforska sortimentet och läs om verksamheten på gårdens egen sida.' },
    bjare: { location: 'Bjärehalvön', summary: 'Upptäck Bjäre Chicken Farm och gårdens produkter. Besök gårdsbutiken för att se sortiment och information om producenten.' },
  };
  const f = locale === 'sv' ? { ...original, ...swedish[id] } : original;
  const labels = { 'meat-fish': 'Kött, fågel & fisk', dairy: 'Mejeri & ost', vegetables: 'Grönsaker & rotfrukter', pantry: 'Skafferi', drinks: 'Drycker', kitchen: 'Till köket' };''')
s=s.replace("id === 'farmtable' ? 'Partner collection' : 'Meet the producer'","locale === 'sv' ? 'Möt producenten' : id === 'farmtable' ? 'Partner collection' : 'Meet the producer'")
s=s.replace("categoryTabs.find(tab => tab.id === c)?.label","locale === 'sv' ? labels[c] : categoryTabs.find(tab => tab.id === c)?.label")
s=s.replace('Shop farm <ArrowRightOutlined />',"{locale === 'sv' ? 'Handla från gården' : 'Shop farm'} <ArrowRightOutlined />")
p.write_text(s,encoding='utf-8')
