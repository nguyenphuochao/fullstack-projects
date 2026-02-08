import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";

// Layout
import ProtectedRoute from "./components/ProtectedRoute";

// Page Not Found
import NotFound from "./pages/NotFound";

// Student
import StudentList from "./pages/Student/StudentList";
import StudentAdd from "./pages/Student/StudentAdd";
import StudentEdit from "./pages/Student/StudentEdit";
import Login from "./pages/Login";

function App() {
    return (
        <>
            <Toaster richColors />
            <BrowserRouter>
                <Routes>

                    {/* public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                    
                    {/* private routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<StudentList />} />
                        <Route path="/student/add" element={<StudentAdd />} />
                        <Route path="/student/edit/:id" element={<StudentEdit />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;