import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import type { BinInfo } from '../types';

interface TodoFormProps {
  onCreateBin: (bin: BinInfo) => void;
}

interface BinFormState {
  binName: string;
}

const BinForm = ({ onCreateBin }: TodoFormProps) => {
  const [formState, setFormState] = useState<BinFormState>({ binName: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const binData = {
      binName: formState.binName,
    };
    setFormState({ binName: '' });
    onCreateBin(binData);
  };

  return (
    <div className="main-page-card">
      <div className="bin-form-header">
        <h2>Create a new bin</h2>
        <p>Choose a short, memorable name for collecting requests.</p>
      </div>

      <form className="bin-form" action="#" method="POST" onSubmit={handleSubmit}>
        <label htmlFor="binName" className="bin-form-label">Bin Name</label>
        <input
          type="text"
          name="binName"
          id="binName"
          autoComplete="off"
          className="bin-form-input"
          value={formState.binName}
          onChange={handleInputChange}
          placeholder="Enter bin name"
          required
        />
        <input className="bin-form-submit" type="submit" value="Create" />
      </form>
    </div>
  );
};

export default BinForm;