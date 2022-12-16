import { useState } from "react";
import { Box } from "../components/Box";
import { Card } from "../components/Card";
import { FormPayment } from "../components/FormPayment";
import { PaymentCardProvider } from "../contexts/PaymentCardContext";

export default function Home() {
  const [showPaymentCard, setShowPaymentCard] = useState<"front" | "back">(
    "front"
  );

  return (
    <>
      <PaymentCardProvider>
        <Box className="mt-36 md:mt-48 flex flex-col gap-10 max-w-[90%] md:max-w-3xl">
          <Card showPaymentCard={showPaymentCard} className="-mt-32" />
          <FormPayment setShowPaymentCard={setShowPaymentCard} />
        </Box>
      </PaymentCardProvider>
    </>
  );
}
