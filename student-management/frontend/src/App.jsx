import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import LayoutMain from './components/LayoutMain';
import LayoutDefault from './components/LayoutDefault';

import StudentList from './pages/Student/StudentList';
import StudentCreate from './pages/Student/StudentCreate';
import StudentEdit from './pages/Student/StudentEdit';

import SubjectList from './pages/Subject/SubjectList';
import SubjectCreate from './pages/Subject/SubjectCreate';

import RegisterList from './pages/Register/RegisterList';
import RegisterCreate from './pages/Register/RegisterCreate';
import RegisterEdit from './pages/Register/RegisterEdit';

import Login from './pages/Login';
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <div className="container" style={{ marginTop: 20 }}>
            <ToastContainer />

            <Routes>
                {/* Layout Main */}
                <Route element={<LayoutMain />}>
                    <Route path="/" element={<StudentList />} />
                    <Route path="/student/create" element={<StudentCreate />} />
                    <Route path="/student/edit/:id" element={<StudentEdit />} />

                    <Route path="/subject/list" element={<SubjectList />} />
                    <Route path="/subject/create" element={<SubjectCreate />} />

                    <Route path="/register/list" element={<RegisterList />} />
                    <Route path="/register/create" element={<RegisterCreate />} />
                    <Route path="/register/edit/:id" element={<RegisterEdit />} />
                </Route>

                {/* Layout Default */}
                <Route element={<LayoutDefault />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
