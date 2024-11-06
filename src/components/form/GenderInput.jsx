const GenderInput = ({ name, defaultCheck }) => {
    return (
        <div>
            <label htmlFor={name} className="form-label text-capitalize">{name}</label>
            <div className="d-flex justify-content-between w-100">
                <input
                    type="radio"
                    className="btn-check"
                    name="gender"
                    id="option2"
                    autoComplete="off"
                    defaultChecked={defaultCheck === 'Male'}
                />
                <label className="btn genderInput btn-whit btn-outline-primary card" htmlFor="option2" style={{ width: 120 }}>Male</label>

                <input
                    type="radio"
                    className="btn-check"
                    name="gender"
                    id="option3"
                    autoComplete="off"
                    defaultChecked={defaultCheck === 'Female'}
                />
                <label className="btn genderInput btn-whit btn-outline-primary card" htmlFor="option3" style={{ width: 120 }}>Female</label>

                <input
                    type="radio"
                    className="btn-check"
                    name="gender"
                    id="option4"
                    autoComplete="off"
                    defaultChecked={defaultCheck === 'Other'}
                />
                <label className="btn genderInput btn-whit btn-outline-primary card" htmlFor="option4" style={{ width: 120 }}>Other</label>
            </div>
        </div>
    )
}

export default GenderInput;