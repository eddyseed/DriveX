declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module 'react-google-recaptcha' {
  import * as React from 'react';

  interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    onErrored?: () => void;
    size?: "compact" | "normal" | "invisible";
    theme?: "light" | "dark";
    tabindex?: number;
    badge?: "bottomright" | "bottomleft" | "inline";
  }

  class ReCAPTCHA extends React.Component<ReCAPTCHAProps> { }

  export default ReCAPTCHA;
  
} 
declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "*.jpeg" {
  const value: string;
  export default value;
}
declare module "*.svg" {
  const value: string;
  export default value;
}

