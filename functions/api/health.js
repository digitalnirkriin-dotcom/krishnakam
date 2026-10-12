export async function onRequestGet() {
  return Response.json({ ok: true, service: "KrishnaKam API starter", note: "This endpoint confirms Pages Functions are deployed." });
}
