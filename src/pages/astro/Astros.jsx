import { useEffect, useState } from 'react';
import Page from '../../layout/Page';
import { useGetAstrosQuery } from '../../services/astroSlice';
import ApiErrorModal from '../../components/modal/ApiErrorModal';
import AstrosCard from '../../components/astroPlaceholder/AstrosCard';

import { useParams } from 'react-router-dom';
import SearchBar from '../../components/ui/SearchBar';
import Icons from '../../components/ui/Icons';

const Astros = () => {
  const { category } = useParams();
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const response = useGetAstrosQuery();

  const renderFilter = ({ text, type }) => (
    <div className="rounded-pill border card px-2 text-nowrap fs-11 flex-row border border-dark mb-2 me-2 shadow-sm " style={{ paddingTop: 2, paddingBottom: 2 }} key={text}>
      {text}
      <span className='ms-2' onClick={() => removeFilter(type, text)}> {Icons.cross("fs-10")}</span>
    </div>
  );

  const removeFilter = (type, filterText) => {
    switch (type) {
      case 'category':
        setCategories(prevCategories => prevCategories.filter(category => category !== filterText));
        break;
      case 'language':
        setLanguages(prevLanguages => prevLanguages.filter(language => language !== filterText));
        break;
      case 'skill':
        setSkills(prevSkills => prevSkills.filter(skill => skill !== filterText));
        break;
      case 'orderBy':
        setOrderBy(null);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (category) {
      setCategories([category])
    }
  }, [category])
  const resetFilters = () => {
    setCategories([]);
    setLanguages([]);
    setSkills([]);
    setSearch("")
  }


  if (response.isLoading) {

    return (
      <div className="container">
        <SearchBar
          search={search}
          setSearch={setSearch}
          setOrderBy={setOrderBy}
          setLanguages={setLanguages}
          setSkills={setSkills}
          setCategories={setCategories}
        />
        <div className="row row-cols-2 g-2  ">
          {response.isLoading ? (
            Array.from({ length: 4 }).map((dummy, index) => (
              <AstrosCard dummy={dummy} key={index} placeholder />
            ))
          ) : (
            response.data.map((astro) => (
              <AstrosCard key={astro.id} {...astro} />
            ))
          )}
        </div>
      </div>
    );

  }

  if (response.isError) return <ApiErrorModal res={response} />;

  let data = [...response.data];



  if (languages.length > 0 || skills.length > 0 || categories.length > 0) {
    data = data.filter(a => {
      return languages.some(l => a.languages.includes(l)) ||
        skills.some(s => a.skills.includes(s)) ||
        categories.some(c => a.categories.includes(c)) || a.categories.includes(category)
    }
    )
  }



  if (search !== "") data = data.filter(a => a.name.toLowerCase().includes(search));
  if (orderBy) {
    data = data.sort((a, b) => {
      switch (orderBy) {
        case "Rating: Low to high": return a.id.length - b.id.length;
        case "Rating: High to low": return b.id.length - a.id.length;
        case "Price: Low to high": return a.id.length - b.id.length;
        case "Price: High to low": return b.id.length - a.id.length;
        case "Experience: Low to high": return a.id.length - b.id.length;
        case "Experience: High to low": return b.id.length - a.id.length;
      }
    });
  }


  return (
    <>
      <Page>

        <div className="">



          <SearchBar
            search={search}
            setSearch={setSearch}
            setOrderBy={setOrderBy}
            setLanguages={setLanguages}
            setSkills={setSkills}
            setCategories={setCategories}
          />

        </div>


        <div className="d-flex flex-wrap  mb-2">
          {languages.map((language) => renderFilter({ text: language, type: 'language' }))}
          {skills.map((skill) => renderFilter({ text: skill, type: 'skill' }))}
          {categories.map((category) => renderFilter({ text: category, type: 'category' }))}
          {orderBy && renderFilter({ text: orderBy, type: 'orderBy' })}
        </div>



        {
          data.length > 0 ?
            <div className="row row-cols-2 row-cols-lg-4 g-lg-4 g-3">
              {data.map(astro => <AstrosCard key={astro.id} {...astro} showAvailability={true} showContact={true} />)}
            </div> :
            <div className="d-flex flex-column  h-75 align-items-center justify-content-center">
              <h3 className='mb-3 text-center'>No Astro found with selected filter details.</h3>
              <div onClick={resetFilters} className="btn btn-primary">Reset Filters</div>
            </div>
        }


      </Page>
    </>
  );
};

export default Astros;

