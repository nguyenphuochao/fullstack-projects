import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const RegisterEdit = () => {
    const { token } = useContext(StoreContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [register, setRegister] = useState(null);
    const [score, setScore] = useState(null);

    // Get register by id
    const getRegister = async () => {
        try {
            const response = await axios.get(`/register/detail/${id}`, { headers: { token } });
            setRegister(response.data.register);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Update score
    const handleUpdateScore = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/register/update`, { id, score }, { headers: { token } });
            toast.success(response.data.message);
            navigate("/register/list");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getRegister();
    }, []);

    return (
        <>
            <h1>Cập nhật điểm</h1>
            {loading ? (
                <Loading />
            ) : (
                <form onSubmit={handleUpdateScore}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Tên sinh viên : </label>
                                    <span> { register?.studentId?.name }</span>
                                </div>
                                <div className="form-group">
                                    <label>Tên môn học : </label>
                                    <span> { register?.subjectId?.name }</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="score">Điểm: &nbsp;</label>
                                    <input
                                        onChange={(e) => setScore(e.target.value)}
                                        type="number"
                                        min={0}
                                        max={10}
                                        name="score"
                                        id="score"
                                        defaultValue={register?.score}
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-success" type="submit">
                                        Lưu
                                    </button>
                                    <button
                                        onClick={() => navigate('/register/list')}
                                        className="btn btn-warning ml-2"
                                        type="button"
                                    >
                                        Quay về
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default RegisterEdit;
