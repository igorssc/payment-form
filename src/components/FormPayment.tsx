import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { PaymentCardContext } from "../contexts/PaymentCardContext";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select } from "./Select";

interface FormPaymentProps {
  setShowPaymentCard: Dispatch<SetStateAction<"front" | "back">>;
}

export const FormPayment = ({ setShowPaymentCard }: FormPaymentProps) => {
  const {
    holderName,
    setHolderName,
    setNumbers,
    monthExpiration,
    setMonthExpiration,
    yearExpiration,
    setYearExpiration,
    cvv,
    setCvv,
  } = useContext(PaymentCardContext);

  const [showNumbersInput, setShowNumbersInput] = useState("");

  const changeNumber = (value: string) => {
    let onlyNumbers = value.replace(/\D/g, "");

    if (onlyNumbers.length > 16) {
      onlyNumbers = onlyNumbers.slice(0, 16);
    }

    const numbersWithSeparations =
      onlyNumbers
        .match(/.{1,4}/g)
        ?.reduce(
          (previus, current, index) =>
            index !== 0 ? previus + " " + current : current,
          ""
        ) || "";

    setShowNumbersInput(numbersWithSeparations);
  };

  const changeCvv = (value: string) => {
    let onlyNumbers = value.replace(/\D/g, "");

    if (onlyNumbers.length > 3) {
      {
        onlyNumbers = onlyNumbers.slice(0, 3);
      }
    }

    setCvv(onlyNumbers);
  };

  useEffect(() => {
    const onlyNumbers = showNumbersInput.replace(/\D/g, "");

    setNumbers(onlyNumbers);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showNumbersInput]);

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-5">
        <Input
          label="Números"
          value={showNumbersInput}
          setValue={changeNumber}
        />

        <Input label="Nome" value={holderName} setValue={setHolderName} />

        <div className="grid grid-cols-2 gap-5">
          <Select
            label="MM"
            options={Array.from({ length: 12 }, (_, index) =>
              String(index + 1)
            )}
            value={monthExpiration}
            setValue={setMonthExpiration}
          />

          <Select
            label="YY"
            options={Array.from({ length: 11 }, (_, index) =>
              String(new Date().getFullYear() + index)
            )}
            value={yearExpiration}
            setValue={setYearExpiration}
          />
        </div>

        <Input
          label="CVV"
          value={cvv}
          setValue={changeCvv}
          onFocus={() => setShowPaymentCard("back")}
          onBlur={() => setShowPaymentCard("front")}
        />
      </div>

      <Button>Finalizar</Button>
    </>
  );
};
