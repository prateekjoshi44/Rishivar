import "@splidejs/splide/css";
import Splide from "@splidejs/splide";
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { useEffect } from "react";
import AstrosCard from "./astroPlaceholder/AstrosCard";
import { useNavigate } from "react-router-dom";


const AstroSlider = ({ astros, mode }) => {
    let splide;
    const id = mode + "AstroSlider"
    const navigate = useNavigate()

    useEffect(() => {
        splide = new Splide("#" + id, {
            type: 'loop',
            drag: 'free',
            focus: 'center',
            autoScroll: {
                speed: 0.35,
            },
            arrows: false,
            pagination: false,
            fixedWidth: window.innerWidth * 0.50,
        });
        splide.mount({ AutoScroll });

        return () => {
            splide?.destroy();
        };
    }, []);



    return (
        <section className="splide" id={id}>
            <div className="splide__track pt-3 pb-5">
                <ul className="splide__list">
                    {astros?.map((astro, index) => (

                        <li key={index} className="splide__slide">
                            <div className="mx-2 text-decoration-none" onClick={() => navigate(`/Astro/${astro.id}`)}>
                                <AstrosCard key={astro.id} {...astro} showContactIcons={false} showAvailabilityBanner={false} />
                            </div>
                        </li>

                    ))}
                </ul>
            </div>
        </section>
    )

};

export default AstroSlider;
