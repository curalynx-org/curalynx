"use client";

import { X, Search, Loader2, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface StartSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StartSessionModal({ isOpen, onClose }: StartSessionModalProps) {
  const router = useRouter();
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchPatients();
    }
  }, [isOpen]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const userStr = localStorage.getItem("user");
      if (!userStr) return;
      const user = JSON.parse(userStr);
      
      const res = await fetch(`/api/patients?providerId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setPatients(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(p => 
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-xl rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300 border border-border">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h2 className="text-xl font-serif font-bold text-foreground">Start Live Session</h2>
            <p className="text-sm text-muted-foreground mt-1">Select a patient to begin AI transcription.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border/50 bg-muted/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Patient List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {loading ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              No patients found.
            </div>
          ) : (
            <div className="space-y-1">
              {filteredPatients.map(pt => (
                <button
                  key={pt._id}
                  onClick={() => router.push(`/dashboard/session/${pt._id}`)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary font-bold">
                      {pt.firstName[0]}{pt.lastName[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{pt.firstName} {pt.lastName}</h4>
                      <p className="text-[11px] text-muted-foreground">ID: PT-{pt._id.slice(-4).toUpperCase()}</p>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
