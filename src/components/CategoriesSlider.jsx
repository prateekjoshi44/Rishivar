import "@splidejs/splide/css";
import Splide from "@splidejs/splide";
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Icons from "./ui/Icons";

const CategoriesSlider = () => {
    let splide;
    const navigate = useNavigate();

    const options = [
        {
            name: "Love",
            icon: Icons.love("fs-3"),
        },
        {
            name: "Education",
            icon: Icons.education("fs-3"),
        },
        {
            name: "Health",
            icon: Icons.health("fs-3"),
        },
        {
            name: "Career",
            icon: Icons.career("fs-3"),
        },
        {
            name: "Marriage",
            icon: Icons.marriage("fs-3"),
        },
        {
            name: "Children",
            icon: Icons.children("fs-3"),
        },
        {
            name: "Litigation",
            icon: Icons.litigation("fs-3"),
        },
        {
            name: "Property",
            icon: Icons.property("fs-3"),
        },
        {
            name: "Investment",
            icon: Icons.investment("fs-3"),
        },
        {
            name: "Travel",
            icon: Icons.travel("fs-3"),
        },
        {
            name: "Spiritual",
            icon: Icons.spiritual("fs-3"),
        },

    ];
    useEffect(() => {
        splide = new Splide("#CategoriesSlider", {
            type: 'loop',
            drag: 'free',
            focus: 'center',
            autoScroll: {
                speed: 0.35,
            },
            arrows: false,
            pagination: false,
            fixedWidth: 100,
        });
        splide.mount({ AutoScroll });

        return () => {
            splide?.destroy();
        };
    }, []);

    return (
        <section className="splide " id="CategoriesSlider">
            <div className="splide__track">
                <ul className="splide__list">
                    {options?.map((option, index) => (
                        <li key={index} className="splide__slide">
                            <div
                                className="card justify-content-between shadow-sm mx-2 rounded-10 align-items-center p-2 fs-9 h-100  border-warning  fw-semibold "
                                style={{ border: "0.2px solid" }}
                                onClick={() => navigate(`/Astro/Category/${option.name}`)}
                            >
                                <div className="icon-container" >
                                    {option.icon}
                                </div>
                                <p className='mt-2 fs-10 mont fw-semibold' >{option.name.toUpperCase()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
};

export default CategoriesSlider;
