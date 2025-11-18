import { Link } from "react-router"

const StudentAdd = () => {
    return (
        <>
            <h1>Thêm sinh viên</h1>
            <form action="list.html" method="POST">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group">
                                <label>Tên</label>
                                <input type="text" className="form-control" placeholder="Tên của bạn" required name="name" />
                            </div>
                            <div className="form-group">
                                <label>Birthday</label>
                                <input type="date" className="form-control" placeholder="Ngày sinh của bạn" required name="birthday" />
                            </div>
                            <div className="form-group">
                                <label>Chọn Giới tính</label>
                                <select className="form-control" id="gender" name="gender" required>
                                    <option value={0}>Nam</option>
                                    <option value={1}>Nữ</option>
                                    <option value={2}>Khác</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success" type="submit">Lưu</button>
                                <Link className="btn btn-warning ml-2" to={'/'}>Quay về</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default StudentAdd