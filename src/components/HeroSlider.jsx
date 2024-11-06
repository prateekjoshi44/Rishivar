import "@splidejs/splide/css";
import Splide from "@splidejs/splide";
import { useEffect } from "react";
import head from '../assets/images/home/headImg.png';
import head2 from '../assets/images/home/headImg2.png';
import head3 from '../assets/images/home/headImg3.png';

const HeroSlider = () => {
    let splide;

    const images = [head, head2, head3];

    useEffect(() => {
        splide = new Splide("#HeroSlider", {
            type: 'loop',
            padding: '20px',
            fixedWidth: window.innerWidth * 0.90,
            autoScroll: {
                speed: 1,
            },
            autoplay: true,
            arrows: false,
            pagination: false,
        });
        splide.mount();

        return () => {
            splide?.destroy();
        };
    }, []);

    return (
        <section className="splide my-4" id="HeroSlider">
            <div className="splide__track">
                <ul className="splide__list">
                    {images?.map((src, index) => (
                        <li key={index} className="splide__slide">
                            <div className="card shadow-sm mx-2 overflow-hidden rounded-4">
                                <img src={src} className="w-100" alt={`Slide ${index + 1}`} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )

};

export default HeroSlider;
