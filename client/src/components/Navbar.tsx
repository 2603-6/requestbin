import { type FC } from 'react';
import type { INavbarProps } from '../types';
import { useBin } from '../contexts/binContext.ts';
import { useBinService } from '../contexts/binServiceContext.ts';

const Navbar: FC<INavbarProps> = ({ listening, toggleListening }) => {
  const selectedBin = useBin();
  const binService = useBinService();

  const autoRefreshButtonColor = listening ? 'green' : 'red';

  const handleClearBin = async () => {
    if (!selectedBin) return;
    await binService.clearBin(selectedBin.binId);
  };

  const handleDeleteBin = async () => {
    if (!selectedBin) return;
    await binService.deleteBin(selectedBin.binId);
  };

  return (
    <div className="navbar">
      <div className="navbar-title">
        <p>Request Bins</p>
      </div>
      <div className="navbar-controls">
        {selectedBin && (
          <>
            <button
              style={{ backgroundColor: autoRefreshButtonColor }}
              onClick={toggleListening}
            >
              Toggle Auto-Refresh
            </button>
            <button onClick={() => void handleClearBin()}>
              Clear Bin
            </button>
            <button onClick={() => void handleDeleteBin()}>
              Delete Bin
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;