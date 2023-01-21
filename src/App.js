import './App.css';
import Slider from './slider/Slider';


import image_1 from "./images/img-1.jpg"
import image_2 from "./images/img-2.jpg"
import image_3 from "./images/img-3.jpg"


function App() {
  return (
    <div className="app">
      <Slider backgroundImages={ [image_1,image_2,image_3]} />
      
    </div>
  );
}

export default App;
