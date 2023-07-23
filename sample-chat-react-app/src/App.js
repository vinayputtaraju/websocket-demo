import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Welcome from "./components/WelcomeComponent";
import SampleChat from "./components/chat";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/chat" element={<SampleChat/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
