import { useState } from 'react';
import type { BinInfo } from '../types';

interface TodoFormProps {
  onCreateBin: (bin: BinInfo) => void;
}

interface BinFormState {
  binName: string;
}

const BinForm = ({ onCreateBin }: TodoFormProps) => {
  const [formState, setFormState] = useState<BinFormState>({ binName: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const binData = {
      binId: formState.binName,
    };

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