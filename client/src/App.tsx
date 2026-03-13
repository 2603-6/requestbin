import Bin from './components/Bin.tsx';
import type { BinInfo, IToastProps } from './types';
import { useBinService } from './contexts/binServiceContext.ts';
import { useEffect, useState } from 'react';
import { BinContext } from './contexts/binContext.ts';
import Navbar from './components/Navbar.tsx';
import BinForm from './components/BinForm.tsx';
import { Toast } from './components/Toast.tsx';
import { ToastContext } from './contexts/toastContext.ts';


function App() {
  const [bins, setBins] = useState<BinInfo[]>([]);
  const [selectedBin, setSelectedBin] = useState<BinInfo | null>(null);
  const [toast, setToast] = useState<IToastProps | null>(null);
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
        showMessage({ type: 'success', message: 'Bin created!' });
        setBins([...bins, data]);  
      }).catch((e) => {
      showMessage({ type: 'error', message: 'Failed to create bin!' });
      console.error(e);
    });
    
  };

  const showMessage = (props: IToastProps) => {
    setToast(props);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleClearBin = () => {
    if (!selectedBin) return;
    binService.clearBin(selectedBin.binName).then(() => {
      showMessage({ type: 'success', message: 'Bin cleared!' });
      setSelectedBin(null);
    }).catch((e) => {
      console.error(e);
      showMessage({ type: 'error', message: 'Failed to clear bin!' });
    });
  };

  const handleDeleteBin = () => {
    if (!selectedBin) return;
    binService.deleteBin(selectedBin.binName).then(() => {
      showMessage({ type: 'success', message: 'Bin deleted!' });
      setBins(bins.filter((bin) => bin.binName !== selectedBin.binName));
      setSelectedBin(null);
    }).catch((e) => {
      console.error(e);
      showMessage({ type: 'error', message: 'Failed to delete bin!' });
    });
  };


  return (
    <>
      {toast && <Toast {...toast}/> }
      <ToastContext value={showMessage}>
        <BinContext value={selectedBin}>
          <Navbar onClearBin={handleClearBin} onDeleteBin={handleDeleteBin} />
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
      </ToastContext>
    </>
  );
}

export default App;
