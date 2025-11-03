import React from 'react';

const Pagination = ({ page, totalPages, handleClickPageNumber }) => {

    const arrPages = [];
    for (let i = 1; i <= totalPages; i++) {
        arrPages.push(i);
    }

    return (
        <nav style={{ marginTop: '30px' }} aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" href="#">
                        Previous
                    </a>
                </li>

                {
                    arrPages.map((item, index) => (
                        <li onClick={(e) => handleClickPageNumber(e, item)} key={index} className={`page-item ${page === item ? 'active' : ''}`}>
                            <a className="page-link" href="#">
                                {item}
                            </a>
                        </li>
                    ))
                }

                <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
                    <a className="page-link" href="#">
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
