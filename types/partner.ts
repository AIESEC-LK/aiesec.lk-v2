export type Partner = {
  name: string;
  logo: string;
  category: string;
  description: string;
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

