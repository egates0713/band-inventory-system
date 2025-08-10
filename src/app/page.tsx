'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Package, Users, Calendar, BarChart3, Download, Plus, Search, Database } from 'lucide-react'

export default function BandInventorySystem() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [inventory, setInventory] = useState<Array<{
    id: number; name: string; category: string; brand: string; model: string;
    barcode: string; condition: string; status: string; value: number;
  }>>([])
  const [students, setStudents] = useState<Array<{
    id: number; name: string; grade: string; email: string; phone: string;
  }>>([])
  const [rentals, setRentals] = useState<Array<{
    id: number; studentId: number; itemId: number; studentName: string;
    itemName: string; startDate: string; endDate: string; status: string;
  }>>([])

  const loadSampleData = () => {
    // Sample data that matches the description
    const sampleInventory = [
      { id: 1, name: 'Trumpet', category: 'Brass', brand: 'Bach', model: 'TR200', barcode: 'TR001', condition: 'Good', status: 'Available', value: 450 },
      { id: 2, name: 'Clarinet', category: 'Woodwind', brand: 'Buffet', model: 'E11', barcode: 'CL001', condition: 'Excellent', status: 'Rented', value: 320 },
      { id: 3, name: 'Snare Drum', category: 'Percussion', brand: 'Pearl', model: 'SD100', barcode: 'SD001', condition: 'Good', status: 'Available', value: 180 },
      { id: 4, name: 'Violin', category: 'String', brand: 'Stentor', model: 'Student I', barcode: 'VL001', condition: 'Fair', status: 'Need Repair', value: 120 },
      { id: 5, name: 'Flute', category: 'Woodwind', brand: 'Yamaha', model: 'YFL-222', barcode: 'FL001', condition: 'Excellent', status: 'Available', value: 280 },
      { id: 6, name: 'Trombone', category: 'Brass', brand: 'Conn', model: '88H', barcode: 'TB001', condition: 'Good', status: 'Rented', value: 520 },
      { id: 7, name: 'Timpani', category: 'Percussion', brand: 'Adams', model: 'Revolution', barcode: 'TI001', condition: 'Excellent', status: 'Available', value: 1200 },
      { id: 8, name: 'Cello', category: 'String', brand: 'Eastman', model: 'VC80', barcode: 'CE001', condition: 'Good', status: 'Rented', value: 800 }
    ]

    const sampleStudents = [
      { id: 1, name: 'Emily Johnson', grade: '10th', email: 'emily.j@school.edu', phone: '555-0101' },
      { id: 2, name: 'Marcus Chen', grade: '11th', email: 'marcus.c@school.edu', phone: '555-0102' },
      { id: 3, name: 'Sarah Williams', grade: '9th', email: 'sarah.w@school.edu', phone: '555-0103' },
      { id: 4, name: 'David Rodriguez', grade: '12th', email: 'david.r@school.edu', phone: '555-0104' },
      { id: 5, name: 'Lisa Thompson', grade: '10th', email: 'lisa.t@school.edu', phone: '555-0105' }
    ]

    const sampleRentals = [
      { id: 1, studentId: 1, itemId: 2, studentName: 'Emily Johnson', itemName: 'Clarinet', startDate: '2024-01-15', endDate: '2024-06-15', status: 'Active' },
      { id: 2, studentId: 2, itemId: 6, studentName: 'Marcus Chen', itemName: 'Trombone', startDate: '2024-01-20', endDate: '2024-06-20', status: 'Active' },
      { id: 3, studentId: 3, itemId: 8, studentName: 'Sarah Williams', itemName: 'Cello', startDate: '2024-02-01', endDate: '2024-07-01', status: 'Active' },
      { id: 4, studentId: 4, itemId: 1, studentName: 'David Rodriguez', itemName: 'Trumpet', startDate: '2023-09-01', endDate: '2023-12-15', status: 'Completed' }
    ]

    setInventory(sampleInventory)
    setStudents(sampleStudents)
    setRentals(sampleRentals)
  }

  const stats = {
    totalItems: inventory.length,
    rented: inventory.filter(item => item.status === 'Rented').length,
    available: inventory.filter(item => item.status === 'Available').length,
    needRepair: inventory.filter(item => item.status === 'Need Repair').length,
    totalValue: inventory.reduce((sum, item) => sum + item.value, 0)
  }

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-8 w-8 text-slate-700" />
            <h1 className="text-3xl font-bold text-slate-900">Band Inventory System</h1>
          </div>
          <p className="text-slate-600">Manage instruments, track rentals, and monitor your band's inventory</p>
        </div>

        {/* Top Stats Grid - 2+2 layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Demo Data Card - spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Demo Data
                </CardTitle>
                <CardDescription>Load sample data to explore the system features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-slate-600">
                    <strong>Sample data includes:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>8 musical instruments (brass, woodwind, percussion, string)</li>
                      <li>5 students with contact information</li>
                      <li>3 active rentals and 1 completed rental</li>
                      <li>Professional barcodes for all items</li>
                    </ul>
                  </div>
                  <Button onClick={loadSampleData} className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    Load Sample Data
                  </Button>
                  <div className="text-xs text-slate-500">
                    Perfect for testing barcode generation, rental tracking, and export features
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Total Items Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Items</CardTitle>
              <Package className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalItems}</div>
              <p className="text-xs text-slate-500">Instruments & Equipment</p>
            </CardContent>
          </Card>

          {/* Currently Rented Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Currently Rented</CardTitle>
              <Users className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.rented}</div>
              <p className="text-xs text-slate-500">Out with students</p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Available Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Available</CardTitle>
              <Package className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.available}</div>
              <p className="text-xs text-slate-500">Ready for rental</p>
            </CardContent>
          </Card>

          {/* Need Repair Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Need Repair</CardTitle>
              <Package className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.needRepair}</div>
              <p className="text-xs text-slate-500">Requires attention</p>
            </CardContent>
          </Card>

          {/* Total Value Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Value</CardTitle>
              <BarChart3 className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">${stats.totalValue}</div>
              <p className="text-xs text-slate-500">Current inventory value</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
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
                <Calendar className="h-4 w-4" />
                Rentals
              </TabsTrigger>
              <TabsTrigger value="barcodes" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Barcodes
              </TabsTrigger>
              <TabsTrigger value="export" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="mt-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Inventory Management</h2>
                    <p className="text-slate-600">Add and manage instruments and equipment</p>
                  </div>
                  <Button className="bg-slate-800 hover:bg-slate-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                {/* Search and Filter */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            placeholder="Search by name, brand, model, or serial number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="sm:w-48">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="brass">Brass</SelectItem>
                            <SelectItem value="woodwind">Woodwind</SelectItem>
                            <SelectItem value="percussion">Percussion</SelectItem>
                            <SelectItem value="string">String</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Inventory Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Items ({filteredInventory.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2 font-medium text-slate-600">Name</th>
                            <th className="text-left p-2 font-medium text-slate-600">Category</th>
                            <th className="text-left p-2 font-medium text-slate-600">Brand/Model</th>
                            <th className="text-left p-2 font-medium text-slate-600">Barcode</th>
                            <th className="text-left p-2 font-medium text-slate-600">Condition</th>
                            <th className="text-left p-2 font-medium text-slate-600">Status</th>
                            <th className="text-left p-2 font-medium text-slate-600">Value</th>
                            <th className="text-left p-2 font-medium text-slate-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredInventory.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="text-center py-8 text-slate-500">
                                No items found. Add your first item to get started!
                              </td>
                            </tr>
                          ) : (
                            filteredInventory.map((item) => (
                              <tr key={item.id} className="border-b hover:bg-slate-50">
                                <td className="p-2 font-medium">{item.name}</td>
                                <td className="p-2 text-slate-600">{item.category}</td>
                                <td className="p-2 text-slate-600">{item.brand} {item.model}</td>
                                <td className="p-2 font-mono text-sm">{item.barcode}</td>
                                <td className="p-2">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    item.condition === 'Excellent' ? 'bg-green-100 text-green-700' :
                                    item.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {item.condition}
                                  </span>
                                </td>
                                <td className="p-2">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    item.status === 'Available' ? 'bg-green-100 text-green-700' :
                                    item.status === 'Rented' ? 'bg-orange-100 text-orange-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td className="p-2 font-medium">${item.value}</td>
                                <td className="p-2">
                                  <Button variant="outline" size="sm">Edit</Button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students" className="mt-6">
              <div className="text-center py-12 text-slate-500">
                <h3 className="text-lg font-medium text-slate-900 mb-2">Student Management</h3>
                <p className="text-slate-500 mb-4">Manage student information and contact details</p>
                <Button className="bg-slate-800 hover:bg-slate-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="rentals" className="mt-6">
              <div className="text-center py-12 text-slate-500">
                <h3 className="text-lg font-medium text-slate-900 mb-2">Rental Management</h3>
                <p className="text-slate-500 mb-4">Track instrument rentals and returns</p>
                <Button className="bg-slate-800 hover:bg-slate-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Rental
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="barcodes" className="mt-6">
              <div className="text-center py-12 text-slate-500">
                <h3 className="text-lg font-medium text-slate-900 mb-2">Barcode Generation</h3>
                <p className="text-slate-500 mb-4">Generate and print professional barcodes</p>
                <Button className="bg-slate-800 hover:bg-slate-700">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Barcodes
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="export" className="mt-6">
              <div className="text-center py-12 text-slate-500">
                <h3 className="text-lg font-medium text-slate-900 mb-2">Export Data</h3>
                <p className="text-slate-500 mb-4">Export inventory and rental data</p>
                <Button className="bg-slate-800 hover:bg-slate-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
