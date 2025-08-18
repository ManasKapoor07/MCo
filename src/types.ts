export type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image?: string | null;
  brand: string;
  category: string;
  color: string;
};


export type DropdownProps = {
  title: string;
  children: React.ReactNode;
};