type TenantSummary = {
  id: number;
  businessName: string;
  avatar: string;
};

export type ReplyType = {
    id: number;
    reply: string;
    tenant: TenantSummary;
    createdAt: string;
};

export type ReplyInputType = {
    comment: string;
};