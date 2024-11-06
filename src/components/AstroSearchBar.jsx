import AstroFilterModal from './modal/AstroFilterModal'
import AstroSortModal from './modal/AstroSortModal'

const AstroSearchBar = ({ setSearch }) => {

  return (
    <div className="d-flex">

      <div className="input-group mb-3 shadow-sm">
        <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
        <AstroFilterModal />
        <AstroSortModal />
      </div>


      {/* <Input nolabel inputClass={"mb-3"} /> */}


    </div>
  )
}

export default AstroSearchBar