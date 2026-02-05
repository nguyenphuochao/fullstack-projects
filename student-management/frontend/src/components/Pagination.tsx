import { Link } from "react-router";
import type { Paginate } from "../types/paginate"

interface PaginationProps {
    pagination: Paginate;
    handlePrevPage: () => void;
    handleNextPage: () => void;
    handleClickPage: (page: number) => void;
}

const Pagination = ({ pagination, handlePrevPage, handleNextPage,handleClickPage }: PaginationProps) => {

    const page = pagination.page;
    const totalPages = pagination.totalPages;
    const pageItems = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
        pageItems.push(i);
    }

    return (
        <nav className="mt-4" aria-label="...">
            <ul className="pagination">
                <li onClick={handlePrevPage} className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                    <Link className="page-link" to="#">Previous</Link>
                </li>

                {
                    pageItems.map((page, index) => (
                        <li onClick={() => handleClickPage(page)} key={index} className={`page-item ${page === pagination.page ? 'active' : ''}`}>
                            <Link className="page-link" to="#">{page} <span className="sr-only">(current)</span></Link>
                        </li>
                    ))
                }

                <li onClick={handleNextPage} className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
                    <Link className="page-link" to="#">Next</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination