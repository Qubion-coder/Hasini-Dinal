import React, { useState, useEffect } from "react";
import { Link as LinkIcon, Copy } from "lucide-react";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("Mr. & Mrs.");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const generateLink = () => {
    const fullName = prefix === "None" ? name : `${prefix} ${name}`;
    const urlSafeName = fullName.trim().replace(/\s+/g, "_");
    const link = `${baseUrl}?to=${encodeURIComponent(urlSafeName)}`;
    setGeneratedLink(link);
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const copyLinkOnly = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getMessageText = () => {
    let greeting = `Dear ${name}`;
    if (prefix !== "None" && prefix !== "Dear") {
      greeting = `Dear ${prefix} ${name}`;
    }

    return `${greeting} ❤️\n\nWith joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.\n\nPlease view our wedding invitation and all the event details through the link below 🌐:\n\n${generatedLink}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Hasini & Dinal`;
  };

  const copyFullMessage = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(getMessageText());
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center font-montserrat p-4">
      <div className="max-w-xl w-full bg-[#fbf5e6] border border-[#e3c77d] rounded-3xl shadow-[0_20px_50px_rgba(59,35,20,0.05)] p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-[#3b2314] uppercase tracking-widest mb-2">
            Admin Panel
          </h1>
          <p className="text-[#5c3a1e] text-xs uppercase tracking-widest font-bold">
            Wedding Invitation Link Generator
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-bold text-[#3b2314] uppercase tracking-widest mb-2 block">
              Prefix
            </label>
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full bg-transparent border-b-2 border-[#e3c77d] py-3 text-[#3b2314] focus:outline-none focus:border-[#d4af37] transition-all font-serif text-lg italic"
            >
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Miss</option>
              <option>Mr. & Mrs.</option>
              <option>Family</option>
              <option>Dear</option>
              <option>None</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#3b2314] uppercase tracking-widest mb-2 block mt-6">
              Guest Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tharushi"
              className="w-full bg-transparent border-b-2 border-[#e3c77d] py-3 text-[#3b2314] focus:outline-none focus:border-[#d4af37] transition-all font-serif text-lg italic placeholder:text-[#b8860b]"
            />
          </div>

          <div className="pt-8">
            <button
              onClick={generateLink}
              disabled={!name.trim()}
              className="w-full bg-[#3b2314] text-white py-4 rounded-xl font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-[#5c3a1e] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            >
              Generate Link
            </button>
          </div>

          {generatedLink && (
            <div className="mt-8 p-6 bg-white rounded-2xl border border-[#ead7a8] animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-[10px] font-bold text-[#3b2314] uppercase tracking-widest mb-3">
                Generated Link:
              </p>
              <p className="text-sm text-[#5c3a1e] break-all font-mono mb-6 bg-[#fbf5e6] p-3 rounded-lg border border-[#ead7a8]">
                {generatedLink}
              </p>
              
              <p className="text-[10px] font-bold text-[#3b2314] uppercase tracking-widest mt-6 mb-3">
                Generated Message:
              </p>
              <pre className="text-sm text-[#5c3a1e] whitespace-pre-wrap font-sans mb-6 bg-[#fbf5e6] p-4 rounded-lg border border-[#ead7a8] leading-relaxed shadow-inner">
                {getMessageText()}
              </pre>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={copyLinkOnly}
                  className="flex-1 bg-white border border-[#d4af37] text-[#3b2314] py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-[#fbf5e6] transition-all flex items-center justify-center gap-2"
                >
                  <LinkIcon size={14} /> {copiedLink ? "Copied!" : "Copy Link Only"}
                </button>
                <button
                  onClick={copyFullMessage}
                  className="flex-1 bg-[#3b2314] text-white py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-[#5c3a1e] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Copy size={14} /> {copiedMessage ? "Copied!" : "Copy Full Message"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
