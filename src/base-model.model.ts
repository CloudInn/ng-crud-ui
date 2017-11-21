import { BaseField } from './forms';

export interface BaseModelInterface {
  api: string;
  verbose_name: string;
  fields: BaseField[];
  listing_fields: string[];
  actions: any[];
  bulk_actions: any[];
  list_actions: any[];
};