import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Gauge, Recycle, Sparkles, TrendingUp, Wallet } from 'lucide-react';
import { FinzenLogo } from '@/components/finzen/icons';

const features = [
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: 'ZenCast™️ Predictive Finance',
    description: 'Forecast your account balance and cash flow, so you\'re always prepared.',
  },
  {
    icon: <Wallet className="h-8 w-8 text-primary" />,
    title: 'Proactive Tax Forecasting',
    description: 'Project your tax liability and get a personalized plan to maximize savings.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'Smart Nudge System',
    description: 'Receive gentle, intelligent nudges to build powerful financial habits.',
  },
  {
    icon: <Recycle className="h-8 w-8 text-primary" />,
    title: 'Ripple Effect Analysis',
    description: 'Simulate financial decisions and see their impact on your long-term goals.',
  },
  {
    icon: <Gauge className="h-8 w-8 text-primary" />,
    title: 'Credit Score Maximizer',
    description: 'Get actionable advice to improve your credit score and unlock better rates.',
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'Gamified Milestones',
    description: 'Achieve your financial goals through personalized challenges and rewards.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FinzenLogo className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">Finzen</span>
          </Link>
          <Button asChild variant="ghost">
            <Link href="/onboarding">Sign In</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="text-center py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Achieve Financial Zen
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Your Money, Mastered. 🧘‍♂️ Finzen is your intelligent AI companion to cut through the noise and bring effortless control to your financial life.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/onboarding">
                  Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">From Reactive to Predictive</h2>
              <p className="mt-3 max-w-2xl mx-auto text-md text-muted-foreground">
                While other apps tell you what you've spent, Finzen tells you where you're going. We don't just answer your questions; we anticipate your needs.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <CardTitle className="font-headline">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Finzen. A project for the bold.</p>
        </div>
      </footer>
    </div>
  );
}
