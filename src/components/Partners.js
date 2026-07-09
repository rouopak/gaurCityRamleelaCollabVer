import React from "react";
import PartnersClient from "./PartnersClient";
import { partners } from "@/constants";

export default function Partners() {
    if (!partners || partners.length === 0) return null;

    return <PartnersClient partners={partners} />;
}