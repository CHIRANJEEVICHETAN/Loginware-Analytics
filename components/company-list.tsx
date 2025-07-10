"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

const mockCompanies = [
  {
    companyName: "Loginware Softtec PVT LTD",
    address1: "123 Main St",
    address2: "Suite 101",
    city: "Bangalore",
    district: "Bangalore",
    pincode: "560001",
    contactPerson: "John Doe",
    contact1: "9876543210",
    contact2: "9876543211",
    gst: "29ABCDE1234F2Z5",
    state: "Karnataka",
    manager: "Jane Smith",
    industry: "IT Services",
    businessStart: "09:00",
    businessEnd: "18:00",
    weeklyOff: ["Sunday"]
  }
]

export function CompanyList() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filtered = mockCompanies.filter((c) =>
    c.companyName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="px-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <CardTitle className="text-xl font-semibold tracking-tight">Company List</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full overflow-auto border-t">
          <div className="min-w-[1200px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-muted/50">Company Name</TableHead>
                  <TableHead className="bg-muted/50">Address Line1</TableHead>
                  <TableHead className="bg-muted/50">Address Line2</TableHead>
                  <TableHead className="bg-muted/50">City</TableHead>
                  <TableHead className="bg-muted/50">District</TableHead>
                  <TableHead className="bg-muted/50">Pincode</TableHead>
                  <TableHead className="bg-muted/50">Contact Person</TableHead>
                  <TableHead className="bg-muted/50">Contact No. 1</TableHead>
                  <TableHead className="bg-muted/50">Contact No. 2</TableHead>
                  <TableHead className="bg-muted/50">GST No.</TableHead>
                  <TableHead className="bg-muted/50">State</TableHead>
                  <TableHead className="bg-muted/50">Manager</TableHead>
                  <TableHead className="bg-muted/50">Industry</TableHead>
                  <TableHead className="bg-muted/50">Business Start</TableHead>
                  <TableHead className="bg-muted/50">Business End</TableHead>
                  <TableHead className="bg-muted/50">Weekly-Off</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c, i) => (
                  <TableRow key={i} className="hover:bg-muted/50 cursor-pointer">
                    <TableCell className="font-medium">{c.companyName}</TableCell>
                    <TableCell>{c.address1}</TableCell>
                    <TableCell>{c.address2}</TableCell>
                    <TableCell>{c.city}</TableCell>
                    <TableCell>{c.district}</TableCell>
                    <TableCell>{c.pincode}</TableCell>
                    <TableCell>{c.contactPerson}</TableCell>
                    <TableCell>{c.contact1}</TableCell>
                    <TableCell>{c.contact2}</TableCell>
                    <TableCell>{c.gst}</TableCell>
                    <TableCell>{c.state}</TableCell>
                    <TableCell>{c.manager}</TableCell>
                    <TableCell>{c.industry}</TableCell>
                    <TableCell>{c.businessStart}</TableCell>
                    <TableCell>{c.businessEnd}</TableCell>
                    <TableCell>{c.weeklyOff.join(", ")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex items-center justify-between p-6 border-t">
          <span className="text-sm text-muted-foreground hidden sm:inline-block">
            Showing {filtered.length} of {filtered.length} entries
          </span>
          <div className="flex items-center gap-2 ml-auto">
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
        </div>
      </CardContent>
    </Card>
  )
} 