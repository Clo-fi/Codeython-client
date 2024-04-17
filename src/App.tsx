import { Route, Routes } from "react-router-dom";
import LoginPage from "./routes/login/LoginPage";
import SignUpPage from "./routes/signup/SignUpPage";
import HomePage from "./routes/home/HomePage";
import ProfilePage from "./routes/profile/ProfilePage";
import ProblemListPage from "./routes/problemList/ProblemListPage";
import LayoutWithSideBar from "./components/layout/LayoutWithSideBar";
import PlayAlonePage from "./routes/playAlone/PlayAlonePage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<LayoutWithSideBar />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/problemlist" element={<ProblemListPage />} />
        </Route>
        <Route path="/playalone/:problemId" element={<PlayAlonePage />} />
      </Routes>
    </>
  );
}

export default App;
