"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/phones")
      .then((r) => r.json())
      .then((data) => {
        setPhones(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleSelect = (id) => {
    setDetailsLoading(true);
    setSelectedPhone(null);
    setTimeout(() => {
      fetch(`/api/phones/${id}`)
        .then((r) => r.json())
        .then((data) => {
          setSelectedPhone(data);
          setDetailsLoading(false);
        })
        .catch(() => setDetailsLoading(false));
    }, 800);
  };

  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");

  const manufacturers = Array.from(new Set(phones.map((p) => p.manufacturer)));
  const filtered = phones.filter((p) => {
    const byQuery = p.name.toLowerCase().includes(query.toLowerCase());
    const byBrand = brand === "all" || p.manufacturer === brand;
    return byQuery && byBrand;
  });

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => {
    setPage(1);
  }, [query, brand]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mobile Marvel
            </h1>
            <p className="text-muted-foreground mt-1">Discover amazing smartphones</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="flex md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">Filters</Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] sm:w-[360px]">
                  <SheetHeader>
                    <SheetTitle>Filter phones</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    <Input placeholder="Search by name" value={query} onChange={(e) => setQuery(e.target.value)} />
                    <Select value={brand} onValueChange={setBrand}>
                      <SelectTrigger>
                        <SelectValue placeholder="Manufacturer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All brands</SelectItem>
                        {manufacturers.map((m) => (
                          <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <Card className="hidden lg:block h-fit sticky top-6 shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <Input 
                  placeholder="Search by name" 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-0 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Manufacturer</label>
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger className="border-0 bg-slate-50 dark:bg-slate-700">
                    <SelectValue placeholder="All brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All brands</SelectItem>
                    {manufacturers.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden border-0 shadow-lg">
                    <CardContent className="p-0">
                      <Skeleton className="h-48 w-full" />
                      <div className="p-4 space-y-3">
                        <Skeleton className="h-5 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {pageItems.map((p) => (
                  <Card key={p.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <div className="relative overflow-hidden">
                      <Image 
                        src={`/images/${p.imageFileName}`} 
                        alt={p.name} 
                        width={400}
                        height={192}
                        className="h-48 w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-green-600">
                        ${p.price}
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{p.name}</h3>
                        <p className="text-sm text-muted-foreground">{p.manufacturer}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleSelect(p.id)} 
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          Quick view
                        </Button>
                        <Link href={`/phones/${p.id}`} className="flex-1">
                          <Button variant="outline" className="w-full border-2 hover:bg-slate-50 dark:hover:bg-slate-700">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 py-6">
                <Button 
                  variant="outline" 
                  disabled={page === 1} 
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-6"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  disabled={page === totalPages} 
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-6"
                >
                  Next
                </Button>
              </div>
            )}

            {selectedPhone && (
              <Card className="sticky bottom-4 lg:static shadow-xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Quick Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {detailsLoading ? (
                    <div className="flex flex-col items-center gap-4">
                      <Skeleton className="h-64 w-64 rounded-lg" />
                      <div className="w-full space-y-2">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                      <div className="relative">
                        <Image
                          src={`/images/${selectedPhone.imageFileName}`}
                          alt={selectedPhone.name}
                          width={280}
                          height={280}
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                          ${selectedPhone.price}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold">{selectedPhone.name}</h2>
                          <p className="text-muted-foreground">{selectedPhone.manufacturer}</p>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                          <div>
                            <span className="text-muted-foreground block">Processor</span>
                            <span className="font-medium">{selectedPhone.processor}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Screen</span>
                            <span className="font-medium">{selectedPhone.screen}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">RAM</span>
                            <span className="font-medium">{selectedPhone.ram} GB</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Color</span>
                            <span className="font-medium capitalize">{selectedPhone.color}</span>
                          </div>
                        </div>
                        <Link href={`/phones/${selectedPhone.id}`}>
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            View Full Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
