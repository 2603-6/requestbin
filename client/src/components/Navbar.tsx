import { type FC } from 'react';
import { useBin } from '../contexts/binContext.ts';
import { useBinService } from '../contexts/binServiceContext.ts';

const Navbar: FC = () => {
  const selectedBin = useBin();
  const binService = useBinService();

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