import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import PatientForm from "@/components/forms/PatientForm";


export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            height={100}
            width={100}
            className="mb-12"
          />


          <PatientForm />


          <div className="text-14-regular">
          <p className="justify-items-end text-dark-600 xl:text-left">© 2024 CarPulse. All rights reserved.</p>
          <Link href="/?admin=true" className="text-green-500">
          Admin
          </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

