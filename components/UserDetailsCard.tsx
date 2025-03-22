"use client";

import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

const UserDetailsCard = ({
  userDetails,
  session,
}: {
  userDetails: User;
  session: Session;
}) => {
  const { fullName, email, universityId, universityCard } = userDetails;

  return (
    <div className="w-full max-w-lg bg-dark-300 rounded-xl shadow-lg p-6 text-white flex flex-col gap-6 overflow-hidden">
      {/* User Avatar & Info */}
      <div className="flex items-center gap-4">
        <Link href="/my-profile">
          <Avatar className="w-16 h-16 bg-emerald-400 text-black">
            <AvatarFallback className="text-xl font-bold">
              {getInitials(session?.user?.name || "IN")}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="overflow-hidden">
          <h2 className="text-2xl font-semibold truncate">{fullName}</h2>
          <p className="text-light-100 text-sm truncate">{email}</p>
        </div>
      </div>

      {/* University ID */}
      <div className="border-t border-light-100 pt-4">
        <p className="text-sm text-gray-400">University ID</p>
        <p className="text-lg font-medium break-words">{universityId}</p>
      </div>

      {/* University ID Card Image */}
      <div className="flex justify-center">
        <IKImage
          alt="University ID Card"
          path={universityCard}
          width={400}
          height={250}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          lqip={{ active: true }}
          loading="lazy"
          className="rounded-lg object-contain max-w-full"
        />
      </div>
    </div>
  );
};

export default UserDetailsCard;
