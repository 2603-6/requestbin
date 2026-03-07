import Bin from './components/Bin.tsx';
import Navbar from './components/Navbar.tsx';
import { useState } from 'react';



function App() {
  const [listening, setListening] = useState<boolean>(true);


  //---------------------------------------
  // DUMMY DATA

  const binId = 6;

  // DUMMY DATA
  //---------------------------------------


  const toggleListening = (): void => {
    // The logic to toggle websocket connection
    console.log('toggle listening:', !listening);
    setListening(!listening);
  };

  const deleteBin = (): void => {
    // The logic to delete the bin, maybe confirmation dialogue?
  };

  const clearBin = (): void => {
    // The logic to clear the bin, maybe confirmation dialogue?
  };


  return (
    <>
      <Navbar
        binId={binId}
        toggleListening={toggleListening}
        listening={listening}
        onClearBin={clearBin}
        onDeleteBin={deleteBin}
      />

      <Bin binId={binId}/>


    </>
  );
}

export default App;
