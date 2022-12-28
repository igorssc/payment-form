import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
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
  brand:
    | "visa"
    | "mastercard"
    | "diners"
    | "elo"
    | "american"
    | null
    | undefined;
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
  const [brand, setBrand] = useState<
    "visa" | "mastercard" | "diners" | "elo" | "american" | null
  >();

  useEffect(() => {
    let brand:
      | "visa"
      | "mastercard"
      | "diners"
      | "elo"
      | "american"
      | null
      | undefined;

    numbers.match(/^4[0-9]/) && (brand = "visa");

    numbers.match(
      /^((5(([1-2]|[4-5])[0-9]{8}|0((1|6)([0-9]{7}))|3(0(4((0|[2-9])[0-9]{5})|([0-3]|[5-9])[0-9]{6})|[1-9][0-9]{7})))|((508116)\\d{4,10})|((502121)\\d{4,10})|((589916)\\d{4,10})|(2[0-9]{15})|(67[0-9]{14})|(506387)\\d{4,10})/
    ) && (brand = "mastercard");

    numbers.match(/^3(?:0[0-5]|[68][0-9])[0-9]/) && (brand = "diners");

    numbers.match(
      /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^504175|^627780|^63(6297|6368|6369)|(65003[5-9]|65004[0-9]|65005[01])|(65040[5-9]|6504[1-3][0-9])|(65048[5-9]|65049[0-9]|6505[0-2][0-9]|65053[0-8])|(65054[1-9]|6505[5-8][0-9]|65059[0-8])|(65070[0-9]|65071[0-8])|(65072[0-7])|(65090[1-9]|6509[1-6][0-9]|65097[0-8])|(65165[2-9]|6516[67][0-9])|(65500[0-9]|65501[0-9])|(65502[1-9]|6550[34][0-9]|65505[0-8])|^(506699|5067[0-6][0-9]|50677[0-8])|^(509[0-8][0-9]{2}|5099[0-8][0-9]|50999[0-9])|^65003[1-3]|^(65003[5-9]|65004\d|65005[0-1])|^(65040[5-9]|6504[1-3]\d)|^(65048[5-9]|65049\d|6505[0-2]\d|65053[0-8])|^(65054[1-9]|6505[5-8]\d|65059[0-8])|^(65070\d|65071[0-8])|^65072[0-7]|^(65090[1-9]|65091\d|650920)|^(65165[2-9]|6516[6-7]\d)|^(65500\d|65501\d)|^(65502[1-9]|6550[3-4]\d|65505[0-8])/
    ) && (brand = "elo");

    numbers.match(/^3[47][0-9]{13}$/) && (brand = "american");

    brand ? setBrand(brand) : setBrand(null);
  }, [numbers]);

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
        brand,
      }}
    >
      {children}
    </PaymentCardContext.Provider>
  );
}
