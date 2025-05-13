
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { File, Search } from "lucide-react";
import { toast } from "sonner";
import { categories, getAllDocumentsForCategory } from "@/data/categories";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Get all documents across all categories
  const allDocuments = Object.keys(categories).flatMap(getAllDocumentsForCategory);
  
  // Filter documents based on search term and category
  const filteredDocuments = allDocuments.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || 
      (doc.categoryId && doc.categoryId === categoryFilter);
    
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast(`Pesquisando por "${searchTerm}"`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todos os Documentos</h1>
      </div>
      
      <div className="section-animate">
        <Card className="mb-6">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative col-span-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar documentos por título ou descrição..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {Object.entries(categories).map(([id, category]) => (
                    <SelectItem key={id} value={id}>{category.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-4 section-animate">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <Card key={doc.id} className="card-hover">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 p-2 rounded-md">
                    <File className="h-6 w-6 text-hr-blue" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/document/${doc.id}`}>
                          <h3 className="font-medium hover:text-hr-blue transition-colors">{doc.title}</h3>
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{doc.category || "Sem categoria"}</span>
                          <span>•</span>
                          <span>Atualizado em {doc.updated}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/document/${doc.id}`}>Ver</Link>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{doc.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Nenhum documento encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
