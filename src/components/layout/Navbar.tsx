import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      toast({
        description: "Digite algo para pesquisar",
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 transition-shadow duration-200 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-hr-blue">
          <img src="data:image/jpeg;base64,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" alt="Logo RH" style={{ height: 32, width: 32, objectFit: 'contain' }} />
          Portal RH
        </Link>
      </div>

      <div className="hidden md:flex items-center max-w-md w-full relative">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar documentos..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="hidden md:flex">
          <Link to="/documents">Todos os Documentos</Link>
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => navigate("/search")}>
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
