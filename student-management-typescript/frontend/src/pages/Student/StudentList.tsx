import { Link } from "react-router"

const StudentList = () => {
    return (
        <>
            <h1>Danh sách sinh viên</h1>
            <Link to="/student/add" className="btn btn-info">Add</Link>
            <form action="list.html" method="GET">
                <label className="form-inline justify-content-end">Tìm kiếm: <input type="search" name="search" className="form-control" defaultValue />
                    <button className="btn btn-danger">Tìm</button>
                </label>
            </form>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã SV</th>
                        <th>Tên</th>
                        <th>Ngày Sinh</th>
                        <th>Giới Tính</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>Nguyễn Thị Bé Bảy</td>
                        <td>09/03/2000</td>
                        <td>nữ</td>
                        <td><Link to="/student/edit/1">Sửa</Link></td>
                        <td><a data={1} className="delete" href="list.html" type="student">Xóa</a></td>
                    </tr>
                </tbody>
            </table>
            <div className="total-students">
                <span>Số lượng: 3</span>
            </div>
        </>
    )
}

export default StudentList