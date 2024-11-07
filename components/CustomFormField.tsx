"use client"

import { E164Number } from "libphonenumber-js/core";
import Image from "next/image";
/* import ReactDatePicker from "react-datepicker"; */
import { Control } from "react-hook-form";
/* import PhoneInput from 'react-phone-number-input' */
import dynamic from 'next/dynamic';
import DatePicker from "react-datepicker";
/* import { Checkbox } from "./ui/checkbox"; */
import "react-datepicker/dist/react-datepicker.css";

const PhoneInput = dynamic(() => import('react-phone-number-input'), { ssr: false });


import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { render } from "react-dom";


export enum FormFieldType {
  INPUT = "INPUT",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}


interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string; //optional?
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({field, props}: { field: any; props: CustomProps }) => {
    const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton  } = props;


  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
            {iconSrc && (

              <Image
                src={iconSrc}
                height={24}
                width={24}
                alt={iconAlt || "icon"}
                className="ml-2"
                />
            )}

            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                className="shad-input border-0"
              />
            </FormControl>

        </div>
      );
    
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
            <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined} 
            onChange={field.onChange}
            className="input-phone "
            />
        </FormControl>    
        )
        case FormFieldType.DATE_PICKER:
          return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
            <Image  src="/assets/icons/calendar.svg"
             height={24} 
             width={24} 
            alt="calendar"
            className="ml-2"/>
            <FormControl>
            <DatePicker selected={field.value} onChange={(date) => field.onChange(date) } 
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
              />
            </FormControl>
            </div>
          )
          case FormFieldType.SKELETON:
            return  renderSkeleton ? renderSkeleton(field)
              :null
              
    default:
      break;
  }
};
const CustomFormField = (props: CustomProps) => {
    const { control, name, label, fieldType } = props;
  
    return (
      <FormField
        control={control}
        name={name}

        render={({ field }) => (
          <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel className="shad-input-label">{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
  
            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    );
  };
  

export default CustomFormField;
