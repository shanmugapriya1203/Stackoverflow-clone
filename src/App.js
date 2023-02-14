import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './svg/sb-admin-2.css';
import './svg/fontawesome-free/css/all.min.css';
import Login from './Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Portallayout from './Portallayout';
import Topbar from './Topbar';
import Forgotpassword from './Forgotpassword';
import Resetpassword from './Resetpassword';
import Createaccount from './Createaccount';
import Homepage from './Homepage';
import Askquestion from './Askquestion';
import Viewquestion from './Viewquestion';
import Viewcomments from './Viewcomments';
import Askedquestions from './Askedquestions';
import Viewtag from './Viewtag';

function App() {

  return <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/forgot-password" element={<Forgotpassword/>}></Route>
      <Route path="/create-account" element={<Createaccount/>}></Route>
      <Route path="/portal" element={<Portallayout/>}>
        <Route path='/portal/home-page' element={<Homepage/>}></Route>
        <Route path='/portal/asked-questions' element={<Askedquestions/>}></Route>
        <Route path='/portal/home-page/ask-question/:userId' element={<Askquestion/>}></Route>
        <Route path='/portal/home-page/view-question/:qId' element={<Viewquestion/>}></Route>
        <Route path='/portal/home-page/comments/view-comments/:qId' element={<Viewcomments/>}></Route>
        <Route path='/portal/home-page/tags/view-tag/' element={<Viewtag/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  </>
}

export default App;
