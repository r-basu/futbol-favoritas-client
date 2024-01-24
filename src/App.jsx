import {Route,BrowserRouter as Router, Routes} from "react-router-dom";
import ClubPage from "./pages/ClubPage";
// import API from "./utils/API";
// import { useState } from "react";
import DropdownForm from "./components/DropdownForm";

function App() {
  return (
    // <div>
    //   <h1> hello</h1>
    //   <DropdownForm />
    // {/* </div> */}

<>
{/* TODO: navbar */}
<Router>
{/* <NavBar/> */}
  <Routes>
    <Route path="/" element={<DropdownForm/>}/>
    <Route path="/clubs" element={<ClubPage/>}/>
  </Routes>
</Router>
</>
  );
}

export default App;
