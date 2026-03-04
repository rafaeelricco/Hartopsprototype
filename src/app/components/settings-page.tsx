import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Plus, Mail, Shield, Trash2 } from "lucide-react";

const teamMembers = [
  { id: 1, name: "Admin Hart", email: "admin@hartops.com", role: "Super Admin", status: "Active", initials: "AH" },
  { id: 2, name: "Sarah Chen", email: "sarah.chen@hartops.com", role: "Admin", status: "Active", initials: "SC" },
  { id: 3, name: "James Wright", email: "james.w@hartops.com", role: "Admin", status: "Active", initials: "JW" },
  { id: 4, name: "Maria Lopez", email: "maria.l@hartops.com", role: "Admin", status: "Pending", initials: "ML" },
];

export function SettingsPage() {
  const [profileName, setProfileName] = useState("Admin Hart");
  const [profileEmail] = useState("admin@hartops.com");

  return (
    <div className="p-6 space-y-6 w-full">
      <div>
        <h1 className="text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "0.875rem" }}>
          Manage your profile and team members.
        </p>
      </div>

      {/* Profile */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <CardTitle
            style={{ fontSize: "1rem", fontWeight: 600 }}
          >
            Profile
          </CardTitle>
          <CardDescription style={{ fontSize: "0.8125rem" }}>
            Your personal account information
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-foreground" style={{ fontSize: "0.8125rem" }}>Full Name</label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 focus:border-[#7D152D] transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-foreground" style={{ fontSize: "0.8125rem" }}>Email</label>
            <input
              type="email"
              value={profileEmail}
              readOnly
              className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-muted-foreground cursor-not-allowed"
            />
          </div>
          <div className="flex justify-end">
            <Button className="bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Management */}
      <Card className="gap-0">
        <CardHeader className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Team
              </CardTitle>
              <CardDescription style={{ fontSize: "0.8125rem" }} className="mt-1">
                Invite and manage Hart Ops administrators
              </CardDescription>
            </div>
            <Button size="sm" className="bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer" style={{ fontSize: "0.8125rem" }}>
              <Mail className="size-3.5" />
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between gap-4 py-2">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="size-9">
                    <AvatarFallback
                      className="text-xs"
                      style={{
                        backgroundColor: member.role === "Super Admin" ? "#7D152D" : "#E2E8F0",
                        color: member.role === "Super Admin" ? "#FFFFFF" : "#64748B",
                      }}
                    >
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-foreground truncate" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                      {member.name}
                    </p>
                    <p className="text-muted-foreground truncate" style={{ fontSize: "0.75rem" }}>
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant="secondary"
                    className={
                      member.status === "Active"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }
                    style={{ fontSize: "0.6875rem" }}
                  >
                    {member.status}
                  </Badge>
                  <Badge variant="outline" style={{ fontSize: "0.6875rem" }}>
                    <Shield className="size-3 mr-0.5" />
                    {member.role}
                  </Badge>
                  {member.role !== "Super Admin" && (
                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive cursor-pointer">
                      <Trash2 className="size-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}