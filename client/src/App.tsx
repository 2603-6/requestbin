import Bin from './components/Bin.tsx';
import type { BinInfo, Message } from './types';
import { useBinService } from './contexts/binServiceContext.ts';
import { useEffect, useState } from 'react';
import { BinContext } from './contexts/binContext.ts';
import Navbar from './components/Navbar.tsx';
import BinForm from './components/BinForm.tsx';
import { Toaster } from './components/Toaster.tsx';
import { ToastContext } from './contexts/toastContext.ts';


function App() {
  const [bins, setBins] = useState<BinInfo[]>([]);
  const [selectedBin, setSelectedBin] = useState<BinInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
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

  const showMessage = (props: Message) => {
    setMessages((prev) => [...prev, props]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg !== props));
    }, 3000);
  };

  const onCreateBin = (bin: BinInfo) => {
    binService.createBin(bin.binName).then(
      (data) => {
        console.log(data);
        showMessage({ type: 'success', text: 'Bin created!' });
        setBins((prev) => [...prev, data]);
      }).catch((e) => {
      showMessage({ type: 'error', text: 'Failed to create bin!' });
      console.error(e);
    });

  };

  const handleClearBin = () => {
    if (!selectedBin) return;
    binService.clearBin(selectedBin.binName).then(() => {
      showMessage({ type: 'success', text: 'Bin cleared!' });
      setSelectedBin(null);
    }).catch((e) => {
      console.error(e);
      showMessage({ type: 'error', text: 'Failed to clear bin!' });
    });
  };

  const handleDeleteBin = () => {
    if (!selectedBin) return;
    binService.deleteBin(selectedBin.binName).then(() => {
      showMessage({ type: 'success', text: 'Bin deleted!' });
      setBins(bins.filter((bin) => bin.binName !== selectedBin.binName));
      setSelectedBin(null);
    }).catch((e) => {
      console.error(e);
      showMessage({ type: 'error', text: 'Failed to delete bin!' });
    });
  };


  return (
    <>
      <Toaster messages={messages}/>
      <ToastContext value={showMessage}>
        <BinContext value={selectedBin}>
          {selectedBin ? <Navbar onClearBin={handleClearBin} onDeleteBin={handleDeleteBin}/> : <Navbar/>}
          <section className="main-page-card">
            <div className="bin-selector-header">
              <h2>Your bins</h2>
              <p>Select a bin to inspect requests, or click it again to close it.</p>
            </div>

            {bins.length === 0 ? (
              <p className="bin-selector-empty">No bins yet. Create your first one below.</p>
            ) : (
              <div className="bin-selector-list">
                {bins.map((bin) => (
                  <button
                    key={bin.binName}
                    type="button"
                    className={`bin-selector-button ${isSelected(bin) ? 'is-selected' : ''}`}
                    onClick={() => toggleSelectedBin(bin)}
                  >
                    {bin.binName}
                  </button>
                ))}
              </div>
            )}
          </section>

          {selectedBin ? <Bin /> : <BinForm onCreateBin={onCreateBin} />}
        </BinContext>
      </ToastContext>
    </>
  );
}

export default App;
