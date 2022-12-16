import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface PaymentCardProviderProps {
  children: ReactNode;
}

type PaymentCardContextData = {
  holderName: string;
  setHolderName: Dispatch<SetStateAction<string>>;
  numbers: string;
  setNumbers: Dispatch<SetStateAction<string>>;
  monthExpiration: string;
  setMonthExpiration: Dispatch<SetStateAction<string>>;
  yearExpiration: string;
  setYearExpiration: Dispatch<SetStateAction<string>>;
  cvv: string;
  setCvv: Dispatch<SetStateAction<string>>;
  flag:
    | "visa"
    | "mastercard"
    | "diners"
    | "elo"
    | "american"
    | null
    | undefined;
  setFlag: Dispatch<
    SetStateAction<
      "visa" | "mastercard" | "diners" | "elo" | "american" | null | undefined
    >
  >;
};

export const PaymentCardContext = createContext({} as PaymentCardContextData);

export function PaymentCardProvider({ children }: PaymentCardProviderProps) {
  const [holderName, setHolderName] = useState("");
  const [numbers, setNumbers] = useState("");
  const [monthExpiration, setMonthExpiration] = useState("1");
  const [yearExpiration, setYearExpiration] = useState(
    String(new Date().getFullYear())
  );
  const [cvv, setCvv] = useState("");
  const [flag, setFlag] = useState<
    "visa" | "mastercard" | "diners" | "elo" | "american" | null
  >();

  return (
    <PaymentCardContext.Provider
      value={{
        holderName,
        setHolderName,
        numbers,
        setNumbers,
        monthExpiration,
        setMonthExpiration,
        yearExpiration,
        setYearExpiration,
        cvv,
        setCvv,
        flag,
        setFlag,
      }}
    >
      {children}
    </PaymentCardContext.Provider>
  );
}
