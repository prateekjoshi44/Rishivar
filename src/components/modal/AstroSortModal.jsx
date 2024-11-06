import Icons from '../ui/Icons';

const AstroSortModal = ({ setOrderBy }) => {

  const rows = [
    {
      label: "Rating",
      options: [
        {
          name: "Rating: Low to high",
          icon: Icons.lowToHigh(" fs-99 mx-auto ", { height: 175 })
        },
        {
          name: "Rating: High to low",
          icon: Icons.highToLow("fs-99 mx-auto", { height: 175 }),
        }
      ]
    },
    {
      label: "Price",
      options: [
        {
          name: "Price: Low to high",
          icon: Icons.lowToHigh("fs-99 mx-auto", { height: 175 })
        },

        {
          name: "Price: High to low",
          icon: Icons.highToLow("fs-99 mx-auto", { height: 175 }),

        },
      ]
    },
    {
      label: "Experience",
      options: [
        {
          name: "Experience: Low to high",
          icon: Icons.lowToHigh("fs-99 mx-auto", { height: 175 })
        },

        {
          name: "Experience: High to low",
          icon: Icons.highToLow("fs-99 mx-auto", { height: 175 }),

        },
      ]
    },
  ];

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = e.target;
      if (form.checkValidity()) {
        const orderBy = form["astroSortRadio"].value;
        setOrderBy(orderBy);
        document.getElementById("AstroSortOffcanvasBottomButton").click();
      } else {
        form.classList.add("was-validated");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const renderCol = ({ name, icon }) => (
    <div className='col' key={name}>
      <input type="radio" className="btn-check" name="astroSortRadio" value={name} id={name} autoComplete="off" required />
      <label htmlFor={name} className="my-4 btn d-flex flex-column align-items-center shadow-sm border-dark border-opacity-25 rounded-4 w-100 fw-bold">
        {icon}
        <span className='fs-15 mt-2'>{name}</span>
        {name === "Experience: Low to high" && <div className="invalid-feedback">Select any value</div>}
      </label>
    </div>
  );



  const renderRow = ({ options }) => (
    <>
      <div className="row mb-1">
      </div>
      <div className="row row-cols-2 g-3 mb-2 justify-content-start">
        {options.map(renderCol)}
      </div>
    </>
  );

  return (
    <div className=' '>
      <button className="btn px-0 bg-white" type="button" data-bs-toggle="offcanvas" id='AstroSortOffcanvasBottomButton' data-bs-target="#AstroSortOffcanvasBottom">
        {Icons.sort("fs-3  ")}
      </button>

      <form className="offcanvas offcanvas-bottom" style={{ height: "60%" }} tabIndex="-1" id="AstroSortOffcanvasBottom" aria-labelledby="AstroSortOffcanvasBottomLabel" onSubmit={onSubmit} noValidate>

        <div className="text-center ">
          <button type="button" className="btn" data-bs-dismiss="offcanvas" aria-label="Close">{Icons.formClose()}</button>
        </div>

        <div className="offcanvas-header pb-0">

          <h5 className="offcanvas-title fs-3 fw-bold" id="AstroSortOffcanvasBottomLabel">
            {Icons.sort("fs-3  me-2 ")}
            Sorting
          </h5>
        </div>

        <div className="offcanvas-body small d-flex flex-column">


          <nav>
            <div className="nav nav-tabs d-flex justify-content-between /" id="nav-tab" role="tablist">
              <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Rating</button>
              <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Price</button>
              <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Experinece</button>
            </div>
          </nav>
          <div className="tab-content " id="nav-tabContent">
            <div className="tab-pane fade show active " id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              {renderRow(rows[0])}
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              {renderRow(rows[1])}
            </div>
            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
              {renderRow(rows[2])}
            </div>
          </div>
        </div>

        <div className="mx-3 my-2 d-flex justify-content-between">
          <button type="reset" className="w-50 btn btn-warning me-2 text-white fw-bold shadow-sm" onClick={() => setOrderBy(null)} data-bs-dismiss="offcanvas">Reset</button>
          <button className="w-50 btn btn-primary fw-bold shadow-sm">Sort</button>
        </div>
      </form>
    </div>
  );
}

export default AstroSortModal;