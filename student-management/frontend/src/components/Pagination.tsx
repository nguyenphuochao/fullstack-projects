import type { Paginate } from "../types/paginate"


const Pagination = ({ pagination }: { pagination: Paginate }) => {

    const pageItems = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
        pageItems.push(i);
    }

    return (
        <nav className="mt-4" aria-label="...">
            <ul className="pagination">
                <li className="page-item disabled">
                    <a className="page-link" href="#">Previous</a>
                </li>

                {
                    pageItems.map((page, index) => (
                        <li key={index} className={`page-item ${page === pagination.page ? 'active' : ''}`}>
                            <a className="page-link" href="#">{page} <span className="sr-only">(current)</span></a>
                        </li>
                    ))
                }

                <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination