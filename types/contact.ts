export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SocialMedia = {
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  address: string;
  socialMedia: SocialMedia;
};

export type SocialMediaProps = {
  socialMedia: SocialMedia;
};