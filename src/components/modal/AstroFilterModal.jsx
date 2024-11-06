import Icons from '../ui/Icons';
import vedic from "../../assets/images/skills/vedic.png"
import Tarot from "../../assets/images/skills/Tarot.png"
import Numerology from "../../assets/images/skills/Numerology.png"
import LalKitab from "../../assets/images/skills/LalKitab.png"
import Prashna from "../../assets/images/skills/Prashna.png"
import AngelCards from "../../assets/images/skills/AngelCards.png"
import ReikiHealer from "../../assets/images/skills/ReikiHealer.png"
import KP from "../../assets/images/skills/KP.png"
import Muhurat from "../../assets/images/skills/Muhurat.png"
import Nadi from "../../assets/images/skills/Nadi.png"
import Ramal from "../../assets/images/skills/Ramal.png"
import Vasthu from "../../assets/images/skills/Vasthu.png"
import Palmistry from "../../assets/images/skills/Palmistry.png"
import Western from "../../assets/images/skills/Western.png"



const AstroFilterModal = ({ setLanguages, setSkills, setCategories }) => {
  const languages = [
    "Assamese", "Bangla", "Bodo", "Dogri", "Gujarati", "Hindi", "English",
    "Kashmiri", "Kannada", "Konkani", "Maithili", "Malayalam", "Manipuri",
    "Marathi", "Nepali", "Oriya", "Punjabi", "Tamil", "Telugu", "Santali",
    "Sindhi", "Urdu"
  ];

  const categories = [
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

  const skills =
    [
      {
        name: "Vedic",
        image: vedic,
      },
      {
        name: "Tarot",
        image: Tarot
      },
      {
        name: "Numerology",
        image: Numerology
      },
      {
        name: "Lal Kitab",
        image: LalKitab
      },
      {
        name: "Prashna",
        image: Prashna
      },
      {
        name: "Angel Cards",
        image: AngelCards
      },
      {
        name: "Reiki Healer",
        image: ReikiHealer
      },
      {
        name: "KP",
        image: KP
      },
      {
        name: "Muhurat",
        image: Muhurat
      },
      {
        name: "Nadi",
        image: Nadi
      },
      {
        name: "Ramal",
        image: Ramal
      },
      {
        name: "Vasthu",
        image: Vasthu
      },
      {
        name: "Palmistry",
        image: Palmistry
      },
      {
        name: "Western",
        image: Western
      },

    ];


  const renderCol = (type, value) => <div className="mb-2 me-2 " key={value}>
    <input type="checkbox" className="btn-check  p-0 rounded-pill text-center" id={`${type}-${value}`} name={type} value={value} autoComplete="off" />
    <label className="btn-sm btn btn-outline-primary card rounded-3 py-2  w-100 fs-15" htmlFor={`${type}-${value}`}>{value} </label>
  </div>

  const renderSkills = (type, skill) => (
    <div className="mb-2 me-2" key={skill.name}>
      <input type="checkbox" className="btn-check p-0 rounded-pill text-center" id={`${type}-${skill.name}`} name={type} value={skill.name} autoComplete="off" />
      <label className="btn-sm btn btn-outline-primary card rounded-3 py-2 w-100 fs-15 d-flex align-items-center" htmlFor={`${type}-${skill.name}`}>
        <img src={skill.image} alt={skill.name} className="" />

        {skill.name}
      </label>
    </div>
  );


  const renderCategory = (type, category) => (
    <div className="mb-2" key={category.name}>
      <input type="checkbox" className="btn-check p-0 rounded-pill text-center" id={`${type}-${category.name}`} name={type} value={category.name} autoComplete="off" />
      <label className="btn-sm btn btn-outline-primary card rounded-3 py-1 w-100 fs-15 d-flex align-items-center" htmlFor={`${type}-${category.name}`}>
        <div className="me-2">{category.icon}</div>

        {category.name}
      </label>
    </div>
  );

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = e.target;
      if (form.checkValidity()) {
        const languages = Array.from(form["languages"]).filter((i) => i.checked).map((i) => i.value)
        const skills = Array.from(form["skills"]).filter((i) => i.checked).map((i) => i.value)
        const categories = Array.from(form["categories"]).filter((i) => i.checked).map((i) => i.value)

        setLanguages(languages);
        setSkills(skills);
        setCategories(categories);

        document.getElementById("AstroFilterOffcanvasBottomButton").click();
      } else {
        form.classList.add("was-validated");
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <button className="btn px-0 me-2 bg-white " type="button" data-bs-toggle="offcanvas" id='AstroFilterOffcanvasBottomButton' data-bs-target="#AstroFilterOffcanvasBottom">
        {Icons.filter("fs-3 ")}
      </button>


      <form className="offcanvas offcanvas-bottom rounded-top-4 px-0 py-0 " style={{ height: "52%" }} tabIndex="-1" id="AstroFilterOffcanvasBottom" onSubmit={onSubmit} noValidate>

        <div className="text-center ">
          <button type="button" className="btn" data-bs-dismiss="offcanvas" aria-label="Close">{Icons.formClose("fs-6")}</button>
        </div>
        <div className="offcanvas-header pb-0 py-0">
          <div className=" mont offcanvas-title fw-semibold d-flex  align-items-center  " id="AstroFilterOffcanvasBottomLabel" style={{ fontSize: 20 }}>
            {Icons.filter("fs-3 me-2")} Filter
          </div>
        </div>
        <div className="offcanvas-body small d-flex flex-column">

          <ul className="nav mx-1 mb-3  row row-cols-3 border-bottom" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className=" fs-15 nav-link-tab active text-dark " id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Languages</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className=" fs-15 nav-link-tab text-dark" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Skills</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className=" fs-15 nav-link-tab text-dark" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Categories</button>
            </li>
          </ul>

          <div className="tab-content overflow-scroll flex-grow-1" id="myTabContent">

            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
              <div className="">
                <div className="row g-2">
                  {languages.map((language) => (
                    <div key={language} className="col-4">
                      {renderCol("languages", language)}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
              <div className="container">
                <div className="row   g-3">


                  {skills.map((skill) => (
                    <div key={skill} className="col-4">
                      {renderSkills("skills", skill)}
                    </div>
                  ))}

                </div>
              </div>



            </div>
            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
              <div className="container">

                <div className="row  g-2">



                  {categories.map((category) => (
                    <div key={category} className="col-4">
                      {renderCategory("categories", category)}
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </div>
          <div className="  mx-3 mt-2 d-flex justify-content-between ">
            <button type='reset' className="w-50 btn btn-warning me-2 text-white fw-bold shadow-sm btn-sm fs-13 py-1 " onClick={() => { setLanguages([]); setCategories([]); setSkills([]) }} data-bs-dismiss="offcanvas">Reset</button>
            <button className="w-50 btn btn-primary btn-sm fw-bold shadow-sm fs-13 py-1">Filter</button>
          </div>

        </div>
      </form>
    </>
  );

}

export default AstroFilterModal