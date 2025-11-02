import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';

import StudentList from './pages/Student/StudentList';
import StudentCreate from './pages/Student/StudentCreate';
import StudentEdit from './pages/Student/StudentEdit';

const App = () => {
    return (
        <div className="container" style={{ marginTop: 20 }}>
            <Header />

            <Routes>
                <Route path="/" element={<StudentList />} />
                <Route path="/student/create" element={<StudentCreate />} />
                <Route path="/student/edit/:id" element={<StudentEdit />} />
            </Routes>

            <Footer />
        </div>
    );
};

export default App;
