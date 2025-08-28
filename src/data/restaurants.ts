// Restaurant and Menu Item Interfaces
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Pancakes & Waffles' | 'Eggs & Benedicts' | 'Pastries & Baked Goods' | 'Sandwiches & Wraps' | 'Beverages' | 'Sides';
}

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  rating: number;
  priceLevel: 1 | 2 | 3 | 4; // 1 = $, 2 = $$, 3 = $$$, 4 = $$$$
  menuItems: MenuItem[];
}

// 50 Breakfast Restaurants in Portland, Oregon
export const portlandBreakfastRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Rose City Morning",
    description: "Farm-to-table breakfast featuring organic ingredients from local Oregon farms. Known for their creative twists on classic breakfast dishes.",
    address: "1234 SE Hawthorne Blvd, Portland, OR 97214",
    latitude: 45.5122,
    longitude: -122.6587,
    phone: "(503) 555-0101",
    rating: 4.7,
    priceLevel: 3,
    menuItems: [
      {
        id: "r1-m1",
        name: "Oregon Berry Pancakes",
        description: "Three fluffy buttermilk pancakes topped with fresh Oregon blueberries, marionberries, and maple syrup",
        price: 14.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r1-m2",
        name: "Cascade Benedict",
        description: "House-made English muffin with smoked salmon, poached eggs, and hollandaise sauce",
        price: 16.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r1-m3",
        name: "Portland Sunrise Wrap",
        description: "Scrambled eggs with local cheddar, avocado, bacon, and hash browns in a spinach tortilla",
        price: 12.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r1-m4",
        name: "Stumptown Cold Brew",
        description: "Locally roasted cold brew coffee served over ice",
        price: 4.50,
        category: "Beverages"
      },
      {
        id: "r1-m5",
        name: "Marionberry Scones",
        description: "Freshly baked scones with Oregon marionberries and vanilla glaze",
        price: 5.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r1-m6",
        name: "Crispy Hash Browns",
        description: "Golden brown potato hash with herbs and sea salt",
        price: 6.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 2,
    name: "Bridge City Bites",
    description: "Classic American diner with generous portions and friendly service. A Portland institution since 1987.",
    address: "2456 NW 23rd Ave, Portland, OR 97210",
    latitude: 45.5289,
    longitude: -122.6984,
    phone: "(503) 555-0202",
    rating: 4.3,
    priceLevel: 2,
    menuItems: [
      {
        id: "r2-m1",
        name: "Lumberjack Stack",
        description: "Four buttermilk pancakes with bacon, sausage, and two eggs any style",
        price: 13.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r2-m2",
        name: "Country Fried Steak Benedict",
        description: "Country fried steak on buttermilk biscuit with poached eggs and sausage gravy",
        price: 15.25,
        category: "Eggs & Benedicts"
      },
      {
        id: "r2-m3",
        name: "Apple Cinnamon Danish",
        description: "Flaky pastry filled with spiced apples and cinnamon sugar",
        price: 4.75,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r2-m4",
        name: "Breakfast Burger",
        description: "Beef patty with fried egg, bacon, cheese, and hash browns on a brioche bun",
        price: 14.50,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r2-m5",
        name: "Fresh Orange Juice",
        description: "Freshly squeezed Valencia orange juice",
        price: 3.95,
        category: "Beverages"
      },
      {
        id: "r2-m6",
        name: "Buttermilk Biscuits",
        description: "Two warm biscuits with honey butter",
        price: 5.50,
        category: "Sides"
      }
    ]
  },
  {
    id: 3,
    name: "Mt. Hood Morning Glory",
    description: "Mountain-inspired breakfast spot with hearty dishes and stunning views of the Cascade Range.",
    address: "789 SE Division St, Portland, OR 97202",
    latitude: 45.5048,
    longitude: -122.6540,
    phone: "(503) 555-0303",
    rating: 4.6,
    priceLevel: 3,
    menuItems: [
      {
        id: "r3-m1",
        name: "Summit Waffle",
        description: "Belgian waffle with whipped cream, fresh berries, and maple syrup",
        price: 11.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r3-m2",
        name: "Mountaineer's Benedict",
        description: "Toasted English muffin with Canadian bacon, poached eggs, and chipotle hollandaise",
        price: 14.75,
        category: "Eggs & Benedicts"
      },
      {
        id: "r3-m3",
        name: "Trail Mix Granola Bowl",
        description: "House-made granola with yogurt, honey, and seasonal fruit",
        price: 9.25,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r3-m4",
        name: "Alpine Breakfast Sandwich",
        description: "Scrambled eggs, Swiss cheese, and ham on a croissant",
        price: 10.50,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r3-m5",
        name: "Cascade Coffee",
        description: "Medium roast coffee blend with notes of chocolate and nuts",
        price: 3.75,
        category: "Beverages"
      },
      {
        id: "r3-m6",
        name: "Breakfast Potatoes",
        description: "Roasted red potatoes with rosemary and garlic",
        price: 5.95,
        category: "Sides"
      },
      {
        id: "r3-m7",
        name: "Blueberry Muffin",
        description: "Fresh baked muffin bursting with wild blueberries",
        price: 4.25,
        category: "Pastries & Baked Goods"
      }
    ]
  },
  {
    id: 4,
    name: "Pearl District Pantry",
    description: "Upscale breakfast café in the heart of Portland's Pearl District, featuring artisanal ingredients and innovative presentations.",
    address: "1122 NW Couch St, Portland, OR 97209",
    latitude: 45.5234,
    longitude: -122.6815,
    phone: "(503) 555-0404",
    rating: 4.5,
    priceLevel: 4,
    menuItems: [
      {
        id: "r4-m1",
        name: "Truffle Scramble",
        description: "Soft scrambled eggs with truffle oil, chives, and crème fraîche",
        price: 18.00,
        category: "Eggs & Benedicts"
      },
      {
        id: "r4-m2",
        name: "Ricotta Hotcakes",
        description: "Light and fluffy ricotta pancakes with lemon zest and berry compote",
        price: 16.50,
        category: "Pancakes & Waffles"
      },
      {
        id: "r4-m3",
        name: "Avocado Toast Deluxe",
        description: "Multigrain toast with smashed avocado, heirloom tomatoes, and everything seasoning",
        price: 13.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r4-m4",
        name: "Artisan Croissant",
        description: "Buttery French croissant with seasonal jam",
        price: 6.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r4-m5",
        name: "Single Origin Pour Over",
        description: "Rotating selection of single origin coffees brewed to order",
        price: 5.50,
        category: "Beverages"
      },
      {
        id: "r4-m6",
        name: "Smoked Salmon Plate",
        description: "House-cured salmon with capers, red onion, and cream cheese",
        price: 15.95,
        category: "Sides"
      }
    ]
  },
  {
    id: 5,
    name: "Hawthorne Hearth",
    description: "Cozy neighborhood spot known for their wood-fired cooking and locally sourced ingredients.",
    address: "3344 SE Hawthorne Blvd, Portland, OR 97214",
    latitude: 45.5122,
    longitude: -122.6301,
    phone: "(503) 555-0505",
    rating: 4.4,
    priceLevel: 2,
    menuItems: [
      {
        id: "r5-m1",
        name: "Sourdough Pancakes",
        description: "Three pancakes made from our 20-year-old sourdough starter",
        price: 10.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r5-m2",
        name: "Farmers Benedict",
        description: "Fresh biscuit with bacon, poached eggs, and country gravy",
        price: 13.25,
        category: "Eggs & Benedicts"
      },
      {
        id: "r5-m3",
        name: "Breakfast Burrito Supreme",
        description: "Scrambled eggs, chorizo, peppers, cheese, and salsa in a flour tortilla",
        price: 11.50,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r5-m4",
        name: "Cinnamon Roll",
        description: "House-made cinnamon roll with cream cheese icing",
        price: 5.75,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r5-m5",
        name: "Hot Chocolate",
        description: "Rich hot chocolate made with Belgian chocolate",
        price: 4.25,
        category: "Beverages"
      },
      {
        id: "r5-m6",
        name: "Applewood Bacon",
        description: "Three strips of thick-cut applewood smoked bacon",
        price: 6.50,
        category: "Sides"
      },
      {
        id: "r5-m7",
        name: "Steel Cut Oats",
        description: "Creamy steel cut oats with brown sugar and cinnamon",
        price: 7.95,
        category: "Pastries & Baked Goods"
      }
    ]
  },
  {
    id: 6,
    name: "Burnside Breakfast Bar",
    description: "Hip breakfast joint with creative cocktails and gourmet comfort food. Popular weekend brunch destination.",
    address: "567 E Burnside St, Portland, OR 97214",
    latitude: 45.5229,
    longitude: -122.6569,
    phone: "(503) 555-0606",
    rating: 4.2,
    priceLevel: 3,
    menuItems: [
      {
        id: "r6-m1",
        name: "Chicken & Waffles",
        description: "Fried chicken breast on Belgian waffle with spicy maple syrup",
        price: 15.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r6-m2",
        name: "Crab Cake Benedict",
        description: "House-made crab cakes with poached eggs and Old Bay hollandaise",
        price: 17.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r6-m3",
        name: "Breakfast Flatbread",
        description: "Naan bread with scrambled eggs, bacon, cheese, and arugula",
        price: 12.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r6-m4",
        name: "Bloody Mary",
        description: "House-made bloody mary with pickled vegetables and bacon rim",
        price: 9.50,
        category: "Beverages"
      },
      {
        id: "r6-m5",
        name: "Maple Pecan Danish",
        description: "Flaky pastry with maple glaze and toasted pecans",
        price: 5.25,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r6-m6",
        name: "Sweet Potato Hash",
        description: "Roasted sweet potatoes with peppers, onions, and herbs",
        price: 7.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 7,
    name: "Alberta Arts Café",
    description: "Artist-owned café featuring rotating local art and creative breakfast dishes inspired by global flavors.",
    address: "2211 NE Alberta St, Portland, OR 97211",
    latitude: 45.5587,
    longitude: -122.6432,
    phone: "(503) 555-0707",
    rating: 4.6,
    priceLevel: 2,
    menuItems: [
      {
        id: "r7-m1",
        name: "Matcha Pancakes",
        description: "Green tea pancakes with coconut whipped cream and mango",
        price: 12.50,
        category: "Pancakes & Waffles"
      },
      {
        id: "r7-m2",
        name: "Shakshuka",
        description: "Eggs poached in spiced tomato sauce with feta and herbs",
        price: 13.95,
        category: "Eggs & Benedicts"
      },
      {
        id: "r7-m3",
        name: "Banh Mi Breakfast Sandwich",
        description: "Vietnamese-inspired sandwich with eggs, pickled vegetables, and sriracha mayo",
        price: 10.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r7-m4",
        name: "Chai Latte",
        description: "House-made spiced chai with steamed milk",
        price: 4.75,
        category: "Beverages"
      },
      {
        id: "r7-m5",
        name: "Lavender Honey Biscuit",
        description: "Buttermilk biscuit with lavender honey butter",
        price: 4.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r7-m6",
        name: "Coconut Rice Pudding",
        description: "Creamy coconut rice with tropical fruit",
        price: 6.50,
        category: "Sides"
      },
      {
        id: "r7-m7",
        name: "Acai Bowl",
        description: "Acai smoothie bowl topped with granola, berries, and coconut",
        price: 11.25,
        category: "Pastries & Baked Goods"
      }
    ]
  },
  {
    id: 8,
    name: "Forest Grove Griddle",
    description: "Family-owned restaurant serving traditional American breakfast with a focus on quality and value.",
    address: "4567 SE Powell Blvd, Portland, OR 97202",
    latitude: 45.4971,
    longitude: -122.6147,
    phone: "(503) 555-0808",
    rating: 4.1,
    priceLevel: 1,
    menuItems: [
      {
        id: "r8-m1",
        name: "Short Stack",
        description: "Two fluffy buttermilk pancakes with butter and syrup",
        price: 7.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r8-m2",
        name: "Two Egg Breakfast",
        description: "Two eggs any style with toast and choice of meat",
        price: 8.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r8-m3",
        name: "Sausage Biscuit",
        description: "Buttermilk biscuit with sausage patty and egg",
        price: 6.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r8-m4",
        name: "Coffee",
        description: "Regular drip coffee, bottomless cup",
        price: 2.50,
        category: "Beverages"
      },
      {
        id: "r8-m5",
        name: "Toast & Jam",
        description: "Two slices of whole wheat toast with strawberry jam",
        price: 3.75,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r8-m6",
        name: "Hash Browns",
        description: "Crispy shredded potato hash",
        price: 4.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 9,
    name: "Willamette River Waffle House",
    description: "Specialty waffle house with over 20 unique waffle creations and river views from the patio.",
    address: "890 SW Naito Pkwy, Portland, OR 97204",
    latitude: 45.5152,
    longitude: -122.6784,
    phone: "(503) 555-0909",
    rating: 4.7,
    priceLevel: 2,
    menuItems: [
      {
        id: "r9-m1",
        name: "The Portlander",
        description: "Belgian waffle with Nutella, bananas, and whipped cream",
        price: 11.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r9-m2",
        name: "Savory Herb Waffle",
        description: "Herb waffle topped with scrambled eggs and hollandaise",
        price: 13.25,
        category: "Pancakes & Waffles"
      },
      {
        id: "r9-m3",
        name: "Waffle Benedict",
        description: "Waffle base with ham, poached eggs, and hollandaise sauce",
        price: 14.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r9-m4",
        name: "Strawberry Waffle",
        description: "Fresh strawberries and whipped cream on Belgian waffle",
        price: 10.75,
        category: "Pancakes & Waffles"
      },
      {
        id: "r9-m5",
        name: "Mimosa",
        description: "Fresh orange juice with champagne",
        price: 7.50,
        category: "Beverages"
      },
      {
        id: "r9-m6",
        name: "Waffle Sandwich",
        description: "Two mini waffles with eggs, cheese, and bacon",
        price: 9.95,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r9-m7",
        name: "Fresh Berry Bowl",
        description: "Mixed seasonal berries with honey yogurt",
        price: 6.95,
        category: "Sides"
      }
    ]
  },
  {
    id: 10,
    name: "Eastside Eats",
    description: "Modern breakfast spot featuring healthy options and locally roasted coffee in a bright, airy space.",
    address: "1357 SE Belmont St, Portland, OR 97214",
    latitude: 45.5165,
    longitude: -122.6521,
    phone: "(503) 555-1010",
    rating: 4.4,
    priceLevel: 3,
    menuItems: [
      {
        id: "r10-m1",
        name: "Quinoa Power Bowl",
        description: "Quinoa with roasted vegetables, avocado, and poached egg",
        price: 13.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r10-m2",
        name: "Protein Pancakes",
        description: "High-protein pancakes made with almond flour and Greek yogurt",
        price: 12.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r10-m3",
        name: "Green Goddess Wrap",
        description: "Spinach wrap with hummus, vegetables, and herb sauce",
        price: 10.25,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r10-m4",
        name: "Cold Pressed Juice",
        description: "Daily selection of fresh pressed vegetable and fruit juices",
        price: 6.50,
        category: "Beverages"
      },
      {
        id: "r10-m5",
        name: "Chia Pudding",
        description: "Overnight chia pudding with coconut milk and berries",
        price: 8.75,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r10-m6",
        name: "Roasted Vegetables",
        description: "Seasonal roasted vegetables with olive oil and herbs",
        price: 7.50,
        category: "Sides"
      }
    ]
  },
  {
    id: 11,
    name: "Multnomah Morning",
    description: "Classic breakfast diner with generous portions and old-school charm. A local favorite for over 30 years.",
    address: "2468 NE Sandy Blvd, Portland, OR 97232",
    latitude: 45.5319,
    longitude: -122.6389,
    phone: "(503) 555-1111",
    rating: 4.0,
    priceLevel: 1,
    menuItems: [
      {
        id: "r11-m1",
        name: "Grand Slam",
        description: "Three pancakes, two eggs, bacon, and sausage",
        price: 12.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r11-m2",
        name: "Denver Omelet",
        description: "Three-egg omelet with ham, peppers, onions, and cheese",
        price: 11.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r11-m3",
        name: "BLT Sandwich",
        description: "Bacon, lettuce, and tomato on toasted bread",
        price: 8.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r11-m4",
        name: "Hot Tea",
        description: "Selection of hot teas with honey",
        price: 2.95,
        category: "Beverages"
      },
      {
        id: "r11-m5",
        name: "English Muffin",
        description: "Toasted English muffin with butter and jam",
        price: 3.50,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r11-m6",
        name: "Sausage Links",
        description: "Three pork sausage links",
        price: 5.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 12,
    name: "Breakfast Club PDX",
    description: "Retro-themed breakfast spot with comfort food classics and nostalgic atmosphere.",
    address: "3691 SE Division St, Portland, OR 97202",
    latitude: 45.5048,
    longitude: -122.6254,
    phone: "(503) 555-1212",
    rating: 4.3,
    priceLevel: 2,
    menuItems: [
      {
        id: "r12-m1",
        name: "The Principal",
        description: "Stack of three chocolate chip pancakes with whipped butter",
        price: 11.25,
        category: "Pancakes & Waffles"
      },
      {
        id: "r12-m2",
        name: "Detention Benedict",
        description: "English muffin with ham, poached eggs, and sriracha hollandaise",
        price: 13.95,
        category: "Eggs & Benedicts"
      },
      {
        id: "r12-m3",
        name: "Hall Pass Wrap",
        description: "Breakfast wrap with eggs, cheese, hash browns, and salsa",
        price: 9.50,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r12-m4",
        name: "Chocolate Milk",
        description: "Rich chocolate milk made with real cocoa",
        price: 3.75,
        category: "Beverages"
      },
      {
        id: "r12-m5",
        name: "Pop-Tart French Toast",
        description: "French toast made with actual Pop-Tarts",
        price: 8.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r12-m6",
        name: "Tater Tots",
        description: "Crispy golden tater tots with ketchup",
        price: 5.75,
        category: "Sides"
      }
    ]
  },
  {
    id: 13,
    name: "Pioneer Pancakes",
    description: "Historic breakfast house specializing in traditional pancakes and syrup made from Oregon maple trees.",
    address: "741 SW Yamhill St, Portland, OR 97205",
    latitude: 45.5195,
    longitude: -122.6812,
    phone: "(503) 555-1313",
    rating: 4.5,
    priceLevel: 2,
    menuItems: [
      {
        id: "r13-m1",
        name: "Oregon Trail Stack",
        description: "Five buttermilk pancakes with real Oregon maple syrup",
        price: 13.50,
        category: "Pancakes & Waffles"
      },
      {
        id: "r13-m2",
        name: "Pioneer Benedict",
        description: "Biscuit with country ham, poached eggs, and sausage gravy",
        price: 14.25,
        category: "Eggs & Benedicts"
      },
      {
        id: "r13-m3",
        name: "Flapjack Sandwich",
        description: "Two pancakes with scrambled eggs and bacon in between",
        price: 10.95,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r13-m4",
        name: "Maple Coffee",
        description: "Coffee sweetened with real maple syrup",
        price: 4.25,
        category: "Beverages"
      },
      {
        id: "r13-m5",
        name: "Sourdough Toast",
        description: "Thick-cut sourdough toast with butter",
        price: 4.50,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r13-m6",
        name: "Canadian Bacon",
        description: "Three slices of lean Canadian bacon",
        price: 6.95,
        category: "Sides"
      }
    ]
  },
  {
    id: 14,
    name: "Sunnyside Up Café",
    description: "Cheerful neighborhood café known for their creative egg dishes and friendly service.",
    address: "852 SE Stark St, Portland, OR 97214",
    latitude: 45.5196,
    longitude: -122.6548,
    phone: "(503) 555-1414",
    rating: 4.2,
    priceLevel: 2,
    menuItems: [
      {
        id: "r14-m1",
        name: "Cloud Nine Pancakes",
        description: "Lemon ricotta pancakes with blueberry compote",
        price: 12.75,
        category: "Pancakes & Waffles"
      },
      {
        id: "r14-m2",
        name: "Sunny Side Benedict",
        description: "Cornbread with avocado, poached eggs, and chipotle hollandaise",
        price: 13.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r14-m3",
        name: "Breakfast Quesadilla",
        description: "Flour tortilla with eggs, cheese, peppers, and salsa",
        price: 9.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r14-m4",
        name: "Fresh Lemonade",
        description: "House-made lemonade with mint",
        price: 3.95,
        category: "Beverages"
      },
      {
        id: "r14-m5",
        name: "Banana Bread",
        description: "Warm banana bread with cinnamon butter",
        price: 5.25,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r14-m6",
        name: "Fresh Fruit Salad",
        description: "Seasonal fruit with honey lime dressing",
        price: 6.50,
        category: "Sides"
      }
    ]
  },
  {
    id: 15,
    name: "Woodstock Wonder",
    description: "Eclectic breakfast spot in the Woodstock neighborhood featuring organic ingredients and vegetarian options.",
    address: "4812 SE Woodstock Blvd, Portland, OR 97206",
    latitude: 45.4796,
    longitude: -122.6089,
    phone: "(503) 555-1515",
    rating: 4.4,
    priceLevel: 2,
    menuItems: [
      {
        id: "r15-m1",
        name: "Hippie Hash",
        description: "Sweet potato hash with peppers, onions, and two eggs",
        price: 11.95,
        category: "Eggs & Benedicts"
      },
      {
        id: "r15-m2",
        name: "Peace & Love Pancakes",
        description: "Whole grain pancakes with hemp hearts and berry compote",
        price: 10.75,
        category: "Pancakes & Waffles"
      },
      {
        id: "r15-m3",
        name: "Groovy Green Wrap",
        description: "Spinach wrap with hummus, sprouts, and vegetables",
        price: 9.25,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r15-m4",
        name: "Kombucha",
        description: "House-fermented ginger kombucha",
        price: 4.50,
        category: "Beverages"
      },
      {
        id: "r15-m5",
        name: "Granola Parfait",
        description: "Greek yogurt with house-made granola and honey",
        price: 7.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r15-m6",
        name: "Tempeh Bacon",
        description: "Marinated and grilled tempeh strips",
        price: 5.95,
        category: "Sides"
      }
    ]
  },
  {
    id: 16,
    name: "Richmond Revival",
    description: "Modern American breakfast with Southern influences and craft cocktails in the Richmond neighborhood.",
    address: "2963 SE Division St, Portland, OR 97202",
    latitude: 45.5048,
    longitude: -122.6354,
    phone: "(503) 555-1616",
    rating: 4.6,
    priceLevel: 3,
    menuItems: [
      {
        id: "r16-m1",
        name: "Southern Belle Waffles",
        description: "Cornmeal waffles with fried chicken and hot honey",
        price: 16.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r16-m2",
        name: "Bourbon Benedict",
        description: "Buttermilk biscuit with pulled pork, poached eggs, and bourbon hollandaise",
        price: 15.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r16-m3",
        name: "Fried Green Tomato BLT",
        description: "Fried green tomatoes with bacon and lettuce on brioche",
        price: 12.25,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r16-m4",
        name: "Mint Julep",
        description: "Non-alcoholic mint julep with fresh mint and simple syrup",
        price: 5.75,
        category: "Beverages"
      },
      {
        id: "r16-m5",
        name: "Buttermilk Drop Biscuits",
        description: "Two warm biscuits with sorghum butter",
        price: 6.50,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r16-m6",
        name: "Cheese Grits",
        description: "Creamy stone-ground grits with sharp cheddar",
        price: 7.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 17,
    name: "Mississippi Mornings",
    description: "Soul food breakfast spot on Mississippi Avenue serving authentic Southern comfort food.",
    address: "1456 N Mississippi Ave, Portland, OR 97227",
    latitude: 45.5410,
    longitude: -122.6759,
    phone: "(503) 555-1717",
    rating: 4.3,
    priceLevel: 2,
    menuItems: [
      {
        id: "r17-m1",
        name: "Soul Stack",
        description: "Sweet potato pancakes with cinnamon butter and maple syrup",
        price: 11.50,
        category: "Pancakes & Waffles"
      },
      {
        id: "r17-m2",
        name: "Catfish & Grits",
        description: "Fried catfish over cheese grits with two eggs",
        price: 14.95,
        category: "Eggs & Benedicts"
      },
      {
        id: "r17-m3",
        name: "Fried Chicken Biscuit",
        description: "Buttermilk fried chicken on a warm biscuit with honey",
        price: 10.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r17-m4",
        name: "Sweet Tea",
        description: "Traditional Southern sweet tea",
        price: 3.25,
        category: "Beverages"
      },
      {
        id: "r17-m5",
        name: "Peach Cobbler Muffin",
        description: "Warm muffin with peach filling and crumb topping",
        price: 5.50,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r17-m6",
        name: "Collard Greens",
        description: "Slow-cooked collard greens with ham hock",
        price: 6.75,
        category: "Sides"
      }
    ]
  },
  {
    id: 18,
    name: "Lloyd District Diner",
    description: "24-hour diner serving classic American breakfast around the clock near the Lloyd Center.",
    address: "987 NE Halsey St, Portland, OR 97232",
    latitude: 45.5336,
    longitude: -122.6544,
    phone: "(503) 555-1818",
    rating: 3.9,
    priceLevel: 1,
    menuItems: [
      {
        id: "r18-m1",
        name: "Midnight Stack",
        description: "Four pancakes available any time of day or night",
        price: 9.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r18-m2",
        name: "Trucker's Special",
        description: "Three eggs, hash browns, toast, and choice of meat",
        price: 10.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r18-m3",
        name: "Patty Melt",
        description: "Hamburger patty with eggs and cheese on rye bread",
        price: 9.25,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r18-m4",
        name: "Coffee (24-Hour)",
        description: "Fresh coffee brewed around the clock",
        price: 2.75,
        category: "Beverages"
      },
      {
        id: "r18-m5",
        name: "Pie of the Day",
        description: "Daily selection of fresh-baked pie",
        price: 4.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r18-m6",
        name: "Corned Beef Hash",
        description: "House-made corned beef with diced potatoes",
        price: 7.50,
        category: "Sides"
      }
    ]
  },
  {
    id: 19,
    name: "Belmont Station Breakfast",
    description: "Craft beer-focused breakfast spot with unique beer-infused dishes and local brews.",
    address: "4500 SE Stark St, Portland, OR 97215",
    latitude: 45.5196,
    longitude: -122.6112,
    phone: "(503) 555-1919",
    rating: 4.1,
    priceLevel: 3,
    menuItems: [
      {
        id: "r19-m1",
        name: "Beer Batter Pancakes",
        description: "Pancakes made with local IPA batter and hop-infused syrup",
        price: 13.25,
        category: "Pancakes & Waffles"
      },
      {
        id: "r19-m2",
        name: "Stout Benedict",
        description: "English muffin with bacon, poached eggs, and stout hollandaise",
        price: 14.75,
        category: "Eggs & Benedicts"
      },
      {
        id: "r19-m3",
        name: "Breakfast Pretzel",
        description: "Warm pretzel with beer cheese sauce and scrambled eggs",
        price: 11.50,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r19-m4",
        name: "Coffee Stout Float",
        description: "Cold brew coffee with vanilla ice cream and chocolate stout",
        price: 6.95,
        category: "Beverages"
      },
      {
        id: "r19-m5",
        name: "Beer Donut",
        description: "Yeast donut made with local wheat beer",
        price: 4.75,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r19-m6",
        name: "Beer-Braised Sausage",
        description: "Local sausage braised in craft beer",
        price: 7.95,
        category: "Sides"
      }
    ]
  },
  {
    id: 20,
    name: "Mt. Tabor Sunrise",
    description: "Healthy breakfast café near Mt. Tabor Park featuring organic ingredients and vegetarian options.",
    address: "3827 SE Hawthorne Blvd, Portland, OR 97214",
    latitude: 45.5122,
    longitude: -122.6204,
    phone: "(503) 555-2020",
    rating: 4.5,
    priceLevel: 3,
    menuItems: [
      {
        id: "r20-m1",
        name: "Sunrise Bowl",
        description: "Acai bowl with granola, fresh fruit, and coconut flakes",
        price: 12.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r20-m2",
        name: "Garden Scramble",
        description: "Free-range eggs with organic vegetables and herbs",
        price: 11.75,
        category: "Eggs & Benedicts"
      },
      {
        id: "r20-m3",
        name: "Almond Butter Toast",
        description: "Multigrain toast with almond butter, banana, and chia seeds",
        price: 9.50,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r20-m4",
        name: "Green Smoothie",
        description: "Spinach, mango, pineapple, and coconut water smoothie",
        price: 7.25,
        category: "Beverages"
      },
      {
        id: "r20-m5",
        name: "Overnight Oats",
        description: "Steel-cut oats with berries and almond milk",
        price: 8.50,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r20-m6",
        name: "Avocado Slices",
        description: "Fresh avocado with lime and sea salt",
        price: 6.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 21,
    name: "Irvington Morning Glory",
    description: "Elegant breakfast spot in historic Irvington neighborhood featuring classic dishes with modern presentation.",
    address: "1532 NE Broadway St, Portland, OR 97232",
    latitude: 45.5351,
    longitude: -122.6493,
    phone: "(503) 555-2121",
    rating: 4.4,
    priceLevel: 3,
    menuItems: [
      {
        id: "r21-m1",
        name: "Victorian Pancakes",
        description: "Vanilla bean pancakes with berry compote and mascarpone",
        price: 14.50,
        category: "Pancakes & Waffles"
      },
      {
        id: "r21-m2",
        name: "Gentleman's Benedict",
        description: "Brioche with prosciutto, poached eggs, and hollandaise",
        price: 16.25,
        category: "Eggs & Benedicts"
      },
      {
        id: "r21-m3",
        name: "Croque Monsieur",
        description: "Ham and cheese sandwich with béchamel sauce",
        price: 13.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r21-m4",
        name: "Earl Grey Tea",
        description: "Premium Earl Grey tea service",
        price: 4.50,
        category: "Beverages"
      },
      {
        id: "r21-m5",
        name: "French Macarons",
        description: "Assorted French macarons (3 pieces)",
        price: 8.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r21-m6",
        name: "Smoked Salmon",
        description: "House-cured salmon with capers and red onion",
        price: 12.50,
        category: "Sides"
      }
    ]
  },
  {
    id: 22,
    name: "Kenton Kitchen",
    description: "Neighborhood favorite in North Portland serving hearty breakfast portions at great prices.",
    address: "8012 N Denver Ave, Portland, OR 97217",
    latitude: 45.5812,
    longitude: -122.6843,
    phone: "(503) 555-2222",
    rating: 4.0,
    priceLevel: 1,
    menuItems: [
      {
        id: "r22-m1",
        name: "Lumberjack Cakes",
        description: "Three giant pancakes with butter and syrup",
        price: 8.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r22-m2",
        name: "Working Man's Breakfast",
        description: "Two eggs, bacon, sausage, hash browns, and toast",
        price: 9.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r22-m3",
        name: "Breakfast Sandwich",
        description: "Egg, cheese, and ham on your choice of bread",
        price: 6.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r22-m4",
        name: "Orange Juice",
        description: "Fresh squeezed orange juice",
        price: 3.50,
        category: "Beverages"
      },
      {
        id: "r22-m5",
        name: "Cinnamon Toast",
        description: "Thick-cut bread with cinnamon and sugar",
        price: 4.25,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r22-m6",
        name: "Country Sausage",
        description: "Two country sausage patties",
        price: 5.50,
        category: "Sides"
      }
    ]
  },
  {
    id: 23,
    name: "Alameda Ridge Café",
    description: "Cozy café in the Alameda neighborhood with homestyle cooking and friendly atmosphere.",
    address: "4251 NE Sandy Blvd, Portland, OR 97212",
    latitude: 45.5319,
    longitude: -122.6189,
    phone: "(503) 555-2323",
    rating: 4.2,
    priceLevel: 2,
    menuItems: [
      {
        id: "r23-m1",
        name: "Country Griddle Cakes",
        description: "Three buttermilk pancakes with real butter",
        price: 9.75,
        category: "Pancakes & Waffles"
      },
      {
        id: "r23-m2",
        name: "Western Omelet",
        description: "Ham, peppers, onions, and cheese omelet",
        price: 10.95,
        category: "Eggs & Benedicts"
      },
      {
        id: "r23-m3",
        name: "Tuna Melt",
        description: "Tuna salad and cheese on grilled sourdough",
        price: 9.25,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r23-m4",
        name: "Hot Coffee",
        description: "House blend coffee with free refills",
        price: 3.25,
        category: "Beverages"
      },
      {
        id: "r23-m5",
        name: "Blueberry Muffin",
        description: "Fresh baked blueberry muffin",
        price: 4.50,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r23-m6",
        name: "Thick Cut Bacon",
        description: "Three strips of thick-cut bacon",
        price: 6.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 24,
    name: "Piedmont Pancake House",
    description: "Family-friendly pancake house in the Piedmont neighborhood specializing in creative pancake varieties.",
    address: "126 N Killingsworth St, Portland, OR 97227",
    latitude: 45.5632,
    longitude: -122.6756,
    phone: "(503) 555-2424",
    rating: 4.3,
    priceLevel: 2,
    menuItems: [
      {
        id: "r24-m1",
        name: "Red Velvet Pancakes",
        description: "Red velvet pancakes with cream cheese icing",
        price: 12.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r24-m2",
        name: "Pancake Benedict",
        description: "Pancakes topped with ham, poached eggs, and hollandaise",
        price: 13.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r24-m3",
        name: "Breakfast Crepe",
        description: "Thin crepe with scrambled eggs, cheese, and herbs",
        price: 10.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r24-m4",
        name: "Strawberry Milk",
        description: "Fresh strawberry flavored milk",
        price: 3.95,
        category: "Beverages"
      },
      {
        id: "r24-m5",
        name: "German Pancake",
        description: "Oven-baked German pancake with lemon and powdered sugar",
        price: 11.25,
        category: "Pancakes & Waffles"
      },
      {
        id: "r24-m6",
        name: "Breakfast Sausage",
        description: "Three breakfast sausage links",
        price: 5.75,
        category: "Sides"
      }
    ]
  },
  {
    id: 25,
    name: "Foster Fuel Stop",
    description: "Trendy breakfast spot on Foster Road known for their specialty coffee and artisan pastries.",
    address: "5632 SE Foster Rd, Portland, OR 97206",
    latitude: 45.4897,
    longitude: -122.6032,
    phone: "(503) 555-2525",
    rating: 4.6,
    priceLevel: 3,
    menuItems: [
      {
        id: "r25-m1",
        name: "Lavender Honey Pancakes",
        description: "Buttermilk pancakes infused with lavender and local honey",
        price: 13.75,
        category: "Pancakes & Waffles"
      },
      {
        id: "r25-m2",
        name: "Smoked Trout Benedict",
        description: "Everything bagel with smoked trout, poached eggs, and dill hollandaise",
        price: 15.95,
        category: "Eggs & Benedicts"
      },
      {
        id: "r25-m3",
        name: "Breakfast Tartine",
        description: "Open-faced sandwich with avocado, egg, and microgreens",
        price: 12.50,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r25-m4",
        name: "Cortado",
        description: "Spanish-style coffee with equal parts espresso and warm milk",
        price: 4.75,
        category: "Beverages"
      },
      {
        id: "r25-m5",
        name: "Almond Croissant",
        description: "Buttery croissant filled with almond cream",
        price: 6.25,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r25-m6",
        name: "Duck Fat Potatoes",
        description: "Roasted potatoes cooked in duck fat with herbs",
        price: 8.50,
        category: "Sides"
      }
    ]
  },
  {
    id: 26,
    name: "Jade District Morning",
    description: "Asian-fusion breakfast spot in the Jade District featuring unique East-meets-West breakfast dishes.",
    address: "8145 SE Division St, Portland, OR 97266",
    latitude: 45.5048,
    longitude: -122.5789,
    phone: "(503) 555-2626",
    rating: 4.4,
    priceLevel: 2,
    menuItems: [
      {
        id: "r26-m1",
        name: "Miso Caramel Pancakes",
        description: "Fluffy pancakes with miso caramel sauce and sesame seeds",
        price: 12.25,
        category: "Pancakes & Waffles"
      },
      {
        id: "r26-m2",
        name: "Korean Benedict",
        description: "English muffin with bulgogi, poached eggs, and gochujang hollandaise",
        price: 14.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r26-m3",
        name: "Breakfast Bao",
        description: "Steamed buns with scrambled eggs, bacon, and scallions",
        price: 11.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r26-m4",
        name: "Jasmine Tea",
        description: "Traditional jasmine green tea",
        price: 3.50,
        category: "Beverages"
      },
      {
        id: "r26-m5",
        name: "Matcha Mochi Donut",
        description: "Chewy mochi donut with matcha glaze",
        price: 5.75,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r26-m6",
        name: "Kimchi Hash",
        description: "Spicy kimchi with potatoes and vegetables",
        price: 7.95,
        category: "Sides"
      }
    ]
  },
  {
    id: 27,
    name: "Laurelhurst Lakehouse",
    description: "Upscale breakfast restaurant near Laurelhurst Park with lake views and sophisticated cuisine.",
    address: "2845 SE Ankeny St, Portland, OR 97214",
    latitude: 45.5220,
    longitude: -122.6367,
    phone: "(503) 555-2727",
    rating: 4.7,
    priceLevel: 4,
    menuItems: [
      {
        id: "r27-m1",
        name: "Brioche French Toast",
        description: "Thick-cut brioche with vanilla bean custard and berry compote",
        price: 16.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r27-m2",
        name: "Dungeness Crab Benedict",
        description: "English muffin with fresh crab, poached eggs, and tarragon hollandaise",
        price: 19.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r27-m3",
        name: "Smoked Duck Sandwich",
        description: "House-smoked duck with fig jam and arugula on brioche",
        price: 17.25,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r27-m4",
        name: "French Press Coffee",
        description: "Single origin coffee brewed in French press",
        price: 5.95,
        category: "Beverages"
      },
      {
        id: "r27-m5",
        name: "Pain au Chocolat",
        description: "Traditional French pastry with dark chocolate",
        price: 7.50,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r27-m6",
        name: "Truffle Mushrooms",
        description: "Wild mushrooms sautéed with truffle oil",
        price: 11.95,
        category: "Sides"
      }
    ]
  },
  {
    id: 28,
    name: "St. Johns Bridge Café",
    description: "Community café in St. Johns neighborhood with views of the iconic suspension bridge.",
    address: "8645 N Lombard St, Portland, OR 97203",
    latitude: 45.5843,
    longitude: -122.7654,
    phone: "(503) 555-2828",
    rating: 4.1,
    priceLevel: 2,
    menuItems: [
      {
        id: "r28-m1",
        name: "Bridge Builder Stack",
        description: "Four pancakes stacked high like the bridge towers",
        price: 10.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r28-m2",
        name: "Suspension Benedict",
        description: "English muffin suspended with bacon, eggs, and hollandaise",
        price: 13.25,
        category: "Eggs & Benedicts"
      },
      {
        id: "r28-m3",
        name: "Cathedral Park Wrap",
        description: "Breakfast wrap named after the nearby park",
        price: 9.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r28-m4",
        name: "Bridge Brew Coffee",
        description: "House blend coffee with bridge view",
        price: 3.75,
        category: "Beverages"
      },
      {
        id: "r28-m5",
        name: "Suspension Cable Twist",
        description: "Cinnamon twist pastry shaped like bridge cables",
        price: 4.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r28-m6",
        name: "Tower Hash Browns",
        description: "Hash browns shaped into towers",
        price: 6.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 29,
    name: "Montavilla Morning Market",
    description: "Farm-to-table breakfast spot in Montavilla featuring ingredients from local farmers markets.",
    address: "9012 SE Stark St, Portland, OR 97266",
    latitude: 45.5196,
    longitude: -122.5654,
    phone: "(503) 555-2929",
    rating: 4.3,
    priceLevel: 3,
    menuItems: [
      {
        id: "r29-m1",
        name: "Market Fresh Pancakes",
        description: "Seasonal fruit pancakes with ingredients from local farmers",
        price: 13.50,
        category: "Pancakes & Waffles"
      },
      {
        id: "r29-m2",
        name: "Farm Fresh Benedict",
        description: "Free-range eggs with local ham and organic hollandaise",
        price: 15.25,
        category: "Eggs & Benedicts"
      },
      {
        id: "r29-m3",
        name: "Harvest Wrap",
        description: "Seasonal vegetables and eggs in a whole wheat tortilla",
        price: 11.95,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r29-m4",
        name: "Farm Stand Juice",
        description: "Fresh pressed juice with seasonal fruits and vegetables",
        price: 6.75,
        category: "Beverages"
      },
      {
        id: "r29-m5",
        name: "Seasonal Fruit Tart",
        description: "Fresh fruit tart with pastry cream",
        price: 7.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r29-m6",
        name: "Roasted Root Vegetables",
        description: "Seasonal root vegetables roasted with herbs",
        price: 8.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 30,
    name: "Creston Corner",
    description: "Neighborhood corner café in Creston-Kenilworth with homestyle breakfast and strong community ties.",
    address: "4521 SE 26th Ave, Portland, OR 97202",
    latitude: 45.4923,
    longitude: -122.6384,
    phone: "(503) 555-3030",
    rating: 4.0,
    priceLevel: 2,
    menuItems: [
      {
        id: "r30-m1",
        name: "Corner Café Pancakes",
        description: "Three classic buttermilk pancakes with syrup",
        price: 9.50,
        category: "Pancakes & Waffles"
      },
      {
        id: "r30-m2",
        name: "Neighborhood Benedict",
        description: "English muffin with ham, eggs, and homestyle hollandaise",
        price: 12.75,
        category: "Eggs & Benedicts"
      },
      {
        id: "r30-m3",
        name: "Corner Store Sandwich",
        description: "Egg and cheese sandwich on your choice of bread",
        price: 7.95,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r30-m4",
        name: "Community Coffee",
        description: "Fair trade coffee supporting local community",
        price: 3.25,
        category: "Beverages"
      },
      {
        id: "r30-m5",
        name: "Homestyle Biscuit",
        description: "Warm buttermilk biscuit with butter and jam",
        price: 4.25,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r30-m6",
        name: "Home Fries",
        description: "Diced potatoes with onions and peppers",
        price: 5.75,
        category: "Sides"
      }
    ]
  },
  {
    id: 31,
    name: "Overlook Observatory",
    description: "Breakfast spot in the Overlook neighborhood with panoramic views of the city and mountains.",
    address: "1876 N Fremont St, Portland, OR 97227",
    latitude: 45.5487,
    longitude: -122.6834,
    phone: "(503) 555-3131",
    rating: 4.5,
    priceLevel: 3,
    menuItems: [
      {
        id: "r31-m1",
        name: "Sky High Pancakes",
        description: "Pancakes as tall as the city skyline with berry compote",
        price: 14.25,
        category: "Pancakes & Waffles"
      },
      {
        id: "r31-m2",
        name: "Mountain View Benedict",
        description: "English muffin with salmon, eggs, and dill hollandaise",
        price: 16.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r31-m3",
        name: "Observation Deck Wrap",
        description: "Breakfast wrap with a view and amazing flavors",
        price: 12.25,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r31-m4",
        name: "Sunrise Mimosa",
        description: "Fresh orange juice with sparkling wine",
        price: 8.50,
        category: "Beverages"
      },
      {
        id: "r31-m5",
        name: "Cloud Nine Scone",
        description: "Light and fluffy scone with clotted cream",
        price: 6.75,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r31-m6",
        name: "Observatory Potatoes",
        description: "Herb-roasted potatoes with city spices",
        price: 7.95,
        category: "Sides"
      }
    ]
  },
  {
    id: 32,
    name: "Boise-Eliot Breakfast House",
    description: "Historic neighborhood breakfast house serving comfort food in the heart of Boise-Eliot.",
    address: "432 NE Russell St, Portland, OR 97212",
    latitude: 45.5458,
    longitude: -122.6612,
    phone: "(503) 555-3232",
    rating: 4.2,
    priceLevel: 2,
    menuItems: [
      {
        id: "r32-m1",
        name: "Historic House Pancakes",
        description: "Traditional recipe pancakes served since 1952",
        price: 10.25,
        category: "Pancakes & Waffles"
      },
      {
        id: "r32-m2",
        name: "Russell Street Benedict",
        description: "Classic benedict with ham and perfectly poached eggs",
        price: 13.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r32-m3",
        name: "Eliot Breakfast Sandwich",
        description: "Hearty sandwich with eggs, cheese, and bacon",
        price: 8.95,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r32-m4",
        name: "Neighborhood Coffee",
        description: "Strong coffee that built this community",
        price: 3.50,
        category: "Beverages"
      },
      {
        id: "r32-m5",
        name: "Heritage Muffin",
        description: "Family recipe blueberry muffin",
        price: 4.75,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r32-m6",
        name: "House Hash Browns",
        description: "Crispy hash browns the way grandma made them",
        price: 5.95,
        category: "Sides"
      }
    ]
  },
  {
    id: 33,
    name: "Sellwood Sunrise Spot",
    description: "Charming breakfast café in historic Sellwood with antique décor and homestyle cooking.",
    address: "1423 SE 13th Ave, Portland, OR 97202",
    latitude: 45.4856,
    longitude: -122.6529,
    phone: "(503) 555-3333",
    rating: 4.4,
    priceLevel: 2,
    menuItems: [
      {
        id: "r33-m1",
        name: "Antique Pancakes",
        description: "Old-fashioned recipe pancakes with real maple syrup",
        price: 11.75,
        category: "Pancakes & Waffles"
      },
      {
        id: "r33-m2",
        name: "Vintage Benedict",
        description: "Classic benedict on toasted English muffin",
        price: 14.25,
        category: "Eggs & Benedicts"
      },
      {
        id: "r33-m3",
        name: "Sellwood Special Wrap",
        description: "Breakfast wrap with local ingredients",
        price: 10.50,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r33-m4",
        name: "Antique Shop Coffee",
        description: "Rich coffee blend with vintage charm",
        price: 3.75,
        category: "Beverages"
      },
      {
        id: "r33-m5",
        name: "Heirloom Scone",
        description: "Traditional scone with fruit preserves",
        price: 5.25,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r33-m6",
        name: "Country Style Potatoes",
        description: "Rustic potatoes with herbs and spices",
        price: 6.50,
        category: "Sides"
      }
    ]
  },
  {
    id: 34,
    name: "Woodlawn Waffle Works",
    description: "Specialty waffle house in the Woodlawn neighborhood with creative sweet and savory options.",
    address: "6734 NE Dekum St, Portland, OR 97218",
    latitude: 45.5723,
    longitude: -122.5934,
    phone: "(503) 555-3434",
    rating: 4.6,
    priceLevel: 3,
    menuItems: [
      {
        id: "r34-m1",
        name: "The Woodlawn Wonder",
        description: "Waffle with fried chicken, bacon, and maple syrup",
        price: 15.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r34-m2",
        name: "Savory Waffle Benedict",
        description: "Herb waffle with poached eggs and hollandaise",
        price: 14.75,
        category: "Eggs & Benedicts"
      },
      {
        id: "r34-m3",
        name: "Waffle Breakfast Sandwich",
        description: "Mini waffles as bread with eggs and cheese",
        price: 11.50,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r34-m4",
        name: "Waffle Shop Coffee",
        description: "Perfect coffee to pair with waffles",
        price: 4.25,
        category: "Beverages"
      },
      {
        id: "r34-m5",
        name: "Cinnamon Sugar Waffle",
        description: "Warm waffle dusted with cinnamon sugar",
        price: 8.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r34-m6",
        name: "Whipped Cream & Berries",
        description: "Fresh whipped cream with seasonal berries",
        price: 6.75,
        category: "Sides"
      }
    ]
  },
  {
    id: 35,
    name: "Lents Morning Market",
    description: "Community-focused breakfast spot in Lents neighborhood supporting local producers and farmers.",
    address: "9214 SE Foster Rd, Portland, OR 97266",
    latitude: 45.4897,
    longitude: -122.5623,
    phone: "(503) 555-3535",
    rating: 4.1,
    priceLevel: 2,
    menuItems: [
      {
        id: "r35-m1",
        name: "Local Harvest Pancakes",
        description: "Pancakes with seasonal fruit from Lents farmers",
        price: 11.25,
        category: "Pancakes & Waffles"
      },
      {
        id: "r35-m2",
        name: "Community Garden Benedict",
        description: "Benedict with vegetables from local community gardens",
        price: 13.95,
        category: "Eggs & Benedicts"
      },
      {
        id: "r35-m3",
        name: "Neighbor's Breakfast Wrap",
        description: "Wrap filled with locally sourced ingredients",
        price: 9.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r35-m4",
        name: "Community Coffee",
        description: "Fair trade coffee supporting local community",
        price: 3.50,
        category: "Beverages"
      },
      {
        id: "r35-m5",
        name: "Market Fresh Muffin",
        description: "Muffin made with ingredients from local market",
        price: 4.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r35-m6",
        name: "Garden Vegetables",
        description: "Fresh vegetables from community gardens",
        price: 7.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 36,
    name: "Beaumont Bistro Breakfast",
    description: "European-inspired breakfast bistro in the Beaumont-Wilshire neighborhood with French influences.",
    address: "4756 NE Fremont St, Portland, OR 97213",
    latitude: 45.5487,
    longitude: -122.6098,
    phone: "(503) 555-3636",
    rating: 4.5,
    priceLevel: 3,
    menuItems: [
      {
        id: "r36-m1",
        name: "French Toast Beaumont",
        description: "Brioche French toast with Grand Marnier and berry compote",
        price: 15.50,
        category: "Pancakes & Waffles"
      },
      {
        id: "r36-m2",
        name: "Croque Benedict",
        description: "Ham and cheese benedict with béchamel sauce",
        price: 16.25,
        category: "Eggs & Benedicts"
      },
      {
        id: "r36-m3",
        name: "Parisian Breakfast Crepe",
        description: "Thin crepe with ham, cheese, and herbs",
        price: 12.95,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r36-m4",
        name: "Café au Lait",
        description: "French-style coffee with steamed milk",
        price: 4.75,
        category: "Beverages"
      },
      {
        id: "r36-m5",
        name: "Pain Perdu",
        description: "French version of French toast with vanilla and cinnamon",
        price: 13.25,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r36-m6",
        name: "Pommes de Terre",
        description: "French-style breakfast potatoes with herbs",
        price: 7.50,
        category: "Sides"
      }
    ]
  },
  {
    id: 37,
    name: "Roseway Rock Creek",
    description: "Rustic breakfast spot in Roseway neighborhood with outdoor seating and natural ambiance.",
    address: "7823 NE Sandy Blvd, Portland, OR 97213",
    latitude: 45.5319,
    longitude: -122.5876,
    phone: "(503) 555-3737",
    rating: 4.2,
    priceLevel: 2,
    menuItems: [
      {
        id: "r37-m1",
        name: "Creek Side Pancakes",
        description: "Buttermilk pancakes with fresh stream-side atmosphere",
        price: 10.75,
        category: "Pancakes & Waffles"
      },
      {
        id: "r37-m2",
        name: "Rocky Creek Benedict",
        description: "Benedict served on stone-ground English muffin",
        price: 13.75,
        category: "Eggs & Benedicts"
      },
      {
        id: "r37-m3",
        name: "Hiker's Breakfast Wrap",
        description: "Hearty wrap perfect for outdoor adventures",
        price: 11.25,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r37-m4",
        name: "Mountain Stream Coffee",
        description: "Fresh coffee as pure as mountain water",
        price: 3.95,
        category: "Beverages"
      },
      {
        id: "r37-m5",
        name: "Trail Mix Granola",
        description: "House-made granola with nuts and dried fruit",
        price: 8.50,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r37-m6",
        name: "Wild Berry Hash",
        description: "Potato hash with foraged wild berries",
        price: 7.95,
        category: "Sides"
      }
    ]
  },
  {
    id: 38,
    name: "Cully Compass Café",
    description: "Diverse breakfast café in the Cully neighborhood celebrating the area's multicultural community.",
    address: "5012 NE Prescott St, Portland, OR 97218",
    latitude: 45.5632,
    longitude: -122.6123,
    phone: "(503) 555-3838",
    rating: 4.3,
    priceLevel: 2,
    menuItems: [
      {
        id: "r38-m1",
        name: "Global Fusion Pancakes",
        description: "Pancakes with international flavor influences",
        price: 12.50,
        category: "Pancakes & Waffles"
      },
      {
        id: "r38-m2",
        name: "United Nations Benedict",
        description: "Benedict with diverse cultural ingredients",
        price: 14.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r38-m3",
        name: "Cully Community Wrap",
        description: "Wrap celebrating the neighborhood's diversity",
        price: 10.95,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r38-m4",
        name: "World Coffee Blend",
        description: "Coffee blend from around the world",
        price: 4.25,
        category: "Beverages"
      },
      {
        id: "r38-m5",
        name: "International Pastry",
        description: "Daily selection of pastries from different cultures",
        price: 5.75,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r38-m6",
        name: "Spiced Breakfast Potatoes",
        description: "Potatoes with spices from around the world",
        price: 6.95,
        category: "Sides"
      }
    ]
  },
  {
    id: 39,
    name: "Concordia Sunrise Station",
    description: "Trendy breakfast spot in Concordia neighborhood popular with young professionals and families.",
    address: "2856 NE Alberta St, Portland, OR 97211",
    latitude: 45.5587,
    longitude: -122.6345,
    phone: "(503) 555-3939",
    rating: 4.4,
    priceLevel: 3,
    menuItems: [
      {
        id: "r39-m1",
        name: "Sunrise Special Pancakes",
        description: "Light and fluffy pancakes perfect for morning commuters",
        price: 12.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r39-m2",
        name: "Commuter's Benedict",
        description: "Quick and delicious benedict for busy mornings",
        price: 14.75,
        category: "Eggs & Benedicts"
      },
      {
        id: "r39-m3",
        name: "Express Breakfast Wrap",
        description: "Fast and tasty wrap for on-the-go breakfast",
        price: 11.50,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r39-m4",
        name: "Commuter Coffee",
        description: "Strong coffee to fuel your day",
        price: 4.50,
        category: "Beverages"
      },
      {
        id: "r39-m5",
        name: "Grab & Go Pastry",
        description: "Perfect pastry for busy professionals",
        price: 5.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r39-m6",
        name: "Quick Hash Browns",
        description: "Crispy hash browns made fast",
        price: 6.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 40,
    name: "Peninsula Park Pancakes",
    description: "Family-friendly breakfast spot near Peninsula Park with a playground view and kid-friendly menu.",
    address: "5123 N Albina Ave, Portland, OR 97217",
    latitude: 45.5723,
    longitude: -122.6756,
    phone: "(503) 555-4040",
    rating: 4.1,
    priceLevel: 2,
    menuItems: [
      {
        id: "r40-m1",
        name: "Playground Pancakes",
        description: "Fun pancakes shaped like playground equipment",
        price: 9.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r40-m2",
        name: "Family Fun Benedict",
        description: "Kid-friendly benedict with mild flavors",
        price: 12.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r40-m3",
        name: "Park Picnic Wrap",
        description: "Easy-to-eat wrap perfect for families",
        price: 8.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r40-m4",
        name: "Hot Chocolate",
        description: "Kid-friendly hot chocolate with marshmallows",
        price: 3.95,
        category: "Beverages"
      },
      {
        id: "r40-m5",
        name: "Smiley Face Pancake",
        description: "Single pancake decorated with fruit",
        price: 6.50,
        category: "Pancakes & Waffles"
      },
      {
        id: "r40-m6",
        name: "Mini Hash Browns",
        description: "Kid-sized portion of crispy hash browns",
        price: 4.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 41,
    name: "Arbor Lodge Morning Glory",
    description: "Cozy breakfast nook in Arbor Lodge with garden seating and fresh herb ingredients.",
    address: "1721 N Lombard St, Portland, OR 97217",
    latitude: 45.5843,
    longitude: -122.6954,
    phone: "(503) 555-4141",
    rating: 4.3,
    priceLevel: 2,
    menuItems: [
      {
        id: "r41-m1",
        name: "Garden Fresh Pancakes",
        description: "Pancakes with herbs grown in our garden",
        price: 11.25,
        category: "Pancakes & Waffles"
      },
      {
        id: "r41-m2",
        name: "Herb Garden Benedict",
        description: "Benedict with fresh herbs from our garden",
        price: 13.95,
        category: "Eggs & Benedicts"
      },
      {
        id: "r41-m3",
        name: "Lodge Breakfast Sandwich",
        description: "Cozy sandwich with garden-fresh ingredients",
        price: 9.50,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r41-m4",
        name: "Herbal Tea Blend",
        description: "Tea made with herbs from our garden",
        price: 3.75,
        category: "Beverages"
      },
      {
        id: "r41-m5",
        name: "Lavender Honey Biscuit",
        description: "Biscuit with lavender from our garden",
        price: 5.25,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r41-m6",
        name: "Garden Vegetable Hash",
        description: "Hash with fresh vegetables from our garden",
        price: 7.75,
        category: "Sides"
      }
    ]
  },
  {
    id: 42,
    name: "Holladay Park Bistro",
    description: "Upscale breakfast bistro near Lloyd Center with sophisticated menu and elegant atmosphere.",
    address: "1632 NE Holladay St, Portland, OR 97232",
    latitude: 45.5336,
    longitude: -122.6487,
    phone: "(503) 555-4242",
    rating: 4.6,
    priceLevel: 4,
    menuItems: [
      {
        id: "r42-m1",
        name: "Holladay Heights Pancakes",
        description: "Gourmet pancakes with premium ingredients",
        price: 17.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r42-m2",
        name: "Bistro Benedict Royale",
        description: "Luxury benedict with finest ingredients",
        price: 19.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r42-m3",
        name: "Executive Breakfast Wrap",
        description: "Sophisticated wrap for discerning tastes",
        price: 15.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r42-m4",
        name: "Premium Coffee Service",
        description: "Highest quality coffee with white glove service",
        price: 6.95,
        category: "Beverages"
      },
      {
        id: "r42-m5",
        name: "French Patisserie Selection",
        description: "Imported French pastries (3 pieces)",
        price: 12.50,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r42-m6",
        name: "Truffle Breakfast Potatoes",
        description: "Potatoes with truffle oil and gourmet seasoning",
        price: 13.95,
        category: "Sides"
      }
    ]
  },
  {
    id: 43,
    name: "Humboldt Hearth & Home",
    description: "Family-owned breakfast restaurant in Humboldt neighborhood with three generations of recipes.",
    address: "2945 NE Humboldt St, Portland, OR 97212",
    latitude: 45.5510,
    longitude: -122.6356,
    phone: "(503) 555-4343",
    rating: 4.2,
    priceLevel: 2,
    menuItems: [
      {
        id: "r43-m1",
        name: "Grandmother's Pancakes",
        description: "Secret family recipe passed down three generations",
        price: 10.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r43-m2",
        name: "Family Heritage Benedict",
        description: "Traditional benedict made the old-fashioned way",
        price: 13.25,
        category: "Eggs & Benedicts"
      },
      {
        id: "r43-m3",
        name: "Home Style Breakfast Wrap",
        description: "Wrap made with love and family tradition",
        price: 9.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r43-m4",
        name: "Grandfather's Coffee",
        description: "Coffee blend perfected over decades",
        price: 3.50,
        category: "Beverages"
      },
      {
        id: "r43-m5",
        name: "Family Recipe Muffin",
        description: "Muffin using grandmother's secret recipe",
        price: 4.75,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r43-m6",
        name: "Hearth-Roasted Potatoes",
        description: "Potatoes roasted in our family hearth",
        price: 6.50,
        category: "Sides"
      }
    ]
  },
  {
    id: 44,
    name: "Rose City Riverview",
    description: "Scenic breakfast spot along the Willamette River with outdoor deck and water views.",
    address: "1298 SE Water Ave, Portland, OR 97214",
    latitude: 45.5122,
    longitude: -122.6654,
    phone: "(503) 555-4444",
    rating: 4.7,
    priceLevel: 3,
    menuItems: [
      {
        id: "r44-m1",
        name: "River View Pancakes",
        description: "Pancakes with a view of the flowing Willamette",
        price: 14.50,
        category: "Pancakes & Waffles"
      },
      {
        id: "r44-m2",
        name: "Waterfront Benedict",
        description: "Benedict served with scenic river views",
        price: 16.25,
        category: "Eggs & Benedicts"
      },
      {
        id: "r44-m3",
        name: "Riverside Breakfast Wrap",
        description: "Perfect wrap to enjoy by the water",
        price: 12.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r44-m4",
        name: "River Mist Coffee",
        description: "Coffee as refreshing as the river breeze",
        price: 4.95,
        category: "Beverages"
      },
      {
        id: "r44-m5",
        name: "Deck Side Pastry",
        description: "Fresh pastry perfect for outdoor dining",
        price: 6.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r44-m6",
        name: "Riverside Hash Browns",
        description: "Crispy hash browns with a water view",
        price: 7.50,
        category: "Sides"
      }
    ]
  },
  {
    id: 45,
    name: "Brooklyn Breakfast Nook",
    description: "Intimate breakfast nook in the Brooklyn neighborhood with vintage décor and comfort food.",
    address: "987 SE 17th Ave, Portland, OR 97202",
    latitude: 45.5048,
    longitude: -122.6489,
    phone: "(503) 555-4545",
    rating: 4.3,
    priceLevel: 2,
    menuItems: [
      {
        id: "r45-m1",
        name: "Brooklyn Bridge Pancakes",
        description: "Stack of pancakes connecting flavors like the bridge",
        price: 11.75,
        category: "Pancakes & Waffles"
      },
      {
        id: "r45-m2",
        name: "Nook Benedict",
        description: "Cozy benedict perfect for our intimate space",
        price: 13.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r45-m3",
        name: "Vintage Breakfast Sandwich",
        description: "Classic sandwich with old-school charm",
        price: 9.25,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r45-m4",
        name: "Nook Coffee",
        description: "Intimate coffee experience in our cozy space",
        price: 3.95,
        category: "Beverages"
      },
      {
        id: "r45-m5",
        name: "Vintage Donut",
        description: "Old-fashioned donut with classic glaze",
        price: 4.50,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r45-m6",
        name: "Brooklyn Style Hash",
        description: "Neighborhood-style hash browns",
        price: 6.75,
        category: "Sides"
      }
    ]
  },
  {
    id: 46,
    name: "Sabin Sunrise Café",
    description: "Bright and airy breakfast café in the Sabin neighborhood with health-conscious options.",
    address: "2134 NE Rosa Parks Way, Portland, OR 97212",
    latitude: 45.5587,
    longitude: -122.6445,
    phone: "(503) 555-4646",
    rating: 4.4,
    priceLevel: 3,
    menuItems: [
      {
        id: "r46-m1",
        name: "Sunshine Protein Pancakes",
        description: "High-protein pancakes to brighten your morning",
        price: 13.25,
        category: "Pancakes & Waffles"
      },
      {
        id: "r46-m2",
        name: "Rosa Parks Benedict",
        description: "Inspiring benedict named after the street",
        price: 15.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r46-m3",
        name: "Health Conscious Wrap",
        description: "Nutritious wrap with wholesome ingredients",
        price: 11.95,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r46-m4",
        name: "Energizing Green Juice",
        description: "Fresh pressed juice to start your day right",
        price: 6.50,
        category: "Beverages"
      },
      {
        id: "r46-m5",
        name: "Healthy Choice Muffin",
        description: "Nutritious muffin with whole grains",
        price: 5.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r46-m6",
        name: "Power Breakfast Bowl",
        description: "Energizing bowl with quinoa and vegetables",
        price: 9.75,
        category: "Sides"
      }
    ]
  },
  {
    id: 47,
    name: "Irvington Heritage House",
    description: "Historic breakfast establishment in a restored Victorian home with period-appropriate menu.",
    address: "2567 NE 15th Ave, Portland, OR 97212",
    latitude: 45.5458,
    longitude: -122.6512,
    phone: "(503) 555-4747",
    rating: 4.5,
    priceLevel: 3,
    menuItems: [
      {
        id: "r47-m1",
        name: "Victorian Era Pancakes",
        description: "Traditional pancakes from the Victorian period",
        price: 13.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r47-m2",
        name: "Heritage House Benedict",
        description: "Benedict recipe from the original homeowners",
        price: 15.75,
        category: "Eggs & Benedicts"
      },
      {
        id: "r47-m3",
        name: "Parlor Room Sandwich",
        description: "Elegant sandwich fit for the front parlor",
        price: 12.50,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r47-m4",
        name: "Victorian Tea Service",
        description: "Formal tea service in fine china",
        price: 5.95,
        category: "Beverages"
      },
      {
        id: "r47-m5",
        name: "Period Pastry",
        description: "Authentic Victorian-era pastry recipe",
        price: 7.25,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r47-m6",
        name: "Heritage Potatoes",
        description: "Potatoes prepared using historical methods",
        price: 8.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 48,
    name: "Kerns Neighborhood Kitchen",
    description: "Community-centered breakfast spot in Kerns with locally sourced ingredients and neighbor-friendly prices.",
    address: "78 NE 28th Ave, Portland, OR 97232",
    latitude: 45.5289,
    longitude: -122.6367,
    phone: "(503) 555-4848",
    rating: 4.1,
    priceLevel: 2,
    menuItems: [
      {
        id: "r48-m1",
        name: "Neighbor's Choice Pancakes",
        description: "Pancakes voted best by our neighbors",
        price: 10.50,
        category: "Pancakes & Waffles"
      },
      {
        id: "r48-m2",
        name: "Community Benedict",
        description: "Benedict that brings the community together",
        price: 13.25,
        category: "Eggs & Benedicts"
      },
      {
        id: "r48-m3",
        name: "Kerns Kitchen Wrap",
        description: "Hearty wrap made with neighborhood love",
        price: 9.95,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r48-m4",
        name: "Local Roaster Coffee",
        description: "Coffee from our neighborhood roaster",
        price: 3.75,
        category: "Beverages"
      },
      {
        id: "r48-m5",
        name: "Community Shared Muffin",
        description: "Large muffin perfect for sharing",
        price: 6.50,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r48-m6",
        name: "Neighborhood Hash",
        description: "Hash that represents our diverse community",
        price: 7.25,
        category: "Sides"
      }
    ]
  },
  {
    id: 49,
    name: "Buckman Breakfast Boulevard",
    description: "Breakfast destination in the Buckman neighborhood with a wide variety of options for every taste.",
    address: "1945 SE 20th Ave, Portland, OR 97214",
    latitude: 45.5080,
    longitude: -122.6456,
    phone: "(503) 555-4949",
    rating: 4.6,
    priceLevel: 3,
    menuItems: [
      {
        id: "r49-m1",
        name: "Boulevard Pancake Parade",
        description: "Variety of pancakes representing the boulevard's diversity",
        price: 14.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r49-m2",
        name: "Buckman Boulevard Benedict",
        description: "Grand benedict worthy of the boulevard",
        price: 16.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r49-m3",
        name: "Avenue Breakfast Wrap",
        description: "Wrap with options as diverse as our street",
        price: 12.75,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r49-m4",
        name: "Boulevard Coffee Blend",
        description: "Coffee blend representing our street's character",
        price: 4.95,
        category: "Beverages"
      },
      {
        id: "r49-m5",
        name: "Street-Side Pastry",
        description: "Fresh pastry perfect for boulevard dining",
        price: 6.75,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r49-m6",
        name: "Avenue Hash Supreme",
        description: "Supreme hash with all the boulevard favorites",
        price: 8.95,
        category: "Sides"
      }
    ]
  },
  {
    id: 50,
    name: "Crown Heights Crowning Glory",
    description: "The crown jewel of Portland breakfast spots, located in Crown Heights with award-winning dishes and spectacular city views.",
    address: "1001 SE Salmon St, Portland, OR 97214",
    latitude: 45.5165,
    longitude: -122.6578,
    phone: "(503) 555-5050",
    rating: 4.8,
    priceLevel: 4,
    menuItems: [
      {
        id: "r50-m1",
        name: "Crowning Glory Pancakes",
        description: "Award-winning pancakes that crown our breakfast kingdom",
        price: 18.95,
        category: "Pancakes & Waffles"
      },
      {
        id: "r50-m2",
        name: "Royal Benedict Supreme",
        description: "The most regal benedict in all of Portland",
        price: 21.50,
        category: "Eggs & Benedicts"
      },
      {
        id: "r50-m3",
        name: "Crown Jewel Breakfast Wrap",
        description: "Precious wrap containing the finest ingredients",
        price: 16.95,
        category: "Sandwiches & Wraps"
      },
      {
        id: "r50-m4",
        name: "Royal Coffee Experience",
        description: "Coffee service fit for royalty with golden accessories",
        price: 8.50,
        category: "Beverages"
      },
      {
        id: "r50-m5",
        name: "Crown Pastry Collection",
        description: "Exquisite selection of royal pastries (5 pieces)",
        price: 15.95,
        category: "Pastries & Baked Goods"
      },
      {
        id: "r50-m6",
        name: "Golden Crown Hash",
        description: "Hash browns prepared with the finest golden potatoes",
        price: 12.50,
        category: "Sides"
      },
      {
        id: "r50-m7",
        name: "Champagne Breakfast Cocktail",
        description: "Sparkling breakfast cocktail with fresh fruit",
        price: 11.95,
        category: "Beverages"
      },
      {
        id: "r50-m8",
        name: "Royal Berry Compote",
        description: "Artisanal berry compote with gold leaf",
        price: 9.75,
        category: "Sides"
      }
    ]
  }
];

export default portlandBreakfastRestaurants;