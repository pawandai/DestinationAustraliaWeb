import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, CloudUpload, Paperclip } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "~/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "~/components/ui/multi-select";
import { PasswordInput } from "~/components/ui/password-input";
import { PhoneInput } from "~/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import { TagsInput } from "~/components/ui/tags-input";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import {
  signupFormSchema,
  type SignupFormSchemaType,
} from "~/validators/signupSchema";

interface FormField {
  checked: boolean;
  description: string;
  disabled: boolean;
  label: string;
  name: "name" | "email" | "password" | "confirmPassword" | "tnc";
  placeholder: string;
  required: boolean;
  rowIndex: number;
  type: string;
  value: string | string[];
  variant: string;
}

interface FormBuilderProps {
  formData: FormField[];
}

// Main FormBuilder Component
const FormBuilder: React.FC<FormBuilderProps> = ({ formData }) => {
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const form = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
  });

  function onSubmit(values: SignupFormSchemaType) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        {formData.map((fieldData) => {
          const { name, label, placeholder, variant, type, value } = fieldData;

          return (
            <FormField
              key={name}
              name={name}
              control={form.control}
              render={({ field, fieldState }) => {
                switch (variant) {
                  case "Input":
                    return (
                      <FormItem>
                        <div className="flex w-full items-center justify-between leading-none">
                          <label htmlFor={name} className="text-sm">
                            {label}
                          </label>
                          <FormMessage className="text-red-400" />
                        </div>
                        <FormControl>
                          <Input
                            id={name}
                            placeholder={placeholder}
                            type={type}
                            value={
                              Array.isArray(field.value)
                                ? undefined
                                : typeof field.value === "boolean"
                                  ? ""
                                  : field.value
                            }
                            className={cn({
                              "border-red-400": fieldState.invalid,
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    );

                  case "Textarea":
                    return (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <label htmlFor={name}>{label}</label>
                            <FormControl>
                              <Textarea
                                placeholder={placeholder}
                                className="resize-none"
                                {...field}
                                value={
                                  typeof field.value === "boolean"
                                    ? ""
                                    : field.value
                                }
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );

                  case "Checkbox":
                    return (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field, fieldState }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                id={name}
                                checked={Boolean(field.value)}
                                onCheckedChange={field.onChange}
                                className={cn({
                                  "border-red-400": fieldState.invalid,
                                })}
                              />
                            </FormControl>
                            <div className="flex w-full items-center justify-between leading-none">
                              <label htmlFor={name} className="text-sm">
                                {label} *{" "}
                                <Link
                                  href="/tnc"
                                  className="p-2 hover:underline"
                                >
                                  Learn more
                                </Link>
                              </label>
                              <FormMessage className="text-red-400" />
                            </div>
                          </FormItem>
                        )}
                      />
                    );

                  case "PasswordInput":
                    return (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <div className="flex w-full items-center justify-between leading-none">
                              <label htmlFor={name} className="text-sm">
                                {label} *
                              </label>
                              <FormMessage className="text-red-400" />
                            </div>
                            <FormControl>
                              <PasswordInput
                                placeholder={placeholder}
                                id={name}
                                {...field}
                                value={
                                  typeof field.value === "boolean"
                                    ? ""
                                    : field.value
                                }
                                className={cn({
                                  "border-red-400": fieldState.invalid,
                                })}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    );

                  case "Phone":
                    return (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start">
                            <label htmlFor={name}>Phone</label>
                            <FormControl className="w-full">
                              <PhoneInput
                                id={name}
                                placeholder="xxxxxxxxxx"
                                {...field}
                                value={
                                  typeof field.value === "boolean"
                                    ? ""
                                    : field.value
                                }
                                defaultCountry="NP"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );

                  case "Combobox":
                    return (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <label htmlFor={name}>Language</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-[200px] justify-between",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value
                                      ? Array.isArray(value) &&
                                        value.find(
                                          (language) =>
                                            language === field.value,
                                        )
                                      : "Select language"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search language..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No language found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {Array.isArray(value) &&
                                        value.map((language) => (
                                          <CommandItem
                                            value={language}
                                            key={language}
                                            onSelect={() => {
                                              form.setValue(name, language);
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                language === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {language}
                                          </CommandItem>
                                        ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );

                  case "File Input":
                    return (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upload File(s)</FormLabel>
                            <FormControl>
                              <FileUploader
                                value={files}
                                onValueChange={setFiles}
                                dropzoneOptions={dropZoneConfig}
                                className="relative rounded-lg bg-background p-2"
                              >
                                <FileInput
                                  id="fileInput"
                                  className="outline-dashed outline-1 outline-slate-500"
                                  {...field}
                                >
                                  <div className="flex w-full flex-col items-center justify-center p-8">
                                    <CloudUpload className="h-10 w-10 text-gray-500" />
                                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold">
                                        Click to upload
                                      </span>
                                      &nbsp; or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      SVG, PNG, JPG or GIF
                                    </p>
                                  </div>
                                </FileInput>
                                <FileUploaderContent>
                                  {files &&
                                    files.length > 0 &&
                                    files.map((file, i) => (
                                      <FileUploaderItem key={i} index={i}>
                                        <Paperclip className="h-4 w-4 stroke-current" />
                                        <span>{file.name}</span>
                                      </FileUploaderItem>
                                    ))}
                                </FileUploaderContent>
                              </FileUploader>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );

                  case "OTP":
                    return (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OTP</FormLabel>
                            <FormControl>
                              <InputOTP
                                maxLength={6}
                                {...field}
                                value={
                                  typeof field.value === "boolean"
                                    ? ""
                                    : field.value
                                }
                              >
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );

                  case "Multi Select":
                    return (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <MultiSelector
                                values={
                                  Array.isArray(field.value) ? field.value : []
                                }
                                onValuesChange={field.onChange}
                                loop
                                className="max-w-xs"
                              >
                                <MultiSelectorTrigger>
                                  <MultiSelectorInput
                                    placeholder={placeholder}
                                  />
                                </MultiSelectorTrigger>
                                <MultiSelectorContent>
                                  <MultiSelectorList>
                                    {Array.isArray(value) &&
                                      value.map((item) => (
                                        <MultiSelectorItem
                                          key={item}
                                          value={item}
                                        >
                                          {item}
                                        </MultiSelectorItem>
                                      ))}
                                  </MultiSelectorList>
                                </MultiSelectorContent>
                              </MultiSelector>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );

                  case "Select":
                    return (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Email</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={
                                typeof field.value === "string"
                                  ? field.value
                                  : undefined
                              }
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Array.isArray(value) &&
                                  value.map((item) => (
                                    <SelectItem key={item} value={item}>
                                      {item}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );

                  case "Slider":
                    return (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({
                          field: { value: sliderValue, onChange },
                        }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <Slider
                                min={0}
                                max={100}
                                step={2}
                                defaultValue={[5]}
                                onValueChange={(vals) => {
                                  onChange(vals[0]);
                                }}
                              />
                            </FormControl>
                            <p>{sliderValue}</p>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );

                  case "Switch":
                    return (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>{label}</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={Boolean(field.value)}
                                onCheckedChange={field.onChange}
                                disabled
                                aria-readonly
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    );

                  case "Tags":
                    return (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                              <TagsInput
                                value={
                                  Array.isArray(field.value) ? field.value : []
                                }
                                onValueChange={field.onChange}
                                placeholder={placeholder}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );

                  default:
                    return <></>;
                }
              }}
            />
          );
        })}
      </form>
    </Form>
  );
};

export default FormBuilder;
