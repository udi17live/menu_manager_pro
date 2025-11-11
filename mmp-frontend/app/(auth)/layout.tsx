import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0 rounded">
            <CardContent className="grid p-0 md:grid-cols-2">
              {children}
              <div className="bg-muted relative hidden md:block">
                <Image
                  fill
                  src="/auth.jpg"
                  alt="Auth"
                  className="absolute object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-black/60 rounded text-white p-3 text-sm">
                  <Link href="https://www.pexels.com/photo/white-and-brown-cooked-dish-on-white-ceramic-bowls-958545/">
                    Photo by Chan Walrus:
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
