import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from '../components/Select';
import Modal from '../components/Modal';
import { getPokemonList } from '../api/pokemonApi';
import InputField from '../components/InputField';

interface Pokemon {
  name: string;
  url: string;
}

interface SelectItem {
  name: string;
  url: string;
}

interface FormData {
  name: string;
  lastName: string;
  selectedPokemon: Pokemon[];
}

const BattleTowerForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      lastName: '',
      selectedPokemon: [],
    },
  });

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [pokemonList, setPokemonList] = useState<SelectItem[]>([]);
  const selectedPokemon = watch('selectedPokemon', []);

  useEffect(() => {
    getPokemonList().then((res) => {
      setPokemonList(res);
    });
  }, []);

  const onSubmit = (data: FormData) => {
    setModalOpen(true);
  };

  const handlePokemonSelection = (items: Pokemon[]) => {
    setValue('selectedPokemon', items, { shouldTouch: true });
  };

  return (
    <div className="mx-auto h-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold">Battle Tower</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-8">
        <InputField
          type="text"
          placeholder="Name"
          error={errors.name && errors.name.message}
          label="Name"
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 3, message: 'Minimum 3 characters' },
            maxLength: { value: 12, message: 'Maximum 12 characters' },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'Only Latin letters allowed',
            },
          })}
          onChange={(e) =>
            setValue('name', e.target.value, { shouldTouch: true })
          }
          onBlur={() =>
            setValue('name', watch('name'), { shouldValidate: true })
          }
        />
        <InputField
          type="text"
          placeholder="Last name"
          error={errors.lastName && errors.lastName.message}
          label="Last name"
          {...register('lastName', {
            required: 'Last name is required',
            minLength: { value: 3, message: 'Minimum 3 characters' },
            maxLength: { value: 12, message: 'Maximum 12 characters' },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'Only Latin letters allowed',
            },
          })}
          onChange={(e) =>
            setValue('lastName', e.target.value, { shouldTouch: true })
          }
          onBlur={() =>
            setValue('lastName', watch('lastName'), { shouldValidate: true })
          }
        />
        <Controller
          name="selectedPokemon"
          control={control}
          rules={{
            validate: (value) =>
              value.length === 4 ? true : 'You must select exactly 4 Pokemon!',
          }}
          render={({ field }) => (
            <Select
              itemsList={pokemonList}
              selectedItems={field.value}
              error={errors.selectedPokemon && errors.selectedPokemon.message}
              setSelectedItem={handlePokemonSelection}
              label="Choose your pokemons"
            />
          )}
        />
        <button
          type="submit"
          className="bg-violet-700 hover:bg-violet-600 text-white p-2 w-full rounded"
        >
          Confirm
        </button>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        selectedPokemon={selectedPokemon}
      />
    </div>
  );
};

export default BattleTowerForm;
