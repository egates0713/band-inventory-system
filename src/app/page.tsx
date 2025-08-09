'use client';

import { useInventoryWithSync } from '@/hooks/useInventoryWithSync';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Music,
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  QrCode,
  FileSpreadsheet,
  Cloud
} from 'lucide-react';

export default function Dashboard() {
  const {
    data,
    loading,
    getStats,
    syncStatus,
    signInToGoogle,
    signOutFromGoogle,
    manualBackup,
    manualRestore,
    loadSampleData
  } = useInventoryWithSync();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Music className="h-12 w-12 mx-auto mb-4 text-slate-600 animate-spin" />
          <p className="text-slate-600">Loading inventory system...</p>
        </div>
      </div>
    );
  }

  const stats = getStats();
  const hasAnyData = data.items.length > 0 || data.students.length > 0 || data.rentals.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Music className="h-8 w-8 text-slate-700" />
            <h1 className="text-3xl font-bold text-slate-900">Band Inventory System</h1>
            {syncStatus.isSignedIn && (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <Cloud className="h-3 w-3 mr-1" />
                Cloud Sync
              </Badge>
            )}
          </div>
          <p className="text-slate-600">Manage instruments, track rentals, and monitor your band's inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Items</CardTitle>
              <Package className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalItems}</div>
              <p className="text-xs text-slate-500">Instruments & Equipment</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Currently Rented</CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.rentedItems}</div>
              <p className="text-xs text-slate-500">Out with students</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Available</CardTitle>
              <Package className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.availableItems}</div>
              <p className="text-xs text-slate-500">Ready for rental</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                ${stats.totalValue.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500">Current inventory value</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
          <Tabs defaultValue="inventory" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-slate-100">
              <TabsTrigger value="inventory" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Inventory
              </TabsTrigger>
              <TabsTrigger value="students" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Students
              </TabsTrigger>
              <TabsTrigger value="rentals" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                Rentals
              </TabsTrigger>
              <TabsTrigger value="barcodes" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                Barcodes
              </TabsTrigger>
              <TabsTrigger value="export" className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Export
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="mt-6">
              <div className="text-center py-12 text-slate-500">
                <Package className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Inventory Management</h3>
                <p className="text-slate-500 mb-4">
                  Professional inventory tracking with barcode generation
                </p>
                <Button className="bg-slate-800 hover:bg-slate-700">
                  <Package className="h-4 w-4 mr-2" />
                  Add First Item
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="students" className="mt-6">
              <div className="text-center py-12 text-slate-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Student Management</h3>
                <p className="text-slate-500 mb-4">
                  Manage student information and contact details
                </p>
                <Button className="bg-slate-800 hover:bg-slate-700">
                  <Users className="h-4 w-4 mr-2" />
                  Add First Student
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="rentals" className="mt-6">
              <div className="text-center py-12 text-slate-500">
                <Music className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Rental Tracking</h3>
                <p className="text-slate-500 mb-4">
                  Track instrument rentals and returns
                </p>
                <Button className="bg-slate-800 hover:bg-slate-700">
                  <Music className="h-4 w-4 mr-2" />
                  Create First Rental
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="barcodes" className="mt-6">
              <div className="text-center py-12 text-slate-500">
                <QrCode className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Barcode Generation</h3>
                <p className="text-slate-500 mb-4">
                  Generate and print professional barcodes
                </p>
                <Button className="bg-slate-800 hover:bg-slate-700">
                  <QrCode className="h-4 w-4 mr-2" />
                  View Barcodes
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="export" className="mt-6">
              <div className="text-center py-12 text-slate-500">
                <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Data Export</h3>
                <p className="text-slate-500 mb-4">
                  Export data and manage cloud sync
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="bg-slate-800 hover:bg-slate-700">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" onClick={signInToGoogle}>
                    <Cloud className="h-4 w-4 mr-2" />
                    Sign in with Google
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
