import { useParams } from "react-router-dom";

import PageHeader from "../components/pageHeader/PageHeader";
import MovieGrid from "../components/movieGrid/MovieGrid";

const Catalog = ()=>{   
    const { category } = useParams();
    return (
        <>
            <PageHeader category={category} />
            <div className="container mb-3">
                 <MovieGrid category={category} />
            </div>
        </>
    )

}

export default Catalog;