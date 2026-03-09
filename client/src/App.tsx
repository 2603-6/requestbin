import Bin from './components/Bin.tsx';
import type { BinInfo } from './types';
import { useBinService } from './contexts/binServiceContext.ts';
import { useEffect, useState } from 'react';
import { BinContext } from './contexts/binContext.ts';
import Navbar from './components/Navbar.tsx';


function App() {
  const [bins, setBins] = useState<BinInfo[]>([]);
  const [selectedBin, setSelectedBin] = useState<BinInfo | null>(null);
  const binService = useBinService();

  useEffect(() => {
    const fetchBins = async () => {
      const data = await binService.fetchBins();
      setBins(data);
    };
    void fetchBins();
  }, [binService]);

  const toggleSelectedBin = (bin: BinInfo): void => {
    if (isSelected(bin)) {
      setSelectedBin(null);
    } else {
      setSelectedBin(bin);
    }
  };

  const isSelected = (bin: BinInfo): boolean => bin.binId === selectedBin?.binId;

  return (
    <>
      <BinContext value={selectedBin}>
        <Navbar/>
        {bins.map((bin) => (
          <button
            key={bin.binId}
            onClick={() => toggleSelectedBin(bin)}
            style={{ backgroundColor: isSelected(bin) ? 'green' : '' }}
          >
            {bin.binId}
          </button>
        ))}
        {selectedBin ? <Bin /> : null}
      </BinContext>
    </>
  );
}

export default App;
