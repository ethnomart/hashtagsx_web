import { Product } from '../types';

export const products: Product[] = [
  // --- HOODIES ---
  {
    id: 'hx-cyber-heavy-hoodie',
    slug: 'hx-cyber-heavy-hoodie',
    title: 'Monolith Heavy Hoodie',
    price: 85.00,
    formattedPrice: '$85.00',
    category: 'Hoodies',
    description: '500 GSM French terry heavyweight hoodie featuring structured dropped shoulders, double-layered hood without drawstrings, and embossed tonal HashtagsX monogram on chest.',
    details: [
      '500 GSM 100% organic French terry cotton',
      'Seamless double-layered crossover hood',
      'Dense 2x2 ribbing at cuffs and hem',
      'Micro-silicone HashtagsX emblem at wrist',
      'Pre-shrunk with vintage enzyme pigment dye'
    ],
    materials: '100% Heavyweight Organic Cotton',
    fit: 'Boxy, oversized silhouette with wide armholes.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: ['Obsidian Black', 'Washed Concrete'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
    inStock: true
  },
  {
    id: 'hx-tactical-zip-hoodie',
    slug: 'hx-tactical-zip-hoodie',
    title: 'Kinetic Zip-Up Hoodie',
    price: 95.00,
    formattedPrice: '$95.00',
    category: 'Hoodies',
    description: 'Full-zip structural hoodie with custom matte two-way YKK hardware, hidden seam kangaroo pockets, and subtle typographic coordinates across the back yoke.',
    details: [
      '460 GSM combed cotton fleece interior',
      'Two-way matte black metal zipper with custom puller',
      'Concealed magnetic pocket closures',
      'Reinforced elbow articulation panels'
    ],
    materials: '100% Combed Cotton Fleece',
    fit: 'Relaxed contemporary drape.',
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: ['Vintage Charcoal', 'Signal Ochre'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    inStock: true
  },
  {
    id: 'hx-raw-edge-hoodie',
    slug: 'hx-raw-edge-hoodie',
    title: 'Specimen Raw Hoodie',
    price: 80.00,
    formattedPrice: '$80.00',
    category: 'Hoodies',
    description: 'Unbrushed loopback cotton hoodie with distressed raw-edge hems, exposed flatlock stitching, and typographic specimen graphic.',
    details: [
      '420 GSM unbrushed loopback cotton',
      'Distressed hem and sleeve cuffs',
      'Water-based high-density discharge print',
      'Garment washed for supreme softness'
    ],
    materials: '100% Loopback Cotton',
    fit: 'Slouchy relaxed fit.',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: ['Bone White', 'Acid Washed Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    inStock: true
  },

  // --- LEATHER JACKETS ---
  {
    id: 'hx-biker-leather-jacket',
    slug: 'hx-biker-leather-jacket',
    title: 'Atelier Biker Leather Jacket',
    price: 320.00,
    formattedPrice: '$320.00',
    category: 'Leather Jackets',
    description: 'Full-grain lambskin leather asymmetric biker jacket with hand-distressed edges, heavyweight gunmetal hardware, and cupro silk lining with woven HashtagsX atelier tag.',
    details: [
      '100% full-grain hand-selected lambskin leather (1.2mm thickness)',
      'Custom gunmetal YKK Excella zippers with engraved HX# pulls',
      'Asymmetric lapel collar with hidden snap-down buttons',
      'Japanese breathable cupro lining for supreme comfort',
      'Action-back shoulder gussets for unrestricted mobility'
    ],
    materials: '100% Genuine Lambskin Leather / 100% Cupro Lining',
    fit: 'Tailored biker silhouette with structured shoulders.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: ['Washed Pitch Black', 'Vintage Coffee Brown'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    inStock: true
  },
  {
    id: 'hx-racer-leather-jacket',
    slug: 'hx-racer-leather-jacket',
    title: 'Cafe Racer Minimal Leather Jacket',
    price: 290.00,
    formattedPrice: '$290.00',
    category: 'Leather Jackets',
    description: 'Minimalist mandarin collar cafe racer jacket crafted from buttery-soft supple calfskin. Clean geometric panel lines and discreet side-entry zip pockets.',
    details: [
      '100% premium smooth calfskin leather',
      'Mandarin collar with snap button latch',
      'Two vertical zip chest pockets and internal welt passport pocket',
      'Bi-swing back pleats for ergonomic driving posture',
      'Handcrafted in Tuscany, Italy'
    ],
    materials: '100% Premium Calfskin Leather',
    fit: 'Slim athletic fit. Size up for layering over knitwear.',
    images: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: ['Matte Black', 'Dark Cognac'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    inStock: true
  },
  {
    id: 'hx-shearling-bomber',
    slug: 'hx-shearling-bomber',
    title: 'Aviator Shearling Leather Bomber',
    price: 360.00,
    formattedPrice: '$360.00',
    category: 'Leather Jackets',
    description: 'Heavyweight aviator bomber crafted from cracked nappa leather with plush genuine shearling collar and thermal insulated interior.',
    details: [
      'Nappa leather shell with weather-resistant wax treatment',
      '100% natural shearling turn-down collar and cuffs',
      'Dual throat latch buckles with antique brass hardware',
      'Heavy-duty storm flap with reinforced zip enclosure'
    ],
    materials: '100% Genuine Nappa Leather & Shearling',
    fit: 'Relaxed bomber cut.',
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: ['Vintage Black Shearling', 'Tobacco Tan'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    inStock: true
  },

  // --- SHIRTS ---
  {
    id: 'neutral-grotesk',
    slug: 'neutral-grotesk',
    title: 'Neutral Grotesk Tee',
    price: 30.00,
    formattedPrice: '$30.00',
    category: 'Shirts',
    description: 'Carefully designed signature piece celebrating minimalist typography and contemporary oversized streetwear cuts. Crafted from premium 240 GSM organic heavyweight cotton.',
    details: [
      '100% heavyweight organic combed cotton (240 GSM)',
      'Pre-shrunk fabric with vintage washed garment dye',
      'Silkscreen printed HashtagsX typographic artwork on chest & back',
      'Ribbed collar with reinforced double-needle stitching'
    ],
    materials: '100% Organic Cotton',
    fit: 'Boxy, slightly oversized fit.',
    images: [
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/t-shirt-time-off-outfit_dfee3661-54e4-43ab-8d38-34388179952d.jpg',
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/t-shirt-time-off-outfit-2_6ed63e49-09af-4ab5-9994-7f1fef44c587.jpg'
    ],
    colors: ['Off-White', 'Obsidian Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
    inStock: true
  },
  {
    id: 'hx-poplin-overshirt',
    slug: 'hx-poplin-overshirt',
    title: 'Architect Poplin Overshirt',
    price: 65.00,
    formattedPrice: '$65.00',
    category: 'Shirts',
    description: 'Crisp 120-thread count Italian cotton poplin overshirt with boxy camp collar, magnetic chest utility pocket, and mother-of-pearl buttons.',
    details: [
      '100% high-density Italian cotton poplin',
      'Convertible camp collar with top button loop',
      'Reinforced twin utility chest pockets',
      'Laser-engraved mother-of-pearl buttons'
    ],
    materials: '100% Premium Cotton Poplin',
    fit: 'Structured square hem boxy cut.',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: ['Chalk White', 'Steel Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    inStock: true
  },
  {
    id: 'hello-week-001',
    slug: 'hello-week-001',
    title: 'Hello Week 001 Shirt',
    price: 30.00,
    formattedPrice: '$30.00',
    category: 'Shirts',
    description: 'Editorial graphic tee commemorating experimental creative sprints. Clean Swiss typography with subtle tactile micro-embossing.',
    details: [
      '220 GSM combed single jersey',
      'Water-based discharge screenprint',
      'Pre-shrunk with enzyme wash finish',
      'HashtagsX woven label at hem'
    ],
    materials: '100% Ringspun Cotton',
    fit: 'Standard unisex fit.',
    images: [
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/t-shirt-hello-week-white-outfit.jpg',
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/t-shirt-hello-week-white-outfit-2_cc70839b-bea7-4957-9262-f38ff0e9f505.jpg'
    ],
    colors: ['Chalk White', 'Pitch Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    inStock: true
  },
  {
    id: 'whitespace-matters',
    slug: 'whitespace-matters-1',
    title: 'Whitespace Matters Shirt',
    price: 33.00,
    formattedPrice: '$33.00',
    category: 'Shirts',
    description: 'An ode to layout breathing room and editorial discipline. Premium heavyweight cotton with subtle micro-print placement at rear neckline.',
    details: [
      '240 GSM organic cotton',
      'Drop shoulder relaxed silhouette',
      'Screenprinted slogan and logo detailing',
      'Garment washed for ultra-soft hand feel'
    ],
    materials: '100% Organic Combed Cotton',
    fit: 'Oversized boxy cut.',
    images: [
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/t-shirt-_-white-outfit.jpg',
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/t-shirt-_-white-outfit-2_0b43b5d9-98ff-4e64-ada9-a205c95b70f1.jpg'
    ],
    colors: ['Optic White', 'Off-Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    inStock: true
  },

  // --- BOTTOMS ---
  {
    id: 'hx-tactical-cargo-pant',
    slug: 'hx-tactical-cargo-pant',
    title: 'Tactical Modular Cargo Pant',
    price: 88.00,
    formattedPrice: '$88.00',
    category: 'Bottoms',
    description: 'Heavyweight ripstop technical cargo trousers with 3D pleated bellow pockets, articulated knee darts, and adjustable bungee toggles at ankles.',
    details: [
      '320 GSM military-grade cotton-nylon ripstop',
      '6 modular storage pockets with magnetic storm flaps',
      'Articulated 3D knee construction for ergonomic movement',
      'Elasticated waistband with built-in Fidlock-inspired webbed belt',
      'Water and stain repellent Teflon finish'
    ],
    materials: '70% Cotton, 30% Cordura Nylon Ripstop',
    fit: 'Relaxed tapered leg with adjustable hem bungees.',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: ['Stealth Black', 'Olive Drab'],
    sizes: ['S (30)', 'M (32)', 'L (34)', 'XL (36)'],
    isNew: true,
    inStock: true
  },
  {
    id: 'hx-heavy-sweatpant',
    slug: 'hx-heavy-sweatpant',
    title: 'Heavyweight Studio Sweatpant',
    price: 75.00,
    formattedPrice: '$75.00',
    category: 'Bottoms',
    description: '500 GSM loopback cotton fleece sweatpants with deep slant pockets, concealed zippered rear pocket, and thick elasticated waistband.',
    details: [
      '500 GSM heavyweight organic loopback cotton',
      'Deep jersey-lined side pockets',
      'Heavy cotton drawstring with dipped silicone tips',
      'Reinforced gusset crotch for maximum comfort'
    ],
    materials: '100% Organic Cotton',
    fit: 'Straight leg relaxed drape.',
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: ['Washed Heather Grey', 'Obsidian Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    inStock: true
  },
  {
    id: 'hx-tailored-shorts',
    slug: 'hx-tailored-shorts',
    title: 'Pleated Atelier Studio Shorts',
    price: 55.00,
    formattedPrice: '$55.00',
    category: 'Bottoms',
    description: 'Double-pleated tailored wide-leg shorts crafted from structured high-twist cotton twill. Above-the-knee length with clean pressed creases.',
    details: [
      '280 GSM high-twist cotton twill',
      'Front double pleats and tab closure waistband',
      'Rear double-welt pockets with horn buttons',
      '8-inch inseam tailored cut'
    ],
    materials: '100% Cotton Twill',
    fit: 'Wide leg tailored silhouette.',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: ['Concrete Grey', 'Midnight Navy'],
    sizes: ['S (30)', 'M (32)', 'L (34)', 'XL (36)'],
    isNew: true,
    inStock: true
  },

  // --- SPORTS & ACTIVEWEAR ---
  {
    id: 'specimen-no-hh01',
    slug: 'specimen-no-hh01',
    title: 'Specimen No. HX01 Athletic Jersey',
    price: 45.00,
    formattedPrice: '$45.00',
    category: 'Sports',
    description: 'Athletic-inspired technical graphic jersey combining geometric blocks with moisture-wicking micro-mesh fibers and typographic specimen stamps.',
    details: [
      '230 GSM technical moisture-wicking breathable knit',
      'Sublimated geometric color block graphics',
      'Drop-tail hem with split side seams',
      'HashtagsX atelier woven patch at hem'
    ],
    materials: '90% Recycled Polyester, 10% Spandex Micro-Mesh',
    fit: 'Standard athletic performance fit.',
    images: [
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/jersey-red-square-outfit_d6d9ae9b-b22d-4eed-93e2-8b0913b773f4.jpg',
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/jersey-red-square-outfit-2_7d8ec371-d660-43a7-a08d-9ef1eb053caf.jpg'
    ],
    colors: ['Signal Red / Off-White', 'Monochrome Stealth'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    inStock: true
  },
  {
    id: 'hx-running-windbreaker',
    slug: 'hx-running-windbreaker',
    title: 'Aero Windbreaker Track Top',
    price: 90.00,
    formattedPrice: '$90.00',
    category: 'Sports',
    description: 'Ultra-lightweight packable performance windbreaker engineered from tear-resistant ripstop nylon with reflective 3M HashtagsX motifs and rear ventilation flap.',
    details: [
      'Ultralight 70D ripstop with DWR water-resistant shield',
      'Reflective 3M Scotchlite logo graphics across chest and spine',
      'Packs down into interior zippered chest pocket',
      'Laser-perforated underarm ventilation panels'
    ],
    materials: '100% Recycled Ripstop Nylon',
    fit: 'Athletic windbreaker fit with drop-tail hem.',
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: ['Signal Silver / Black', 'Volt Yellow'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    inStock: true
  },
  {
    id: 'hx-compression-shorts',
    slug: 'hx-compression-shorts',
    title: 'Velocity 2-in-1 Training Short',
    price: 48.00,
    formattedPrice: '$48.00',
    category: 'Sports',
    description: 'High-performance 2-in-1 running shorts featuring built-in supportive compression liner with phone pocket and ventilated lightweight outer shell.',
    details: [
      '4-way stretch moisture-wicking woven shell',
      'Anti-chafe compression inner short with drop-in phone sleeve',
      'Rear sweat-proof zippered keys and card pocket',
      'Reflective heat-transfer branding'
    ],
    materials: '88% Polyester, 12% Spandex',
    fit: '5-inch outer inseam with 7-inch compression liner.',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: ['Matte Black', 'Reflective Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    inStock: true
  },

  // --- ACCESSORIES & BAGS ---
  {
    id: 'gridlocked',
    slug: 'gridlocked',
    title: 'Gridlocked Industrial Tote',
    price: 25.00,
    formattedPrice: '$25.00',
    category: 'Accessories',
    description: 'Industrial-grade canvas tote with modular compartments and reinforced webbing handles. Built to carry laptops, sketchbook folios, and everyday essentials.',
    details: [
      '16oz heavy-duty washed cotton canvas',
      'Internal 15" laptop sleeve and zipped key pocket',
      'Reinforced box-stitch handles with 30cm drop',
      'Screenprinted mathematical grid matrix'
    ],
    materials: '100% Heavyweight Cotton Canvas',
    fit: 'Dimensions: 42cm x 38cm x 12cm. 20L capacity.',
    images: [
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/metalbag.jpg',
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/totebag-metal-outfit-2_e18d8c17-2359-4dc2-9bf1-80277d681c17.jpg'
    ],
    colors: ['Raw Ecru', 'Concrete Grey'],
    sizes: ['One Size'],
    isNew: true,
    inStock: true
  },
  {
    id: 'red-dot-not-award-1',
    slug: 'red-dot-not-award-1',
    title: 'Red Dot Not Award Beanie',
    price: 20.00,
    formattedPrice: '$20.00',
    category: 'Accessories',
    description: 'Waffle-knit architectural beanie featuring contrast embroidered design accents. Designed for superior temperature regulation and understated studio flair.',
    details: [
      '100% recycled merino wool blend',
      'Double-layer ribbed cuff with embroidered HashtagsX monogram',
      'Snug, form-fitting silhouette',
      'Hypoallergenic and breathable knit structure'
    ],
    materials: '70% Merino Wool, 30% Recycled Acrylic',
    fit: 'One size fits all.',
    images: [
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/beanie-_-red-outfit_2c3b211f-1507-4f73-817f-2b124d7daa33.jpg',
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/beanie-_-red-outfit-PLSNOUSAR_d2a91372-9ff5-4285-bff4-4b44bb9b4ff8.jpg'
    ],
    colors: ['Crimson Red', 'Charcoal'],
    sizes: ['One Size'],
    isNew: false,
    inStock: true
  },
  {
    id: 'kerned-confidence',
    slug: 'kerned-confidence-1',
    title: 'Kerned Confidence Strapback Cap',
    price: 25.00,
    formattedPrice: '$25.00',
    category: 'Accessories',
    description: 'Low-profile 6-panel unstructured dad cap featuring tonal embroidery of the HashtagsX glyph and brass strapback closure.',
    details: [
      '100% washed cotton twill',
      'Embroidered ventilation eyelets',
      'Custom metal clasp with embossed HX# logo',
      'Curved brim with memory form core'
    ],
    materials: '100% Cotton Twill',
    fit: 'Adjustable strapback (54cm – 62cm)',
    images: [
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/cap-_-black-outfit_9a3389f2-3570-4130-8abc-c7d891c7c073.jpg',
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/cap-_-black-outfit-2_a4c86e6e-f97a-455c-ba4e-1bdca4ba2b86.jpg'
    ],
    colors: ['Matte Black', 'Dark Olive'],
    sizes: ['One Size'],
    isNew: true,
    inStock: true
  },
  {
    id: 'command-k',
    slug: 'command-k',
    title: 'Command + K Keychain Lanyard',
    price: 15.00,
    formattedPrice: '$15.00',
    category: 'Accessories',
    description: 'Anodized aluminum quick-release tactical keychain lanyard with laser-etched keyboard shortcut motifs and heavy-duty carabiner clip.',
    details: [
      'Precision CNC milled aluminum alloy hardware',
      'High-strength nylon climbing webbing',
      'Spring-loaded gate carabiner',
      'Laser-engraved HashtagsX insignia'
    ],
    materials: 'Aircraft Grade Aluminum & Nylon',
    fit: 'Length: 18cm total',
    images: [
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/keychain-_-black-outfit.jpg',
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/keychain-_-black-outfit-2_02a9a427-baa1-4c60-9d73-cae05294aea0.jpg'
    ],
    colors: ['Anodized Stealth Black'],
    sizes: ['One Size'],
    isNew: false,
    inStock: true
  },
  {
    id: 'grid-system-go',
    slug: 'grid-system-go',
    title: 'Grid System Go Rolltop Backpack',
    price: 30.00,
    formattedPrice: '$30.00',
    category: 'Accessories',
    description: 'Technical recycled rolltop commuter backpack engineered for creative gear, modular storage, and all-weather city commuting.',
    details: [
      '600D recycled waterproof ripstop polyester',
      'Padded 16" MacBook Pro sleeve with water-resistant YKK zipper',
      'Ergonomic air-mesh back panel and contoured shoulder straps',
      'Hidden passport and tracker pocket'
    ],
    materials: '100% Recycled Ripstop Cordura',
    fit: '24L Expandable to 30L',
    images: [
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/mochila1.jpg',
      'https://cdn.shopify.com/s/files/1/0665/1455/0837/files/backpack-recycled-black-outfit-3_e9a01867-b304-4957-bb6f-e92759717401.jpg'
    ],
    colors: ['Stealth Obsidian', 'Slate Grey'],
    sizes: ['One Size'],
    isNew: true,
    inStock: true
  }
];
