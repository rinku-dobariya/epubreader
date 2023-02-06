import './App.css';
import EpubReader from './components/EpubReader';
import Header from './components/Header/Header';
function App() {

  return (
    <>
      <Header title="Epub Reader"/>
      <EpubReader url="https://s3.amazonaws.com/moby-dick/" />
    </>
  );
}

export default App;
