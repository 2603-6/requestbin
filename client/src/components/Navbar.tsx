import { type FC } from 'react';

import type { INavbarProps } from '../types';

const Navbar: FC<INavbarProps> = ({ onClearBin, onDeleteBin }) => {

  return (
    <div className="navbar">
      <div className="navbar-title">
        <p>Request Bins</p>
      </div>
      <div className="navbar-controls">

        { onClearBin &&
          <button onClick={() => void onClearBin()}>
            Clear Bin
          </button>
        }

        {onDeleteBin &&
          <button onClick={() => void onDeleteBin()}>
            Delete Bin
          </button>
        }
      </div>
    </div>
  );
};

export default Navbar;