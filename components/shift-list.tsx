"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Search, ArrowUpDown, Plus, Save, Trash2 } from "lucide-react"
import { useState } from "react"

const mockShifts = [
  {
    name: "First",
    fromTime: "8:00 AM",
    toTime: "8:00 PM",
    breakTime: "15"
  },
  {
    name: "Second",
    fromTime: "8:00 PM",
    toTime: "8:00 AM",
    breakTime: "15"
  }
]

export function ShiftList() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null)

  const filtered = mockShifts.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }

  const sortedData = [...filtered].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Card className="w-full">
      <CardHeader className="px-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <CardTitle className="text-xl font-semibold tracking-tight">Shift List</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Keyword"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('name')}
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('fromTime')}
              >
                From-Time
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('toTime')}
              >
                To-Time
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('breakTime')}
              >
                Break-Time
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((shift, i) => (
              <TableRow key={i} className="hover:bg-muted/50 cursor-pointer">
                <TableCell className="font-medium">{shift.name}</TableCell>
                <TableCell>{shift.fromTime}</TableCell>
                <TableCell>{shift.toTime}</TableCell>
                <TableCell>{shift.breakTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between p-6 border-t">
          <span className="text-sm text-muted-foreground">
            Showing 1 to {sortedData.length} of {sortedData.length} entries
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{page}</span>
              <Button 
                variant="outline" 
                size="icon" 
                disabled
                onClick={() => setPage(p => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <select 
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value="10"
              onChange={() => {}}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 