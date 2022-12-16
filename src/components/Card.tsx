import clsx from "clsx";
import Image from "next/image";
import { HTMLAttributes, useContext, useEffect, useState } from "react";
import { PaymentCardContext } from "../contexts/PaymentCardContext";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  showPaymentCard?: "front" | "back";
}

export const Card = ({
  showPaymentCard = "front",
  className,
  ...props
}: CardProps) => {
  const { numbers, holderName, monthExpiration, yearExpiration, cvv, brand } =
    useContext(PaymentCardContext);

  const [showNumberCard, setShowNumberCard] = useState("#### #### #### ####");

  useEffect(() => {
    const numbersWithSeparations =
      numbers
        .match(/.{1,4}/g)
        ?.reduce(
          (previus, current, index) =>
            index !== 0 ? previus + " " + current : current,
          ""
        ) || "";

    const base = "#### #### #### ####";

    const numbersOfCard =
      numbersWithSeparations +
      (numbersWithSeparations.length !== base.length
        ? base.slice(numbersWithSeparations.length - base.length)
        : "");

    setShowNumberCard(numbersOfCard);
  }, [numbers]);

  return (
    <>
      <div
        className={clsx(
          "credit-card-box perspective-10 w-[300px] h-[180px] md:w-[400px] md:h-[250px] relative left-1/2 -translate-x-1/2",
          className
        )}
        {...props}
      >
        <div
          className={clsx(
            "flip relative w-full h-full duration-500 transform-style-preserve3d",
            showPaymentCard === "back" && "rotate-y-180"
          )}
        >
          <div
            className={clsx(
              "front w-full h-full rotate-y-0 rounded-2xl backface-hidden bg-gradient-to-tr from-slate-600 to-gray-400 before:rounded-2xl absolute z-10 text-white top-0 left-0 before:content-[''] before:absolute before:w-full before:h-full before:top-0",
              brand === "visa" && "!from-sky-600 !to-cyan-400",
              brand === "mastercard" && "!from-amber-500 !to-amber-900",
              brand === "diners" && "!from-gray-600 !to-zinc-300",
              brand === "american" && "!from-slate-300 !to-gray-500",
              brand === "elo" && "!from-orange-500 !to-yellow-600"
            )}
          >
            <div className="chip absolute w-12 md:w-14 h-9 md:h-11 top-3 md:top-5 left-5 bg-gradient-to-tr from-slate-300 to-zinc-400 rounded-lg before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:m-auto before:w-4/5 before:h-2/3 before:rounded-md before:border-4 before:border-zinc-800/20"></div>
            <div className="logo absolute md:top-2 right-5 w-10 md:w-14 flex items-center justify-center h-14 md:h-16">
              {brand &&
                ["visa", "mastercard", "diners", "american", "elo"].some(
                  (value) => value === brand
                ) && (
                  <Image
                    src={
                      (brand === "visa" && "/assets/visa.svg") ||
                      (brand === "mastercard" && "/assets/mastercard.svg") ||
                      (brand === "diners" &&
                        "/assets/diners-club-international.svg") ||
                      (brand === "american" &&
                        "/assets/american-express.svg") ||
                      (brand === "elo" && "/assets/elo.svg") ||
                      ""
                    }
                    width={56}
                    height={100}
                    className="h-auto mt-2"
                    alt="logo from card"
                  />
                )}
            </div>
            <div className="number absolute my-0 mx-auto top-20 md:top-24 left-6 text-xl md:text-3xl opacity-80 tracking-wider">
              {showNumberCard}
            </div>
            <div className="card-holder absolute my-0 mx-auto top-32 md:top-44 left-5 text-xs md:text-xl capitalize">
              <label className="text-[0.6rem] md:text-xs font-normal opacity-70 block mb-1 tracking-widest uppercase">
                Nome
              </label>
              <div>{holderName}</div>
            </div>
            <div className="card-expiration-date absolute my-0 mx-auto top-32 md:top-44 left-auto right-5 text-xs md:text-xl capitalize text-right">
              <label className="text-[0.6rem] md:text-xs font-normal opacity-70 block mb-1 tracking-widest uppercase">
                Validade
              </label>
              <div>
                {monthExpiration}/{yearExpiration}
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "back w-full h-full rounded-2xl backface-hidden bg-gradient-to-tr from-slate-600 to-gray-400 absolute text-white top-0 left-0",
              showPaymentCard === "back" ? "rotate-y-180" : "-rotate-y-180",
              brand === "visa" && "!from-sky-600 !to-cyan-400",
              brand === "mastercard" && "!from-amber-500 !to-amber-900",
              brand === "diners" && "!from-gray-600 !to-zinc-300",
              brand === "american" && "!from-slate-300 !to-gray-500",
              brand === "elo" && "!from-orange-500 !to-yellow-600"
            )}
          >
            <div className="strip absolute w-full h-9 md:h-12 top-7 left-0 bg-gradient-to-r from-zinc-700 to-zinc-900"></div>
            <div className="logo top-[7.5rem] md:top-44 absolute right-5 w-10 md:w-14 flex items-center justify-center h-16">
              {brand &&
                ["visa", "mastercard", "diners", "american", "elo"].some(
                  (value) => value === brand
                ) && (
                  <Image
                    src={
                      (brand === "visa" && "/assets/visa.svg") ||
                      (brand === "mastercard" && "/assets/mastercard.svg") ||
                      (brand === "diners" &&
                        "/assets/diners-club-international.svg") ||
                      (brand === "american" &&
                        "/assets/american-express.svg") ||
                      (brand === "elo" && "/assets/elo.svg") ||
                      ""
                    }
                    width={56}
                    height={100}
                    className="h-auto"
                    alt="logo from card"
                  />
                )}
            </div>
            <div className="ccv h-7 md:h-9 bg-white w-11/12 rounded-md top-24 md:top-28 left-0 right-0 absolute my-0 mx-auto text-right pr-2 text-xs md:text-xl">
              <label className="text-[0.6rem] md:text-xs font-normal opacity-70 block tracking-widest uppercase -mt-6 mb-3 text-white">
                CCV
              </label>
              <div className="text-black">{cvv}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
