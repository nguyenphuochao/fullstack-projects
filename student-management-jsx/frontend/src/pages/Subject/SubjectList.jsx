import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useRef } from 'react';
import Loading from '../../components/Loading';

const SubjectList = () => {
    const [loading, setLoading] = useState(true);
    const { token } = useContext(StoreContext);
    const [page, setPage] = useState(1);
    const [subjects, setSubjects] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const timeoutRef = useRef(null);
    const [search, setSearch] = useState('');

    const fetchSubjects = async () => {
        try {
            const response = await axios.get(`/subject/list?page=${page}&search=${search}`, {
                headers: { token },
            });

            setSubjects([...subjects, ...response.data.data]);
            setTotalCount(response.data.totalCount);
            setLoading(false);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const searchInput = async (searchName) => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            // call API
            setSearch(searchName);
            setSubjects([]);
            console.log('searchName:', searchName);
        }, 500); // 500ms delay
    };

    useEffect(() => {
        fetchSubjects();

        console.log(subjects);

        // Cleanup the timeout when the component unmounts
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [page, search]);

    return (
        <div className="subject">
            <h1>Danh sách Môn Học</h1>
            <Link to="/subject/create" className="btn btn-info">
                Add
            </Link>
            <form action="list.html" method="GET">
                <label className="form-inline justify-content-end">
                    Tìm kiếm:{' '}
                    <input
                        type="search"
                        name="search"
                        className="form-control"
                        onKeyUp={(e) => searchInput(e.target.value)}
                    />
                    <button className="btn btn-danger">Tìm</button>
                </label>
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
                {loading ? (
                    <Loading />
                ) : (
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
                )}
            </div>

            <div className="mt-1">
                <span>Số lượng: {totalCount}</span>
            </div>
        </div>
    );
};

export default SubjectList;
