const sample = [
  { id: "mysorepak", name: "Mysorepak", category: "sweets", price_paise: 22000, unit: "500g", active: 1 },
  { id: "laddu", name: "Laddu", category: "sweets", price_paise: 22000, unit: "500g", active: 1 },
  { id: "murukku", name: "Murukku", category: "snacks", price_paise: 24000, unit: "500g", active: 1 }
];
export async function onRequestGet({ env }) {
  try {
    if (env.DB) {
      const { results } = await env.DB.prepare(
        "SELECT id, name, tamil_name, description, category, price_paise, unit, stock, active FROM products WHERE active = 1 ORDER BY sort_order, name"
      ).all();
      return Response.json({ products: results });
    }
  } catch (e) {
    return Response.json({ error: "Database query failed. Check that schema.sql has been applied." }, { status: 500 });
  }
  return Response.json({ products: sample, demo: true });
}
