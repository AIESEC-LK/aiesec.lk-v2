export type Opportunity = {
  title: string;
  description: string;
  deadline: string;
  applicationLink?: string;
};

export type Partner = {
  name: string;
  logo: string;
  category: string;
  description: string;
  slug?: string; // URL-friendly identifier
  aboutCompany?: string; // Less than 200 words
  partnerPortalVideo?: string; // Video URL
  whyPartner?: string; // Why partner with AIESEC (less than 200 words)
  collaboration?: string; // About collaboration in Sri Lanka (less than 200 words)
  whyJoin?: string; // Why should AIESECer join
  opportunitiesList?: Opportunity[]; // Array of opportunities
};

export type NationalPartnerCardProps = {
  partner: Partner;
};

export type GlobalPartnerCardProps = {
  partner: Partner;
};
export type PartnerPopoverProps = {
  partner: Partner;
  isOpen: boolean;
  onClose: () => void;
};

