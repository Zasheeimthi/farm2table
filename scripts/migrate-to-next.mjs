// One-time AST extraction: preserve JSX/CSS while splitting the original modules.
import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import generateModule from '@babel/generator';
import * as t from '@babel/types';
const traverse = traverseModule.default || traverseModule;
const generate = generateModule.default || generateModule;
const write = (file, content) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); };
const groups = [
  ['src/App.jsx', {
    'components/layout/Brand.jsx': ['Brand'],
    'components/layout/Header.jsx': ['Header'],
    'components/layout/Footer.jsx': ['Footer'],
    'components/product/HomeProductCard.jsx': ['ProductCard', 'FarmLink', 'productPath'],
    'components/category/CategoryArtwork.jsx': ['CategoryArtwork'],
    'components/category/CategoryFilter.jsx': ['CategoryFilter'],
    'components/home/HomePage.jsx': ['HomePage'],
    'components/about/AboutPage.jsx': ['AboutPage'],
    'components/contact/ContactPage.jsx': ['ContactPage'],
    'components/home/Reviews.jsx': ['Reviews', 'reviews'],
    'components/home/FAQSection.jsx': ['FAQSection', 'faqItems'],
    'constants/home.jsx': ['steps', 'marketplaceBenefits'],
  }],
  ['src/marketplace.jsx', {
    'context/MarketContext.jsx': ['MarketContext', 'useMarket', 'MarketProvider'],
    'hooks/useStored.js': ['readStore', 'useStored'],
    'components/modals/MarketTools.jsx': ['MarketTools'],
    'components/forms/AddressFields.jsx': ['AddressFields'],
    'components/common/LocationBar.jsx': ['LocationBar'],
    'components/layout/Page.jsx': ['Page'],
    'components/layout/Breadcrumb.jsx': ['Breadcrumb'],
    'components/layout/Heading.jsx': ['Heading'],
    'components/category/CategoryChips.jsx': ['CategoryChips'],
    'components/common/SaveButton.jsx': ['SaveButton'],
    'components/farm/FarmCard.jsx': ['FarmCard'],
    'components/home/FeaturedFarms.jsx': ['FeaturedFarms'],
    'components/farm/FarmsPage.jsx': ['FarmsPage'],
    'components/product/ProductCard.jsx': ['ProductCard'],
    'components/cart/Quantity.jsx': ['Quantity'],
    'components/shop/ProductsPage.jsx': ['ProductsPage'],
    'components/product/ProductDetailsPage.jsx': ['ProductDetailsPage'],
    'components/farm/FarmPage.jsx': ['FarmPage'],
    'components/common/Empty.jsx': ['Empty'],
    'components/checkout/Progress.jsx': ['Progress'],
    'components/cart/OrderSummary.jsx': ['OrderSummary'],
    'components/cart/CartPage.jsx': ['CartPage'],
    'components/checkout/CheckoutPage.jsx': ['CheckoutPage'],
    'components/checkout/DeliveryReview.jsx': ['DeliveryReview'],
    'hooks/usePaymentCards.js': ['usePaymentCards'],
    'components/checkout/PaymentMethodSection.jsx': ['PaymentMethodSection'],
    'components/checkout/PaymentPage.jsx': ['PaymentPage'],
    'components/checkout/ConfirmationPage.jsx': ['ConfirmationPage'],
    'components/account/OrdersPage.jsx': ['OrdersPage'],
    'components/account/AccountPage.jsx': ['AccountPage'],
    'components/auth/AuthPage.jsx': ['AuthPage'],
    'components/account/SavedPage.jsx': ['SavedPage'],
    'components/common/NotFound.jsx': ['NotFound'],
  }],
];
const files = new Map(), registry = new Map();
for (const [source, mapping] of groups) {
  const ast = parse(fs.readFileSync(source, 'utf8'), { sourceType: 'module', plugins: ['jsx'] });
  const declarations = new Map(), imports = new Map();
  for (const node of ast.program.body) {
    if (t.isImportDeclaration(node)) {
      for (const s of node.specifiers) imports.set(s.local.name, { from: node.source.value, imported: s.imported?.name || 'default' });
    } else {
      const d = node.declaration || node;
      if (t.isFunctionDeclaration(d)) declarations.set(d.id.name, d);
      if (t.isVariableDeclaration(d)) for (const v of d.declarations) declarations.set(v.id.name, t.variableDeclaration(d.kind, [v]));
    }
  }
  for (const [file, names] of Object.entries(mapping)) {
    const body = names.map(name => { if (!declarations.has(name)) throw new Error(name); return t.exportNamedDeclaration(declarations.get(name)); });
    files.set(file, { ast: t.file(t.program(body)), imports, source });
    for (const name of names) registry.set(`${source}:${name}`, file);
  }
}
const sourceMap = { './catalog.jsx': '@/lib/catalog', './market-model.js': '@/lib/market-model', './location-map.jsx': '@/components/location/LocationPicker' };
const passive = new Set(['CategoryArtwork','Page','Heading','Breadcrumb','Progress','DeliveryReview']);
for (const [file, { ast, imports, source }] of files) {
  const first = ast.program.body[0].declaration;
  const firstName = first.id?.name || first.declarations?.[0]?.id.name;
  // Convert navigation to the App Router without changing the rendered element.
  traverse(ast, {
    JSXElement(p) {
      const node = p.node, tag = node.openingElement.name;
      if (tag.name !== 'a') return;
      const href = node.openingElement.attributes.find(a => a.name?.name === 'href');
      let internal = false;
      if (t.isStringLiteral(href?.value) && href.value.value.startsWith('#/')) { href.value.value = href.value.value.slice(1); internal = true; }
      if (t.isJSXExpressionContainer(href?.value) && t.isTemplateLiteral(href.value.expression)) {
        const q = href.value.expression.quasis[0];
        if (q.value.raw.startsWith('#')) { q.value.raw = q.value.raw.slice(1); q.value.cooked = q.value.cooked.slice(1); internal = true; }
      }
      if (internal) { tag.name = 'Link'; if (node.closingElement) node.closingElement.name.name = 'Link'; }
    },
    ReferencedIdentifier(p) { if (p.node.name === 'setRoute' && !p.scope.hasBinding('setRoute')) p.node.name = 'go'; },
  });
  for (const exp of ast.program.body) {
    const fn = exp.declaration;
    if (!t.isFunctionDeclaration(fn)) continue;
    const mini = t.file(t.program([fn]));
    let navigate = false;
    traverse(mini, { ReferencedIdentifier(p) { if (p.node.name === 'go' && !p.scope.hasBinding('go')) navigate = true; } });
    if (navigate) fn.body.body.unshift(t.variableDeclaration('const', [t.variableDeclarator(t.identifier('go'), t.callExpression(t.identifier('useNavigate'), []))]));
    if (['FarmsPage', 'ProductsPage', 'ConfirmationPage', 'AuthPage'].includes(fn.id.name)) {
      fn.params[0].properties = fn.params[0].properties.filter(p => p.key.name !== 'params');
      if (!fn.params[0].properties.length) fn.params = [];
      fn.body.body.unshift(t.variableDeclaration('const', [t.variableDeclarator(t.identifier('params'), t.callExpression(t.identifier('useSearchParams'), []))]));
    }
  }
  const deps = new Set();
  traverse(ast, { ReferencedIdentifier(p) { if (!p.scope.hasBinding(p.node.name)) deps.add(p.node.name); } });
  const builtImports = [];
  for (const name of [...deps].sort()) {
    let from, imported = name;
    if (name === 'Link') { from = 'next/link'; imported = 'default'; }
    else if (name === 'useSearchParams') from = 'next/navigation';
    else if (name === 'useNavigate') from = '@/hooks/useNavigate';
    else if (name === 'slugify') from = '@/lib/market-model';
    else if (registry.has(`${source}:${name}`)) from = '@/' + registry.get(`${source}:${name}`);
    else if (imports.has(name)) {
      const entry = imports.get(name); imported = entry.imported;
      if (entry.from === './marketplace.jsx') from = '@/' + registry.get(`src/marketplace.jsx:${name}`);
      else from = sourceMap[entry.from] || entry.from;
    }
    if (from) builtImports.push(t.importDeclaration([imported === 'default' ? t.importDefaultSpecifier(t.identifier(name)) : t.importSpecifier(t.identifier(name), t.identifier(imported))], t.stringLiteral(from)));
  }
  ast.program.body.unshift(...builtImports);
  if (!passive.has(firstName) && !file.startsWith('constants/')) ast.program.directives = [t.directive(t.directiveLiteral('use client'))];
  write(file, generate(ast, { comments: true }).code + '\n');
}
write('lib/market-model.js', fs.readFileSync('src/market-model.js','utf8').replace(/^export const go = .*\r?\n/m, ''));
write('lib/catalog.jsx', fs.readFileSync('src/catalog.jsx','utf8'));
for (const css of ['styles','marketplace','refinements','location-map']) write(`styles/${css}.css`,fs.readFileSync(`src/${css}.css`,'utf8'));
write('components/location/LocationPickerImpl.jsx', '"use client";\n' + fs.readFileSync('src/location-map.jsx','utf8').replace("import 'leaflet/dist/leaflet.css';",''));
const theme = fs.readFileSync('src/main.jsx','utf8').match(/const theme = ([\s\S]*?);\r?\n/)[1];
write('constants/theme.js', `export const theme = ${theme};\n`);
write('tests/market-model.test.js', fs.readFileSync('tests/market-model.test.js','utf8').replace('../src/market-model.js','../lib/market-model.js'));
console.log(`Extracted ${files.size} modules; original sources retained until verification.`);
