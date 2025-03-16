import { Meta } from '@storybook/react';
import Select, { SelectItem } from '../components/Select';
import React, { useState } from 'react';

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'Select component allows users to choose an option from a list.',
      },
    },
  },
} as Meta<typeof Select>;

const itemsList: SelectItem[] = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
];

export const select = () => {
  const [selectedItems, setSelectedItems] = useState<SelectItem[]>([]);

  const handleSelect = (items: SelectItem[]) => {
    setSelectedItems(items);
  };
  return (
    <div className="flex flex-col gap-6">
      {/* Default */}
      <div>
        <h3 className="text-lg font-semibold">Default</h3>
        <Select
          label="Label"
          itemsList={itemsList}
          selectedItems={selectedItems}
          setSelectedItem={handleSelect}
        />
      </div>

      {/* Secondary Label */}
      <div>
        <h3 className="text-lg font-semibold">Secondary Label</h3>
        <Select
          label="Label"
          secondaryLabel="Secondary label"
          itemsList={itemsList}
          selectedItems={selectedItems}
          setSelectedItem={handleSelect}
        />
        <div className="flex flex-col gap-4"></div>
      </div>

      {/*Description*/}
      <div>
        <h3 className="text-lg font-semibold">Description</h3>
        <Select
          label="Label"
          description="This is a description"
          itemsList={itemsList}
          selectedItems={selectedItems}
          setSelectedItem={handleSelect}
        />
      </div>
      {/*Helper Text*/}
      <div>
        <h3 className="text-lg font-semibold">Helper Text</h3>
        <Select
          label="Label"
          helperText="This is a helper text"
          itemsList={itemsList}
          selectedItems={selectedItems}
          setSelectedItem={handleSelect}
        />
      </div>

      {/*Error*/}
      <div>
        <h3 className="text-lg font-semibold">With Error</h3>
        <Select
          label="Label"
          itemsList={itemsList}
          error="This field is required"
          selectedItems={selectedItems}
          setSelectedItem={handleSelect}
        />
      </div>

      {/* Disabled */}
      <div>
        <h3 className="text-lg font-semibold">Disabled</h3>
        <Select
          label="Label"
          itemsList={itemsList}
          disabled
          selectedItems={selectedItems}
          setSelectedItem={handleSelect}
        />
      </div>
    </div>
  );
};
