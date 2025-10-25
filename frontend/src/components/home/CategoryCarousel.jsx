import Slider from "react-slick";
import { categoryProducts } from "../../data/homeMockData";

export default function CategoryCarousel({ category }) {
  const products = categoryProducts[category?.toLowerCase()] || [];

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
  };

  return (
    <section className="py-8 px-6">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
        {category} Highlights
      </h3>
      <Slider {...settings}>
        {products.map((p) => (
          <div
            key={p.id}
            className="p-2 hover:scale-105 transition-transform duration-200"
          >
            <div className="border rounded-lg shadow-sm p-3 bg-white text-center">
              <img
                src={p.image}
                alt={p.name}
                className="h-40 w-full object-cover mb-3 rounded"
              />
              <h4 className="font-medium text-gray-700">{p.name}</h4>
              <p className="text-blue-600 font-semibold">${p.price}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

