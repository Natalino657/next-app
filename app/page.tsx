import Link from "next/link";
import ScrollReveal from "./components/ScrollReveal";

const WHATSAPP = "+238 000 0000";
const EMAIL = "reservas@transfer-sal.cv";

export default function Home() {
  return (
    <main className="flex-1">
      <header className="navbar bg-slate-950/95 backdrop-blur text-slate-100 border-b border-slate-800 sticky top-0 z-50 relative z-50">
        <div className="container mx-auto px-4 overflow-visible">
          <div className="flex-1">
            <Link
              href="/"
              className="btn btn-ghost text-xl text-slate-100 hover:bg-white/10"
            >
              Transfer Ilha do Sal
            </Link>
          </div>
          <div className="hidden md:flex flex-none gap-2">
            <a className="btn btn-ghost text-slate-100 hover:bg-white/10" href="#servicos">
              Serviços
            </a>
            <a className="btn btn-ghost text-slate-100 hover:bg-white/10" href="#frota">
              Frota
            </a>
            <a className="btn btn-ghost text-slate-100 hover:bg-white/10" href="#feedback">
              Feedback
            </a>
            <a className="btn btn-ghost text-slate-100 hover:bg-white/10" href="#contacto">
              Contacto
            </a>
            <Link href="/reserva" className="btn btn-primary">
              Fazer reserva
            </Link>
          </div>

          <div className="md:hidden flex-none flex items-center gap-2">
            <Link href="/reserva" className="btn btn-primary btn-sm">
              Reservar
            </Link>
            {/* Dropdown menu */}
            <div className="dropdown dropdown-left">
              <div tabIndex={0} 
              role="button" 
              className="btn btn-ghost btn-sm hover:bg-white/10"
              >
                Menu
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-slate-950 text-slate-100 border border-slate-800 rounded-box p-2 shadow mt-2 z-[60] right-0 w-56 max-w-[calc(100vw-1rem)]"
              
              >
                <li>
                  <a href="#servicos">Serviços</a>
                </li>
                <li>
                  <a href="#frota">Frota</a>
                </li>
                <li>
                  <a href="#feedback">Feedback</a>
                </li>
                <li>
                  <a href="#contacto">Contacto</a>
                </li>
                <li className="mt-1">
                  <a
                    href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 pt-10 pb-24 md:py-14">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal>
            <div>
              <div className="badge badge-outline mb-4">
                Aeroporto ↔ Hotel • Ilha do Sal (Cabo Verde)
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Transfer seguro, pontual e confortável.
              </h1>
              <p className="mt-5 text-slate-200/80 text-lg">
                Reserva online em poucos segundos. Confirmamos por email e também
                podes falar connosco por WhatsApp.
              </p>
              <div className="mt-7 hidden md:flex flex-wrap gap-3">
                <Link href="/reserva" className="btn btn-primary">
                  Reservar agora
                </Link>
                <a
                  className="btn btn-outline"
                  href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </div>
              <div className="mt-8 stats stats-vertical sm:stats-horizontal shadow bg-slate-900/60 text-slate-100 border border-slate-800 overflow-visible">
                <div className="stat">
                  <div className="stat-title whitespace-normal text-slate-200/80">
                    Resposta rápida
                  </div>
                  <div className="stat-value text-2xl">24/7</div>
                  <div className="stat-desc whitespace-normal text-slate-200/70">
                    Conforme disponibilidade
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title whitespace-normal text-slate-200/80">
                    Serviços
                  </div>
                  <div className="stat-value text-2xl">Transfer</div>
                  <div className="stat-desc whitespace-normal text-slate-200/70">
                    Aeroporto, hotel e tours
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title whitespace-normal text-slate-200/80">
                    Pagamento
                  </div>
                  <div className="stat-value text-2xl">Fácil</div>
                  <div className="stat-desc whitespace-normal text-slate-200/70">
                    Combina no contacto
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:justify-self-end" delayMs={120}>
            <div className="card bg-slate-900/60 text-slate-100 shadow-xl border border-slate-800">
              <div className="card-body">
                <h2 className="card-title">Reserva rápida</h2>
                <p className="text-slate-200/80">
                  Preferes começar já? Vai direto ao formulário.
                </p>
                <div className="card-actions mt-3">
                  <Link href="/reserva" className="btn btn-primary w-full">
                    Abrir formulário de reserva
                  </Link>
                </div>
                <div className="divider" />
                <ul className="space-y-2 text-sm text-slate-200/80">
                  <li>
                    <span className="font-semibold">Inclui:</span> nome, email,
                    data, hora e local.
                  </li>
                  <li>
                    <span className="font-semibold">Confirmação:</span> por email
                    para ti e para o motorista.
                  </li>
                  <li>
                    <span className="font-semibold">Apoio:</span> WhatsApp{" "}
                    {WHATSAPP}.
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        id="servicos"
        className="bg-slate-950/40 border-y border-slate-800"
      >
        <div className="container mx-auto px-4 py-14">
          <ScrollReveal>
            <div>
              <h2 className="text-3xl font-bold">Serviços</h2>
              <p className="mt-2 text-slate-200/80">
                Escolhe o serviço e faz a tua reserva online.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            <ScrollReveal delayMs={0}>
              <div className="card bg-slate-900/60 text-slate-100 shadow border border-slate-800">
                <div className="card-body">
                  <h3 className="card-title">Aeroporto → Hotel</h3>
                  <p className="text-slate-200/80">
                    Chegada tranquila com motorista à tua espera.
                  </p>
                  <div className="card-actions">
                    <Link href="/reserva" className="btn btn-primary btn-sm">
                      Reservar
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={90}>
              <div className="card bg-slate-900/60 text-slate-100 shadow border border-slate-800">
                <div className="card-body">
                  <h3 className="card-title">Hotel → Aeroporto</h3>
                  <p className="text-slate-200/80">
                    Transfer de saída com hora marcada e pontualidade.
                  </p>
                  <div className="card-actions">
                    <Link href="/reserva" className="btn btn-primary btn-sm">
                      Reservar
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={180}>
              <div className="card bg-slate-900/60 text-slate-100 shadow border border-slate-800">
                <div className="card-body">
                  <h3 className="card-title">Tours / Viagens</h3>
                  <p className="text-slate-200/80">
                    Passeios na ilha (a combinar no formulário).
                  </p>
                  <div className="card-actions">
                    <Link href="/reserva" className="btn btn-primary btn-sm">
                      Pedir orçamento
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="frota" className="container mx-auto px-4 py-14">
        <ScrollReveal>
          <div>
            <h2 className="text-3xl font-bold">Frota e fotos</h2>
            <p className="mt-2 text-slate-200/80">
              Aqui podes colocar fotos reais dos carros e das viagens (vou deixar
              placeholders por agora).
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {["Carro confortável", "Transfer noturno", "Viagem / Tour"].map(
            (title, idx) => (
              <ScrollReveal key={title} delayMs={idx * 90}>
                <div className="card bg-slate-900/60 text-slate-100 shadow border border-slate-800">
                  <div className="card-body">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content w-12 rounded">
                        <span className="text-lg">CV</span>
                      </div>
                    </div>
                    <h3 className="card-title mt-2">{title}</h3>
                    <p className="text-slate-200/80 text-sm">
                      Troca este card por uma imagem em `public/` quando tiveres as
                      fotos.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ),
          )}
        </div>
      </section>

      <section id="feedback" className="bg-slate-950/40 border-y border-slate-800">
        <div className="container mx-auto px-4 py-14">
          <ScrollReveal>
            <div>
              <h2 className="text-3xl font-bold">Feedback de clientes</h2>
              <p className="mt-2 text-slate-200/80">
                Avaliações (exemplo). Depois podemos ligar a uma fonte real (Google,
                etc.).
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              {
                name: "Ana",
                text: "Pontual e super simpático. Recomendo!",
              },
              { name: "Miguel", text: "Carro limpo e viagem tranquila." },
              { name: "Sofia", text: "Fácil de reservar e respondeu rápido." },
            ].map((t, idx) => (
              <ScrollReveal key={t.name} delayMs={idx * 90}>
                <div className="card bg-slate-900/60 text-slate-100 shadow border border-slate-800">
                  <div className="card-body">
                    <div className="rating rating-sm">
                      <input
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked
                        readOnly
                      />
                      <input
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked
                        readOnly
                      />
                      <input
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked
                        readOnly
                      />
                      <input
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked
                        readOnly
                      />
                      <input
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked
                        readOnly
                      />
                    </div>
                    <p className="text-slate-200/80">{t.text}</p>
                    <div className="text-sm font-semibold">{t.name}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="container mx-auto px-4 py-14">
        <ScrollReveal>
          <div>
            <h2 className="text-3xl font-bold">Contacto</h2>
            <p className="mt-2 text-slate-200/80">
              Se preferires, fala connosco diretamente.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-8 grid lg:grid-cols-2 gap-5">
          <ScrollReveal delayMs={0}>
            <div className="card bg-slate-900/60 text-slate-100 shadow border border-slate-800">
              <div className="card-body">
                <h3 className="card-title">Dados</h3>
                <ul className="space-y-2 text-slate-200/80">
                  <li>
                    <span className="font-semibold">WhatsApp:</span> {WHATSAPP}
                  </li>
                  <li>
                    <span className="font-semibold">Email:</span> {EMAIL}
                  </li>
                  <li>
                    <span className="font-semibold">Local:</span> Ilha do Sal,
                    Cabo Verde
                  </li>
                </ul>
                <div className="card-actions mt-4">
                  <Link href="/reserva" className="btn btn-primary">
                    Fazer reserva
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <div className="card bg-slate-900/60 text-slate-100 shadow border border-slate-800">
              <div className="card-body">
                <h3 className="card-title">Reserva por email</h3>
                <p className="text-slate-200/80">
                  Se fizeres a reserva no site, vais receber confirmação por email
                  (e o teu tio também).
                </p>
                <div className="alert mt-4">
                  <span>
                    Falta configurar o SMTP no `.env.local` para envio de emails.
                    Vou tratar disso no código já a seguir.
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="footer footer-center p-6 bg-slate-950 text-slate-200 border-t border-slate-800">
        <aside>
          <p>
            © {new Date().getFullYear()} Transfer Ilha do Sal • Reservas Online
          </p>
        </aside>
      </footer>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            <Link href="/reserva" className="btn btn-primary w-full">
              Fazer reserva
            </Link>
            <a
              className="btn btn-outline w-full"
              href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
