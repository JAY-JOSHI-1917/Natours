import tourImg01 from "../images/kutch-rann-main.jpg";
import tourImg02 from "../images/Shoolpaneshwar-Zarwani-Water-fall.jpg";
import tourImg03 from "../images/Saputara-main.jpg";
import tourImg04 from "../images/Polo-Forest-main.jpg";
import tourImg05 from "../images/Willson-Hills-main.jpg";
import tourImg06 from "../images/Mount-Abu-main.jpg";
import tourImg07 from "../images/Don-Hill-Station-main.jpg";
import tourImg08 from "../images/Jambughoda-Wildlife-Sanctuary-main.jpg";

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
];

export default tours;