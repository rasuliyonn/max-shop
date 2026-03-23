import React from "react";
import { RiVisaFill } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa";
import { FaApplePay } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mx-auto container  mt-16 mb-8">
      <hr className="mb-6" />
      <footer>
        <div className="flex justify-between">
          <div>Max.Shop © 2000-2026, All Rights Reserved</div>
          <div className="text-5xl flex gap-5">
            <RiVisaFill />
            <FaCcMastercard />
            <FaCcPaypal />
            <FaApplePay />
            <FaGooglePay />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
