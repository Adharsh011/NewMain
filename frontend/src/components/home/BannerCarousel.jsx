import Slider from "react-slick";
import { bannerImages } from "../../data/homeMockData";

export default function BannerCarousel(){
    const settings = {
            dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

    };

    return (
        <div className="w-full">
            <Slider {...settings}>
            {bannerImages.map((img,idx)=>(
                <div key={idx}>
                    <img
                        src={img}
                        alt={`banner-${idx}`}
                        className="w-full h-[400px] object-cover rounded-lg"
                    />
                </div>
            ))}

            </Slider>
        </div>
    )
}