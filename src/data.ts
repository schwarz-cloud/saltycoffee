export type Category =
  | 'coffee'
  | 'tea'
  | 'lattes'
  | 'cold'
  | 'smoothies'
  | 'juices'

export type MenuItem = {
  id: string
  name: string
  blurb: string
  price: number
  category: Category
  tags?: string[]
}

export type MerchItem = {
  id: string
  name: string
  blurb: string
  price: number
  hue: string
}

export type Post = {
  slug: string
  title: string
  season: string
  date: string
  excerpt: string
  body: string[]
  read: string
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'coffee', label: 'Coffee' },
  { id: 'tea', label: 'Tea' },
  { id: 'lattes', label: 'Specialty lattes' },
  { id: 'cold', label: 'Cold drinks' },
  { id: 'smoothies', label: 'Smoothies' },
  { id: 'juices', label: 'Juices' },
]

export const MENU: MenuItem[] = [
  {
    id: 'house-drip',
    name: 'House Drip',
    blurb: 'Rotating single origin. Unsweetened, unapologetic.',
    price: 3.5,
    category: 'coffee',
    tags: ['classic'],
  },
  {
    id: 'salty-pour',
    name: 'Salty Pour Over',
    blurb: 'V60, slow and bright. A pinch of sea salt on the finish.',
    price: 5.25,
    category: 'coffee',
    tags: ['signature'],
  },
  {
    id: 'espresso',
    name: 'Espresso',
    blurb: 'Two shots, thick crema, no small talk.',
    price: 3.75,
    category: 'coffee',
  },
  {
    id: 'americano',
    name: 'Americano',
    blurb: 'Espresso stretched with hot water. Clean and stern.',
    price: 4.0,
    category: 'coffee',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    blurb: 'Equal parts espresso, steamed milk, foam hat.',
    price: 4.75,
    category: 'coffee',
  },
  {
    id: 'mocha-brine',
    name: 'Mocha Brine',
    blurb: 'Dark cocoa, espresso, flaky salt. Dessert with an edge.',
    price: 5.75,
    category: 'coffee',
    tags: ['signature'],
  },
  {
    id: 'earl-grey',
    name: 'Earl Grey Fog',
    blurb: 'Bergamot, steamed milk, honey optional (we will judge).',
    price: 4.5,
    category: 'tea',
  },
  {
    id: 'sencha',
    name: 'Sencha Steam',
    blurb: 'Grassy Japanese green. Served at the right temperature, not boiling.',
    price: 4.25,
    category: 'tea',
  },
  {
    id: 'chai',
    name: 'Masala Chai',
    blurb: 'Cardamom-forward, house-steeped, not a syrup impersonation.',
    price: 4.75,
    category: 'tea',
  },
  {
    id: 'hibiscus',
    name: 'Hibiscus Tide',
    blurb: 'Tart petals, citrus peel, iced or hot.',
    price: 4.25,
    category: 'tea',
  },
  {
    id: 'croissant-latte',
    name: 'Croissant Hair Latte',
    blurb: 'Brown butter syrup, espresso, oat or whole. Our mascot in a cup.',
    price: 6.25,
    category: 'lattes',
    tags: ['signature'],
  },
  {
    id: 'salted-caramel',
    name: 'Salted Caramel Latte',
    blurb: 'Real caramel, smoked salt, not a candy bar.',
    price: 5.95,
    category: 'lattes',
  },
  {
    id: 'lavender',
    name: 'Lavender Brine Latte',
    blurb: 'Floral, savory, weird in the best way.',
    price: 6.0,
    category: 'lattes',
    tags: ['seasonal'],
  },
  {
    id: 'pistachio',
    name: 'Pistachio Sea Latte',
    blurb: 'Toasted pistachio, espresso, a whisper of olive oil.',
    price: 6.5,
    category: 'lattes',
    tags: ['seasonal'],
  },
  {
    id: 'dirty-chai',
    name: 'Dirty Chai Latte',
    blurb: 'Masala chai plus a shot. For people who need both.',
    price: 5.85,
    category: 'lattes',
  },
  {
    id: 'cold-brew',
    name: '18-Hour Cold Brew',
    blurb: 'Steeped overnight. Smooth, bitter, no ice-melt excuses.',
    price: 5.0,
    category: 'cold',
  },
  {
    id: 'nitro',
    name: 'Nitro Salty',
    blurb: 'Cascading cold brew with a saline rim.',
    price: 5.5,
    category: 'cold',
    tags: ['signature'],
  },
  {
    id: 'iced-shaker',
    name: 'Espresso Shakerato',
    blurb: 'Shaken espresso, citrus peel, optional splash of tonic.',
    price: 5.75,
    category: 'cold',
  },
  {
    id: 'iced-tea',
    name: 'Black Iced Tea',
    blurb: 'House-brewed, lemon optional, sugar on the side.',
    price: 3.75,
    category: 'cold',
  },
  {
    id: 'berry-smoo',
    name: 'Tide Pool Berry',
    blurb: 'Strawberry, blueberry, banana, coconut water.',
    price: 7.25,
    category: 'smoothies',
  },
  {
    id: 'green-smoo',
    name: 'Seaweed-No Kale',
    blurb: 'Spinach, mango, ginger, lime. Green without the lecture.',
    price: 7.5,
    category: 'smoothies',
  },
  {
    id: 'coffee-smoo',
    name: 'Cold Brew Smoothie',
    blurb: 'Banana, cold brew, almond butter, cocoa nibs.',
    price: 7.75,
    category: 'smoothies',
    tags: ['signature'],
  },
  {
    id: 'orange',
    name: 'Fresh Orange',
    blurb: 'Squeezed to order. Pulp is not a personality.',
    price: 5.5,
    category: 'juices',
  },
  {
    id: 'grapefruit',
    name: 'Salty Grapefruit',
    blurb: 'Ruby grapefruit, sea salt, cracked pepper.',
    price: 5.75,
    category: 'juices',
    tags: ['signature'],
  },
  {
    id: 'green-juice',
    name: 'Celery Coast',
    blurb: 'Celery, cucumber, green apple, lemon.',
    price: 6.5,
    category: 'juices',
  },
]

export const MERCH: MerchItem[] = [
  {
    id: 'mug-rust',
    name: 'Croissant Mug',
    blurb: 'Ceramic diner mug, rust glaze, mascot on the belly.',
    price: 22,
    hue: '#C24B32',
  },
  {
    id: 'mug-cream',
    name: 'Foam Mug',
    blurb: 'Cream glaze with rust line-art. Dishwasher brave.',
    price: 22,
    hue: '#F4E9D8',
  },
  {
    id: 'tote',
    name: 'Briny Tote',
    blurb: 'Heavy canvas. Holds beans, books, and mild regret.',
    price: 28,
    hue: '#2F6B68',
  },
  {
    id: 'tee',
    name: 'SALTY Tee',
    blurb: 'Heavyweight cream tee, arched wordmark.',
    price: 32,
    hue: '#E7D3B8',
  },
  {
    id: 'beans',
    name: 'House Beans 12oz',
    blurb: 'Our Venice roast. Chocolate, citrus, a little attitude.',
    price: 18,
    hue: '#6B2418',
  },
  {
    id: 'beanie',
    name: 'Croissant Beanie',
    blurb: 'Knit rust beanie. Hair optional.',
    price: 26,
    hue: '#9A3220',
  },
]

export const POSTS: Post[] = [
  {
    slug: 'fall-pour-over',
    title: 'Fall pour-over: go coarser than your pride',
    season: 'Autumn',
    date: 'Oct 1, 2026',
    read: '4 min',
    excerpt:
      'Cooler air dries beans faster. If your cup tastes like a wooden spoon, it is not the season — it is your grind.',
    body: [
      'When the marine layer finally gives up, Venice mornings get crisp and your kitchen humidity drops. Beans that bloomed like a soufflé in August now gasp.',
      'Grind a notch coarser than you did in summer. Keep the water at 200°F, not a rolling boil. Bloom 45 seconds with twice the weight of the dose in water.',
      'Finish with a slow spiral. Taste before you add anything. If it still needs salt, use a pinch of flaky sea salt after the brew — never in the kettle.',
      'Pair it with a croissant. Obviously.',
    ],
  },
  {
    slug: 'iced-latte-winter',
    title: 'Why we still ice lattes in January',
    season: 'Winter',
    date: 'Jan 12, 2026',
    read: '3 min',
    excerpt:
      'Cold drinks are not a weather report. They are a texture. Here is how to shake a winter latte that does not taste like melted snow.',
    body: [
      'Use coffee ice cubes made from leftover drip. Regular ice is a traitor.',
      'Shake espresso, milk, and two cubes hard for fifteen seconds. Strain over fresh cubes. The foam should look like a storm cloud, not dish soap.',
      'Skip the pumpkin spice unless you can name the spices. Cinnamon, ginger, nutmeg. If your bottle says “autumn” we will send you outside.',
    ],
  },
  {
    slug: 'spring-bloom',
    title: 'Spring bloom: washing your kettle personality',
    season: 'Spring',
    date: 'Mar 18, 2026',
    read: '5 min',
    excerpt:
      'Scale in your kettle is not rustic. It is old coffee ghosts. A seasonal descaling ritual, plus a brighter ratio for new-crop Ethiopians.',
    body: [
      'Fill the kettle with equal parts water and white vinegar. Simmer 15 minutes. Rinse until it no longer smells like a salad.',
      'New-crop spring coffees want a 1:16 ratio and a slightly hotter pour. Let them be floral. Do not bury them in oat milk unless you mean it.',
      'If you join Salty Rewards this month, a free descaling tablet comes with your third drink. We are not above bribes.',
    ],
  },
  {
    slug: 'summer-cold-brew',
    title: 'Summer cold brew without the swamp',
    season: 'Summer',
    date: 'Jun 8, 2026',
    read: '4 min',
    excerpt:
      'Eighteen hours is a suggestion, not a personality. Over-steeped cold brew tastes like a wet ashtray with a loyalty card.',
    body: [
      'Coarse grind. 1:8 concentrate. Room temperature water. Lid on, fridge optional — counter is fine if your kitchen is not a greenhouse.',
      'Strain through a paper filter after the metal one. Sediment is not “body.” Dilute 1:1 with water or milk.',
      'Finish with a saline dash if you are one of us. If you add vanilla sweet cream, sit at the table by the window so we can watch from a safe distance.',
    ],
  },
]

export const REVIEWS = [
  {
    name: 'Mira K.',
    stars: 5,
    text: 'The croissant-hair latte is illegal levels of good. Staff roasted my oat-milk order and then made it perfectly.',
    city: 'Venice',
  },
  {
    name: 'Jonas P.',
    stars: 5,
    text: 'Finally a shop that lets coffee taste like coffee. The nitro with a salt rim converted my sweet-tooth roommate.',
    city: 'Santa Monica',
  },
  {
    name: 'Asha R.',
    stars: 4,
    text: 'Came for the mascot, stayed for the pour-over. Rewards points actually posted before I left the counter.',
    city: 'Mar Vista',
  },
  {
    name: 'Leo S.',
    stars: 5,
    text: 'Bought the rust mug, now I have a problem. Also the grapefruit juice is a personality test I keep passing.',
    city: 'Culver City',
  },
]

export const SOCIAL = [
  { handle: '@saltycoffee', caption: 'Hair like pastry. Attitude like espresso.', tone: 'rust' },
  { handle: '@saltycoffee', caption: 'Some like it sweet. We do not.', tone: 'cream' },
  { handle: '@saltycoffee', caption: 'New pistachio sea latte. Limited, like our patience.', tone: 'teal' },
  { handle: '@saltycoffee', caption: 'Tote restock. Bring your own existential crisis.', tone: 'ink' },
  { handle: '@saltycoffee', caption: 'Sunday crossword + house drip. Table for one is a vibe.', tone: 'blush' },
  { handle: '@saltycoffee', caption: 'Venice light, rust walls, loud kettle.', tone: 'rust' },
]

export const HOURS = [
  ['Mon–Sun', '7:00am – 11:00pm'],
]

export const CAFE = {
  name: 'SaltyCoffee',
  address: 'Yakut sokak, Ahiram Apt, Zemin Kat, Yenikent, Lefkoşa  KKTC',
  phone: '(310) 555-0192',
  lat: 35.201674,
  lng: 33.302006,
}

export const REWARDS = [
  { pts: 50, perk: 'Free pastry' },
  { pts: 100, perk: 'Free drip or tea' },
  { pts: 180, perk: 'Free specialty latte' },
  { pts: 250, perk: 'Merch 20% off' },
]
