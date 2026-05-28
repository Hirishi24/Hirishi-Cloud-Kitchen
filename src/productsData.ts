export interface WeightOption {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  features: string[];
  weights: WeightOption[];
  isVeg: boolean;
}

export interface SweetProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}

export interface SnackProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
  category: string;
}

export const pickles: Product[] = [
  {
    id: "chicken-bone",
    name: "Chicken Bone Pickle",
    image: "Chicken Bone Pickle.webp",
    description: "Experience the authentic taste of our Chicken Bone Pickle, made with carefully selected chicken bones and our special blend of spices. This pickle is perfect for those who love the rich, meaty flavor combined with the perfect amount of spice.",
    features: [
      "Made with premium quality chicken bones",
      "Authentic spice blend",
      "Long shelf life",
      "Perfect for any occasion"
    ],
    weights: [
      { label: "250g", price: 349 },
      { label: "500g", price: 749 },
      { label: "1kg", price: 1399 }
    ],
    isVeg: false
  },
  {
    id: "chicken-bone-boneless",
    name: "Chicken Bone+ Boneless Pickle",
    image: "Chicken Bone+ Boneless Pickle.svg",
    description: "Indulge in our premium Chicken Bone+ Boneless Pickle, a perfect combination of succulent boneless chicken pieces and flavorful bone-in chicken. This unique blend offers the best of both worlds - the rich taste of bone-in chicken and the convenience of boneless pieces, all marinated in our special spice blend.",
    features: [
      "Premium quality chicken with both bone-in and boneless pieces",
      "Special blend of aromatic spices and herbs",
      "Perfect balance of flavors - spicy, tangy, and savory",
      "Made with natural ingredients and preservatives",
      "Great as a side dish or main accompaniment"
    ],
    weights: [
      { label: "250g", price: 399 },
      { label: "500g", price: 799 },
      { label: "1kg", price: 1499 }
    ],
    isVeg: false
  },
  {
    id: "chicken-boneless",
    name: "Chicken Boneless Pickle",
    image: "Chicken Boneless Pickle.webp",
    description: "Savor the convenience and rich flavors of our Chicken Boneless Pickle, made with premium quality boneless chicken pieces. Each bite offers a perfect blend of spices and tender chicken, making it an ideal choice for those who prefer boneless meat. Our special marination process ensures that every piece is packed with authentic flavors.",
    features: [
      "Premium quality boneless chicken pieces",
      "Expertly marinated with traditional spices",
      "Perfect balance of heat and tanginess",
      "Made with natural ingredients and preservatives",
      "Convenient and easy to serve"
    ],
    weights: [
      { label: "250g", price: 449 },
      { label: "500g", price: 849 },
      { label: "1kg", price: 1599 }
    ],
    isVeg: false
  },
  {
    id: "chicken-thokku",
    name: "Chicken Thokku Pickle",
    image: "Chicken Thokku Pickle.webp",
    description: "Experience the unique taste of our Chicken Thokku Pickle, a traditional South Indian style pickle that combines finely minced chicken with a special blend of spices. This semi-dry preparation offers an intense burst of flavors with every bite, making it a perfect accompaniment to rice, roti, or as a spread.",
    features: [
      "Finely minced chicken in a semi-dry preparation",
      "Authentic South Indian spice blend",
      "Rich in flavors with a perfect balance of spices",
      "Made with natural ingredients and preservatives",
      "Versatile - can be used as a spread or side dish"
    ],
    weights: [
      { label: "250g", price: 449 },
      { label: "500g", price: 849 },
      { label: "1kg", price: 1599 }
    ],
    isVeg: false
  },
  {
    id: "gongura-chicken-boneless",
    name: "Gongura Chicken Boneless",
    image: "Gongura Chicken Boneless.webp",
    description: "Discover the unique flavors of Andhra Pradesh with our Gongura Chicken Boneless pickle. Made with tender boneless chicken pieces and authentic gongura (sorrel leaves), this pickle offers a perfect blend of tangy and spicy flavors. The gongura leaves add a distinctive sour taste that makes this pickle truly special.",
    features: [
      "Premium quality boneless chicken pieces",
      "Authentic gongura (sorrel leaves) preparation",
      "Perfect balance of tangy and spicy flavors",
      "Traditional Andhra-style recipe",
      "Made with natural ingredients and preservatives"
    ],
    weights: [
      { label: "250g", price: 499 },
      { label: "500g", price: 899 },
      { label: "1kg", price: 1699 }
    ],
    isVeg: false
  },
  {
    id: "natukodi",
    name: "Natukodi Pickle",
    image: "Natukodi Pickle.webp",
    description: "Experience the authentic taste of traditional Natukodi (Country Chicken) Pickle, made with free-range country chicken pieces. This premium pickle is prepared using age-old recipes and a special blend of spices that enhance the natural flavors of country chicken. The unique taste and texture of country chicken makes this pickle a gourmet delight.",
    features: [
      "Premium quality country chicken pieces",
      "Traditional spice blend and preparation method",
      "Rich in natural flavors and nutrients",
      "Made with natural ingredients and preservatives",
      "Perfect accompaniment for rice and roti"
    ],
    weights: [
      { label: "250g", price: 549 },
      { label: "500g", price: 1049 },
      { label: "1kg", price: 1999 }
    ],
    isVeg: false
  },
  {
    id: "pandugappa-fish",
    name: "Pandugappa Fish Pickle",
    image: "Pandugappa Fish Pickle.webp",
    description: "Savor the authentic taste of our Pandugappa Fish Pickle, made with premium quality fish pieces marinated in a special blend of spices. This traditional pickle combines the rich flavors of fresh fish with aromatic spices, creating a perfect balance of taste and texture. Each bite brings you the authentic flavors of coastal cuisine.",
    features: [
      "Premium quality fish pieces",
      "Traditional spice blend and preparation",
      "Perfect balance of flavors and spices",
      "Made with natural ingredients and preservatives",
      "Ideal accompaniment for rice and roti"
    ],
    weights: [
      { label: "250g", price: 599 },
      { label: "500g", price: 1099 },
      { label: "1kg", price: 2099 }
    ],
    isVeg: false
  },
  {
    id: "prawns",
    name: "Prawns Pickle",
    image: "Prawns Pickle.webp",
    description: "Experience the exquisite taste of our Prawns Pickle, crafted with premium quality prawns marinated in a special blend of spices. This coastal delicacy combines the succulent texture of prawns with aromatic spices, creating a perfect harmony of flavors. Each bite brings you the authentic taste of coastal cuisine.",
    features: [
      "Premium quality prawns",
      "Traditional spice blend and preparation",
      "Perfect balance of flavors and spices",
      "Made with natural ingredients and preservatives",
      "Ideal accompaniment for rice and roti"
    ],
    weights: [
      { label: "250g", price: 599 },
      { label: "500g", price: 1099 },
      { label: "1kg", price: 2099 }
    ],
    isVeg: false
  },
  {
    id: "gongura-prawns",
    name: "Gongura Prawns Pickle",
    image: "Gongura Prawns Pickle.webp",
    description: "Discover the unique fusion of flavors in our Gongura Prawns Pickle, where succulent prawns meet the tangy taste of gongura leaves. This special pickle combines the rich taste of prawns with the distinctive sourness of gongura, creating a perfect balance of flavors. Each bite brings you the authentic taste of Telugu cuisine with a modern twist.",
    features: [
      "Premium quality prawns",
      "Fresh gongura leaves",
      "Traditional spice blend",
      "Made with natural ingredients",
      "Perfect balance of tangy and spicy flavors"
    ],
    weights: [
      { label: "250g", price: 649 },
      { label: "500g", price: 1199 },
      { label: "1kg", price: 2299 }
    ],
    isVeg: false
  },
  {
    id: "mutton-boneless",
    name: "Mutton Boneless Pickle",
    image: "Mutton Boneless Pickle.webp",
    description: "Indulge in the rich flavors of our Mutton Boneless Pickle, made with premium quality boneless mutton pieces marinated in a special blend of spices. This traditional pickle combines the tender texture of mutton with aromatic spices, creating a perfect balance of taste and texture. Each bite brings you the authentic taste of traditional Indian cuisine.",
    features: [
      "Premium quality boneless mutton",
      "Traditional spice blend and preparation",
      "Perfect balance of flavors and spices",
      "Made with natural ingredients and preservatives",
      "Ideal accompaniment for rice and roti"
    ],
    weights: [
      { label: "250g", price: 699 },
      { label: "500g", price: 1249 },
      { label: "1kg", price: 2399 }
    ],
    isVeg: false
  },
  {
    id: "gongura-mutton-boneless",
    name: "Gongura Mutton Boneless Pickle",
    image: "Gongura Mutton Boneless.webp",
    description: "Experience the unique fusion of flavors in our Gongura Mutton Boneless Pickle, where tender boneless mutton meets the tangy taste of gongura leaves. This special pickle combines the rich taste of mutton with the distinctive sourness of gongura, creating a perfect balance of flavors. Each bite brings you the authentic taste of Telugu cuisine with a modern twist.",
    features: [
      "Premium quality boneless mutton",
      "Fresh gongura leaves",
      "Traditional spice blend",
      "Made with natural ingredients",
      "Perfect balance of tangy and spicy flavors"
    ],
    weights: [
      { label: "250g", price: 699 },
      { label: "500g", price: 1249 },
      { label: "1kg", price: 2499 }
    ],
    isVeg: false
  },
  {
    id: "mutton-kheema",
    name: "Mutton Kheema Pickle",
    image: "kheema-pickle_1650345517.jpg",
    description: "Savor the rich and flavorful Mutton Kheema Pickle, made with premium quality minced mutton marinated in a special blend of spices. This unique pickle combines the tender texture of minced mutton with aromatic spices, creating a perfect balance of taste and texture. Each bite brings you the authentic taste of traditional Indian cuisine in a convenient form.",
    features: [
      "Premium quality minced mutton",
      "Traditional spice blend and preparation",
      "Perfect balance of flavors and spices",
      "Made with natural ingredients and preservatives",
      "Ideal accompaniment for rice and roti"
    ],
    weights: [
      { label: "250g", price: 799 },
      { label: "500g", price: 1299 },
      { label: "1kg", price: 2499 }
    ],
    isVeg: false
  }
];

export const vegPickles: Product[] = [
  {
    id: "mango",
    name: "Mango Pickle",
    image: "mango-pickle.png",
    description: "Freshly sliced green mangoes pickled in a blend of rich mustard seeds, red chili powder, oil, and traditional spices. A staple in Indian households, offering a perfectly sour and spicy kick.",
    features: [
      "Fresh quality sour mangoes",
      "Aromatic mustard oil and spices",
      "Perfect accompaniment for daily meals"
    ],
    weights: [
      { label: "250g", price: 200 },
      { label: "500g", price: 350 },
      { label: "1kg", price: 650 }
    ],
    isVeg: true
  },
  {
    id: "lemon",
    name: "Lemon Pickle",
    image: "lemon-pickle.png",
    description: "Tangy and flavorful lemon halves matured with salt, red chili powder, fenugreek, and mustard seeds. This classic pickle has a bright, savory flavor that complements curd rice beautifully.",
    features: [
      "Sun-ripened lemons",
      "Rich digestive spices",
      "Traditional oil-free mature recipe"
    ],
    weights: [
      { label: "250g", price: 180 },
      { label: "500g", price: 320 },
      { label: "1kg", price: 600 }
    ],
    isVeg: true
  },
  {
    id: "green-chilli",
    name: "Green Chilli Pickle",
    image: "green-chilli-pickle.png",
    description: "Fiery hot green chilies sliced and marinated in a rich mustard and lemon base. Perfect for spice lovers looking to add heat and flavor to any dish.",
    features: [
      "Fresh, crisp green chilies",
      "Strong mustard flavor",
      "Tangy lemon extract infusion"
    ],
    weights: [
      { label: "250g", price: 220 },
      { label: "500g", price: 400 },
      { label: "1kg", price: 750 }
    ],
    isVeg: true
  },
  {
    id: "mixed-veg",
    name: "Mixed Veg Pickle",
    image: "mixed-veg-pickle.png",
    description: "A colorful blend of seasonal vegetables like carrots, cauliflower, and peas pickled in aromatic spices. Offers a crunchy texture and rich flavor in every bite.",
    features: [
      "Assorted fresh vegetables",
      "Traditional pickle spices",
      "Crispy and savory taste profile"
    ],
    weights: [
      { label: "250g", price: 250 },
      { label: "500g", price: 450 },
      { label: "1kg", price: 850 }
    ],
    isVeg: true
  }
];

export const sweets: SweetProduct[] = [
  {
    id: "pootharekulu",
    name: "Nethi Pootharekulu (Dry Fruit Jaggery)",
    description: "The legendary Andhra 'paper-sweet'! Translucent, paper-thin rice starch wrappers folded with pure liquid ghee (Nethi), rich organic jaggery, and crushed premium cashews, pistachios & almonds. Melts instantly in the mouth.",
    price: "₹900/kg",
    image: "pootharekulu.png",
    badge: "Royal Heritage"
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    description: "Soft and spongy milk-solid balls soaked in rose-flavored sugar syrup",
    price: "₹350/kg",
    image: "gulab-jamun.png",
    badge: "Best Seller"
  },
  {
    id: "rasgulla",
    name: "Rasgulla",
    description: "Spongy cottage cheese balls soaked in light sugar syrup",
    price: "₹300/kg",
    image: "rasgulla.png",
    badge: "Popular"
  },
  {
    id: "kaju-katli",
    name: "Kaju Katli",
    description: "Diamond-shaped cashew fudge with a rich, melt-in-mouth texture",
    price: "₹800/kg",
    image: "kaju-katli.png",
    badge: "Premium"
  },
  {
    id: "ladoo",
    name: "Besan Ladoo",
    description: "Sweet gram flour balls flavored with cardamom and ghee",
    price: "₹400/kg",
    image: "besan-ladoo.png",
    badge: "Traditional"
  }
];

export const snacks: SnackProduct[] = [
  {
    id: "murukku",
    name: "Murukku",
    description: "Crispy and crunchy spiral-shaped snack made from rice flour and spices",
    price: "₹250/kg",
    image: "murukku.png",
    badge: "Best Seller",
    category: "Traditional"
  },
  {
    id: "mixture",
    name: "Mixture",
    description: "A delightful mix of various fried snacks with peanuts and spices",
    price: "₹300/kg",
    image: "mixture.png",
    badge: "Popular",
    category: "Mixed"
  },
  {
    id: "thatte",
    name: "Thatte",
    description: "Crispy diamond-shaped snack made from rice flour and urad dal",
    price: "₹280/kg",
    image: "thatte.png",
    badge: "Crispy",
    category: "Traditional"
  },
  {
    id: "kara-sev",
    name: "Kara Sev",
    description: "Spicy and crispy vermicelli-like snack made from gram flour",
    price: "₹320/kg",
    image: "snacks-cloud.png",
    badge: "Spicy",
    category: "Spicy"
  },
  {
    id: "pindi-vadiyalu",
    name: "Pindi Vadiyalu",
    description: "Traditional sun-dried crispy fryums made from premium rice flour or tapioca. A crunchy Telugu staple perfect as a meal side or quick crispy snack.",
    price: "₹280/kg",
    image: "pindi-vadiyalu.png",
    badge: "Vadiyalu",
    category: "Traditional"
  },
  {
    id: "minapa-vadiyalu",
    name: "Minapa Vadiyalu",
    description: "Authentic sun-dried lentil (urad dal) dumplings/crisps, fried to a golden crunch. Imbued with light spices, bringing an unforgettable, rich, savory texture.",
    price: "₹320/kg",
    image: "minapa-vadiyalu.png",
    badge: "Lentil Dumpling",
    category: "Traditional"
  },
  {
    id: "saggubiyyam-vadiyalu",
    name: "Saggubiyyam Vadiyalu",
    description: "Light and puffed sun-dried sabudana (sago) fryums. These beautifully translucent crispy discs expand magnificently when fried, offering a delicate crunch.",
    price: "₹300/kg",
    image: "saggubiyyam-vadiyalu.png",
    badge: "Sabudana Fryum",
    category: "Traditional"
  },
  {
    id: "regi-vadiyalu",
    name: "Regi Vadiyalu",
    description: "An explosion of flavors! Traditional sun-dried sweet, sour, and spicy jujube berry candy treats. A beloved classic South Indian nostalgic preparation.",
    price: "₹360/kg",
    image: "regi-vadiyalu.png",
    badge: "Sweet & Spicy Candy",
    category: "Spicy"
  },
  {
    id: "majjiga-mirapakayalu",
    name: "Majjigalo Mirapakayalu",
    description: "Traditional South Indian sun-dried curd chillies (buttermilk chillies / sandige menasinakai), deep-fried to a dark crispy brown perfection. Spicy, tangy, and salty - the ultimate crunch accompaniment to curd rice.",
    price: "₹300/kg",
    image: "majjiga-mirapakayalu.png",
    badge: "Curd Chilli",
    category: "Spicy"
  }
];

export const allProducts: Product[] = [...pickles, ...vegPickles];
