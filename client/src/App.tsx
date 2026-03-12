import Bin from './components/Bin.tsx';
import type { BinInfo } from './types';
import { useBinService } from './contexts/binServiceContext.ts';
import { useEffect, useState } from 'react';
import { BinContext } from './contexts/binContext.ts';
import Navbar from './components/Navbar.tsx';
import BinForm from './components/BinForm.tsx';


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

  const isSelected = (bin: BinInfo): boolean => bin.binName === selectedBin?.binName;
  
  const onCreateBin = (bin: BinInfo) => {
    binService.createBin(bin.binName).then(
      (data) => {
        console.log(data);
        setBins([...bins, data]);  
      }).catch((e) => {
      console.error(e);
    });
    
  };

  return (
    <>
      <BinContext value={selectedBin}>
        <Navbar/>
        {bins.map((bin) => (
          <button
            key={bin.binName}
            onClick={() => toggleSelectedBin(bin)}
            style={{ backgroundColor: isSelected(bin) ? 'green' : '' }}
          >
            {bin.binName}
          </button>
        ))}
        {selectedBin ? <Bin /> : <BinForm onCreateBin={onCreateBin} />}
      </BinContext>
    </>
  );
}

export default App;
