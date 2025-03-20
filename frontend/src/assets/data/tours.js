import tourImg01 from "../images/kutch-rann-main.jpg";
import tourImg02 from "../images/Shoolpaneshwar-Zarwani-Water-fall.jpg";
import tourImg03 from "../images/Saputara-main.jpg";
import tourImg04 from "../images/Polo-Forest-main.jpg";
import tourImg05 from "../images/Willson-Hills-main.jpg";
import tourImg06 from "../images/Mount-Abu-main.jpg";
import tourImg07 from "../images/Don-Hill-Station-main.jpg";
import tourImg08 from "../images/Jambughoda-Wildlife-Sanctuary-main.jpg";
import tourImg09 from "../images/Dal-Lake-main.jpg";
import tourImg10 from "../images/Lonar-lake-main.jpg";
import tourImg11 from "../images/Manali-main.jpg";
import tourImg12 from "../images/Munnar-main.jpg";
import tourImg13 from "../images/Ooty-main.jpg";
import tourImg14 from "../images/Sundarbans-main.jpg";
import tourImg15 from "../images/Valley-of-flower-main.jpg";
import tourImg16 from "../images/Ziro-valley-main.jpg";

const tours = [
  {
    id: "01",
    title: "Safed Rann, Kalo Dungar",
    city: "Kutch",
    address: "Gujarat",
    price: 2000,
    maxGroupSize: 10,
    desc: "The Rann of Kutch, also known as the Great White Desert, is a large, flat area located in the Kutch district of Gujarat, India. It becomes a bright white landscape during the dry season when the water dries up, leaving behind a layer of salt. It's famous for its stunning natural beauty and vibrant cultural festivals. People from all over the world visit this place to experience its magical, moon-like scenery, especially during the Rann Utsav, a cultural festival held every year.",
    desc2:
      "Kalo Dungar, or Black Hill, is the highest point in Kutch, Gujarat. From here, you can see amazing views of the Great Rann of Kutch, which looks like a huge white salt desert.People love coming here to watch the beautiful sunset and enjoy the peaceful surroundings. It's a great place to relax and connect with nature.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
      {
        name: "jhon doe",
        rating: 5,
      },
    ],
    avgRating: 4.5,
    photo: tourImg01,
    // photo2:,
    featured: true,
  },
  {
    id: "02",
    title: "Shoolpaneshwar Wildlife Sanctuary",
    city: "Bharuch",
    address: "Gujarat",
    price: 1800,
    maxGroupSize: 8,
    desc: "Shoolpaneshwar Wildlife Sanctuary is near Rajpipla in Gujarat. It has lots of green forests and hills, making it a great home for different animals like leopards, sloth bears, and sambar deer. You'll also see many types of birds here. The sanctuary is very peaceful and has beautiful rivers and waterfalls. It's the perfect place for nature lovers to relax and enjoy the beauty of the wild.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg02,
    featured: true,
  },
  {
    id: "03",
    title: "Saputara",
    city: "Dang",
    address: "Gujarat",
    price: 1999,
    maxGroupSize: 8,
    desc: "Saputara is the only hill station in Gujarat. It's known for its nice weather and beautiful views. You can see lots of green plants, calm lakes, and pretty gardens here. The Saputara Lake is a great spot for boating, and there are many places where you can look out and see amazing views of the hills and valleys around. It's a perfect place to relax and enjoy nature.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg03,
    featured: true,
  },
  {
    id: "04",
    title: "Don Hill Station",
    city: "Dang",
    address: "Gujarat",
    price: 1600,
    maxGroupSize: 8,
    desc: "Don Hills is a hidden treasure in Gujarat, near Saputara. It's a quiet and beautiful hill station with cool weather, gentle breezes, and lots of green scenery. It's a perfect place to get away from the busy city life. The hills are covered with thick forests, making it a peaceful spot to connect with nature. The views from Don Hills are amazing, with green valleys, misty peaks, and colorful plants.",
    desc2:
      "For adventure seekers, Don Hills has great trekking paths where you can explore the wild and find hidden streams and waterfalls. The calm surroundings make it a perfect place for meditation and relaxation. Don Hills is a paradise for nature lovers, offering a mix of adventure and peace that refreshes the mind and soul.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg07,
    featured: true,
  },
  {
    id: "05",
    title: "Wilson Hills",
    city: "Valsad",
    address: "Gujarat",
    price: 1600,
    maxGroupSize: 8,
    desc: "Wilson Hills is a quiet hill station in Gujarat. It's known for its pretty views and peaceful surroundings. It's near Valsad and has amazing views of the valleys and forests around it. The cool weather and green scenery make it a perfect place to relax and enjoy nature.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg05,
    featured: false,
  },
  {
    id: "06",
    title: "Mount Abu",
    city: "Sirohi",
    address: "Rajasthan",
    price: 1500,
    maxGroupSize: 8,
    desc: "Mount Abu is the only hill station in Rajasthan, near Gujarat. It's a beautiful place with cool weather, green forests, and lovely lakes. One of the main attractions is Nakki Lake, where you can enjoy boating. The place also has stunning viewpoints like Sunset Point and Honeymoon Point, offering amazing views of the hills and valleys.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg06,
    featured: false,
  },
  {
    id: "07",
    title: "Polo Forest",
    city: "Sabarkantha",
    address: "Gujarat",
    price: 1500,
    maxGroupSize: 8,
    desc: "Polo Forest is a beautiful and quiet place near the Gujarat-Rajasthan border. It's full of green trees, old ruins, and small streams. The forest is perfect for hiking and exploring nature. You'll find peace and calm in the dense forest, and it's a great spot for a relaxing escape from the city.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg04,
    featured: false,
  },
  {
    id: "08",
    title: "Jambughoda Wildlife Sanctuary",
    city: "Panchmahal",
    address: "Gujarat",
    price: 2000,
    maxGroupSize: 8,
    desc: "Jambughoda Wildlife Sanctuary is a peaceful place in Gujarat, near Vadodara. It's a large area with lots of green forests and hills. You can see many animals like leopards, sloth bears, wild boars, and deer. There are also many birds and reptiles. The sanctuary has two big lakes, Kada and Targol, which add to the beauty and help support the wildlife.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg08,
    featured: false,
  },
  {
    id: "09",
    title: "Dal Lake",
    city: "Srinagar",
    address: "Jammu and Kashmir",
    price: 2000,
    maxGroupSize: 10,
    desc: "Dal Lake's enchanting ambiance and cultural richness make it a must-visit destination for those seeking natural beauty and a glimpse into Kashmiri heritage.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg09,
    featured: true
  },
  {
    id: "10",
    title: "Lonar Lake",
    city: "Maharashtra",
    address: "Buldhana district",
    price: 2000,
    maxGroupSize: 10,
    desc: "Lonar Lake is a breathtaking natural wonder that whispers tales of celestial impact and timeless beauty. Formed over 50,000 years ago by a meteorite collision, this emerald-hued lake is cradled within lush greenery, creating a surreal escape into nature’s embrace.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg10,
    featured: true
  },
  {
    id: "11",
    title: "Manali",
    city: "Kullu",
    address: "Himachal Pradesh",
    price: 2000,
    maxGroupSize: 10,
    desc: "A breathtakingly beautiful destination offering pristine snow-covered peaks, valleys, and exciting winter sports. Manali is a beautiful hill station with snowy mountains, green valleys, and a cool breeze. The sound of flowing rivers and tall pine trees makes it feel magical. Whether you want adventure or just relax, Manali is the perfect place.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg11,
    featured: true
  },
  {
    id: "12",
    title: "Munnar",
    city: "Kerala",
    address: "Kerala",
    price: 2000,
    maxGroupSize: 10,
    desc: "Munnar's natural beauty, pleasant climate, and tranquil atmosphere make it an ideal getaway for nature lovers, honeymooners, and those seeking relaxation.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg12,
    featured: true
  },
  {
    id: "13",
    title: "Ooty Lakes",
    city: "Ooty",
    address: "Tamil Nadu",
    price: 2000,
    maxGroupSize: 10,
    desc: "A scenic and serene hill station surrounded by rolling hills, lush green forests, and sparkling lakes.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg13,
    featured: true
  },
  {
    id: "14",
    title: "Sundarbans",
    city: "West Bengal",
    address: "Sundarbans",
    price: 2000,
    maxGroupSize: 10,
    desc: "Explore the largest mangrove forest in the world, home to the majestic Royal Bengal Tiger, crocodiles, and rare bird species. Enjoy a thrilling boat safari through the dense waterways and experience the beauty of nature in its rawest form.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg14,
    featured: true
  },
  {
    id: "15",
    title: "Valley of Flowers",
    city: "Ooty",
    address: "Uttarakhand",
    price: 2000,
    maxGroupSize: 10,
    desc: "Valley of Flowers is like a natural garden in the mountains, full of colorful wildflowers. The air smells fresh, and the soft breeze makes the flowers dance. It is a perfect place for nature lovers and those who love quiet, beautiful views.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg15,
    featured: true
  },
  {
    id: "16",
    title: "Ziro Valley",
    city: "Arunachal Pradesh",
    address: "Arunachal Pradesh",
    price: 2000,
    maxGroupSize: 10,
    desc: "Ziro Valley is a hidden paradise with rolling green hills and golden rice fields. The place is calm, with birds chirping and fresh mountain air all around. It feels like stepping into a peaceful world far away from the city. A picturesque and serene valley in Arunachal Pradesh, surrounded by lush green hills, rice fields, and bamboo forests.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg16,
    featured: true
  }  
];

export default tours;