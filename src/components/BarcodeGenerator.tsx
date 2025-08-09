'use client';

import { useState, useRef } from 'react';
import { useInventoryWithSync } from '@/hooks/useInventoryWithSync';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { QrCode, Printer, Search, Download } from 'lucide-react';
import JsBarcode from 'jsbarcode';

export function BarcodeGenerator() {
  const { data } = useInventoryWithSync();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const printableRef = useRef<HTMLDivElement>(null);

  const filteredItems = data.items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const generateBarcode = (text: string, elementId: string) => {
    try {
      const canvas = document.getElementById(elementId) as HTMLCanvasElement;
      if (canvas) {
        JsBarcode(canvas, text, {
          format: 'CODE128',
          width: 2,
          height: 60,
          displayValue: true,
          fontSize: 12,
          margin: 10
        });
      }
    } catch (error) {
      console.error('Error generating barcode:', error);
    }
  };

  const handlePrint = () => {
    if (selectedItems.length === 0) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const selectedItemsData = data.items.filter(item => selectedItems.includes(item.id));

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Barcodes - Band Inventory</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .barcode-page { display: flex; flex-wrap: wrap; gap: 15px; }
            .barcode-item {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: center;
              width: 250px;
              break-inside: avoid;
            }
            .barcode-item h3 { margin: 0 0 5px 0; font-size: 14px; }
            .barcode-item p { margin: 5px 0; font-size: 12px; color: #666; }
            canvas { margin: 5px 0; }
            @media print {
              .barcode-item { page-break-inside: avoid; }
            }
          </style>
          <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
        </head>
        <body>
          <div class="barcode-page">
            ${selectedItemsData.map(item => `
              <div class="barcode-item">
                <h3>${item.name}</h3>
                <canvas id="barcode-${item.id}"></canvas>
                <p>${item.barcode}</p>
                <p>${item.brand ? `${item.brand} ${item.model || ''}`.trim() : ''}</p>
                <p>Category: ${item.category}</p>
              </div>
            `).join('')}
          </div>
          <script>
            window.onload = function() {
              ${selectedItemsData.map(item => `
                JsBarcode("#barcode-${item.id}", "${item.barcode}", {
                  format: "CODE128",
                  width: 2,
                  height: 60,
                  displayValue: false,
                  margin: 5
                });
              `).join('')}
              setTimeout(() => window.print(), 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  const exportBarcodes = () => {
    if (selectedItems.length === 0) return;

    const selectedItemsData = data.items.filter(item => selectedItems.includes(item.id));
    const csvData = selectedItemsData.map(item => ({
      'Item Name': item.name,
      'Barcode': item.barcode,
      'Category': item.category,
      'Brand': item.brand || '',
      'Model': item.model || '',
      'Location': item.location || ''
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `barcodes-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Barcode Generator</h2>
          <p className="text-slate-600">Generate and print barcodes for your inventory items</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={exportBarcodes}
            disabled={selectedItems.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button
            onClick={handlePrint}
            disabled={selectedItems.length === 0}
            className="bg-slate-800 hover:bg-slate-700"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Selected ({selectedItems.length})
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search items to generate barcodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Items Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Select Items for Barcode Generation
          </CardTitle>
          <CardDescription>
            Choose items to generate printable barcodes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={filteredItems.length > 0 && selectedItems.length === filteredItems.length}
                      onCheckedChange={(checked: boolean) => handleSelectAll(checked)}
                    />
                  </TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Barcode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Preview</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked: boolean) => handleSelectItem(item.id, checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        {item.brand && item.model && (
                          <div className="text-sm text-slate-500">
                            {item.brand} {item.model}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="font-mono text-sm">{item.barcode}</TableCell>
                    <TableCell>
                      <Badge variant={item.isRented ? "destructive" : "default"}>
                        {item.isRented ? 'Rented' : 'Available'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <canvas
                        id={`preview-${item.id}`}
                        ref={(canvas) => {
                          if (canvas) {
                            generateBarcode(item.barcode, `preview-${item.id}`);
                          }
                        }}
                        style={{ maxWidth: '120px', height: '30px' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                {data.items.length === 0
                  ? 'No items in inventory. Add items first to generate barcodes.'
                  : 'No items match your search.'
                }
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Barcode Instructions</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600 space-y-2">
          <p>• <strong>Select items:</strong> Check the boxes next to items you want to print barcodes for</p>
          <p>• <strong>Print:</strong> Click "Print Selected" to open a print-friendly page with all barcodes</p>
          <p>• <strong>Format:</strong> Barcodes use CODE128 format for maximum compatibility</p>
          <p>• <strong>Labels:</strong> Each barcode includes item name, barcode number, and basic details</p>
          <p>• <strong>Scanning:</strong> Use any barcode scanner to quickly lookup items in your inventory</p>
          <p>• <strong>Export:</strong> Download a CSV file with barcode data for external label printing</p>
        </CardContent>
      </Card>

      {/* Hidden printable area */}
      <div ref={printableRef} className="hidden" />
    </div>
  );
}
