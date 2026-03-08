import './App.css';
import Bin from './components/Bin.tsx';
import { useEffect, useState } from 'react';
import type { BinInfo } from './types';
import binService from './services/binService.ts';

function App() {
  const [bins, setBins] = useState<BinInfo[]>([]);
  const [selectedBin, setSelectedBin] = useState<BinInfo | null>(null);
  
  useEffect(() => {
    const fetchBins = async () => {
      const data = await binService.fetchBins();
      setBins(data);
    };
    void fetchBins();
  });
  
  const binDisplay = selectedBin ? <Bin binId={selectedBin.bin_name} /> : null;
  
  return (
    <>
      {bins.map((bin) => (
        <button onClick={() => setSelectedBin(bin)} key={bin.bin_name}>{bin.bin_name}</button>
      ))}
      {binDisplay}
    </>
  );
}

export default App;
