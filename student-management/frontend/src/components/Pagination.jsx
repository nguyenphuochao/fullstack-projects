import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ page, totalPages, handleClickPageNumber, handlePrevPage, handleNextPage }) => {
    const arrPages = [];
    for (let i = 1; i <= totalPages; i++) {
        arrPages.push(i);
    }

    return (
        <nav style={{ marginTop: '30px' }} aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <Link onClick={(e) => handlePrevPage(e)} className="page-link" to="#">
                        Previous
                    </Link>
                </li>

                {arrPages.map((item, index) => (
                    <li
                        onClick={(e) => handleClickPageNumber(e, item)}
                        key={index}
                        className={`page-item ${page === item ? 'active' : ''}`}
                    >
                        <a className="page-link" href="#">
                            {item}
                        </a>
                    </li>
                ))}

                <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
                    <Link onClick={(e) => handleNextPage(e)} className="page-link" to="#">
                        Next
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
