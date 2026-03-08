import './App.css';
import Bin from './components/Bin.tsx';
import { useEffect, useState } from 'react';
import type { BinInfo } from './types';
import { useBin } from './contexts/binContext.tsx';

function App() {
  const [bins, setBins] = useState<BinInfo[]>([]);
  const [selectedBin, setSelectedBin] = useState<BinInfo | null>(null);
  const binService = useBin();
  
  useEffect(() => {
    const fetchBins = async () => {
      const data = await binService.fetchBins();
      setBins(data);
    };
    void fetchBins();
  });

  
  return (
    <>

      {bins.map((bin) => (
        <button onClick={() => setSelectedBin(bin)} key={bin.bin_name}>{bin.bin_name}</button>
      ))}
      {selectedBin ? <Bin binId={selectedBin.bin_name} /> : null}
    </>
  );
}

export default App;
