export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  active: boolean;
  image: string;
  role: 'root' | 'admin' | 'journalist';
};

export type Doctor = {
  id: number;
  name: string;
  specialty: string;
  state: string;
  crm: string;
  phone?: string;
  email?: string;
  visible: boolean;
  createdAt: Date;
  schedules: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
};

export type Article = {
  id: number;
  title: string;
  subtitle?: string;
  content?: string;
  status: 'published' | 'draft' | 'archived';
  author: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  createdByUser: {
    name: string;
    username: string;
    role: string;
    image?: string;
    createdAt: Date;
  };
};
