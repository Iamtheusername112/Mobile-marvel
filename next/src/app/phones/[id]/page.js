import { Separator } from "@/components/ui/separator";
import phonesData from "@/data/phones.json" assert { type: "json" };
import Link from "next/link";
import Image from "next/image";

function getPhone(id) {
  const phoneId = parseInt(id, 10);
  return phonesData.find((phone) => phone.id === phoneId) || null;
}

export default function PhonePage({ params }) {
  const phone = getPhone(params.id);
  if (!phone) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <p className="text-center text-muted-foreground">Phone not found.</p>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-6xl p-6 space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">← Back to catalog</Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="relative">
              <Image 
                src={`/images/${phone.imageFileName}`} 
                alt={phone.name} 
                width={600}
                height={600}
                className="w-full h-auto rounded-2xl shadow-2xl bg-white p-8" 
              />
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-full text-lg font-bold">
                ${phone.price}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{phone.name}</h1>
              <p className="text-xl text-muted-foreground">{phone.manufacturer}</p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Specifications</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-muted-foreground">Processor</span>
                  <span className="font-semibold">{phone.processor}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-muted-foreground">Screen</span>
                  <span className="font-semibold">{phone.screen}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-muted-foreground">RAM</span>
                  <span className="font-semibold">{phone.ram} GB</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-muted-foreground">Color</span>
                  <span className="font-semibold capitalize">{phone.color}</span>
                </div>
              </div>
            </div>
            
            {phone.description && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{phone.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}


