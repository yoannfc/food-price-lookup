import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Barcode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useZxing } from "react-zxing";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const { ref } = useZxing({
    onDecodeResult(result) {
      onChange(result.getText());
      setIsScanning(false);
      toast({
        title: "Barcode Scanned",
        description: `Searching for product with barcode: ${result.getText()}`,
      });
    },
    onError(error) {
      console.error("Barcode scanning error:", error);
    },
  });

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search for food items..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsScanning(true)}
          className="flex-shrink-0"
        >
          <Barcode className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={isScanning} onOpenChange={setIsScanning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan Barcode</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video">
            <video ref={ref} className="w-full h-full object-cover" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBar;