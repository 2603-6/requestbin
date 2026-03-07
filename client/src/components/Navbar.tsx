import { type FC } from 'react';
import type { INavbarProps } from '../types';

const Navbar: FC<INavbarProps> = ({ binId, listening, toggleListening, onClearBin, onDeleteBin }) => {




  return ( <div className={'navbar'}>
    <div className={'navbar-title'}>
      <p>Request Bins</p>
    </div>
    <div className={'navbar-controls'}>
      {binId ?
        (<>
          <button style={{ backgroundColor: listening ? 'green' : 'red' }} onClick={toggleListening}>Toggle Auto-Refresh</button>
          <button onClick={onClearBin}>Clear Bin</button>
          <button onClick={onDeleteBin}>Delete Bin</button>
        </>)
        : null
      }
    </div>
  </div> );
};

export default Navbar;