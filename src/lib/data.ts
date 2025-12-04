export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplierId: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  createdAt: string;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  products: string[];
};

export const products: Product[] = [
  { id: 'p001', name: 'Regionale Bio-Milch', category: 'Milchprodukte', price: 1.89, stock: 45, supplierId: 's01' },
  { id: 'p002', name: 'Frische Eier (10 Stück)', category: 'Grundnahrungsmittel', price: 3.49, stock: 30, supplierId: 's01' },
  { id: 'p003', name: 'Handgemachtes Sauerteigbrot', category: 'Backwaren', price: 4.99, stock: 15, supplierId: 's02' },
  { id: 'p004', name: 'Lokaler Apfelsaft', category: 'Getränke', price: 2.99, stock: 60, supplierId: 's03' },
  { id: 'p005', name: 'Bio-Kartoffeln (1kg)', category: 'Gemüse', price: 2.49, stock: 80, supplierId: 's01' },
  { id: 'p006', name: 'Erdbeer-Marmelade', category: 'Aufstriche', price: 3.99, stock: 25, supplierId: 's02' },
  { id: 'p007', name: 'Zahnpasta "Frische"', category: 'Drogerie', price: 2.19, stock: 50, supplierId: 's04' },
  { id: 'p008', name: 'Spaghetti No. 5', category: 'Grundnahrungsmittel', price: 1.29, stock: 120, supplierId: 's04' },
  { id: 'p009', name: 'Mineralwasser (still)', category: 'Getränke', price: 0.79, stock: 200, supplierId: 's03' },
  { id: 'p010', name: 'Bio-Haferflocken', category: 'Grundnahrungsmittel', price: 2.29, stock: 40, supplierId: 's04' },
];

export const customers: Customer[] = [
  { id: 'c001', name: 'Anna Schmidt', email: 'anna.s@example.com', phone: '0176 12345678', loyaltyPoints: 1250, createdAt: '2023-01-15' },
  { id: 'c002', name: 'Markus Weber', email: 'm.weber@example.com', phone: '0160 87654321', loyaltyPoints: 820, createdAt: '2023-02-20' },
  { id: 'c003', name: 'Julia Huber', email: 'julia.huber@example.com', phone: '0151 11223344', loyaltyPoints: 2400, createdAt: '2023-03-05' },
  { id: 'c004', name: 'Thomas Bauer', email: 't.bauer@example.com', phone: '0171 55667788', loyaltyPoints: 350, createdAt: '2023-05-10' },
  { id: 'c005', name: 'Sabine Keller', email: 'sabine.k@example.com', phone: '0179 99887766', loyaltyPoints: 150, createdAt: '2023-08-01' },
];

export const suppliers: Supplier[] = [
    { id: 's01', name: 'Biohof Huber', contact: 'bestellung@biohof-huber.de', products: ['p001', 'p002', 'p005'] },
    { id: 's02', name: 'Bäckerei Schmidt', contact: 'verkauf@baeckerei-schmidt.de', products: ['p003', 'p006'] },
    { id: 's03', name: 'Getränke Meier', contact: 'order@getraenke-meier.com', products: ['p004', 'p009'] },
    { id: 's04', name: 'Großhandel Frisch', contact: 'einkauf@gh-frisch.de', products: ['p007', 'p008', 'p010'] },
];

export const salesData = {
    'p001': 50, // Regionale Bio-Milch
    'p002': 25, // Frische Eier
    'p003': 40, // Handgemachtes Sauerteigbrot
    'p004': 70, // Lokaler Apfelsaft
    'p005': 20, // Bio-Kartoffeln
    'p006': 15, // Erdbeer-Marmelade
    'p007': 30, // Zahnpasta
    'p008': 60, // Spaghetti
    'p009': 150,// Mineralwasser
    'p010': 35, // Bio-Haferflocken
};

export const salesHistory = [
  { date: '2024-05-01', sales: 1200.50 },
  { date: '2024-05-02', sales: 1350.75 },
  { date: '2024-05-03', sales: 1100.00 },
  { date: '2024-05-04', sales: 1800.25 },
  { date: '2024-05-05', sales: 1950.50 },
  { date: '2024-05-06', sales: 1400.00 },
  { date: '2024-05-07', sales: 1600.80 },
];
