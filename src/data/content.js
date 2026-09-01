import property1 from "../assets/images/property1.jpg";
import property2 from "../assets/images/property2.jpg";
import property3 from "../assets/images/property3.jpg";
import property4 from "../assets/images/property4.jpg";
import property5 from "../assets/images/property5.jpg";
import property6 from "../assets/images/property6.jpg";
import property7 from "../assets/images/property7.jpg";
import property8 from "../assets/images/property8.jpg";
import residential from "../assets/images/residential.jpg";
import commercial from "../assets/images/commercial.jpg";
import industrial from "../assets/images/Industrial.jpg";
import luxury from "../assets/images/luxury.jpg";
import agriculture from "../assets/images/Agriculture.jpg";
import slide3 from "../assets/images/slide3.png";
import slide4 from "../assets/images/slide4.jpg";
import slide5 from "../assets/images/slide5.png";

// Slides used in the hero background rotation — one representative shot per
// Sitara society, so the home section reads as a tour of the societies only.
export const heroSlides = [
  { src: slide4, caption: "Sitara Supreme City" },
  { src: property1, caption: "Wadi-e-Sitara" },
  { src: slide3, caption: "Sitara Valley City" },
  { src: luxury, caption: "Sitara Villas" },
  { src: slide5, caption: "Sitara Smart City" },
  { src: property7, caption: "Wadi-e-Sitara — completed villas" },
];

// The "society pic slides" reel — real photographs from the societies
export const societyPhotos = [
  { src: property1, alt: "Wadi-e-Sitara entrance signage" },
  { src: property2, alt: "Wadi-e-Sitara society view" },
  { src: property3, alt: "Wadi-e-Sitara street" },
  { src: property6, alt: "Community mosque" },
  { src: property7, alt: "Completed villa" },
  { src: slide4, alt: "Sitara Supreme City gate" },
  { src: property4, alt: "Society development" },
  { src: property5, alt: "Society development" },
  { src: property8, alt: "Society amenity" },
  { src: slide3, alt: "Sitara Valley City" },
  { src: slide5, alt: "Sitara Smart City" },
];

export const properties = [
  {
    type: "Residential",
    title: "Residential Plots",
    location: "Wadi-e-Sitara — 6, 10, 15, 20, 30 Marla",
    price: "PKR 2 – 4 Crore",
    img: residential,
  },
  {
    type: "Commercial",
    title: "Commercial Projects",
    location: "Faisalabad",
    price: "PKR 4 Crore",
    img: commercial,
  },
  {
    type: "Industrial",
    title: "Industrial Projects",
    location: "Faisalabad — 5,000 sq. yd",
    price: "PKR 5 Crore",
    img: industrial,
  },
  {
    type: "Luxury",
    title: "Luxury Villas",
    location: "Sitara Villas — 1,500 sq. yd",
    price: "PKR 3.5 Crore",
    img: luxury,
  },
  {
    type: "Agriculture",
    title: "Agriculture Land",
    location: "Faisalabad — 5,000 sq. yd",
    price: "PKR 4 Crore",
    img: agriculture,
  },
  {
    type: "Residential",
    title: "Sitara Supreme City",
    location: "Faisalabad — 2,000 sq. yd",
    price: "PKR 1.5 Crore",
    img: slide4,
  },
  {
    type: "Residential",
    title: "Sitara Smart City",
    location: "Faisalabad — 2,000 sq. yd",
    price: "PKR 1 Crore",
    img: slide5,
  },
  {
    type: "Residential",
    title: "Sitara Valley City",
    location: "Faisalabad — 2,000 sq. yd",
    price: "PKR 2 Crore",
    img: slide3,
  },
];

export const propertyFilters = ["All", "Residential", "Commercial", "Luxury", "Industrial", "Agriculture"];

export const stats = [
  { target: 500, suffix: "+", label: "Properties Sold" },
  { target: 500, suffix: "+", label: "Happy Clients" },
  { target: 23, suffix: "", label: "Years of Experience" },
];

export const testimonials = [
  {
    quote: "Hussnain Estate Advisor helped me find the perfect property. Professional and trustworthy from the first call.",
    name: "Ahmed Mujtaba",
  },
  {
    quote: "Amazing guidance throughout our property investment journey — every question was answered honestly.",
    name: "Fawad Ahmed",
  },
  {
    quote: "Highly recommend. Very responsive team and they know the Sitara projects inside out.",
    name: "Muhammad Rizwan",
  },
];

export const contactInfo = {
  phone: "+92 300 7632767",
  phoneHref: "tel:+923007632767",
  email: "Tippualijee777@gmail.com",
  whatsapp: "https://wa.me/923007632767?text=Hello%20I%20want%20property%20details",
  facebook: "https://www.facebook.com/share/17F7oSv68W/",
  instagram: "https://www.instagram.com/tippu7618?igsh=MXF6ZHVhdmk2OGU0eQ==",
  youtube: "https://youtu.be/VmYNBCD0SsA?si=4MKPNkTNryt7_N-Y",
  address: "Main Wadi-e-Sitara Road, Opp. Nimra Textile Mills, Faisalabad",
  mapEmbed: "https://www.google.com/maps?q=31.473639,73.218306&output=embed",
};
