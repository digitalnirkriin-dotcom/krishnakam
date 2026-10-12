-- Starter schema for Cloudflare D1. Run only after creating a D1 database.
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tamil_name TEXT DEFAULT '',
  description TEXT DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('sweets','snacks','festival')),
  price_paise INTEGER,
  unit TEXT DEFAULT '500g',
  stock INTEGER DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  items_json TEXT NOT NULL,
  subtotal_paise INTEGER NOT NULL,
  delivery_fee_paise INTEGER NOT NULL DEFAULT 0,
  total_paise INTEGER NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'upi_manual',
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','rejected','refunded')),
  order_status TEXT NOT NULL DEFAULT 'received' CHECK (order_status IN ('received','confirmed','preparing','ready','completed','cancelled')),
  payment_reference TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS private_feedback (
  id TEXT PRIMARY KEY,
  customer_name TEXT DEFAULT '',
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'private' CHECK (status IN ('private','reviewed','published','archived')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
