import React, { useState } from 'react'
import { Calendar, Home, Inbox, Search } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-react"
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoIosBriefcase } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdMapsHomeWork } from "react-icons/md";

export function AppSidebar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold mb-4 text-center flex justify-center text-slate-800">
            EliteRT
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3">
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate("/")}>
                  <a className="hover:cursor-pointer flex items-center gap-2">
                    <RiDashboardHorizontalFill size={10} />
                    <span className="text-lg">Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>


              <Collapsible defaultOpen>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <button className="flex items-center justify-between w-full p-2" onClick={() => setOpen(!open)}>
                      <div className="flex items-center gap-2">
                        <IoIosBriefcase size={10} />
                        <span className="text-lg">Manajemen</span>
                      </div>
                      {open ? <IoIosArrowUp size={10} /> : <IoIosArrowDown size={10} />}
                    </button>
                  </CollapsibleTrigger>
                </SidebarMenuItem>


                <CollapsibleContent>
                  <SidebarMenu className="ml-5 mt-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild onClick={() => navigate("/pembayaran")} className="hover:cursor-pointer">
                        <a className="text-base">Pembayaran Iuran</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild onClick={() => navigate("/pengeluaran")} className="hover:cursor-pointer">
                        <a className="text-base">Pengeluaran</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>


              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate("/penghuni")}>
                  <a className="hover:cursor-pointer flex items-center gap-2">
                    <FaPeopleGroup size={10} />
                    <span className="text-lg">Penghuni</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>


              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate("/perumahan")}>
                  <a className="hover:cursor-pointer flex items-center gap-2">
                    <MdMapsHomeWork size={10} />
                    <span className="text-lg">Perumahan</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
