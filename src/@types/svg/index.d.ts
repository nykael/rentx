declare module '*.svg' {
   import React from "react";
   import { SVGProps } from "react-native-svg";
   const content: React.Fc<SVGProps>;
   export default content;
}