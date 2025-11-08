import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const SubjectList = () => {
    const { token } = useContext(StoreContext);
    const [page, setPage] = useState(1);
    const [subjects, setSubjects] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('/subject/list?page=' + page, { headers: { token } });
            setSubjects([...subjects, ...response.data.data]);
            setTotalCount(response.data.totalCount);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, [page]);

    return (
        <div className="subject">
            <h1>Danh sách Môn Học</h1>
            <Link to="/subject/create" className="btn btn-info">
                Add
            </Link>
            <form action="list.html" method="GET">
                <label className="form-inline justify-content-end">
                    Tìm kiếm: <input type="search" name="search" className="form-control" defaultValue />
                    <button className="btn btn-danger">Tìm</button>
                </label>
                <input type="hidden" name="c" defaultValue="subject" />
            </form>
            <div className="table table-hover">
                <div className="thead">
                    <div className="tr">
                        <div>#</div>
                        <div>Mã MH</div>
                        <div>Tên</div>
                        <div>Số tín chỉ</div>
                        <div>Tùy Chọn</div>
                    </div>
                </div>
                <div
                    className="tbody"
                    id="scrollableDiv"
                    style={{
                        height: 420,
                        overflow: 'auto',
                    }}
                >
                    <InfiniteScroll
                        dataLength={subjects.length}
                        next={() => setPage((prev) => prev + 1)}
                        hasMore={subjects.length < totalCount}
                        loader={<h4>Loading...</h4>}
                        endMessage={<p className="mt-2 fw-bold">You have seen it all</p>}
                        scrollableTarget="scrollableDiv"
                    >
                        {subjects.map((subject, index) => {
                            return (
                                <div key={index} className="tr">
                                    <div>{index + 1}</div>
                                    <div>{subject._id}</div>
                                    <div>{subject.name}</div>
                                    <div>{subject.numberOfCredits}</div>
                                    <div>
                                        <a href="edit.html">Sửa</a>
                                    </div>
                                    <div>
                                        <a className="delete" data={1} type="subject" href="list.html">
                                            Xóa
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>

            <div className="mt-1">
                <span>Số lượng: {totalCount}</span>
            </div>
        </div>
    );
};

export default SubjectList;
