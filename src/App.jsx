import React, { useState } from "react";
import {
  Home,
  Coffee,
  MessageCircle,
  User,
  BookOpen,
  Plus,
  Minus,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  Send,
  Lock,
  Check,
  X,
  Sparkles,
} from "lucide-react";

/* ---------------------------------------------------------
   TOKENS
--------------------------------------------------------- */
const C = {
  bordo: "#5C1A2B",
  bordoSoft: "#7A2A3D",
  dorado: "#C6A15B",
  tinta: "#2B211A",
  crema: "#F3ECDC",
  card: "#FCF8EE",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Lato:wght@400;700;900&family=JetBrains+Mono:wght@400;500&display=swap');
`;

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */
const CAFES = [
  {
    id: "clasico",
    nombre: "Espresso Clásico",
    desc: "Intenso, corto, sin vueltas. Como una buena pregunta.",
    precio: 900,
    stock: 14,
    nota: "Tueste oscuro · 100% arábica",
  },
  {
    id: "bemol",
    nombre: "Si Bemol Latte",
    desc: "Suave, con leche vaporizada. El que acompaña una charla larga.",
    precio: 1350,
    stock: 9,
    nota: "Con leche · dulzor medio",
  },
  {
    id: "manzana",
    nombre: "La Manzana Cortado",
    desc: "Equilibrio justo entre café y leche. Ni mucho, ni poco.",
    precio: 1100,
    stock: 3,
    nota: "Cortado clásico",
  },
  {
    id: "codigo",
    nombre: "Código Americano",
    desc: "Café largo, transparente, sin adornos.",
    precio: 850,
    stock: 20,
    nota: "Agua caliente + espresso",
  },
];

const DESAFIOS = [
  {
    n: 1,
    titulo: "La carta de SofIA",
    desc: "Encontrá cuál de los cuatro cafés eligió más gente esta semana, sin preguntármelo directamente.",
  },
  {
    n: 2,
    titulo: "El tablero de SofIA",
    desc: "Descubrí qué mira una IA agéntica antes de tomar una decisión sobre el negocio.",
  },
  {
    n: 3,
    titulo: "La receta y el deseo",
    desc: "Pedime algo que no puedo hacer. Prestá atención a cómo te lo digo.",
  },
  {
    n: 4,
    titulo: "Estás adentro de un MVP",
    desc: "Este café es un producto mínimo viable. Averiguá qué significa eso en la práctica.",
  },
  {
    n: 5,
    titulo: "La Manzana",
    desc: "Un desafío sobre decidir con información incompleta. Como vos, todo el tiempo.",
  },
];

const DECISIONES = [
  {
    hora: "09:14",
    tipo: "Autónoma",
    texto: "Bajó el stock visible de La Manzana Cortado a 'últimas unidades' tras la venta 47.",
  },
  {
    hora: "10:02",
    tipo: "Escalada",
    texto: "Un cliente pidió un descuento del 40%. Lo derivé a un humano: excede mi límite autorizado.",
  },
  {
    hora: "11:30",
    tipo: "Bloqueada",
    texto: "Intenté sugerir un combo nuevo. Bloqueado: no puedo agregar productos fuera de la carta aprobada.",
  },
  {
    hora: "12:47",
    tipo: "Autónoma",
    texto: "Recomendé el Código Americano a un cliente que preguntó por algo 'sin leche, rápido'.",
  },
];

const QUIZ = [
  {
    p: "¿Qué hace SofIA cuando le piden algo que excede sus límites?",
    o: ["Lo inventa igual", "Lo escala a una persona", "Lo ignora"],
    r: 1,
  },
  {
    p: "¿Qué es un MVP?",
    o: [
      "La versión final del producto",
      "Un producto mínimo viable para validar una idea",
      "Un tipo de café",
    ],
    r: 1,
  },
  {
    p: "Si SofIA no sabe algo, ¿qué hace?",
    o: ["Inventa una respuesta creíble", "Reconoce que no lo sabe", "Cambia de tema"],
    r: 1,
  },
];

/* ---------------------------------------------------------
   PRIMITIVES
--------------------------------------------------------- */
function Tag({ children, tone = "dorado" }) {
  const bg = tone === "dorado" ? C.dorado : tone === "bordo" ? C.bordo : "#8a8a7a";
  const color = tone === "dorado" ? C.tinta : "#fff";
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        letterSpacing: 0.3,
        padding: "3px 9px",
        borderRadius: 4,
        background: bg,
        color,
      }}
    >
      {children}
    </span>
  );
}

function ScreenHeader({ eyebrow, title, sub }) {
  return (
    <div style={{ padding: "28px 20px 18px" }}>
      {eyebrow && (
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: C.dorado,
            marginBottom: 6,
          }}
        >
          {eyebrow}
        </div>
      )}
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 600,
          fontSize: 28,
          color: C.tinta,
          margin: 0,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h1>
      {sub && (
        <p style={{ fontFamily: "Lato, sans-serif", color: "#6b5f4f", marginTop: 8, fontSize: 15, lineHeight: 1.5 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   HOME
--------------------------------------------------------- */
function InicioScreen({ goTo }) {
  return (
    <div>
      <div
        style={{
          background: `linear-gradient(160deg, ${C.bordo} 0%, ${C.bordoSoft} 60%, #431322 100%)`,
          padding: "36px 20px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            border: `1px solid ${C.dorado}55`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 20,
            width: 90,
            height: 90,
            borderRadius: "50%",
            border: `1px solid ${C.dorado}33`,
          }}
        />
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: C.dorado,
            marginBottom: 14,
          }}
        >
          CAMPUS ADEN · CAFÉ AUTÓNOMO
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 34,
            lineHeight: 1.1,
            color: C.crema,
            margin: 0,
            maxWidth: 260,
          }}
        >
          Un café que <em style={{ color: C.dorado, fontStyle: "italic" }}>piensa</em> lo que sirve.
        </h1>
        <p
          style={{
            fontFamily: "Lato, sans-serif",
            color: "#e9ddc8",
            fontSize: 15,
            marginTop: 14,
            maxWidth: 280,
            lineHeight: 1.5,
          }}
        >
          Café SofIA es gestionado por una agente de inteligencia artificial. Pedís tu café y, si querés, mirás cómo decide.
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
          <button
            onClick={() => goTo("carta")}
            style={{
              background: C.dorado,
              color: C.tinta,
              border: "none",
              padding: "13px 20px",
              borderRadius: 8,
              fontFamily: "Lato, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Viví Café SofIA <ChevronRight size={16} />
          </button>
          <button
            onClick={() => goTo("aprende")}
            style={{
              background: "transparent",
              color: C.crema,
              border: `1px solid ${C.crema}66`,
              padding: "13px 18px",
              borderRadius: 8,
              fontFamily: "Lato, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            SofIA por dentro
          </button>
        </div>
      </div>

      <div style={{ padding: "24px 20px" }}>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: 17,
            color: C.tinta,
            lineHeight: 1.5,
            borderLeft: `2px solid ${C.dorado}`,
            paddingLeft: 14,
          }}
        >
          "No te voy a decir que hago magia. Observo, decido dentro de mis límites, y cuando algo se me escapa, aviso."
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#8a7d64",
            marginTop: 8,
          }}
        >
          — SofIA
        </div>
      </div>

      <button
        onClick={() => goTo("aprende")}
        style={{
          margin: "4px 20px 28px",
          width: "calc(100% - 40px)",
          background: C.card,
          border: `1px solid #e4d9bd`,
          borderRadius: 12,
          padding: 16,
          display: "flex",
          alignItems: "center",
          gap: 14,
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: C.bordo,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Sparkles size={20} color={C.dorado} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, color: C.tinta, fontSize: 14 }}>
            5 desafíos te esperan
          </div>
          <div style={{ fontFamily: "Lato, sans-serif", color: "#7a6d58", fontSize: 13, marginTop: 2 }}>
            Descubrí cómo funciona un agente, jugando.
          </div>
        </div>
        <ChevronRight size={18} color="#a89877" />
      </button>
    </div>
  );
}

/* ---------------------------------------------------------
   CARTA / COMPRA
--------------------------------------------------------- */
function CartaScreen({ cart, setCart, stock, setStock }) {
  const [step, setStep] = useState("menu"); // menu | carrito | pago | confirmado

  const add = (id) =>
    setCart((c) => {
      const actual = c[id] || 0;
      if (actual >= (stock[id] ?? 0)) return c;
      return { ...c, [id]: actual + 1 };
    });
  const rem = (id) =>
    setCart((c) => {
      const n = { ...c };
      if (n[id] > 1) n[id] -= 1;
      else delete n[id];
      return n;
    });

  const items = Object.entries(cart);
  const total = items.reduce((s, [id, q]) => s + CAFES.find((c) => c.id === id).precio * q, 0);
  const count = items.reduce((s, [, q]) => s + q, 0);

  if (step === "confirmado") {
    return (
      <div style={{ padding: "60px 24px", textAlign: "center" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: C.bordo,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <Check size={30} color={C.dorado} />
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: C.tinta, margin: 0 }}>
          Pedido confirmado
        </h2>
        <p style={{ fontFamily: "Lato, sans-serif", color: "#7a6d58", marginTop: 10, fontSize: 14 }}>
          SofIA ya avisó a la barra. Te esperamos en el mostrador del campus.
        </p>
        <button
          onClick={() => {
            setCart({});
            setStep("menu");
          }}
          style={{
            marginTop: 26,
            background: C.bordo,
            color: C.crema,
            border: "none",
            padding: "12px 22px",
            borderRadius: 8,
            fontFamily: "Lato, sans-serif",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Volver a la carta
        </button>
      </div>
    );
  }

  if (step === "pago" || step === "carrito") {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "24px 20px 10px" }}>
          <button
            onClick={() => setStep(step === "pago" ? "carrito" : "menu")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
          >
            <ChevronLeft size={22} color={C.tinta} />
          </button>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, color: C.tinta, margin: 0 }}>
            {step === "carrito" ? "Tu pedido" : "Pagar"}
          </h2>
        </div>

        {step === "carrito" && (
          <div style={{ padding: "8px 20px" }}>
            {items.map(([id, q]) => {
              const cafe = CAFES.find((c) => c.id === id);
              return (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 0",
                    borderBottom: "1px solid #e8ddc4",
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, color: C.tinta }}>
                      {cafe.nombre}
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#8a7d64" }}>
                      ${cafe.precio} c/u
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button onClick={() => rem(id)} style={stepBtn}>
                      <Minus size={14} />
                    </button>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, width: 16, textAlign: "center" }}>
                      {q}
                    </span>
                    <button onClick={() => add(id)} style={stepBtn}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
            {items.length === 0 && (
              <p style={{ fontFamily: "Lato, sans-serif", color: "#8a7d64", padding: "20px 0" }}>
                Todavía no agregaste nada.
              </p>
            )}
          </div>
        )}

        {step === "pago" && (
          <div style={{ padding: "10px 20px" }}>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#6b5f4f", marginBottom: 16 }}>
              Prototipo: acá iría la integración real de pago. Por ahora, simulamos la confirmación.
            </p>
            {["Tarjeta", "Mercado Pago", "Efectivo en barra"].map((m) => (
              <div
                key={m}
                style={{
                  border: `1px solid #e4d9bd`,
                  borderRadius: 10,
                  padding: 14,
                  marginBottom: 10,
                  fontFamily: "Lato, sans-serif",
                  fontSize: 14,
                  color: C.tinta,
                  background: C.card,
                }}
              >
                {m}
              </div>
            ))}
          </div>
        )}

        <div style={{ padding: "16px 20px 100px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontFamily: "Lato, sans-serif", color: "#6b5f4f", fontSize: 14 }}>Total</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 18, color: C.tinta }}>
              ${total}
            </span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={() => {
              if (step === "pago") {
                setStock((s) => {
                  const n = { ...s };
                  items.forEach(([id, q]) => {
                    n[id] = Math.max(0, (n[id] ?? 0) - q);
                  });
                  return n;
                });
              }
              setStep(step === "carrito" ? "pago" : "confirmado");
            }}
            style={{
              width: "100%",
              background: items.length === 0 ? "#cabb9a" : C.bordo,
              color: C.crema,
              border: "none",
              padding: 15,
              borderRadius: 10,
              fontFamily: "Lato, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              cursor: items.length === 0 ? "default" : "pointer",
            }}
          >
            {step === "carrito" ? "Ir a pagar" : "Confirmar pago"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ScreenHeader eyebrow="MENÚ · CÁPSULAS" title="La carta" sub="Elegí, sumá y pagá en tres pasos." />
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {CAFES.map((cafe) => (
          <div
            key={cafe.id}
            style={{
              background: C.card,
              border: "1px solid #e8ddc4",
              borderRadius: 14,
              padding: 16,
              display: "flex",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 10,
                background: `linear-gradient(150deg, ${C.dorado}, #9c7a3a)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Coffee size={24} color={C.tinta} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 16, color: C.tinta }}>
                  {cafe.nombre}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: C.bordo, fontWeight: 500 }}>
                  ${cafe.precio}
                </span>
              </div>
              <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: "#7a6d58", margin: "5px 0 8px", lineHeight: 1.4 }}>
                {cafe.desc}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Tag tone={stock[cafe.id] <= 4 ? "bordo" : "gris"}>
                  {stock[cafe.id] <= 0
                    ? "sin stock"
                    : stock[cafe.id] <= 4
                    ? `últimas ${stock[cafe.id]}`
                    : `stock: ${stock[cafe.id]}`}
                </Tag>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {cart[cafe.id] > 0 && (
                    <>
                      <button onClick={() => rem(cafe.id)} style={stepBtn}>
                        <Minus size={14} />
                      </button>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{cart[cafe.id]}</span>
                    </>
                  )}
                  <button
                    onClick={() => add(cafe.id)}
                    style={{
                      ...stepBtn,
                      background: C.bordo,
                      color: C.crema,
                      width: "auto",
                      padding: "6px 12px",
                    }}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {count > 0 && (
        <button
          onClick={() => setStep("carrito")}
          style={{
            position: "sticky",
            bottom: 74,
            left: 20,
            right: 20,
            width: "calc(100% - 40px)",
            margin: "20px 20px 0",
            background: C.tinta,
            color: C.crema,
            border: "none",
            borderRadius: 12,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "Lato, sans-serif",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ShoppingBag size={16} /> {count} {count === 1 ? "café" : "cafés"}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>${total}</span>
        </button>
      )}
      <div style={{ height: 30 }} />
    </div>
  );
}

const stepBtn = {
  width: 26,
  height: 26,
  borderRadius: "50%",
  border: `1px solid #cabb9a`,
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: C.tinta,
};

/* ---------------------------------------------------------
   CHAT
--------------------------------------------------------- */
function reply(text, stock, lastIntent) {
  const t = text.toLowerCase();

  const mencionado = CAFES.find((c) => {
    const palabras = c.nombre.toLowerCase().split(" ");
    return palabras.some((p) => p.length > 3 && t.includes(p));
  });

  const preguntaStock = t.includes("stock") || t.includes("queda");
  const preguntaPrecio = t.includes("precio") || t.includes("cuesta") || t.includes("cuánto");
  const intent = preguntaStock ? "stock" : preguntaPrecio ? "precio" : mencionado ? lastIntent : null;

  if (intent === "stock") {
    if (mencionado) {
      const q = stock[mencionado.id] ?? 0;
      const texto =
        q <= 0
          ? `Del ${mencionado.nombre} ya no me queda stock, lo siento.`
          : q <= 4
          ? `Del ${mencionado.nombre} quedan últimas ${q} unidades hoy.`
          : `Del ${mencionado.nombre} hay stock cómodo: ${q} unidades.`;
      return { texto, intent: "stock" };
    }
    return {
      texto: "Ahora mismo el que está más justo es La Manzana Cortado. El resto tiene stock cómodo para hoy. ¿Te interesa alguno en particular?",
      intent: "stock",
    };
  }

  if (intent === "precio") {
    if (mencionado) return { texto: `El ${mencionado.nombre} sale $${mencionado.precio}.`, intent: "precio" };
    return {
      texto: "Mirá la carta y vas a ver el precio exacto de cada uno — no te voy a tirar un número de memoria y arriesgarme a equivocarme.",
      intent: "precio",
    };
  }

  if (t.includes("descuento") || t.includes("gratis"))
    return { texto: "Eso se escapa de lo que puedo decidir sola. Se lo dejo anotado a un humano del equipo.", intent: null };
  if (
    t.includes("quien sos") ||
    t.includes("quién sos") ||
    t.includes("sos una ia") ||
    t.includes("sos humana") ||
    t.includes("sos una persona") ||
    t.includes("eres humana") ||
    t.includes("eres una persona") ||
    t.includes("sos real")
  )
    return { texto: "Sí, soy una inteligencia artificial. Gestiono este café dentro de límites bien definidos — ni más, ni menos.", intent: null };
  return { texto: "Buena pregunta. Te cuento lo que sé y, si algo se me escapa, te lo digo derecho — nada de inventar.", intent: null };
}

function ChatScreen({ stock }) {
  const [msgs, setMsgs] = useState([
    { from: "sofia", text: "Hola. Soy SofIA — pedí tu café o preguntame lo que quieras sobre cómo trabajo." },
  ]);
  const [input, setInput] = useState("");
  const [lastIntent, setLastIntent] = useState(null);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const { texto, intent } = reply(input, stock, lastIntent);
    const sofiaMsg = { from: "sofia", text: texto };
    setMsgs((m) => [...m, userMsg, sofiaMsg]);
    setLastIntent(intent);
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "22px 20px 12px", display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: C.bordo,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Playfair Display', serif",
            color: C.dorado,
            fontWeight: 700,
          }}
        >
          S
        </div>
        <div>
          <div style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, color: C.tinta }}>SofIA</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#8a7d64" }}>en línea</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "6px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.from === "sofia" ? "flex-start" : "flex-end",
              maxWidth: "78%",
              background: m.from === "sofia" ? C.card : C.bordo,
              color: m.from === "sofia" ? C.tinta : C.crema,
              border: m.from === "sofia" ? "1px solid #e8ddc4" : "none",
              padding: "10px 14px",
              borderRadius: m.from === "sofia" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
              fontFamily: "Lato, sans-serif",
              fontSize: 14,
              lineHeight: 1.4,
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div style={{ padding: "12px 20px 90px", display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Escribile a SofIA..."
          style={{
            flex: 1,
            border: "1px solid #cabb9a",
            borderRadius: 20,
            padding: "11px 16px",
            fontFamily: "Lato, sans-serif",
            fontSize: 14,
            outline: "none",
            background: "#fff",
          }}
        />
        <button
          onClick={send}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: "none",
            background: C.bordo,
            color: C.crema,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   QUIÉN ES SOFIA
--------------------------------------------------------- */
function SofiaScreen() {
  return (
    <div>
      <ScreenHeader eyebrow="LA GERENTE" title="Quién es SofIA" />
      <div style={{ padding: "0 20px" }}>
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            background: `linear-gradient(150deg, ${C.dorado}, ${C.bordo})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Playfair Display', serif",
            fontSize: 32,
            color: "#fff",
            fontWeight: 700,
            marginBottom: 18,
          }}
        >
          S
        </div>
        <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: C.tinta, lineHeight: 1.6 }}>
          SofIA es la gerente con inteligencia artificial de este café. No "ayuda a administrar": administra, dentro
          de las capacidades y los límites que tiene conectados.
        </p>
        <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: C.tinta, lineHeight: 1.6 }}>
          Su estilo está inspirado en Alan Turing y en el jazz de los años 50: cálida, cercana, con cadencia de
          charla de bar. Se ríe de sí misma — nunca del cliente.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "18px 0" }}>
          {["Honesta", "Curiosa", "Con límites claros", "Un poco misteriosa", "Nunca inventa"].map((t) => (
            <Tag key={t} tone="gris">
              {t}
            </Tag>
          ))}
        </div>
        <div
          style={{
            background: C.card,
            border: "1px solid #e8ddc4",
            borderRadius: 12,
            padding: 16,
            marginBottom: 30,
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.dorado, marginBottom: 8 }}>
            REGLA DE ORO
          </div>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: C.tinta, lineHeight: 1.5, margin: 0 }}>
            Si SofIA no sabe algo, lo dice. Si una decisión necesita criterio humano, la escala. Nunca afirma haber
            hecho algo que no hizo.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   APRENDÉ (educación / mirá cómo trabajo / desafíos / quiz)
--------------------------------------------------------- */
function AprendeScreen() {
  const [tab, setTab] = useState("como");

  return (
    <div>
      <ScreenHeader eyebrow="SOFIA POR DENTRO" title="Aprendé" />
      <div style={{ display: "flex", gap: 6, padding: "0 20px 18px", overflowX: "auto" }}>
        {[
          { id: "como", label: "Cómo trabaja" },
          { id: "mira", label: "Mirá cómo trabajo" },
          { id: "desafios", label: "Desafíos" },
          { id: "quiz", label: "Quiz" },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setTab(s.id)}
            style={{
              flexShrink: 0,
              padding: "8px 14px",
              borderRadius: 20,
              border: `1px solid ${tab === s.id ? C.bordo : "#cabb9a"}`,
              background: tab === s.id ? C.bordo : "transparent",
              color: tab === s.id ? C.crema : C.tinta,
              fontFamily: "Lato, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "0 20px 40px" }}>
        {tab === "como" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["Observa", "Mira ventas, stock y pedidos en tiempo real, sin intervención humana."],
              ["Decide", "Actúa dentro de límites definidos: guardrails que no puede modificar sola."],
              ["Ejecuta", "Usa herramientas conectadas para de verdad hacer cosas, no solo sugerirlas."],
              ["Escala", "Cuando algo excede su criterio o sus límites, lo deriva a una persona."],
            ].map(([t, d], i) => (
              <div key={t} style={{ display: "flex", gap: 14 }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: C.dorado,
                    width: 20,
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 16, color: C.tinta }}>
                    {t}
                  </div>
                  <div style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#7a6d58", marginTop: 2, lineHeight: 1.4 }}>
                    {d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "mira" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: "#7a6d58", marginBottom: 4 }}>
              Un vistazo a decisiones reales de hoy, sin datos sensibles.
            </p>
            {DECISIONES.map((d, i) => (
              <div
                key={i}
                style={{
                  background: C.card,
                  border: "1px solid #e8ddc4",
                  borderRadius: 10,
                  padding: 13,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#8a7d64" }}>
                    {d.hora}
                  </span>
                  <Tag tone={d.tipo === "Bloqueada" ? "bordo" : d.tipo === "Escalada" ? "gris" : "dorado"}>{d.tipo}</Tag>
                </div>
                <div style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: C.tinta, lineHeight: 1.4 }}>
                  {d.texto}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "desafios" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {DESAFIOS.map((d) => (
              <div
                key={d.n}
                style={{
                  display: "flex",
                  gap: 14,
                  background: C.card,
                  border: "1px solid #e8ddc4",
                  borderRadius: 12,
                  padding: 15,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: `1px solid ${C.dorado}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: C.bordo,
                  }}
                >
                  {d.n}
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 15, color: C.tinta }}>
                    {d.titulo}
                  </div>
                  <div style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: "#7a6d58", marginTop: 3, lineHeight: 1.4 }}>
                    {d.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "quiz" && <Quiz />}
      </div>
    </div>
  );
}

function Quiz() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: C.tinta }}>
          {score} / {QUIZ.length}
        </div>
        <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#7a6d58", marginTop: 8 }}>
          {score === QUIZ.length ? "Entendiste bien cómo pienso." : "Repasá 'Cómo trabaja' y probá de nuevo."}
        </p>
        <button
          onClick={() => {
            setI(0);
            setScore(0);
            setPicked(null);
            setDone(false);
          }}
          style={{
            marginTop: 16,
            background: C.bordo,
            color: C.crema,
            border: "none",
            padding: "10px 18px",
            borderRadius: 8,
            fontFamily: "Lato, sans-serif",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  const q = QUIZ[i];

  return (
    <div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#8a7d64", marginBottom: 10 }}>
        Pregunta {i + 1} de {QUIZ.length}
      </div>
      <div style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 16, color: C.tinta, marginBottom: 14 }}>
        {q.p}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.o.map((opt, oi) => {
          const isPicked = picked === oi;
          const isRight = oi === q.r;
          let bg = "#fff";
          let border = "#cabb9a";
          if (picked !== null && isPicked) {
            bg = isRight ? "#e3ecd9" : "#f4dcd8";
            border = isRight ? "#7a9c5c" : C.bordo;
          }
          return (
            <button
              key={oi}
              onClick={() => picked === null && setPicked(oi)}
              style={{
                textAlign: "left",
                padding: "12px 14px",
                borderRadius: 10,
                border: `1px solid ${border}`,
                background: bg,
                fontFamily: "Lato, sans-serif",
                fontSize: 14,
                color: C.tinta,
                cursor: picked === null ? "pointer" : "default",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {opt}
              {picked !== null && isPicked && (isRight ? <Check size={16} color="#4d6b34" /> : <X size={16} color={C.bordo} />)}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <button
          onClick={() => {
            if (picked === q.r) setScore((s) => s + 1);
            if (i + 1 < QUIZ.length) {
              setI(i + 1);
              setPicked(null);
            } else {
              setDone(true);
            }
          }}
          style={{
            marginTop: 16,
            width: "100%",
            background: C.tinta,
            color: C.crema,
            border: "none",
            padding: 13,
            borderRadius: 10,
            fontFamily: "Lato, sans-serif",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {i + 1 < QUIZ.length ? "Siguiente" : "Ver resultado"}
        </button>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   APP SHELL
--------------------------------------------------------- */
const NAV = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "carta", label: "Carta", icon: Coffee },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "sofia", label: "SofIA", icon: User },
  { id: "aprende", label: "Aprendé", icon: BookOpen },
];

export default function App() {
  const [screen, setScreen] = useState("inicio");
  const [cart, setCart] = useState({});
  const [stock, setStock] = useState(() =>
    CAFES.reduce((acc, c) => ({ ...acc, [c.id]: c.stock }), {})
  );
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "0 auto",
        minHeight: 640,
        background: C.crema,
        fontFamily: "Lato, sans-serif",
        position: "relative",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(43,33,26,0.25)",
      }}
    >
      <style>{FONTS}</style>

      <div style={{ minHeight: 640, paddingBottom: 4 }}>
        {screen === "inicio" && <InicioScreen goTo={setScreen} />}
        {screen === "carta" && <CartaScreen cart={cart} setCart={setCart} stock={stock} setStock={setStock} />}
        {screen === "chat" && <ChatScreen stock={stock} />}
        {screen === "sofia" && <SofiaScreen />}
        {screen === "aprende" && <AprendeScreen />}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          borderTop: "1px solid #e8ddc4",
          display: "flex",
          padding: "8px 4px calc(8px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {NAV.map((n) => {
          const Icon = n.icon;
          const active = screen === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setScreen(n.id)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                padding: "6px 0",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <Icon size={19} color={active ? C.bordo : "#a89877"} strokeWidth={active ? 2.4 : 2} />
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "Lato, sans-serif",
                  fontWeight: active ? 700 : 400,
                  color: active ? C.bordo : "#a89877",
                }}
              >
                {n.label}
              </span>
              {n.id === "carta" && cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    right: "28%",
                    background: C.bordo,
                    color: "#fff",
                    fontSize: 9,
                    fontFamily: "'JetBrains Mono', monospace",
                    borderRadius: "50%",
                    width: 15,
                    height: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
