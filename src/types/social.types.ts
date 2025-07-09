// Social media and contact related types

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

export interface EmailJSResponseStatus {
  status: number;
  text: string;
}

export interface EmailJSParams {
  from_name: string;
  from_email: string;
  message: string;
  to_name?: string;
  reply_to?: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}
