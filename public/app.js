const products = [
  {id:"mysorepak",name:"Mysorepak",tamil:"மைசூர்பாக்",description:"Melt-in-your-mouth traditional sweet. Confirm ingredients and recipe details before publishing.",price:220,unit:"500g",category:"sweets",emoji:"▰"},
  {id:"laddu",name:"Laddu",tamil:"லட்டு",description:"Golden besan laddus with a comforting cardamom aroma.",price:220,unit:"500g",category:"sweets",emoji:"●"},
  {id:"adhirasam",name:"Adhirasam",tamil:"அதிரசம்",description:"A traditional festive sweet made for special occasions.",price:260,unit:"500g",category:"sweets",emoji:"◉"},
  {id:"murukku",name:"Murukku",tamil:"முறுக்கு",description:"Crispy spiral rice-flour snack, a familiar savoury favourite.",price:240,unit:"500g",category:"snacks",emoji:"◎"},
  {id:"ola-murukku",name:"Ola Murukku",tamil:"ஓல முறுக்கு",description:"Thin, delicate ribbon-style murukku with a satisfying crunch.",price:240,unit:"500g",category:"snacks",emoji:"≋"},
  {id:"mixture",name:"Mixture",tamil:"மிக்சர்",description:"A balanced medley of crunchy sev, peanuts and savoury flakes.",price:220,unit:"500g",category:"snacks",emoji:"✺"},
  {id:"deepavali-mix",name:"Deepavali Mix",tamil:"தீபாவளி மிக்ஸ்",description:"A curated assortment of sweets and savouries for the festival of lights.",price:null,unit:"box",category:"festival",emoji:"✦"},
  {id:"pongal-box",name:"Pongal Sweets Box",tamil:"பொங்கல் இனிப்பு",description:"A festive selection for harvest celebrations and family gatherings.",price:null,unit:"box",category:"festival",emoji:"❋"},
  {id:"wedding-sweets",name:"Wedding Sweets",tamil:"திருமண இனிப்புகள்",description:"Custom assortments for weddings and celebrations. Ask us for a quote.",price:null,unit:"bulk",category:"festival",emoji:"❀"}
];
const config = window.KRISHNAKAM_CONFIG || {};
const cart = new Map();
let category = "sweets";
const rupees = n => `${config.currency || "₹"}${Number(n).toLocaleString("en-IN")}`;
const grid = document.getElementById("productGrid");
function renderProducts(){
  const visible = products.filter(p => p.category === category);
  grid.innerHTML = visible.map(p => `<article class="product-card">
    <div class="product-image" aria-hidden="true">${p.emoji}</div>
    <div class="product-content"><h3>${p.name}</h3><div class="tamil">${p.tamil}</div>
    <p>${p.description}</p><div class="product-bottom"><span class="price">${p.price == null ? "Custom pricing" : `${rupees(p.price)} / ${p.unit}`}</span>
    <button class="add-button" data-add="${p.id}">${p.price == null ? "Enquire" : "＋ Add to order"}</button></div></div></article>`).join("");
}
function renderCart(){
  const items = [...cart.entries()].map(([id,qty]) => ({p:products.find(p=>p.id===id),qty})).filter(x=>x.p);
  const count = items.reduce((n,x)=>n+x.qty,0);
  const total = items.reduce((n,x)=>n+(x.p.price||0)*x.qty,0);
  document.getElementById("cartSummary").textContent = count ? items.map(x=>`${x.p.name} × ${x.qty}`).join(" • ") : "Your cart is empty.";
  document.getElementById("cartTotal").textContent = rupees(total);
  document.getElementById("checkoutButton").disabled = !count;
}
grid.addEventListener("click", e=>{
  const btn=e.target.closest("[data-add]"); if(!btn)return;
  const p=products.find(x=>x.id===btn.dataset.add); if(!p)return;
  if(p.price==null){window.open(`https://wa.me/${config.whatsappNumber||"919999999999"}?text=${encodeURIComponent(`Hello KrishnaKam, I'd like to enquire about ${p.name}.`)}`,"_blank","noopener");return;}
  cart.set(p.id,(cart.get(p.id)||0)+1);renderCart();
  btn.textContent="✓ Added";setTimeout(()=>{btn.textContent="＋ Add to order"},900);
});
document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{
  category=btn.dataset.category;
  document.querySelectorAll(".tab").forEach(b=>{b.classList.toggle("active",b===btn);b.setAttribute("aria-selected",b===btn?"true":"false")});
  renderProducts();
}));
document.getElementById("checkoutButton").addEventListener("click",()=>{
  const items=[...cart.entries()].map(([id,qty])=>({p:products.find(p=>p.id===id),qty})).filter(x=>x.p);
  const total=items.reduce((n,x)=>n+(x.p.price||0)*x.qty,0);
  const message=`Vanakkam KrishnaKam! I'd like to place an order:\n${items.map(x=>`• ${x.p.name} (${x.p.unit}) × ${x.qty} = ${rupees(x.p.price*x.qty)}`).join("\n")}\nEstimated item total: ${rupees(total)}\nPlease confirm availability, delivery/pickup, and final amount.`;
  window.open(`https://wa.me/${config.whatsappNumber||"919999999999"}?text=${encodeURIComponent(message)}`,"_blank","noopener");
});
document.getElementById("clearCart").addEventListener("click",()=>{cart.clear();renderCart()});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("contactWhatsApp").href=`https://wa.me/${config.whatsappNumber||"919999999999"}?text=${encodeURIComponent("Vanakkam KrishnaKam! I'd like to know more about your products.")}`;
document.getElementById("footerAddress").textContent=config.address||"Coimbatore, Tamil Nadu";
document.getElementById("footerPhone").textContent=config.phoneDisplay||"Please update phone configuration";
document.getElementById("dismissCookie").addEventListener("click",()=>document.getElementById("cookieNotice").classList.add("hidden"));
renderProducts();renderCart();
