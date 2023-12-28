import { Route, Routes } from "react-router-dom";
import Notes from "./Notes/Notes";



function App() {
  const images = [
    'https://wallpapers.com/images/hd/calming-desktop-7ycvb1py4xdfm4x8.jpg',
    'https://wallpapers.com/images/hd/calm-aesthetic-desktop-em3zhejov40rr4yj.jpg',
    'https://wallpapers.com/images/hd/calming-desktop-nsup0okwyoqg4db9.jpg',
    'https://e0.pxfuel.com/wallpapers/929/706/desktop-wallpaper-calm-background-cool-calm.jpg',
    'https://c4.wallpaperflare.com/wallpaper/944/10/504/reflection-nature-sky-water-wallpaper-preview.jpg',
    'https://wallpapercave.com/wp/wp9054928.jpg',
    'https://wallpapers.com/images/hd/calm-aesthetic-desktop-5a8zugtiw1ujolmo.jpg',
    'https://images8.alphacoders.com/133/1337526.png',
    'https://i.pinimg.com/736x/ff/1b/6f/ff1b6fc2e7a962ca0b24a3f99234d8ca.jpg',
    'https://wallpaperset.com/w/full/8/d/0/521440.jpg'
  ]
  return (
    <>
      <Routes>
        <Route path="/" element={<Notes images={images} />}></Route>
      </Routes>
    </>
  );
}

export default App;
