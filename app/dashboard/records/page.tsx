"use client";

import { FileText, Search, Download, Eye, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function RecordsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) return;
        const user = JSON.parse(userStr);
        
        const res = await fetch(`/api/records?providerId=${user.id}`);
        const data = await res.json();
        
        if (res.ok) {
          setRecords(data);
        }
      } catch (err) {
        console.error("Failed to fetch records", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecords();
  }, []);

  return (
    <div className="px-6 py-6 sm:px-8 lg:px-10 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-foreground">
            Clinical Records
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Access past SOAP notes, prescriptions, and patient files.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search records..."
            className="w-full h-11 rounded-full border border-border bg-card pl-11 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm text-foreground"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-semibold border-b border-border/50">
              <tr>
                <th className="px-6 py-4">Document</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-foreground">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center">
                    <Loader2 className="size-6 animate-spin mx-auto text-muted-foreground" />
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    No records found.
                  </td>
                </tr>
              ) : (
                records.map((record) => {
                  const shortId = "REC-" + record._id.substring(record._id.length - 4).toUpperCase();
                  const ptName = record.patientId ? `${record.patientId.firstName} ${record.patientId.lastName}` : "Unknown";
                  const date = new Date(record.date).toLocaleDateString();

                  return (
                    <tr key={record._id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 font-medium flex items-center gap-2">
                        <FileText className="size-4 text-muted-foreground" />
                        {record.title || shortId}
                      </td>
                      <td className="px-6 py-4">{ptName}</td>
                      <td className="px-6 py-4 text-muted-foreground">{date}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-secondary/20 border border-secondary/30 px-2 py-0.5 text-xs font-semibold text-foreground capitalize">
                          {record.type.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                        <button className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
                          <Eye className="size-4" />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
                          <Download className="size-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
