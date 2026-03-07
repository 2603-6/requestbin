import './App.css';
import Bin from './components/Bin.tsx';
import type { IRequestProps } from './types';

function App() {
  const exampleRequest: IRequestProps = {
    requestId: 5,
    requestHeaders: 'headers',
    timestamp: 'timestamp',
    route: 'route',
    type: 'GET',
  };

  return (
    <div>
      <Bin binId={6} requests={[exampleRequest]}/>
    </div>
  );
}

export default App;
