import { trendingProducts } from "../../data/homeMockData";

export default function TrendingProducts(){
    return (
        <section className="py-10 px-6 bg-gray-50">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">🔥 Trending Now</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {trendingProducts.map((p)=>(
                    <div 
                    key={p.id}
                    className="bg-white border rounded-lg shadow hover:shadow-md transition p-3 text-center"
                    >
                        <img
                            src={p.image}
                            alt={p.name}
                            className="h-36 w-full object-cover rounded mb-3"
                        />
                           <h4 className="font-medium">{p.name}</h4>
            <p className="text-blue-600 font-semibold">${p.price}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}