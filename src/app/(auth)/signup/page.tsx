"use client";

import FormBuilder from "~/components/shared/Form";
import { DUMMY_FORM_DATA } from "~/constants";
import { signupFormSchema } from "~/validators/signupSchema";

const Signup = () => {
  const onSubmit = (data: typeof signupFormSchema) => {
    console.log(data);
  };
  return (
    <div>
      <FormBuilder
        formData={DUMMY_FORM_DATA}
        formSchema={signupFormSchema}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Signup;
