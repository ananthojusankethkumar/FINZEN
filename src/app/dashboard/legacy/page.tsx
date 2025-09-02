
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartHandshake, ShieldCheck, Rocket, Users } from "lucide-react";

export default function LegacyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Finzen Legacy
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-3xl">
            Finance is a family affair. Finzen Legacy is a revolutionary, AI-powered framework for collaborative multi-generational financial planning. Create a secure "Family Circle" to manage shared goals and responsibilities without sacrificing individual privacy.
        </p>
      </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <HeartHandshake className="h-10 w-10 text-primary" />
                        <CardTitle className="font-headline text-xl">"Elder Care" AI Module</CardTitle>
                    </div>
                    <CardDescription>
                        Respectfully monitor and manage your aging parents' finances with proactive, AI-driven alerts and insights.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                    <p className="text-muted-foreground">Ensure their pension is sufficient, medical bills are paid, and they're protected from scams, all while respecting their independence.</p>
                     <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Get alerts on pension credits and expense forecasts.</li>
                        <li>Analyze medical expense trends to review insurance.</li>
                        <li>Flag unusual or suspicious transactions automatically.</li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" disabled>Coming Soon</Button>
                </CardFooter>
            </Card>

            <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Rocket className="h-10 w-10 text-primary" />
                        <CardTitle className="font-headline text-xl">"Child's Future" AI Corpus</CardTitle>
                    </div>
                    <CardDescription>
                        Optimize joint investments for your child's future goals, like higher education, with AI-powered contribution strategies.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                     <p className="text-muted-foreground">Combine financial data with your partner in a secure, privacy-first environment to make the most of your family's savings.</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Receive tax-optimal contribution strategies.</li>
                        <li>Track progress towards a unified goal from separate accounts.</li>
                        <li>Make informed decisions together, effortlessly.</li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" disabled>Coming Soon</Button>
                </CardFooter>
            </Card>

             <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="h-10 w-10 text-primary" />
                        <CardTitle className="font-headline text-xl">"Legacy" & Nomination Audit</CardTitle>
                    </div>
                    <CardDescription>
                        Ensure your financial legacy is secure. Our AI audits all linked accounts to ensure nominations are up-to-date.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                     <p className="text-muted-foreground">Avoid immense difficulty for your family later by ensuring all your financial instruments have the correct nominees listed.</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Automatically flags accounts missing a nominee.</li>
                        <li>Intelligent reminders to update critical policies.</li>
                        <li>Cross-references family details to prevent errors.</li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" disabled>Coming Soon</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
