import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PenBoxIcon, User2, XCircle } from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/general/EmptyState";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { CopyLinkMenuItem } from "@/components/general/CopyLink";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import { ime } from "../utils/ime";

async function getAllUsersWithRoles() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      userType: true,
      createdAt: true,
      Company: {
        select: {
          id: true,
          name: true,
          logo: true,
        },
      },
      JobSeeker: {
        select: {
          id: true,
          name: true,
          resume: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
}

const AllUsers = async () => {
  const session = await requireUser();

  if (!ime(session.email)) {
    redirect("/");
  }
  const data = await getAllUsersWithRoles();

  const companies = data.filter(
    (user) => user.userType === "COMPANY" && user.Company
  );
  const jobSeekers = data.filter(
    (user) => user.userType === "JOB_SEEKER" && user.JobSeeker
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data.length === 0 ? (
          <EmptyState
            title="No users found"
            description="There are no users to display."
            buttonText="Invite users"
            href="/invite-user"
          />
        ) : (
          <div className="p-4 lg:px-30 mt-14">
            <Card className="px-0 pt-0 rounded-none">
              <Tabs defaultValue="Company" className="rounded-none">
                <TabsList className="grid w-full grid-cols-2 rounded-none mb-6">
                  <TabsTrigger value="Company" className="rounded-none">Company</TabsTrigger>
                  <TabsTrigger value="Job-Seeker" className="rounded-none">Job Seeker</TabsTrigger>
                </TabsList>
                <TabsContent value="Company">
                  {" "}
                  <CardHeader>
                    <CardTitle>Registered Companies</CardTitle>
                    <CardDescription>
                      Manage users (Companies ).
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Logo</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>User Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created On</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {companies.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              {user.Company?.logo ? (
                                <Image
                                  src={user.Company.logo}
                                  alt={`${user.Company.name} logo`}
                                  width={30}
                                  height={30}
                                  className="rounded-md h-7 w-16"
                                />
                              ) : (
                                <div className="bg-gray-300 size-10 rounded-lg flex items-center justify-center">
                                  <User2 className="size-6 text-white" />
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="font-medium">
                              {user.Company?.name ||
                                user.JobSeeker?.name ||
                                "—"}
                            </TableCell>
                            <TableCell>{user.userType}</TableCell>
                            <TableCell>
                              {user.userType === "COMPANY"
                                ? "Active"
                                : "Seeking Jobs"}
                            </TableCell>
                            <TableCell>
                              {new Date(user.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="size-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/users/${user.id}/edit`}>
                                      <PenBoxIcon className="size-4 mr-2" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <CopyLinkMenuItem
                                    jobUrl={`${process.env.NEXT_PUBLIC_URL}/user/${user.id}`}
                                  />
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem asChild>
                                    <Link href={`/users/${user.id}/delete`}>
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Delete
                                    </Link>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </TabsContent>
                <TabsContent value="Job-Seeker">
                  <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                      Manage users (Job Seekers).
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Logo</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>User Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created On</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {jobSeekers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              {user.Company?.logo ? (
                                <Image
                                  src={user.Company.logo}
                                  alt={`${user.Company.name} logo`}
                                  width={30}
                                  height={30}
                                  className="rounded-md h-7 w-16"
                                />
                              ) : (
                                <div className="bg-gray-300 size-10 rounded-lg flex items-center justify-center">
                                  <User2 className="size-6 text-white" />
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="font-medium">
                              {user.Company?.name ||
                                user.JobSeeker?.name ||
                                "—"}
                            </TableCell>
                            <TableCell>{user.userType}</TableCell>
                            <TableCell>
                              {user.userType === "COMPANY"
                                ? "Active"
                                : "Seeking Jobs"}
                            </TableCell>
                            <TableCell>
                              {new Date(user.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="size-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/users/${user.id}/edit`}>
                                      <PenBoxIcon className="size-4 mr-2" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <CopyLinkMenuItem
                                    jobUrl={`${process.env.NEXT_PUBLIC_URL}/user/${user.id}`}
                                  />
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem asChild>
                                    <Link href={`/users/${user.id}/delete`}>
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Delete
                                    </Link>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default AllUsers;
