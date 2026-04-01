import React, { useEffect,useState,Fragment } from "react";
import { useTranslation } from "react-i18next";


export const getUserType=()=>{
  return window?.Digit?.SessionStorage?.get("userType")||"employee";
}