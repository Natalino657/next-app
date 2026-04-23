import { NextResponse } from "next/server";
import { sendReservationEmails } from "@/lib/email";

type ReservaPayload = {
  nome?: unknown;
  email?: unknown;
  telefone?: unknown;
  tipoServico?: unknown;
  passageiros?: unknown;
  data?: unknown;
  hora?: unknown;
  localPartida?: unknown;
  localDestino?: unknown;
  voo?: unknown;
  mensagem?: unknown;
};

function str(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function labelServico(tipo: string) {
  if (tipo === "AEROPORTO_HOTEL") return "Aeroporto → Hotel";
  if (tipo === "HOTEL_AEROPORTO") return "Hotel → Aeroporto";
  if (tipo === "TOUR") return "Tour / Viagem";
  return "Serviço";
}

export async function POST(req: Request) {
  let body: ReservaPayload;
  try {
    body = (await req.json()) as ReservaPayload;
  } catch {
    return NextResponse.json(
      { message: "JSON inválido." },
      { status: 400 },
    );
  }

  const nome = str(body.nome);
  const email = str(body.email);
  const telefone = str(body.telefone);
  const tipoServico = str(body.tipoServico);
  const passageiros = str(body.passageiros);
  const data = str(body.data);
  const hora = str(body.hora);
  const localPartida = str(body.localPartida);
  const localDestino = str(body.localDestino);
  const voo = str(body.voo);
  const mensagem = str(body.mensagem);

  if (nome.length < 2) {
    return NextResponse.json(
      { message: "Nome inválido." },
      { status: 400 },
    );
  }
  if (!email.includes("@") || email.length < 5) {
    return NextResponse.json(
      { message: "Email inválido." },
      { status: 400 },
    );
  }
  if (!data || !hora) {
    return NextResponse.json(
      { message: "Data e hora são obrigatórios." },
      { status: 400 },
    );
  }
  if (localPartida.length < 2 || localDestino.length < 2) {
    return NextResponse.json(
      { message: "Partida e destino são obrigatórios." },
      { status: 400 },
    );
  }

  const ownerEmail = process.env.OWNER_EMAIL;
  if (!ownerEmail) {
    return NextResponse.json(
      {
        message:
          "Servidor sem configuração de email (OWNER_EMAIL). Define o .env.local.",
      },
      { status: 500 },
    );
  }

  const subject = `${labelServico(tipoServico)} • ${data} ${hora} • ${nome}`;

  const detailsRows = [
    ["Nome", nome],
    ["Email", email],
    ["Telefone", telefone || "-"],
    ["Serviço", labelServico(tipoServico)],
    ["Passageiros", passageiros || "-"],
    ["Data", data],
    ["Hora", hora],
    ["Partida", localPartida],
    ["Destino", localDestino],
    ["Voo", voo || "-"],
    ["Mensagem", mensagem || "-"],
  ];

  const rowsHtml = detailsRows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 10px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb">${esc(
          k,
        )}</td><td style="padding:8px 10px;border:1px solid #e5e7eb">${esc(
          v,
        )}</td></tr>`,
    )
    .join("");

  const baseHtml = (title: string, intro: string) => `
    <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.4;color:#111827">
      <h2 style="margin:0 0 10px">${esc(title)}</h2>
      <p style="margin:0 0 16px;color:#374151">${esc(intro)}</p>
      <table style="border-collapse:collapse;width:100%;max-width:720px">${rowsHtml}</table>
      <p style="margin:16px 0 0;color:#6b7280;font-size:12px">Mensagem automática do site.</p>
    </div>
  `;

  const customerHtml = baseHtml(
    "Confirmação de reserva — Transfer Ilha do Sal",
    "Recebemos o teu pedido. Em breve confirmamos os detalhes contigo.",
  );

  const ownerHtml = baseHtml(
    "Nova reserva recebida",
    "Chegou um novo pedido de reserva pelo site.",
  );

  try {
    await sendReservationEmails({
      toCustomer: email,
      ownerEmail,
      subject,
      customerHtml,
      ownerHtml,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Falha ao enviar email.";
    return NextResponse.json(
      { message: `Reserva recebida, mas falhou o envio de email: ${message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({
    message: "Reserva enviada! Confirmação enviada por email.",
  });
}

