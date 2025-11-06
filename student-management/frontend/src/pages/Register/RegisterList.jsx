import { Link } from 'react-router-dom'

const RegisterList = () => {
    return (
        <>
            <div>
                <h1>Danh sách sinh viên đăng ký môn học</h1>
                <Link to="/register/create" className="btn btn-info">Add</Link>
                <form>
                    <label className="form-inline justify-content-end">Tìm kiếm: <input type="search" name="search" className="form-control" defaultValue />
                        <button className="btn btn-danger">Tìm</button>
                    </label>
                    <input type="hidden" name="c" defaultValue="register" />
                </form>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã SV</th>
                            <th>Tên SV</th>
                            <th>Mã MH</th>
                            <th>Tên MH</th>
                            <th>Điểm</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>Nguyễn Thị Bé Bảy</td>
                            <td>1</td>
                            <td>Toán</td>
                            <td>5</td>
                            <td><a href="edit.html">Cập nhật điểm</a></td>
                            <td><a onclick="return confirm('Bạn muốn xóa đăng ký này phải không?')" href="list.html">Xóa</a></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>1</td>
                            <td>Nguyễn Thị Bé Bảy</td>
                            <td>2</td>
                            <td>Lý</td>
                            <td />
                            <td><a href="edit.html">Cập nhật điểm</a></td>
                            <td><a onclick="return confirm('Bạn muốn xóa đăng ký này phải không?')" href="list.html">Xóa</a></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>1</td>
                            <td>Nguyễn Thị Bé Bảy</td>
                            <td>3</td>
                            <td>Hóa</td>
                            <td />
                            <td><a href="edit.html">Cập nhật điểm</a></td>
                            <td><a onclick="return confirm('Bạn muốn xóa đăng ký này phải không?')" href="list.html">Xóa</a></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>2</td>
                            <td>Nguyễn Văn Tèo</td>
                            <td>1</td>
                            <td>Toán</td>
                            <td />
                            <td><a href="edit.html">Cập nhật điểm</a></td>
                            <td><a onclick="return confirm('Bạn muốn xóa đăng ký này phải không?')" href="list.html">Xóa</a></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <span>Số lượng: 4</span>
                </div>
            </div>
        </>
    )
}

export default RegisterList