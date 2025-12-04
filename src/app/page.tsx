import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-visual');

const Logo = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-11 w-auto', className)}
    viewBox="0 0 167 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.3333 0V44H0V0H12.3333Z"
      fill="currentColor"
    />
    <path
      d="M42.3333 0V44H30V0H42.3333Z"
      fill="currentColor"
    />
    <path
      d="M110.333 0V44H98V0H110.333Z"
      fill="currentColor"
    />
    <path
      d="M140.333 0V44H128V0H140.333Z"
      fill="currentColor"
    />
    <path
      d="M71.2053 28.5L56.5 44H43.5L62.848 23.056L44 0H57.5L71.0413 16.584L85 0H98L78.8947 23.336L98 44H85.5L71.2053 28.5Z"
      fill="currentColor"
    />
    <path
      d="M166.389 44H154.056L145.389 28.856V44H140.389V0H145.389V15.144L154.056 0H166.389L154.556 22L166.389 44Z"
      fill="currentColor"
    />
  </svg>
);


const Header = () => (
  <header className="sticky top-0 z-50 bg-foreground text-background shadow-md">
    <div className="container mx-auto flex items-center justify-between gap-4 p-4">
      <Link href="/" className="flex items-center gap-3">
        <Logo className="text-primary h-9" />
        <span className="font-headline text-lg font-semibold tracking-wider text-primary hidden sm:inline">
          LAND-LEBEN
        </span>
      </Link>
      <nav className="hidden lg:block">
        <ul className="flex gap-1 text-sm">
          <li>
            <Button variant="ghost" asChild className="hover:bg-accent/20 hover:text-primary">
              <Link href="#konzept">Konzept</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild className="hover:bg-accent/20 hover:text-primary">
              <Link href="#sortiment">Sortiment</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild className="hover:bg-accent/20 hover:text-primary">
              <Link href="#zugang">Zugang</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild className="hover:bg-accent/20 hover:text-primary">
              <Link href="#bonus">Bonusprogramm</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild className="hover:bg-accent/20 hover:text-primary">
              <Link href="#kontakt">Kontakt</Link>
            </Button>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" className="border-primary/50 text-primary-foreground/90 hover:bg-primary/20 hover:text-primary-foreground">
          <Link href="/dashboard">App Login</Link>
        </Button>
      </div>
    </div>
  </header>
);

const Footer = () => (
    <footer className="mt-12 bg-foreground py-6 text-sm text-background/70">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <span>© LAND-LEBEN – Nahversorger in Aigen am Inn</span>
        <div className="flex gap-4">
            <Link href="#" className="underline-offset-4 hover:text-background hover:underline">
            Impressum
            </Link>
            <Link href="#" className="underline-offset-4 hover:text-background hover:underline">
            Datenschutz
            </Link>
        </div>
        </div>
    </footer>
);


export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* HERO */}
        <section className="bg-gray-900 text-white rounded-xl lg:rounded-2xl p-6 sm:p-8 md:p-12 my-6 grid md:grid-cols-2 gap-8 items-center" style={{ background: 'radial-gradient(circle at top left, hsl(var(--foreground)) 0%, #000 75%)' }}>
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/70 text-xs px-3 py-1 rounded-full mb-4 text-accent-foreground">
              <span>Neu in Aigen am Inn</span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">Ihr Nahversorger – direkt vor der Haustür.</h1>
            <p className="text-base md:text-lg text-white/80 mb-6">
              LAND-LEBEN bringt Lebensmittel und Dinge des täglichen Bedarfs zurück ins Dorf –
              regional, praktisch und rund um die Uhr erreichbar.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-accent"></span> Kurze Wege statt langer Autofahrten</li>
              <li className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-accent"></span> Moderne Selbstbedienung – einfach & bargeldlos</li>
              <li className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-accent"></span> Regional, konventionell und Bio in einem Laden</li>
            </ul>
            <div className="flex items-center gap-4 flex-wrap">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
                <Link href="#kontakt">Mitmachen & informieren</Link>
              </Button>
              <span className="text-sm text-white/60">Für Anwohner, Vereine und lokale Partner</span>
            </div>
          </div>
          <div className="text-center hidden md:block">
            {heroImage ? (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={500}
                height={300}
                className="rounded-lg lg:rounded-xl shadow-2xl mx-auto object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            ) : (
              <div className="rounded-xl border border-dashed border-white/40 p-6">
                <p className="text-sm text-gray-300">Placeholder Image</p>
              </div>
            )}
            <p className="mt-4 text-sm text-white/70 opacity-90">Natürlich. Regional. Immer da.</p>
          </div>
        </section>

        {/* KONZEPT */}
        <section id="konzept" className="py-12 md:py-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-foreground/90">Warum LAND-LEBEN?</h2>
          <p className="max-w-2xl mx-auto text-center mt-4 mb-12 text-muted-foreground">
            Im ländlichen Raum wird die Versorgung mit Lebensmitteln und Dingen des täglichen Bedarfs immer schwieriger.
            Für Kleinigkeiten müssen oft lange Autofahrten unternommen werden. LAND-LEBEN setzt genau hier an und bringt den Einkauf zurück in die Region.
          </p>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card>
              <CardHeader>
                <div className="text-sm font-medium text-accent bg-accent/10 rounded-full px-3 py-1 self-start">Alltag erleichtern</div>
                <CardTitle className="text-foreground/90">Kurze Wege</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Kleine Einkäufe schnell und unkompliziert erledigen – ohne jedes Mal ins Auto steigen zu müssen.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="text-sm font-medium text-accent bg-accent/10 rounded-full px-3 py-1 self-start">Für Familien & Senioren</div>
                <CardTitle className="text-foreground/90">Mehr Lebensqualität</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Ob Familien, ältere Menschen oder alle, die wenig Zeit haben: LAND-LEBEN macht den Alltag planbarer und entspannter.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="text-sm font-medium text-accent bg-accent/10 rounded-full px-3 py-1 self-start">Für die Region</div>
                <CardTitle className="text-foreground/90">Gemeinschaft stärken</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Ein moderner Dorfladen, der Versorgung sichert und gleichzeitig Treffpunkt und kleines Highlight im Ortskern ist.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SORTIMENT */}
        <section id="sortiment" className="py-12 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground/90">Unser Sortiment</h2>
                <p className="mt-4 mb-12 text-muted-foreground">
                    LAND-LEBEN bietet alles, was Sie für den täglichen Bedarf brauchen – sorgfältig ausgewählt und
                    mit einem klaren Fokus auf regionale Produkte.
                </p>
            </div>
            <Card className="p-6 md:p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        <h3 className="font-headline text-xl font-bold mb-4 text-foreground/90">Lebensmittel & mehr</h3>
                        <p className="mb-6 text-muted-foreground">
                            Unser Sortiment setzt sich aus regionalen, konventionellen und Bio-Lebensmitteln,
                            Getränken, Drogerieartikeln und weiteren Produkten des täglichen Bedarfs zusammen.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {['Regionale Lebensmittel', 'Bio-Produkte', 'Getränke', 'Drogerie', 'Snacks & Grundnahrungsmittel'].map(item => (
                                <span key={item} className="text-xs font-medium text-secondary-foreground bg-secondary rounded-full px-3 py-1">{item}</span>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="border-l-4 border-accent pl-4">
                            <p className="font-semibold text-foreground/80">Unser Anspruch:</p>
                            <p className="text-muted-foreground">Praktisch, gut sortiert und trotzdem übersichtlich – damit Sie schnell finden, was Sie brauchen.</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Mit der Zeit soll das Angebot gemeinsam mit der Region wachsen:
                            Feedback von Kundinnen und Kunden fließt direkt in die Sortimentsgestaltung ein.
                        </p>
                    </div>
                </div>
            </Card>
        </section>

        {/* ZUGANG */}
         <section id="zugang" className="py-12 md:py-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-foreground/90">Zugang & Bezahlung</h2>
          <p className="max-w-2xl mx-auto text-center mt-4 mb-12 text-muted-foreground">
            Modern, sicher und einfach: Zugang zum Laden und Bezahlung sind komplett bargeldlos organisiert.
          </p>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card>
              <CardHeader><CardTitle className="text-foreground/90">Ladenzugang</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Der Zugang erfolgt über ein EC-Kartenlesegerät. Akzeptiert werden alle gängigen EC- und Kreditkarten sowie Apple Pay und Google Pay.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-foreground/90">Selbstbedienung</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Der Einkauf wird über ein modernes Selbstbedienungsterminal abgewickelt. Sie scannen Ihre Waren selbst – einfach, schnell und intuitiv.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-foreground/90">Bargeldlos zahlen</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Die Zahlung erfolgt vollständig bargeldlos. Das erhöht die Sicherheit und macht den Einkauf jederzeit möglich.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* BONUS */}
        <section id="bonus" className="py-12 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground/90">Bonusprogramm & Unterstützung</h2>
                 <p className="mt-4 mb-12 text-muted-foreground">
                    LAND-LEBEN soll nicht nur ein Laden sein, sondern ein Partner für die Menschen und Einrichtungen vor Ort.
                </p>
            </div>
            <Card className="p-6 md:p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        <h3 className="font-headline text-xl font-bold mb-4 text-foreground/90">Geplantes Bonusprogramm</h3>
                        <p className="text-muted-foreground">
                        In naher Zukunft ist ein Bonusprogramm für unsere Kundinnen und Kunden geplant – inklusive eigener Kundenkarte. So profitieren Stammkunden von zusätzlichen Vorteilen und Treuepunkten.
                        </p>
                    </div>
                     <div>
                        <h3 className="font-headline text-xl font-bold mb-4 text-foreground/90">Rabatte für Vereine & Einrichtungen</h3>
                        <p className="text-muted-foreground">
                        Für Vereine, Veranstaltungen, Kindergarten und Schule sind besondere Konditionen vorgesehen. Damit möchten wir lokale Aktivitäten unterstützen und die regionale Gemeinschaft weiter stärken.
                        </p>
                    </div>
                </div>
            </Card>
        </section>


        {/* KONTAKT */}
        <section id="kontakt" className="py-12 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
                 <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground/90">Kontakt & Interesse</h2>
                 <p className="mt-4 mb-12 text-muted-foreground">
                    Sie haben Fragen, möchten kooperieren oder sich als regionaler Lieferant melden?
                    Schreiben Sie uns – wir freuen uns auf den Austausch.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
                <div className="space-y-4 text-sm">
                    <h3 className="font-headline text-xl font-bold text-foreground/90">Kontaktinformationen</h3>
                    <p><strong>LAND-LEBEN Nahversorger</strong></p>
                    <p className="text-muted-foreground">Aigen am Inn<br />PLZ / Ort (wird noch ergänzt)</p>
                    <p><strong className="text-foreground/80">E-Mail:</strong> <a href="mailto:info@land-leben.shop" className="text-primary hover:underline">info@land-leben.shop</a></p>
                    <p><strong className="text-foreground/80">Telefon:</strong> (wird noch ergänzt)</p>
                    <p className="text-xs text-muted-foreground/80 pt-4">
                    Hinweis: Kontaktdaten sind Platzhalter und können nach Bedarf angepasst werden.
                    </p>
                </div>
                 <Card className="p-6">
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" placeholder="Ihr Name" />
                        </div>
                         <div>
                            <Label htmlFor="email">E-Mail</Label>
                            <Input id="email" type="email" placeholder="Ihre E-Mail-Adresse" />
                        </div>
                         <div>
                            <Label htmlFor="message">Nachricht</Label>
                            <Textarea id="message" placeholder="Wie können wir helfen?" rows={5} />
                        </div>
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Nachricht senden</Button>
                    </form>
                 </Card>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
