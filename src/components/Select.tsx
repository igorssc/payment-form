import { Listbox, Transition } from "@headlessui/react";
import { CaretDown, CaretUp, Check } from "phosphor-react";
import { Dispatch, Fragment, SetStateAction } from "react";

interface SelectProps {
  label?: string;
  options: string[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const Select = ({ label, options, value, setValue }: SelectProps) => {
  return (
    <>
      <Listbox value={value} onChange={setValue}>
        <div className="relative mt-1 flex flex-col gap-3">
          {label && <Listbox.Label className="text-sm">{label}</Listbox.Label>}
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#F1F1F1] py-2 pl-3 pr-10 text-left focus:outline text-sm">
            <span className="block truncate">{value || "Selecione"}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex flex-col justify-center items-center pr-2">
              <CaretUp />
              <CaretDown className="-mt-1" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-slate-500/10 text-amber-900"
                        : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};
