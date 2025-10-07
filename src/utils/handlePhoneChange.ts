import type { ChangeEvent } from "react";

type PhoneFieldName = "phone" | "phoneNumber";

interface PhoneChangeHandler {
  (
    e: ChangeEvent<HTMLInputElement>,
    setValue: (field: PhoneFieldName, value: string) => void,
    fieldName?: PhoneFieldName
  ): void;
}

const handlePhoneChange: PhoneChangeHandler = (e, setValue, fieldName = "phoneNumber") => {
  const value = e.target.value.replace(/\D/g, "");

  if (value.length < 4) {
    setValue(fieldName, "+380 ");
    return;
  }

  const formatted = `+${value.slice(0, 3)} ${value.slice(3, 5)} ${value.slice(5, 8)} ${value.slice(8, 10)} ${value.slice(10, 12)}`.trim();
  setValue(fieldName, formatted);
};

export default handlePhoneChange;
