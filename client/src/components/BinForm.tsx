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
    <form action="#" method="POST" onSubmit={handleSubmit}>
      <label htmlFor="binName">Bin Name</label>
      <input
        type="text"
        name="binName"
        id="binName"
        value={formState.binName}
        onChange={handleInputChange}
        placeholder="Enter bin name"
        required
      />
      <input type="submit" value="Create" />
    </form>
  );
};

export default BinForm;