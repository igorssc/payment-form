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

    numbers.match(/^4[0-9]{15}$/) && (brand = "visa");

    numbers.match(
      /^((5(([1-2]|[4-5])[0-9]{8}|0((1|6)([0-9]{7}))|3(0(4((0|[2-9])[0-9]{5})|([0-3]|[5-9])[0-9]{6})|[1-9][0-9]{7})))|((508116)\\d{4,10})|((502121)\\d{4,10})|((589916)\\d{4,10})|(2[0-9]{15})|(67[0-9]{14})|(506387)\\d{4,10})/
    ) && (brand = "mastercard");

    numbers.match(/^3(?:0[0-5]|[68][0-9])[0-9]/) && (brand = "diners");

    numbers.match(
      /^(50(67(0[78]|1[5789]|2[012456789]|3[01234569]|4[0-7]|53|7[4-8])|9(0(0[0-9]|1[34]|2[0-7]|3[0359]|4[01235678]|5[01235789]|6[0-9]|7[01346789]|8[01234789]|9[123479])|1(0[34568]|4[6-9]|5[1-8]|8[356789])|2(2[0-2]|5[78]|6[1-9]|7[0-9]|8[01235678]|90)|357|4(0[7-9]|1[0-9]|2[0-2]|31|5[7-9]|6[0-6]|84)|55[01]|636|7(2[2-9]|6[5-9])))|4(0117[89]|3(1274|8935)|5(1416|7(393|63[12])))|6(27780|36368|5(0(0(3[12356789]|4[0-7]|7[78])|4(0[6-9]|1[0234]|2[2-9]|3[045789]|8[5-9]|9[0-9])|5(0[012346789]|1[0-9]|2[0-9]|3[0178]|5[2-9]|6[0-6]|7[7-9]|8[0-8]|9[1-8])|72[0-7]|9(0[1-9]|1[0-9]|2[0128]|3[89]|4[6-9]|5[0145]|6[235678]|71))|16(5[2-9]|6[0-9]|7[01456789])|50(0[0-9]|1[02345678]|36|5[1267]))))\\d{0,13}$/
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
