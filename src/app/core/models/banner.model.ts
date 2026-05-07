//  Field config interface
export interface BannerField {
  type: 'text' | 'number' | 'url' | 'date' | 'toggle' | 'file';
  id: string;
  label: string;
  placeholder?: string;
  hint?: string;
  validation?: Record<string, string>;
}

//  Banner data interface (mirrors Sequelize model) 
export interface BannerItem {
  id: number;
  title: string;
  imageUrl: string;
  redirectUrl?: string;
  isActive: boolean;
  priority: number;
  startDate: string;
  endDate: string;
  createdAt?: Date;
}