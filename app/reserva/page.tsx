"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type ReservaForm = {
  nome: string;
  email: string;
  telefone: string;
  tipoServico: "AEROPORTO_HOTEL" | "HOTEL_AEROPORTO" | "TOUR";
  passageiros: string;
  data: string;
  hora: string;
  localPartida: string;
  localDestino: string;
  voo: string;
  mensagem: string;
};

const initial: ReservaForm = {
  nome: "",
  email: "",
  telefone: "",
  tipoServico: "AEROPORTO_HOTEL",
  passageiros: "2",
  data: "",
  hora: "",
  localPartida: "",
  localDestino: "",
  voo: "",
  mensagem: "",
};

export default function ReservaPage() {
  const [form, setForm] = useState<ReservaForm>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<
    | { kind: "ok"; mensagem: string }
    | { kind: "err"; mensagem: string }
    | null
  >(null);

  const canSubmit = useMemo(() => {
    const hasContact =
      form.email.trim().includes("@") || form.telefone.trim().length >= 6;
    return (
      form.nome.trim().length >= 2 &&
      hasContact &&
      form.data &&
      form.hora &&
      form.localPartida.trim().length >= 2 &&
      form.localDestino.trim().length >= 2
    );
  }, [form]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await res.json()) as { message?: string };
      if (!res.ok) {
        setResult({
          kind: "err",
          mensagem: payload?.message || "Não foi possível enviar a reserva.",
        });
        return;
      }

      setResult({
        kind: "ok",
        mensagem:
          payload?.message ||
          "Reserva enviada! Vais receber confirmação por email.",
      });
      setForm(initial);
    } catch {
      setResult({
        kind: "err",
        mensagem: "Erro de rede. Tenta novamente em alguns segundos.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const inputDark =
    "bg-slate-950/60 text-slate-100 border-slate-700 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none";

  return (
    <main className="flex-1">
      <header className="navbar bg-slate-950 text-slate-100 border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex-1">
            <Link
              href="/"
              className="btn btn-ghost text-xl text-slate-100 hover:bg-white/10"
            >
              Transfer Ilha do Sal
            </Link>
          </div>
          <div className="flex-none gap-2">
            <Link href="/" className="btn btn-ghost text-slate-100 hover:bg-white/10">
              Voltar
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 pt-8 pb-28 md:py-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold">Reserva</h1>
          <p className="mt-2 text-slate-200/80">
            Preenche só o essencial (30s). Confirmamos por email e/ou WhatsApp.
          </p>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6 items-start">
          <form
            onSubmit={onSubmit}
            id="__reserva_form__"
            className="card bg-slate-900/60 text-slate-100 shadow border border-slate-800 lg:col-span-2"
          >
            <div className="card-body">
              {result?.kind === "ok" ? (
                <div className="alert alert-success">
                  <span>{result.mensagem}</span>
                </div>
              ) : null}
              {result?.kind === "err" ? (
                <div className="alert alert-error">
                  <span>{result.mensagem}</span>
                </div>
              ) : null}

              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm text-slate-200/70">Passo 1</div>
                      <div className="text-lg font-semibold">Essencial</div>
                      <div className="text-sm text-slate-200/70 mt-1">
                        Nome + contacto + detalhes da viagem.
                      </div>
                    </div>
                    <div className="badge badge-outline">~30s</div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Nome</span>
                    </div>
                    <input
                      className={`input input-bordered input-lg w-full ${inputDark}`}
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      placeholder="Ex: João Silva"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Email (ou WhatsApp)</span>
                      </div>
                      <input
                        type="email"
                        className={`input input-bordered input-lg w-full ${inputDark}`}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ex: joao@gmail.com"
                        autoComplete="email"
                      />
                    </label>

                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Telefone / WhatsApp (ou email)</span>
                      </div>
                      <input
                        inputMode="tel"
                        className={`input input-bordered input-lg w-full ${inputDark}`}
                        value={form.telefone}
                        onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                        placeholder="Ex: +238 ..."
                        autoComplete="tel"
                      />
                    </label>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-4">
                    <div className="text-sm text-slate-200/70 mb-2">Serviço</div>
                    <div className="join join-vertical sm:join-horizontal w-full sm:flex">
                      <button
                        type="button"
                        className={`btn join-item w-full sm:w-auto sm:flex-1 ${
                          form.tipoServico === "AEROPORTO_HOTEL"
                            ? "btn-primary"
                            : "btn-outline"
                        }`}
                        onClick={() =>
                          setForm({ ...form, tipoServico: "AEROPORTO_HOTEL" })
                        }
                      >
                        Aeroporto → Hotel
                      </button>
                      <button
                        type="button"
                        className={`btn join-item w-full sm:w-auto sm:flex-1 ${
                          form.tipoServico === "HOTEL_AEROPORTO"
                            ? "btn-primary"
                            : "btn-outline"
                        }`}
                        onClick={() =>
                          setForm({ ...form, tipoServico: "HOTEL_AEROPORTO" })
                        }
                      >
                        Hotel → Aeroporto
                      </button>
                      <button
                        type="button"
                        className={`btn join-item w-full sm:w-auto sm:flex-1 ${
                          form.tipoServico === "TOUR" ? "btn-primary" : "btn-outline"
                        }`}
                        onClick={() => setForm({ ...form, tipoServico: "TOUR" })}
                      >
                        Tour / Viagem
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Data</span>
                      </div>
                      <input
                        type="date"
                        className={`input input-bordered input-lg w-full ${inputDark}`}
                        value={form.data}
                        onChange={(e) => setForm({ ...form, data: e.target.value })}
                        required
                      />
                    </label>

                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Hora</span>
                      </div>
                      <input
                        type="time"
                        className={`input input-bordered input-lg w-full ${inputDark}`}
                        value={form.hora}
                        onChange={(e) => setForm({ ...form, hora: e.target.value })}
                        required
                      />
                    </label>
                  </div>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Partida</span>
                    </div>
                    <input
                      className={`input input-bordered input-lg w-full ${inputDark}`}
                      value={form.localPartida}
                      onChange={(e) => setForm({ ...form, localPartida: e.target.value })}
                      placeholder="Ex: Aeroporto do Sal (SID)"
                      required
                    />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Destino</span>
                    </div>
                    <input
                      className={`input input-bordered input-lg w-full ${inputDark}`}
                      value={form.localDestino}
                      onChange={(e) => setForm({ ...form, localDestino: e.target.value })}
                      placeholder="Ex: Hotel Morabeza"
                      required
                    />
                  </label>
                </div>

                <details className="collapse collapse-arrow border border-slate-800 bg-slate-950/30">
                  <summary className="collapse-title text-base font-semibold">
                    Detalhes opcionais (se quiseres)
                  </summary>
                  <div className="collapse-content">
                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      <label className="form-control w-full">
                        <div className="label">
                          <span className="label-text">Passageiros (opcional)</span>
                        </div>
                        <input
                          inputMode="numeric"
                          className={`input input-bordered input-lg w-full ${inputDark}`}
                          value={form.passageiros}
                          onChange={(e) => setForm({ ...form, passageiros: e.target.value })}
                          placeholder="Ex: 2"
                        />
                      </label>

                      <label className="form-control w-full">
                        <div className="label">
                          <span className="label-text">Voo (opcional)</span>
                        </div>
                        <input
                          className={`input input-bordered input-lg w-full ${inputDark}`}
                          value={form.voo}
                          onChange={(e) => setForm({ ...form, voo: e.target.value })}
                          placeholder="Ex: TP1543"
                        />
                      </label>

                      <label className="form-control w-full md:col-span-2">
                        <div className="label">
                          <span className="label-text">Mensagem (opcional)</span>
                        </div>
                        <textarea
                          className={`textarea textarea-bordered w-full min-h-28 ${inputDark}`}
                          value={form.mensagem}
                          onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                          placeholder="Ex: malas grandes / cadeirinha de bebé / etc."
                        />
                      </label>
                    </div>
                  </div>
                </details>

                {!canSubmit ? (
                  <div className="text-sm text-slate-200/70">
                    Falta preencher: <span className="font-semibold">nome</span>,{" "}
                    <span className="font-semibold">contacto</span> (email ou WhatsApp),{" "}
                    <span className="font-semibold">data/hora</span> e{" "}
                    <span className="font-semibold">partida/destino</span>.
                  </div>
                ) : null}
              </div>

              <div className="card-actions mt-5 hidden md:flex">
                <button className="btn btn-primary" disabled={!canSubmit || submitting} type="submit">
                  {submitting ? "A enviar..." : "Enviar reserva"}
                </button>
                <Link className="btn btn-ghost" href="/">
                  Cancelar
                </Link>
              </div>
              <p className="text-xs text-slate-200/60 mt-3">
                Ao enviar, concordas em ser contactado para confirmar detalhes.
              </p>
            </div>
          </form>

          <aside className="card bg-slate-900/60 text-slate-100 shadow border border-slate-800">
            <div className="card-body">
              <h2 className="card-title">O que acontece depois?</h2>
              <ol className="list-decimal list-inside space-y-2 text-slate-200/80">
                <li>Recebes um email com os dados da reserva.</li>
                <li>O motorista também recebe o pedido.</li>
                <li>Se for preciso, confirmamos pelo WhatsApp.</li>
              </ol>
              <div className="divider" />
              
            </div>
          </aside>
        </div>
      </section>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <button
            className="btn btn-primary w-full"
            disabled={!canSubmit || submitting}
            type="submit"
            form="__reserva_form__"
            onClick={() => {
              const el = document.getElementById("__reserva_form__") as HTMLFormElement | null;
              el?.requestSubmit();
            }}
          >
            {submitting ? "A enviar..." : "Enviar reserva"}
          </button>
          <div className="text-xs text-slate-200/60 mt-2 text-center">
            Email ou WhatsApp é suficiente.
          </div>
        </div>
      </div>
    </main>
  );
}

